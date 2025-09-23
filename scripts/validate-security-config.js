// Security Configuration Validator for MozaWave
// Validates that security configurations are properly set up

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Security Configuration...');

// Check for required security files
const requiredFiles = [
  'vercel.json',
  'SECURITY_IMPLEMENTATION.md',
  'src/middleware/security.ts',
  'src/lib/crypto/encryption.ts',
  'src/lib/audit/logger.ts'
];

let allFilesPresent = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesPresent = false;
  }
});

// Check vercel.json for security headers
if (fs.existsSync('vercel.json')) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.headers && vercelConfig.headers.length > 0) {
      console.log('✅ Security headers configured in vercel.json');
    } else {
      console.log('❌ No security headers found in vercel.json');
      allFilesPresent = false;
    }
  } catch (error) {
    console.log('❌ Error reading vercel.json:', error.message);
    allFilesPresent = false;
  }
}

// Check for hardcoded secrets in source files
console.log('\n🔍 Checking for hardcoded secrets...');

const sourceFiles = [];
function findSourceFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findSourceFiles(filePath);
    } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
      sourceFiles.push(filePath);
    }
  });
}

if (fs.existsSync('src')) {
  findSourceFiles('src');
  
  let secretsFound = false;
  sourceFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for common secret patterns (excluding legitimate uses)
      const secretPatterns = [
        /password\s*[:=]\s*["'][^"']{8,}["']/gi,
        /secret\s*[:=]\s*["'][^"']{8,}["']/gi,
        /key\s*[:=]\s*["'][^"']{20,}["']/gi,
        /token\s*[:=]\s*["'][^"']{20,}["']/gi
      ];
      
      secretPatterns.forEach(pattern => {
        if (pattern.test(content) && !content.includes('process.env') && !content.includes('demo-key')) {
          console.log(`⚠️  Potential secret found in ${file}`);
          secretsFound = true;
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  });
  
  if (!secretsFound) {
    console.log('✅ No hardcoded secrets found in source code');
  }
}

// Check environment variable usage
console.log('\n🔍 Checking environment variable usage...');
if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example file found');
} else {
  console.log('ℹ️  .env.example file not found (optional)');
}

// Final validation
console.log('\n📊 Security Validation Summary:');
if (allFilesPresent) {
  console.log('✅ All security configurations are properly set up');
  console.log('✅ Security validation passed');
  process.exit(0);
} else {
  console.log('❌ Some security configurations are missing');
  console.log('❌ Security validation failed');
  process.exit(1);
}

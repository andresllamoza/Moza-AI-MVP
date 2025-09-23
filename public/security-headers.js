// Enterprise Security Headers Configuration
// Top-of-the-market security implementation for MozaWave

// Content Security Policy (CSP) - Strictest possible
const cspPolicy = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Vite dev mode
    'https://vercel.live',
    'https://vercel-insights.com',
    'https://vitals.vercel-insights.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'data:'
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'blob:'
  ],
  'connect-src': [
    "'self'",
    'https://api.mozawave.com',
    'https://analytics.mozawave.com',
    'https://vercel.live',
    'https://vercel-insights.com',
    'https://www.google-analytics.com',
    'wss://vercel.live'
  ],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
  'block-all-mixed-content': []
};

// Security Headers Configuration
const securityHeaders = {
  // Prevent XSS attacks
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  
  // HSTS - Force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  
  // Content Security Policy
  'Content-Security-Policy': Object.entries(cspPolicy)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; '),
    
  // Additional Security Headers
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  
  // Cache Control for sensitive pages
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  
  // Server Information Hiding
  'Server': 'MozaWave-Security',
  'X-Powered-By': ''
};

// Export for Vercel configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { securityHeaders, cspPolicy };
}

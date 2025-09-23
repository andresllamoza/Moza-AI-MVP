// Encryption Utilities for MozaWave
// Provides secure encryption and decryption for sensitive data

import crypto from 'crypto';

// Encryption Configuration
const ENCRYPTION_CONFIG = {
  algorithm: 'aes-256-gcm',
  keyLength: 32, // 256 bits
  ivLength: 16, // 128 bits
  tagLength: 16, // 128 bits
  saltLength: 32, // 256 bits
};

// Get encryption key from environment or generate from master key
function getEncryptionKey(): Buffer {
  const masterKey = process.env.ENCRYPTION_MASTER_KEY;
  if (!masterKey) {
    throw new Error('ENCRYPTION_MASTER_KEY environment variable is required');
  }
  
  // Derive key from master key using PBKDF2
  return crypto.pbkdf2Sync(masterKey, 'mozawave-salt', 100000, ENCRYPTION_CONFIG.keyLength, 'sha512');
}

// Encrypt data
export async function encrypt(data: string): Promise<string> {
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(ENCRYPTION_CONFIG.ivLength);
    const cipher = crypto.createCipher(ENCRYPTION_CONFIG.algorithm, key);
    cipher.setAAD(Buffer.from('mozawave-auth'));
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    // Combine IV, tag, and encrypted data
    const combined = iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
    
    return Buffer.from(combined).toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

// Decrypt data
export async function decrypt(encryptedData: string): Promise<string> {
  try {
    const key = getEncryptionKey();
    const combined = Buffer.from(encryptedData, 'base64').toString('hex');
    
    const parts = combined.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const tag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipher(ENCRYPTION_CONFIG.algorithm, key);
    decipher.setAAD(Buffer.from('mozawave-auth'));
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

// Hash data (one-way)
export function hash(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(ENCRYPTION_CONFIG.saltLength).toString('hex');
  const hash = crypto.pbkdf2Sync(data, actualSalt, 100000, 64, 'sha512');
  return actualSalt + ':' + hash.toString('hex');
}

// Verify hash
export function verifyHash(data: string, hashedData: string): boolean {
  const parts = hashedData.split(':');
  if (parts.length !== 2) {
    return false;
  }
  
  const salt = parts[0];
  const hash = parts[1];
  
  const testHash = crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha512').toString('hex');
  
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(testHash));
}

// Generate secure random string
export function generateSecureRandom(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// Generate secure UUID
export function generateSecureUUID(): string {
  return crypto.randomUUID();
}

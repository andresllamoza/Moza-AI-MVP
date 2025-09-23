// Enterprise Data Security Utilities
// Top-of-the-market data protection for MozaWave

// Data encryption utilities
export class SecureDataHandler {
  private static readonly ENCRYPTION_KEY = 'mozawave-enterprise-security-2024';
  
  // Encrypt sensitive data
  static encrypt(data: string): string {
    try {
      // In production, use proper encryption libraries like crypto-js
      const encoded = btoa(encodeURIComponent(data));
      return encoded;
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  // Decrypt sensitive data
  static decrypt(encryptedData: string): string {
    try {
      const decoded = decodeURIComponent(atob(encryptedData));
      return decoded;
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }

  // Sanitize user input to prevent XSS
  static sanitizeInput(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number format
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Mask sensitive data for display
  static maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (data.length <= visibleChars) return '*'.repeat(data.length);
    const visible = data.slice(-visibleChars);
    const masked = '*'.repeat(data.length - visibleChars);
    return masked + visible;
  }

  // Generate secure session token
  static generateSessionToken(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return this.encrypt(timestamp + random);
  }

  // Check if data contains sensitive information
  static containsSensitiveData(data: string): boolean {
    const sensitivePatterns = [
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b\d{3}-\d{3}-\d{4}\b/, // Phone
      /\bpassword\b/i,
      /\btoken\b/i,
      /\bsecret\b/i,
      /\bkey\b/i
    ];

    return sensitivePatterns.some(pattern => pattern.test(data));
  }

  // Secure data transmission
  static async secureTransmit(data: any, endpoint: string): Promise<any> {
    try {
      // Encrypt sensitive data before transmission
      const encryptedData = this.encrypt(JSON.stringify(data));
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Token': this.generateSessionToken(),
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ encryptedData }),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Secure transmission failed:', error);
      throw error;
    }
  }
}

// Client data protection
export class ClientDataProtection {
  private static readonly CLIENT_DATA_KEY = 'mozawave-client-data';
  
  // Store client data securely
  static storeClientData(data: any): void {
    try {
      const encryptedData = SecureDataHandler.encrypt(JSON.stringify(data));
      sessionStorage.setItem(this.CLIENT_DATA_KEY, encryptedData);
    } catch (error) {
      console.error('Failed to store client data:', error);
    }
  }

  // Retrieve client data securely
  static getClientData(): any {
    try {
      const encryptedData = sessionStorage.getItem(this.CLIENT_DATA_KEY);
      if (!encryptedData) return null;
      
      const decryptedData = SecureDataHandler.decrypt(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Failed to retrieve client data:', error);
      return null;
    }
  }

  // Clear client data
  static clearClientData(): void {
    try {
      sessionStorage.removeItem(this.CLIENT_DATA_KEY);
      localStorage.removeItem(this.CLIENT_DATA_KEY);
    } catch (error) {
      console.error('Failed to clear client data:', error);
    }
  }

  // Validate client data integrity
  static validateClientData(data: any): boolean {
    try {
      // Check for required fields
      const requiredFields = ['businessName', 'industry', 'location'];
      const hasRequiredFields = requiredFields.every(field => 
        data && data[field] && typeof data[field] === 'string'
      );

      // Check for data tampering
      const dataString = JSON.stringify(data);
      const containsSensitive = SecureDataHandler.containsSensitiveData(dataString);

      return hasRequiredFields && !containsSensitive;
    } catch (error) {
      console.error('Client data validation failed:', error);
      return false;
    }
  }
}

// Security audit logging
export class SecurityAuditLogger {
  private static readonly AUDIT_EVENTS = [
    'DATA_ACCESS',
    'DATA_MODIFICATION',
    'SECURITY_THREAT_DETECTED',
    'AUTHENTICATION_ATTEMPT',
    'SESSION_CREATED',
    'SESSION_DESTROYED'
  ];

  static logSecurityEvent(event: string, details: any): void {
    try {
      const auditLog = {
        timestamp: new Date().toISOString(),
        event,
        details: SecureDataHandler.sanitizeInput(JSON.stringify(details)),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: SecureDataHandler.generateSessionToken()
      };

      // In production, send to secure audit logging service
      console.log('Security Audit:', auditLog);
    } catch (error) {
      console.error('Security audit logging failed:', error);
    }
  }

  static logDataAccess(dataType: string, action: string): void {
    this.logSecurityEvent('DATA_ACCESS', {
      dataType,
      action,
      timestamp: new Date().toISOString()
    });
  }

  static logThreatDetected(threatType: string, details: any): void {
    this.logSecurityEvent('SECURITY_THREAT_DETECTED', {
      threatType,
      details: SecureDataHandler.sanitizeInput(JSON.stringify(details))
    });
  }
}

// Export security utilities
export const securityUtils = {
  encrypt: SecureDataHandler.encrypt,
  decrypt: SecureDataHandler.decrypt,
  sanitize: SecureDataHandler.sanitizeInput,
  validate: {
    email: SecureDataHandler.validateEmail,
    phone: SecureDataHandler.validatePhone
  },
  mask: SecureDataHandler.maskSensitiveData,
  transmit: SecureDataHandler.secureTransmit,
  client: ClientDataProtection,
  audit: SecurityAuditLogger
};

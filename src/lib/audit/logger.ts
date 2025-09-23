// Audit Logger for MozaWave
// Provides comprehensive audit logging for compliance and security

import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Audit Event Types
export enum AuditEventType {
  // Authentication Events
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  PASSWORD_CHANGED = 'password_changed',
  MFA_ENABLED = 'mfa_enabled',
  MFA_DISABLED = 'mfa_disabled',
  
  // Authorization Events
  PERMISSION_GRANTED = 'permission_granted',
  PERMISSION_DENIED = 'permission_denied',
  ROLE_CHANGED = 'role_changed',
  
  // Data Access Events
  DATA_ACCESSED = 'data_accessed',
  DATA_CREATED = 'data_created',
  DATA_UPDATED = 'data_updated',
  DATA_DELETED = 'data_deleted',
  DATA_EXPORTED = 'data_exported',
  
  // OAuth Events
  OAUTH_CONNECTED = 'oauth_connected',
  OAUTH_DISCONNECTED = 'oauth_disconnected',
  OAUTH_TOKEN_REFRESHED = 'oauth_token_refreshed',
  
  // System Events
  SYSTEM_ERROR = 'system_error',
  SECURITY_THREAT_DETECTED = 'security_threat_detected',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  
  // Business Events
  REPORT_GENERATED = 'report_generated',
  INSIGHT_CREATED = 'insight_created',
  COMPETITOR_ADDED = 'competitor_added',
  ALERT_TRIGGERED = 'alert_triggered',
}

// Audit Log Interface
interface AuditLogEntry {
  tenantId: string;
  userId?: string;
  eventType: AuditEventType;
  resourceType?: string;
  resourceId?: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: Date;
}

export class AuditLogger {
  private static instance: AuditLogger;
  
  private constructor() {}
  
  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  // Log audit event
  async logEvent(
    eventType: AuditEventType,
    details: {
      tenantId: string;
      userId?: string;
      resourceType?: string;
      resourceId?: string;
      action?: string;
      details?: any;
      ipAddress?: string;
      userAgent?: string;
    }
  ): Promise<void> {
    try {
      const auditLog: AuditLogEntry = {
        tenantId: details.tenantId,
        userId: details.userId,
        eventType,
        resourceType: details.resourceType,
        resourceId: details.resourceId,
        action: details.action || eventType,
        details: details.details,
        ipAddress: details.ipAddress,
        userAgent: details.userAgent,
        timestamp: new Date(),
      };

      // Store in database
      await prisma.auditLog.create({
        data: {
          tenantId: auditLog.tenantId,
          userId: auditLog.userId,
          eventType: auditLog.eventType,
          resourceType: auditLog.resourceType,
          resourceId: auditLog.resourceId,
          action: auditLog.action,
          details: auditLog.details,
          ipAddress: auditLog.ipAddress,
          userAgent: auditLog.userAgent,
          timestamp: auditLog.timestamp,
        },
      });

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Audit Log:', JSON.stringify(auditLog, null, 2));
      }

      // Send to external audit service in production
      if (process.env.NODE_ENV === 'production' && process.env.AUDIT_SERVICE_URL) {
        await this.sendToExternalService(auditLog);
      }
    } catch (error) {
      console.error('Audit logging error:', error);
      // Don't throw - audit logging should not break the application
    }
  }

  // Send to external audit service
  private async sendToExternalService(auditLog: AuditLogEntry): Promise<void> {
    try {
      await fetch(process.env.AUDIT_SERVICE_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AUDIT_SERVICE_TOKEN}`,
        },
        body: JSON.stringify(auditLog),
      });
    } catch (error) {
      console.error('Failed to send audit log to external service:', error);
    }
  }

  // Query audit logs with filters
  async queryAuditLogs(filters: {
    tenantId: string;
    userId?: string;
    eventType?: AuditEventType;
    resourceType?: string;
    resourceId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{
    logs: AuditLogEntry[];
    total: number;
  }> {
    try {
      const whereClause: any = {
        tenantId: filters.tenantId,
      };

      if (filters.userId) {
        whereClause.userId = filters.userId;
      }

      if (filters.eventType) {
        whereClause.eventType = filters.eventType;
      }

      if (filters.resourceType) {
        whereClause.resourceType = filters.resourceType;
      }

      if (filters.resourceId) {
        whereClause.resourceId = filters.resourceId;
      }

      if (filters.startDate || filters.endDate) {
        whereClause.timestamp = {};
        if (filters.startDate) {
          whereClause.timestamp.gte = filters.startDate;
        }
        if (filters.endDate) {
          whereClause.timestamp.lte = filters.endDate;
        }
      }

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where: whereClause,
          orderBy: { timestamp: 'desc' },
          take: filters.limit || 100,
          skip: filters.offset || 0,
        }),
        prisma.auditLog.count({
          where: whereClause,
        }),
      ]);

      return {
        logs: logs.map(log => ({
          tenantId: log.tenantId,
          userId: log.userId,
          eventType: log.eventType as AuditEventType,
          resourceType: log.resourceType,
          resourceId: log.resourceId,
          action: log.action,
          details: log.details,
          ipAddress: log.ipAddress,
          userAgent: log.userAgent,
          timestamp: log.timestamp,
        })),
        total,
      };
    } catch (error) {
      console.error('Audit log query error:', error);
      throw error;
    }
  }

  // Generate compliance report
  async generateComplianceReport(
    tenantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalEvents: number;
    eventTypes: Record<string, number>;
    userActivity: Record<string, number>;
    securityEvents: number;
    dataAccessEvents: number;
  }> {
    try {
      const logs = await prisma.auditLog.findMany({
        where: {
          tenantId,
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          eventType: true,
          userId: true,
          action: true,
        },
      });

      const eventTypes: Record<string, number> = {};
      const userActivity: Record<string, number> = {};
      let securityEvents = 0;
      let dataAccessEvents = 0;

      logs.forEach(log => {
        // Count event types
        eventTypes[log.eventType] = (eventTypes[log.eventType] || 0) + 1;

        // Count user activity
        if (log.userId) {
          userActivity[log.userId] = (userActivity[log.userId] || 0) + 1;
        }

        // Count security events
        if (log.eventType.includes('security') || log.eventType.includes('threat')) {
          securityEvents++;
        }

        // Count data access events
        if (log.eventType.includes('data') || log.eventType.includes('access')) {
          dataAccessEvents++;
        }
      });

      return {
        totalEvents: logs.length,
        eventTypes,
        userActivity,
        securityEvents,
        dataAccessEvents,
      };
    } catch (error) {
      console.error('Compliance report generation error:', error);
      throw error;
    }
  }

  // Clean up old audit logs (retention policy)
  async cleanupOldLogs(retentionDays: number = 365): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const result = await prisma.auditLog.deleteMany({
        where: {
          timestamp: {
            lt: cutoffDate,
          },
        },
      });

      console.log(`Cleaned up ${result.count} old audit logs`);
      return result.count;
    } catch (error) {
      console.error('Audit log cleanup error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const auditLogger = AuditLogger.getInstance();

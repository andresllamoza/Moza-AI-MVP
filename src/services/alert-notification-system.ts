// MozaWave Alert & Notification System
// Enterprise-grade alerting with email/Slack integration and playbook automation

import {
  Alert,
  Notification,
  DigestSchedule,
  Playbook,
  PlaybookAction,
  AlertType,
  AlertSeverity,
  AlertStatus,
  NotificationChannel,
  NotificationStatus,
  DigestType,
  DigestFrequency,
  ActionType,
  PlaybookTrigger,
  PlaybookCondition
} from '@/types/enterprise-platform';

export class AlertNotificationSystem {
  private alerts: Map<string, Alert> = new Map();
  private notifications: Map<string, Notification> = new Map();
  private digestSchedules: Map<string, DigestSchedule> = new Map();
  private playbooks: Map<string, Playbook> = new Map();
  private isRunning: boolean = false;

  /**
   * Initialize the alert system
   */
  async initialize(): Promise<void> {
    console.log('Initializing Alert & Notification System');
    
    // Start alert processing loop
    this.startAlertProcessing();
    
    // Start digest scheduling
    this.startDigestScheduling();
    
    // Start playbook monitoring
    this.startPlaybookMonitoring();
    
    this.isRunning = true;
    console.log('Alert & Notification System initialized');
  }

  /**
   * Create new alert
   */
  async createAlert(alert: Omit<Alert, 'id' | 'createdAt' | 'status' | 'escalationLevel' | 'notifications'>): Promise<Alert> {
    const newAlert: Alert = {
      ...alert,
      id: this.generateId(),
      createdAt: new Date(),
      status: 'new',
      escalationLevel: this.calculateEscalationLevel(alert.severity),
      notifications: []
    };

    this.alerts.set(newAlert.id, newAlert);
    
    // Process alert immediately
    await this.processAlert(newAlert);
    
    console.log(`Alert created: ${newAlert.title}`);
    return newAlert;
  }

  /**
   * Acknowledge alert
   */
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (!alert) throw new Error('Alert not found');

    alert.status = 'acknowledged';
    alert.acknowledgedBy = acknowledgedBy;
    alert.acknowledgedAt = new Date();

    console.log(`Alert ${alertId} acknowledged by ${acknowledgedBy}`);
  }

  /**
   * Resolve alert
   */
  async resolveAlert(alertId: string, resolvedBy: string, resolution?: string): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (!alert) throw new Error('Alert not found');

    alert.status = 'resolved';
    alert.resolvedBy = resolvedBy;
    alert.resolvedAt = new Date();

    console.log(`Alert ${alertId} resolved by ${resolvedBy}`);
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return Array.from(this.alerts.values())
      .filter(alert => alert.status === 'new' || alert.status === 'acknowledged')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get alerts by severity
   */
  getAlertsBySeverity(severity: AlertSeverity): Alert[] {
    return Array.from(this.alerts.values())
      .filter(alert => alert.severity === severity)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Create digest schedule
   */
  async createDigestSchedule(schedule: Omit<DigestSchedule, 'id' | 'lastSent' | 'nextSend'>): Promise<DigestSchedule> {
    const newSchedule: DigestSchedule = {
      ...schedule,
      id: this.generateId(),
      lastSent: undefined,
      nextSend: this.calculateNextSendTime(schedule.frequency)
    };

    this.digestSchedules.set(newSchedule.id, newSchedule);
    
    console.log(`Digest schedule created: ${newSchedule.type} ${newSchedule.frequency}`);
    return newSchedule;
  }

  /**
   * Create playbook
   */
  async createPlaybook(playbook: Omit<Playbook, 'id' | 'createdAt' | 'lastRun' | 'successRate'>): Promise<Playbook> {
    const newPlaybook: Playbook = {
      ...playbook,
      id: this.generateId(),
      createdAt: new Date(),
      lastRun: undefined,
      successRate: 0
    };

    this.playbooks.set(newPlaybook.id, newPlaybook);
    
    console.log(`Playbook created: ${newPlaybook.name}`);
    return newPlaybook;
  }

  /**
   * Execute playbook
   */
  async executePlaybook(playbookId: string, triggerData: any): Promise<void> {
    const playbook = this.playbooks.get(playbookId);
    if (!playbook) throw new Error('Playbook not found');

    console.log(`Executing playbook: ${playbook.name}`);
    
    // Check if conditions are met
    if (!this.checkPlaybookConditions(playbook, triggerData)) {
      console.log(`Playbook conditions not met for ${playbook.name}`);
      return;
    }

    // Execute actions in order
    for (const action of playbook.actions.sort((a, b) => a.order - b.order)) {
      if (action.isEnabled) {
        try {
          await this.executeAction(action, triggerData);
        } catch (error) {
          console.error(`Error executing action ${action.id}:`, error);
        }
      }
    }

    playbook.lastRun = new Date();
    console.log(`Playbook ${playbook.name} executed successfully`);
  }

  /**
   * Send notification
   */
  async sendNotification(
    channel: NotificationChannel,
    recipient: string,
    message: string,
    alertId?: string
  ): Promise<Notification> {
    const notification: Notification = {
      id: this.generateId(),
      alertId: alertId || '',
      channel,
      recipient,
      message,
      status: 'pending',
      sentAt: undefined,
      deliveredAt: undefined,
      readAt: undefined,
      error: undefined
    };

    this.notifications.set(notification.id, notification);

    try {
      await this.deliverNotification(notification);
    } catch (error) {
      notification.status = 'failed';
      notification.error = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to send notification ${notification.id}:`, error);
    }

    return notification;
  }

  /**
   * Process alert and trigger notifications/playbooks
   */
  private async processAlert(alert: Alert): Promise<void> {
    // Send immediate notifications for critical alerts
    if (alert.severity === 'critical') {
      await this.sendCriticalAlertNotifications(alert);
    }

    // Check for matching playbooks
    await this.checkPlaybookTriggers(alert);

    // Update digest schedules
    await this.updateDigestSchedules(alert);
  }

  /**
   * Send critical alert notifications
   */
  private async sendCriticalAlertNotifications(alert: Alert): Promise<void> {
    const channels: NotificationChannel[] = ['email', 'slack'];
    
    for (const channel of channels) {
      const recipients = this.getNotificationRecipients(channel, alert.businessId);
      
      for (const recipient of recipients) {
        const message = this.buildAlertMessage(alert, channel);
        await this.sendNotification(channel, recipient, message, alert.id);
      }
    }
  }

  /**
   * Check playbook triggers
   */
  private async checkPlaybookTriggers(alert: Alert): Promise<void> {
    const activePlaybooks = Array.from(this.playbooks.values())
      .filter(playbook => playbook.isActive);

    for (const playbook of activePlaybooks) {
      for (const trigger of playbook.triggers) {
        if (this.matchesTrigger(trigger, alert)) {
          await this.executePlaybook(playbook.id, alert);
        }
      }
    }
  }

  /**
   * Update digest schedules
   */
  private async updateDigestSchedules(alert: Alert): Promise<void> {
    const relevantSchedules = Array.from(this.digestSchedules.values())
      .filter(schedule => 
        schedule.isActive && 
        schedule.filters.types.includes(alert.type) &&
        schedule.filters.severity.includes(alert.severity)
      );

    for (const schedule of relevantSchedules) {
      // In real implementation, this would add the alert to the digest queue
      console.log(`Alert ${alert.id} added to digest schedule ${schedule.id}`);
    }
  }

  /**
   * Start alert processing loop
   */
  private startAlertProcessing(): void {
    setInterval(async () => {
      if (this.isRunning) {
        await this.processPendingAlerts();
      }
    }, 30000); // Process every 30 seconds
  }

  /**
   * Process pending alerts
   */
  private async processPendingAlerts(): Promise<void> {
    const pendingAlerts = Array.from(this.alerts.values())
      .filter(alert => alert.status === 'new');

    for (const alert of pendingAlerts) {
      // Check for escalation
      await this.checkAlertEscalation(alert);
      
      // Send follow-up notifications if needed
      await this.sendFollowUpNotifications(alert);
    }
  }

  /**
   * Check alert escalation
   */
  private async checkAlertEscalation(alert: Alert): Promise<void> {
    const timeSinceCreated = Date.now() - alert.createdAt.getTime();
    const escalationThreshold = this.getEscalationThreshold(alert.severity);

    if (timeSinceCreated > escalationThreshold && alert.escalationLevel < 3) {
      alert.escalationLevel++;
      await this.escalateAlert(alert);
    }
  }

  /**
   * Escalate alert
   */
  private async escalateAlert(alert: Alert): Promise<void> {
    console.log(`Escalating alert ${alert.id} to level ${alert.escalationLevel}`);
    
    // Send escalation notifications
    const message = `🚨 ESCALATED ALERT: ${alert.title}\n\n${alert.message}\n\nEscalation Level: ${alert.escalationLevel}`;
    
    // Send to managers/admins
    const escalationRecipients = this.getEscalationRecipients(alert.businessId);
    
    for (const recipient of escalationRecipients) {
      await this.sendNotification('email', recipient, message, alert.id);
      await this.sendNotification('slack', recipient, message, alert.id);
    }
  }

  /**
   * Send follow-up notifications
   */
  private async sendFollowUpNotifications(alert: Alert): Promise<void> {
    const timeSinceCreated = Date.now() - alert.createdAt.getTime();
    const followUpThreshold = 24 * 60 * 60 * 1000; // 24 hours

    if (timeSinceCreated > followUpThreshold && alert.status === 'new') {
      const message = `⏰ FOLLOW-UP: ${alert.title}\n\nThis alert has been open for over 24 hours and requires attention.`;
      
      const recipients = this.getNotificationRecipients('email', alert.businessId);
      for (const recipient of recipients) {
        await this.sendNotification('email', recipient, message, alert.id);
      }
    }
  }

  /**
   * Start digest scheduling
   */
  private startDigestScheduling(): void {
    setInterval(async () => {
      if (this.isRunning) {
        await this.processDigestSchedules();
      }
    }, 60000); // Check every minute
  }

  /**
   * Process digest schedules
   */
  private async processDigestSchedules(): Promise<void> {
    const now = new Date();
    const dueSchedules = Array.from(this.digestSchedules.values())
      .filter(schedule => 
        schedule.isActive && 
        schedule.nextSend && 
        schedule.nextSend <= now
      );

    for (const schedule of dueSchedules) {
      await this.sendDigest(schedule);
      
      // Update next send time
      schedule.lastSent = now;
      schedule.nextSend = this.calculateNextSendTime(schedule.frequency);
    }
  }

  /**
   * Send digest
   */
  private async sendDigest(schedule: DigestSchedule): Promise<void> {
    console.log(`Sending ${schedule.type} digest`);
    
    const relevantAlerts = this.getAlertsForDigest(schedule);
    
    if (relevantAlerts.length === 0) {
      console.log('No alerts for digest');
      return;
    }

    const digestContent = this.buildDigestContent(relevantAlerts, schedule);
    
    for (const recipient of schedule.recipients) {
      await this.sendNotification(schedule.format, recipient, digestContent);
    }
  }

  /**
   * Get alerts for digest
   */
  private getAlertsForDigest(schedule: DigestSchedule): Alert[] {
    const since = schedule.lastSent || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    return Array.from(this.alerts.values())
      .filter(alert => 
        alert.createdAt >= since &&
        schedule.filters.types.includes(alert.type) &&
        schedule.filters.severity.includes(alert.severity) &&
        schedule.filters.competitors.includes(alert.data.competitorId || '')
      );
  }

  /**
   * Build digest content
   */
  private buildDigestContent(alerts: Alert[], schedule: DigestSchedule): string {
    let content = `📊 ${schedule.type.toUpperCase()} INTELLIGENCE DIGEST\n\n`;
    content += `Period: ${schedule.filters.dateRange.start.toLocaleDateString()} - ${schedule.filters.dateRange.end.toLocaleDateString()}\n\n`;
    
    // Group alerts by type
    const groupedAlerts = this.groupAlertsByType(alerts);
    
    for (const [type, typeAlerts] of Object.entries(groupedAlerts)) {
      content += `## ${type.toUpperCase()} (${typeAlerts.length})\n\n`;
      
      for (const alert of typeAlerts) {
        content += `• ${alert.title}\n`;
        content += `  ${alert.message}\n`;
        content += `  Severity: ${alert.severity.toUpperCase()}\n`;
        content += `  Time: ${alert.createdAt.toLocaleString()}\n\n`;
      }
    }
    
    content += `---\n`;
    content += `Total Alerts: ${alerts.length}\n`;
    content += `Critical: ${alerts.filter(a => a.severity === 'critical').length}\n`;
    content += `High: ${alerts.filter(a => a.severity === 'error').length}\n`;
    
    return content;
  }

  /**
   * Group alerts by type
   */
  private groupAlertsByType(alerts: Alert[]): Record<string, Alert[]> {
    return alerts.reduce((groups, alert) => {
      const type = alert.type.replace('_', ' ');
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(alert);
      return groups;
    }, {} as Record<string, Alert[]>);
  }

  /**
   * Start playbook monitoring
   */
  private startPlaybookMonitoring(): void {
    setInterval(async () => {
      if (this.isRunning) {
        await this.monitorPlaybookTriggers();
      }
    }, 10000); // Check every 10 seconds
  }

  /**
   * Monitor playbook triggers
   */
  private async monitorPlaybookTriggers(): Promise<void> {
    const activePlaybooks = Array.from(this.playbooks.values())
      .filter(playbook => playbook.isActive);

    for (const playbook of activePlaybooks) {
      for (const trigger of playbook.triggers) {
        if (await this.checkTriggerCondition(trigger)) {
          await this.executePlaybook(playbook.id, { trigger });
        }
      }
    }
  }

  /**
   * Execute playbook action
   */
  private async executeAction(action: PlaybookAction, triggerData: any): Promise<void> {
    console.log(`Executing action: ${action.type}`);

    switch (action.type) {
      case 'send_email':
        await this.executeEmailAction(action, triggerData);
        break;
      case 'create_task':
        await this.executeCreateTaskAction(action, triggerData);
        break;
      case 'update_price':
        await this.executeUpdatePriceAction(action, triggerData);
        break;
      case 'respond_review':
        await this.executeRespondReviewAction(action, triggerData);
        break;
      case 'send_alert':
        await this.executeSendAlertAction(action, triggerData);
        break;
      case 'webhook':
        await this.executeWebhookAction(action, triggerData);
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * Execute email action
   */
  private async executeEmailAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { recipients, subject, template } = action.parameters;
    const message = this.processTemplate(template, triggerData);
    
    for (const recipient of recipients as string[]) {
      await this.sendNotification('email', recipient, message);
    }
  }

  /**
   * Execute create task action
   */
  private async executeCreateTaskAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { title, description, assignee, priority } = action.parameters;
    
    // Mock implementation - in real system, this would create a task in a task management system
    console.log(`Creating task: ${title} for ${assignee}`);
  }

  /**
   * Execute update price action
   */
  private async executeUpdatePriceAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { service, newPrice, reason } = action.parameters;
    
    // Mock implementation - in real system, this would update pricing in the system
    console.log(`Updating price for ${service} to ${newPrice} (${reason})`);
  }

  /**
   * Execute respond review action
   */
  private async executeRespondReviewAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { reviewId, response } = action.parameters;
    
    // Mock implementation - in real system, this would send a review response
    console.log(`Responding to review ${reviewId} with: ${response}`);
  }

  /**
   * Execute send alert action
   */
  private async executeSendAlertAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { title, message, severity, businessId } = action.parameters;
    
    await this.createAlert({
      businessId,
      type: 'system',
      severity: severity as AlertSeverity,
      title,
      message,
      source: 'playbook',
      data: triggerData
    });
  }

  /**
   * Execute webhook action
   */
  private async executeWebhookAction(action: PlaybookAction, triggerData: any): Promise<void> {
    const { url, method, headers, payload } = action.parameters;
    
    // Mock implementation - in real system, this would make an HTTP request
    console.log(`Sending webhook to ${url}: ${JSON.stringify(payload)}`);
  }

  /**
   * Process template with trigger data
   */
  private processTemplate(template: string, data: any): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  /**
   * Deliver notification
   */
  private async deliverNotification(notification: Notification): Promise<void> {
    switch (notification.channel) {
      case 'email':
        await this.sendEmailNotification(notification);
        break;
      case 'sms':
        await this.sendSMSNotification(notification);
        break;
      case 'slack':
        await this.sendSlackNotification(notification);
        break;
      case 'webhook':
        await this.sendWebhookNotification(notification);
        break;
      case 'dashboard':
        // Dashboard notifications are handled in the UI
        notification.status = 'delivered';
        notification.deliveredAt = new Date();
        break;
      default:
        throw new Error(`Unsupported notification channel: ${notification.channel}`);
    }
  }

  /**
   * Send email notification
   */
  private async sendEmailNotification(notification: Notification): Promise<void> {
    // Mock implementation - in real system, this would use an email service
    console.log(`Sending email to ${notification.recipient}: ${notification.message}`);
    
    notification.status = 'sent';
    notification.sentAt = new Date();
    notification.deliveredAt = new Date();
  }

  /**
   * Send SMS notification
   */
  private async sendSMSNotification(notification: Notification): Promise<void> {
    // Mock implementation - in real system, this would use an SMS service
    console.log(`Sending SMS to ${notification.recipient}: ${notification.message}`);
    
    notification.status = 'sent';
    notification.sentAt = new Date();
    notification.deliveredAt = new Date();
  }

  /**
   * Send Slack notification
   */
  private async sendSlackNotification(notification: Notification): Promise<void> {
    // Mock implementation - in real system, this would use Slack API
    console.log(`Sending Slack message to ${notification.recipient}: ${notification.message}`);
    
    notification.status = 'sent';
    notification.sentAt = new Date();
    notification.deliveredAt = new Date();
  }

  /**
   * Send webhook notification
   */
  private async sendWebhookNotification(notification: Notification): Promise<void> {
    // Mock implementation - in real system, this would make an HTTP request
    console.log(`Sending webhook to ${notification.recipient}: ${notification.message}`);
    
    notification.status = 'sent';
    notification.sentAt = new Date();
    notification.deliveredAt = new Date();
  }

  /**
   * Build alert message
   */
  private buildAlertMessage(alert: Alert, channel: NotificationChannel): string {
    const severityEmoji = {
      'info': 'ℹ️',
      'warning': '⚠️',
      'error': '🚨',
      'critical': '🔥'
    };

    let message = `${severityEmoji[alert.severity]} **${alert.title}**\n\n`;
    message += `${alert.message}\n\n`;
    message += `**Severity:** ${alert.severity.toUpperCase()}\n`;
    message += `**Time:** ${alert.createdAt.toLocaleString()}\n`;
    message += `**Source:** ${alert.source}\n\n`;
    
    if (channel === 'email') {
      message += `[View Details](https://dashboard.mozawave.com/alerts/${alert.id})\n\n`;
      message += `---\n`;
      message += `MozaWave Intelligence Platform\n`;
      message += `This is an automated alert. Please do not reply to this email.`;
    }

    return message;
  }

  /**
   * Check playbook conditions
   */
  private checkPlaybookConditions(playbook: Playbook, data: any): boolean {
    for (const condition of playbook.conditions) {
      if (!this.evaluateCondition(condition, data)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Evaluate condition
   */
  private evaluateCondition(condition: PlaybookCondition, data: any): boolean {
    const fieldValue = this.getFieldValue(data, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'contains':
        return String(fieldValue).includes(String(condition.value));
      case 'not_contains':
        return !String(fieldValue).includes(String(condition.value));
      default:
        return false;
    }
  }

  /**
   * Get field value from data object
   */
  private getFieldValue(data: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], data);
  }

  /**
   * Check trigger condition
   */
  private async checkTriggerCondition(trigger: PlaybookTrigger): Promise<boolean> {
    // Mock implementation - in real system, this would check various conditions
    return Math.random() > 0.95; // 5% chance for demo purposes
  }

  /**
   * Check if trigger matches alert
   */
  private matchesTrigger(trigger: PlaybookTrigger, alert: Alert): boolean {
    // Mock implementation - check if alert matches trigger conditions
    return trigger.type === alert.type;
  }

  /**
   * Get notification recipients
   */
  private getNotificationRecipients(channel: NotificationChannel, businessId: string): string[] {
    // Mock implementation - in real system, this would get from user preferences
    return ['admin@example.com', 'manager@example.com'];
  }

  /**
   * Get escalation recipients
   */
  private getEscalationRecipients(businessId: string): string[] {
    // Mock implementation - in real system, this would get managers/admins
    return ['ceo@example.com', 'director@example.com'];
  }

  /**
   * Calculate escalation level
   */
  private calculateEscalationLevel(severity: AlertSeverity): number {
    switch (severity) {
      case 'critical': return 2;
      case 'error': return 1;
      case 'warning': return 1;
      case 'info': return 0;
      default: return 0;
    }
  }

  /**
   * Get escalation threshold
   */
  private getEscalationThreshold(severity: AlertSeverity): number {
    switch (severity) {
      case 'critical': return 30 * 60 * 1000; // 30 minutes
      case 'error': return 2 * 60 * 60 * 1000; // 2 hours
      case 'warning': return 6 * 60 * 60 * 1000; // 6 hours
      case 'info': return 24 * 60 * 60 * 1000; // 24 hours
      default: return 24 * 60 * 60 * 1000;
    }
  }

  /**
   * Calculate next send time
   */
  private calculateNextSendTime(frequency: DigestFrequency): Date {
    const now = new Date();
    
    switch (frequency) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const alertSystem = new AlertNotificationSystem();

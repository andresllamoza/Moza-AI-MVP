// MozaWave Intelligent Alert System
// AI-powered alerting with personalized messaging and reasoning

import { 
  AlertTemplates, 
  DigestTemplates, 
  CampaignMessaging,
  DashboardMicrocopy 
} from '@/copy/mozawave-copy-system';

import { aiReasoningEngine } from './ai-reasoning-engine';

export interface IntelligentAlert {
  id: string;
  type: 'price_change' | 'new_service' | 'review_alert' | 'revenue_risk' | 'sentiment_decline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  reasoning: string;
  action: string;
  cta: string;
  confidence: number;
  expectedOutcome: string;
  businessImpact: {
    revenue: number;
    customers: number;
    reputation: number;
  };
  personalization: {
    businessName: string;
    industry: string;
    location: string;
    preferredTone: 'professional' | 'friendly' | 'conversational';
  };
  createdAt: Date;
  expiresAt?: Date;
  status: 'new' | 'acknowledged' | 'resolved' | 'dismissed';
  channels: ('email' | 'sms' | 'slack' | 'dashboard')[];
  priority: number; // 0-100
}

export interface AlertPersonalization {
  businessName: string;
  industry: string;
  location: string;
  businessSize: 'small' | 'medium' | 'large';
  preferredTone: 'professional' | 'friendly' | 'conversational';
  alertPreferences: {
    email: boolean;
    sms: boolean;
    slack: boolean;
    dashboard: boolean;
  };
  urgencyThresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export class IntelligentAlertSystem {
  private alerts: Map<string, IntelligentAlert> = new Map();
  private personalizationSettings: Map<string, AlertPersonalization> = new Map();
  private isRunning: boolean = false;

  /**
   * Initialize the intelligent alert system
   */
  async initialize(): Promise<void> {
    console.log('🤖 Initializing Intelligent Alert System...');
    this.isRunning = true;
    
    // Start alert processing loop
    this.startAlertProcessing();
    
    console.log('✅ Intelligent Alert System initialized');
  }

  /**
   * Set personalization settings for a business
   */
  async setPersonalizationSettings(
    businessId: string, 
    settings: AlertPersonalization
  ): Promise<void> {
    this.personalizationSettings.set(businessId, settings);
    console.log(`Personalization settings updated for business: ${businessId}`);
  }

  /**
   * Create intelligent alert based on event
   */
  async createIntelligentAlert(
    businessId: string,
    eventType: string,
    eventData: any,
    context?: any
  ): Promise<IntelligentAlert | null> {
    try {
      // Get personalization settings
      const personalization = this.personalizationSettings.get(businessId);
      if (!personalization) {
        console.warn(`No personalization settings found for business: ${businessId}`);
        return null;
      }

      // Use AI reasoning engine to analyze the event
      const reasoning = await aiReasoningEngine.shouldSendAlert(
        eventType,
        eventData,
        Array.from(this.alerts.values()).filter(alert => alert.status === 'new')
      );

      // Check if alert should be sent based on personalization thresholds
      if (!reasoning.shouldAlert) {
        console.log(`Alert not sent for ${eventType}: below threshold`);
        return null;
      }

      // Generate personalized alert content
      const alertContent = await this.generatePersonalizedAlertContent(
        eventType,
        eventData,
        reasoning,
        personalization
      );

      // Create the intelligent alert
      const alert: IntelligentAlert = {
        id: this.generateAlertId(),
        type: this.mapEventTypeToAlertType(eventType),
        severity: reasoning.severity,
        title: alertContent.title,
        message: alertContent.message,
        reasoning: reasoning.reasoning,
        action: reasoning.recommendedAction,
        cta: alertContent.cta,
        confidence: this.calculateConfidence(reasoning),
        expectedOutcome: alertContent.expectedOutcome,
        businessImpact: this.calculateBusinessImpact(eventType, eventData),
        personalization: {
          businessName: personalization.businessName,
          industry: personalization.industry,
          location: personalization.location,
          preferredTone: personalization.preferredTone
        },
        createdAt: new Date(),
        expiresAt: this.calculateExpiration(reasoning.severity),
        status: 'new',
        channels: this.determineChannels(reasoning.severity, personalization),
        priority: reasoning.urgency
      };

      // Store the alert
      this.alerts.set(alert.id, alert);

      // Send notifications through configured channels
      await this.sendAlertNotifications(alert);

      console.log(`Intelligent alert created: ${alert.title}`);
      return alert;

    } catch (error) {
      console.error('Error creating intelligent alert:', error);
      return null;
    }
  }

  /**
   * Generate personalized alert content
   */
  private async generatePersonalizedAlertContent(
    eventType: string,
    eventData: any,
    reasoning: any,
    personalization: AlertPersonalization
  ): Promise<{
    title: string;
    message: string;
    cta: string;
    expectedOutcome: string;
  }> {
    const template = AlertTemplates.find(t => t.type === this.mapEventTypeToAlertType(eventType));
    
    if (!template) {
      throw new Error(`No template found for event type: ${eventType}`);
    }

    // Personalize the content based on business settings
    const personalizedTitle = this.personalizeContent(
      template.title,
      personalization,
      eventData
    );

    const personalizedMessage = this.personalizeContent(
      template.message,
      personalization,
      eventData
    );

    const personalizedCTA = this.personalizeContent(
      template.cta,
      personalization,
      eventData
    );

    const expectedOutcome = this.generateExpectedOutcome(
      eventType,
      eventData,
      personalization
    );

    return {
      title: personalizedTitle,
      message: personalizedMessage,
      cta: personalizedCTA,
      expectedOutcome
    };
  }

  /**
   * Personalize content based on business context
   */
  private personalizeContent(
    template: string,
    personalization: AlertPersonalization,
    eventData: any
  ): string {
    let personalizedContent = template;

    // Replace business-specific placeholders
    personalizedContent = personalizedContent.replace(
      /\[Business Name\]/g, 
      personalization.businessName
    );

    personalizedContent = personalizedContent.replace(
      /\[Industry\]/g, 
      personalization.industry
    );

    personalizedContent = personalizedContent.replace(
      /\[Location\]/g, 
      personalization.location
    );

    // Replace event-specific data
    if (eventData.competitorName) {
      personalizedContent = personalizedContent.replace(
        /\[Competitor\]/g, 
        eventData.competitorName
      );
    }

    if (eventData.percentage) {
      personalizedContent = personalizedContent.replace(
        /\[Percentage\]/g, 
        `${eventData.percentage}%`
      );
    }

    if (eventData.amount) {
      personalizedContent = personalizedContent.replace(
        /\[Amount\]/g, 
        `$${eventData.amount}`
      );
    }

    // Adjust tone based on business preference
    personalizedContent = this.adjustTone(
      personalizedContent,
      personalization.preferredTone
    );

    return personalizedContent;
  }

  /**
   * Adjust content tone based on business preference
   */
  private adjustTone(
    content: string,
    preferredTone: 'professional' | 'friendly' | 'conversational'
  ): string {
    switch (preferredTone) {
      case 'friendly':
        return content
          .replace('Detected', 'We spotted')
          .replace('Alert', 'Heads up!')
          .replace('Critical', 'Really important');
      
      case 'conversational':
        return content
          .replace('Detected', 'Found')
          .replace('Alert', 'Quick note')
          .replace('Critical', 'Super important');
      
      default: // professional
        return content;
    }
  }

  /**
   * Generate expected outcome based on event type and data
   */
  private generateExpectedOutcome(
    eventType: string,
    eventData: any,
    personalization: AlertPersonalization
  ): string {
    switch (eventType) {
      case 'price_increase':
        return `Potential revenue increase of $${Math.floor(eventData.percentage * 100)} per month by adjusting your pricing strategy`;
      
      case 'new_service':
        return `Market opportunity worth $${Math.floor(Math.random() * 50000) + 10000} by evaluating similar service offerings`;
      
      case 'negative_review':
        return `Prevent potential loss of ${Math.floor(Math.random() * 20) + 5} customers by responding quickly and professionally`;
      
      case 'revenue_risk':
        return `Protect $${Math.floor(Math.random() * 100000) + 50000} in revenue by implementing recommended actions`;
      
      default:
        return 'Improved competitive positioning and revenue protection';
    }
  }

  /**
   * Calculate business impact of the event
   */
  private calculateBusinessImpact(
    eventType: string,
    eventData: any
  ): { revenue: number; customers: number; reputation: number } {
    switch (eventType) {
      case 'price_increase':
        return {
          revenue: Math.floor(eventData.percentage * 1000),
          customers: Math.floor(eventData.percentage * -5),
          reputation: 0
        };
      
      case 'new_service':
        return {
          revenue: Math.floor(Math.random() * 30000) + 10000,
          customers: Math.floor(Math.random() * 50) + 20,
          reputation: 5
        };
      
      case 'negative_review':
        return {
          revenue: -Math.floor(Math.random() * 5000) - 1000,
          customers: -Math.floor(Math.random() * 10) - 5,
          reputation: -Math.floor(Math.random() * 5) - 2
        };
      
      default:
        return { revenue: 0, customers: 0, reputation: 0 };
    }
  }

  /**
   * Determine which channels to use for the alert
   */
  private determineChannels(
    severity: string,
    personalization: AlertPersonalization
  ): ('email' | 'sms' | 'slack' | 'dashboard')[] {
    const channels: ('email' | 'sms' | 'slack' | 'dashboard')[] = ['dashboard'];

    // Always include dashboard
    if (personalization.alertPreferences.email) {
      channels.push('email');
    }

    // Include SMS for high/critical alerts
    if ((severity === 'high' || severity === 'critical') && personalization.alertPreferences.sms) {
      channels.push('sms');
    }

    // Include Slack for medium+ alerts
    if ((severity === 'medium' || severity === 'high' || severity === 'critical') && personalization.alertPreferences.slack) {
      channels.push('slack');
    }

    return channels;
  }

  /**
   * Calculate alert expiration based on severity
   */
  private calculateExpiration(severity: string): Date {
    const now = new Date();
    const hoursToExpire = {
      low: 72,    // 3 days
      medium: 48, // 2 days
      high: 24,   // 1 day
      critical: 12 // 12 hours
    };

    return new Date(now.getTime() + hoursToExpire[severity as keyof typeof hoursToExpire] * 60 * 60 * 1000);
  }

  /**
   * Calculate confidence score for the alert
   */
  private calculateConfidence(reasoning: any): number {
    // Mock confidence calculation
    let confidence = 75;
    
    if (reasoning.urgency > 80) confidence += 10;
    if (reasoning.severity === 'critical' || reasoning.severity === 'high') confidence += 10;
    
    return Math.min(95, confidence);
  }

  /**
   * Map event type to alert type
   */
  private mapEventTypeToAlertType(eventType: string): 'price_change' | 'new_service' | 'review_alert' | 'revenue_risk' {
    switch (eventType) {
      case 'price_increase':
      case 'price_decrease':
        return 'price_change';
      
      case 'new_service':
      case 'service_launch':
        return 'new_service';
      
      case 'negative_review':
      case 'review_posted':
        return 'review_alert';
      
      case 'revenue_decline':
      case 'market_risk':
        return 'revenue_risk';
      
      default:
        return 'revenue_risk';
    }
  }

  /**
   * Send alert notifications through configured channels
   */
  private async sendAlertNotifications(alert: IntelligentAlert): Promise<void> {
    for (const channel of alert.channels) {
      try {
        await this.sendNotification(alert, channel);
      } catch (error) {
        console.error(`Failed to send ${channel} notification for alert ${alert.id}:`, error);
      }
    }
  }

  /**
   * Send notification through specific channel
   */
  private async sendNotification(
    alert: IntelligentAlert,
    channel: 'email' | 'sms' | 'slack' | 'dashboard'
  ): Promise<void> {
    const notificationContent = this.generateChannelContent(alert, channel);

    switch (channel) {
      case 'email':
        await this.sendEmailNotification(alert, notificationContent);
        break;
      
      case 'sms':
        await this.sendSMSNotification(alert, notificationContent);
        break;
      
      case 'slack':
        await this.sendSlackNotification(alert, notificationContent);
        break;
      
      case 'dashboard':
        // Dashboard notifications are handled in the UI
        console.log(`Dashboard notification: ${alert.title}`);
        break;
    }
  }

  /**
   * Generate channel-specific content
   */
  private generateChannelContent(
    alert: IntelligentAlert,
    channel: 'email' | 'sms' | 'slack' | 'dashboard'
  ): string {
    switch (channel) {
      case 'email':
        return this.generateEmailContent(alert);
      
      case 'sms':
        return this.generateSMSContent(alert);
      
      case 'slack':
        return this.generateSlackContent(alert);
      
      case 'dashboard':
        return this.generateDashboardContent(alert);
      
      default:
        return alert.message;
    }
  }

  /**
   * Generate email content
   */
  private generateEmailContent(alert: IntelligentAlert): string {
    const severityEmoji = {
      low: 'ℹ️',
      medium: '⚠️',
      high: '🚨',
      critical: '🔥'
    };

    return `
${severityEmoji[alert.severity]} **${alert.title}**

${alert.message}

**Why this matters:**
${alert.reasoning}

**Recommended Action:**
${alert.action}

**Expected Outcome:**
${alert.expectedOutcome}

**Business Impact:**
• Revenue: ${alert.businessImpact.revenue > 0 ? '+' : ''}$${alert.businessImpact.revenue.toLocaleString()}
• Customers: ${alert.businessImpact.customers > 0 ? '+' : ''}${alert.businessImpact.customers}
• Reputation: ${alert.businessImpact.reputation > 0 ? '+' : ''}${alert.businessImpact.reputation} points

[${alert.cta}](https://dashboard.mozawave.com/alerts/${alert.id})

---
MozaWave Intelligence Platform
This is an automated alert. Please do not reply to this email.
    `.trim();
  }

  /**
   * Generate SMS content
   */
  private generateSMSContent(alert: IntelligentAlert): string {
    const severityEmoji = {
      low: 'ℹ️',
      medium: '⚠️',
      high: '🚨',
      critical: '🔥'
    };

    return `${severityEmoji[alert.severity]} ${alert.title}

${alert.message}

Action: ${alert.action}

${alert.cta}: https://mozawave.com/alerts/${alert.id}

MozaWave Alert`;
  }

  /**
   * Generate Slack content
   */
  private generateSlackContent(alert: IntelligentAlert): string {
    const severityColor = {
      low: '#36a2eb',
      medium: '#ffce56',
      high: '#ff6384',
      critical: '#ff0000'
    };

    return `{
      "attachments": [
        {
          "color": "${severityColor[alert.severity]}",
          "title": "${alert.title}",
          "text": "${alert.message}",
          "fields": [
            {
              "title": "Recommended Action",
              "value": "${alert.action}",
              "short": false
            },
            {
              "title": "Expected Outcome",
              "value": "${alert.expectedOutcome}",
              "short": false
            },
            {
              "title": "Confidence",
              "value": "${alert.confidence}%",
              "short": true
            },
            {
              "title": "Priority",
              "value": "${alert.priority}/100",
              "short": true
            }
          ],
          "actions": [
            {
              "type": "button",
              "text": "${alert.cta}",
              "url": "https://dashboard.mozawave.com/alerts/${alert.id}"
            }
          ]
        }
      ]
    }`;
  }

  /**
   * Generate dashboard content
   */
  private generateDashboardContent(alert: IntelligentAlert): string {
    return `${alert.title}: ${alert.message}`;
  }

  /**
   * Send email notification
   */
  private async sendEmailNotification(alert: IntelligentAlert, content: string): Promise<void> {
    // Mock implementation - in real system, this would use an email service
    console.log(`📧 Email sent to ${alert.personalization.businessName}: ${alert.title}`);
  }

  /**
   * Send SMS notification
   */
  private async sendSMSNotification(alert: IntelligentAlert, content: string): Promise<void> {
    // Mock implementation - in real system, this would use an SMS service
    console.log(`📱 SMS sent to ${alert.personalization.businessName}: ${alert.title}`);
  }

  /**
   * Send Slack notification
   */
  private async sendSlackNotification(alert: IntelligentAlert, content: string): Promise<void> {
    // Mock implementation - in real system, this would use Slack API
    console.log(`💬 Slack message sent to team: ${alert.title}`);
  }

  /**
   * Generate weekly digest
   */
  async generateWeeklyDigest(businessId: string): Promise<string> {
    const personalization = this.personalizationSettings.get(businessId);
    if (!personalization) {
      throw new Error(`No personalization settings found for business: ${businessId}`);
    }

    // Get alerts from the past week
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyAlerts = Array.from(this.alerts.values())
      .filter(alert => alert.createdAt >= weekAgo && alert.personalization.businessName === personalization.businessName);

    // Generate digest using AI reasoning engine
    const digest = await aiReasoningEngine.generateWeeklyDigest({
      competitorChanges: weeklyAlerts.filter(alert => alert.type === 'price_change' || alert.type === 'new_service'),
      reviews: weeklyAlerts.filter(alert => alert.type === 'review_alert'),
      metrics: {
        totalAlerts: weeklyAlerts.length,
        criticalAlerts: weeklyAlerts.filter(alert => alert.severity === 'critical').length,
        highAlerts: weeklyAlerts.filter(alert => alert.severity === 'high').length
      },
      insights: [] // Would be populated with AI insights
    });

    // Personalize the digest
    const personalizedDigest = this.personalizeDigest(digest, personalization);

    return personalizedDigest;
  }

  /**
   * Personalize digest content
   */
  private personalizeDigest(digest: any, personalization: AlertPersonalization): string {
    let personalizedContent = digest.greeting.replace(
      '[Business Owner]',
      personalization.businessName
    );

    personalizedContent += `\n\n${digest.summary}\n\n`;

    digest.insights.forEach((insight: string) => {
      personalizedContent += `• ${insight}\n`;
    });

    personalizedContent += `\n**Recommended Actions:**\n`;
    digest.actions.forEach((action: string) => {
      personalizedContent += `• ${action}\n`;
    });

    personalizedContent += `\n\n${digest.closing}`;

    return personalizedContent;
  }

  /**
   * Start alert processing loop
   */
  private startAlertProcessing(): void {
    setInterval(async () => {
      if (this.isRunning) {
        await this.processExpiredAlerts();
      }
    }, 60000); // Check every minute
  }

  /**
   * Process expired alerts
   */
  private async processExpiredAlerts(): Promise<void> {
    const now = new Date();
    const expiredAlerts = Array.from(this.alerts.values())
      .filter(alert => alert.expiresAt && alert.expiresAt <= now && alert.status === 'new');

    for (const alert of expiredAlerts) {
      alert.status = 'dismissed';
      console.log(`Alert expired and dismissed: ${alert.title}`);
    }
  }

  /**
   * Get active alerts for a business
   */
  getActiveAlerts(businessId: string): IntelligentAlert[] {
    const personalization = this.personalizationSettings.get(businessId);
    if (!personalization) return [];

    return Array.from(this.alerts.values())
      .filter(alert => 
        alert.personalization.businessName === personalization.businessName &&
        (alert.status === 'new' || alert.status === 'acknowledged')
      )
      .sort((a, b) => b.priority - a.priority);
  }

  /**
   * Acknowledge alert
   */
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (alert) {
      alert.status = 'acknowledged';
      console.log(`Alert acknowledged by ${acknowledgedBy}: ${alert.title}`);
    }
  }

  /**
   * Resolve alert
   */
  async resolveAlert(alertId: string, resolvedBy: string, resolution?: string): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (alert) {
      alert.status = 'resolved';
      console.log(`Alert resolved by ${resolvedBy}: ${alert.title}`);
    }
  }

  /**
   * Generate alert ID
   */
  private generateAlertId(): string {
    return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const intelligentAlertSystem = new IntelligentAlertSystem();

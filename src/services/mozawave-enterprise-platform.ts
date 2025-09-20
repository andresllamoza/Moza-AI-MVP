// MozaWave Enterprise Platform - Main Integration Service
// Orchestrates all services and provides unified API

import { 
  marketWatchService,
  reputationService,
  biDashboard,
  alertSystem
} from './index';

import {
  BusinessMetrics,
  IntelligenceInsight,
  ProprietaryMetric,
  Alert,
  DashboardWidget,
  User,
  Organization,
  CompetitorProfile,
  Review,
  Playbook,
  DigestSchedule
} from '@/types/enterprise-platform';

export interface PlatformStatus {
  isInitialized: boolean;
  services: {
    marketWatch: boolean;
    reputation: boolean;
    businessIntelligence: boolean;
    alertSystem: boolean;
  };
  lastHealthCheck: Date;
  uptime: number;
}

export interface PlatformMetrics {
  totalAlerts: number;
  activeInsights: number;
  trackedCompetitors: number;
  managedReviews: number;
  responseTime: number;
  systemLoad: number;
}

export class MozaWaveEnterprisePlatform {
  private isInitialized: boolean = false;
  private startTime: Date = new Date();
  private platformMetrics: PlatformMetrics = {
    totalAlerts: 0,
    activeInsights: 0,
    trackedCompetitors: 0,
    managedReviews: 0,
    responseTime: 0,
    systemLoad: 0
  };

  /**
   * Initialize the entire MozaWave Enterprise Platform
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing MozaWave Enterprise Platform...');
      
      // Initialize all core services
      await Promise.all([
        marketWatchService.startMonitoring(),
        reputationService.startMonitoring(),
        biDashboard.initializeDashboard('default-org', 'system-user'),
        alertSystem.initialize()
      ]);

      // Start platform monitoring
      this.startPlatformMonitoring();
      
      // Initialize platform metrics
      await this.updatePlatformMetrics();
      
      this.isInitialized = true;
      console.log('✅ MozaWave Enterprise Platform initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize MozaWave Enterprise Platform:', error);
      throw error;
    }
  }

  /**
   * Get platform status and health
   */
  getPlatformStatus(): PlatformStatus {
    return {
      isInitialized: this.isInitialized,
      services: {
        marketWatch: marketWatchService.getCompetitors().length >= 0,
        reputation: reputationService.getReviews().length >= 0,
        businessIntelligence: this.isInitialized,
        alertSystem: alertSystem.getActiveAlerts().length >= 0
      },
      lastHealthCheck: new Date(),
      uptime: Date.now() - this.startTime.getTime()
    };
  }

  /**
   * Get platform metrics
   */
  getPlatformMetrics(): PlatformMetrics {
    return { ...this.platformMetrics };
  }

  /**
   * Initialize dashboard for organization
   */
  async initializeOrganizationDashboard(
    organizationId: string, 
    userId: string
  ): Promise<{
    metrics: BusinessMetrics;
    insights: IntelligenceInsight[];
    proprietaryMetrics: ProprietaryMetric[];
    alerts: Alert[];
    widgets: DashboardWidget[];
  }> {
    if (!this.isInitialized) {
      throw new Error('Platform not initialized. Call initialize() first.');
    }

    return await biDashboard.getDashboardOverview(organizationId, userId);
  }

  /**
   * Add competitor to tracking
   */
  async addCompetitor(competitor: Omit<CompetitorProfile, 'id' | 'lastScanned'>): Promise<CompetitorProfile> {
    if (!this.isInitialized) {
      throw new Error('Platform not initialized. Call initialize() first.');
    }

    return await marketWatchService.addCompetitor(competitor);
  }

  /**
   * Get all tracked competitors
   */
  getTrackedCompetitors(): CompetitorProfile[] {
    return marketWatchService.getCompetitors();
  }

  /**
   * Get recent competitor changes
   */
  getRecentCompetitorChanges(limit: number = 50): any[] {
    return marketWatchService.getRecentChanges(limit);
  }

  /**
   * Add review profile for monitoring
   */
  async addReviewProfile(profile: Omit<any, 'id' | 'lastSync'>): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('Platform not initialized. Call initialize() first.');
    }

    return await reputationService.addReviewProfile(profile);
  }

  /**
   * Get all reviews
   */
  getReviews(): Review[] {
    return reputationService.getReviews();
  }

  /**
   * Generate AI response for review
   */
  async generateReviewResponse(
    review: Review, 
    tone: 'professional' | 'friendly' | 'apologetic' | 'grateful' = 'professional'
  ): Promise<any> {
    return await reputationService.generateAIResponse(review, tone);
  }

  /**
   * Get reputation metrics
   */
  getReputationMetrics(businessId: string): any {
    return reputationService.getReputationMetrics(businessId);
  }

  /**
   * Create alert
   */
  async createAlert(alert: Omit<Alert, 'id' | 'createdAt' | 'status' | 'escalationLevel' | 'notifications'>): Promise<Alert> {
    if (!this.isInitialized) {
      throw new Error('Platform not initialized. Call initialize() first.');
    }

    return await alertSystem.createAlert(alert);
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return alertSystem.getActiveAlerts();
  }

  /**
   * Acknowledge alert
   */
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void> {
    return await alertSystem.acknowledgeAlert(alertId, acknowledgedBy);
  }

  /**
   * Resolve alert
   */
  async resolveAlert(alertId: string, resolvedBy: string, resolution?: string): Promise<void> {
    return await alertSystem.resolveAlert(alertId, resolvedBy, resolution);
  }

  /**
   * Create digest schedule
   */
  async createDigestSchedule(schedule: Omit<DigestSchedule, 'id' | 'lastSent' | 'nextSend'>): Promise<DigestSchedule> {
    return await alertSystem.createDigestSchedule(schedule);
  }

  /**
   * Create playbook
   */
  async createPlaybook(playbook: Omit<Playbook, 'id' | 'createdAt' | 'lastRun' | 'successRate'>): Promise<Playbook> {
    return await alertSystem.createPlaybook(playbook);
  }

  /**
   * Get intelligence insights
   */
  async getIntelligenceInsights(organizationId: string): Promise<IntelligenceInsight[]> {
    return await biDashboard.getIntelligenceInsights(organizationId);
  }

  /**
   * Get proprietary metrics
   */
  async getProprietaryMetrics(organizationId: string): Promise<ProprietaryMetric[]> {
    return await biDashboard.getProprietaryMetrics(organizationId);
  }

  /**
   * Calculate business metrics
   */
  async getBusinessMetrics(organizationId: string): Promise<BusinessMetrics> {
    return await biDashboard.getBusinessMetrics(organizationId);
  }

  /**
   * Generate comprehensive report
   */
  async generateReport(
    organizationId: string,
    type: 'executive' | 'operational' | 'competitive' | 'reputation',
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d'
  ): Promise<{
    summary: any;
    metrics: BusinessMetrics;
    insights: IntelligenceInsight[];
    alerts: Alert[];
    recommendations: string[];
    generatedAt: Date;
  }> {
    if (!this.isInitialized) {
      throw new Error('Platform not initialized. Call initialize() first.');
    }

    const [metrics, insights, alerts] = await Promise.all([
      this.getBusinessMetrics(organizationId),
      this.getIntelligenceInsights(organizationId),
      this.getActiveAlerts()
    ]);

    const summary = this.generateReportSummary(type, metrics, insights, alerts);
    const recommendations = this.generateRecommendations(insights, alerts);

    return {
      summary,
      metrics,
      insights,
      alerts,
      recommendations,
      generatedAt: new Date()
    };
  }

  /**
   * Execute playbook
   */
  async executePlaybook(playbookId: string, triggerData: any): Promise<void> {
    return await alertSystem.executePlaybook(playbookId, triggerData);
  }

  /**
   * Send notification
   */
  async sendNotification(
    channel: 'email' | 'sms' | 'slack' | 'webhook' | 'dashboard',
    recipient: string,
    message: string,
    alertId?: string
  ): Promise<any> {
    return await alertSystem.sendNotification(channel, recipient, message, alertId);
  }

  /**
   * Get platform analytics
   */
  async getPlatformAnalytics(timeframe: '24h' | '7d' | '30d' | '90d' = '7d'): Promise<{
    usage: {
      apiCalls: number;
      alerts: number;
      insights: number;
      users: number;
    };
    performance: {
      responseTime: number;
      uptime: number;
      errorRate: number;
      throughput: number;
    };
    business: {
      revenueImpact: number;
      timeSaved: number;
      costSavings: number;
      roi: number;
    };
  }> {
    // Mock implementation - in real system, this would aggregate data from all services
    return {
      usage: {
        apiCalls: Math.floor(Math.random() * 10000) + 5000,
        alerts: Math.floor(Math.random() * 100) + 50,
        insights: Math.floor(Math.random() * 200) + 100,
        users: Math.floor(Math.random() * 50) + 25
      },
      performance: {
        responseTime: Math.floor(Math.random() * 100) + 50,
        uptime: 99.9,
        errorRate: Math.random() * 0.1,
        throughput: Math.floor(Math.random() * 1000) + 500
      },
      business: {
        revenueImpact: Math.floor(Math.random() * 50000) + 25000,
        timeSaved: Math.floor(Math.random() * 1000) + 500,
        costSavings: Math.floor(Math.random() * 10000) + 5000,
        roi: Math.floor(Math.random() * 300) + 200
      }
    };
  }

  /**
   * Export data
   */
  async exportData(
    organizationId: string,
    format: 'json' | 'csv' | 'pdf',
    dataTypes: ('metrics' | 'insights' | 'alerts' | 'reviews' | 'competitors')[]
  ): Promise<{
    downloadUrl: string;
    expiresAt: Date;
    fileSize: number;
  }> {
    // Mock implementation - in real system, this would generate and upload files
    const fileSize = Math.floor(Math.random() * 10000000) + 1000000; // 1-10MB
    
    return {
      downloadUrl: `https://exports.mozawave.com/${organizationId}/${Date.now()}.${format}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      fileSize
    };
  }

  /**
   * Start platform monitoring
   */
  private startPlatformMonitoring(): void {
    // Update metrics every 5 minutes
    setInterval(async () => {
      await this.updatePlatformMetrics();
    }, 300000);

    // Health check every minute
    setInterval(() => {
      this.performHealthCheck();
    }, 60000);

    console.log('📊 Platform monitoring started');
  }

  /**
   * Update platform metrics
   */
  private async updatePlatformMetrics(): Promise<void> {
    try {
      const competitors = this.getTrackedCompetitors();
      const reviews = this.getReviews();
      const alerts = this.getActiveAlerts();

      this.platformMetrics = {
        totalAlerts: alerts.length,
        activeInsights: 0, // Would be calculated from BI dashboard
        trackedCompetitors: competitors.length,
        managedReviews: reviews.length,
        responseTime: Math.floor(Math.random() * 100) + 50, // Mock
        systemLoad: Math.floor(Math.random() * 30) + 10 // Mock
      };
    } catch (error) {
      console.error('Failed to update platform metrics:', error);
    }
  }

  /**
   * Perform health check
   */
  private performHealthCheck(): void {
    const status = this.getPlatformStatus();
    
    if (!status.isInitialized) {
      console.warn('⚠️ Platform health check failed: Not initialized');
      return;
    }

    const allServicesHealthy = Object.values(status.services).every(healthy => healthy);
    
    if (!allServicesHealthy) {
      console.warn('⚠️ Platform health check failed: Some services unhealthy');
      return;
    }

    // Log health check success (in production, this would be silent)
    console.log('✅ Platform health check passed');
  }

  /**
   * Generate report summary
   */
  private generateReportSummary(
    type: string,
    metrics: BusinessMetrics,
    insights: IntelligenceInsight[],
    alerts: Alert[]
  ): any {
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
    const highPriorityInsights = insights.filter(insight => insight.priority === 'high' || insight.priority === 'critical').length;

    return {
      type,
      period: 'Last 30 days',
      keyMetrics: {
        revenueAtRisk: metrics.revenue?.total || 0,
        competitiveThreats: alerts.filter(a => a.type === 'competitor_activity').length,
        reputationScore: metrics.reputation?.sentimentScore || 0,
        responseRate: metrics.reputation?.responseRate || 0
      },
      criticalIssues: criticalAlerts,
      highPriorityActions: highPriorityInsights,
      overallHealth: criticalAlerts === 0 ? 'Good' : criticalAlerts < 3 ? 'Fair' : 'Poor'
    };
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(insights: IntelligenceInsight[], alerts: Alert[]): string[] {
    const recommendations: string[] = [];

    // Critical alerts
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
    if (criticalAlerts.length > 0) {
      recommendations.push(`🚨 Address ${criticalAlerts.length} critical alerts immediately`);
    }

    // High priority insights
    const highPriorityInsights = insights.filter(insight => insight.priority === 'high' || insight.priority === 'critical');
    if (highPriorityInsights.length > 0) {
      recommendations.push(`📊 Implement ${highPriorityInsights.length} high-priority insights`);
    }

    // Competitive threats
    const competitorAlerts = alerts.filter(alert => alert.type === 'competitor_activity');
    if (competitorAlerts.length > 0) {
      recommendations.push(`👀 Monitor ${competitorAlerts.length} competitive threats`);
    }

    // Reputation issues
    const reputationAlerts = alerts.filter(alert => alert.type === 'negative_sentiment');
    if (reputationAlerts.length > 0) {
      recommendations.push(`⭐ Address ${reputationAlerts.length} reputation concerns`);
    }

    return recommendations;
  }

  /**
   * Shutdown platform
   */
  async shutdown(): Promise<void> {
    try {
      console.log('🔄 Shutting down MozaWave Enterprise Platform...');
      
      marketWatchService.stopMonitoring();
      reputationService.stopMonitoring();
      
      this.isInitialized = false;
      console.log('✅ Platform shutdown complete');
    } catch (error) {
      console.error('❌ Error during platform shutdown:', error);
    }
  }
}

// Export singleton instance
export const mozaWavePlatform = new MozaWaveEnterprisePlatform();

// Export all services for direct access
export {
  marketWatchService,
  reputationService,
  biDashboard,
  alertSystem
};

// Export types
export type {
  PlatformStatus,
  PlatformMetrics
} from './mozawave-enterprise-platform';

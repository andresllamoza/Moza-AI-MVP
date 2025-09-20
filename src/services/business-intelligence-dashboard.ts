// MozaWave Business Intelligence Dashboard
// Unified platform combining internal customer data with external competitive intelligence

import {
  BusinessMetrics,
  IntelligenceInsight,
  ProprietaryMetric,
  RevenueAtRiskScore,
  CompetitorThreatRating,
  SentimentImpactScore,
  DashboardWidget,
  WidgetType,
  WidgetData,
  InsightType,
  InsightCategory,
  Priority,
  MetricCategory,
  TrendDirection,
  User,
  Organization
} from '@/types/enterprise-platform';

import { ProprietaryMetricsCalculator, AIInsightGenerator, AnomalyDetectionSystem } from './enterprise-ai-service';
import { marketWatchService } from './mozawave-market-watch';
import { reputationService } from './mozawave-reputation';

export class BusinessIntelligenceDashboard {
  private metrics: Map<string, BusinessMetrics> = new Map();
  private insights: IntelligenceInsight[] = [];
  private proprietaryMetrics: Map<string, ProprietaryMetric> = new Map();
  private widgets: Map<string, DashboardWidget> = new Map();
  private users: Map<string, User> = new Map();
  private organizations: Map<string, Organization> = new Map();

  /**
   * Initialize dashboard for organization
   */
  async initializeDashboard(organizationId: string, userId: string): Promise<void> {
    console.log(`Initializing BI dashboard for organization ${organizationId}`);
    
    // Load organization data
    await this.loadOrganizationData(organizationId);
    
    // Load user preferences
    await this.loadUserPreferences(userId);
    
    // Initialize default widgets
    await this.initializeDefaultWidgets(organizationId);
    
    // Start real-time data collection
    await this.startRealTimeDataCollection(organizationId);
    
    console.log('BI dashboard initialized successfully');
  }

  /**
   * Get dashboard overview for user
   */
  async getDashboardOverview(organizationId: string, userId: string): Promise<{
    metrics: BusinessMetrics;
    insights: IntelligenceInsight[];
    proprietaryMetrics: ProprietaryMetric[];
    widgets: DashboardWidget[];
    alerts: any[];
  }> {
    const metrics = await this.getBusinessMetrics(organizationId);
    const insights = await this.getIntelligenceInsights(organizationId);
    const proprietaryMetrics = await this.getProprietaryMetrics(organizationId);
    const widgets = await this.getUserWidgets(userId);
    const alerts = await this.getActiveAlerts(organizationId);

    return {
      metrics,
      insights,
      proprietaryMetrics,
      widgets,
      alerts
    };
  }

  /**
   * Get business metrics
   */
  async getBusinessMetrics(organizationId: string): Promise<BusinessMetrics> {
    let metrics = this.metrics.get(organizationId);
    
    if (!metrics) {
      metrics = await this.calculateBusinessMetrics(organizationId);
      this.metrics.set(organizationId, metrics);
    }
    
    return metrics;
  }

  /**
   * Get intelligence insights
   */
  async getIntelligenceInsights(organizationId: string): Promise<IntelligenceInsight[]> {
    // Filter insights for organization
    return this.insights.filter(insight => insight.businessId === organizationId);
  }

  /**
   * Get proprietary metrics
   */
  async getProprietaryMetrics(organizationId: string): Promise<ProprietaryMetric[]> {
    const metrics = Array.from(this.proprietaryMetrics.values())
      .filter(metric => metric.id.includes(organizationId));
    
    return metrics;
  }

  /**
   * Get user-specific widgets
   */
  async getUserWidgets(userId: string): Promise<DashboardWidget[]> {
    const user = this.users.get(userId);
    if (!user) return [];

    return Array.from(this.widgets.values())
      .filter(widget => user.preferences.dashboard.widgets.includes(widget.id))
      .sort((a, b) => a.position.y - b.position.y);
  }

  /**
   * Get active alerts
   */
  async getActiveAlerts(organizationId: string): Promise<any[]> {
    const marketWatchAlerts = marketWatchService.getActiveAlerts();
    const reputationAlerts = await this.getReputationAlerts(organizationId);
    
    return [...marketWatchAlerts, ...reputationAlerts];
  }

  /**
   * Calculate comprehensive business metrics
   */
  private async calculateBusinessMetrics(organizationId: string): Promise<BusinessMetrics> {
    // Get data from all services
    const competitorData = marketWatchService.getCompetitors();
    const reviewData = reputationService.getReviews();
    const reputationMetrics = reputationService.getReputationMetrics(organizationId);
    
    // Calculate revenue metrics
    const revenueMetrics = await this.calculateRevenueMetrics(organizationId);
    
    // Calculate customer metrics
    const customerMetrics = await this.calculateCustomerMetrics(organizationId);
    
    // Calculate competitive metrics
    const competitiveMetrics = await this.calculateCompetitiveMetrics(organizationId, competitorData);
    
    // Calculate operational metrics
    const operationalMetrics = await this.calculateOperationalMetrics(organizationId);

    return {
      id: this.generateId(),
      businessId: organizationId,
      period: 'monthly',
      revenue: revenueMetrics,
      customers: customerMetrics,
      reputation: reputationMetrics,
      competitive: competitiveMetrics,
      operational: operationalMetrics,
      calculatedAt: new Date()
    };
  }

  /**
   * Calculate revenue metrics
   */
  private async calculateRevenueMetrics(organizationId: string): Promise<any> {
    // Mock implementation - in real system, this would integrate with CRM/financial systems
    const baseRevenue = 50000;
    const growthRate = 0.12; // 12% growth
    
    return {
      total: baseRevenue * (1 + growthRate),
      growth: growthRate * 100,
      averageOrderValue: 150,
      customerLifetimeValue: 1200,
      churnRate: 0.05,
      recurringRevenue: baseRevenue * 0.8
    };
  }

  /**
   * Calculate customer metrics
   */
  private async calculateCustomerMetrics(organizationId: string): Promise<any> {
    // Mock implementation
    return {
      total: 1250,
      new: 85,
      active: 1100,
      churned: 25,
      satisfaction: 8.2,
      retention: 0.92
    };
  }

  /**
   * Calculate competitive metrics
   */
  private async calculateCompetitiveMetrics(organizationId: string, competitors: any[]): Promise<any> {
    const marketShare = 15; // 15% market share
    const competitivePosition = this.calculateCompetitivePosition(competitors);
    const threatLevel = this.calculateOverallThreatLevel(competitors);
    
    return {
      marketShare,
      competitivePosition,
      threatLevel,
      opportunities: competitors.length * 2,
      pricingAdvantage: 0.85 // 15% pricing advantage
    };
  }

  /**
   * Calculate operational metrics
   */
  private async calculateOperationalMetrics(organizationId: string): Promise<any> {
    // Mock implementation
    return {
      efficiency: 78,
      costPerAcquisition: 45,
      costPerRetention: 12,
      automationRate: 0.65,
      errorRate: 0.02
    };
  }

  /**
   * Calculate competitive position
   */
  private calculateCompetitivePosition(competitors: any[]): number {
    // Mock calculation based on competitor data
    const avgCompetitorRating = competitors.reduce((sum, c) => sum + (c.rating || 4.0), 0) / competitors.length;
    const ourRating = 4.2; // Mock our rating
    
    return ourRating > avgCompetitorRating ? 1 : 0.5; // 1 = leader, 0.5 = follower
  }

  /**
   * Calculate overall threat level
   */
  private calculateOverallThreatLevel(competitors: any[]): string {
    const highThreatCompetitors = competitors.filter(c => c.threatLevel === 'high' || c.threatLevel === 'critical').length;
    
    if (highThreatCompetitors >= 3) return 'critical';
    if (highThreatCompetitors >= 2) return 'high';
    if (highThreatCompetitors >= 1) return 'medium';
    return 'low';
  }

  /**
   * Generate intelligence insights
   */
  async generateIntelligenceInsights(organizationId: string): Promise<void> {
    const metrics = await this.getBusinessMetrics(organizationId);
    const competitorChanges = marketWatchService.getRecentChanges(100);
    const reviews = reputationService.getReviews();
    const marketData = await this.getMarketData(organizationId);

    // Generate insights using AI
    const newInsights = AIInsightGenerator.generateInsights(
      metrics,
      competitorChanges,
      reviews,
      marketData
    );

    // Add to insights list
    this.insights.push(...newInsights);

    // Detect anomalies
    const anomalyInsights = await this.detectAnomalies(organizationId);
    this.insights.push(...anomalyInsights);

    console.log(`Generated ${newInsights.length} new insights for organization ${organizationId}`);
  }

  /**
   * Detect anomalies in business metrics
   */
  private async detectAnomalies(organizationId: string): Promise<IntelligenceInsight[]> {
    const currentMetrics = await this.getBusinessMetrics(organizationId);
    const historicalMetrics = await this.getHistoricalMetrics(organizationId);
    
    return AnomalyDetectionSystem.detectAnomalies(currentMetrics, historicalMetrics);
  }

  /**
   * Calculate proprietary metrics
   */
  async calculateProprietaryMetrics(organizationId: string): Promise<void> {
    const metrics = await this.getBusinessMetrics(organizationId);
    const competitorChanges = marketWatchService.getRecentChanges(50);
    const reviews = reputationService.getReviews();
    
    // Calculate Revenue-at-Risk Score
    const revenueAtRisk = ProprietaryMetricsCalculator.calculateRevenueAtRisk(
      competitorChanges,
      metrics.reputation,
      { volatility: 0.15 },
      { errorRate: 0.02 }
    );
    
    // Calculate Competitor Threat Rating for each competitor
    const competitors = marketWatchService.getCompetitors();
    for (const competitor of competitors) {
      const threatRating = ProprietaryMetricsCalculator.calculateCompetitorThreatRating(
        competitor.id,
        { current: 0.12, previous: 0.10 },
        { priceChanges: competitorChanges.filter(c => c.type === 'pricing') },
        { adSpend: 5000, campaigns: [] },
        { newServices: [], expansions: [] }
      );
      
      this.proprietaryMetrics.set(
        `threat-${competitor.id}`,
        this.convertToProprietaryMetric(threatRating, 'competitive')
      );
    }
    
    // Calculate Sentiment Impact Score
    const sentimentImpact = ProprietaryMetricsCalculator.calculateSentimentImpactScore(
      organizationId,
      metrics.reputation.sentimentScore,
      metrics.reputation.responseRate,
      85, // Response quality
      metrics.customers.satisfaction
    );
    
    this.proprietaryMetrics.set(
      `sentiment-${organizationId}`,
      this.convertToProprietaryMetric(sentimentImpact, 'reputation')
    );
    
    this.proprietaryMetrics.set(
      `revenue-risk-${organizationId}`,
      this.convertToProprietaryMetric(revenueAtRisk, 'revenue')
    );
  }

  /**
   * Convert calculation result to proprietary metric
   */
  private convertToProprietaryMetric(data: any, category: MetricCategory): ProprietaryMetric {
    return {
      id: `${category}-${this.generateId()}`,
      name: data.name || `${category} Score`,
      category,
      calculation: {
        formula: 'Proprietary MozaWave Algorithm',
        inputs: Object.keys(data.calculation || {}),
        weights: {},
        adjustments: {}
      },
      value: data.score || data.rating || data.value || 0,
      trend: data.trend || 'stable',
      benchmark: {
        industry: 50,
        topQuartile: 75,
        median: 50,
        bottomQuartile: 25,
        lastUpdated: new Date()
      },
      interpretation: {
        meaning: this.generateMetricMeaning(data),
        implications: this.generateMetricImplications(data),
        recommendations: data.recommendations || [],
        confidence: data.confidence || 85
      },
      recommendations: data.recommendations || [],
      lastCalculated: new Date()
    };
  }

  /**
   * Generate metric meaning
   */
  private generateMetricMeaning(data: any): string {
    const score = data.score || data.rating || data.value || 0;
    
    if (data.name?.includes('Revenue-at-Risk')) {
      if (score > 80) return 'High revenue risk - immediate action required';
      if (score > 60) return 'Moderate revenue risk - monitor closely';
      if (score > 40) return 'Low revenue risk - maintain current strategies';
      return 'Very low revenue risk - excellent position';
    }
    
    if (data.name?.includes('Threat')) {
      if (score > 80) return 'High competitive threat - defensive action needed';
      if (score > 60) return 'Moderate threat - monitor competitor activities';
      if (score > 40) return 'Low threat - maintain competitive advantage';
      return 'Minimal threat - strong market position';
    }
    
    return `Score of ${score} indicates ${score > 70 ? 'strong' : score > 40 ? 'moderate' : 'weak'} performance`;
  }

  /**
   * Generate metric implications
   */
  private generateMetricImplications(data: any): string[] {
    const score = data.score || data.rating || data.value || 0;
    const implications: string[] = [];
    
    if (score > 80) {
      implications.push('Immediate action required');
      implications.push('High priority for management attention');
      implications.push('Potential significant business impact');
    } else if (score > 60) {
      implications.push('Monitor closely');
      implications.push('Consider preventive measures');
      implications.push('Regular review recommended');
    } else if (score > 40) {
      implications.push('Maintain current strategies');
      implications.push('Regular monitoring sufficient');
      implications.push('Opportunity for optimization');
    } else {
      implications.push('Excellent performance');
      implications.push('Continue current approach');
      implications.push('Share best practices');
    }
    
    return implications;
  }

  /**
   * Initialize default widgets for new user
   */
  private async initializeDefaultWidgets(organizationId: string): Promise<void> {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'revenue-overview',
        type: 'revenue_trend',
        title: 'Revenue Overview',
        position: { x: 0, y: 0 },
        size: { width: 6, height: 4 },
        data: {
          type: 'chart',
          content: { type: 'line', data: [] },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 300000,
        isVisible: true
      },
      {
        id: 'competitive-activity',
        type: 'competitor_activity',
        title: 'Competitive Activity',
        position: { x: 6, y: 0 },
        size: { width: 6, height: 4 },
        data: {
          type: 'table',
          content: { headers: [], rows: [] },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 600000,
        isVisible: true
      },
      {
        id: 'review-sentiment',
        type: 'review_sentiment',
        title: 'Review Sentiment',
        position: { x: 0, y: 4 },
        size: { width: 4, height: 3 },
        data: {
          type: 'chart',
          content: { type: 'donut', data: [] },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 300000,
        isVisible: true
      },
      {
        id: 'threat-level',
        type: 'threat_level',
        title: 'Threat Level',
        position: { x: 4, y: 4 },
        size: { width: 4, height: 3 },
        data: {
          type: 'metric',
          content: { value: 65, unit: '%', trend: 'up' },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 600000,
        isVisible: true
      },
      {
        id: 'opportunity-score',
        type: 'opportunity_score',
        title: 'Opportunity Score',
        position: { x: 8, y: 4 },
        size: { width: 4, height: 3 },
        data: {
          type: 'metric',
          content: { value: 78, unit: '%', trend: 'stable' },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 600000,
        isVisible: true
      },
      {
        id: 'ai-insights',
        type: 'ai_insights',
        title: 'AI Insights',
        position: { x: 0, y: 7 },
        size: { width: 8, height: 4 },
        data: {
          type: 'list',
          content: { items: [] },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 300000,
        isVisible: true
      },
      {
        id: 'alert-feed',
        type: 'alert_feed',
        title: 'Active Alerts',
        position: { x: 8, y: 7 },
        size: { width: 4, height: 4 },
        data: {
          type: 'list',
          content: { items: [] },
          lastUpdated: new Date()
        },
        filters: [],
        refreshInterval: 60000,
        isVisible: true
      }
    ];

    for (const widget of defaultWidgets) {
      this.widgets.set(widget.id, widget);
    }
  }

  /**
   * Start real-time data collection
   */
  private async startRealTimeDataCollection(organizationId: string): Promise<void> {
    // Update metrics every 5 minutes
    setInterval(async () => {
      await this.updateMetrics(organizationId);
    }, 300000);

    // Generate insights every hour
    setInterval(async () => {
      await this.generateIntelligenceInsights(organizationId);
      await this.calculateProprietaryMetrics(organizationId);
    }, 3600000);

    console.log('Real-time data collection started');
  }

  /**
   * Update business metrics
   */
  private async updateMetrics(organizationId: string): Promise<void> {
    const newMetrics = await this.calculateBusinessMetrics(organizationId);
    this.metrics.set(organizationId, newMetrics);
    
    // Update widget data
    await this.updateWidgetData(organizationId);
  }

  /**
   * Update widget data
   */
  private async updateWidgetData(organizationId: string): Promise<void> {
    const metrics = await this.getBusinessMetrics(organizationId);
    
    // Update revenue widget
    const revenueWidget = this.widgets.get('revenue-overview');
    if (revenueWidget) {
      revenueWidget.data = {
        type: 'chart',
        content: {
          type: 'line',
          data: this.generateRevenueChartData(metrics)
        },
        lastUpdated: new Date()
      };
    }
    
    // Update competitive activity widget
    const competitiveWidget = this.widgets.get('competitive-activity');
    if (competitiveWidget) {
      const competitorChanges = marketWatchService.getRecentChanges(10);
      competitiveWidget.data = {
        type: 'table',
        content: {
          headers: ['Competitor', 'Change', 'Impact', 'Date'],
          rows: competitorChanges.map(change => [
            this.getCompetitorName(change.competitorId),
            change.title,
            change.impact,
            change.detectedAt.toLocaleDateString()
          ])
        },
        lastUpdated: new Date()
      };
    }
    
    // Update review sentiment widget
    const sentimentWidget = this.widgets.get('review-sentiment');
    if (sentimentWidget) {
      const reviews = reputationService.getReviews();
      sentimentWidget.data = {
        type: 'chart',
        content: {
          type: 'donut',
          data: this.generateSentimentChartData(reviews)
        },
        lastUpdated: new Date()
      };
    }
    
    // Update AI insights widget
    const insightsWidget = this.widgets.get('ai-insights');
    if (insightsWidget) {
      const insights = await this.getIntelligenceInsights(organizationId);
      insightsWidget.data = {
        type: 'list',
        content: {
          items: insights.slice(0, 5).map(insight => ({
            title: insight.title,
            description: insight.description,
            priority: insight.priority,
            confidence: insight.confidence
          }))
        },
        lastUpdated: new Date()
      };
    }
  }

  /**
   * Generate revenue chart data
   */
  private generateRevenueChartData(metrics: BusinessMetrics): any {
    // Mock implementation - generate 12 months of data
    const months = [];
    const revenue = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      revenue.push(metrics.revenue.total * (0.8 + Math.random() * 0.4)); // ±20% variation
    }
    
    return { labels: months, datasets: [{ label: 'Revenue', data: revenue }] };
  }

  /**
   * Generate sentiment chart data
   */
  private generateSentimentChartData(reviews: any[]): any {
    const sentimentCounts = {
      'very_positive': 0,
      'positive': 0,
      'neutral': 0,
      'negative': 0,
      'very_negative': 0
    };
    
    reviews.forEach(review => {
      sentimentCounts[review.sentiment]++;
    });
    
    return Object.entries(sentimentCounts).map(([sentiment, count]) => ({
      label: sentiment.replace('_', ' ').toUpperCase(),
      value: count,
      color: this.getSentimentColor(sentiment)
    }));
  }

  /**
   * Get sentiment color
   */
  private getSentimentColor(sentiment: string): string {
    const colors = {
      'very_positive': '#10B981',
      'positive': '#34D399',
      'neutral': '#FBBF24',
      'negative': '#F87171',
      'very_negative': '#EF4444'
    };
    
    return colors[sentiment as keyof typeof colors] || '#6B7280';
  }

  /**
   * Get competitor name by ID
   */
  private getCompetitorName(competitorId: string): string {
    const competitors = marketWatchService.getCompetitors();
    const competitor = competitors.find(c => c.id === competitorId);
    return competitor?.name || 'Unknown Competitor';
  }

  /**
   * Load organization data
   */
  private async loadOrganizationData(organizationId: string): Promise<void> {
    // Mock implementation - in real system, this would load from database
    const organization: Organization = {
      id: organizationId,
      name: 'Sample Business',
      industry: 'home_services',
      size: 'medium',
      plan: {
        id: 'pro',
        name: 'Professional',
        features: [],
        limits: {
          competitors: 50,
          reviews: 1000,
          alerts: 200,
          users: 10,
          storage: 100,
          apiCalls: 10000
        },
        pricing: {
          monthly: 199,
          yearly: 1990,
          currency: 'USD'
        },
        billing: {
          interval: 'monthly',
          trialDays: 14
        }
      },
      settings: {
        timezone: 'America/New_York',
        currency: 'USD',
        businessHours: {
          monday: { open: '09:00', close: '17:00', isClosed: false },
          tuesday: { open: '09:00', close: '17:00', isClosed: false },
          wednesday: { open: '09:00', close: '17:00', isClosed: false },
          thursday: { open: '09:00', close: '17:00', isClosed: false },
          friday: { open: '09:00', close: '17:00', isClosed: false },
          saturday: { open: '10:00', close: '15:00', isClosed: false },
          sunday: { open: '10:00', close: '15:00', isClosed: false }
        },
        notifications: {
          enabled: true,
          channels: ['email', 'slack'],
          frequency: 'immediate',
          recipients: []
        },
        integrations: []
      },
      billing: {
        plan: 'Professional',
        status: 'active',
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        amount: 199,
        currency: 'USD'
      },
      createdAt: new Date(),
      isActive: true
    };
    
    this.organizations.set(organizationId, organization);
  }

  /**
   * Load user preferences
   */
  private async loadUserPreferences(userId: string): Promise<void> {
    // Mock implementation
    const user: User = {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'admin',
      organizationId: 'org-1',
      permissions: [],
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          sms: false,
          slack: true,
          frequency: 'immediate',
          types: ['alerts', 'insights']
        },
        dashboard: {
          layout: 'default',
          widgets: ['revenue-overview', 'competitive-activity', 'review-sentiment', 'threat-level', 'opportunity-score', 'ai-insights', 'alert-feed'],
          refreshRate: 300000,
          autoRefresh: true
        },
        language: 'en',
        timezone: 'America/New_York'
      },
      lastLogin: new Date(),
      createdAt: new Date(),
      isActive: true
    };
    
    this.users.set(userId, user);
  }

  /**
   * Get market data
   */
  private async getMarketData(organizationId: string): Promise<any> {
    // Mock implementation
    return {
      businessId: organizationId,
      marketSize: 1000000,
      growthRate: 0.08,
      competition: 25,
      trends: ['digital_transformation', 'sustainability', 'automation']
    };
  }

  /**
   * Get historical metrics
   */
  private async getHistoricalMetrics(organizationId: string): Promise<BusinessMetrics[]> {
    // Mock implementation - generate 30 days of historical data
    const historical: BusinessMetrics[] = [];
    const baseMetrics = await this.getBusinessMetrics(organizationId);
    
    for (let i = 30; i > 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      
      historical.push({
        ...baseMetrics,
        id: `historical-${i}`,
        calculatedAt: date,
        revenue: {
          ...baseMetrics.revenue,
          total: baseMetrics.revenue.total * (1 + variation)
        },
        customers: {
          ...baseMetrics.customers,
          satisfaction: Math.max(1, Math.min(10, baseMetrics.customers.satisfaction + (Math.random() - 0.5) * 2))
        }
      });
    }
    
    return historical;
  }

  /**
   * Get reputation alerts
   */
  private async getReputationAlerts(organizationId: string): Promise<any[]> {
    // Mock implementation
    return [
      {
        id: 'rep-alert-1',
        type: 'negative_sentiment',
        severity: 'warning',
        title: 'Negative Review Trend',
        message: 'Recent reviews show declining sentiment',
        createdAt: new Date()
      }
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const biDashboard = new BusinessIntelligenceDashboard();

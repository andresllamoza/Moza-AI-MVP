// MozaWave Enterprise Platform - Service Exports
// Central export file for all platform services

// Core Services
export { marketWatchService } from './mozawave-market-watch';
export { reputationService } from './mozawave-reputation';
export { biDashboard } from './business-intelligence-dashboard';
export { alertSystem } from './alert-notification-system';

// AI & Analytics Services
export {
  ProprietaryMetricsCalculator,
  AIInsightGenerator,
  AdaptiveLearningSystem,
  AnomalyDetectionSystem
} from './enterprise-ai-service';

// Main Platform Integration
export { 
  mozaWavePlatform,
  type PlatformStatus,
  type PlatformMetrics
} from './mozawave-enterprise-platform';

// Legacy Services (for backward compatibility)
export { competitorTrackerAPI } from './competitorTrackerApi';
export { reviewManagerAPI } from './reviewManagerApi';
export { realApiService } from './realApiService';

// Type Exports
export type {
  // Enterprise Platform Types
  User,
  Organization,
  BusinessMetrics,
  IntelligenceInsight,
  ProprietaryMetric,
  Alert,
  DashboardWidget,
  CompetitorProfile,
  CompetitorChange,
  PricingIntelligence,
  MarketingIntelligence,
  Review,
  ReviewProfile,
  AIResponse,
  ReviewCampaign,
  DigestSchedule,
  Playbook,
  PlaybookAction,
  Notification,
  
  // AI & Learning Types
  AIModel,
  LearningFeedback,
  AdaptiveLearning,
  ModelPerformance,
  
  // Analytics Types
  RevenueAtRiskScore,
  CompetitorThreatRating,
  SentimentImpactScore,
  
  // UI & Widget Types
  WidgetType,
  WidgetData,
  WidgetPosition,
  WidgetSize,
  WidgetFilter,
  
  // Alert & Notification Types
  AlertType,
  AlertSeverity,
  AlertStatus,
  NotificationChannel,
  NotificationStatus,
  
  // Business Intelligence Types
  InsightType,
  InsightCategory,
  Priority,
  TrendDirection,
  MetricCategory,
  
  // Integration Types
  IntegrationPlatform,
  IntegrationStatus,
  IntegrationSettings,
  
  // Response & Campaign Types
  ResponseTone,
  ReviewStatus,
  CampaignType,
  CampaignStatus,
  CampaignResults,
  
  // Change & Intelligence Types
  ChangeType,
  ChangeCategory,
  ChangeImpact,
  DataSource,
  ThreatLevel,
  
  // Digest & Schedule Types
  DigestType,
  DigestFrequency,
  DigestFormat,
  
  // Action & Playbook Types
  ActionType,
  PlaybookTrigger,
  PlaybookCondition,
  ActionCondition,
  RetryPolicy,
  
  // Model & Learning Types
  ModelType,
  FeedbackAction,
  ModelImprovement,
  PerformanceGain,
  
  // User & Organization Types
  UserRole,
  OrganizationSize,
  BusinessIndustry,
  UserPreferences,
  NotificationPreferences,
  DashboardPreferences,
  Permission,
  OrganizationSettings,
  BillingInfo,
  Feature,
  PlanLimits,
  PricingTier,
  BillingCycle,
  
  // Location & Business Types
  BusinessLocation,
  SocialMediaProfiles,
  BusinessInfo,
  BusinessHours,
  DayHours,
  
  // Customer & Review Types
  CustomerInfo,
  ReviewMetadata,
  AIAnalysis,
  Recommendation,
  ImpactAssessment,
  EffortLevel,
  
  // Campaign & Marketing Types
  Campaign,
  AdSpend,
  CampaignPerformance,
  CreativeAssets,
  TargetingInfo,
  AIInsights,
  
  // Digest & Template Types
  DigestFilter,
  DigestTemplate,
  DigestSection,
  DigestStyling,
  DigestBranding,
  
  // Metrics & Calculation Types
  MetricCalculation,
  BenchmarkData,
  MetricInterpretation,
  RiskFactor,
  ThreatFactor,
  SentimentFactor,
  
  // Training & Performance Types
  TrainingData,
  ModelSettings,
  
  // Revenue & Customer Types
  RevenueMetrics,
  CustomerMetrics,
  ReputationMetrics,
  CompetitiveMetrics,
  OperationalMetrics,
  
  // Scan & Sync Types
  ScanFrequency,
  SyncFrequency,
  
  // Price & Market Types
  PriceChangeType,
  MarketPosition,
  PricingOpportunity,
  RevenueImpact,
  
  // Time & Period Types
  TimePeriod,
  
  // Evidence & Source Types
  Evidence,
  
  // Action Taken Types
  ActionTaken,
  
  // Additional Supporting Types
  HumanResponse,
  FollowUpAction,
  UserFeedback,
  TargetAudience,
  CampaignMessage,
  CampaignSchedule,
  ReviewSettings,
  EscalationRule,
  AISettings
} from '@/types/enterprise-platform';

// Re-export commonly used types from existing files
export type {
  Competitor,
  CompetitorComplaint,
  CompetitorProductLaunch,
  MarketingTrend,
  MarketOpportunity,
  CompetitiveThreat,
  IntelligenceInsight as LegacyIntelligenceInsight,
  MarketBenchmark,
  StrategicRecommendation,
  CompetitiveIntelligenceDashboard,
  DualIntelligenceInsight,
  CompetitiveFilter,
  MarketOpportunityFilter
} from '@/types/competitiveIntelligence';

export type {
  Customer,
  CustomerInteraction,
  Complaint,
  Review as LegacyReview,
  RevenueIntelligence,
  DashboardMetrics,
  Alert as LegacyAlert,
  InteractionFilter,
  ComplaintFilter,
  ReviewFilter,
  BusinessIndustry as LegacyBusinessIndustry,
  CustomerType,
  CustomerStatus,
  InteractionType,
  InteractionChannel,
  InteractionStatus,
  Priority as LegacyPriority,
  Sentiment,
  ComplaintCategory,
  ComplaintSeverity,
  ComplaintStatus,
  ReviewPlatform,
  ReviewStatus as LegacyReviewStatus
} from '@/types/moza-intelligence';

// Service Status Enum
export enum ServiceStatus {
  INITIALIZING = 'initializing',
  RUNNING = 'running',
  STOPPED = 'stopped',
  ERROR = 'error'
}

// Platform Configuration
export interface PlatformConfig {
  apiBaseUrl: string;
  wsBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    marketWatch: boolean;
    reputation: boolean;
    businessIntelligence: boolean;
    alertSystem: boolean;
  };
  limits: {
    maxCompetitors: number;
    maxReviews: number;
    maxAlerts: number;
    maxUsers: number;
  };
  integrations: {
    google: boolean;
    yelp: boolean;
    facebook: boolean;
    instagram: boolean;
    slack: boolean;
    email: boolean;
    sms: boolean;
  };
}

// Default Platform Configuration
export const defaultPlatformConfig: PlatformConfig = {
  apiBaseUrl: import.meta.env.VITE_API_URL || 'https://api.mozawave.com',
  wsBaseUrl: import.meta.env.VITE_WS_URL || 'wss://api.mozawave.com',
  environment: (import.meta.env.MODE as any) || 'development',
  features: {
    marketWatch: true,
    reputation: true,
    businessIntelligence: true,
    alertSystem: true
  },
  limits: {
    maxCompetitors: 100,
    maxReviews: 10000,
    maxAlerts: 1000,
    maxUsers: 50
  },
  integrations: {
    google: true,
    yelp: true,
    facebook: true,
    instagram: true,
    slack: true,
    email: true,
    sms: true
  }
};

// Utility Functions
export const getServiceStatus = (serviceName: string): ServiceStatus => {
  // Mock implementation - in real system, this would check actual service status
  return ServiceStatus.RUNNING;
};

export const validatePlatformConfig = (config: Partial<PlatformConfig>): PlatformConfig => {
  return {
    ...defaultPlatformConfig,
    ...config
  };
};

// Service Health Check
export const checkServiceHealth = async (): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, 'up' | 'down' | 'degraded'>;
  timestamp: Date;
}> => {
  // Mock implementation - in real system, this would check actual service health
  return {
    status: 'healthy',
    services: {
      marketWatch: 'up',
      reputation: 'up',
      businessIntelligence: 'up',
      alertSystem: 'up'
    },
    timestamp: new Date()
  };
};

// Platform Initialization Helper
export const initializePlatform = async (config?: Partial<PlatformConfig>): Promise<void> => {
  const platformConfig = validatePlatformConfig(config || {});
  
  try {
    // Initialize all services
    await mozaWavePlatform.initialize();
    
    console.log('✅ MozaWave Enterprise Platform initialized successfully');
    console.log('📊 Platform Configuration:', platformConfig);
    
  } catch (error) {
    console.error('❌ Failed to initialize MozaWave Enterprise Platform:', error);
    throw error;
  }
};

// Platform Cleanup Helper
export const shutdownPlatform = async (): Promise<void> => {
  try {
    await mozaWavePlatform.shutdown();
    console.log('✅ MozaWave Enterprise Platform shutdown complete');
  } catch (error) {
    console.error('❌ Error during platform shutdown:', error);
    throw error;
  }
};

// Export everything as default for convenience
export default {
  // Services
  marketWatchService,
  reputationService,
  biDashboard,
  alertSystem,
  mozaWavePlatform,
  
  // AI Services
  ProprietaryMetricsCalculator,
  AIInsightGenerator,
  AdaptiveLearningSystem,
  AnomalyDetectionSystem,
  
  // Utilities
  getServiceStatus,
  validatePlatformConfig,
  checkServiceHealth,
  initializePlatform,
  shutdownPlatform,
  
  // Configuration
  defaultPlatformConfig,
  ServiceStatus
};

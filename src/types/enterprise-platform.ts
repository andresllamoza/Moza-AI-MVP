// MozaWave Enterprise Platform - Complete Type System
// Defines the core data models for the three main services

// =============================================================================
// CORE PLATFORM TYPES
// =============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  permissions: Permission[];
  preferences: UserPreferences;
  lastLogin: Date;
  createdAt: Date;
  isActive: boolean;
}

export interface Organization {
  id: string;
  name: string;
  industry: BusinessIndustry;
  size: OrganizationSize;
  plan: SubscriptionPlan;
  settings: OrganizationSettings;
  billing: BillingInfo;
  createdAt: Date;
  isActive: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  features: Feature[];
  limits: PlanLimits;
  pricing: PricingTier;
  billing: BillingCycle;
}

// =============================================================================
// MOWAWAVE MARKET WATCH (Competitor Intelligence)
// =============================================================================

export interface CompetitorProfile {
  id: string;
  name: string;
  industry: BusinessIndustry;
  location: BusinessLocation;
  website?: string;
  socialMedia: SocialMediaProfiles;
  businessInfo: BusinessInfo;
  threatLevel: ThreatLevel;
  marketShare: number;
  lastScanned: Date;
  scanFrequency: ScanFrequency;
  isActive: boolean;
  tags: string[];
  notes?: string;
}

export interface CompetitorChange {
  id: string;
  competitorId: string;
  type: ChangeType;
  category: ChangeCategory;
  title: string;
  description: string;
  detectedAt: Date;
  impact: ChangeImpact;
  confidence: number; // 0-100
  source: DataSource;
  rawData: Record<string, any>;
  aiAnalysis: AIAnalysis;
  recommendations: Recommendation[];
  status: ChangeStatus;
  assignedTo?: string;
  actionTaken?: ActionTaken;
}

export interface PricingIntelligence {
  id: string;
  competitorId: string;
  service: string;
  oldPrice?: number;
  newPrice: number;
  currency: string;
  changeType: PriceChangeType;
  changeDate: Date;
  detectedAt: Date;
  marketPosition: MarketPosition;
  ourPrice?: number;
  priceGap: number;
  opportunity: PricingOpportunity;
  recommendedAction: string;
  confidence: number;
  impact: RevenueImpact;
  alerts: Alert[];
}

export interface MarketingIntelligence {
  id: string;
  competitorId: string;
  campaign: Campaign;
  adSpend: AdSpend;
  performance: CampaignPerformance;
  creative: CreativeAssets;
  targeting: TargetingInfo;
  detectedAt: Date;
  aiInsights: AIInsights;
  recommendations: Recommendation[];
}

// =============================================================================
// MOWAWAVE REPUTATION (AI Review Manager)
// =============================================================================

export interface ReviewProfile {
  id: string;
  businessId: string;
  platform: ReviewPlatform;
  profileUrl: string;
  isActive: boolean;
  settings: ReviewSettings;
  lastSync: Date;
  syncFrequency: SyncFrequency;
  aiSettings: AISettings;
}

export interface Review {
  id: string;
  businessId: string;
  platform: ReviewPlatform;
  externalId: string;
  customer: CustomerInfo;
  rating: number; // 1-5
  title?: string;
  content: string;
  sentiment: Sentiment;
  status: ReviewStatus;
  publishedAt: Date;
  detectedAt: Date;
  aiResponse?: AIResponse;
  humanResponse?: HumanResponse;
  tags: string[];
  metadata: ReviewMetadata;
  followUp?: FollowUpAction;
}

export interface AIResponse {
  id: string;
  reviewId: string;
  tone: ResponseTone;
  content: string;
  confidence: number;
  reasoning: string;
  generatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  sentAt?: Date;
  feedback?: UserFeedback;
}

export interface ReviewCampaign {
  id: string;
  businessId: string;
  name: string;
  type: CampaignType;
  targetAudience: TargetAudience;
  message: CampaignMessage;
  schedule: CampaignSchedule;
  status: CampaignStatus;
  results: CampaignResults;
  createdAt: Date;
  lastRun?: Date;
}

// =============================================================================
// BUSINESS INTELLIGENCE DASHBOARD
// =============================================================================

export interface BusinessMetrics {
  id: string;
  businessId: string;
  period: TimePeriod;
  revenue: RevenueMetrics;
  customers: CustomerMetrics;
  reputation: ReputationMetrics;
  competitive: CompetitiveMetrics;
  operational: OperationalMetrics;
  calculatedAt: Date;
}

export interface IntelligenceInsight {
  id: string;
  businessId: string;
  type: InsightType;
  category: InsightCategory;
  title: string;
  description: string;
  priority: Priority;
  confidence: number;
  impact: ImpactAssessment;
  source: DataSource;
  evidence: Evidence[];
  recommendations: Recommendation[];
  status: InsightStatus;
  createdAt: Date;
  assignedTo?: string;
  actionTaken?: ActionTaken;
  followUpDate?: Date;
}

export interface ProprietaryMetric {
  id: string;
  name: string;
  category: MetricCategory;
  calculation: MetricCalculation;
  value: number;
  trend: TrendDirection;
  benchmark: BenchmarkData;
  interpretation: MetricInterpretation;
  recommendations: string[];
  lastCalculated: Date;
}

// =============================================================================
// AI & ADAPTIVE LEARNING SYSTEM
// =============================================================================

export interface AIModel {
  id: string;
  name: string;
  type: ModelType;
  version: string;
  trainingData: TrainingData;
  performance: ModelPerformance;
  lastTrained: Date;
  isActive: boolean;
  settings: ModelSettings;
}

export interface LearningFeedback {
  id: string;
  modelId: string;
  userId: string;
  action: FeedbackAction;
  originalOutput: string;
  correctedOutput?: string;
  feedback: string;
  timestamp: Date;
  context: Record<string, any>;
}

export interface AdaptiveLearning {
  id: string;
  modelId: string;
  feedback: LearningFeedback[];
  improvements: ModelImprovement[];
  performanceGains: PerformanceGain[];
  lastUpdated: Date;
}

// =============================================================================
// ALERT & NOTIFICATION SYSTEM
// =============================================================================

export interface Alert {
  id: string;
  businessId: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  source: AlertSource;
  data: Record<string, any>;
  createdAt: Date;
  status: AlertStatus;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolvedBy?: string;
  resolvedAt?: Date;
  escalationLevel: number;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  alertId: string;
  channel: NotificationChannel;
  recipient: string;
  message: string;
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  error?: string;
}

export interface DigestSchedule {
  id: string;
  businessId: string;
  type: DigestType;
  frequency: DigestFrequency;
  format: DigestFormat;
  recipients: string[];
  filters: DigestFilter;
  template: DigestTemplate;
  isActive: boolean;
  lastSent?: Date;
  nextSend?: Date;
}

// =============================================================================
// PLAYBOOK AUTOMATION
// =============================================================================

export interface Playbook {
  id: string;
  businessId: string;
  name: string;
  description: string;
  triggers: PlaybookTrigger[];
  actions: PlaybookAction[];
  conditions: PlaybookCondition[];
  isActive: boolean;
  createdAt: Date;
  lastRun?: Date;
  successRate: number;
}

export interface PlaybookAction {
  id: string;
  playbookId: string;
  type: ActionType;
  order: number;
  parameters: Record<string, any>;
  conditions: ActionCondition[];
  timeout?: number;
  retryPolicy: RetryPolicy;
  isEnabled: boolean;
}

// =============================================================================
// ENUMS AND TYPE DEFINITIONS
// =============================================================================

export type UserRole = 'admin' | 'manager' | 'staff' | 'viewer';
export type OrganizationSize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type BusinessIndustry = 
  | 'home_services' | 'restaurant' | 'professional_services' | 'retail' 
  | 'healthcare' | 'automotive' | 'real_estate' | 'technology' 
  | 'education' | 'hospitality' | 'fitness' | 'beauty' | 'other';

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
export type ChangeType = 'pricing' | 'service' | 'marketing' | 'location' | 'staff' | 'website' | 'social_media';
export type ChangeCategory = 'addition' | 'modification' | 'removal' | 'price_change' | 'promotion';
export type DataSource = 'google' | 'yelp' | 'facebook' | 'instagram' | 'website' | 'social_media' | 'news' | 'api';
export type ChangeStatus = 'new' | 'analyzing' | 'action_required' | 'in_progress' | 'resolved' | 'dismissed';

export type ResponseTone = 'professional' | 'friendly' | 'apologetic' | 'grateful' | 'explanatory' | 'custom';
export type ReviewStatus = 'new' | 'ai_responded' | 'human_reviewed' | 'responded' | 'escalated' | 'resolved';
export type CampaignType = 'review_request' | 'follow_up' | 'satisfaction_survey' | 'referral_request';

export type InsightType = 'opportunity' | 'threat' | 'trend' | 'anomaly' | 'optimization' | 'prediction';
export type InsightCategory = 'competitive' | 'reputation' | 'revenue' | 'operational' | 'customer' | 'market';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type InsightStatus = 'new' | 'reviewing' | 'implementing' | 'completed' | 'dismissed';

export type AlertType = 'price_change' | 'new_review' | 'negative_sentiment' | 'competitor_activity' | 'system_error';
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';
export type AlertStatus = 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'dismissed';
export type NotificationChannel = 'email' | 'sms' | 'slack' | 'webhook' | 'dashboard';

export type ActionType = 'send_email' | 'create_task' | 'update_price' | 'respond_review' | 'send_alert' | 'webhook';
export type ModelType = 'sentiment' | 'response_generation' | 'anomaly_detection' | 'trend_analysis' | 'recommendation';

// =============================================================================
// PROPRIETARY METRICS & CALCULATIONS
// =============================================================================

export interface RevenueAtRiskScore {
  businessId: string;
  score: number; // 0-100
  factors: RiskFactor[];
  calculation: {
    competitorThreats: number;
    reputationImpact: number;
    marketChanges: number;
    operationalIssues: number;
  };
  trend: TrendDirection;
  recommendations: string[];
  lastCalculated: Date;
}

export interface CompetitorThreatRating {
  competitorId: string;
  rating: number; // 0-100
  factors: ThreatFactor[];
  calculation: {
    marketShareGrowth: number;
    pricingAggressiveness: number;
    marketingActivity: number;
    serviceExpansion: number;
  };
  trend: TrendDirection;
  actionRequired: boolean;
  lastCalculated: Date;
}

export interface SentimentImpactScore {
  businessId: string;
  score: number; // -100 to +100
  factors: SentimentFactor[];
  calculation: {
    reviewSentiment: number;
    responseRate: number;
    responseQuality: number;
    customerSatisfaction: number;
  };
  impact: {
    revenue: number;
    reputation: number;
    customerRetention: number;
  };
  lastCalculated: Date;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationInfo;
  metadata?: Record<string, any>;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// =============================================================================
// DASHBOARD & UI TYPES
// =============================================================================

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  data: WidgetData;
  filters: WidgetFilter[];
  refreshInterval?: number;
  isVisible: boolean;
}

export interface WidgetData {
  type: 'chart' | 'metric' | 'table' | 'list' | 'alert';
  content: any;
  lastUpdated: Date;
}

export type WidgetType = 
  | 'revenue_trend' | 'competitor_activity' | 'review_sentiment' 
  | 'threat_level' | 'opportunity_score' | 'ai_insights' 
  | 'recent_changes' | 'alert_feed' | 'performance_metrics';

// =============================================================================
// INTEGRATION TYPES
// =============================================================================

export interface Integration {
  id: string;
  businessId: string;
  platform: IntegrationPlatform;
  status: IntegrationStatus;
  credentials: Record<string, any>;
  settings: IntegrationSettings;
  lastSync: Date;
  syncFrequency: SyncFrequency;
  isActive: boolean;
  errorCount: number;
  lastError?: string;
}

export type IntegrationPlatform = 
  | 'google_business' | 'yelp' | 'facebook' | 'instagram' 
  | 'slack' | 'email' | 'webhook' | 'api' | 'crm';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending' | 'disabled';

// =============================================================================
// SUPPORTING INTERFACES
// =============================================================================

export interface BusinessLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface SocialMediaProfiles {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface BusinessInfo {
  description: string;
  hours: BusinessHours;
  services: string[];
  priceRange: string;
  amenities: string[];
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface CustomerInfo {
  name?: string;
  avatar?: string;
  verified: boolean;
  reviewCount?: number;
  location?: string;
}

export interface ReviewMetadata {
  helpfulVotes: number;
  verifiedPurchase: boolean;
  responseTime?: number;
  followUpSent?: boolean;
  tags: string[];
}

export interface AIAnalysis {
  sentiment: Sentiment;
  keyTopics: string[];
  urgency: Priority;
  suggestedAction: string;
  confidence: number;
  reasoning: string;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: Priority;
  impact: ImpactAssessment;
  effort: EffortLevel;
  timeline: string;
  resources: string[];
  successMetrics: string[];
}

export type RecommendationType = 
  | 'price_adjustment' | 'service_expansion' | 'marketing_response' 
  | 'reputation_improvement' | 'operational_change' | 'competitive_action';

export interface ImpactAssessment {
  revenue: number;
  customers: number;
  reputation: number;
  operational: number;
  timeframe: string;
}

export interface EffortLevel {
  time: number; // hours
  cost: number; // dollars
  complexity: 'low' | 'medium' | 'high';
  resources: string[];
}

// Additional supporting types would continue here...
export type ScanFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly';
export type SyncFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly';
export type PriceChangeType = 'increase' | 'decrease' | 'new_price' | 'promotion' | 'removal';
export type MarketPosition = 'premium' | 'mid_market' | 'budget' | 'value';
export type PricingOpportunity = 'raise_prices' | 'maintain' | 'undercut' | 'add_value';
export type RevenueImpact = 'positive' | 'negative' | 'neutral';
export type ChangeImpact = 'low' | 'medium' | 'high' | 'critical';
export type ActionTaken = {
  type: string;
  description: string;
  takenBy: string;
  takenAt: Date;
  result?: string;
};
export type TrendDirection = 'up' | 'down' | 'stable' | 'volatile';
export type MetricCategory = 'revenue' | 'competitive' | 'reputation' | 'operational';
export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type InsightStatus = 'new' | 'reviewing' | 'implementing' | 'completed' | 'dismissed';
export type AlertSource = 'competitor_scanner' | 'review_monitor' | 'system' | 'user';
export type DigestType = 'daily' | 'weekly' | 'monthly' | 'custom';
export type DigestFrequency = 'daily' | 'weekly' | 'monthly';
export type DigestFormat = 'email' | 'slack' | 'pdf' | 'dashboard';
export type PlaybookTrigger = {
  type: string;
  conditions: Record<string, any>;
};
export type PlaybookCondition = {
  field: string;
  operator: string;
  value: any;
};
export type ActionCondition = {
  field: string;
  operator: string;
  value: any;
};
export type RetryPolicy = {
  maxRetries: number;
  delay: number;
  backoff: 'linear' | 'exponential';
};
export type WidgetPosition = {
  x: number;
  y: number;
};
export type WidgetSize = {
  width: number;
  height: number;
};
export type WidgetFilter = {
  field: string;
  operator: string;
  value: any;
};

// Revenue, Customer, Reputation, Competitive, Operational metrics interfaces
export interface RevenueMetrics {
  total: number;
  growth: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  churnRate: number;
  recurringRevenue: number;
}

export interface CustomerMetrics {
  total: number;
  new: number;
  active: number;
  churned: number;
  satisfaction: number;
  retention: number;
}

export interface ReputationMetrics {
  averageRating: number;
  totalReviews: number;
  sentimentScore: number;
  responseRate: number;
  responseTime: number;
  reputationTrend: TrendDirection;
}

export interface CompetitiveMetrics {
  marketShare: number;
  competitivePosition: number;
  threatLevel: ThreatLevel;
  opportunities: number;
  pricingAdvantage: number;
}

export interface OperationalMetrics {
  efficiency: number;
  costPerAcquisition: number;
  costPerRetention: number;
  automationRate: number;
  errorRate: number;
}

// Additional metric interfaces
export interface MetricCalculation {
  formula: string;
  inputs: string[];
  weights: Record<string, number>;
  adjustments: Record<string, number>;
}

export interface BenchmarkData {
  industry: number;
  topQuartile: number;
  median: number;
  bottomQuartile: number;
  lastUpdated: Date;
}

export interface MetricInterpretation {
  meaning: string;
  implications: string[];
  recommendations: string[];
  confidence: number;
}

export interface RiskFactor {
  name: string;
  weight: number;
  value: number;
  impact: number;
}

export interface ThreatFactor {
  name: string;
  weight: number;
  value: number;
  trend: TrendDirection;
}

export interface SentimentFactor {
  source: string;
  weight: number;
  score: number;
  trend: TrendDirection;
}

export interface TrainingData {
  size: number;
  sources: string[];
  lastUpdated: Date;
  quality: number;
}

export interface ModelPerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastEvaluated: Date;
}

export interface ModelSettings {
  parameters: Record<string, any>;
  thresholds: Record<string, number>;
  features: string[];
  version: string;
}

export interface ModelImprovement {
  metric: string;
  beforeValue: number;
  afterValue: number;
  improvement: number;
  timestamp: Date;
}

export interface PerformanceGain {
  area: string;
  improvement: number;
  confidence: number;
  timestamp: Date;
}

export interface FeedbackAction {
  type: 'approve' | 'reject' | 'modify' | 'flag';
  details: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
  language: string;
  timezone: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  slack: boolean;
  frequency: string;
  types: string[];
}

export interface DashboardPreferences {
  layout: string;
  widgets: string[];
  refreshRate: number;
  autoRefresh: boolean;
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  businessHours: BusinessHours;
  notifications: OrganizationNotificationSettings;
  integrations: IntegrationSettings[];
}

export interface OrganizationNotificationSettings {
  enabled: boolean;
  channels: string[];
  frequency: string;
  recipients: string[];
}

export interface BillingInfo {
  plan: string;
  status: 'active' | 'past_due' | 'canceled' | 'trial';
  nextBilling: Date;
  amount: number;
  currency: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface PlanLimits {
  competitors: number;
  reviews: number;
  alerts: number;
  users: number;
  storage: number; // in GB
  apiCalls: number;
}

export interface PricingTier {
  monthly: number;
  yearly: number;
  currency: string;
}

export interface BillingCycle {
  interval: 'monthly' | 'yearly';
  trialDays: number;
}

export interface ReviewSettings {
  autoResponse: boolean;
  responseTone: ResponseTone;
  escalationRules: EscalationRule[];
  blacklistWords: string[];
  whitelistCustomers: string[];
}

export interface EscalationRule {
  condition: string;
  action: string;
  threshold: number;
}

export interface AISettings {
  model: string;
  confidence: number;
  customPrompts: Record<string, string>;
  learningEnabled: boolean;
}

export interface HumanResponse {
  id: string;
  reviewId: string;
  author: string;
  content: string;
  sentAt: Date;
  approvedBy?: string;
}

export interface FollowUpAction {
  type: string;
  scheduledFor: Date;
  message: string;
  status: 'pending' | 'sent' | 'completed' | 'cancelled';
}

export interface UserFeedback {
  rating: number; // 1-5
  comment?: string;
  timestamp: Date;
}

export interface TargetAudience {
  criteria: Record<string, any>;
  size: number;
  description: string;
}

export interface CampaignMessage {
  subject: string;
  content: string;
  personalization: Record<string, string>;
}

export interface CampaignSchedule {
  frequency: string;
  timeOfDay: string;
  daysOfWeek: number[];
  timezone: string;
}

export interface CampaignStatus {
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
  lastRun?: Date;
}

export interface CampaignResults {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  roi: number;
}

export interface Evidence {
  type: string;
  source: string;
  data: any;
  confidence: number;
  timestamp: Date;
}

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  type: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  budget?: number;
  targetAudience: string;
}

export interface AdSpend {
  platform: string;
  amount: number;
  currency: string;
  period: string;
  trend: TrendDirection;
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
  ctr: number;
  cpc: number;
}

export interface CreativeAssets {
  images: string[];
  videos: string[];
  copy: string[];
  formats: string[];
}

export interface TargetingInfo {
  demographics: Record<string, any>;
  interests: string[];
  behaviors: string[];
  location: string[];
  customAudiences: string[];
}

export interface AIInsights {
  performance: string;
  recommendations: string[];
  opportunities: string[];
  threats: string[];
  confidence: number;
}

export interface DigestFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  types: string[];
  severity: string[];
  competitors: string[];
  platforms: string[];
}

export interface DigestTemplate {
  sections: DigestSection[];
  styling: DigestStyling;
  branding: DigestBranding;
}

export interface DigestSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isEnabled: boolean;
}

export interface DigestStyling {
  theme: string;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  layout: string;
}

export interface DigestBranding {
  logo: string;
  companyName: string;
  contactInfo: string;
  socialMedia: Record<string, string>;
}

export interface IntegrationSettings {
  enabled: boolean;
  parameters: Record<string, any>;
  mappings: Record<string, string>;
  syncSettings: Record<string, any>;
}

export interface WidgetFilter {
  field: string;
  operator: string;
  value: any;
}

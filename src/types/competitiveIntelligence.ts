// Competitive Intelligence Types for Moza Intelligence Pro

export interface Competitor {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  marketShare: number; // percentage
  strengths: string[];
  weaknesses: string[];
  lastUpdated: Date;
  isActive: boolean;
}

export interface CompetitorComplaint {
  id: string;
  competitorId: string;
  platform: ReviewPlatform;
  content: string;
  rating: number;
  sentiment: Sentiment;
  category: ComplaintCategory;
  publishedAt: Date;
  customerName?: string;
  verified: boolean;
  response?: string;
  responseTime?: number; // in hours
  tags: string[];
  businessImpact: 'low' | 'medium' | 'high';
  opportunityScore: number; // 0-100
}

export interface CompetitorProductLaunch {
  id: string;
  competitorId: string;
  productName: string;
  description: string;
  category: string;
  launchDate: Date;
  detectedAt: Date;
  pricing?: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
  targetMarket: string[];
  marketingChannels: string[];
  socialMediaMentions: number;
  pressCoverage: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  opportunityScore: number; // 0-100
  ourResponse?: string;
  status: 'monitoring' | 'analyzing' | 'responding' | 'implemented';
}

export interface MarketingTrend {
  id: string;
  name: string;
  description: string;
  category: 'social_media' | 'email' | 'content' | 'advertising' | 'pricing' | 'product' | 'service';
  industry: string;
  adoptionRate: number; // percentage of competitors using
  effectivenessScore: number; // 0-100
  engagementIncrease: number; // percentage
  costToImplement: 'low' | 'medium' | 'high';
  timeToImplement: number; // in days
  firstDetected: Date;
  peakAdoption?: Date;
  declineStart?: Date;
  examples: string[];
  ourImplementation?: {
    status: 'not_started' | 'planning' | 'implementing' | 'live' | 'optimizing';
    startDate?: Date;
    results?: {
      engagementIncrease: number;
      revenueImpact: number;
      costSavings: number;
    };
  };
}

export interface PricingIntelligence {
  id: string;
  competitorId: string;
  service: string;
  oldPrice?: number;
  newPrice: number;
  currency: string;
  changeType: 'increase' | 'decrease' | 'new_pricing' | 'promotion';
  changeDate: Date;
  detectedAt: Date;
  marketPosition: 'premium' | 'mid_market' | 'budget';
  ourPrice?: number;
  priceGap: number; // percentage difference
  opportunity: 'raise_prices' | 'maintain_position' | 'undercut' | 'add_value';
  recommendedAction: string;
  confidence: number; // 0-100
}

export interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'product_gap' | 'service_gap' | 'pricing_opportunity' | 'marketing_tactic' | 'customer_segment';
  industry: string;
  opportunityScore: number; // 0-100
  marketSize: 'small' | 'medium' | 'large';
  competitionLevel: 'low' | 'medium' | 'high';
  timeToMarket: number; // in days
  investmentRequired: 'low' | 'medium' | 'high';
  revenuePotential: number; // estimated annual revenue
  riskLevel: 'low' | 'medium' | 'high';
  detectedAt: Date;
  source: 'competitor_analysis' | 'customer_feedback' | 'market_trend' | 'review_analysis';
  evidence: string[];
  recommendedActions: string[];
  status: 'identified' | 'analyzing' | 'planning' | 'implementing' | 'launched' | 'monitoring';
  assignedTo?: string;
  deadline?: Date;
}

export interface CompetitiveThreat {
  id: string;
  competitorId: string;
  threatType: 'new_product' | 'price_war' | 'marketing_campaign' | 'expansion' | 'acquisition' | 'partnership';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  impactDate?: Date;
  potentialImpact: {
    revenue: number; // percentage
    marketShare: number; // percentage
    customerRetention: number; // percentage
  };
  ourResponse?: {
    strategy: string;
    actions: string[];
    timeline: string;
    resources: string[];
    expectedOutcome: string;
  };
  status: 'monitoring' | 'analyzing' | 'responding' | 'mitigated' | 'resolved';
  assignedTo?: string;
  deadline?: Date;
}

export interface IntelligenceInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'threat' | 'trend' | 'optimization' | 'strategy';
  category: 'competitive' | 'internal' | 'market' | 'revenue' | 'customer';
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high';
  revenuePotential?: number;
  costSavings?: number;
  timeToImplement?: number; // in days
  source: 'internal_data' | 'competitive_analysis' | 'market_research' | 'ai_analysis';
  evidence: string[];
  recommendations: string[];
  relatedData: {
    customers?: string[];
    interactions?: string[];
    competitors?: string[];
    trends?: string[];
  };
  createdAt: Date;
  status: 'new' | 'reviewing' | 'implementing' | 'completed' | 'dismissed';
  assignedTo?: string;
  deadline?: Date;
}

export interface MarketBenchmark {
  id: string;
  metric: string;
  category: 'customer_satisfaction' | 'response_time' | 'pricing' | 'service_quality' | 'innovation';
  industry: string;
  ourValue: number;
  industryAverage: number;
  topPerformer: number;
  ourRanking: number; // percentile
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
  recommendations: string[];
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'competitive_advantage' | 'market_expansion' | 'revenue_optimization' | 'cost_reduction' | 'risk_mitigation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: {
    revenue: number; // estimated impact
    cost: number; // estimated cost
    time: number; // estimated time to implement
    risk: 'low' | 'medium' | 'high';
  };
  confidence: number; // 0-100
  evidence: string[];
  actionPlan: {
    steps: string[];
    timeline: string;
    resources: string[];
    success_metrics: string[];
  };
  competitorContext: string;
  marketContext: string;
  createdAt: Date;
  status: 'draft' | 'approved' | 'implementing' | 'completed' | 'cancelled';
  assignedTo?: string;
  deadline?: Date;
}

// Filter and Search Types
export interface CompetitiveFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  competitorId?: string;
  threatLevel?: string;
  category?: string;
  status?: string;
  priority?: string;
}

export interface MarketOpportunityFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  category?: string;
  opportunityScore?: {
    min: number;
    max: number;
  };
  marketSize?: string;
  competitionLevel?: string;
  status?: string;
}

// Dashboard Data Types
export interface CompetitiveIntelligenceDashboard {
  totalCompetitors: number;
  activeThreats: number;
  newOpportunities: number;
  marketTrends: number;
  competitivePosition: 'leader' | 'challenger' | 'follower' | 'niche';
  marketShare: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  opportunityScore: number; // 0-100
  recentInsights: IntelligenceInsight[];
  urgentActions: StrategicRecommendation[];
  competitiveAlerts: CompetitiveThreat[];
  marketOpportunities: MarketOpportunity[];
  performanceVsCompetitors: MarketBenchmark[];
}

// Revenue Intelligence Types
export interface RevenueIntelligence {
  customerId: string;
  totalRevenue: number;
  averageOrderValue: number;
  orderFrequency: number;
  lastOrderDate: Date;
  predictedLifetimeValue: number;
  churnProbability: number;
  upsellOpportunity: UpsellOpportunity;
  revenueTrend: RevenueTrend;
  seasonalPatterns: SeasonalPattern[];
  customerSegment: CustomerSegment;
  nextPurchasePrediction?: Date;
  recommendedActions: RecommendedAction[];
  competitiveAdvantage: {
    pricePosition: 'premium' | 'competitive' | 'budget';
    serviceQuality: 'superior' | 'average' | 'below_average';
    responseTime: 'faster' | 'average' | 'slower';
    innovation: 'leading' | 'following' | 'lagging';
  };
  marketOpportunities: {
    competitorWeaknesses: string[];
    marketGaps: string[];
    pricingOpportunities: string[];
    serviceExpansion: string[];
  };
}

// Combined Intelligence Types
export interface DualIntelligenceInsight {
  id: string;
  title: string;
  description: string;
  internalData: {
    customerImpact: number;
    revenueImpact: number;
    costImpact: number;
    timeToImplement: number;
  };
  externalData: {
    competitiveContext: string;
    marketTrend: string;
    opportunitySize: number;
    threatLevel: string;
  };
  combinedRecommendation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  expectedOutcome: string;
  actionPlan: string[];
  successMetrics: string[];
  createdAt: Date;
  status: 'new' | 'analyzing' | 'implementing' | 'completed';
}

// Re-export from moza-intelligence.ts
export type {
  ReviewPlatform,
  Sentiment,
  ComplaintCategory,
  UpsellOpportunity,
  RevenueTrend,
  CustomerSegment,
  SeasonalPattern,
  RecommendedAction
} from './moza-intelligence';

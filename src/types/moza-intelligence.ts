// Moza Intelligence Pro - Comprehensive Customer Relationship Intelligence Platform

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry: BusinessIndustry;
  customerType: CustomerType;
  lifetimeValue: number;
  acquisitionDate: Date;
  lastInteraction: Date;
  status: CustomerStatus;
  tags: string[];
  notes?: string;
  preferredContactMethod: ContactMethod;
  satisfactionScore: number; // 1-10
  churnRisk: ChurnRisk;
  referralSource?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
}

export interface CustomerInteraction {
  id: string;
  customerId: string;
  type: InteractionType;
  channel: InteractionChannel;
  direction: InteractionDirection;
  subject: string;
  content: string;
  timestamp: Date;
  duration?: number; // in minutes
  status: InteractionStatus;
  priority: Priority;
  sentiment: Sentiment;
  assignedTo?: string;
  tags: string[];
  outcome?: InteractionOutcome;
  followUpRequired: boolean;
  followUpDate?: Date;
  relatedComplaintId?: string;
  relatedReviewId?: string;
  metadata?: Record<string, any>;
}

export interface Complaint {
  id: string;
  customerId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  severity: ComplaintSeverity;
  status: ComplaintStatus;
  source: ComplaintSource;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  priority: Priority;
  resolution?: string;
  resolvedAt?: Date;
  customerSatisfaction?: number; // 1-10
  internalNotes?: string;
  tags: string[];
  relatedInteractions: string[];
  estimatedResolutionTime?: number; // in hours
  actualResolutionTime?: number; // in hours
  escalationLevel: number;
  escalatedAt?: Date;
  escalatedTo?: string;
}

export interface Review {
  id: string;
  customerId: string;
  platform: ReviewPlatform;
  rating: number; // 1-5
  title?: string;
  content: string;
  sentiment: Sentiment;
  status: ReviewStatus;
  publishedAt: Date;
  respondedAt?: Date;
  response?: string;
  responseAuthor?: string;
  helpfulVotes?: number;
  verified: boolean;
  businessResponse?: string;
  tags: string[];
  relatedComplaintId?: string;
  location?: string;
  verifiedPurchase: boolean;
}

export interface RevenueIntelligence {
  customerId: string;
  totalRevenue: number;
  averageOrderValue: number;
  orderFrequency: number; // orders per month
  lastOrderDate: Date;
  predictedLifetimeValue: number;
  churnProbability: number; // 0-1
  upsellOpportunity: UpsellOpportunity;
  revenueTrend: RevenueTrend;
  seasonalPatterns: SeasonalPattern[];
  customerSegment: CustomerSegment;
  nextPurchasePrediction?: Date;
  recommendedActions: RecommendedAction[];
}

export interface DashboardMetrics {
  totalCustomers: number;
  activeInteractions: number;
  openComplaints: number;
  averageResponseTime: number; // in minutes
  customerSatisfaction: number; // 1-10
  reviewScore: number; // 1-5
  revenueThisMonth: number;
  revenueGrowth: number; // percentage
  churnRate: number; // percentage
  complaintResolutionRate: number; // percentage
  reviewResponseRate: number; // percentage
  teamPerformance: TeamPerformance[];
  channelPerformance: ChannelPerformance[];
  topComplaintCategories: ComplaintCategoryStats[];
  sentimentTrends: SentimentTrend[];
  revenueForecast: RevenueForecast[];
}

// Enums and Types
export type BusinessIndustry = 
  | 'home_services'
  | 'restaurant'
  | 'professional_services'
  | 'retail'
  | 'healthcare'
  | 'automotive'
  | 'real_estate'
  | 'technology'
  | 'education'
  | 'other';

export type CustomerType = 
  | 'prospect'
  | 'lead'
  | 'customer'
  | 'vip'
  | 'churned'
  | 'at_risk';

export type CustomerStatus = 
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'churned';

export type ContactMethod = 
  | 'email'
  | 'phone'
  | 'sms'
  | 'social_media'
  | 'in_person'
  | 'website';

export type ChurnRisk = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type InteractionType = 
  | 'inquiry'
  | 'complaint'
  | 'compliment'
  | 'support_request'
  | 'sales_inquiry'
  | 'follow_up'
  | 'review'
  | 'referral'
  | 'cancellation'
  | 'upsell'
  | 'other';

export type InteractionChannel = 
  | 'email'
  | 'phone'
  | 'website_form'
  | 'live_chat'
  | 'social_media'
  | 'review_platform'
  | 'in_person'
  | 'sms'
  | 'video_call';

export type InteractionDirection = 
  | 'inbound'
  | 'outbound';

export type InteractionStatus = 
  | 'new'
  | 'in_progress'
  | 'waiting_for_customer'
  | 'resolved'
  | 'closed'
  | 'escalated';

export type Priority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent'
  | 'critical';

export type Sentiment = 
  | 'very_negative'
  | 'negative'
  | 'neutral'
  | 'positive'
  | 'very_positive';

export type InteractionOutcome = 
  | 'resolved'
  | 'escalated'
  | 'follow_up_required'
  | 'converted_to_sale'
  | 'customer_satisfied'
  | 'customer_dissatisfied'
  | 'no_response_needed';

export type ComplaintCategory = 
  | 'product_quality'
  | 'service_delivery'
  | 'billing_issue'
  | 'communication'
  | 'timing_delay'
  | 'staff_behavior'
  | 'technical_issue'
  | 'refund_request'
  | 'policy_concern'
  | 'other';

export type ComplaintSeverity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type ComplaintStatus = 
  | 'new'
  | 'acknowledged'
  | 'investigating'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'escalated';

export type ComplaintSource = 
  | 'email'
  | 'phone'
  | 'website'
  | 'social_media'
  | 'review_platform'
  | 'in_person'
  | 'third_party';

export type ReviewPlatform = 
  | 'google'
  | 'yelp'
  | 'facebook'
  | 'tripadvisor'
  | 'bbb'
  | 'glassdoor'
  | 'indeed'
  | 'industry_specific'
  | 'other';

export type ReviewStatus = 
  | 'new'
  | 'acknowledged'
  | 'responded'
  | 'flagged'
  | 'resolved';

export type UpsellOpportunity = 
  | 'none'
  | 'low'
  | 'medium'
  | 'high';

export type RevenueTrend = 
  | 'increasing'
  | 'stable'
  | 'decreasing';

export type CustomerSegment = 
  | 'high_value'
  | 'medium_value'
  | 'low_value'
  | 'at_risk'
  | 'new_customer';

export interface SeasonalPattern {
  month: number;
  averageRevenue: number;
  confidence: number;
}

export interface RecommendedAction {
  type: 'contact' | 'offer' | 'follow_up' | 'escalate' | 'monitor';
  description: string;
  priority: Priority;
  estimatedImpact: number; // revenue impact
  deadline?: Date;
}

export interface TeamPerformance {
  memberId: string;
  name: string;
  interactionsHandled: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  resolutionRate: number;
  revenueGenerated: number;
}

export interface ChannelPerformance {
  channel: InteractionChannel;
  volume: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  conversionRate: number;
  costPerInteraction: number;
}

export interface ComplaintCategoryStats {
  category: ComplaintCategory;
  count: number;
  percentage: number;
  averageResolutionTime: number;
  trend: 'up' | 'down' | 'stable';
}

export interface SentimentTrend {
  date: Date;
  positive: number;
  neutral: number;
  negative: number;
}

export interface RevenueForecast {
  date: Date;
  predicted: number;
  confidence: number;
  factors: string[];
}

// Filter and Search Types
export interface InteractionFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  customerId?: string;
  type?: InteractionType;
  channel?: InteractionChannel;
  status?: InteractionStatus;
  priority?: Priority;
  sentiment?: Sentiment;
  assignedTo?: string;
  tags?: string[];
}

export interface ComplaintFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  customerId?: string;
  category?: ComplaintCategory;
  severity?: ComplaintSeverity;
  status?: ComplaintStatus;
  assignedTo?: string;
  tags?: string[];
}

export interface ReviewFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  customerId?: string;
  platform?: ReviewPlatform;
  rating?: number;
  sentiment?: Sentiment;
  status?: ReviewStatus;
  verified?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentInteractions: CustomerInteraction[];
  urgentComplaints: Complaint[];
  recentReviews: Review[];
  revenueIntelligence: RevenueIntelligence[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'complaint' | 'review' | 'interaction' | 'revenue' | 'system';
  severity: Priority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  relatedId?: string;
}

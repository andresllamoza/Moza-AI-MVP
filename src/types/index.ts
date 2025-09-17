// Core types for the email automation demo

export interface Email {
  id: string;
  subject: string;
  sender: string;
  senderEmail: string;
  content: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  category: EmailCategory;
  businessType: BusinessType;
  isRead: boolean;
  isProcessed: boolean;
  estimatedTimeToProcess: number; // in minutes
}

export type EmailCategory = 
  | 'invoices'
  | 'estimates'
  | 'customer_inquiries'
  | 'reservations'
  | 'supplier_emails'
  | 'reviews'
  | 'orders'
  | 'returns'
  | 'customer_service'
  | 'marketing'
  | 'other';

export type BusinessType = 'contractor' | 'restaurant' | 'ecommerce';

export interface EmailRule {
  id: string;
  name: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RuleCondition {
  id: string;
  field: 'sender' | 'subject' | 'content' | 'category';
  operator: 'contains' | 'equals' | 'starts_with' | 'ends_with' | 'regex';
  value: string;
}

export interface RuleAction {
  id: string;
  type: 'move_to_folder' | 'set_priority' | 'forward_to' | 'mark_as_read' | 'auto_reply';
  value: string;
}

export interface DashboardMetrics {
  totalEmails: number;
  processedEmails: number;
  timeSaved: number; // in minutes
  averageProcessingTime: number; // in minutes
  categoryBreakdown: CategoryBreakdown[];
  weeklyVolume: WeeklyVolume[];
  topSenders: TopSender[];
}

export interface CategoryBreakdown {
  category: EmailCategory;
  count: number;
  percentage: number;
  color: string;
}

export interface WeeklyVolume {
  week: string;
  emails: number;
  processed: number;
}

export interface TopSender {
  sender: string;
  count: number;
  percentage: number;
}

export interface ROICalculation {
  currentEmailVolume: number;
  currentTimePerEmail: number; // in minutes
  currentHourlyRate: number;
  projectedTimeSaved: number; // in minutes
  projectedCostSavings: number; // in dollars
  roiPercentage: number;
}

export interface BusinessProfile {
  type: BusinessType;
  name: string;
  emailVolume: number;
  averageProcessingTime: number;
  hourlyRate: number;
  description: string;
  painPoints: string[];
  benefits: string[];
}

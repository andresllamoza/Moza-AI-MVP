import {
  Customer,
  CustomerInteraction,
  Complaint,
  Review,
  RevenueIntelligence,
  DashboardMetrics,
  BusinessIndustry,
  CustomerType,
  CustomerStatus,
  ContactMethod,
  ChurnRisk,
  InteractionType,
  InteractionChannel,
  InteractionDirection,
  InteractionStatus,
  Priority,
  Sentiment,
  InteractionOutcome,
  ComplaintCategory,
  ComplaintSeverity,
  ComplaintStatus,
  ComplaintSource,
  ReviewPlatform,
  ReviewStatus,
  UpsellOpportunity,
  RevenueTrend,
  CustomerSegment,
  SeasonalPattern,
  RecommendedAction,
  TeamPerformance,
  ChannelPerformance,
  ComplaintCategoryStats,
  SentimentTrend,
  RevenueForecast,
  Alert
} from '@/types/moza-intelligence';

// Sample data generators
const customerNames = [
  'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown', 'David Davis',
  'Jennifer Garcia', 'Robert Miller', 'Amanda Taylor', 'Christopher Anderson',
  'Michelle Thomas', 'James Wilson', 'Patricia Martinez', 'John Anderson',
  'Jennifer Taylor', 'Robert Jackson', 'Linda White', 'William Harris',
  'Elizabeth Martin', 'Michael Thompson', 'Alex Chen', 'Emma Johnson',
  'Ryan Kim', 'Sophie Davis', 'Lucas Brown', 'Olivia Wilson', 'Noah Garcia',
  'Ava Martinez', 'Liam Anderson', 'Isabella Taylor', 'Ethan Moore'
];

const companyNames = [
  'Smith Construction', 'Johnson & Associates', 'Wilson Enterprises', 'Brown Solutions',
  'Davis Consulting', 'Garcia Group', 'Miller Industries', 'Taylor Corp',
  'Anderson Partners', 'Thomas Holdings', 'Wilson & Co', 'Martinez LLC',
  'Anderson Inc', 'Taylor Group', 'Jackson Enterprises', 'White Solutions',
  'Harris Consulting', 'Martin Corp', 'Thompson Industries', 'Chen Partners'
];

const industries: BusinessIndustry[] = ['home_services', 'restaurant', 'professional_services', 'retail', 'healthcare'];

const interactionTypes: InteractionType[] = [
  'inquiry', 'complaint', 'compliment', 'support_request', 'sales_inquiry',
  'follow_up', 'review', 'referral', 'cancellation', 'upsell'
];

const channels: InteractionChannel[] = [
  'email', 'phone', 'website_form', 'live_chat', 'social_media', 'review_platform'
];

const complaintCategories: ComplaintCategory[] = [
  'product_quality', 'service_delivery', 'billing_issue', 'communication',
  'timing_delay', 'staff_behavior', 'technical_issue', 'refund_request'
];

const reviewPlatforms: ReviewPlatform[] = [
  'google', 'yelp', 'facebook', 'tripadvisor', 'bbb', 'industry_specific'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function getSentimentFromRating(rating: number): Sentiment {
  if (rating >= 4.5) return 'very_positive';
  if (rating >= 3.5) return 'positive';
  if (rating >= 2.5) return 'neutral';
  if (rating >= 1.5) return 'negative';
  return 'very_negative';
}

function getPriorityFromSeverity(severity: ComplaintSeverity): Priority {
  switch (severity) {
    case 'critical': return 'critical';
    case 'high': return 'urgent';
    case 'medium': return 'high';
    case 'low': return 'medium';
  }
}

function getChurnRiskFromInteractions(interactions: CustomerInteraction[]): ChurnRisk {
  const recentInteractions = interactions.filter(i => 
    i.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const negativeSentiment = recentInteractions.filter(i => 
    i.sentiment === 'negative' || i.sentiment === 'very_negative'
  ).length;
  
  if (negativeSentiment > recentInteractions.length * 0.5) return 'critical';
  if (negativeSentiment > recentInteractions.length * 0.3) return 'high';
  if (recentInteractions.length === 0) return 'medium';
  return 'low';
}

export function generateCustomers(count: number = 50): Customer[] {
  const customers: Customer[] = [];
  
  for (let i = 0; i < count; i++) {
    const name = getRandomItem(customerNames);
    const company = getRandomItem(companyNames);
    const industry = getRandomItem(industries);
    const acquisitionDate = getRandomDate(365);
    const lastInteraction = getRandomDate(30);
    
    customers.push({
      id: generateId(),
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company,
      industry,
      customerType: getRandomItem(['prospect', 'lead', 'customer', 'vip', 'at_risk'] as CustomerType[]),
      lifetimeValue: Math.floor(Math.random() * 50000) + 1000,
      acquisitionDate,
      lastInteraction,
      status: getRandomItem(['active', 'inactive', 'suspended'] as CustomerStatus[]),
      tags: getRandomItem([
        ['high-priority', 'vip'],
        ['new-customer'],
        ['at-risk'],
        ['frequent-buyer'],
        ['complaint-prone'],
        ['referral-source']
      ]),
      preferredContactMethod: getRandomItem(['email', 'phone', 'sms'] as ContactMethod[]),
      satisfactionScore: Math.floor(Math.random() * 5) + 6, // 6-10
      churnRisk: 'low' as ChurnRisk, // Will be calculated later
      referralSource: getRandomItem(['google', 'referral', 'social-media', 'direct', 'advertisement']),
      location: {
        city: getRandomItem(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']),
        state: getRandomItem(['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA']),
        country: 'USA'
      }
    });
  }
  
  return customers;
}

export function generateInteractions(customers: Customer[], count: number = 200): CustomerInteraction[] {
  const interactions: CustomerInteraction[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = getRandomItem(customers);
    const type = getRandomItem(interactionTypes);
    const channel = getRandomItem(channels);
    const timestamp = getRandomDate(90);
    const sentiment = getRandomItem(['very_positive', 'positive', 'neutral', 'negative', 'very_negative'] as Sentiment[]);
    
    const subjects = {
      inquiry: ['Project inquiry', 'Service question', 'Pricing information', 'Availability check'],
      complaint: ['Service issue', 'Billing problem', 'Quality concern', 'Timing delay'],
      compliment: ['Great service', 'Excellent work', 'Highly recommend', 'Outstanding quality'],
      support_request: ['Technical help', 'Account question', 'Feature request', 'Setup assistance'],
      sales_inquiry: ['New project', 'Quote request', 'Proposal needed', 'Contract discussion'],
      follow_up: ['Project update', 'Next steps', 'Status check', 'Follow-up call'],
      review: ['Review request', 'Feedback needed', 'Rating request', 'Testimonial'],
      referral: ['Referral inquiry', 'New client', 'Recommendation', 'Introduction'],
      cancellation: ['Service cancellation', 'Project cancellation', 'Contract termination'],
      upsell: ['Additional services', 'Upgrade inquiry', 'Expansion opportunity']
    };
    
    const contents = {
      inquiry: [
        'I am interested in your services and would like to know more about pricing and availability.',
        'Could you provide more information about your project timeline and process?',
        'I would like to schedule a consultation to discuss my needs.',
        'What are your rates for this type of work?'
      ],
      complaint: [
        'I am not satisfied with the quality of work completed on my project.',
        'There was a significant delay in the project timeline that was not communicated.',
        'The final bill was much higher than the original estimate without explanation.',
        'I had to call multiple times to get updates on my project status.'
      ],
      compliment: [
        'The team did an excellent job and exceeded my expectations.',
        'I am very pleased with the quality of work and professionalism.',
        'I would definitely recommend your services to others.',
        'The project was completed on time and within budget.'
      ],
      support_request: [
        'I need help accessing my account online.',
        'Can you explain how to use the new feature you mentioned?',
        'I am having trouble with the mobile app.',
        'Could you walk me through the setup process?'
      ]
    };
    
    interactions.push({
      id: generateId(),
      customerId: customer.id,
      type,
      channel,
      direction: Math.random() > 0.3 ? 'inbound' : 'outbound',
      subject: getRandomItem(subjects[type] || ['General inquiry']),
      content: getRandomItem(contents[type] || ['Thank you for your inquiry.']),
      timestamp,
      duration: channel === 'phone' ? Math.floor(Math.random() * 30) + 5 : undefined,
      status: getRandomItem(['new', 'in_progress', 'waiting_for_customer', 'resolved', 'closed'] as InteractionStatus[]),
      priority: getRandomItem(['low', 'medium', 'high', 'urgent'] as Priority[]),
      sentiment,
      assignedTo: getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']),
      tags: getRandomItem([
        ['urgent', 'follow-up'],
        ['new-customer'],
        ['vip'],
        ['technical'],
        ['billing'],
        ['quality']
      ]),
      outcome: getRandomItem(['resolved', 'escalated', 'follow_up_required', 'converted_to_sale', 'customer_satisfied'] as InteractionOutcome[]),
      followUpRequired: Math.random() > 0.6,
      followUpDate: Math.random() > 0.6 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
      metadata: {
        source: 'demo',
        campaign: Math.random() > 0.7 ? 'summer-promotion' : undefined
      }
    });
  }
  
  return interactions;
}

export function generateComplaints(customers: Customer[], interactions: CustomerInteraction[], count: number = 30): Complaint[] {
  const complaints: Complaint[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = getRandomItem(customers);
    const category = getRandomItem(complaintCategories);
    const severity = getRandomItem(['low', 'medium', 'high', 'critical'] as ComplaintSeverity[]);
    const createdAt = getRandomDate(60);
    
    const titles = {
      product_quality: ['Poor quality work', 'Defective materials', 'Substandard results'],
      service_delivery: ['Late delivery', 'Missed appointment', 'Incomplete service'],
      billing_issue: ['Incorrect charges', 'Billing dispute', 'Payment processing error'],
      communication: ['Poor communication', 'No response', 'Misleading information'],
      timing_delay: ['Project delay', 'Missed deadline', 'Schedule conflict'],
      staff_behavior: ['Unprofessional behavior', 'Rude staff member', 'Inappropriate conduct'],
      technical_issue: ['System malfunction', 'Technical problem', 'Software issue'],
      refund_request: ['Refund needed', 'Money back request', 'Payment reversal']
    };
    
    const descriptions = {
      product_quality: [
        'The quality of work delivered does not meet the standards discussed during our initial consultation.',
        'I am disappointed with the final result and feel the work does not justify the cost.',
        'The materials used were of poor quality and not what was promised.'
      ],
      service_delivery: [
        'The service was not delivered as promised and I had to follow up multiple times.',
        'There were significant delays in the project timeline without proper communication.',
        'The service was incomplete and I had to request additional work to be done.'
      ],
      billing_issue: [
        'I was charged more than the agreed-upon amount without explanation.',
        'There are discrepancies in my bill that need to be resolved.',
        'I was charged for services that were not provided.'
      ]
    };
    
    complaints.push({
      id: generateId(),
      customerId: customer.id,
      title: getRandomItem(titles[category] || ['Service issue']),
      description: getRandomItem(descriptions[category] || ['I have an issue with the service provided.']),
      category,
      severity,
      status: getRandomItem(['new', 'acknowledged', 'investigating', 'in_progress', 'resolved'] as ComplaintStatus[]),
      source: getRandomItem(['email', 'phone', 'website', 'social_media', 'review_platform'] as ComplaintSource[]),
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      assignedTo: getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']),
      priority: getPriorityFromSeverity(severity),
      resolution: severity === 'low' || severity === 'medium' ? 'Issue resolved through direct communication with customer.' : undefined,
      resolvedAt: severity === 'low' || severity === 'medium' ? new Date(createdAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000) : undefined,
      customerSatisfaction: severity === 'low' || severity === 'medium' ? Math.floor(Math.random() * 3) + 7 : undefined,
      internalNotes: `Customer complaint regarding ${category}. ${severity} priority.`,
      tags: [category, severity, 'customer-service'],
      relatedInteractions: interactions
        .filter(i => i.customerId === customer.id && i.type === 'complaint')
        .map(i => i.id),
      estimatedResolutionTime: severity === 'critical' ? 2 : severity === 'high' ? 8 : severity === 'medium' ? 24 : 72,
      actualResolutionTime: severity === 'low' || severity === 'medium' ? Math.floor(Math.random() * 48) + 4 : undefined,
      escalationLevel: severity === 'critical' ? 3 : severity === 'high' ? 2 : 1,
      escalatedAt: severity === 'critical' ? new Date(createdAt.getTime() + Math.random() * 2 * 60 * 60 * 1000) : undefined,
      escalatedTo: severity === 'critical' ? 'manager@company.com' : undefined
    });
  }
  
  return complaints;
}

export function generateReviews(customers: Customer[], count: number = 40): Review[] {
  const reviews: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = getRandomItem(customers);
    const platform = getRandomItem(reviewPlatforms);
    const rating = Math.floor(Math.random() * 5) + 1;
    const sentiment = getSentimentFromRating(rating);
    const publishedAt = getRandomDate(60);
    
    const reviewContents = {
      5: [
        'Excellent service! The team was professional, punctual, and delivered exactly what was promised.',
        'Outstanding work quality and great communication throughout the project.',
        'Highly recommend! They exceeded my expectations in every way.',
        'Fantastic experience from start to finish. Will definitely use again.'
      ],
      4: [
        'Very good service overall. Minor issues but they were resolved quickly.',
        'Good quality work and fair pricing. Would recommend to others.',
        'Satisfied with the results. Professional team and good communication.',
        'Solid work and good value. Met most of my expectations.'
      ],
      3: [
        'Average service. Nothing exceptional but got the job done.',
        'Okay experience. Some communication issues but work was acceptable.',
        'Mixed feelings. Some good aspects but room for improvement.',
        'Decent work but had some delays and communication problems.'
      ],
      2: [
        'Below expectations. Several issues that needed to be addressed.',
        'Disappointed with the service. Poor communication and delays.',
        'Not satisfied with the quality. Had to request corrections.',
        'Subpar experience. Would not recommend based on this interaction.'
      ],
      1: [
        'Terrible service. Multiple problems and poor communication.',
        'Very disappointed. Work was not completed as promised.',
        'Worst experience. Would not recommend to anyone.',
        'Complete failure. Wasted time and money.'
      ]
    };
    
    reviews.push({
      id: generateId(),
      customerId: customer.id,
      platform,
      rating,
      title: rating >= 4 ? 'Great service!' : rating >= 3 ? 'Good experience' : rating >= 2 ? 'Mixed experience' : 'Disappointed',
      content: getRandomItem(reviewContents[rating as keyof typeof reviewContents]),
      sentiment,
      status: getRandomItem(['new', 'acknowledged', 'responded', 'flagged'] as ReviewStatus[]),
      publishedAt,
      respondedAt: Math.random() > 0.3 ? new Date(publishedAt.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000) : undefined,
      response: Math.random() > 0.3 ? 'Thank you for your feedback. We appreciate your business!' : undefined,
      responseAuthor: Math.random() > 0.3 ? 'Manager' : undefined,
      helpfulVotes: Math.floor(Math.random() * 10),
      verified: Math.random() > 0.4,
      businessResponse: Math.random() > 0.3 ? 'Thank you for taking the time to share your experience.' : undefined,
      tags: [platform, rating >= 4 ? 'positive' : rating >= 3 ? 'neutral' : 'negative'],
      location: customer.location?.city,
      verifiedPurchase: Math.random() > 0.3
    });
  }
  
  return reviews;
}

export function generateRevenueIntelligence(customers: Customer[]): RevenueIntelligence[] {
  return customers.map(customer => {
    const totalRevenue = customer.lifetimeValue;
    const orderFrequency = Math.random() * 2 + 0.5; // 0.5 to 2.5 orders per month
    const averageOrderValue = totalRevenue / (orderFrequency * 12); // Assuming 12 months
    const churnProbability = Math.random() * 0.3; // 0 to 30%
    const predictedLifetimeValue = totalRevenue * (1 + Math.random() * 0.5); // 0 to 50% growth
    
    return {
      customerId: customer.id,
      totalRevenue,
      averageOrderValue,
      orderFrequency,
      lastOrderDate: getRandomDate(30),
      predictedLifetimeValue,
      churnProbability,
      upsellOpportunity: churnProbability < 0.1 ? 'high' : churnProbability < 0.2 ? 'medium' : 'low',
      revenueTrend: Math.random() > 0.5 ? 'increasing' : 'stable',
      seasonalPatterns: generateSeasonalPatterns(),
      customerSegment: totalRevenue > 20000 ? 'high_value' : totalRevenue > 10000 ? 'medium_value' : 'low_value',
      nextPurchasePrediction: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
      recommendedActions: generateRecommendedActions(customer, churnProbability)
    };
  });
}

function generateSeasonalPatterns(): SeasonalPattern[] {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    averageRevenue: Math.floor(Math.random() * 5000) + 2000,
    confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
  }));
}

function generateRecommendedActions(customer: Customer, churnProbability: number): RecommendedAction[] {
  const actions: RecommendedAction[] = [];
  
  if (churnProbability > 0.2) {
    actions.push({
      type: 'contact',
      description: 'Schedule follow-up call to address concerns',
      priority: 'high',
      estimatedImpact: 5000,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });
  }
  
  if (customer.satisfactionScore < 7) {
    actions.push({
      type: 'offer',
      description: 'Provide discount or additional service to improve satisfaction',
      priority: 'medium',
      estimatedImpact: 2000
    });
  }
  
  if (customer.customerType === 'vip') {
    actions.push({
      type: 'monitor',
      description: 'Increase monitoring frequency for VIP customer',
      priority: 'high',
      estimatedImpact: 10000
    });
  }
  
  return actions;
}

export function generateDashboardMetrics(
  customers: Customer[],
  interactions: CustomerInteraction[],
  complaints: Complaint[],
  reviews: Review[]
): DashboardMetrics {
  const totalCustomers = customers.length;
  const activeInteractions = interactions.filter(i => i.status === 'in_progress' || i.status === 'new').length;
  const openComplaints = complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length;
  const averageResponseTime = 45; // minutes
  const customerSatisfaction = customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length;
  const reviewScore = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const revenueThisMonth = customers.reduce((sum, c) => sum + c.lifetimeValue * 0.1, 0); // 10% of LTV
  const revenueGrowth = 15.5; // percentage
  const churnRate = 8.2; // percentage
  const complaintResolutionRate = 85.3; // percentage
  const reviewResponseRate = 78.6; // percentage
  
  return {
    totalCustomers,
    activeInteractions,
    openComplaints,
    averageResponseTime,
    customerSatisfaction,
    reviewScore,
    revenueThisMonth,
    revenueGrowth,
    churnRate,
    complaintResolutionRate,
    reviewResponseRate,
    teamPerformance: generateTeamPerformance(),
    channelPerformance: generateChannelPerformance(interactions),
    topComplaintCategories: generateComplaintCategoryStats(complaints),
    sentimentTrends: generateSentimentTrends(interactions),
    revenueForecast: generateRevenueForecast()
  };
}

function generateTeamPerformance(): TeamPerformance[] {
  return [
    {
      memberId: 'john.doe',
      name: 'John Doe',
      interactionsHandled: 45,
      averageResponseTime: 32,
      customerSatisfaction: 8.7,
      resolutionRate: 92.3,
      revenueGenerated: 125000
    },
    {
      memberId: 'jane.smith',
      name: 'Jane Smith',
      interactionsHandled: 38,
      averageResponseTime: 28,
      customerSatisfaction: 9.1,
      resolutionRate: 95.2,
      revenueGenerated: 142000
    },
    {
      memberId: 'mike.wilson',
      name: 'Mike Wilson',
      interactionsHandled: 42,
      averageResponseTime: 41,
      customerSatisfaction: 8.2,
      resolutionRate: 88.7,
      revenueGenerated: 98000
    }
  ];
}

function generateChannelPerformance(interactions: CustomerInteraction[]): ChannelPerformance[] {
  const channels = ['email', 'phone', 'website_form', 'live_chat', 'social_media', 'review_platform'] as InteractionChannel[];
  
  return channels.map(channel => {
    const channelInteractions = interactions.filter(i => i.channel === channel);
    return {
      channel,
      volume: channelInteractions.length,
      averageResponseTime: Math.floor(Math.random() * 30) + 15,
      customerSatisfaction: Math.random() * 2 + 7,
      conversionRate: Math.random() * 0.3 + 0.1,
      costPerInteraction: Math.floor(Math.random() * 20) + 5
    };
  });
}

function generateComplaintCategoryStats(complaints: Complaint[]): ComplaintCategoryStats[] {
  const categories = ['product_quality', 'service_delivery', 'billing_issue', 'communication', 'timing_delay'] as ComplaintCategory[];
  
  return categories.map(category => {
    const categoryComplaints = complaints.filter(c => c.category === category);
    return {
      category,
      count: categoryComplaints.length,
      percentage: (categoryComplaints.length / complaints.length) * 100,
      averageResolutionTime: Math.floor(Math.random() * 48) + 8,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    };
  });
}

function generateSentimentTrends(interactions: CustomerInteraction[]): SentimentTrend[] {
  const trends: SentimentTrend[] = [];
  const days = 30;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    const dayInteractions = interactions.filter(i => 
      i.timestamp.toDateString() === date.toDateString()
    );
    
    const positive = dayInteractions.filter(i => i.sentiment === 'positive' || i.sentiment === 'very_positive').length;
    const negative = dayInteractions.filter(i => i.sentiment === 'negative' || i.sentiment === 'very_negative').length;
    const neutral = dayInteractions.length - positive - negative;
    
    trends.push({
      date,
      positive,
      neutral,
      negative
    });
  }
  
  return trends;
}

function generateRevenueForecast(): RevenueForecast[] {
  const forecast: RevenueForecast[] = [];
  const months = 6;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000);
    const baseRevenue = 50000;
    const growth = 1 + (i * 0.05); // 5% growth per month
    const seasonalFactor = 1 + Math.sin(i * Math.PI / 6) * 0.2; // Seasonal variation
    
    forecast.push({
      date,
      predicted: Math.floor(baseRevenue * growth * seasonalFactor),
      confidence: Math.random() * 0.2 + 0.8, // 80-100% confidence
      factors: ['seasonal trends', 'customer growth', 'market conditions']
    });
  }
  
  return forecast;
}

export function generateAlerts(): Alert[] {
  return [
    {
      id: generateId(),
      type: 'complaint',
      severity: 'high',
      title: 'High Priority Complaint',
      message: 'Customer complaint escalated to management requires immediate attention.',
      timestamp: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
      relatedId: generateId()
    },
    {
      id: generateId(),
      type: 'review',
      severity: 'medium',
      title: 'New Negative Review',
      message: '2-star review posted on Google requires response.',
      timestamp: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
      relatedId: generateId()
    },
    {
      id: generateId(),
      type: 'revenue',
      severity: 'low',
      title: 'Revenue Opportunity',
      message: 'High-value customer showing interest in additional services.',
      timestamp: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000),
      read: true,
      actionRequired: false,
      relatedId: generateId()
    }
  ];
}

// Main data generation function
export function generateMozaIntelligenceData() {
  const customers = generateCustomers(50);
  const interactions = generateInteractions(customers, 200);
  const complaints = generateComplaints(customers, interactions, 30);
  const reviews = generateReviews(customers, 40);
  const revenueIntelligence = generateRevenueIntelligence(customers);
  const dashboardMetrics = generateDashboardMetrics(customers, interactions, complaints, reviews);
  const alerts = generateAlerts();
  
  // Update churn risk based on interactions
  customers.forEach(customer => {
    const customerInteractions = interactions.filter(i => i.customerId === customer.id);
    customer.churnRisk = getChurnRiskFromInteractions(customerInteractions);
  });
  
  return {
    customers,
    interactions,
    complaints,
    reviews,
    revenueIntelligence,
    dashboardMetrics,
    alerts
  };
}

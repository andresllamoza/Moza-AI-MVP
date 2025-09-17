import {
  Competitor,
  CompetitorComplaint,
  CompetitorProductLaunch,
  MarketingTrend,
  PricingIntelligence,
  MarketOpportunity,
  CompetitiveThreat,
  IntelligenceInsight,
  MarketBenchmark,
  StrategicRecommendation,
  CompetitiveIntelligenceDashboard,
  DualIntelligenceInsight,
  ReviewPlatform,
  Sentiment,
  ComplaintCategory
} from '@/types/competitiveIntelligence';

// Sample competitor data
const competitorNames = [
  'Premier Solutions', 'Elite Services', 'ProMax Solutions', 'Apex Consulting',
  'Summit Group', 'Prime Services', 'Vanguard Solutions', 'Excellence Corp',
  'Superior Services', 'Top Tier Solutions', 'Premium Group', 'Advanced Systems',
  'Optimal Solutions', 'Peak Performance', 'Ultimate Services', 'Master Solutions'
];

const industries = ['home_services', 'restaurant', 'professional_services', 'retail', 'healthcare'];

const serviceCategories = [
  'General Contracting', 'Kitchen Renovation', 'Bathroom Remodeling', 'Roofing',
  'Electrical Work', 'Plumbing', 'HVAC', 'Flooring', 'Painting', 'Landscaping',
  'Fine Dining', 'Casual Dining', 'Fast Casual', 'Catering', 'Food Delivery',
  'Legal Services', 'Accounting', 'Marketing', 'IT Consulting', 'Real Estate'
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

export function generateCompetitors(count: number = 8): Competitor[] {
  const competitors: Competitor[] = [];
  
  for (let i = 0; i < count; i++) {
    const name = getRandomItem(competitorNames);
    const industry = getRandomItem(industries);
    const size = getRandomItem(['startup', 'small', 'medium', 'large'] as const);
    const threatLevel = getRandomItem(['low', 'medium', 'high', 'critical'] as const);
    
    competitors.push({
      id: generateId(),
      name,
      industry,
      location: getRandomItem(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']),
      website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      size,
      threatLevel,
      marketShare: Math.floor(Math.random() * 25) + 5, // 5-30%
      strengths: getRandomItem([
        ['Fast response time', 'Competitive pricing', 'Quality work'],
        ['Excellent customer service', 'Innovative solutions', 'Strong reputation'],
        ['Local expertise', 'Flexible scheduling', 'Wide service range'],
        ['Advanced technology', 'Eco-friendly practices', '24/7 support']
      ]),
      weaknesses: getRandomItem([
        ['Limited availability', 'Higher prices', 'Communication issues'],
        ['Slow response', 'Limited service area', 'Outdated methods'],
        ['Poor online presence', 'Limited payment options', 'Scheduling difficulties'],
        ['Inconsistent quality', 'Limited warranty', 'Poor follow-up']
      ]),
      lastUpdated: getRandomDate(7),
      isActive: Math.random() > 0.1
    });
  }
  
  return competitors;
}

export function generateCompetitorComplaints(competitors: Competitor[], count: number = 50): CompetitorComplaint[] {
  const complaints: CompetitorComplaint[] = [];
  
  const complaintTemplates = {
    product_quality: [
      'Poor quality work that doesn\'t meet expectations',
      'Materials used were substandard and not as promised',
      'Workmanship was shoddy and unprofessional',
      'Final result was completely different from what was discussed'
    ],
    service_delivery: [
      'Service was not delivered on time as promised',
      'Multiple delays without proper communication',
      'Service was incomplete and required multiple follow-ups',
      'Missed appointments without notification'
    ],
    billing_issue: [
      'Charged more than the agreed-upon amount',
      'Billing discrepancies that were never resolved',
      'Hidden fees that were not disclosed upfront',
      'Payment processing errors that caused problems'
    ],
    communication: [
      'Poor communication throughout the project',
      'No response to multiple inquiries',
      'Misleading information provided',
      'Lack of updates on project progress'
    ],
    timing_delay: [
      'Project was significantly delayed without explanation',
      'Multiple missed deadlines with no communication',
      'Work took much longer than originally estimated',
      'Scheduling conflicts that were not resolved'
    ],
    staff_behavior: [
      'Unprofessional behavior from staff members',
      'Rude and disrespectful treatment',
      'Inappropriate conduct during service',
      'Lack of courtesy and respect'
    ],
    technical_issue: [
      'Technical problems that were not resolved',
      'System malfunctions that caused delays',
      'Equipment failures that affected service quality',
      'Technical support was inadequate'
    ],
    refund_request: [
      'Requesting refund due to poor service quality',
      'Money back guarantee not honored',
      'Refund process was complicated and delayed',
      'Full refund needed due to unsatisfactory work'
    ]
  };
  
  for (let i = 0; i < count; i++) {
    const competitor = getRandomItem(competitors);
    const platform = getRandomItem(reviewPlatforms);
    const category = getRandomItem(complaintCategories);
    const rating = Math.floor(Math.random() * 3) + 1; // 1-3 for complaints
    const sentiment = getSentimentFromRating(rating);
    const publishedAt = getRandomDate(30);
    
    complaints.push({
      id: generateId(),
      competitorId: competitor.id,
      platform,
      content: getRandomItem(complaintTemplates[category]),
      rating,
      sentiment,
      category,
      publishedAt,
      customerName: Math.random() > 0.5 ? `Customer ${Math.floor(Math.random() * 1000)}` : undefined,
      verified: Math.random() > 0.3,
      response: Math.random() > 0.4 ? 'Thank you for your feedback. We apologize for the inconvenience.' : undefined,
      responseTime: Math.random() > 0.4 ? Math.floor(Math.random() * 72) + 1 : undefined,
      tags: [category, platform, sentiment],
      businessImpact: getRandomItem(['low', 'medium', 'high'] as const),
      opportunityScore: Math.floor(Math.random() * 40) + 60 // 60-100 for high opportunity
    });
  }
  
  return complaints;
}

export function generateCompetitorProductLaunches(competitors: Competitor[], count: number = 15): CompetitorProductLaunch[] {
  const launches: CompetitorProductLaunch[] = [];
  
  const productTemplates = [
    'Smart Home Integration', 'Eco-Friendly Solutions', 'Mobile App Service', '24/7 Support Package',
    'Premium Materials Upgrade', 'Express Service Option', 'Warranty Extension', 'Maintenance Plan',
    'Online Booking System', 'Video Consultation', 'AI-Powered Estimates', 'Green Energy Solutions',
    'Luxury Service Tier', 'Emergency Response', 'Seasonal Specials', 'Subscription Service'
  ];
  
  for (let i = 0; i < count; i++) {
    const competitor = getRandomItem(competitors);
    const productName = getRandomItem(productTemplates);
    const launchDate = getRandomDate(60);
    const detectedAt = new Date(launchDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    launches.push({
      id: generateId(),
      competitorId: competitor.id,
      productName,
      description: `New ${productName.toLowerCase()} service offering enhanced features and capabilities`,
      category: getRandomItem(serviceCategories),
      launchDate,
      detectedAt,
      pricing: Math.random() > 0.3 ? {
        min: Math.floor(Math.random() * 500) + 100,
        max: Math.floor(Math.random() * 1000) + 500,
        currency: 'USD'
      } : undefined,
      features: getRandomItem([
        ['24/7 support', 'Mobile app', 'Real-time tracking'],
        ['Eco-friendly materials', 'Smart technology', 'Extended warranty'],
        ['Video consultation', 'Online booking', 'Instant quotes'],
        ['Premium service', 'Express delivery', 'Quality guarantee']
      ]),
      targetMarket: getRandomItem([
        ['Residential customers', 'Small businesses'],
        ['Luxury market', 'Eco-conscious consumers'],
        ['Tech-savvy users', 'Time-sensitive clients'],
        ['Budget-conscious', 'Quality-focused']
      ]),
      marketingChannels: getRandomItem([
        ['Social media', 'Google ads', 'Email marketing'],
        ['Website', 'Referral program', 'Local partnerships'],
        ['Content marketing', 'SEO', 'Influencer partnerships'],
        ['Direct mail', 'Radio ads', 'Trade shows']
      ]),
      socialMediaMentions: Math.floor(Math.random() * 100) + 10,
      pressCoverage: Math.floor(Math.random() * 20) + 1,
      threatLevel: getRandomItem(['low', 'medium', 'high', 'critical'] as const),
      opportunityScore: Math.floor(Math.random() * 50) + 30, // 30-80
      ourResponse: Math.random() > 0.6 ? 'Monitoring for potential competitive response' : undefined,
      status: getRandomItem(['monitoring', 'analyzing', 'responding', 'implemented'] as const)
    });
  }
  
  return launches;
}

export function generateMarketingTrends(count: number = 20): MarketingTrend[] {
  const trends: MarketingTrend[] = [];
  
  const trendTemplates = [
    'Video Testimonials', 'AI Chatbots', 'Personalized Email Campaigns', 'Social Media Stories',
    'Influencer Partnerships', 'User-Generated Content', 'Interactive Content', 'Voice Search Optimization',
    'Augmented Reality', 'Sustainability Messaging', 'Local SEO Focus', 'Mobile-First Design',
    'Subscription Models', 'Loyalty Programs', 'Community Building', 'Data-Driven Personalization',
    'Omnichannel Marketing', 'Micro-Influencers', 'Live Streaming', 'Green Marketing'
  ];
  
  for (let i = 0; i < count; i++) {
    const name = getRandomItem(trendTemplates);
    const category = getRandomItem(['social_media', 'email', 'content', 'advertising', 'pricing', 'product', 'service'] as const);
    const industry = getRandomItem(industries);
    const firstDetected = getRandomDate(90);
    
    trends.push({
      id: generateId(),
      name,
      description: `Emerging ${name.toLowerCase()} trend showing significant engagement increases`,
      category,
      industry,
      adoptionRate: Math.floor(Math.random() * 60) + 20, // 20-80%
      effectivenessScore: Math.floor(Math.random() * 40) + 60, // 60-100
      engagementIncrease: Math.floor(Math.random() * 200) + 50, // 50-250%
      costToImplement: getRandomItem(['low', 'medium', 'high'] as const),
      timeToImplement: Math.floor(Math.random() * 30) + 7, // 7-37 days
      firstDetected,
      peakAdoption: Math.random() > 0.5 ? new Date(firstDetected.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
      declineStart: Math.random() > 0.7 ? new Date(firstDetected.getTime() + Math.random() * 60 * 24 * 60 * 60 * 1000) : undefined,
      examples: getRandomItem([
        ['Company A increased engagement by 150%', 'Company B saw 200% more leads'],
        ['Industry leader reported 300% ROI', 'Early adopters gained 25% market share'],
        ['Case study shows 180% conversion increase', 'Multiple companies reporting success']
      ]),
      ourImplementation: Math.random() > 0.4 ? {
        status: getRandomItem(['not_started', 'planning', 'implementing', 'live', 'optimizing'] as const),
        startDate: Math.random() > 0.5 ? new Date(firstDetected.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
        results: Math.random() > 0.6 ? {
          engagementIncrease: Math.floor(Math.random() * 100) + 50,
          revenueImpact: Math.floor(Math.random() * 50000) + 10000,
          costSavings: Math.floor(Math.random() * 20000) + 5000
        } : undefined
      } : undefined
    });
  }
  
  return trends;
}

export function generatePricingIntelligence(competitors: Competitor[], count: number = 25): PricingIntelligence[] {
  const pricing: PricingIntelligence[] = [];
  
  const services = [
    'Basic Consultation', 'Standard Service', 'Premium Package', 'Emergency Service',
    'Maintenance Plan', 'Warranty Extension', 'Express Delivery', 'Custom Solution'
  ];
  
  for (let i = 0; i < count; i++) {
    const competitor = getRandomItem(competitors);
    const service = getRandomItem(services);
    const changeType = getRandomItem(['increase', 'decrease', 'new_pricing', 'promotion'] as const);
    const changeDate = getRandomDate(30);
    const detectedAt = new Date(changeDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);
    const newPrice = Math.floor(Math.random() * 2000) + 100;
    const oldPrice = changeType !== 'new_pricing' ? newPrice * (0.8 + Math.random() * 0.4) : undefined;
    const ourPrice = newPrice * (0.9 + Math.random() * 0.2);
    const priceGap = ((ourPrice - newPrice) / newPrice) * 100;
    
    pricing.push({
      id: generateId(),
      competitorId: competitor.id,
      service,
      oldPrice: oldPrice ? Math.floor(oldPrice) : undefined,
      newPrice: Math.floor(newPrice),
      currency: 'USD',
      changeType,
      changeDate,
      detectedAt,
      marketPosition: getRandomItem(['premium', 'mid_market', 'budget'] as const),
      ourPrice: Math.floor(ourPrice),
      priceGap: Math.floor(priceGap * 100) / 100,
      opportunity: priceGap > 10 ? 'raise_prices' : priceGap < -10 ? 'undercut' : 'maintain_position',
      recommendedAction: priceGap > 10 ? 
        `Consider raising prices by ${Math.floor(priceGap / 2)}% to maintain competitive position` :
        priceGap < -10 ? 
        `Consider lowering prices by ${Math.floor(Math.abs(priceGap) / 2)}% to gain market share` :
        'Maintain current pricing strategy',
      confidence: Math.floor(Math.random() * 30) + 70 // 70-100
    });
  }
  
  return pricing;
}

export function generateMarketOpportunities(count: number = 30): MarketOpportunity[] {
  const opportunities: MarketOpportunity[] = [];
  
  const opportunityTemplates = [
    'Eco-Friendly Service Options', 'Mobile App Development', '24/7 Customer Support',
    'Subscription-Based Services', 'Smart Home Integration', 'Video Consultation',
    'Express Service Delivery', 'Premium Materials Upgrade', 'Warranty Extension',
    'Online Booking System', 'AI-Powered Estimates', 'Green Energy Solutions',
    'Luxury Service Tier', 'Emergency Response', 'Seasonal Specials'
  ];
  
  for (let i = 0; i < count; i++) {
    const title = getRandomItem(opportunityTemplates);
    const category = getRandomItem(['product_gap', 'service_gap', 'pricing_opportunity', 'marketing_tactic', 'customer_segment'] as const);
    const industry = getRandomItem(industries);
    const opportunityScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const marketSize = getRandomItem(['small', 'medium', 'large'] as const);
    const competitionLevel = getRandomItem(['low', 'medium', 'high'] as const);
    const detectedAt = getRandomDate(30);
    
    opportunities.push({
      id: generateId(),
      title,
      description: `Market opportunity identified for ${title.toLowerCase()} with significant potential`,
      category,
      industry,
      opportunityScore,
      marketSize,
      competitionLevel,
      timeToMarket: Math.floor(Math.random() * 90) + 30, // 30-120 days
      investmentRequired: getRandomItem(['low', 'medium', 'high'] as const),
      revenuePotential: Math.floor(Math.random() * 500000) + 50000, // 50k-550k
      riskLevel: getRandomItem(['low', 'medium', 'high'] as const),
      detectedAt,
      source: getRandomItem(['competitor_analysis', 'customer_feedback', 'market_trend', 'review_analysis'] as const),
      evidence: getRandomItem([
        ['Competitor complaints about lack of this service', 'Customer requests for this feature'],
        ['Market research shows 40% demand increase', 'Industry trend analysis confirms opportunity'],
        ['Customer survey data supports need', 'Competitive gap analysis reveals opportunity']
      ]),
      recommendedActions: getRandomItem([
        ['Conduct market research', 'Develop service offering', 'Create marketing strategy'],
        ['Analyze competitor weaknesses', 'Design pricing strategy', 'Plan launch timeline'],
        ['Identify target customers', 'Develop implementation plan', 'Set success metrics']
      ]),
      status: getRandomItem(['identified', 'analyzing', 'planning', 'implementing', 'launched', 'monitoring'] as const),
      assignedTo: Math.random() > 0.5 ? getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']) : undefined,
      deadline: Math.random() > 0.6 ? new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000) : undefined
    });
  }
  
  return opportunities;
}

export function generateCompetitiveThreats(competitors: Competitor[], count: number = 12): CompetitiveThreat[] {
  const threats: CompetitiveThreat[] = [];
  
  const threatTemplates = [
    'New Service Launch', 'Aggressive Pricing Strategy', 'Major Marketing Campaign',
    'Market Expansion', 'Strategic Partnership', 'Technology Upgrade',
    'Customer Acquisition Campaign', 'Service Quality Improvement', 'Brand Repositioning'
  ];
  
  for (let i = 0; i < count; i++) {
    const competitor = getRandomItem(competitors);
    const threatType = getRandomItem(['new_product', 'price_war', 'marketing_campaign', 'expansion', 'acquisition', 'partnership'] as const);
    const title = getRandomItem(threatTemplates);
    const severity = getRandomItem(['low', 'medium', 'high', 'critical'] as const);
    const detectedAt = getRandomDate(14);
    const impactDate = new Date(detectedAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    threats.push({
      id: generateId(),
      competitorId: competitor.id,
      threatType,
      title,
      description: `${competitor.name} has launched ${title.toLowerCase()} that could impact our market position`,
      severity,
      detectedAt,
      impactDate,
      potentialImpact: {
        revenue: Math.floor(Math.random() * 20) + 5, // 5-25%
        marketShare: Math.floor(Math.random() * 15) + 3, // 3-18%
        customerRetention: Math.floor(Math.random() * 10) + 2 // 2-12%
      },
      ourResponse: Math.random() > 0.3 ? {
        strategy: `Develop counter-strategy to ${title.toLowerCase()}`,
        actions: [
          'Analyze competitor strategy in detail',
          'Identify our competitive advantages',
          'Develop response campaign',
          'Monitor market impact'
        ],
        timeline: '30-60 days',
        resources: ['Marketing team', 'Sales team', 'Product development'],
        expectedOutcome: 'Maintain market position and customer base'
      } : undefined,
      status: getRandomItem(['monitoring', 'analyzing', 'responding', 'mitigated', 'resolved'] as const),
      assignedTo: Math.random() > 0.4 ? getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']) : undefined,
      deadline: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000) : undefined
    });
  }
  
  return threats;
}

export function generateIntelligenceInsights(count: number = 40): IntelligenceInsight[] {
  const insights: IntelligenceInsight[] = [];
  
  const insightTemplates = [
    'Competitor Weakness Exploitation', 'Market Gap Identification', 'Pricing Optimization',
    'Service Enhancement Opportunity', 'Customer Acquisition Strategy', 'Revenue Growth Potential',
    'Cost Reduction Opportunity', 'Market Expansion Possibility', 'Technology Upgrade Need',
    'Customer Retention Strategy', 'Brand Positioning Opportunity', 'Operational Efficiency Gain'
  ];
  
  for (let i = 0; i < count; i++) {
    const title = getRandomItem(insightTemplates);
    const type = getRandomItem(['opportunity', 'threat', 'trend', 'optimization', 'strategy'] as const);
    const category = getRandomItem(['competitive', 'internal', 'market', 'revenue', 'customer'] as const);
    const priority = getRandomItem(['low', 'medium', 'high', 'critical'] as const);
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100
    const impact = getRandomItem(['low', 'medium', 'high'] as const);
    const createdAt = getRandomDate(7);
    
    insights.push({
      id: generateId(),
      title,
      description: `Intelligence insight: ${title.toLowerCase()} identified through data analysis`,
      type,
      category,
      priority,
      confidence,
      impact,
      revenuePotential: Math.random() > 0.5 ? Math.floor(Math.random() * 100000) + 10000 : undefined,
      costSavings: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 5000 : undefined,
      timeToImplement: Math.floor(Math.random() * 60) + 7, // 7-67 days
      source: getRandomItem(['internal_data', 'competitive_analysis', 'market_research', 'ai_analysis'] as const),
      evidence: getRandomItem([
        ['Customer feedback analysis', 'Competitor review analysis', 'Market trend data'],
        ['Internal performance metrics', 'Industry benchmark comparison', 'Customer behavior patterns'],
        ['Competitive intelligence reports', 'Market research findings', 'AI pattern recognition']
      ]),
      recommendations: getRandomItem([
        ['Implement recommended changes', 'Monitor results closely', 'Adjust strategy as needed'],
        ['Conduct additional research', 'Develop implementation plan', 'Set success metrics'],
        ['Analyze competitive response', 'Optimize current approach', 'Scale successful tactics']
      ]),
      relatedData: {
        customers: Math.random() > 0.5 ? [generateId(), generateId()] : undefined,
        interactions: Math.random() > 0.5 ? [generateId(), generateId()] : undefined,
        competitors: Math.random() > 0.5 ? [generateId()] : undefined,
        trends: Math.random() > 0.5 ? [generateId()] : undefined
      },
      createdAt,
      status: getRandomItem(['new', 'reviewing', 'implementing', 'completed', 'dismissed'] as const),
      assignedTo: Math.random() > 0.4 ? getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']) : undefined,
      deadline: Math.random() > 0.6 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined
    });
  }
  
  return insights;
}

export function generateMarketBenchmarks(count: number = 15): MarketBenchmark[] {
  const benchmarks: MarketBenchmark[] = [];
  
  const metrics = [
    'Customer Satisfaction Score', 'Average Response Time', 'Service Quality Rating',
    'Pricing Competitiveness', 'Innovation Index', 'Customer Retention Rate',
    'Market Share Growth', 'Brand Recognition', 'Online Presence Score',
    'Customer Acquisition Cost', 'Revenue per Customer', 'Profit Margin',
    'Employee Satisfaction', 'Service Delivery Speed', 'Problem Resolution Rate'
  ];
  
  for (let i = 0; i < count; i++) {
    const metric = getRandomItem(metrics);
    const category = getRandomItem(['customer_satisfaction', 'response_time', 'pricing', 'service_quality', 'innovation'] as const);
    const industry = getRandomItem(industries);
    const ourValue = Math.floor(Math.random() * 50) + 50; // 50-100
    const industryAverage = ourValue * (0.8 + Math.random() * 0.4); // 80-120% of our value
    const topPerformer = Math.max(ourValue, industryAverage) * (1.1 + Math.random() * 0.3); // 110-140% of higher value
    const ourRanking = Math.floor(Math.random() * 40) + 60; // 60-100 percentile
    const trend = getRandomItem(['improving', 'stable', 'declining'] as const);
    
    benchmarks.push({
      id: generateId(),
      metric,
      category,
      industry,
      ourValue: Math.floor(ourValue),
      industryAverage: Math.floor(industryAverage),
      topPerformer: Math.floor(topPerformer),
      ourRanking,
      trend,
      lastUpdated: getRandomDate(7),
      recommendations: getRandomItem([
        ['Focus on improving this metric', 'Analyze top performers', 'Implement best practices'],
        ['Maintain current performance', 'Monitor for changes', 'Look for optimization opportunities'],
        ['Address declining trend', 'Investigate root causes', 'Develop improvement plan']
      ])
    });
  }
  
  return benchmarks;
}

export function generateStrategicRecommendations(count: number = 20): StrategicRecommendation[] {
  const recommendations: StrategicRecommendation[] = [];
  
  const recommendationTemplates = [
    'Exploit Competitor Weakness', 'Launch New Service Line', 'Optimize Pricing Strategy',
    'Enhance Customer Experience', 'Expand Market Reach', 'Improve Operational Efficiency',
    'Strengthen Brand Position', 'Develop Technology Advantage', 'Build Strategic Partnerships',
    'Reduce Customer Acquisition Cost', 'Increase Customer Lifetime Value', 'Mitigate Competitive Threats'
  ];
  
  for (let i = 0; i < count; i++) {
    const title = getRandomItem(recommendationTemplates);
    const category = getRandomItem(['competitive_advantage', 'market_expansion', 'revenue_optimization', 'cost_reduction', 'risk_mitigation'] as const);
    const priority = getRandomItem(['low', 'medium', 'high', 'critical'] as const);
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100
    const createdAt = getRandomDate(14);
    
    recommendations.push({
      id: generateId(),
      title,
      description: `Strategic recommendation: ${title.toLowerCase()} based on competitive intelligence analysis`,
      category,
      priority,
      impact: {
        revenue: Math.floor(Math.random() * 200000) + 50000, // 50k-250k
        cost: Math.floor(Math.random() * 100000) + 10000, // 10k-110k
        time: Math.floor(Math.random() * 120) + 30, // 30-150 days
        risk: getRandomItem(['low', 'medium', 'high'] as const)
      },
      confidence,
      evidence: getRandomItem([
        ['Competitor analysis shows opportunity', 'Market research confirms demand', 'Customer feedback supports need'],
        ['Industry trends align with recommendation', 'Competitive gaps identified', 'Financial projections positive'],
        ['Risk assessment completed', 'Implementation plan developed', 'Success metrics defined']
      ]),
      actionPlan: {
        steps: getRandomItem([
          ['Conduct detailed analysis', 'Develop implementation plan', 'Execute strategy', 'Monitor results'],
          ['Research market opportunity', 'Design solution', 'Test with customers', 'Launch full scale'],
          ['Assess competitive landscape', 'Identify key success factors', 'Build capabilities', 'Execute and optimize']
        ]),
        timeline: `${Math.floor(Math.random() * 6) + 3}-${Math.floor(Math.random() * 12) + 6} months`,
        resources: getRandomItem([
          ['Marketing team', 'Sales team', 'Product development'],
          ['Operations team', 'Customer service', 'Technology team'],
          ['Management team', 'External consultants', 'Key stakeholders']
        ]),
        success_metrics: getRandomItem([
          ['Revenue increase', 'Market share growth', 'Customer satisfaction'],
          ['Cost reduction', 'Efficiency improvement', 'Competitive advantage'],
          ['Customer acquisition', 'Retention rate', 'Profit margin']
        ])
      },
      competitorContext: `Competitor analysis reveals ${title.toLowerCase()} opportunity`,
      marketContext: `Market conditions favor ${title.toLowerCase()} implementation`,
      createdAt,
      status: getRandomItem(['draft', 'approved', 'implementing', 'completed', 'cancelled'] as const),
      assignedTo: Math.random() > 0.3 ? getRandomItem(['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson']) : undefined,
      deadline: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000) : undefined
    });
  }
  
  return recommendations;
}

export function generateDualIntelligenceInsights(count: number = 25): DualIntelligenceInsight[] {
  const insights: DualIntelligenceInsight[] = [];
  
  const insightTemplates = [
    'Competitor Weakness + Customer Demand', 'Market Trend + Internal Capability',
    'Pricing Opportunity + Revenue Impact', 'Service Gap + Customer Satisfaction',
    'Technology Trend + Operational Efficiency', 'Customer Behavior + Competitive Advantage',
    'Market Expansion + Internal Growth', 'Cost Optimization + Competitive Position'
  ];
  
  for (let i = 0; i < count; i++) {
    const title = getRandomItem(insightTemplates);
    const priority = getRandomItem(['low', 'medium', 'high', 'critical'] as const);
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100
    const createdAt = getRandomDate(7);
    
    insights.push({
      id: generateId(),
      title,
      description: `Dual intelligence insight: ${title.toLowerCase()} combining internal and external data`,
      internalData: {
        customerImpact: Math.floor(Math.random() * 50) + 20, // 20-70%
        revenueImpact: Math.floor(Math.random() * 200000) + 50000, // 50k-250k
        costImpact: Math.floor(Math.random() * 100000) + 10000, // 10k-110k
        timeToImplement: Math.floor(Math.random() * 90) + 30 // 30-120 days
      },
      externalData: {
        competitiveContext: `Competitor analysis shows ${title.toLowerCase()} opportunity`,
        marketTrend: `Market trend analysis confirms ${title.toLowerCase()} potential`,
        opportunitySize: Math.floor(Math.random() * 500000) + 100000, // 100k-600k
        threatLevel: getRandomItem(['low', 'medium', 'high', 'critical'] as const)
      },
      combinedRecommendation: `Based on internal capabilities and external market conditions, ${title.toLowerCase()} represents a high-value opportunity`,
      priority,
      confidence,
      expectedOutcome: `Expected outcome: ${Math.floor(Math.random() * 50) + 25}% revenue increase within 6 months`,
      actionPlan: getRandomItem([
        ['Analyze internal readiness', 'Assess competitive landscape', 'Develop implementation strategy', 'Execute and monitor'],
        ['Research market opportunity', 'Evaluate internal capabilities', 'Create action plan', 'Launch and optimize'],
        ['Identify key success factors', 'Build required capabilities', 'Test with customers', 'Scale successful approach']
      ]),
      successMetrics: getRandomItem([
        ['Revenue growth', 'Market share increase', 'Customer satisfaction improvement'],
        ['Cost reduction', 'Operational efficiency', 'Competitive advantage'],
        ['Customer acquisition', 'Retention rate', 'Profit margin improvement']
      ]),
      createdAt,
      status: getRandomItem(['new', 'analyzing', 'implementing', 'completed'] as const)
    });
  }
  
  return insights;
}

// Main data generation function
export function generateCompetitiveIntelligenceData() {
  const competitors = generateCompetitors(8);
  const competitorComplaints = generateCompetitorComplaints(competitors, 50);
  const competitorProductLaunches = generateCompetitorProductLaunches(competitors, 15);
  const marketingTrends = generateMarketingTrends(20);
  const pricingIntelligence = generatePricingIntelligence(competitors, 25);
  const marketOpportunities = generateMarketOpportunities(30);
  const competitiveThreats = generateCompetitiveThreats(competitors, 12);
  const intelligenceInsights = generateIntelligenceInsights(40);
  const marketBenchmarks = generateMarketBenchmarks(15);
  const strategicRecommendations = generateStrategicRecommendations(20);
  const dualIntelligenceInsights = generateDualIntelligenceInsights(25);
  
  const dashboard: CompetitiveIntelligenceDashboard = {
    totalCompetitors: competitors.length,
    activeThreats: competitiveThreats.filter(t => t.status !== 'resolved').length,
    newOpportunities: marketOpportunities.filter(o => o.status === 'identified').length,
    marketTrends: marketingTrends.length,
    competitivePosition: 'challenger',
    marketShare: 15.5,
    threatLevel: 'medium',
    opportunityScore: 78,
    recentInsights: intelligenceInsights.slice(0, 5),
    urgentActions: strategicRecommendations.filter(r => r.priority === 'critical').slice(0, 3),
    competitiveAlerts: competitiveThreats.filter(t => t.severity === 'high' || t.severity === 'critical').slice(0, 5),
    marketOpportunities: marketOpportunities.filter(o => o.opportunityScore > 80).slice(0, 5),
    performanceVsCompetitors: marketBenchmarks.slice(0, 8)
  };
  
  return {
    competitors,
    competitorComplaints,
    competitorProductLaunches,
    marketingTrends,
    pricingIntelligence,
    marketOpportunities,
    competitiveThreats,
    intelligenceInsights,
    marketBenchmarks,
    strategicRecommendations,
    dualIntelligenceInsights,
    dashboard
  };
}

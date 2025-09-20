// MozaWave Complete Copy System
// World-class, conversion-focused copy and AI reasoning flows

export interface CopyTemplate {
  headline: string;
  subheadline: string;
  description: string;
  cta: {
    primary: string;
    secondary: string;
  };
  trustSignals: string[];
  benefits: string[];
  painPoints: string[];
}

export interface AIReasoningFlow {
  input: string;
  analysis: string;
  prioritization: string;
  recommendation: string;
  reasoning: string;
  confidence: number;
  action: string;
  expectedOutcome: string;
}

export interface AlertTemplate {
  type: 'price_change' | 'new_service' | 'ad_campaign' | 'review_alert' | 'revenue_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  reasoning: string;
  action: string;
  cta: string;
}

export interface DigestTemplate {
  subject: string;
  greeting: string;
  summary: string;
  insights: string[];
  actions: string[];
  closing: string;
}

// =============================================================================
// MOWAWAVE MARKET WATCH COPY SYSTEM
// =============================================================================

export const MarketWatchCopy = {
  // Homepage Copy
  homepage: {
    headline: "Stop Losing Customers to Your Competitors",
    subheadline: "Every week, your competitors are stealing customers while you're flying blind.",
    description: "MozaWave Market Watch gives you the intelligence to fight back. Track unlimited competitors across 10+ platforms, get real-time alerts on price changes and new services, and turn competitive intelligence into revenue opportunities.",
    cta: {
      primary: "🚀 Start Free Trial",
      secondary: "📞 Book Demo Call"
    },
    trustSignals: [
      "✓ Cancel anytime",
      "✓ First 2 weeks free", 
      "✓ Setup in 5 minutes",
      "✓ Track unlimited competitors"
    ],
    benefits: [
      "Know when competitors raise prices (so you can too)",
      "Get alerts when they launch new services",
      "Track their ad spend and copy what works",
      "Weekly digest email with actionable insights",
      "Never miss a competitive threat again",
      "Turn intelligence into revenue in days"
    ],
    painPoints: [
      "Competitors stealing customers with better prices",
      "Missing new services that could threaten your business",
      "Not knowing when to adjust your own pricing",
      "Flying blind while competitors gain market share",
      "Losing revenue opportunities to faster competitors"
    ]
  } as CopyTemplate,

  // Service Page Copy
  servicePage: {
    headline: "MozaWave Market Watch",
    subheadline: "Stop losing customers to competitors who are raising prices, adding services, and running ads while you're sleeping",
    description: "Track unlimited competitors across Google, Yelp, Facebook, Instagram, and more. Get real-time alerts on price changes, new services, and marketing campaigns. Turn competitive intelligence into revenue opportunities with AI-powered insights and recommendations.",
    cta: {
      primary: "🚀 Start Free Trial",
      secondary: "📞 Book Demo Call"
    },
    trustSignals: [
      "✓ Track unlimited competitors",
      "✓ Real-time alerts",
      "✓ 10+ platforms monitored",
      "✓ AI-powered insights"
    ],
    benefits: [
      "Price Intelligence: Know when competitors change prices so you can respond immediately",
      "Service Monitoring: Get alerts when competitors launch new services that could threaten your business",
      "Marketing Intelligence: Track competitor ad spend and copy successful campaigns",
      "Threat Analysis: AI calculates revenue-at-risk scores to prioritize your responses",
      "Actionable Insights: Get specific recommendations on how to respond to competitive threats",
      "Weekly Digests: Curated intelligence reports with prioritized actions for your business"
    ],
    painPoints: [
      "Competitors raising prices while you stay flat",
      "New competitor services eating into your market share",
      "Missing competitive marketing campaigns that work",
      "Not knowing which competitive threats to prioritize",
      "Lacking specific actions to take against competitors"
    ]
  } as CopyTemplate,

  // Dashboard Copy
  dashboard: {
    overview: {
      title: "Competitive Intelligence Overview",
      subtitle: "Track threats, identify opportunities, and protect your revenue",
      metrics: {
        trackedCompetitors: "Competitors Monitored",
        priceChanges: "Price Changes Detected", 
        newServices: "New Services Launched",
        threatLevel: "Overall Threat Level",
        revenueAtRisk: "Revenue at Risk"
      }
    },
    alerts: {
      title: "Active Alerts",
      subtitle: "Competitive threats requiring your attention",
      emptyState: "No active alerts. Your competitive position is stable.",
      priorityActions: "Priority Actions"
    },
    insights: {
      title: "AI Insights",
      subtitle: "Actionable recommendations based on competitive intelligence",
      emptyState: "No new insights. Continue monitoring for opportunities.",
      confidence: "Confidence Level"
    }
  }
};

// =============================================================================
// MOWAWAVE REPUTATION COPY SYSTEM  
// =============================================================================

export const ReputationCopy = {
  // Homepage Copy
  homepage: {
    headline: "Stop Losing Customers Because of Bad Reviews",
    subheadline: "AI automatically responds to Google and Yelp reviews in your tone, while nudging happy customers to leave 5-star reviews.",
    description: "MozaWave Reputation manages your online reputation while you sleep. AI responds to reviews in your brand voice, identifies happy customers for review requests, and tracks sentiment trends to protect your revenue.",
    cta: {
      primary: "🚀 Start Free Trial", 
      secondary: "📞 Book Demo Call"
    },
    trustSignals: [
      "✓ AI responds while you sleep",
      "✓ 95% response rate",
      "✓ Average 0.5+ star lift",
      "✓ Save 10+ hours/week"
    ],
    benefits: [
      "AI responds to reviews while you sleep",
      "Turn happy customers into 5-star reviewers", 
      "Stop bad reviews from killing your business",
      "Increase your average rating by 0.5+ stars",
      "Save 10+ hours per week on reputation management",
      "More reviews = more customers = more revenue"
    ],
    painPoints: [
      "Bad reviews scaring away potential customers",
      "Not responding to reviews fast enough",
      "Missing opportunities to get more positive reviews",
      "Spending too much time managing reputation manually",
      "Not knowing which customers to ask for reviews"
    ]
  } as CopyTemplate,

  // Service Page Copy
  servicePage: {
    headline: "MozaWave Reputation", 
    subheadline: "Stop losing customers because of bad reviews. AI automatically responds while nudging happy customers to leave 5-star reviews",
    description: "AI-powered review management that protects and grows your reputation. Automatically respond to reviews in your brand voice, identify happy customers for review requests, and track sentiment trends to maximize your revenue potential.",
    cta: {
      primary: "🚀 Start Free Trial",
      secondary: "📞 Book Demo Call" 
    },
    trustSignals: [
      "✓ AI responds while you sleep",
      "✓ Tone-matched responses",
      "✓ Smart review requests",
      "✓ Sentiment tracking"
    ],
    benefits: [
      "Automated Review Responses: AI generates professional responses that match your brand voice",
      "Smart Customer Targeting: Identify happy customers most likely to leave 5-star reviews",
      "Sentiment Analysis: Track review sentiment trends and get alerts on negative patterns",
      "Campaign Management: Automated email and SMS campaigns to request reviews from satisfied customers",
      "Response Templates: Pre-approved response templates for common review types",
      "Performance Tracking: Monitor response rates, rating improvements, and revenue impact"
    ],
    painPoints: [
      "Negative reviews damaging your reputation",
      "Missing opportunities to respond to reviews",
      "Not getting enough positive reviews from happy customers",
      "Spending too much time on reputation management",
      "Not tracking the impact of reviews on revenue"
    ]
  } as CopyTemplate,

  // Dashboard Copy
  dashboard: {
    overview: {
      title: "Reputation Management Overview",
      subtitle: "Protect and grow your online reputation with AI-powered automation",
      metrics: {
        averageRating: "Average Rating",
        totalReviews: "Total Reviews", 
        responseRate: "Response Rate",
        sentimentScore: "Sentiment Score",
        monthlyGrowth: "Monthly Growth"
      }
    },
    reviews: {
      title: "Recent Reviews",
      subtitle: "Monitor and respond to customer feedback",
      emptyState: "No new reviews. Continue providing great service!",
      needsResponse: "Needs Response",
      aiResponded: "AI Responded",
      humanResponse: "Human Response"
    },
    campaigns: {
      title: "Review Campaigns",
      subtitle: "Automated campaigns to generate more positive reviews",
      emptyState: "No active campaigns. Start generating more reviews!",
      activeCampaigns: "Active Campaigns",
      successRate: "Success Rate"
    }
  }
};

// =============================================================================
// BUSINESS INTELLIGENCE COPY SYSTEM
// =============================================================================

export const BusinessIntelligenceCopy = {
  // Homepage Copy
  homepage: {
    headline: "Comprehensive Intelligence to Grow Revenue and Protect Reputation",
    subheadline: "Unified dashboard combining competitor intelligence, reputation management, and business analytics with AI-powered insights.",
    description: "MozaWave Business Intelligence gives you the complete picture. Monitor competitors, manage reputation, and track key metrics all in one platform. Get AI-powered insights that turn data into actionable business decisions.",
    cta: {
      primary: "🚀 Start Free Trial",
      secondary: "📞 Book Demo Call"
    },
    trustSignals: [
      "✓ Unified intelligence platform",
      "✓ AI-powered insights", 
      "✓ Real-time monitoring",
      "✓ Actionable recommendations"
    ],
    benefits: [
      "Unified Dashboard: See all your business intelligence in one place",
      "AI Insights: Get automated recommendations based on data analysis",
      "Anomaly Detection: Identify unusual patterns before they impact revenue",
      "Revenue Forecasting: Predict future performance based on current trends",
      "Competitive Analysis: Track market position and competitive threats",
      "Reputation Monitoring: Monitor sentiment and reputation trends"
    ],
    painPoints: [
      "Data scattered across multiple tools",
      "Missing insights that could drive revenue",
      "Not knowing which metrics to focus on",
      "Reactive instead of proactive business decisions",
      "Lacking unified view of business performance"
    ]
  } as CopyTemplate,

  // Dashboard Copy
  dashboard: {
    overview: {
      title: "Business Intelligence Dashboard",
      subtitle: "Complete intelligence to drive revenue and protect reputation",
      metrics: {
        revenueAtRisk: "Revenue at Risk",
        competitiveThreat: "Competitive Threat", 
        sentimentImpact: "Sentiment Impact",
        aiInsights: "AI Insights"
      }
    },
    insights: {
      title: "AI Insights",
      subtitle: "Actionable recommendations based on comprehensive data analysis",
      emptyState: "No new insights. Continue monitoring for opportunities.",
      priority: "Priority Level",
      confidence: "Confidence Score",
      impact: "Expected Impact"
    },
    alerts: {
      title: "Active Alerts",
      subtitle: "Critical issues requiring immediate attention",
      emptyState: "No active alerts. Your business is running smoothly.",
      severity: "Severity",
      source: "Alert Source"
    }
  }
};

// =============================================================================
// AI REASONING FLOWS
// =============================================================================

export const AIReasoningFlows = {
  // Market Watch AI Reasoning
  marketWatch: {
    priceChange: {
      input: "Competitor price increase detected",
      analysis: "Brooklyn Pizza Co increased prices by $2.50 (15% increase) on their signature pizza",
      prioritization: "HIGH PRIORITY - This competitor has 25% market share in your area",
      recommendation: "Consider raising your prices by $1.50-$2.00 to maintain competitive positioning",
      reasoning: "Price increase suggests market acceptance of higher pricing. Your current pricing is 12% below market average.",
      confidence: 87,
      action: "Review pricing strategy for signature items",
      expectedOutcome: "Potential $2,000+ monthly revenue increase with minimal customer loss"
    } as AIReasoningFlow,

    newService: {
      input: "New service launch detected",
      analysis: "Green Clean Services launched mobile app booking with 20% discount promotion",
      prioritization: "MEDIUM PRIORITY - Service expansion in your market segment",
      recommendation: "Consider developing mobile booking capability or promotional response",
      reasoning: "Mobile booking is becoming standard expectation. Early adoption could capture market share.",
      confidence: 73,
      action: "Evaluate mobile app development or booking system upgrade",
      expectedOutcome: "Prevent customer migration and potentially capture new market segment"
    } as AIReasoningFlow,

    adCampaign: {
      input: "Competitor advertising campaign detected",
      analysis: "Elite Fitness running targeted Facebook ads for personal training services",
      prioritization: "LOW PRIORITY - Different service category but same target market",
      recommendation: "Monitor for customer overlap and consider cross-promotion opportunities",
      reasoning: "Different services but similar customer demographics. Potential partnership or competitive threat.",
      confidence: 65,
      action: "Track customer overlap and evaluate partnership potential",
      expectedOutcome: "Identify partnership opportunities or prepare competitive response"
    } as AIReasoningFlow
  },

  // Reputation AI Reasoning
  reputation: {
    negativeReview: {
      input: "Negative review received",
      analysis: "2-star review on Google: 'Poor service quality. Very disappointed with the experience.'",
      prioritization: "HIGH PRIORITY - Negative sentiment could impact search ranking",
      recommendation: "Respond within 24 hours with apology and resolution offer",
      reasoning: "Quick response shows professionalism and can mitigate reputation damage. Public resolution demonstrates commitment to customer satisfaction.",
      confidence: 92,
      action: "Send personalized response offering resolution",
      expectedOutcome: "Mitigate reputation damage and potentially convert dissatisfied customer"
    } as AIReasoningFlow,

    positiveReview: {
      input: "Positive review received",
      analysis: "5-star review on Yelp: 'Excellent service! Very professional and quick response time.'",
      prioritization: "LOW PRIORITY - Positive sentiment boosts reputation",
      recommendation: "Respond with gratitude and encourage similar experiences",
      reasoning: "Positive reviews boost search ranking and attract new customers. Response reinforces positive experience.",
      confidence: 85,
      action: "Send thank you response highlighting positive aspects",
      expectedOutcome: "Reinforce positive experience and encourage repeat business"
    } as AIReasoningFlow,

    reviewRequest: {
      input: "Happy customer identified",
      analysis: "Customer completed service with 5-star internal rating and positive feedback",
      prioritization: "MEDIUM PRIORITY - High probability of positive public review",
      recommendation: "Send personalized review request via email within 24 hours",
      reasoning: "Recent positive experience increases likelihood of 5-star review. Timing is critical for review quality.",
      confidence: 78,
      action: "Send personalized review request email",
      expectedOutcome: "Generate positive public review to boost reputation and attract new customers"
    } as AIReasoningFlow
  },

  // Business Intelligence AI Reasoning
  businessIntelligence: {
    revenueAnomaly: {
      input: "Revenue anomaly detected",
      analysis: "Monthly revenue down 12% compared to previous month and competitor activity increased",
      prioritization: "CRITICAL - Revenue decline with competitive pressure",
      recommendation: "Immediate competitive response and pricing review required",
      reasoning: "Revenue decline during competitive activity suggests market share loss. Immediate action needed to prevent further decline.",
      confidence: 89,
      action: "Implement competitive response strategy and pricing adjustments",
      expectedOutcome: "Stabilize revenue and regain competitive position"
    } as AIReasoningFlow,

    sentimentDecline: {
      input: "Sentiment decline trend detected",
      analysis: "Review sentiment dropped from 85% to 72% over past 30 days",
      prioritization: "HIGH PRIORITY - Sentiment decline impacts customer acquisition",
      recommendation: "Implement customer satisfaction improvement program",
      reasoning: "Declining sentiment indicates service quality issues that could impact future revenue and customer retention.",
      confidence: 81,
      action: "Launch customer satisfaction improvement initiative",
      expectedOutcome: "Improve service quality and reverse sentiment decline"
    } as AIReasoningFlow,

    marketOpportunity: {
      input: "Market gap identified",
      analysis: "Competitors not offering eco-friendly services in your market area",
      prioritization: "MEDIUM PRIORITY - Market differentiation opportunity",
      recommendation: "Evaluate adding eco-friendly service options",
      reasoning: "Market gap presents differentiation opportunity. Early adoption could capture market share and premium pricing.",
      confidence: 76,
      action: "Research and develop eco-friendly service options",
      expectedOutcome: "Capture new market segment and differentiate from competitors"
    } as AIReasoningFlow
  }
};

// =============================================================================
// ALERT TEMPLATES
// =============================================================================

export const AlertTemplates: AlertTemplate[] = [
  {
    type: 'price_change',
    severity: 'high',
    title: '🚨 Competitor Price Increase Detected',
    message: 'Brooklyn Pizza Co increased prices by $2.50 (15% increase) on signature items. This represents a significant competitive threat.',
    reasoning: 'Price increase suggests market acceptance of higher pricing. Your current pricing is 12% below market average, creating revenue opportunity.',
    action: 'Consider raising prices by $1.50-$2.00 to maintain competitive positioning',
    cta: 'Review Pricing Strategy'
  },
  {
    type: 'new_service',
    severity: 'medium',
    title: '⚠️ New Competitor Service Launch',
    message: 'Green Clean Services launched mobile app booking with promotional pricing. This could impact your market share.',
    reasoning: 'Mobile booking is becoming standard expectation. Early adoption could capture market share in your segment.',
    action: 'Evaluate mobile app development or booking system upgrade',
    cta: 'Plan Response Strategy'
  },
  {
    type: 'review_alert',
    severity: 'high',
    title: '⭐ Negative Review Alert',
    message: '2-star review posted on Google: "Poor service quality. Very disappointed with the experience."',
    reasoning: 'Negative reviews impact search ranking and customer acquisition. Quick response can mitigate reputation damage.',
    action: 'Respond within 24 hours with apology and resolution offer',
    cta: 'Respond to Review'
  },
  {
    type: 'revenue_risk',
    severity: 'critical',
    title: '🔥 Revenue at Risk Alert',
    message: 'Revenue-at-Risk score increased to 85%. Multiple competitive threats detected requiring immediate action.',
    reasoning: 'High risk score indicates significant revenue threat from competitive activity. Immediate response required.',
    action: 'Implement comprehensive competitive response strategy',
    cta: 'View Action Plan'
  }
];

// =============================================================================
// DIGEST EMAIL TEMPLATES
// =============================================================================

export const DigestTemplates: DigestTemplate[] = [
  {
    subject: '📊 Your Weekly Competitive Intelligence Digest',
    greeting: 'Hi [Business Owner],\n\nHere\'s what your competitors were up to this week and how to turn it into revenue opportunities:',
    summary: 'This week we detected 8 competitive changes across your tracked competitors. Here are the key opportunities:',
    insights: [
      '🏷️ Brooklyn Pizza Co raised prices by 15% - Revenue opportunity: $2,000+/month',
      '📱 Green Clean Services launched mobile app - Market gap: Consider mobile booking',
      '📢 Elite Fitness increased ad spend by 40% - Marketing opportunity: Boost your presence',
      '⭐ 3 new negative reviews for competitors - Reputation opportunity: Highlight your strengths'
    ],
    actions: [
      'Review your pricing strategy for signature items',
      'Evaluate mobile app development for booking',
      'Increase your advertising presence in key areas',
      'Update your marketing to highlight competitive advantages'
    ],
    closing: 'Want to dive deeper into any of these opportunities? Login to your dashboard or book a strategy call with our team.\n\nBest regards,\nThe MozaWave Intelligence Team'
  },
  {
    subject: '⭐ Your Weekly Reputation Management Report',
    greeting: 'Hi [Business Owner],\n\nYour reputation is looking strong! Here\'s how AI helped protect and grow your online presence this week:',
    summary: 'AI responded to 12 reviews and generated 5 new review requests. Your reputation score improved by 3 points.',
    insights: [
      '🤖 AI responded to 8 reviews automatically - 95% response rate maintained',
      '⭐ Generated 5 new review requests - 3 new 5-star reviews received',
      '📈 Average rating improved from 4.3 to 4.4 - 0.1 star increase',
      '💬 Sentiment score: 87% positive - Above industry average'
    ],
    actions: [
      'Continue providing excellent service to maintain positive sentiment',
      'Consider expanding AI response templates for new review types',
      'Launch targeted campaign for recent happy customers',
      'Monitor competitor reputation changes for opportunities'
    ],
    closing: 'Your reputation is in great shape! Keep up the excellent work and let AI handle the rest.\n\nBest regards,\nThe MozaWave Reputation Team'
  }
];

// =============================================================================
// REVIEW RESPONSE TEMPLATES
// =============================================================================

export const ReviewResponseTemplates = {
  negative: {
    professional: "Thank you for bringing this to our attention. We sincerely apologize for not meeting your expectations and would like to make this right. Please contact us directly at [phone] so we can address your concerns personally.",
    apologetic: "We're truly sorry to hear about your experience. This is not the level of service we strive to provide. Please reach out to us at [email] so we can resolve this issue and ensure you have a positive experience with us.",
    friendly: "We're sorry to hear about your experience! That's definitely not what we want for our customers. Give us a call at [phone] and let's make this right - we'd love the chance to show you what great service looks like!"
  },
  positive: {
    grateful: "Thank you so much for your wonderful feedback! We're thrilled to hear about your positive experience and really appreciate you taking the time to share it. We look forward to serving you again soon!",
    professional: "We really appreciate your kind words and thank you for choosing our services. It's customers like you that make our work so rewarding. We look forward to continuing to exceed your expectations.",
    friendly: "Wow, thank you for the amazing review! We're so glad you had a great experience with us. Your feedback means the world to our team. Can't wait to see you again soon!"
  },
  neutral: {
    professional: "Thank you for your feedback. We appreciate you taking the time to share your experience with us and will use your comments to continuously improve our services.",
    friendly: "Thanks for the feedback! We appreciate you sharing your experience with us. We're always working to improve, so your input is really valuable to us.",
    conversational: "Thanks for taking the time to leave a review! We're glad we could help, and we'll keep working to make sure every customer has a great experience with us."
  }
};

// =============================================================================
// CAMPAIGN MESSAGING
// =============================================================================

export const CampaignMessaging = {
  reviewRequest: {
    email: {
      subject: "How was your recent service? We'd love your feedback!",
      body: "Hi [Customer Name],\n\nWe hope you're enjoying your [service] from [date]! We'd love to hear about your experience.\n\nIf you had a great experience, would you mind leaving us a quick review? It really helps other customers find us and helps us continue providing excellent service.\n\n[Review Link]\n\nThank you for your business!\n[Business Name]"
    },
    sms: {
      message: "Hi [Customer Name]! We hope you're happy with your recent [service]. If you had a great experience, would you mind leaving us a quick review? [Review Link] Thanks! - [Business Name]"
    }
  },
  followUp: {
    email: {
      subject: "Just checking in - how was everything?",
      body: "Hi [Customer Name],\n\nWe wanted to follow up on your recent [service] from [date]. We hope everything met your expectations!\n\nIf you have any feedback or questions, please don't hesitate to reach out. We're always looking to improve our service.\n\nThanks for choosing [Business Name]!\n[Contact Information]"
    }
  }
};

// =============================================================================
// DASHBOARD MICROCOPY
// =============================================================================

export const DashboardMicrocopy = {
  metrics: {
    revenueAtRisk: {
      label: "Revenue at Risk",
      tooltip: "Percentage of your revenue that could be lost due to competitive threats. Lower is better.",
      explanation: "Based on competitor activity, market changes, and operational factors. Updated every 4 hours."
    },
    competitiveThreat: {
      label: "Competitive Threat Level", 
      tooltip: "Overall threat level from competitor activity in your market.",
      explanation: "Calculated from competitor pricing, new services, and marketing activity. Green = low threat, Red = high threat."
    },
    sentimentImpact: {
      label: "Sentiment Impact Score",
      tooltip: "Impact of review sentiment on your business (-100 to +100). Positive = good for business.",
      explanation: "Based on review sentiment, response rates, and customer satisfaction trends."
    },
    responseRate: {
      label: "Review Response Rate",
      tooltip: "Percentage of reviews you've responded to. Higher rates improve search ranking.",
      explanation: "Responding to reviews shows you care about customer feedback and improves your online reputation."
    }
  },
  actions: {
    startTrial: "Start Free Trial",
    bookDemo: "Book Demo Call", 
    seeInsights: "See Insights",
    respondReview: "Respond to Review",
    adjustPricing: "Adjust Pricing",
    viewDetails: "View Details",
    implementAction: "Implement Action",
    dismissAlert: "Dismiss Alert",
    acknowledgeAlert: "Acknowledge Alert"
  },
  emptyStates: {
    noAlerts: "No active alerts. Your competitive position is stable.",
    noInsights: "No new insights. Continue monitoring for opportunities.",
    noReviews: "No new reviews. Continue providing great service!",
    noCompetitors: "No competitors tracked yet. Add competitors to start monitoring."
  },
  status: {
    loading: "Loading intelligence data...",
    error: "Unable to load data. Please try again.",
    success: "Data updated successfully.",
    processing: "Processing your request..."
  }
};

// =============================================================================
// TOOLTIP EXPLANATIONS
// =============================================================================

export const TooltipExplanations = {
  aiInsights: {
    confidence: "How confident the AI is in this recommendation (0-100%). Higher confidence means more reliable insights.",
    impact: "Expected business impact of implementing this recommendation. Based on historical data and market analysis.",
    priority: "How urgent this recommendation is. Critical = immediate action needed, Low = consider when convenient."
  },
  competitorTracking: {
    threatLevel: "How much of a competitive threat this competitor poses. Based on market share, pricing, and activity level.",
    priceGap: "Difference between your prices and competitor prices. Positive = you're more expensive, Negative = you're cheaper.",
    marketShare: "Estimated percentage of the local market this competitor controls."
  },
  reputationMetrics: {
    sentimentTrend: "Direction of review sentiment over time. Up = getting more positive, Down = getting more negative.",
    responseQuality: "AI-calculated quality score of your review responses based on sentiment and engagement.",
    reviewVelocity: "Rate of new reviews coming in. Higher velocity = more customer engagement."
  }
};

export default {
  MarketWatchCopy,
  ReputationCopy,
  BusinessIntelligenceCopy,
  AIReasoningFlows,
  AlertTemplates,
  DigestTemplates,
  ReviewResponseTemplates,
  CampaignMessaging,
  DashboardMicrocopy,
  TooltipExplanations
};

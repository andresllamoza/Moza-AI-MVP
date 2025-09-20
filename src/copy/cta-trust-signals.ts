// MozaWave CTA Phrasing and Trust Signals
// Conversion-optimized call-to-action variations and credibility building elements

export interface CTAVariation {
  primary: string;
  secondary: string;
  tertiary: string;
  urgency: string;
  riskFree: string;
  socialProof: string;
}

export interface TrustSignal {
  type: 'statistic' | 'testimonial' | 'guarantee' | 'security' | 'social_proof';
  content: string;
  icon?: string;
  emphasis?: boolean;
}

export interface Microcopy {
  loading: string;
  success: string;
  error: string;
  empty: string;
  tooltip: string;
  help: string;
  warning: string;
}

// =============================================================================
// CTA PHRASING VARIATIONS
// =============================================================================

export const CTAPhrasing: CTAVariation = {
  primary: "🚀 Start Free Trial",
  secondary: "📞 Book Demo Call",
  tertiary: "💡 See How It Works",
  urgency: "🔥 Limited Time: Start Free Trial",
  riskFree: "✅ Try Risk-Free for 14 Days",
  socialProof: "👥 Join 500+ Businesses Already Using MozaWave"
};

export const CTAVariations = {
  // Primary CTAs
  primary: [
    "🚀 Start Free Trial",
    "Get Started Free",
    "Start Your Free Trial",
    "Try MozaWave Free",
    "Begin Free Trial",
    "Start Free Today",
    "Get Free Access",
    "Launch Free Trial"
  ],

  // Secondary CTAs
  secondary: [
    "📞 Book Demo Call",
    "Schedule Demo",
    "Watch Demo",
    "See Live Demo",
    "Book Strategy Call",
    "Request Demo",
    "Get Personal Demo",
    "See It In Action"
  ],

  // Tertiary CTAs
  tertiary: [
    "💡 See How It Works",
    "Learn More",
    "Discover Features",
    "Explore Platform",
    "View Pricing",
    "See Benefits",
    "Get Details",
    "Find Out More"
  ],

  // Urgency CTAs
  urgency: [
    "🔥 Limited Time: Start Free Trial",
    "⚡ Don't Wait - Start Free Today",
    "🎯 Limited Offer: Try Free Now",
    "⏰ Last Chance: Start Free Trial",
    "🚨 Special Offer: Get Started Free",
    "💎 Exclusive: Free Trial Access",
    "⭐ Premium: Start Free Trial",
    "🏆 Best Deal: Try Free Today"
  ],

  // Risk-free CTAs
  riskFree: [
    "✅ Try Risk-Free for 14 Days",
    "🛡️ No Risk, All Reward - Start Free",
    "💯 100% Risk-Free Trial",
    "🔒 Secure & Risk-Free Trial",
    "🎁 Free Trial, No Strings Attached",
    "✨ Try Free, Cancel Anytime",
    "🆓 Free Trial, No Commitment",
    "🎪 Fun & Risk-Free Trial"
  ],

  // Social proof CTAs
  socialProof: [
    "👥 Join 500+ Businesses Already Using MozaWave",
    "🌟 Trusted by 500+ Successful Businesses",
    "🏢 500+ Businesses Can't Be Wrong",
    "💼 Join the 500+ Business Success Stories",
    "🎯 500+ Businesses Choose MozaWave Daily",
    "🚀 500+ Businesses Growing with MozaWave",
    "⭐ 500+ Businesses Love MozaWave",
    "💪 500+ Businesses Stronger with MozaWave"
  ]
};

// =============================================================================
// TRUST SIGNALS
// =============================================================================

export const TrustSignals: TrustSignal[] = [
  // Statistics
  {
    type: 'statistic',
    content: '95% response rate',
    icon: '📊',
    emphasis: true
  },
  {
    type: 'statistic',
    content: 'Average 0.5+ star rating lift',
    icon: '⭐',
    emphasis: true
  },
  {
    type: 'statistic',
    content: 'Save 10+ hours per week',
    icon: '⏰',
    emphasis: true
  },
  {
    type: 'statistic',
    content: 'Track unlimited competitors',
    icon: '👁️',
    emphasis: true
  },
  {
    type: 'statistic',
    content: 'Real-time alerts',
    icon: '⚡',
    emphasis: true
  },
  {
    type: 'statistic',
    content: '10+ platforms monitored',
    icon: '🌐',
    emphasis: true
  },

  // Guarantees
  {
    type: 'guarantee',
    content: 'Cancel anytime',
    icon: '✅',
    emphasis: false
  },
  {
    type: 'guarantee',
    content: 'First 2 weeks free',
    icon: '🆓',
    emphasis: true
  },
  {
    type: 'guarantee',
    content: 'Setup in 5 minutes',
    icon: '⚡',
    emphasis: true
  },
  {
    type: 'guarantee',
    content: 'No credit card required',
    icon: '💳',
    emphasis: true
  },
  {
    type: 'guarantee',
    content: '30-day money-back guarantee',
    icon: '🛡️',
    emphasis: false
  },
  {
    type: 'guarantee',
    content: '24/7 customer support',
    icon: '🆘',
    emphasis: false
  },

  // Security
  {
    type: 'security',
    content: 'Bank-level security',
    icon: '🔒',
    emphasis: false
  },
  {
    type: 'security',
    content: 'GDPR compliant',
    icon: '🛡️',
    emphasis: false
  },
  {
    type: 'security',
    content: 'SOC 2 certified',
    icon: '🏆',
    emphasis: false
  },
  {
    type: 'security',
    content: 'SSL encrypted',
    icon: '🔐',
    emphasis: false
  },

  // Social Proof
  {
    type: 'social_proof',
    content: '500+ businesses trust us',
    icon: '👥',
    emphasis: true
  },
  {
    type: 'social_proof',
    content: '4.8/5 customer rating',
    icon: '⭐',
    emphasis: true
  },
  {
    type: 'social_proof',
    content: 'Featured in TechCrunch',
    icon: '📰',
    emphasis: false
  },
  {
    type: 'social_proof',
    content: 'Y Combinator backed',
    icon: '🚀',
    emphasis: false
  }
];

// =============================================================================
// MICROCOPY
// =============================================================================

export const Microcopy = {
  // Loading states
  loading: {
    default: 'Loading...',
    data: 'Loading intelligence data...',
    insights: 'Generating AI insights...',
    analysis: 'Analyzing competitive data...',
    response: 'Generating AI response...',
    recommendation: 'Creating recommendation...',
    processing: 'Processing your request...',
    saving: 'Saving changes...',
    updating: 'Updating dashboard...',
    connecting: 'Connecting to AI engine...'
  },

  // Success states
  success: {
    saved: 'Changes saved successfully',
    updated: 'Dashboard updated successfully',
    response: 'Review response sent successfully',
    alert: 'Alert acknowledged successfully',
    action: 'Action implemented successfully',
    campaign: 'Campaign launched successfully',
    settings: 'Settings updated successfully',
    connected: 'Connected successfully',
    imported: 'Data imported successfully',
    exported: 'Data exported successfully'
  },

  // Error states
  error: {
    default: 'Something went wrong',
    network: 'Network connection error',
    timeout: 'Request timed out',
    unauthorized: 'Unauthorized access',
    notFound: 'Data not found',
    validation: 'Invalid input data',
    server: 'Server error occurred',
    api: 'API connection failed',
    permission: 'Insufficient permissions',
    quota: 'Rate limit exceeded'
  },

  // Empty states
  empty: {
    noData: 'No data available',
    noAlerts: 'No active alerts',
    noInsights: 'No new insights',
    noReviews: 'No new reviews',
    noCompetitors: 'No competitors tracked',
    noCampaigns: 'No active campaigns',
    noReports: 'No reports generated',
    noUsers: 'No users found',
    noResults: 'No results found',
    noHistory: 'No history available'
  },

  // Tooltips
  tooltip: {
    confidence: 'How confident the AI is in this recommendation (0-100%)',
    impact: 'Expected business impact of implementing this recommendation',
    priority: 'How urgent this recommendation is',
    revenue: 'Potential revenue impact of this action',
    threat: 'Competitive threat level from this competitor',
    sentiment: 'Overall sentiment trend of your reviews',
    response: 'AI-generated response ready for review',
    insight: 'AI-powered insight based on data analysis',
    metric: 'Key performance indicator for your business',
    action: 'Recommended action to take based on AI analysis'
  },

  // Help text
  help: {
    competitor: 'Add competitors to start monitoring their activities',
    review: 'AI will automatically respond to reviews in your brand voice',
    pricing: 'Adjust pricing based on competitive intelligence',
    campaign: 'Launch campaigns to generate more positive reviews',
    dashboard: 'Monitor all your business intelligence in one place',
    alerts: 'Get notified when important events occur',
    insights: 'AI analyzes data to provide actionable recommendations',
    settings: 'Customize your preferences and notification settings',
    support: 'Contact our support team for assistance',
    demo: 'See how MozaWave can help your business grow'
  },

  // Warnings
  warning: {
    lowConfidence: 'Low confidence score - review recommendation carefully',
    highRisk: 'High risk detected - immediate action recommended',
    dataOutdated: 'Data may be outdated - refreshing now',
    quotaNear: 'Approaching rate limit - consider upgrading plan',
    security: 'Security alert - verify your account',
    maintenance: 'Scheduled maintenance in progress',
    beta: 'This feature is in beta - expect changes',
    deprecated: 'This feature is deprecated - consider alternatives',
    experimental: 'Experimental feature - use with caution',
    limited: 'Limited functionality on current plan'
  }
};

// =============================================================================
// CONVERSION OPTIMIZATION ELEMENTS
// =============================================================================

export const ConversionElements = {
  // Urgency indicators
  urgency: [
    'Limited time offer',
    'Only 3 spots left this week',
    'Offer expires in 24 hours',
    'Last chance to start free',
    'Limited availability',
    'Exclusive offer',
    'Special pricing',
    'Early bird discount'
  ],

  // Scarcity indicators
  scarcity: [
    'Only 5 businesses accepted this month',
    'Limited to first 100 signups',
    'Exclusive beta access',
    'Invite-only program',
    'Limited seats available',
    'First come, first served',
    'Limited time enrollment',
    'Exclusive early access'
  ],

  // Social proof indicators
  socialProof: [
    'Join 500+ successful businesses',
    'Trusted by industry leaders',
    'Recommended by experts',
    'Used by top performers',
    'Chosen by successful entrepreneurs',
    'Preferred by growing businesses',
    'Loved by our customers',
    'Endorsed by professionals'
  ],

  // Risk reversal indicators
  riskReversal: [
    '100% money-back guarantee',
    'No questions asked refund',
    'Cancel anytime',
    'No long-term commitment',
    'Try risk-free',
    'No hidden fees',
    'Transparent pricing',
    'No setup fees'
  ],

  // Authority indicators
  authority: [
    'Y Combinator backed',
    'Featured in TechCrunch',
    'Award-winning platform',
    'Industry recognized',
    'Expert recommended',
    'Proven methodology',
    'Research-backed approach',
    'Validated by data'
  ]
};

// =============================================================================
// A/B TESTING VARIANTS
// =============================================================================

export const ABTestVariants = {
  // Headline variants
  headlines: {
    painPoint: [
      'Stop Losing Customers to Your Competitors',
      'Don\'t Let Competitors Steal Your Customers',
      'Protect Your Business from Competitive Threats',
      'Stop Competitors from Taking Your Market Share'
    ],
    benefit: [
      'Turn Competitive Intelligence Into Revenue',
      'Grow Revenue with AI-Powered Insights',
      'Transform Data Into Business Growth',
      'Unlock Hidden Revenue Opportunities'
    ],
    outcome: [
      'Increase Revenue by 25% with Competitive Intelligence',
      'Save 10 Hours Per Week on Reputation Management',
      'Boost Your Rating by 0.5+ Stars Automatically',
      'Generate $100K+ in New Revenue Opportunities'
    ]
  },

  // CTA variants
  ctas: {
    action: [
      'Start Free Trial',
      'Get Started Free',
      'Try MozaWave Free',
      'Begin Free Trial'
    ],
    benefit: [
      'Stop Losing Customers',
      'Protect Your Revenue',
      'Grow Your Business',
      'Boost Your Rating'
    ],
    urgency: [
      'Start Free Trial Now',
      'Get Started Today',
      'Try Free This Week',
      'Begin Free Trial Now'
    ]
  },

  // Trust signal variants
  trustSignals: {
    guarantee: [
      'Cancel anytime',
      'No credit card required',
      'First 2 weeks free',
      '30-day money-back guarantee'
    ],
    social: [
      '500+ businesses trust us',
      '4.8/5 customer rating',
      'Join successful businesses',
      'Trusted by industry leaders'
    ],
    security: [
      'Bank-level security',
      'GDPR compliant',
      'SOC 2 certified',
      'SSL encrypted'
    ]
  }
};

// =============================================================================
// PERSONALIZATION VARIATIONS
// =============================================================================

export const PersonalizationVariations = {
  // Industry-specific CTAs
  industry: {
    restaurant: [
      'Boost Your Restaurant\'s Online Presence',
      'Stop Losing Customers to Competitor Restaurants',
      'Increase Restaurant Revenue with AI'
    ],
    retail: [
      'Outsmart Retail Competitors',
      'Protect Your Retail Business',
      'Grow Retail Revenue with Intelligence'
    ],
    healthcare: [
      'Protect Your Healthcare Practice',
      'Manage Healthcare Reputation',
      'Grow Your Medical Practice'
    ],
    fitness: [
      'Dominate Your Local Fitness Market',
      'Protect Your Gym\'s Reputation',
      'Grow Your Fitness Business'
    ]
  },

  // Business size-specific CTAs
  businessSize: {
    small: [
      'Perfect for Small Businesses',
      'Built for Small Business Owners',
      'Small Business Success Stories'
    ],
    medium: [
      'Scale Your Growing Business',
      'Enterprise-Grade for Growing Companies',
      'Powerful Tools for Medium Businesses'
    ],
    large: [
      'Enterprise Intelligence Platform',
      'Built for Large Organizations',
      'Enterprise-Grade Security & Features'
    ]
  },

  // Location-specific CTAs
  location: {
    local: [
      'Dominate Your Local Market',
      'Protect Your Local Business',
      'Grow Your Local Presence'
    ],
    national: [
      'Scale Nationwide',
      'National Market Intelligence',
      'Multi-Location Management'
    ],
    global: [
      'Global Market Intelligence',
      'International Expansion',
      'Worldwide Competitor Tracking'
    ]
  }
};

export default {
  CTAPhrasing,
  CTAVariations,
  TrustSignals,
  Microcopy,
  ConversionElements,
  ABTestVariants,
  PersonalizationVariations
};

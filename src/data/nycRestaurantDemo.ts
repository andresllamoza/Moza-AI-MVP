// NYC Restaurant Demo Data - Real Competitive Intelligence Scenario
// This creates a compelling demo showing real competitive insights for NYC restaurants

import { CompetitorAnalysis, NewsArticle, GooglePlaceReview, RedditPost } from '../services/realApiService';

export interface RestaurantInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'threat' | 'trend' | 'competitive_advantage';
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  potentialImpact: {
    revenue: number;
    customers: number;
    marketShare: number;
  };
  actionItems: string[];
  competitorData: {
    name: string;
    weakness: string;
    strength: string;
    opportunity: string;
  };
}

export const nycRestaurantCompetitors = [
  'Joe\'s Pizza',
  'Lucali',
  'Di Fara Pizza',
  'Roberta\'s',
  'Juliana\'s Pizza',
  'Prince Street Pizza',
  'Lombardi\'s',
  'Grimaldi\'s'
];

export const generateNYCRestaurantInsights = (): RestaurantInsight[] => {
  return [
    {
      id: 'insight_1',
      title: 'Lucali\'s 2-Hour Wait Times Creating Customer Frustration',
      description: 'Analysis of 47 recent reviews shows 73% of customers complain about excessive wait times at Lucali. This creates a massive opportunity for a competitor to offer similar quality with better service.',
      type: 'opportunity',
      priority: 'high',
      confidence: 89,
      potentialImpact: {
        revenue: 45000,
        customers: 120,
        marketShare: 8
      },
      actionItems: [
        'Implement online reservation system',
        'Add real-time wait time updates',
        'Offer takeout/delivery options',
        'Create premium seating with shorter waits'
      ],
      competitorData: {
        name: 'Lucali',
        weakness: 'Long wait times, no reservations',
        strength: 'Exceptional pizza quality, authentic atmosphere',
        opportunity: 'Service optimization could capture frustrated customers'
      }
    },
    {
      id: 'insight_2',
      title: 'Di Fara\'s Price Increase Driving Price-Sensitive Customers Away',
      description: 'Recent $2 price increase on signature pie has generated 31 negative reviews in past month. Price-sensitive customers are actively seeking alternatives.',
      type: 'opportunity',
      priority: 'high',
      confidence: 92,
      potentialImpact: {
        revenue: 32000,
        customers: 85,
        marketShare: 6
      },
      actionItems: [
        'Position as premium alternative with better value',
        'Highlight quality-to-price ratio in marketing',
        'Offer family deals and group discounts',
        'Create mid-tier pricing options'
      ],
      competitorData: {
        name: 'Di Fara',
        weakness: 'Recent price increase, customer complaints',
        strength: 'Legendary reputation, authentic ingredients',
        opportunity: 'Value positioning could attract price-sensitive customers'
      }
    },
    {
      id: 'insight_3',
      title: 'Roberta\'s Brooklyn Expansion Creating Market Saturation',
      description: 'Roberta\'s opening 3rd Brooklyn location is creating oversaturation in the area. Local customers are complaining about diluted quality and service.',
      type: 'threat',
      priority: 'medium',
      confidence: 76,
      potentialImpact: {
        revenue: -15000,
        customers: -40,
        marketShare: -3
      },
      actionItems: [
        'Focus on quality over quantity',
        'Strengthen local community relationships',
        'Differentiate with unique offerings',
        'Monitor competitor expansion plans'
      ],
      competitorData: {
        name: 'Roberta\'s',
        weakness: 'Over-expansion, quality concerns',
        strength: 'Strong brand recognition, multiple locations',
        opportunity: 'Focus on single-location excellence'
      }
    },
    {
      id: 'insight_4',
      title: 'Plant-Based Pizza Trend Growing 340% in NYC',
      description: 'Reddit discussions and social media mentions show massive interest in plant-based pizza options. Only 2 competitors currently offer vegan cheese alternatives.',
      type: 'trend',
      priority: 'high',
      confidence: 85,
      potentialImpact: {
        revenue: 28000,
        customers: 95,
        marketShare: 5
      },
      actionItems: [
        'Develop premium plant-based pizza options',
        'Partner with local vegan cheese producers',
        'Create dedicated vegan menu section',
        'Market to health-conscious demographic'
      ],
      competitorData: {
        name: 'Market Trend',
        weakness: 'Limited vegan options in market',
        strength: 'Growing consumer demand',
        opportunity: 'First-mover advantage in plant-based pizza'
      }
    },
    {
      id: 'insight_5',
      title: 'Joe\'s Pizza Delivery Complaints Up 45%',
      description: 'Recent analysis shows Joe\'s Pizza delivery service receiving significantly more complaints about cold food, late deliveries, and poor packaging.',
      type: 'opportunity',
      priority: 'medium',
      confidence: 78,
      potentialImpact: {
        revenue: 22000,
        customers: 60,
        marketShare: 4
      },
      actionItems: [
        'Develop superior delivery system',
        'Invest in quality packaging',
        'Implement delivery tracking',
        'Offer delivery guarantees'
      ],
      competitorData: {
        name: 'Joe\'s Pizza',
        weakness: 'Poor delivery service, cold food complaints',
        strength: 'Strong brand recognition, multiple locations',
        opportunity: 'Superior delivery could capture market share'
      }
    },
    {
      id: 'insight_6',
      title: 'Prince Street Pizza Social Media Engagement Down 60%',
      description: 'Instagram and TikTok engagement for Prince Street Pizza has dropped significantly. Their social media strategy appears outdated and not resonating with younger demographics.',
      type: 'opportunity',
      priority: 'medium',
      confidence: 82,
      potentialImpact: {
        revenue: 18000,
        customers: 50,
        marketShare: 3
      },
      actionItems: [
        'Develop modern social media strategy',
        'Create engaging video content',
        'Partner with local food influencers',
        'Implement user-generated content campaigns'
      ],
      competitorData: {
        name: 'Prince Street Pizza',
        weakness: 'Declining social media engagement, outdated marketing',
        strength: 'Strong product quality, loyal customer base',
        opportunity: 'Modern social media strategy could capture younger market'
      }
    }
  ];
};

export const generateNYCCompetitorAnalysis = (): CompetitorAnalysis[] => {
  return [
    {
      name: 'Lucali',
      rating: 4.6,
      reviewCount: 2847,
      recentReviews: [
        {
          id: 'lucali_1',
          author: 'Maria S.',
          rating: 5,
          text: 'Best pizza in NYC! Worth the wait, but 2+ hours is getting ridiculous.',
          time: new Date().toISOString(),
          sentiment: 'positive',
          businessName: 'Lucali',
          competitorName: 'Lucali'
        },
        {
          id: 'lucali_2',
          author: 'John D.',
          rating: 3,
          text: 'Great pizza but the wait time is absolutely insane. Not sure if it\'s worth it anymore.',
          time: new Date(Date.now() - 3600000).toISOString(),
          sentiment: 'negative',
          businessName: 'Lucali',
          competitorName: 'Lucali'
        }
      ],
      newsMentions: [
        {
          id: 'lucali_news_1',
          title: 'Lucali Pizza Wait Times Reach Record Highs',
          description: 'Popular Brooklyn pizzeria Lucali is seeing wait times of 3+ hours on weekends.',
          url: 'https://example.com/lucali-news',
          publishedAt: new Date().toISOString(),
          source: 'Eater NY',
          sentiment: 'negative',
          relevanceScore: 95,
          competitorMentioned: 'Lucali'
        }
      ],
      redditMentions: [
        {
          id: 'lucali_reddit_1',
          title: 'Is Lucali worth the 3 hour wait?',
          content: 'Planning to visit NYC and everyone says Lucali is a must. But 3 hours? Really?',
          author: 'reddit_user_456',
          subreddit: 'nyc',
          score: 23,
          comments: 45,
          time: new Date().toISOString(),
          sentiment: 'neutral',
          relevanceScore: 88
        }
      ],
      sentimentScore: 72,
      marketPosition: 'leader'
    },
    {
      name: 'Di Fara',
      rating: 4.4,
      reviewCount: 1923,
      recentReviews: [
        {
          id: 'difara_1',
          author: 'Tony R.',
          rating: 2,
          text: 'Used to be amazing but the price increase killed it for me. $28 for a plain pie is too much.',
          time: new Date().toISOString(),
          sentiment: 'negative',
          businessName: 'Di Fara',
          competitorName: 'Di Fara'
        }
      ],
      newsMentions: [
        {
          id: 'difara_news_1',
          title: 'Di Fara Pizza Raises Prices Again',
          description: 'Legendary Brooklyn pizzeria increases prices by $2 across the board.',
          url: 'https://example.com/difara-news',
          publishedAt: new Date().toISOString(),
          source: 'NYC Food',
          sentiment: 'negative',
          relevanceScore: 92,
          competitorMentioned: 'Di Fara'
        }
      ],
      redditMentions: [],
      sentimentScore: 58,
      marketPosition: 'challenger'
    }
  ];
};

export const generateNYCNewsData = (): NewsArticle[] => {
  return [
    {
      id: 'nyc_news_1',
      title: 'NYC Pizza Scene Heats Up with New Plant-Based Options',
      description: 'Several new pizzerias in Brooklyn are focusing on vegan and plant-based pizza options, responding to growing demand from health-conscious New Yorkers.',
      url: 'https://example.com/nyc-vegan-pizza',
      publishedAt: new Date().toISOString(),
      source: 'Gothamist',
      sentiment: 'positive',
      relevanceScore: 88,
      competitorMentioned: 'Market Trend'
    },
    {
      id: 'nyc_news_2',
      title: 'Delivery Apps Driving Pizza Price Wars in NYC',
      description: 'Third-party delivery apps are creating intense competition among NYC pizzerias, with many offering deep discounts to attract customers.',
      url: 'https://example.com/nyc-delivery-wars',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: 'Crain\'s New York',
      sentiment: 'neutral',
      relevanceScore: 85,
      competitorMentioned: 'Market Trend'
    }
  ];
};

export const generateNYCRedditData = (): RedditPost[] => {
  return [
    {
      id: 'nyc_reddit_1',
      title: 'Best pizza in NYC that doesn\'t require a 2+ hour wait?',
      content: 'Visiting NYC next week and want amazing pizza but don\'t want to wait 2+ hours like at Lucali. Any recommendations?',
      author: 'nyc_visitor_123',
      subreddit: 'nyc',
      score: 67,
      comments: 89,
      time: new Date().toISOString(),
      sentiment: 'neutral',
      relevanceScore: 92
    },
    {
      id: 'nyc_reddit_2',
      title: 'Why is NYC pizza so expensive now?',
      content: 'Used to get great slices for $2-3, now everything is $4-5+. What happened?',
      author: 'nyc_local_456',
      subreddit: 'nyc',
      score: 34,
      comments: 56,
      time: new Date(Date.now() - 3600000).toISOString(),
      sentiment: 'negative',
      relevanceScore: 78
    }
  ];
};

// Demo scenario for client presentation
export const nycRestaurantDemoScenario = {
  businessName: 'Mario\'s Artisan Pizza',
  location: 'Brooklyn, NY',
  industry: 'restaurant',
  zipCode: '11201',
  
  // Key insights to highlight in demo
  keyInsights: [
    'Lucali\'s wait time complaints create opportunity for better service',
    'Di Fara\'s price increase driving customers away',
    'Plant-based pizza trend growing 340% in NYC',
    'Delivery service quality issues across competitors'
  ],
  
  // Revenue opportunities
  revenueOpportunities: [
    { source: 'Wait time optimization', potential: '$45,000' },
    { source: 'Price-sensitive customer capture', potential: '$32,000' },
    { source: 'Plant-based pizza market', potential: '$28,000' },
    { source: 'Superior delivery service', potential: '$22,000' }
  ],
  
  // Competitive advantages to highlight
  competitiveAdvantages: [
    'Online reservation system',
    'Premium plant-based options',
    'Superior delivery experience',
    'Modern social media presence',
    'Value-focused pricing strategy'
  ]
};

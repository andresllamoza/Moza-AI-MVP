// Realistic Demo Data for MozaWave - NYC Restaurant Scenario
// This creates believable competitive intelligence data for testing

export interface RealisticInsight {
  id: string;
  title: string;
  description: string;
  value: string;
  impact: string;
  icon: string;
  color: string;
  confidence: number;
  competitorData: {
    name: string;
    weakness: string;
    strength: string;
    opportunity: string;
  };
  actionItems: string[];
}

export interface CompetitorAnalysis {
  name: string;
  rating: number;
  reviewCount: number;
  recentReviews: {
    author: string;
    rating: number;
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
  keyWeakness: string;
  keyStrength: string;
}

export const realisticNYCRestaurantData = {
  businessName: "Mario's Artisan Pizza",
  location: "Brooklyn, NY 11201",
  industry: "Restaurant & Food Service",
  
  competitors: [
    {
      name: "Lucali",
      rating: 4.6,
      reviewCount: 2847,
      recentReviews: [
        {
          author: "Sarah M.",
          rating: 5,
          text: "Best pizza in NYC! But the 2+ hour wait is getting ridiculous. Worth it once, but not every time.",
          sentiment: 'positive'
        },
        {
          author: "Mike R.",
          rating: 3,
          text: "Great pizza but the wait time is absolutely insane. Not sure if it's worth it anymore.",
          sentiment: 'negative'
        },
        {
          author: "Jennifer L.",
          rating: 4,
          text: "Amazing pizza, authentic atmosphere. Just wish they took reservations or had a better system.",
          sentiment: 'positive'
        }
      ],
      marketPosition: 'leader',
      keyWeakness: "Excessive wait times (2-3 hours), no reservation system",
      keyStrength: "Exceptional pizza quality, authentic atmosphere, strong brand recognition"
    },
    {
      name: "Di Fara Pizza",
      rating: 4.4,
      reviewCount: 1923,
      recentReviews: [
        {
          author: "Tony R.",
          rating: 2,
          text: "Used to be amazing but the price increase killed it for me. $28 for a plain pie is too much.",
          sentiment: 'negative'
        },
        {
          author: "Maria S.",
          rating: 4,
          text: "Still great pizza but getting expensive. Quality is there but value is questionable now.",
          sentiment: 'neutral'
        }
      ],
      marketPosition: 'challenger',
      keyWeakness: "Recent $2 price increase, customer complaints about value",
      keyStrength: "Legendary reputation, authentic ingredients, traditional methods"
    },
    {
      name: "Roberta's",
      rating: 4.2,
      reviewCount: 1456,
      recentReviews: [
        {
          author: "David K.",
          rating: 3,
          text: "Good pizza but quality seems to have declined since they expanded. Too many locations now.",
          sentiment: 'negative'
        },
        {
          author: "Lisa P.",
          rating: 4,
          text: "Solid pizza, good atmosphere. Not as special as it used to be but still reliable.",
          sentiment: 'neutral'
        }
      ],
      marketPosition: 'follower',
      keyWeakness: "Over-expansion leading to quality concerns, diluted brand",
      keyStrength: "Multiple locations, strong brand recognition, consistent service"
    }
  ],

  insights: [
    {
      id: 'insight_1',
      title: 'Lucali\'s Wait Time Crisis Creates Massive Opportunity',
      description: 'Analysis of 2,847 reviews shows 68% of customers complain about excessive wait times at Lucali. This creates a $8,200 monthly revenue opportunity for a competitor with better service.',
      value: '$8,200',
      impact: 'Monthly Revenue',
      icon: 'TrendingUp',
      color: 'text-success-400',
      confidence: 89,
      competitorData: {
        name: 'Lucali',
        weakness: '2-3 hour wait times, no reservation system',
        strength: 'Exceptional pizza quality, authentic atmosphere',
        opportunity: 'Implement online reservations and wait time management'
      },
      actionItems: [
        'Implement online reservation system',
        'Add real-time wait time updates via text',
        'Create premium seating with shorter waits',
        'Offer takeout/delivery options for wait-averse customers'
      ]
    },
    {
      id: 'insight_2',
      title: 'Di Fara\'s Price Increase Driving Customers Away',
      description: 'Recent $2 price increase has generated 31 negative reviews in past month. Price-sensitive customers are actively seeking alternatives, creating a $5,400 monthly opportunity.',
      value: '$5,400',
      impact: 'Monthly Revenue',
      icon: 'DollarSign',
      color: 'text-warning-400',
      confidence: 76,
      competitorData: {
        name: 'Di Fara',
        weakness: 'Recent price increase, customer value complaints',
        strength: 'Legendary reputation, authentic ingredients',
        opportunity: 'Position as premium alternative with better value'
      },
      actionItems: [
        'Highlight quality-to-price ratio in marketing',
        'Offer family deals and group discounts',
        'Create mid-tier pricing options',
        'Emphasize value proposition over competitors'
      ]
    },
    {
      id: 'insight_3',
      title: 'Plant-Based Pizza Trend Growing 156% in NYC',
      description: 'Social media mentions and Reddit discussions show massive interest in plant-based pizza options. Only 2 competitors currently offer vegan alternatives, creating a $3,800 monthly opportunity.',
      value: '$3,800',
      impact: 'Monthly Revenue',
      icon: 'Target',
      color: 'text-primary-400',
      confidence: 82,
      competitorData: {
        name: 'Market Trend',
        weakness: 'Limited vegan options in market',
        strength: 'Growing consumer demand and social media buzz',
        opportunity: 'First-mover advantage in plant-based pizza'
      },
      actionItems: [
        'Develop premium plant-based pizza options',
        'Partner with local vegan cheese producers',
        'Create dedicated vegan menu section',
        'Market to health-conscious demographic on social media'
      ]
    },
    {
      id: 'insight_4',
      title: 'Roberta\'s Quality Decline Creates Service Gap',
      description: 'Analysis shows 34% of recent reviews mention quality decline since expansion. Customers are seeking consistent quality, creating a $4,200 monthly opportunity for reliable service.',
      value: '$4,200',
      impact: 'Monthly Revenue',
      icon: 'AlertTriangle',
      color: 'text-red-pink-400',
      confidence: 78,
      competitorData: {
        name: 'Roberta\'s',
        weakness: 'Quality decline due to over-expansion',
        strength: 'Strong brand recognition, multiple locations',
        opportunity: 'Focus on single-location excellence and consistency'
      },
      actionItems: [
        'Focus on quality over quantity',
        'Implement strict quality control measures',
        'Strengthen local community relationships',
        'Differentiate with unique offerings and consistency'
      ]
    }
  ],

  marketData: {
    totalMarketSize: '$2.4M',
    averageOrderValue: '$24.50',
    peakHours: '6:00 PM - 8:30 PM',
    customerDemographics: {
      age25to34: '42%',
      age35to44: '31%',
      families: '38%',
      professionals: '45%'
    },
    seasonalTrends: {
      summer: '+23%',
      winter: '-8%',
      holidays: '+45%'
    }
  },

  revenueOpportunities: [
    { source: 'Wait time optimization', potential: '$8,200', confidence: 89 },
    { source: 'Price-sensitive customer capture', potential: '$5,400', confidence: 76 },
    { source: 'Plant-based pizza market', potential: '$3,800', confidence: 82 },
    { source: 'Quality consistency advantage', potential: '$4,200', confidence: 78 }
  ],

  totalRevenueOpportunity: '$21,600',
  monthlyProjection: '$18,400',
  annualProjection: '$220,800',

  keyMetrics: {
    competitorCount: 8,
    totalReviewsAnalyzed: 6234,
    sentimentAnalysisAccuracy: '94%',
    dataFreshness: 'Last 24 hours',
    marketCoverage: 'Brooklyn, NY area'
  }
};

export const generateRealisticInsights = (businessInfo: any): RealisticInsight[] => {
  // Return restaurant-specific insights for testing
  return realisticNYCRestaurantData.insights;
};

export const generateRealisticCompetitors = () => {
  return realisticNYCRestaurantData.competitors as CompetitorAnalysis[];
};

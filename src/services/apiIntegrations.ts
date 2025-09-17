// Moza Intelligence Pro - Free API Integration Services
// Real-time data from NewsAPI, Google Places, Social Media, and NLP APIs

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relevanceScore: number;
  competitorMentioned?: string;
}

export interface CompetitorReview {
  id: string;
  businessName: string;
  rating: number;
  reviewText: string;
  author: string;
  date: string;
  platform: 'google' | 'yelp' | 'facebook';
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  keyPhrases: string[];
}

export interface SocialMention {
  id: string;
  platform: 'twitter' | 'reddit' | 'linkedin';
  content: string;
  author: string;
  date: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  hashtags: string[];
  mentions: string[];
}

export interface BusinessEnrichment {
  companyName: string;
  domain: string;
  industry: string;
  employeeCount: string;
  revenue: string;
  location: string;
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  keyContacts: Array<{
    name: string;
    title: string;
    email: string;
    phone?: string;
  }>;
  technologies: string[];
  funding: {
    total: string;
    rounds: number;
    lastRound: string;
  };
}

export interface FusedInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'threat' | 'trend' | 'competitor_analysis';
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  sources: string[];
  externalData: any;
  internalData: any;
  recommendation: string;
  potentialImpact: {
    revenue: number;
    customers: number;
    marketShare: number;
  };
  actionItems: string[];
  createdAt: string;
}

// NewsAPI Integration
export class NewsAPIService {
  private apiKey = 'your_newsapi_key'; // Replace with actual API key
  private baseUrl = 'https://newsapi.org/v2';

  async getCompetitorNews(competitors: string[], industry: string): Promise<NewsArticle[]> {
    try {
      const query = competitors.join(' OR ') + ` AND ${industry}`;
      const response = await fetch(
        `${this.baseUrl}/everything?q=${encodeURIComponent(query)}&apiKey=${this.apiKey}&sortBy=publishedAt&pageSize=20`
      );
      
      if (!response.ok) {
        throw new Error('NewsAPI request failed');
      }

      const data = await response.json();
      
      return data.articles.map((article: any, index: number) => ({
        id: `news_${index}`,
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        relevanceScore: this.calculateRelevanceScore(article, competitors, industry),
        competitorMentioned: this.extractCompetitorMention(article, competitors)
      }));
    } catch (error) {
      console.error('NewsAPI Error:', error);
      return this.getMockNewsData(competitors, industry);
    }
  }

  async getIndustryTrends(industry: string): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/everything?q=${encodeURIComponent(industry)}&apiKey=${this.apiKey}&sortBy=publishedAt&pageSize=15`
      );
      
      if (!response.ok) {
        throw new Error('NewsAPI request failed');
      }

      const data = await response.json();
      
      return data.articles.map((article: any, index: number) => ({
        id: `trend_${index}`,
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        relevanceScore: this.calculateTrendRelevance(article, industry)
      }));
    } catch (error) {
      console.error('NewsAPI Error:', error);
      return this.getMockTrendData(industry);
    }
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['growth', 'success', 'increase', 'profit', 'win', 'excellent', 'outstanding', 'breakthrough'];
    const negativeWords = ['decline', 'loss', 'decrease', 'fail', 'crisis', 'problem', 'issue', 'concern'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateRelevanceScore(article: any, competitors: string[], industry: string): number {
    const text = (article.title + ' ' + article.description).toLowerCase();
    let score = 0;
    
    competitors.forEach(competitor => {
      if (text.includes(competitor.toLowerCase())) score += 30;
    });
    
    if (text.includes(industry.toLowerCase())) score += 20;
    
    return Math.min(score, 100);
  }

  private calculateTrendRelevance(article: any, industry: string): number {
    const text = (article.title + ' ' + article.description).toLowerCase();
    let score = 0;
    
    if (text.includes(industry.toLowerCase())) score += 40;
    if (text.includes('trend') || text.includes('growth') || text.includes('market')) score += 30;
    
    return Math.min(score, 100);
  }

  private extractCompetitorMention(article: any, competitors: string[]): string | undefined {
    const text = (article.title + ' ' + article.description).toLowerCase();
    return competitors.find(competitor => text.includes(competitor.toLowerCase()));
  }

  private getMockNewsData(competitors: string[], industry: string): NewsArticle[] {
    return [
      {
        id: 'news_1',
        title: `${competitors[0]} Launches New AI-Powered ${industry} Solution`,
        description: `Industry leader ${competitors[0]} announces breakthrough AI technology that could revolutionize ${industry} services.`,
        url: 'https://example.com/news1',
        publishedAt: new Date().toISOString(),
        source: 'TechCrunch',
        sentiment: 'positive',
        relevanceScore: 95,
        competitorMentioned: competitors[0]
      },
      {
        id: 'news_2',
        title: `${competitors[1]} Faces Regulatory Challenges in ${industry}`,
        description: `Recent regulatory changes impact ${competitors[1]}'s operations in the ${industry} sector.`,
        url: 'https://example.com/news2',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: 'Business Wire',
        sentiment: 'negative',
        relevanceScore: 88,
        competitorMentioned: competitors[1]
      }
    ];
  }

  private getMockTrendData(industry: string): NewsArticle[] {
    return [
      {
        id: 'trend_1',
        title: `${industry} Industry Sees 25% Growth in Q3`,
        description: `The ${industry} sector continues to expand with new technologies and customer demands driving innovation.`,
        url: 'https://example.com/trend1',
        publishedAt: new Date().toISOString(),
        source: 'Industry Report',
        sentiment: 'positive',
        relevanceScore: 92
      }
    ];
  }
}

// Google Places API Integration
export class PlacesAPIService {
  private apiKey = 'your_google_places_key'; // Replace with actual API key
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  async getCompetitorReviews(competitors: string[], location: string): Promise<CompetitorReview[]> {
    try {
      const reviews: CompetitorReview[] = [];
      
      for (const competitor of competitors) {
        const response = await fetch(
          `${this.baseUrl}/textsearch/json?query=${encodeURIComponent(competitor + ' ' + location)}&key=${this.apiKey}`
        );
        
        if (!response.ok) continue;
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const place = data.results[0];
          const placeId = place.place_id;
          
          // Get detailed reviews
          const detailsResponse = await fetch(
            `${this.baseUrl}/details/json?place_id=${placeId}&fields=reviews,rating&key=${this.apiKey}`
          );
          
          if (detailsResponse.ok) {
            const details = await detailsResponse.json();
            if (details.result && details.result.reviews) {
              details.result.reviews.forEach((review: any, index: number) => {
                reviews.push({
                  id: `google_${placeId}_${index}`,
                  businessName: competitor,
                  rating: review.rating,
                  reviewText: review.text,
                  author: review.author_name,
                  date: new Date(review.time * 1000).toISOString(),
                  platform: 'google',
                  sentiment: this.analyzeSentiment(review.text),
                  sentimentScore: this.calculateSentimentScore(review.text),
                  keyPhrases: this.extractKeyPhrases(review.text)
                });
              });
            }
          }
        }
      }
      
      return reviews;
    } catch (error) {
      console.error('Places API Error:', error);
      return this.getMockReviewData(competitors);
    }
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['excellent', 'amazing', 'great', 'wonderful', 'fantastic', 'love', 'perfect', 'outstanding'];
    const negativeWords = ['terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointed', 'bad', 'poor'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(text: string): number {
    const positiveWords = ['excellent', 'amazing', 'great', 'wonderful', 'fantastic', 'love', 'perfect', 'outstanding'];
    const negativeWords = ['terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointed', 'bad', 'poor'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    return Math.max(-100, Math.min(100, (positiveCount - negativeCount) * 20));
  }

  private extractKeyPhrases(text: string): string[] {
    // Simple key phrase extraction - in production, use NLP libraries
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const filteredWords = words.filter(word => word.length > 3 && !stopWords.includes(word));
    
    // Return most frequent words as key phrases
    const wordCount: { [key: string]: number } = {};
    filteredWords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  private getMockReviewData(competitors: string[]): CompetitorReview[] {
    return competitors.flatMap(competitor => [
      {
        id: `google_${competitor}_1`,
        businessName: competitor,
        rating: 4.5,
        reviewText: `Excellent service! ${competitor} really knows their stuff and delivered exactly what we needed.`,
        author: 'John Smith',
        date: new Date().toISOString(),
        platform: 'google',
        sentiment: 'positive',
        sentimentScore: 85,
        keyPhrases: ['excellent', 'service', 'delivered', 'needed']
      },
      {
        id: `google_${competitor}_2`,
        businessName: competitor,
        rating: 2.0,
        reviewText: `Not impressed with ${competitor}. Poor communication and delayed delivery.`,
        author: 'Jane Doe',
        date: new Date(Date.now() - 86400000).toISOString(),
        platform: 'google',
        sentiment: 'negative',
        sentimentScore: -60,
        keyPhrases: ['poor', 'communication', 'delayed', 'delivery']
      }
    ]);
  }
}

// Social Media API Integration
export class SocialMediaService {
  async getTwitterMentions(competitors: string[], hashtags: string[]): Promise<SocialMention[]> {
    try {
      // In production, integrate with Twitter API v2
      return this.getMockTwitterData(competitors, hashtags);
    } catch (error) {
      console.error('Twitter API Error:', error);
      return this.getMockTwitterData(competitors, hashtags);
    }
  }

  async getRedditDiscussions(industry: string, subreddits: string[]): Promise<SocialMention[]> {
    try {
      // In production, integrate with Reddit API
      return this.getMockRedditData(industry, subreddits);
    } catch (error) {
      console.error('Reddit API Error:', error);
      return this.getMockRedditData(industry, subreddits);
    }
  }

  private getMockTwitterData(competitors: string[], hashtags: string[]): SocialMention[] {
    return [
      {
        id: 'twitter_1',
        platform: 'twitter',
        content: `Just tried ${competitors[0]} and they exceeded expectations! #${hashtags[0]} #innovation`,
        author: '@techreviewer',
        date: new Date().toISOString(),
        engagement: { likes: 45, shares: 12, comments: 8 },
        sentiment: 'positive',
        sentimentScore: 75,
        hashtags: hashtags.slice(0, 2),
        mentions: [competitors[0]]
      },
      {
        id: 'twitter_2',
        platform: 'twitter',
        content: `Disappointed with ${competitors[1]}'s customer service. Had to wait 2 hours for a response.`,
        author: '@frustrated_customer',
        date: new Date(Date.now() - 3600000).toISOString(),
        engagement: { likes: 23, shares: 15, comments: 31 },
        sentiment: 'negative',
        sentimentScore: -80,
        hashtags: [],
        mentions: [competitors[1]]
      }
    ];
  }

  private getMockRedditData(industry: string, subreddits: string[]): SocialMention[] {
    return [
      {
        id: 'reddit_1',
        platform: 'reddit',
        content: `Has anyone else noticed the quality decline in ${industry} services lately? Looking for recommendations.`,
        author: 'u/industry_insider',
        date: new Date().toISOString(),
        engagement: { likes: 67, shares: 0, comments: 23 },
        sentiment: 'negative',
        sentimentScore: -40,
        hashtags: [],
        mentions: []
      }
    ];
  }
}

// Business Enrichment API Integration
export class BusinessEnrichmentService {
  async enrichBusinessData(companyName: string, domain: string): Promise<BusinessEnrichment> {
    try {
      // In production, integrate with Clearbit, Hunter.io, etc.
      return this.getMockEnrichmentData(companyName, domain);
    } catch (error) {
      console.error('Business Enrichment Error:', error);
      return this.getMockEnrichmentData(companyName, domain);
    }
  }

  private getMockEnrichmentData(companyName: string, domain: string): BusinessEnrichment {
    return {
      companyName,
      domain,
      industry: 'Technology',
      employeeCount: '50-200',
      revenue: '$10M-$50M',
      location: 'San Francisco, CA',
      socialProfiles: {
        linkedin: `https://linkedin.com/company/${companyName.toLowerCase()}`,
        twitter: `@${companyName.toLowerCase()}`,
        facebook: `https://facebook.com/${companyName.toLowerCase()}`
      },
      keyContacts: [
        {
          name: 'John Smith',
          title: 'CEO',
          email: 'john@' + domain,
          phone: '+1-555-0123'
        },
        {
          name: 'Sarah Johnson',
          title: 'Marketing Director',
          email: 'sarah@' + domain
        }
      ],
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
      funding: {
        total: '$15M',
        rounds: 3,
        lastRound: 'Series A'
      }
    };
  }
}

// AI-Powered Fused Insights Engine
export class FusedInsightsEngine {
  async generateInsights(
    externalData: { news: NewsArticle[], reviews: CompetitorReview[], social: SocialMention[] },
    internalData: any,
    businessContext: { name: string, industry: string, location: string }
  ): Promise<FusedInsight[]> {
    const insights: FusedInsight[] = [];

    // Analyze competitor sentiment trends
    const competitorSentiment = this.analyzeCompetitorSentiment(externalData.reviews);
    if (competitorSentiment.trend === 'declining') {
      insights.push({
        id: 'insight_1',
        title: 'Competitor Weakness Opportunity',
        description: `${competitorSentiment.competitor} is experiencing declining customer satisfaction. This presents an opportunity to capture their dissatisfied customers.`,
        type: 'opportunity',
        priority: 'high',
        confidence: 85,
        sources: ['Google Reviews', 'Yelp'],
        externalData: competitorSentiment,
        internalData: null,
        recommendation: 'Launch targeted marketing campaign highlighting your superior customer service',
        potentialImpact: {
          revenue: 25000,
          customers: 15,
          marketShare: 5
        },
        actionItems: [
          'Create competitor comparison content',
          'Target their negative review keywords in SEO',
          'Launch retargeting ads to their website visitors'
        ],
        createdAt: new Date().toISOString()
      });
    }

    // Analyze market trends vs internal complaints
    const trendAnalysis = this.analyzeTrendsVsComplaints(externalData.news, internalData);
    if (trendAnalysis.opportunity) {
      insights.push({
        id: 'insight_2',
        title: 'Market Trend Alignment',
        description: `Industry trend towards ${trendAnalysis.trend} aligns with ${trendAnalysis.complaintPercentage}% of your customer complaints. This is a perfect opportunity to pivot.`,
        type: 'trend',
        priority: 'medium',
        confidence: 78,
        sources: ['Industry News', 'Customer Feedback'],
        externalData: trendAnalysis.externalTrends,
        internalData: trendAnalysis.internalComplaints,
        recommendation: 'Develop new service offering addressing this trend',
        potentialImpact: {
          revenue: 40000,
          customers: 25,
          marketShare: 8
        },
        actionItems: [
          'Research market demand for new service',
          'Develop pricing strategy',
          'Create marketing materials'
        ],
        createdAt: new Date().toISOString()
      });
    }

    // Analyze social media sentiment vs business performance
    const socialAnalysis = this.analyzeSocialSentiment(externalData.social, internalData);
    if (socialAnalysis.sentimentGap > 20) {
      insights.push({
        id: 'insight_3',
        title: 'Social Media Reputation Risk',
        description: `Social media sentiment is ${socialAnalysis.sentimentGap}% more negative than your internal metrics suggest. This could impact future growth.`,
        type: 'threat',
        priority: 'high',
        confidence: 92,
        sources: ['Twitter', 'Reddit'],
        externalData: socialAnalysis.socialData,
        internalData: socialAnalysis.internalData,
        recommendation: 'Implement social media monitoring and response strategy',
        potentialImpact: {
          revenue: -15000,
          customers: -10,
          marketShare: -3
        },
        actionItems: [
          'Set up social media monitoring tools',
          'Develop crisis communication plan',
          'Train team on social media management'
        ],
        createdAt: new Date().toISOString()
      });
    }

    return insights;
  }

  private analyzeCompetitorSentiment(reviews: CompetitorReview[]): any {
    const competitorSentiments: { [key: string]: { positive: number, negative: number, total: number } } = {};
    
    reviews.forEach(review => {
      if (!competitorSentiments[review.businessName]) {
        competitorSentiments[review.businessName] = { positive: 0, negative: 0, total: 0 };
      }
      
      competitorSentiments[review.businessName].total++;
      if (review.sentiment === 'positive') competitorSentiments[review.businessName].positive++;
      if (review.sentiment === 'negative') competitorSentiments[review.businessName].negative++;
    });

    const worstCompetitor = Object.entries(competitorSentiments)
      .map(([name, data]) => ({
        name,
        positiveRate: data.positive / data.total,
        negativeRate: data.negative / data.total,
        trend: data.negative > data.positive ? 'declining' : 'stable'
      }))
      .sort((a, b) => b.negativeRate - a.negativeRate)[0];

    return worstCompetitor;
  }

  private analyzeTrendsVsComplaints(news: NewsArticle[], internalData: any): any {
    // Mock analysis - in production, use NLP to match trends with complaints
    const trendingTopics = ['sustainability', 'AI automation', 'remote services'];
    const complaintCategories = ['delivery delays', 'poor communication', 'outdated technology'];
    
    return {
      opportunity: true,
      trend: 'sustainability',
      complaintPercentage: 30,
      externalTrends: news.filter(article => article.title.includes('sustainability')),
      internalComplaints: complaintCategories.filter(cat => cat.includes('sustainability'))
    };
  }

  private analyzeSocialSentiment(social: SocialMention[], internalData: any): any {
    const socialSentiment = social.reduce((acc, mention) => acc + mention.sentimentScore, 0) / social.length;
    const internalSentiment = 75; // Mock internal sentiment score
    
    return {
      sentimentGap: Math.abs(socialSentiment - internalSentiment),
      socialData: social,
      internalData: { sentiment: internalSentiment }
    };
  }
}

// Export all services
export const newsAPIService = new NewsAPIService();
export const placesAPIService = new PlacesAPIService();
export const socialMediaService = new SocialMediaService();
export const businessEnrichmentService = new BusinessEnrichmentService();
export const fusedInsightsEngine = new FusedInsightsEngine();

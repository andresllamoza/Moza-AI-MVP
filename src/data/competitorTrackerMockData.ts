// Mock data service for Competitor Tracker MVP
// Generates realistic competitor data for timeline UI

export interface CompetitorChange {
  id: string;
  type: 'price_change' | 'new_review' | 'new_service' | 'ad_campaign' | 'rating_change';
  title: string;
  description: string;
  timestamp: Date;
  impact: 'positive' | 'negative' | 'neutral';
  details: {
    oldValue?: string;
    newValue?: string;
    url?: string;
    platform?: string;
  };
}

export interface CompetitorData {
  id: string;
  name: string;
  url: string;
  platform: 'google' | 'yelp' | 'facebook' | 'website';
  currentData: {
    price?: string;
    rating?: number;
    reviewCount?: number;
    services?: string[];
    lastChecked: Date;
  };
  changes: CompetitorChange[];
}

const mockCompetitors: CompetitorData[] = [
  {
    id: 'comp_1',
    name: 'Brooklyn Pizza Co',
    url: 'https://www.google.com/maps/place/brooklyn+pizza',
    platform: 'google',
    currentData: {
      price: '$12-18',
      rating: 4.5,
      reviewCount: 234,
      services: ['Pizza', 'Delivery', 'Takeout', 'Online Ordering'],
      lastChecked: new Date()
    },
    changes: []
  },
  {
    id: 'comp_2',
    name: 'Green Clean Services',
    url: 'https://www.yelp.com/biz/green-clean-austin',
    platform: 'yelp',
    currentData: {
      price: '$150-200',
      rating: 4.8,
      reviewCount: 156,
      services: ['House Cleaning', 'Deep Cleaning', 'Move-in/Move-out'],
      lastChecked: new Date()
    },
    changes: []
  },
  {
    id: 'comp_3',
    name: 'TechStart Solutions',
    url: 'https://facebook.com/techstart-solutions',
    platform: 'facebook',
    currentData: {
      price: '$200/hour',
      rating: 4.2,
      reviewCount: 89,
      services: ['Web Development', 'Mobile Apps', 'Consulting'],
      lastChecked: new Date()
    },
    changes: []
  }
];

// Generate realistic changes for the last 30 days
function generateMockChanges(competitor: CompetitorData): CompetitorChange[] {
  const changes: CompetitorChange[] = [];
  const now = new Date();
  const changeTypes: CompetitorChange['type'][] = ['price_change', 'new_review', 'new_service', 'ad_campaign', 'rating_change'];
  
  // Generate 3-8 changes over the last 30 days
  const numChanges = Math.floor(Math.random() * 6) + 3;
  
  for (let i = 0; i < numChanges; i++) {
    const changeType = changeTypes[Math.floor(Math.random() * changeTypes.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    
    let change: CompetitorChange;
    
    switch (changeType) {
      case 'price_change':
        const oldPrice = competitor.currentData.price || '$10-15';
        const newPrice = competitor.currentData.price || '$12-18';
        change = {
          id: `change_${competitor.id}_${i}`,
          type: 'price_change',
          title: 'Price Change Detected',
          description: `Changed pricing from ${oldPrice} to ${newPrice}`,
          timestamp,
          impact: Math.random() > 0.5 ? 'negative' : 'positive',
          details: {
            oldValue: oldPrice,
            newValue: newPrice,
            platform: competitor.platform
          }
        };
        break;
        
      case 'new_review':
        const reviewTexts = [
          'Great service, highly recommend!',
          'Fast delivery and delicious food.',
          'Excellent customer service.',
          'Will definitely order again.',
          'Quality has improved significantly.'
        ];
        change = {
          id: `change_${competitor.id}_${i}`,
          type: 'new_review',
          title: 'New Review Posted',
          description: `New review: "${reviewTexts[Math.floor(Math.random() * reviewTexts.length)]}"`,
          timestamp,
          impact: Math.random() > 0.3 ? 'positive' : 'negative',
          details: {
            newValue: `${Math.floor(Math.random() * 2) + 4}/5 stars`,
            platform: competitor.platform
          }
        };
        break;
        
      case 'new_service':
        const serviceOptions = [
          'Online Ordering',
          'Delivery Service',
          'Catering',
          'Subscription Plans',
          'Mobile App',
          'Loyalty Program',
          'Eco-Friendly Options'
        ];
        const newService = serviceOptions[Math.floor(Math.random() * serviceOptions.length)];
        change = {
          id: `change_${competitor.id}_${i}`,
          type: 'new_service',
          title: 'New Service Added',
          description: `Added new service: ${newService}`,
          timestamp,
          impact: 'positive',
          details: {
            newValue: newService,
            platform: competitor.platform
          }
        };
        break;
        
      case 'ad_campaign':
        const adPlatforms = ['Google Ads', 'Facebook Ads', 'Instagram', 'Yelp Ads'];
        const platform = adPlatforms[Math.floor(Math.random() * adPlatforms.length)];
        change = {
          id: `change_${competitor.id}_${i}`,
          type: 'ad_campaign',
          title: 'New Ad Campaign Detected',
          description: `Started advertising on ${platform}`,
          timestamp,
          impact: 'negative',
          details: {
            newValue: platform,
            platform: competitor.platform
          }
        };
        break;
        
      case 'rating_change':
        const oldRating = (competitor.currentData.rating || 4.5) - (Math.random() * 0.5);
        const newRating = competitor.currentData.rating || 4.5;
        change = {
          id: `change_${competitor.id}_${i}`,
          type: 'rating_change',
          title: 'Rating Change',
          description: `Rating changed from ${oldRating.toFixed(1)} to ${newRating.toFixed(1)}`,
          timestamp,
          impact: newRating > oldRating ? 'negative' : 'positive',
          details: {
            oldValue: `${oldRating.toFixed(1)}/5`,
            newValue: `${newRating.toFixed(1)}/5`,
            platform: competitor.platform
          }
        };
        break;
    }
    
    changes.push(change);
  }
  
  // Sort by timestamp (newest first)
  return changes.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Initialize mock data with changes
mockCompetitors.forEach(competitor => {
  competitor.changes = generateMockChanges(competitor);
});

export class CompetitorTrackerMockData {
  static getCompetitors(): CompetitorData[] {
    return mockCompetitors;
  }
  
  static addCompetitor(url: string, platform: 'google' | 'yelp' | 'facebook' | 'website'): CompetitorData {
    const name = this.extractNameFromUrl(url, platform);
    const newCompetitor: CompetitorData = {
      id: `comp_${Date.now()}`,
      name,
      url,
      platform,
      currentData: {
        price: this.generateMockPrice(),
        rating: Math.random() * 1.5 + 3.5, // 3.5-5.0 rating
        reviewCount: Math.floor(Math.random() * 500) + 50,
        services: this.generateMockServices(),
        lastChecked: new Date()
      },
      changes: []
    };
    
    // Generate initial changes
    newCompetitor.changes = generateMockChanges(newCompetitor);
    mockCompetitors.push(newCompetitor);
    
    return newCompetitor;
  }
  
  static removeCompetitor(id: string): boolean {
    const index = mockCompetitors.findIndex(c => c.id === id);
    if (index > -1) {
      mockCompetitors.splice(index, 1);
      return true;
    }
    return false;
  }
  
  static refreshCompetitor(id: string): CompetitorChange[] {
    const competitor = mockCompetitors.find(c => c.id === id);
    if (!competitor) return [];
    
    // Generate new changes
    const newChanges = generateMockChanges(competitor);
    competitor.changes = [...newChanges, ...competitor.changes];
    competitor.currentData.lastChecked = new Date();
    
    return newChanges;
  }
  
  private static extractNameFromUrl(url: string, platform: string): string {
    // Simple name extraction - in real implementation, this would parse the actual page
    const urlParts = url.split('/').pop() || '';
    return urlParts.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  private static generateMockPrice(): string {
    const prices = ['$10-15', '$15-25', '$25-35', '$50-75', '$100-150', '$150-200'];
    return prices[Math.floor(Math.random() * prices.length)];
  }
  
  private static generateMockServices(): string[] {
    const allServices = [
      'Online Ordering', 'Delivery', 'Takeout', 'Catering', 'Mobile App',
      'Subscription Plans', 'Loyalty Program', 'Consulting', 'Support',
      'Installation', 'Maintenance', 'Eco-Friendly Options'
    ];
    
    const numServices = Math.floor(Math.random() * 4) + 2;
    const shuffled = allServices.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numServices);
  }
  
  static exportToCSV(): string {
    const headers = ['Competitor', 'Platform', 'Change Type', 'Title', 'Description', 'Date', 'Impact'];
    const rows = mockCompetitors.flatMap(competitor =>
      competitor.changes.map(change => [
        competitor.name,
        competitor.platform,
        change.type.replace('_', ' '),
        change.title,
        change.description,
        change.timestamp.toISOString().split('T')[0],
        change.impact
      ])
    );
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

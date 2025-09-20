// Competitor Tracker API Integration Service
// Integrates Google Places, Yelp Fusion, and Facebook Ad Library APIs

interface CompetitorData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceLevel?: number;
  photos?: string[];
  openingHours?: string[];
  businessStatus?: string;
  types: string[];
  placeId: string;
  lastUpdated: string;
}

interface YelpBusiness {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  price?: string;
  phone?: string;
  display_phone?: string;
  url?: string;
  image_url?: string;
  location: {
    address1?: string;
    city: string;
    state: string;
    zip_code: string;
  };
  categories: Array<{
    alias: string;
    title: string;
  }>;
  hours?: Array<{
    open: Array<{
      day: number;
      start: string;
      end: string;
    }>;
  }>;
}

interface FacebookAdData {
  page_id: string;
  page_name: string;
  ad_creation_time: string;
  ad_delivery_start_time: string;
  ad_delivery_stop_time?: string;
  ad_snapshot_url: string;
  currency: string;
  estimated_audience_size: {
    lower_bound: number;
    upper_bound: number;
  };
  impressions: {
    lower_bound: number;
    upper_bound: number;
  };
  spend: {
    lower_bound: number;
    upper_bound: number;
  };
}

class CompetitorTrackerAPI {
  private googleApiKey: string;
  private yelpApiKey: string;
  private facebookApiKey: string;

  constructor() {
    this.googleApiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
    this.yelpApiKey = import.meta.env.VITE_YELP_API_KEY || '';
    this.facebookApiKey = import.meta.env.VITE_FACEBOOK_API_KEY || '';
  }

  // Google Places API Integration
  async searchCompetitors(query: string, location: string, radius: number = 5000): Promise<CompetitorData[]> {
    if (!this.googleApiKey) {
      console.warn('Google Places API key not configured');
      return this.getMockCompetitorData();
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&radius=${radius}&key=${this.googleApiKey}`
      );

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Places API error: ${data.status}`);
      }

      return data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        phone: place.formatted_phone_number,
        website: place.website,
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        priceLevel: place.price_level,
        photos: place.photos?.map((photo: any) => 
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.googleApiKey}`
        ) || [],
        openingHours: place.opening_hours?.weekday_text || [],
        businessStatus: place.business_status,
        types: place.types || [],
        placeId: place.place_id,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error fetching competitor data from Google Places:', error);
      return this.getMockCompetitorData();
    }
  }

  // Yelp Fusion API Integration
  async getYelpBusinessData(businessId: string): Promise<YelpBusiness | null> {
    if (!this.yelpApiKey) {
      console.warn('Yelp API key not configured');
      return this.getMockYelpData();
    }

    try {
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/${businessId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.yelpApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Yelp data:', error);
      return this.getMockYelpData();
    }
  }

  async searchYelpBusinesses(term: string, location: string, limit: number = 10): Promise<YelpBusiness[]> {
    if (!this.yelpApiKey) {
      console.warn('Yelp API key not configured');
      return this.getMockYelpBusinesses();
    }

    try {
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.yelpApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status}`);
      }

      const data = await response.json();
      return data.businesses || [];
    } catch (error) {
      console.error('Error searching Yelp businesses:', error);
      return this.getMockYelpBusinesses();
    }
  }

  // Facebook Ad Library API Integration
  async getFacebookAdData(pageId: string): Promise<FacebookAdData[]> {
    if (!this.facebookApiKey) {
      console.warn('Facebook API key not configured');
      return this.getMockFacebookAdData();
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/ads_archive?search_terms=${encodeURIComponent(pageId)}&ad_reached_countries=US&ad_active_status=ALL&access_token=${this.facebookApiKey}`
      );

      if (!response.ok) {
        throw new Error(`Facebook API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Facebook ad data:', error);
      return this.getMockFacebookAdData();
    }
  }

  // Combined competitor analysis
  async getCompetitorAnalysis(competitorName: string, location: string) {
    try {
      // Get Google Places data
      const googleData = await this.searchCompetitors(competitorName, location);
      
      // Get Yelp data
      const yelpData = await this.searchYelpBusinesses(competitorName, location);
      
      // Get Facebook ad data (if we have the page ID)
      const facebookData = await this.getFacebookAdData(competitorName);

      return {
        google: googleData,
        yelp: yelpData,
        facebook: facebookData,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in competitor analysis:', error);
      return this.getMockAnalysis();
    }
  }

  // Mock data for development/demo purposes
  private getMockCompetitorData(): CompetitorData[] {
    return [
      {
        id: 'mock-1',
        name: 'Brooklyn Pizza Co',
        address: '123 Main St, Brooklyn, NY 11201',
        phone: '(555) 123-4567',
        website: 'https://brooklynpizza.com',
        rating: 4.5,
        reviewCount: 234,
        priceLevel: 2,
        photos: [],
        openingHours: ['Mon-Fri: 11:00 AM - 10:00 PM', 'Sat-Sun: 12:00 PM - 11:00 PM'],
        businessStatus: 'OPERATIONAL',
        types: ['restaurant', 'food', 'establishment'],
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'mock-2',
        name: 'Green Clean Services',
        address: '456 Oak Ave, Austin, TX 78701',
        phone: '(555) 987-6543',
        website: 'https://greenclean.com',
        rating: 4.8,
        reviewCount: 156,
        priceLevel: 3,
        photos: [],
        openingHours: ['Mon-Sun: 8:00 AM - 6:00 PM'],
        businessStatus: 'OPERATIONAL',
        types: ['cleaning_service', 'home_services', 'establishment'],
        placeId: 'ChIJd8BlQ2BZwokRAFQEcDlJRAI',
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  private getMockYelpData(): YelpBusiness {
    return {
      id: 'mock-yelp-1',
      name: 'Brooklyn Pizza Co',
      rating: 4.5,
      review_count: 234,
      price: '$$',
      phone: '+15551234567',
      display_phone: '(555) 123-4567',
      url: 'https://www.yelp.com/biz/brooklyn-pizza-co-brooklyn',
      image_url: 'https://example.com/pizza.jpg',
      location: {
        address1: '123 Main St',
        city: 'Brooklyn',
        state: 'NY',
        zip_code: '11201'
      },
      categories: [
        { alias: 'pizza', title: 'Pizza' },
        { alias: 'italian', title: 'Italian' }
      ],
      hours: [{
        open: [
          { day: 1, start: '1100', end: '2200' },
          { day: 2, start: '1100', end: '2200' }
        ]
      }]
    };
  }

  private getMockYelpBusinesses(): YelpBusiness[] {
    return [this.getMockYelpData()];
  }

  private getMockFacebookAdData(): FacebookAdData[] {
    return [
      {
        page_id: '123456789',
        page_name: 'Brooklyn Pizza Co',
        ad_creation_time: '2024-01-01T00:00:00Z',
        ad_delivery_start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
        estimated_audience_size: { lower_bound: 10000, upper_bound: 50000 },
        impressions: { lower_bound: 50000, upper_bound: 100000 },
        spend: { lower_bound: 500, upper_bound: 1000 },
        ad_snapshot_url: 'https://example.com/ad-snapshot.jpg'
      }
    ];
  }

  private getMockAnalysis() {
    return {
      google: this.getMockCompetitorData(),
      yelp: this.getMockYelpBusinesses(),
      facebook: this.getMockFacebookAdData(),
      lastUpdated: new Date().toISOString()
    };
  }
}

export const competitorTrackerAPI = new CompetitorTrackerAPI();
export type { CompetitorData, YelpBusiness, FacebookAdData };

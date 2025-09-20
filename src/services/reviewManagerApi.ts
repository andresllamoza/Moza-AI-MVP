// AI Review Manager API Integration Service
// Integrates Google My Business API + OpenAI GPT for AI-generated responses

interface GoogleReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
    isAnonymous: boolean;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

interface AIResponse {
  response: string;
  confidence: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  tone: 'professional' | 'friendly' | 'apologetic' | 'grateful';
  suggestedActions?: string[];
}

interface ReviewTemplate {
  id: string;
  name: string;
  trigger: string;
  template: string;
  tone: string;
  usage: number;
  effectiveness: number;
  lastUsed?: string;
}

interface CampaignData {
  id: string;
  name: string;
  type: 'review_request' | 'follow_up' | 'happy_customer';
  status: 'active' | 'paused' | 'completed';
  sent: number;
  responses: number;
  responseRate: number;
  lastSent?: string;
  nextScheduled?: string;
}

class ReviewManagerAPI {
  private googleApiKey: string;
  private openaiApiKey: string;
  private businessAccountId: string;

  constructor() {
    this.googleApiKey = import.meta.env.VITE_GOOGLE_MY_BUSINESS_API_KEY || '';
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.businessAccountId = import.meta.env.VITE_GOOGLE_BUSINESS_ACCOUNT_ID || '';
  }

  // Google My Business API Integration
  async getReviews(accountId?: string): Promise<GoogleReview[]> {
    const account = accountId || this.businessAccountId;
    
    if (!this.googleApiKey || !account) {
      console.warn('Google My Business API key or account ID not configured');
      return this.getMockReviews();
    }

    try {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/REVIEWS_UNSPECIFIED/reviews`,
        {
          headers: {
            'Authorization': `Bearer ${this.googleApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Google My Business API error: ${response.status}`);
      }

      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Error fetching Google My Business reviews:', error);
      return this.getMockReviews();
    }
  }

  async replyToReview(reviewId: string, replyText: string): Promise<boolean> {
    if (!this.googleApiKey || !this.businessAccountId) {
      console.warn('Google My Business API key or account ID not configured');
      return this.simulateReply();
    }

    try {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${this.businessAccountId}/locations/REVIEWS_UNSPECIFIED/reviews/${reviewId}/reply`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.googleApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            comment: replyText
          })
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error replying to review:', error);
      return false;
    }
  }

  // OpenAI GPT Integration for AI Responses
  async generateAIResponse(reviewText: string, rating: number, businessContext?: string): Promise<AIResponse> {
    if (!this.openaiApiKey) {
      console.warn('OpenAI API key not configured');
      return this.getMockAIResponse(reviewText, rating);
    }

    try {
      const prompt = this.buildPrompt(reviewText, rating, businessContext);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant that generates professional, tone-matched responses to business reviews. Your responses should be helpful, authentic, and maintain the business\'s brand voice.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Thank you for your feedback!';
      
      return {
        response: aiResponse,
        confidence: 0.85,
        sentiment: this.analyzeSentiment(reviewText),
        tone: this.determineTone(rating, reviewText),
        suggestedActions: this.getSuggestedActions(rating, reviewText)
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.getMockAIResponse(reviewText, rating);
    }
  }

  // Review Templates Management
  async getTemplates(): Promise<ReviewTemplate[]> {
    // In a real implementation, this would fetch from your database
    return this.getMockTemplates();
  }

  async createTemplate(template: Omit<ReviewTemplate, 'id' | 'usage' | 'effectiveness'>): Promise<ReviewTemplate> {
    // In a real implementation, this would save to your database
    const newTemplate: ReviewTemplate = {
      ...template,
      id: `template_${Date.now()}`,
      usage: 0,
      effectiveness: 0
    };
    
    return newTemplate;
  }

  async updateTemplate(templateId: string, updates: Partial<ReviewTemplate>): Promise<ReviewTemplate> {
    // In a real implementation, this would update your database
    const templates = await this.getTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      throw new Error('Template not found');
    }

    return { ...template, ...updates };
  }

  // Campaign Management
  async getCampaigns(): Promise<CampaignData[]> {
    // In a real implementation, this would fetch from your database
    return this.getMockCampaigns();
  }

  async sendReviewRequestCampaign(customerData: Array<{email: string, name: string, phone?: string}>): Promise<boolean> {
    // In a real implementation, this would integrate with email/SMS services
    console.log('Sending review request campaign to:', customerData.length, 'customers');
    return true;
  }

  // Helper Methods
  private buildPrompt(reviewText: string, rating: number, businessContext?: string): string {
    const context = businessContext ? `Business context: ${businessContext}\n` : '';
    
    return `${context}Customer review (${rating}/5 stars): "${reviewText}"

Please generate a professional, authentic response that:
1. Acknowledges the customer's feedback
2. Matches the tone of the review (positive, neutral, or addresses concerns)
3. Is brief and genuine (under 100 words)
4. Encourages future business if appropriate
5. Offers to resolve issues privately if negative

Response:`;
  }

  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['great', 'amazing', 'excellent', 'wonderful', 'fantastic', 'love', 'perfect'];
    const negativeWords = ['terrible', 'awful', 'horrible', 'disappointed', 'hate', 'worst', 'bad'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private determineTone(rating: number, text: string): 'professional' | 'friendly' | 'apologetic' | 'grateful' {
    if (rating >= 4) return 'grateful';
    if (rating <= 2) return 'apologetic';
    if (text.toLowerCase().includes('thanks') || text.toLowerCase().includes('thank')) return 'grateful';
    return 'professional';
  }

  private getSuggestedActions(rating: number, text: string): string[] {
    const actions = [];
    
    if (rating >= 4) {
      actions.push('Thank the customer and encourage return visits');
      actions.push('Share positive feedback with the team');
    } else if (rating <= 2) {
      actions.push('Address concerns directly');
      actions.push('Offer to resolve issues privately');
      actions.push('Follow up with customer service team');
    } else {
      actions.push('Acknowledge feedback and show appreciation');
      actions.push('Highlight improvements being made');
    }
    
    return actions;
  }

  private simulateReply(): boolean {
    // Simulate a successful reply for demo purposes
    return true;
  }

  // Mock data for development/demo purposes
  private getMockReviews(): GoogleReview[] {
    return [
      {
        reviewId: 'review_1',
        reviewer: {
          displayName: 'Sarah Johnson',
          profilePhotoUrl: 'https://example.com/sarah.jpg',
          isAnonymous: false
        },
        starRating: 'FIVE',
        comment: 'Amazing service! The team was professional and delivered exactly what they promised. Highly recommend!',
        createTime: '2024-01-15T10:30:00Z',
        updateTime: '2024-01-15T10:30:00Z'
      },
      {
        reviewId: 'review_2',
        reviewer: {
          displayName: 'Mike Chen',
          isAnonymous: false
        },
        starRating: 'FOUR',
        comment: 'Good service overall, but the wait time was longer than expected. The quality made up for it though.',
        createTime: '2024-01-14T15:45:00Z',
        updateTime: '2024-01-14T15:45:00Z'
      },
      {
        reviewId: 'review_3',
        reviewer: {
          displayName: 'Anonymous',
          isAnonymous: true
        },
        starRating: 'TWO',
        comment: 'Disappointed with the service. The technician was late and didn\'t seem to know what he was doing.',
        createTime: '2024-01-13T09:20:00Z',
        updateTime: '2024-01-13T09:20:00Z'
      }
    ];
  }

  private getMockAIResponse(reviewText: string, rating: number): AIResponse {
    const responses = {
      positive: [
        'Thank you so much for the wonderful review! We\'re thrilled you had such a positive experience and look forward to serving you again.',
        'We really appreciate you taking the time to share your feedback. It means the world to us!',
        'Thank you for the amazing review! We\'re so glad we could exceed your expectations.'
      ],
      neutral: [
        'Thank you for your feedback! We appreciate you taking the time to share your experience with us.',
        'We value your input and are always working to improve our service. Thank you for choosing us!',
        'Thank you for the review! We appreciate your business and look forward to serving you again.'
      ],
      negative: [
        'We sincerely apologize for not meeting your expectations. Please contact us directly so we can make this right.',
        'Thank you for bringing this to our attention. We take all feedback seriously and would like to resolve this issue.',
        'We apologize for the disappointing experience. Please reach out to us so we can address your concerns.'
      ]
    };

    const sentiment = this.analyzeSentiment(reviewText);
    const responseArray = responses[sentiment];
    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];

    return {
      response: randomResponse,
      confidence: 0.85,
      sentiment,
      tone: this.determineTone(rating, reviewText),
      suggestedActions: this.getSuggestedActions(rating, reviewText)
    };
  }

  private getMockTemplates(): ReviewTemplate[] {
    return [
      {
        id: 'template_1',
        name: 'Positive Review - Generic',
        trigger: '5-star rating',
        template: 'Thank you for the amazing review! We\'re thrilled you had such a positive experience. We look forward to serving you again!',
        tone: 'grateful',
        usage: 45,
        effectiveness: 95
      },
      {
        id: 'template_2',
        name: 'Negative Review - Apology',
        trigger: '1-2 star rating',
        template: 'We sincerely apologize for not meeting your expectations. Please contact us directly so we can make this right. Your feedback helps us improve.',
        tone: 'apologetic',
        usage: 12,
        effectiveness: 78
      },
      {
        id: 'template_3',
        name: 'Neutral Review - Thank You',
        trigger: '3-4 star rating',
        template: 'Thank you for your feedback! We appreciate you taking the time to share your experience. We\'re always working to improve our service.',
        tone: 'professional',
        usage: 23,
        effectiveness: 82
      }
    ];
  }

  private getMockCampaigns(): CampaignData[] {
    return [
      {
        id: 'campaign_1',
        name: 'Review Request Campaign',
        type: 'review_request',
        status: 'active',
        sent: 156,
        responses: 23,
        responseRate: 14.7,
        lastSent: '2024-01-15T10:00:00Z',
        nextScheduled: '2024-01-22T10:00:00Z'
      },
      {
        id: 'campaign_2',
        name: 'Follow-up Campaign',
        type: 'follow_up',
        status: 'active',
        sent: 89,
        responses: 12,
        responseRate: 13.5,
        lastSent: '2024-01-14T14:00:00Z',
        nextScheduled: '2024-01-21T14:00:00Z'
      },
      {
        id: 'campaign_3',
        name: 'Happy Customer Campaign',
        type: 'happy_customer',
        status: 'paused',
        sent: 45,
        responses: 8,
        responseRate: 17.8,
        lastSent: '2024-01-10T16:00:00Z'
      }
    ];
  }
}

export const reviewManagerAPI = new ReviewManagerAPI();
export type { GoogleReview, AIResponse, ReviewTemplate, CampaignData };

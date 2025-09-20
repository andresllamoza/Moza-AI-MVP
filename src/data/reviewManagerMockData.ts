// Mock data service for Review Manager MVP
// Generates realistic review data and AI response suggestions

export interface Review {
  id: string;
  platform: 'google' | 'yelp' | 'facebook';
  reviewer: {
    name: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  date: Date;
  businessResponse?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface AIResponse {
  id: string;
  reviewId: string;
  suggestedResponse: string;
  tone: 'professional' | 'friendly' | 'apologetic' | 'grateful';
  confidence: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  createdAt: Date;
  approved?: boolean;
  editedResponse?: string;
}

const mockReviews: Review[] = [
  {
    id: 'rev_1',
    platform: 'google',
    reviewer: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    rating: 5,
    text: 'Amazing service! The team was professional and delivered exactly what they promised. The pizza was delicious and arrived hot. Will definitely order again!',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    sentiment: 'positive'
  },
  {
    id: 'rev_2',
    platform: 'yelp',
    reviewer: {
      name: 'Mike Chen'
    },
    rating: 4,
    text: 'Good overall experience. The food was tasty and the staff was friendly. The only downside was the wait time - took about 45 minutes for delivery. But the quality made up for it.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    sentiment: 'neutral'
  },
  {
    id: 'rev_3',
    platform: 'google',
    reviewer: {
      name: 'Anonymous'
    },
    rating: 2,
    text: 'Very disappointed with the service. The pizza was cold when it arrived and the toppings were sparse. Called to complain but no one answered. Not ordering again.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    sentiment: 'negative'
  },
  {
    id: 'rev_4',
    platform: 'facebook',
    reviewer: {
      name: 'Lisa Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    rating: 5,
    text: 'Outstanding! The best pizza in the neighborhood. Fresh ingredients, perfect crust, and the delivery was super fast. Highly recommend to everyone!',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    sentiment: 'positive'
  },
  {
    id: 'rev_5',
    platform: 'yelp',
    reviewer: {
      name: 'David Kim'
    },
    rating: 3,
    text: 'Average pizza place. Nothing special but nothing terrible either. The price is reasonable for the quality. Might try again if in the area.',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    sentiment: 'neutral'
  },
  {
    id: 'rev_6',
    platform: 'google',
    reviewer: {
      name: 'Jennifer Smith'
    },
    rating: 1,
    text: 'Worst experience ever. Ordered online and they charged me twice. The pizza was burnt and inedible. Customer service was rude and unhelpful. Avoid this place!',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    sentiment: 'negative'
  }
];

const mockAIResponses: AIResponse[] = [];

// Generate AI responses for reviews
function generateAIResponse(review: Review): AIResponse {
  let suggestedResponse = '';
  let tone: AIResponse['tone'] = 'professional';
  
  if (review.rating >= 4) {
    tone = 'grateful';
    const responses = [
      'Thank you so much for the wonderful review, ' + review.reviewer.name + '! We\'re thrilled you enjoyed our pizza and service. We look forward to serving you again soon!',
      'We really appreciate you taking the time to share your experience, ' + review.reviewer.name + '! It means the world to us to hear that we exceeded your expectations.',
      'Thank you for the amazing review, ' + review.reviewer.name + '! We\'re so glad you loved our pizza and that the delivery was fast. We can\'t wait to serve you again!'
    ];
    suggestedResponse = responses[Math.floor(Math.random() * responses.length)];
  } else if (review.rating <= 2) {
    tone = 'apologetic';
    const responses = [
      'We sincerely apologize for not meeting your expectations, ' + review.reviewer.name + '. Please contact us directly so we can make this right and ensure you have a better experience next time.',
      'Thank you for bringing this to our attention, ' + review.reviewer.name + '. We take all feedback seriously and would like to resolve this issue. Please reach out to us at your convenience.',
      'We apologize for the disappointing experience, ' + review.reviewer.name + '. This is not the standard we strive for. Please contact us so we can address your concerns and make things right.'
    ];
    suggestedResponse = responses[Math.floor(Math.random() * responses.length)];
  } else {
    tone = 'friendly';
    const responses = [
      'Thank you for your feedback, ' + review.reviewer.name + '! We appreciate you taking the time to share your experience. We\'re always working to improve our delivery times.',
      'Thanks for the review, ' + review.reviewer.name + '! We\'re glad you enjoyed the food quality. We\'re constantly working to improve our delivery speed.',
      'We appreciate your honest feedback, ' + review.reviewer.name + '! We\'re pleased you liked the food and we\'re working on reducing our delivery times.'
    ];
    suggestedResponse = responses[Math.floor(Math.random() * responses.length)];
  }
  
  return {
    id: `ai_resp_${review.id}`,
    reviewId: review.id,
    suggestedResponse,
    tone,
    confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
    sentiment: review.sentiment,
    createdAt: new Date()
  };
}

export class ReviewManagerMockData {
  static getReviews(): Review[] {
    return mockReviews;
  }
  
  static getAIResponses(): AIResponse[] {
    return mockAIResponses;
  }
  
  static generateAIResponse(reviewId: string): AIResponse | null {
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) return null;
    
    const aiResponse = generateAIResponse(review);
    mockAIResponses.push(aiResponse);
    return aiResponse;
  }
  
  static approveResponse(responseId: string, editedResponse?: string): boolean {
    const response = mockAIResponses.find(r => r.id === responseId);
    if (!response) return false;
    
    response.approved = true;
    if (editedResponse) {
      response.editedResponse = editedResponse;
    }
    
    // Update the review with the response
    const review = mockReviews.find(r => r.id === response.reviewId);
    if (review) {
      review.businessResponse = editedResponse || response.suggestedResponse;
    }
    
    return true;
  }
  
  static rejectResponse(responseId: string): boolean {
    const index = mockAIResponses.findIndex(r => r.id === responseId);
    if (index === -1) return false;
    
    mockAIResponses.splice(index, 1);
    return true;
  }
  
  static getResponseForReview(reviewId: string): AIResponse | null {
    return mockAIResponses.find(r => r.reviewId === reviewId) || null;
  }
  
  static getPendingReviews(): Review[] {
    return mockReviews.filter(review => !review.businessResponse);
  }
  
  static getRespondedReviews(): Review[] {
    return mockReviews.filter(review => review.businessResponse);
  }
  
  static getStats() {
    const total = mockReviews.length;
    const responded = mockReviews.filter(r => r.businessResponse).length;
    const avgRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / total;
    const positiveReviews = mockReviews.filter(r => r.sentiment === 'positive').length;
    const negativeReviews = mockReviews.filter(r => r.sentiment === 'negative').length;
    
    return {
      totalReviews: total,
      respondedReviews: responded,
      responseRate: (responded / total) * 100,
      averageRating: avgRating,
      positiveReviews,
      negativeReviews,
      pendingAIResponses: mockAIResponses.filter(r => !r.approved).length
    };
  }
}

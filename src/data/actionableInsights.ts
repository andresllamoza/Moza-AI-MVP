// Actionable Intelligence Data Generator
// Generates insights with specific actions, templates, and success tracking

import { IntelligenceInsight } from '@/types/competitiveIntelligence';

export const generateActionableInsights = (businessName: string, industry: string, location: string): IntelligenceInsight[] => {
  const baseInsights = [
    {
      id: 'competitor_weakness_1',
      title: 'Competitor Pricing Gap Identified',
      description: `${businessName} can capitalize on a 15% pricing advantage over local competitors in the ${industry} sector.`,
      type: 'opportunity' as const,
      category: 'competitive' as const,
      priority: 'high' as const,
      confidence: 87,
      impact: 'high' as const,
      revenuePotential: 8500,
      costSavings: 0,
      timeToImplement: 7,
      source: 'competitive_analysis' as const,
      evidence: ['Pricing analysis of 5 competitors', 'Market research data', 'Customer survey responses'],
      recommendations: ['Adjust pricing strategy', 'Update marketing materials', 'Train sales team'],
      relatedData: {
        competitors: ['Competitor A', 'Competitor B'],
        trends: ['pricing_trends']
      },
      createdAt: new Date(),
      status: 'new' as const,
      actionableIntelligence: {
        specificAction: 'Implement competitive pricing strategy to capture market share',
        actionSteps: [
          'Research competitor pricing for all service tiers',
          'Update your pricing page with competitive positioning',
          'Create "Best Value" messaging for marketing materials',
          'Train sales team on competitive advantages',
          'Launch targeted ads highlighting price advantage'
        ],
        templates: {
          email: `Subject: Why ${businessName} Offers Better Value Than Competitors

Hi [Customer Name],

I noticed you're considering [competitor] for your ${industry} needs. I wanted to share why ${businessName} offers better value:

✅ 15% more competitive pricing
✅ Same quality service with faster delivery
✅ Local expertise in ${location}
✅ 24/7 customer support

Would you like to see our detailed comparison? I can send over our competitive analysis.

Best regards,
[Your Name]
${businessName}`,
          social: `🏆 Did you know ${businessName} offers 15% better value than our competitors?

✅ Competitive pricing
✅ Superior service
✅ Local expertise in ${location}

Why pay more for the same quality? Get a free quote today! #${industry.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')} #BestValue`,
          website: `Why Choose ${businessName}?

We're proud to offer the best value in ${location} for ${industry} services:

• 15% more competitive pricing than our competitors
• Same high-quality service with faster delivery
• Local expertise you can trust
• 24/7 customer support

Get your free quote today and see the difference!`,
          ad: `🏆 Best Value in ${location}!

${businessName} offers 15% better pricing than competitors
✅ Same quality, better price
✅ Local expertise
✅ Free quotes

Call now: [Phone Number]`
        },
        successMetrics: {
          primary: 'Increase in quote requests by 25%',
          secondary: ['Conversion rate improvement', 'Average deal size', 'Customer acquisition cost'],
          timeframe: '2-4 weeks'
        },
        resources: {
          tools: ['Pricing analysis spreadsheet', 'Competitor research template', 'Marketing materials'],
          contacts: ['Sales team', 'Marketing manager', 'Pricing analyst'],
          budget: '$500-1,500 for marketing materials'
        }
      },
      customerSuccess: {
        feedbackRating: undefined,
        actionTaken: undefined,
        resultsLogged: undefined,
        followUpDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    },
    {
      id: 'customer_complaint_1',
      title: 'Service Quality Improvement Opportunity',
      description: 'Customer feedback analysis reveals 3 key areas where service quality can be enhanced to increase satisfaction and retention.',
      type: 'optimization' as const,
      category: 'internal' as const,
      priority: 'high' as const,
      confidence: 92,
      impact: 'high' as const,
      revenuePotential: 12000,
      costSavings: 3000,
      timeToImplement: 14,
      source: 'internal_data' as const,
      evidence: ['Customer review analysis', 'Satisfaction surveys', 'Complaint tracking data'],
      recommendations: ['Improve response times', 'Enhance communication', 'Update service protocols'],
      relatedData: {
        customers: ['Customer A', 'Customer B', 'Customer C'],
        interactions: ['complaint_1', 'complaint_2', 'complaint_3']
      },
      createdAt: new Date(),
      status: 'new' as const,
      actionableIntelligence: {
        specificAction: 'Implement customer service improvements to increase satisfaction and retention',
        actionSteps: [
          'Review and update response time standards',
          'Create customer communication templates',
          'Train staff on new service protocols',
          'Implement customer feedback tracking system',
          'Launch customer satisfaction follow-up program'
        ],
        templates: {
          email: `Subject: We've Improved Our Service - Here's What's New

Dear Valued Customer,

Thank you for your feedback! We've listened and made improvements:

✅ Faster response times (now under 2 hours)
✅ Better communication throughout your project
✅ Enhanced quality control processes
✅ Dedicated customer success manager

We're committed to providing the best ${industry} service in ${location}.

Questions? Reply to this email or call us directly.

Best regards,
The ${businessName} Team`,
          social: `🎉 We've upgraded our service based on your feedback!

✅ Faster response times
✅ Better communication
✅ Enhanced quality control
✅ Dedicated support

Thank you for helping us improve! #CustomerFirst #${industry.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')}`,
          website: `Our Commitment to You

We've recently upgraded our service based on customer feedback:

• Response times under 2 hours
• Clear communication throughout your project
• Enhanced quality control processes
• Dedicated customer success support

Your satisfaction is our priority. Experience the difference!`
        },
        successMetrics: {
          primary: 'Increase customer satisfaction score to 4.5+ stars',
          secondary: ['Reduced complaint volume', 'Increased repeat business', 'Improved online reviews'],
          timeframe: '4-6 weeks'
        },
        resources: {
          tools: ['Customer service training materials', 'Communication templates', 'Feedback tracking system'],
          contacts: ['Customer service manager', 'Training coordinator', 'Quality assurance team'],
          budget: '$1,000-2,500 for training and systems'
        }
      },
      customerSuccess: {
        feedbackRating: undefined,
        actionTaken: undefined,
        resultsLogged: undefined,
        followUpDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
      }
    },
    {
      id: 'market_trend_1',
      title: 'Emerging Market Trend Opportunity',
      description: 'New market trend in ${industry} sector presents opportunity for early adoption and competitive advantage.',
      type: 'trend' as const,
      category: 'market' as const,
      priority: 'medium' as const,
      confidence: 78,
      impact: 'medium' as const,
      revenuePotential: 6500,
      costSavings: 0,
      timeToImplement: 21,
      source: 'market_research' as const,
      evidence: ['Industry trend reports', 'Competitor analysis', 'Market research data'],
      recommendations: ['Research trend adoption', 'Develop implementation plan', 'Create marketing strategy'],
      relatedData: {
        trends: ['emerging_trend_1', 'market_analysis'],
        competitors: ['Competitor C', 'Competitor D']
      },
      createdAt: new Date(),
      status: 'new' as const,
      actionableIntelligence: {
        specificAction: 'Research and implement emerging market trend to gain competitive advantage',
        actionSteps: [
          'Conduct deep research on the emerging trend',
          'Analyze competitor adoption strategies',
          'Develop implementation timeline and budget',
          'Create pilot program for trend adoption',
          'Launch marketing campaign highlighting innovation'
        ],
        templates: {
          email: `Subject: ${businessName} is Leading Innovation in ${industry}

Hi [Customer Name],

We're excited to share that ${businessName} is adopting the latest ${industry} innovation to better serve our customers in ${location}.

This new approach will:
✅ Improve efficiency by 20%
✅ Reduce costs for our customers
✅ Provide better results
✅ Keep us ahead of the competition

We'll be rolling this out over the next few weeks. Want to be among the first to experience it?

Best regards,
[Your Name]
${businessName}`,
          social: `🚀 ${businessName} is leading innovation in ${industry}!

We're adopting the latest trend to better serve ${location}:
✅ 20% more efficient
✅ Cost savings for customers
✅ Better results
✅ Stay ahead of competition

Be among the first to experience it! #Innovation #${industry.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')}`,
          website: `Leading Innovation in ${industry}

${businessName} is proud to be among the first in ${location} to adopt the latest ${industry} innovation.

Benefits for our customers:
• 20% improved efficiency
• Reduced costs
• Better results
• Competitive advantage

Stay ahead with ${businessName}!`
        },
        successMetrics: {
          primary: 'Achieve 15% increase in market share',
          secondary: ['Customer acquisition rate', 'Brand recognition', 'Competitive positioning'],
          timeframe: '6-8 weeks'
        },
        resources: {
          tools: ['Trend research reports', 'Implementation planning template', 'Marketing campaign materials'],
          contacts: ['Market research analyst', 'Innovation manager', 'Marketing team'],
          budget: '$2,000-5,000 for research and implementation'
        }
      },
      customerSuccess: {
        feedbackRating: undefined,
        actionTaken: undefined,
        resultsLogged: undefined,
        followUpDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
      }
    }
  ];

  return baseInsights.map(insight => ({
    ...insight,
    description: insight.description.replace('${businessName}', businessName).replace('${industry}', industry).replace('${location}', location)
  }));
};

export const getActionableTemplates = (insightType: string, businessName: string, industry: string, location: string) => {
  const templates = {
    competitor_weakness: {
      email: `Subject: Why ${businessName} Offers Better Value

Hi [Customer Name],

I noticed you're considering our competitors for your ${industry} needs. Here's why ${businessName} is the better choice:

✅ More competitive pricing
✅ Superior service quality
✅ Local expertise in ${location}
✅ 24/7 support

Let's discuss your specific needs.

Best regards,
[Your Name]`,
      social: `🏆 ${businessName} delivers better value in ${location}!

✅ Competitive pricing
✅ Superior service
✅ Local expertise

Why choose anyone else? #${industry.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')}`,
      website: `Why Choose ${businessName}?

• Better value than competitors
• Superior service quality
• Local expertise in ${location}
• 24/7 support

Get your free quote today!`
    },
    service_improvement: {
      email: `Subject: We've Improved Our Service

Dear Valued Customer,

We've enhanced our ${industry} service based on your feedback:

✅ Faster response times
✅ Better communication
✅ Enhanced quality control
✅ Dedicated support

Experience the difference with ${businessName}!

Best regards,
The Team`,
      social: `🎉 ${businessName} has upgraded our service!

✅ Faster response times
✅ Better communication
✅ Enhanced quality

Your feedback drives our improvement! #CustomerFirst #${industry.replace(/\s+/g, '')}`,
      website: `Enhanced Service Quality

${businessName} has improved our ${industry} service:

• Faster response times
• Better communication
• Enhanced quality control
• Dedicated support

Experience the difference!`
    }
  };

  return templates[insightType as keyof typeof templates] || templates.competitor_weakness;
};

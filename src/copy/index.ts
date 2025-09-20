// MozaWave Copy System - Central Export
// Complete copy system with AI reasoning, SEO optimization, and conversion-focused messaging

// Core copy systems
export * from './mozawave-copy-system';

// SEO optimization
export * from './seo-optimization';

// CTA and trust signals
export * from './cta-trust-signals';

// Re-export all copy components for easy access
export {
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
} from './mozawave-copy-system';

export {
  MarketWatchSEO,
  ReputationSEO,
  BusinessIntelligenceSEO,
  MarketWatchSEOContent,
  ReputationSEOContent,
  BusinessIntelligenceSEOContent,
  SEOOptimizer
} from './seo-optimization';

export {
  CTAPhrasing,
  CTAVariations,
  TrustSignals,
  Microcopy,
  ConversionElements,
  ABTestVariants,
  PersonalizationVariations
} from './cta-trust-signals';

// Copy system utilities
export const CopySystemUtils = {
  // Get copy for specific service and view
  getCopy: (service: 'market-watch' | 'reputation' | 'business-intelligence', view: 'homepage' | 'service-page' | 'dashboard') => {
    const copySystems = {
      'market-watch': MarketWatchCopy,
      'reputation': ReputationCopy,
      'business-intelligence': BusinessIntelligenceCopy
    };
    
    const copy = copySystems[service];
    if (!copy) return null;
    
    switch (view) {
      case 'homepage':
        return copy.homepage;
      case 'service-page':
        return copy.servicePage;
      case 'dashboard':
        return copy.dashboard;
      default:
        return copy.homepage;
    }
  },

  // Get SEO metadata for specific service
  getSEO: (service: 'market-watch' | 'reputation' | 'business-intelligence') => {
    const seoSystems = {
      'market-watch': MarketWatchSEO,
      'reputation': ReputationSEO,
      'business-intelligence': BusinessIntelligenceSEO
    };
    
    return seoSystems[service] || null;
  },

  // Get AI reasoning flow for specific service and scenario
  getAIReasoning: (service: 'market-watch' | 'reputation' | 'business-intelligence', scenario: string) => {
    const reasoningSystems = {
      'market-watch': AIReasoningFlows.marketWatch,
      'reputation': AIReasoningFlows.reputation,
      'business-intelligence': AIReasoningFlows.businessIntelligence
    };
    
    const reasoning = reasoningSystems[service];
    if (!reasoning) return null;
    
    return reasoning[scenario] || null;
  },

  // Get alert template by type
  getAlertTemplate: (type: 'price_change' | 'new_service' | 'review_alert' | 'revenue_risk') => {
    return AlertTemplates.find(template => template.type === type) || null;
  },

  // Get review response template
  getReviewResponse: (sentiment: 'positive' | 'negative' | 'neutral', tone: 'professional' | 'friendly' | 'conversational') => {
    const templates = ReviewResponseTemplates;
    return templates[sentiment]?.[tone] || templates[sentiment]?.professional || '';
  },

  // Get CTA variation
  getCTA: (type: 'primary' | 'secondary' | 'tertiary' | 'urgency' | 'riskFree' | 'socialProof') => {
    return CTAVariations[type]?.[0] || CTAPhrasing.primary;
  },

  // Get trust signal
  getTrustSignal: (type: 'statistic' | 'guarantee' | 'security' | 'social_proof') => {
    return TrustSignals.find(signal => signal.type === type) || null;
  },

  // Get microcopy
  getMicrocopy: (category: 'loading' | 'success' | 'error' | 'empty' | 'tooltip' | 'help' | 'warning', key: string) => {
    return Microcopy[category]?.[key] || '';
  },

  // Personalize copy based on business context
  personalizeCopy: (copy: string, businessContext: {
    name: string;
    industry: string;
    location: string;
    size: 'small' | 'medium' | 'large';
  }) => {
    let personalizedCopy = copy;
    
    // Replace placeholders with business context
    personalizedCopy = personalizedCopy.replace(/\[Business Name\]/g, businessContext.name);
    personalizedCopy = personalizedCopy.replace(/\[Industry\]/g, businessContext.industry);
    personalizedCopy = personalizedCopy.replace(/\[Location\]/g, businessContext.location);
    
    // Adjust tone based on business size
    if (businessContext.size === 'small') {
      personalizedCopy = personalizedCopy.replace(/enterprise/gi, 'small business');
      personalizedCopy = personalizedCopy.replace(/corporation/gi, 'business');
    }
    
    return personalizedCopy;
  },

  // Generate SEO meta tags
  generateMetaTags: (service: 'market-watch' | 'reputation' | 'business-intelligence') => {
    const seo = CopySystemUtils.getSEO(service);
    if (!seo) return '';
    
    return SEOOptimizer.generateMetaTags(seo);
  },

  // Get conversion-optimized copy
  getConversionCopy: (service: 'market-watch' | 'reputation' | 'business-intelligence', element: 'headline' | 'cta' | 'trust') => {
    const copy = CopySystemUtils.getCopy(service, 'homepage');
    if (!copy) return '';
    
    switch (element) {
      case 'headline':
        return copy.headline;
      case 'cta':
        return copy.cta.primary;
      case 'trust':
        return copy.trustSignals[0];
      default:
        return '';
    }
  }
};

// Default export with all copy system functionality
export default {
  // Core copy systems
  MarketWatchCopy,
  ReputationCopy,
  BusinessIntelligenceCopy,
  
  // AI reasoning
  AIReasoningFlows,
  
  // Templates
  AlertTemplates,
  DigestTemplates,
  ReviewResponseTemplates,
  CampaignMessaging,
  
  // UI copy
  DashboardMicrocopy,
  TooltipExplanations,
  
  // SEO
  MarketWatchSEO,
  ReputationSEO,
  BusinessIntelligenceSEO,
  SEOOptimizer,
  
  // Conversion
  CTAPhrasing,
  CTAVariations,
  TrustSignals,
  Microcopy,
  ConversionElements,
  ABTestVariants,
  PersonalizationVariations,
  
  // Utilities
  CopySystemUtils
};

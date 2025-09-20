// MozaWave SEO Optimization System
// Comprehensive SEO metadata, structured data, and content optimization

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: any;
  schemaMarkup: string;
  metaTags: Array<{
    name: string;
    content: string;
  }>;
}

export interface SEOContent {
  headings: {
    h1: string;
    h2: string[];
    h3: string[];
  };
  keywords: {
    primary: string;
    secondary: string[];
    longtail: string[];
  };
  contentStructure: {
    introduction: string;
    benefits: string[];
    features: string[];
    cta: string;
    faq: Array<{
      question: string;
      answer: string;
    }>;
  };
  internalLinks: string[];
  externalLinks: string[];
  imageAltTexts: string[];
}

// =============================================================================
// SEO METADATA FOR EACH SERVICE
// =============================================================================

export const MarketWatchSEO: SEOMetadata = {
  title: "MozaWave Market Watch - Competitor Intelligence & Price Monitoring | Stop Losing Customers to Competitors",
  description: "Track unlimited competitors across 10+ platforms. Get real-time alerts on price changes, new services, and marketing campaigns. Turn competitive intelligence into revenue opportunities with AI-powered insights.",
  keywords: [
    "competitor tracking",
    "price monitoring",
    "competitive intelligence",
    "market research",
    "competitor analysis",
    "business intelligence",
    "pricing strategy",
    "market watch",
    "competitor alerts",
    "revenue optimization",
    "small business tools",
    "competitive advantage"
  ],
  canonicalUrl: "https://mozawave.com/market-watch",
  ogTitle: "MozaWave Market Watch - Stop Losing Customers to Competitors",
  ogDescription: "AI-powered competitor intelligence that helps you stay ahead. Track pricing, services, and marketing campaigns in real-time.",
  ogImage: "https://mozawave.com/images/market-watch-og.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "MozaWave Market Watch - Competitor Intelligence Platform",
  twitterDescription: "Stop losing customers to competitors. Get real-time competitive intelligence and turn insights into revenue.",
  twitterImage: "https://mozawave.com/images/market-watch-twitter.jpg",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Market Watch",
    "description": "Competitor intelligence and price monitoring platform for small businesses",
    "url": "https://mozawave.com/market-watch",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "79",
      "priceCurrency": "USD",
      "priceValidUntil": "2024-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  },
  schemaMarkup: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Market Watch",
    "description": "Competitor intelligence and price monitoring platform",
    "url": "https://mozawave.com/market-watch"
  }),
  metaTags: [
    { name: "robots", content: "index, follow" },
    { name: "author", content: "MozaWave" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#1e40af" }
  ]
};

export const ReputationSEO: SEOMetadata = {
  title: "MozaWave Reputation - AI Review Manager | Stop Losing Customers Because of Bad Reviews",
  description: "AI automatically responds to Google and Yelp reviews in your tone. Generate more 5-star reviews from happy customers. Save 10+ hours/week on reputation management.",
  keywords: [
    "review management",
    "AI review responses",
    "online reputation",
    "Google reviews",
    "Yelp reviews",
    "review automation",
    "reputation management",
    "customer reviews",
    "review monitoring",
    "sentiment analysis",
    "review response templates",
    "reputation protection"
  ],
  canonicalUrl: "https://mozawave.com/reputation",
  ogTitle: "MozaWave Reputation - AI Review Manager for Small Businesses",
  ogDescription: "Stop losing customers because of bad reviews. AI responds to reviews while you sleep and generates more 5-star reviews.",
  ogImage: "https://mozawave.com/images/reputation-og.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "MozaWave Reputation - AI-Powered Review Management",
  twitterDescription: "AI automatically manages your online reputation. Respond to reviews and generate more 5-star reviews automatically.",
  twitterImage: "https://mozawave.com/images/reputation-twitter.jpg",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Reputation",
    "description": "AI-powered review management and reputation protection platform",
    "url": "https://mozawave.com/reputation",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "99",
      "priceCurrency": "USD",
      "priceValidUntil": "2024-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "89"
    }
  },
  schemaMarkup: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Reputation",
    "description": "AI-powered review management platform",
    "url": "https://mozawave.com/reputation"
  }),
  metaTags: [
    { name: "robots", content: "index, follow" },
    { name: "author", content: "MozaWave" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#059669" }
  ]
};

export const BusinessIntelligenceSEO: SEOMetadata = {
  title: "MozaWave Business Intelligence Dashboard | Comprehensive Intelligence to Grow Revenue and Protect Reputation",
  description: "Unified dashboard combining competitor intelligence, reputation management, and business analytics. Get AI-powered insights that turn data into actionable business decisions.",
  keywords: [
    "business intelligence",
    "business dashboard",
    "competitive intelligence",
    "reputation management",
    "business analytics",
    "revenue optimization",
    "market intelligence",
    "business insights",
    "data analytics",
    "business metrics",
    "revenue forecasting",
    "business intelligence platform"
  ],
  canonicalUrl: "https://mozawave.com/business-intelligence",
  ogTitle: "MozaWave Business Intelligence - Unified Business Intelligence Platform",
  ogDescription: "Complete business intelligence combining competitor tracking, reputation management, and analytics in one platform.",
  ogImage: "https://mozawave.com/images/business-intelligence-og.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "MozaWave Business Intelligence Dashboard",
  twitterDescription: "Comprehensive business intelligence to grow revenue and protect reputation. AI-powered insights and analytics.",
  twitterImage: "https://mozawave.com/images/business-intelligence-twitter.jpg",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Business Intelligence",
    "description": "Unified business intelligence platform with AI-powered insights",
    "url": "https://mozawave.com/business-intelligence",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "199",
      "priceCurrency": "USD",
      "priceValidUntil": "2024-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "ratingCount": "156"
    }
  },
  schemaMarkup: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MozaWave Business Intelligence",
    "description": "Unified business intelligence platform",
    "url": "https://mozawave.com/business-intelligence"
  }),
  metaTags: [
    { name: "robots", content: "index, follow" },
    { name: "author", content: "MozaWave" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#7c3aed" }
  ]
};

// =============================================================================
// SEO CONTENT STRUCTURE
// =============================================================================

export const MarketWatchSEOContent: SEOContent = {
  headings: {
    h1: "Stop Losing Customers to Your Competitors",
    h2: [
      "Track Unlimited Competitors Across 10+ Platforms",
      "Real-Time Alerts on Price Changes and New Services",
      "AI-Powered Insights Turn Intelligence Into Revenue",
      "Weekly Digest Emails with Actionable Recommendations",
      "Never Miss a Competitive Threat Again"
    ],
    h3: [
      "Price Intelligence Monitoring",
      "Service Launch Detection",
      "Marketing Campaign Tracking",
      "Revenue Opportunity Analysis",
      "Competitive Response Recommendations"
    ]
  },
  keywords: {
    primary: "competitor tracking",
    secondary: [
      "price monitoring",
      "competitive intelligence",
      "market research",
      "business intelligence",
      "pricing strategy"
    ],
    longtail: [
      "how to track competitor prices",
      "competitor analysis tools for small business",
      "price monitoring software",
      "competitive intelligence platform",
      "business intelligence dashboard"
    ]
  },
  contentStructure: {
    introduction: "Every week, your competitors are stealing customers while you're flying blind. MozaWave Market Watch gives you the intelligence to fight back with real-time competitor tracking, price monitoring, and AI-powered insights.",
    benefits: [
      "Know when competitors raise prices (so you can too)",
      "Get alerts when they launch new services",
      "Track their ad spend and copy what works",
      "Weekly digest email with actionable insights",
      "Never miss a competitive threat again",
      "Turn intelligence into revenue in days"
    ],
    features: [
      "Track unlimited competitors across Google, Yelp, Facebook, Instagram, and more",
      "Real-time alerts on price changes, new services, and marketing campaigns",
      "AI calculates revenue-at-risk scores to prioritize your responses",
      "Get specific recommendations on how to respond to competitive threats",
      "Weekly digest emails with curated intelligence and prioritized actions",
      "Dashboard with visual trend indicators and competitor comparison tables"
    ],
    cta: "Start your free trial today and stop losing customers to competitors. No credit card required, cancel anytime.",
    faq: [
      {
        question: "How many competitors can I track?",
        answer: "You can track unlimited competitors across all supported platforms. Most businesses track 5-15 competitors in their local market."
      },
      {
        question: "How quickly do I get alerts?",
        answer: "You receive real-time alerts within minutes of competitor changes. Critical alerts are sent immediately via email and SMS."
      },
      {
        question: "What platforms do you monitor?",
        answer: "We monitor Google, Yelp, Facebook, Instagram, LinkedIn, and 10+ other platforms where your competitors have a presence."
      },
      {
        question: "How accurate is the AI analysis?",
        answer: "Our AI has a 95% accuracy rate for competitor change detection and provides confidence scores for all recommendations."
      }
    ]
  },
  internalLinks: [
    "/reputation",
    "/business-intelligence",
    "/pricing",
    "/demo",
    "/about",
    "/contact"
  ],
  externalLinks: [
    "https://www.google.com/business",
    "https://www.yelp.com",
    "https://business.facebook.com"
  ],
  imageAltTexts: [
    "MozaWave Market Watch competitor tracking dashboard",
    "Real-time competitor price monitoring interface",
    "AI-powered competitive intelligence insights",
    "Weekly digest email with competitor analysis",
    "Competitor comparison chart and analytics"
  ]
};

export const ReputationSEOContent: SEOContent = {
  headings: {
    h1: "Stop Losing Customers Because of Bad Reviews",
    h2: [
      "AI Automatically Responds to Reviews in Your Tone",
      "Generate More 5-Star Reviews from Happy Customers",
      "Save 10+ Hours Per Week on Reputation Management",
      "Track Sentiment Trends and Protect Your Revenue",
      "Professional Review Response Templates"
    ],
    h3: [
      "Automated Review Responses",
      "Smart Customer Targeting",
      "Sentiment Analysis",
      "Campaign Management",
      "Performance Tracking"
    ]
  },
  keywords: {
    primary: "review management",
    secondary: [
      "AI review responses",
      "online reputation",
      "Google reviews",
      "Yelp reviews",
      "reputation management"
    ],
    longtail: [
      "how to manage online reviews",
      "AI review response generator",
      "online reputation management software",
      "Google review management tool",
      "automated review responses"
    ]
  },
  contentStructure: {
    introduction: "Bad reviews are costing you customers every day. MozaWave Reputation uses AI to automatically respond to reviews in your brand voice, identify happy customers for review requests, and track sentiment trends to protect your revenue.",
    benefits: [
      "AI responds to reviews while you sleep",
      "Turn happy customers into 5-star reviewers",
      "Stop bad reviews from killing your business",
      "Increase your average rating by 0.5+ stars",
      "Save 10+ hours per week on reputation management",
      "More reviews = more customers = more revenue"
    ],
    features: [
      "AI generates professional responses that match your brand voice",
      "Identify happy customers most likely to leave 5-star reviews",
      "Track review sentiment trends and get alerts on negative patterns",
      "Automated email and SMS campaigns to request reviews from satisfied customers",
      "Pre-approved response templates for common review types",
      "Monitor response rates, rating improvements, and revenue impact"
    ],
    cta: "Start your free trial today and protect your reputation with AI. No credit card required, cancel anytime.",
    faq: [
      {
        question: "How does AI respond to reviews?",
        answer: "Our AI analyzes the review content and sentiment, then generates a tone-matched response using your brand voice. You can review and customize responses before sending."
      },
      {
        question: "Which review platforms do you support?",
        answer: "We support Google, Yelp, Facebook, and 15+ other review platforms. New platforms are added regularly."
      },
      {
        question: "How do you identify happy customers for review requests?",
        answer: "Our AI analyzes customer interactions, service ratings, and feedback to identify customers most likely to leave positive reviews."
      },
      {
        question: "Can I customize the AI responses?",
        answer: "Yes, you can set your preferred tone (professional, friendly, conversational) and customize response templates for your brand."
      }
    ]
  },
  internalLinks: [
    "/market-watch",
    "/business-intelligence",
    "/pricing",
    "/demo",
    "/about",
    "/contact"
  ],
  externalLinks: [
    "https://www.google.com/business",
    "https://www.yelp.com",
    "https://business.facebook.com"
  ],
  imageAltTexts: [
    "MozaWave Reputation AI review management dashboard",
    "Automated review response interface",
    "Review sentiment analysis and trends",
    "Customer review generation campaign",
    "Reputation management analytics and insights"
  ]
};

export const BusinessIntelligenceSEOContent: SEOContent = {
  headings: {
    h1: "Comprehensive Intelligence to Grow Revenue and Protect Reputation",
    h2: [
      "Unified Dashboard Combining All Business Intelligence",
      "AI-Powered Insights Turn Data Into Actionable Decisions",
      "Anomaly Detection Identifies Issues Before They Impact Revenue",
      "Revenue Forecasting Based on Current Trends",
      "Complete Competitive Analysis and Reputation Monitoring"
    ],
    h3: [
      "Unified Dashboard",
      "AI Insights",
      "Anomaly Detection",
      "Revenue Forecasting",
      "Competitive Analysis",
      "Reputation Monitoring"
    ]
  },
  keywords: {
    primary: "business intelligence",
    secondary: [
      "business dashboard",
      "competitive intelligence",
      "reputation management",
      "business analytics",
      "revenue optimization"
    ],
    longtail: [
      "business intelligence platform for small business",
      "unified business dashboard",
      "AI business insights",
      "revenue forecasting software",
      "business analytics dashboard"
    ]
  },
  contentStructure: {
    introduction: "Get the complete picture of your business performance with MozaWave Business Intelligence. Monitor competitors, manage reputation, and track key metrics all in one platform with AI-powered insights that turn data into actionable business decisions.",
    benefits: [
      "See all your business intelligence in one place",
      "Get automated recommendations based on data analysis",
      "Identify unusual patterns before they impact revenue",
      "Predict future performance based on current trends",
      "Track market position and competitive threats",
      "Monitor sentiment and reputation trends"
    ],
    features: [
      "Unified dashboard combining competitor intelligence, reputation management, and business analytics",
      "AI-powered insights with automated recommendations based on comprehensive data analysis",
      "Anomaly detection identifies unusual patterns before they impact revenue",
      "Revenue forecasting predicts future performance based on current trends",
      "Competitive analysis tracks market position and competitive threats",
      "Reputation monitoring tracks sentiment and reputation trends across platforms"
    ],
    cta: "Start your free trial today and get complete business intelligence. No credit card required, cancel anytime.",
    faq: [
      {
        question: "What data sources do you integrate?",
        answer: "We integrate competitor data, review platforms, social media, web analytics, and your internal business data for comprehensive intelligence."
      },
      {
        question: "How accurate are the AI predictions?",
        answer: "Our AI has a 92% accuracy rate for revenue forecasting and anomaly detection, with confidence scores for all predictions."
      },
      {
        question: "Can I customize the dashboard?",
        answer: "Yes, you can customize widgets, metrics, and alerts to focus on what matters most to your business."
      },
      {
        question: "How often is the data updated?",
        answer: "Data is updated in real-time for critical metrics and every 4 hours for comprehensive analysis and insights."
      }
    ]
  },
  internalLinks: [
    "/market-watch",
    "/reputation",
    "/pricing",
    "/demo",
    "/about",
    "/contact"
  ],
  externalLinks: [
    "https://www.google.com/analytics",
    "https://business.facebook.com/insights",
    "https://www.yelp.com/biz"
  ],
  imageAltTexts: [
    "MozaWave Business Intelligence unified dashboard",
    "AI-powered business insights and analytics",
    "Revenue forecasting and trend analysis",
    "Competitive intelligence and market analysis",
    "Reputation monitoring and sentiment tracking"
  ]
};

// =============================================================================
// SEO OPTIMIZATION UTILITIES
// =============================================================================

export class SEOOptimizer {
  /**
   * Generate optimized meta tags for a page
   */
  static generateMetaTags(seoMetadata: SEOMetadata): string {
    const metaTags = [
      `<title>${seoMetadata.title}</title>`,
      `<meta name="description" content="${seoMetadata.description}">`,
      `<meta name="keywords" content="${seoMetadata.keywords.join(', ')}">`,
      `<link rel="canonical" href="${seoMetadata.canonicalUrl}">`,
      `<meta property="og:title" content="${seoMetadata.ogTitle}">`,
      `<meta property="og:description" content="${seoMetadata.ogDescription}">`,
      `<meta property="og:image" content="${seoMetadata.ogImage}">`,
      `<meta property="og:url" content="${seoMetadata.canonicalUrl}">`,
      `<meta property="og:type" content="website">`,
      `<meta name="twitter:card" content="${seoMetadata.twitterCard}">`,
      `<meta name="twitter:title" content="${seoMetadata.twitterTitle}">`,
      `<meta name="twitter:description" content="${seoMetadata.twitterDescription}">`,
      `<meta name="twitter:image" content="${seoMetadata.twitterImage}">`,
      `<script type="application/ld+json">${seoMetadata.schemaMarkup}</script>`
    ];

    // Add additional meta tags
    seoMetadata.metaTags.forEach(tag => {
      metaTags.push(`<meta name="${tag.name}" content="${tag.content}">`);
    });

    return metaTags.join('\n');
  }

  /**
   * Optimize content for SEO
   */
  static optimizeContent(content: string, keywords: string[]): string {
    let optimizedContent = content;

    // Add keywords naturally throughout the content
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      if (!regex.test(optimizedContent)) {
        // Add keyword if not present
        optimizedContent += ` ${keyword}`;
      }
    });

    // Ensure proper heading structure
    if (!optimizedContent.includes('<h1>')) {
      optimizedContent = `<h1>${keywords[0]}</h1>\n${optimizedContent}`;
    }

    return optimizedContent;
  }

  /**
   * Generate sitemap entry
   */
  static generateSitemapEntry(url: string, lastmod: string, changefreq: string, priority: string): string {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }

  /**
   * Generate robots.txt content
   */
  static generateRobotsTxt(domain: string): string {
    return `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /_next/
Disallow: /static/`;
  }

  /**
   * Generate structured data for FAQ
   */
  static generateFAQStructuredData(faqs: Array<{question: string, answer: string}>): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
  }

  /**
   * Generate breadcrumb structured data
   */
  static generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
  }
}

// =============================================================================
// EXPORT ALL SEO DATA
// =============================================================================

export default {
  MarketWatchSEO,
  ReputationSEO,
  BusinessIntelligenceSEO,
  MarketWatchSEOContent,
  ReputationSEOContent,
  BusinessIntelligenceSEOContent,
  SEOOptimizer
};

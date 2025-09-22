// Real Demo Scenarios for MozaWave Testing
// 5 Industry-Specific Examples with Real Business Names and Locations

export interface DemoScenario {
  businessName: string;
  zipCode: string;
  industry: string;
  location: string;
  description: string;
  keyInsights: string[];
  expectedRevenue: string;
  competitors: string[];
}

export const demoScenarios: DemoScenario[] = [
  // RESTAURANT 1: NYC Pizza
  {
    businessName: "Mario's Artisan Pizza",
    zipCode: "11201",
    industry: "Restaurant & Food Service",
    location: "Brooklyn, NY",
    description: "Authentic Italian pizzeria in Brooklyn competing with legendary NYC pizza spots",
    keyInsights: [
      "Lucali's 2-hour wait times create $8,200 monthly opportunity",
      "Di Fara's price increase driving customers away ($5,400 opportunity)",
      "Plant-based pizza trend growing 156% in NYC ($3,800 opportunity)",
      "Delivery service quality issues across competitors ($4,200 opportunity)"
    ],
    expectedRevenue: "$21,600 monthly",
    competitors: ["Lucali", "Di Fara Pizza", "Roberta's", "Joe's Pizza", "Prince Street Pizza"]
  },

  // RESTAURANT 2: LA Fine Dining
  {
    businessName: "Bella Vista Bistro",
    zipCode: "90210",
    industry: "Restaurant & Food Service", 
    location: "Beverly Hills, CA",
    description: "Upscale Italian restaurant in Beverly Hills competing with high-end dining",
    keyInsights: [
      "Competitor reservation systems failing - 67% no-show rate",
      "Wine list pricing 40% above market average creating opportunity",
      "Private dining demand up 89% post-COVID ($12,000 monthly opportunity)",
      "Instagram marketing gap - competitors have 3x more engagement"
    ],
    expectedRevenue: "$28,400 monthly",
    competitors: ["Spago", "Nobu", "Catch LA", "The Ivy", "Madeo"]
  },

  // REAL ESTATE: Miami Market
  {
    businessName: "Oceanview Realty Group",
    zipCode: "33101",
    industry: "Real Estate",
    location: "Miami, FL",
    description: "Luxury real estate agency specializing in waterfront properties in Miami",
    keyInsights: [
      "Competitor response time averages 4.2 hours - instant response creates advantage",
      "Virtual tour adoption only 23% - massive opportunity for tech-forward approach",
      "Luxury market inventory down 34% - pricing strategy optimization needed",
      "International buyer segment growing 156% - multilingual marketing opportunity"
    ],
    expectedRevenue: "$45,200 monthly",
    competitors: ["Coldwell Banker", "Douglas Elliman", "Compass", "Sotheby's", "Brown Harris Stevens"]
  },

  // LAW FIRM: Corporate Law
  {
    businessName: "Metropolitan Legal Partners",
    zipCode: "10005",
    industry: "Professional Services",
    location: "New York, NY",
    description: "Boutique corporate law firm in Financial District competing with big firms",
    keyInsights: [
      "Big law firms charging $800-1200/hour - mid-market pricing opportunity",
      "Client communication complaints up 45% at competitors",
      "Tech startup legal needs growing 234% - specialized service opportunity",
      "Remote work legal issues creating new practice area ($18,000 monthly opportunity)"
    ],
    expectedRevenue: "$32,800 monthly",
    competitors: ["Skadden", "Cravath", "Sullivan & Cromwell", "Latham & Watkins", "Kirkland & Ellis"]
  },

  // GENERAL CONTRACTOR: Austin Market
  {
    businessName: "Hill Country Construction",
    zipCode: "78701",
    industry: "Home Services",
    location: "Austin, TX",
    description: "Premium home renovation contractor in booming Austin market",
    keyInsights: [
      "Competitor project delays averaging 3.2 weeks - on-time delivery advantage",
      "Sustainable building materials demand up 189% - eco-friendly positioning",
      "Permit processing taking 6+ weeks - expedited service opportunity",
      "Smart home integration requests up 267% - tech-forward contractor advantage"
    ],
    expectedRevenue: "$38,600 monthly",
    competitors: ["Toll Brothers", "KB Home", "PulteGroup", "Lennar", "D.R. Horton"]
  }
];

export const getDemoScenario = (industry: string, location?: string): DemoScenario | undefined => {
  // Normalize industry names for better matching
  const normalizeIndustry = (industry: string) => {
    const normalized = industry.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Map common variations to our scenario industries
    if (normalized.includes('restaurant') || normalized.includes('food')) {
      return 'restaurant & food service';
    }
    if (normalized.includes('real estate') || normalized.includes('realestate')) {
      return 'real estate';
    }
    if (normalized.includes('professional') || normalized.includes('law') || normalized.includes('legal')) {
      return 'professional services';
    }
    if (normalized.includes('home') || normalized.includes('contractor') || normalized.includes('construction')) {
      return 'home services';
    }
    
    return normalized;
  };

  const normalizedIndustry = normalizeIndustry(industry);
  
  if (location) {
    const normalizedLocation = location.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    return demoScenarios.find(scenario => 
      scenario.industry.toLowerCase().includes(normalizedIndustry) && 
      (scenario.location.toLowerCase().includes(normalizedLocation) || 
       scenario.zipCode.includes(location))
    );
  }
  
  return demoScenarios.find(scenario => 
    scenario.industry.toLowerCase().includes(normalizedIndustry)
  );
};

export const getRandomDemoScenario = (): DemoScenario => {
  const randomIndex = Math.floor(Math.random() * demoScenarios.length);
  return demoScenarios[randomIndex];
};

// Industry-specific competitor data with realistic business names
export const industryCompetitors = {
  'Restaurant & Food Service': {
    'Brooklyn, NY': ['Lucali', 'Di Fara Pizza', 'Roberta\'s', 'Joe\'s Pizza', 'Prince Street Pizza'],
    'Beverly Hills, CA': ['Spago', 'Nobu', 'Catch LA', 'The Ivy', 'Madeo'],
    'Austin, TX': ['Franklin Barbecue', 'Uchi', 'Odd Duck', 'Barley Swine', 'La Barbecue'],
    'Chicago, IL': ['Alinea', 'Girl & The Goat', 'Au Cheval', 'Portillo\'s', 'Lou Malnati\'s'],
    'Miami, FL': ['Joe\'s Stone Crab', 'Versailles', 'La Sandwicherie', 'Garcia\'s Seafood', 'Havana Harry\'s']
  },
  'Real Estate': {
    'Miami, FL': ['Coldwell Banker', 'Douglas Elliman', 'Compass', 'Sotheby\'s', 'Brown Harris Stevens'],
    'Beverly Hills, CA': ['The Agency', 'Hilton & Hyland', 'Coldwell Banker', 'Rodeo Realty', 'Compass'],
    'Austin, TX': ['Keller Williams', 'Compass', 'Coldwell Banker', 'Realty Austin', 'RE/MAX'],
    'Chicago, IL': ['@properties', 'Coldwell Banker', 'Berkshire Hathaway', 'RE/MAX', 'Keller Williams'],
    'Brooklyn, NY': ['Corcoran', 'Compass', 'Douglas Elliman', 'Brown Harris Stevens', 'Coldwell Banker']
  },
  'Professional Services': {
    'New York, NY': ['Skadden', 'Cravath', 'Sullivan & Cromwell', 'Latham & Watkins', 'Kirkland & Ellis'],
    'Los Angeles, CA': ['Latham & Watkins', 'Gibson Dunn', 'O\'Melveny', 'Munger Tolles', 'Quinn Emanuel'],
    'Chicago, IL': ['Kirkland & Ellis', 'Sidley Austin', 'Baker McKenzie', 'Jenner & Block', 'Mayer Brown'],
    'Miami, FL': ['Greenberg Traurig', 'Akerman', 'Holland & Knight', 'White & Case', 'Morgan Lewis'],
    'Austin, TX': ['Vinson & Elkins', 'Baker Botts', 'Norton Rose Fulbright', 'Jackson Walker', 'Haynes Boone']
  },
  'Home Services': {
    'Austin, TX': ['Toll Brothers', 'KB Home', 'PulteGroup', 'Lennar', 'D.R. Horton'],
    'Los Angeles, CA': ['Toll Brothers', 'KB Home', 'Lennar', 'PulteGroup', 'Shea Homes'],
    'Chicago, IL': ['PulteGroup', 'Lennar', 'KB Home', 'Toll Brothers', 'Meritage Homes'],
    'Miami, FL': ['Lennar', 'PulteGroup', 'KB Home', 'Toll Brothers', 'Meritage Homes'],
    'Brooklyn, NY': ['Toll Brothers', 'Lennar', 'PulteGroup', 'KB Home', 'Meritage Homes']
  },
  'Contractors': {
    'Austin, TX': ['Toll Brothers', 'KB Home', 'PulteGroup', 'Lennar', 'D.R. Horton'],
    'Los Angeles, CA': ['Toll Brothers', 'KB Home', 'Lennar', 'PulteGroup', 'Shea Homes'],
    'Chicago, IL': ['PulteGroup', 'Lennar', 'KB Home', 'Toll Brothers', 'Meritage Homes'],
    'Miami, FL': ['Lennar', 'PulteGroup', 'KB Home', 'Toll Brothers', 'Meritage Homes'],
    'Brooklyn, NY': ['Toll Brothers', 'Lennar', 'PulteGroup', 'KB Home', 'Meritage Homes']
  },
  'Law Offices': {
    'New York, NY': ['Skadden', 'Cravath', 'Sullivan & Cromwell', 'Latham & Watkins', 'Kirkland & Ellis'],
    'Los Angeles, CA': ['Latham & Watkins', 'Gibson Dunn', 'O\'Melveny', 'Munger Tolles', 'Quinn Emanuel'],
    'Chicago, IL': ['Kirkland & Ellis', 'Sidley Austin', 'Baker McKenzie', 'Jenner & Block', 'Mayer Brown'],
    'Miami, FL': ['Greenberg Traurig', 'Akerman', 'Holland & Knight', 'White & Case', 'Morgan Lewis'],
    'Austin, TX': ['Vinson & Elkins', 'Baker Botts', 'Norton Rose Fulbright', 'Jackson Walker', 'Haynes Boone']
  }
};

// Realistic insight data for each scenario
export const generateScenarioInsights = (scenario: DemoScenario) => {
  const baseInsights = [
    {
      id: 'insight_1',
      title: `${scenario.competitors[0]}'s Service Gap Creates Massive Opportunity`,
      description: `Analysis of 2,847+ reviews shows 68% of customers complain about ${scenario.competitors[0]}'s service issues. This creates a significant revenue opportunity for superior service.`,
      value: '$8,200',
      impact: 'Monthly Revenue',
      confidence: 89
    },
    {
      id: 'insight_2', 
      title: 'Pricing Optimization Opportunity Identified',
      description: `Competitor analysis reveals 23% of businesses in your area are underpricing their services by 15-20%. You can increase prices while maintaining competitive advantage.`,
      value: '+18%',
      impact: 'Price Increase',
      confidence: 76
    },
    {
      id: 'insight_3',
      title: 'Market Expansion Potential',
      description: `Sentiment analysis shows 67% positive sentiment for ${scenario.industry} services in neighboring areas. High demand indicates expansion opportunity.`,
      value: '3 New',
      impact: 'Markets',
      confidence: 82
    },
    {
      id: 'insight_4',
      title: 'Customer Retention Risk',
      description: `Analysis of 156 customer interactions shows 28% are at risk of churning due to communication gaps. Immediate action needed to retain high-value customers.`,
      value: '28%',
      impact: 'At Risk',
      confidence: 91
    }
  ];

  return baseInsights;
};

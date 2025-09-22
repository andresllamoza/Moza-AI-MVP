// Strategic Competitive Analysis Component
// Provides deep competitor strategy analysis and recommendations

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  DollarSign,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  XCircle,
  Zap,
  Eye,
  Brain,
  Shield,
  Award,
  PlayCircle
} from 'lucide-react';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { Badge } from '@/components/ui/badge';

interface CompetitorStrategy {
  name: string;
  industry: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
  revenue: string;
  growthRate: string;
  customerSatisfaction: number;
  strategicFocus: string[];
  pricingStrategy: string;
  marketingChannels: string[];
  serviceOffering: string[];
}

interface StrategicRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'pricing' | 'marketing' | 'operations' | 'service' | 'technology';
  priority: 'high' | 'medium' | 'low';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  expectedROI: string;
  competitorGap: string;
  implementation: string[];
}

interface StrategicCompetitiveAnalysisProps {
  businessName: string;
  industry: string;
  location: string;
  competitors: string[];
  onComplete?: () => void;
}

export const StrategicCompetitiveAnalysis: React.FC<StrategicCompetitiveAnalysisProps> = ({
  businessName,
  industry,
  location,
  competitors,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Generate competitor strategies based on industry
  const generateCompetitorStrategies = (): CompetitorStrategy[] => {
    const strategies: CompetitorStrategy[] = [];
    
    competitors.forEach(competitor => {
      let strategy: CompetitorStrategy;
      
      if (industry.toLowerCase().includes('restaurant') || industry.toLowerCase().includes('food')) {
        strategy = generateRestaurantStrategy(competitor);
      } else if (industry.toLowerCase().includes('real estate')) {
        strategy = generateRealEstateStrategy(competitor);
      } else if (industry.toLowerCase().includes('law') || industry.toLowerCase().includes('legal')) {
        strategy = generateLawFirmStrategy(competitor);
      } else if (industry.toLowerCase().includes('contractor') || industry.toLowerCase().includes('construction')) {
        strategy = generateContractorStrategy(competitor);
      } else {
        strategy = generateGenericStrategy(competitor);
      }
      
      strategies.push(strategy);
    });
    
    return strategies;
  };

  const generateRestaurantStrategy = (competitor: string): CompetitorStrategy => {
    const strategies = {
      'Lucali': {
        strengths: ['Exceptional product quality', 'Strong brand recognition', 'Authentic atmosphere'],
        weaknesses: ['Excessive wait times', 'No reservation system', 'Limited capacity'],
        opportunities: ['Online ordering system', 'Multiple locations', 'Premium pricing'],
        threats: ['Customer patience limits', 'Competitor service improvements', 'Economic downturn'],
        strategicFocus: ['Quality maintenance', 'Capacity expansion', 'Customer experience'],
        pricingStrategy: 'Premium pricing with quality justification',
        marketingChannels: ['Word of mouth', 'Social media', 'Food critics'],
        serviceOffering: ['Dine-in only', 'Limited menu', 'No delivery']
      },
      'Di Fara Pizza': {
        strengths: ['Legendary reputation', 'Authentic ingredients', 'Master craftsman'],
        weaknesses: ['High prices', 'Limited hours', 'Single location'],
        opportunities: ['Expansion opportunities', 'Premium market positioning', 'Franchising'],
        threats: ['Price sensitivity', 'Competitor quality improvements', 'Market saturation'],
        strategicFocus: ['Premium positioning', 'Quality consistency', 'Market expansion'],
        pricingStrategy: 'Premium pricing reflecting quality and reputation',
        marketingChannels: ['Food media', 'Word of mouth', 'Tourist marketing'],
        serviceOffering: ['Dine-in', 'Takeout', 'Limited delivery']
      }
    };

    const competitorData = strategies[competitor as keyof typeof strategies] || {
      strengths: ['Strong market presence', 'Established customer base'],
      weaknesses: ['Service gaps', 'Pricing issues'],
      opportunities: ['Market expansion', 'Service improvement'],
      threats: ['Competition', 'Market changes'],
      strategicFocus: ['Growth', 'Quality'],
      pricingStrategy: 'Market-based pricing',
      marketingChannels: ['Traditional', 'Digital'],
      serviceOffering: ['Core services', 'Limited options']
    };

    return {
      name: competitor,
      industry: 'Restaurant',
      ...competitorData,
      marketPosition: competitor === 'Lucali' ? 'leader' : 'challenger',
      revenue: competitor === 'Lucali' ? '$2.4M' : '$1.8M',
      growthRate: competitor === 'Lucali' ? '+12%' : '+8%',
      customerSatisfaction: competitor === 'Lucali' ? 4.6 : 4.2
    };
  };

  const generateRealEstateStrategy = (competitor: string): CompetitorStrategy => {
    const strategies = {
      'Coldwell Banker': {
        strengths: ['National brand recognition', 'Large agent network', 'Comprehensive services'],
        weaknesses: ['Slow response times', 'Outdated technology', 'High commission rates'],
        opportunities: ['Digital transformation', 'Market expansion', 'Service innovation'],
        threats: ['Digital competitors', 'Market disruption', 'Economic volatility'],
        strategicFocus: ['Digital adoption', 'Agent training', 'Market expansion'],
        pricingStrategy: 'Standard commission rates with premium positioning',
        marketingChannels: ['Traditional advertising', 'Online listings', 'Referral network'],
        serviceOffering: ['Buying', 'Selling', 'Property management', 'Mortgage services']
      },
      'Douglas Elliman': {
        strengths: ['Luxury market expertise', 'High-end clientele', 'Premium service'],
        weaknesses: ['Limited market reach', 'High service costs', 'Slow adoption of technology'],
        opportunities: ['Market expansion', 'Technology integration', 'Service diversification'],
        threats: ['Market competition', 'Economic downturns', 'Technology disruption'],
        strategicFocus: ['Luxury positioning', 'Service excellence', 'Market expansion'],
        pricingStrategy: 'Premium pricing for luxury services',
        marketingChannels: ['Luxury publications', 'High-end events', 'Referral network'],
        serviceOffering: ['Luxury sales', 'Property management', 'Investment consulting']
      }
    };

    const competitorData = strategies[competitor as keyof typeof strategies] || {
      strengths: ['Market presence', 'Client relationships'],
      weaknesses: ['Technology gaps', 'Service limitations'],
      opportunities: ['Market growth', 'Service expansion'],
      threats: ['Competition', 'Market changes'],
      strategicFocus: ['Growth', 'Service improvement'],
      pricingStrategy: 'Competitive pricing',
      marketingChannels: ['Traditional', 'Digital'],
      serviceOffering: ['Core services', 'Additional options']
    };

    return {
      name: competitor,
      industry: 'Real Estate',
      ...competitorData,
      marketPosition: competitor === 'Coldwell Banker' ? 'leader' : 'challenger',
      revenue: competitor === 'Coldwell Banker' ? '$45M' : '$28M',
      growthRate: competitor === 'Coldwell Banker' ? '+8%' : '+15%',
      customerSatisfaction: competitor === 'Coldwell Banker' ? 4.1 : 4.5
    };
  };

  const generateLawFirmStrategy = (competitor: string): CompetitorStrategy => {
    const strategies = {
      'Skadden': {
        strengths: ['Global presence', 'Top-tier talent', 'Complex case expertise'],
        weaknesses: ['High billing rates', 'Client cost concerns', 'Associate burnout'],
        opportunities: ['Market expansion', 'Technology adoption', 'Service innovation'],
        threats: ['Cost pressure', 'Talent competition', 'Market disruption'],
        strategicFocus: ['Premium positioning', 'Talent retention', 'Global expansion'],
        pricingStrategy: 'Premium hourly rates reflecting expertise',
        marketingChannels: ['Legal publications', 'Industry events', 'Referral network'],
        serviceOffering: ['Corporate law', 'Litigation', 'Regulatory compliance', 'M&A']
      },
      'Latham & Watkins': {
        strengths: ['International reach', 'Diverse practice areas', 'Strong client relationships'],
        weaknesses: ['High costs', 'Complex structure', 'Client communication issues'],
        opportunities: ['Market expansion', 'Technology integration', 'Service efficiency'],
        threats: ['Cost competition', 'Talent retention', 'Market changes'],
        strategicFocus: ['Global expansion', 'Service excellence', 'Technology adoption'],
        pricingStrategy: 'Premium rates with value-based options',
        marketingChannels: ['Legal media', 'International events', 'Client referrals'],
        serviceOffering: ['Corporate law', 'Litigation', 'Tax law', 'International law']
      }
    };

    const competitorData = strategies[competitor as keyof typeof strategies] || {
      strengths: ['Legal expertise', 'Client base'],
      weaknesses: ['Cost structure', 'Service gaps'],
      opportunities: ['Market growth', 'Service expansion'],
      threats: ['Competition', 'Regulatory changes'],
      strategicFocus: ['Growth', 'Service improvement'],
      pricingStrategy: 'Competitive rates',
      marketingChannels: ['Traditional', 'Digital'],
      serviceOffering: ['Core legal services', 'Specialized areas']
    };

    return {
      name: competitor,
      industry: 'Legal Services',
      ...competitorData,
      marketPosition: competitor === 'Skadden' ? 'leader' : 'challenger',
      revenue: competitor === 'Skadden' ? '$2.8B' : '$2.1B',
      growthRate: competitor === 'Skadden' ? '+6%' : '+12%',
      customerSatisfaction: competitor === 'Skadden' ? 4.3 : 4.1
    };
  };

  const generateContractorStrategy = (competitor: string): CompetitorStrategy => {
    const strategies = {
      'Toll Brothers': {
        strengths: ['Brand recognition', 'Large scale operations', 'Diverse portfolio'],
        weaknesses: ['Project delays', 'Quality control issues', 'Customer service problems'],
        opportunities: ['Technology adoption', 'Quality improvement', 'Market expansion'],
        threats: ['Labor shortages', 'Material costs', 'Competition'],
        strategicFocus: ['Operational efficiency', 'Quality improvement', 'Customer satisfaction'],
        pricingStrategy: 'Premium pricing for luxury homes',
        marketingChannels: ['Traditional advertising', 'Online presence', 'Referral network'],
        serviceOffering: ['Custom homes', 'Luxury communities', 'Commercial projects']
      },
      'KB Home': {
        strengths: ['Affordable pricing', 'Multiple markets', 'Established processes'],
        weaknesses: ['Quality concerns', 'Limited customization', 'Customer service issues'],
        opportunities: ['Quality improvement', 'Technology integration', 'Market expansion'],
        threats: ['Quality competition', 'Cost pressures', 'Market saturation'],
        strategicFocus: ['Cost efficiency', 'Quality improvement', 'Market expansion'],
        pricingStrategy: 'Competitive pricing for affordability',
        marketingChannels: ['Digital marketing', 'Traditional advertising', 'Referral programs'],
        serviceOffering: ['Production homes', 'Townhomes', 'Condos']
      }
    };

    const competitorData = strategies[competitor as keyof typeof strategies] || {
      strengths: ['Market presence', 'Operational scale'],
      weaknesses: ['Quality issues', 'Service gaps'],
      opportunities: ['Market growth', 'Service improvement'],
      threats: ['Competition', 'Cost pressures'],
      strategicFocus: ['Growth', 'Quality improvement'],
      pricingStrategy: 'Market-based pricing',
      marketingChannels: ['Traditional', 'Digital'],
      serviceOffering: ['Core services', 'Specialized projects']
    };

    return {
      name: competitor,
      industry: 'Construction',
      ...competitorData,
      marketPosition: competitor === 'Toll Brothers' ? 'leader' : 'challenger',
      revenue: competitor === 'Toll Brothers' ? '$8.2B' : '$5.8B',
      growthRate: competitor === 'Toll Brothers' ? '+5%' : '+8%',
      customerSatisfaction: competitor === 'Toll Brothers' ? 3.8 : 3.6
    };
  };

  const generateGenericStrategy = (competitor: string): CompetitorStrategy => {
    return {
      name: competitor,
      industry: industry,
      strengths: ['Market presence', 'Customer base'],
      weaknesses: ['Service gaps', 'Operational issues'],
      opportunities: ['Market expansion', 'Service improvement'],
      threats: ['Competition', 'Market changes'],
      marketPosition: 'challenger',
      revenue: '$2.5M',
      growthRate: '+10%',
      customerSatisfaction: 4.0,
      strategicFocus: ['Growth', 'Quality'],
      pricingStrategy: 'Competitive pricing',
      marketingChannels: ['Traditional', 'Digital'],
      serviceOffering: ['Core services']
    };
  };

  // Generate strategic recommendations
  const generateStrategicRecommendations = (strategies: CompetitorStrategy[]): StrategicRecommendation[] => {
    const recommendations: StrategicRecommendation[] = [];

    strategies.forEach(strategy => {
      // Pricing Strategy Recommendations
      if (strategy.weaknesses.includes('High prices') || strategy.weaknesses.includes('High billing rates')) {
        recommendations.push({
          id: `pricing_${strategy.name}`,
          title: `Undercut ${strategy.name}'s Premium Pricing`,
          description: `${strategy.name} is charging premium rates but facing customer pushback. Position yourself as a high-quality, value-focused alternative.`,
          category: 'pricing',
          priority: 'high',
          impact: '15-25% market share capture',
          effort: 'medium',
          timeline: '3-6 months',
          expectedROI: '$150K-300K annually',
          competitorGap: 'Price sensitivity in market',
          implementation: [
            'Analyze competitor pricing structure',
            'Develop value-based pricing model',
            'Create competitive positioning messaging',
            'Launch pricing strategy campaign'
          ]
        });
      }

      // Service Quality Recommendations
      if (strategy.weaknesses.includes('Poor customer service') || strategy.weaknesses.includes('Response time issues')) {
        recommendations.push({
          id: `service_${strategy.name}`,
          title: `Outperform ${strategy.name} in Customer Service`,
          description: `${strategy.name} has significant customer service gaps. Focus on superior service delivery to capture dissatisfied customers.`,
          category: 'service',
          priority: 'high',
          impact: '20-30% customer acquisition',
          effort: 'low',
          timeline: '1-3 months',
          expectedROI: '$100K-200K annually',
          competitorGap: 'Service quality issues',
          implementation: [
            'Implement rapid response system',
            'Train staff on customer service excellence',
            'Create service guarantees',
            'Monitor and improve response times'
          ]
        });
      }

      // Technology Recommendations
      if (strategy.weaknesses.includes('Outdated technology') || strategy.weaknesses.includes('Limited digital presence')) {
        recommendations.push({
          id: `tech_${strategy.name}`,
          title: `Leapfrog ${strategy.name} with Technology`,
          description: `${strategy.name} is behind in technology adoption. Use modern tools and digital platforms to create competitive advantage.`,
          category: 'technology',
          priority: 'medium',
          impact: '10-20% efficiency improvement',
          effort: 'high',
          timeline: '6-12 months',
          expectedROI: '$75K-150K annually',
          competitorGap: 'Technology adoption lag',
          implementation: [
            'Audit current technology stack',
            'Implement modern CRM system',
            'Develop digital customer portal',
            'Create mobile-first experience'
          ]
        });
      }

      // Marketing Recommendations
      if (strategy.weaknesses.includes('Limited marketing') || strategy.weaknesses.includes('Poor digital presence')) {
        recommendations.push({
          id: `marketing_${strategy.name}`,
          title: `Outmarket ${strategy.name} in Digital Channels`,
          description: `${strategy.name} has weak digital marketing presence. Dominate online channels to capture market share.`,
          category: 'marketing',
          priority: 'medium',
          impact: '25-40% lead generation increase',
          effort: 'medium',
          timeline: '3-6 months',
          expectedROI: '$200K-400K annually',
          competitorGap: 'Digital marketing weakness',
          implementation: [
            'Develop comprehensive SEO strategy',
            'Create engaging social media content',
            'Implement paid advertising campaigns',
            'Build email marketing automation'
          ]
        });
      }
    });

    return recommendations.slice(0, 8); // Limit to top 8 recommendations
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    for (let i = 0; i < 4; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const strategies = generateCompetitorStrategies();
  const recommendations = generateStrategicRecommendations(strategies);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pricing': return DollarSign;
      case 'marketing': return Target;
      case 'operations': return BarChart3;
      case 'service': return Users;
      case 'technology': return Zap;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getMarketPositionColor = (position: string) => {
    switch (position) {
      case 'leader': return 'bg-green-500/20 text-green-400';
      case 'challenger': return 'bg-blue-500/20 text-blue-400';
      case 'follower': return 'bg-yellow-500/20 text-yellow-400';
      case 'niche': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold">Strategic Competitive Analysis</h1>
          </div>
          <p className="text-xl text-slate-400 mb-6">
            Deep competitor strategy analysis for <span className="text-blue-400 font-semibold">{businessName}</span>
          </p>
          
          {!analysisComplete && (
            <ProfessionalButton
              onClick={startAnalysis}
              disabled={isAnalyzing}
              size="lg"
              className="btn-vibrant-primary"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing Strategies...
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Strategic Analysis
                </>
              )}
            </ProfessionalButton>
          )}
        </div>

        {/* Analysis Steps */}
        {isAnalyzing && (
          <div className="mb-8">
            <ProfessionalCard className="p-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-white mb-2">
                  {currentStep === 0 && "Analyzing Competitor Strategies..."}
                  {currentStep === 1 && "Evaluating Market Positions..."}
                  {currentStep === 2 && "Identifying Strategic Gaps..."}
                  {currentStep === 3 && "Generating Recommendations..."}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>
            </ProfessionalCard>
          </div>
        )}

        {/* Results */}
        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Competitor Strategies */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">🏆 Competitor Strategy Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProfessionalCard className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
                        <Badge className={getMarketPositionColor(strategy.marketPosition)}>
                          {strategy.marketPosition.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{strategy.revenue}</div>
                          <div className="text-sm text-slate-400">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{strategy.growthRate}</div>
                          <div className="text-sm text-slate-400">Growth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-400">{strategy.customerSatisfaction}/5</div>
                          <div className="text-sm text-slate-400">Rating</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-1">Strengths</h4>
                          <div className="flex flex-wrap gap-1">
                            {strategy.strengths.slice(0, 2).map((strength, idx) => (
                              <Badge key={idx} className="bg-green-500/20 text-green-400 text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-400 mb-1">Weaknesses</h4>
                          <div className="flex flex-wrap gap-1">
                            {strategy.weaknesses.slice(0, 2).map((weakness, idx) => (
                              <Badge key={idx} className="bg-red-500/20 text-red-400 text-xs">
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ProfessionalCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">💡 Strategic Recommendations</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendations.map((recommendation, index) => {
                  const Icon = getCategoryIcon(recommendation.category);
                  return (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProfessionalCard className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <Icon className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
                              <Badge className={getPriorityColor(recommendation.priority)}>
                                {recommendation.priority.toUpperCase()} PRIORITY
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-300 mb-4">{recommendation.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-slate-400">Expected Impact</div>
                            <div className="text-sm font-semibold text-green-400">{recommendation.impact}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Expected ROI</div>
                            <div className="text-sm font-semibold text-blue-400">{recommendation.expectedROI}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-white">Implementation Steps:</h4>
                          <ul className="space-y-1">
                            {recommendation.implementation.slice(0, 3).map((step, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle className="h-3 w-3 text-green-400" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ProfessionalCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <ProfessionalButton
                onClick={onComplete}
                size="lg"
                className="btn-vibrant-primary"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                View Full Strategic Report
              </ProfessionalButton>
              
              <div className="flex justify-center space-x-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span>Competitive Intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-400" />
                  <span>Strategic Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span>Market Advantage</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StrategicCompetitiveAnalysis;

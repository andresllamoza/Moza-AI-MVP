// MozaWave Complete Product Demo
// Comprehensive demo showcasing all three products with clear value propositions

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  MessageCircle,
  Mail,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Brain,
  Shield,
  Rocket,
  Award,
  Timer,
  TrendingUp as RevenueIcon,
  MessageSquare,
  Globe,
  Settings,
  Monitor
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface ProductDemo {
  id: string;
  name: string;
  tagline: string;
  valueProposition: string;
  icon: React.ReactNode;
  color: string;
  painPoint: string;
  solution: string;
  outcome: string;
  keyFeatures: Array<{
    feature: string;
    benefit: string;
    impact: string;
  }>;
  demoComponent: React.ReactNode;
  metrics: {
    timeSaved: string;
    revenueImpact: string;
    automationRate: string;
    customerSatisfaction: string;
  };
}

interface CompleteProductDemoProps {
  onComplete?: () => void;
  showNavigation?: boolean;
}

export const CompleteProductDemo: React.FC<CompleteProductDemoProps> = ({
  onComplete,
  showNavigation = true
}) => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const products: ProductDemo[] = [
    {
      id: 'market-watch',
      name: 'MozaWave Market Watch',
      tagline: 'Stop Losing Customers to Your Competitors',
      valueProposition: 'Turn competitor intelligence into $100K+ revenue opportunities',
      icon: <Eye className="h-8 w-8" />,
      color: 'blue',
      painPoint: 'Every week, your competitors are stealing customers while you\'re flying blind',
      solution: 'Track unlimited competitors across 10+ platforms with real-time alerts',
      outcome: 'Turn intelligence into revenue in days, not months',
      keyFeatures: [
        {
          feature: 'Real-Time Price Monitoring',
          benefit: 'Know when competitors raise prices so you can too',
          impact: 'Average $2,400 monthly revenue increase'
        },
        {
          feature: 'New Service Detection',
          benefit: 'Get alerts when competitors launch new services',
          impact: 'Prevent market share loss and identify opportunities'
        },
        {
          feature: 'Ad Spend Intelligence',
          benefit: 'Track competitor marketing campaigns and copy what works',
          impact: '40% improvement in marketing ROI'
        },
        {
          feature: 'AI Revenue Recommendations',
          benefit: 'Get specific actions to take based on competitor moves',
          impact: '87% confidence in revenue opportunity predictions'
        }
      ],
      demoComponent: <MarketWatchProductDemo />,
      metrics: {
        timeSaved: '15+ hours/week',
        revenueImpact: '$2,400/month avg',
        automationRate: '95%',
        customerSatisfaction: '4.8/5 stars'
      }
    },
    {
      id: 'reputation',
      name: 'MozaWave Reputation',
      tagline: 'Stop Losing Customers Because of Bad Reviews',
      valueProposition: 'AI automatically manages your reputation while you sleep',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'green',
      painPoint: 'Bad reviews are scaring away potential customers every day',
      solution: 'AI responds to reviews in your tone and generates more 5-star reviews',
      outcome: 'Increase your rating by 0.5+ stars and save 10+ hours per week',
      keyFeatures: [
        {
          feature: 'AI Review Responses',
          benefit: 'Automatically respond to reviews in your brand voice',
          impact: '95% response rate, 24/7 coverage'
        },
        {
          feature: 'Smart Review Requests',
          benefit: 'Identify happy customers most likely to leave 5-star reviews',
          impact: '3x more positive reviews generated'
        },
        {
          feature: 'Sentiment Analysis',
          benefit: 'Track reputation trends and get alerts on negative patterns',
          impact: 'Early warning system prevents reputation damage'
        },
        {
          feature: 'Automated Campaigns',
          benefit: 'Email and SMS campaigns to request reviews from satisfied customers',
          impact: '127 new reviews generated in first month'
        }
      ],
      demoComponent: <ReputationProductDemo />,
      metrics: {
        timeSaved: '10+ hours/week',
        revenueImpact: '+0.5 star rating',
        automationRate: '95%',
        customerSatisfaction: '4.9/5 stars'
      }
    },
    {
      id: 'business-intelligence',
      name: 'Business Intelligence Dashboard',
      tagline: 'Comprehensive Intelligence to Grow Revenue and Protect Reputation',
      valueProposition: 'Unified dashboard combining all your business intelligence with AI-powered insights',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'purple',
      painPoint: 'Data scattered across multiple tools, missing insights that could drive revenue',
      solution: 'See all your business intelligence in one place with AI-powered recommendations',
      outcome: 'Make data-driven decisions that grow revenue and protect your business',
      keyFeatures: [
        {
          feature: 'Unified Dashboard',
          benefit: 'See competitor intelligence, reputation, and analytics in one place',
          impact: 'Eliminate data silos and get complete business picture'
        },
        {
          feature: 'AI Insights Engine',
          benefit: 'Get automated recommendations based on comprehensive data analysis',
          impact: '92% accuracy in revenue opportunity predictions'
        },
        {
          feature: 'Anomaly Detection',
          benefit: 'Identify unusual patterns before they impact revenue',
          impact: 'Prevent 85% of potential revenue losses'
        },
        {
          feature: 'Revenue Forecasting',
          benefit: 'Predict future performance based on current trends',
          impact: 'Plan ahead with 89% accuracy rate'
        }
      ],
      demoComponent: <BusinessIntelligenceProductDemo />,
      metrics: {
        timeSaved: '20+ hours/week',
        revenueImpact: '25% growth',
        automationRate: '90%',
        customerSatisfaction: '4.7/5 stars'
      }
    }
  ];

  const currentProduct = products[activeProduct];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentFeature(prev => {
          const nextFeature = prev + 1;
          if (nextFeature >= currentProduct.keyFeatures.length) {
            // Move to next product
            if (activeProduct < products.length - 1) {
              setActiveProduct(prev => prev + 1);
              return 0;
            } else {
              setIsAutoPlaying(false);
              onComplete?.();
              return 0;
            }
          }
          return nextFeature;
        });
      }, 8000); // 8 seconds per feature
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentFeature, activeProduct, currentProduct.keyFeatures.length, products.length, onComplete]);

  const handleProductChange = (index: number) => {
    setActiveProduct(index);
    setCurrentFeature(0);
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Demo Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Rocket className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-bold">MozaWave Complete Product Demo</h1>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                {activeProduct + 1} of {products.length}
              </Badge>
            </div>
            
            {showNavigation && (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAutoPlay}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Auto Play
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          
          {/* Product Navigation */}
          <div className="flex items-center justify-center gap-4 pb-4">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductChange(index)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeProduct === index
                    ? `bg-${product.color}-500/20 border border-${product.color}-500/30`
                    : 'hover:bg-slate-700/50'
                }`}
              >
                <div className={`h-6 w-6 ${
                  activeProduct === index ? `text-${product.color}-400` : 'text-slate-400'
                }`}>
                  {product.icon}
                </div>
                <div className="text-left">
                  <div className={`font-medium text-sm ${
                    activeProduct === index ? 'text-white' : 'text-slate-300'
                  }`}>
                    {product.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className={`p-4 rounded-lg bg-${currentProduct.color}-500/20`}>
                  <div className={`h-12 w-12 text-${currentProduct.color}-400`}>
                    {currentProduct.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">{currentProduct.name}</h2>
                  <p className="text-xl text-slate-400">{currentProduct.tagline}</p>
                </div>
              </div>
              
              <div className={`max-w-4xl mx-auto p-6 bg-${currentProduct.color}-500/10 border border-${currentProduct.color}-500/30 rounded-lg`}>
                <h3 className="text-2xl font-bold text-white mb-4">Value Proposition</h3>
                <p className="text-lg text-slate-300">{currentProduct.valueProposition}</p>
              </div>
            </div>

            {/* Pain Point → Solution → Outcome */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProfessionalCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Pain Point</h3>
                </div>
                <p className="text-slate-300">{currentProduct.painPoint}</p>
              </ProfessionalCard>

              <ProfessionalCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Solution</h3>
                </div>
                <p className="text-slate-300">{currentProduct.solution}</p>
              </ProfessionalCard>

              <ProfessionalCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Outcome</h3>
                </div>
                <p className="text-slate-300">{currentProduct.outcome}</p>
              </ProfessionalCard>
            </div>

            {/* Key Features with Auto-Play */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center">Key Features & Benefits</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Feature List */}
                <div className="space-y-4">
                  {currentProduct.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        index === currentFeature
                          ? `bg-${currentProduct.color}-500/20 border-${currentProduct.color}-500/50`
                          : 'bg-slate-700/50 border-slate-600'
                      }`}
                      animate={{
                        scale: index === currentFeature ? 1.02 : 1,
                        opacity: index === currentFeature ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-${currentProduct.color}-500/20`}>
                          <CheckCircle className={`h-5 w-5 text-${currentProduct.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{feature.feature}</h4>
                          <p className="text-sm text-slate-300 mb-2">{feature.benefit}</p>
                          <div className={`text-sm font-medium text-${currentProduct.color}-400`}>
                            Impact: {feature.impact}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Demo Component */}
                <div className="min-h-[400px]">
                  {currentProduct.demoComponent}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <ProfessionalCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Proven Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Timer className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{currentProduct.metrics.timeSaved}</div>
                  <div className="text-sm text-slate-400">Time Saved</div>
                </div>
                <div className="text-center">
                  <RevenueIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{currentProduct.metrics.revenueImpact}</div>
                  <div className="text-sm text-slate-400">Revenue Impact</div>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{currentProduct.metrics.automationRate}</div>
                  <div className="text-sm text-slate-400">Automation Rate</div>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{currentProduct.metrics.customerSatisfaction}</div>
                  <div className="text-sm text-slate-400">Customer Rating</div>
                </div>
              </div>
            </ProfessionalCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Join hundreds of businesses using MozaWave to stop losing customers to competitors, 
              protect their reputation, and grow revenue with AI-powered intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton size="lg" className="btn-vibrant-primary">
                🚀 Start Free Trial
              </ProfessionalButton>
              <ProfessionalButton size="lg" variant="outline">
                📞 Book Demo Call
              </ProfessionalButton>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                First 2 weeks free
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Setup in 5 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                500+ businesses trust us
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Market Watch Product Demo Component
const MarketWatchProductDemo: React.FC = () => {
  return (
    <ProfessionalCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Live Competitor Intelligence</h3>
        </div>
        
        {/* Competitor Price Change Example */}
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍕</span>
              <div>
                <div className="font-medium text-white">Brooklyn Pizza Co</div>
                <div className="text-sm text-slate-400">Signature Pizza</div>
              </div>
            </div>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              Price Alert
            </Badge>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="text-2xl font-bold text-red-400">$120</div>
            <ArrowRight className="h-5 w-5 text-slate-400" />
            <div className="text-2xl font-bold text-white">$130</div>
          </div>
          <div className="text-sm text-slate-400">15% increase detected 2 hours ago</div>
        </div>

        {/* AI Recommendation */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="font-medium text-blue-400 mb-2">💡 AI Recommendation</div>
          <div className="text-sm text-slate-300 mb-3">
            Consider raising your prices by $8-12 to maintain competitive positioning. 
            Market analysis shows 87% confidence in price acceptance.
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-green-400">
              Potential Revenue: <span className="font-bold">$2,400/month</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View Strategy
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">12</div>
            <div className="text-xs text-slate-400">Competitors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">8</div>
            <div className="text-xs text-slate-400">Alerts Today</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">87%</div>
            <div className="text-xs text-slate-400">Confidence</div>
          </div>
        </div>
      </div>
    </ProfessionalCard>
  );
};

// Reputation Product Demo Component
const ReputationProductDemo: React.FC = () => {
  return (
    <ProfessionalCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="h-6 w-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">AI Review Management</h3>
        </div>
        
        {/* Review Response Example */}
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-slate-400">Google Review</span>
          </div>
          <div className="text-sm text-slate-300 mb-3">
            "Excellent service! The team was professional and delivered exactly what they promised."
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="font-medium text-green-400 mb-2">🤖 AI Suggested Response</div>
            <div className="text-sm text-slate-300">
              "Thank you so much for your wonderful feedback! We're thrilled to hear about your positive experience..."
            </div>
          </div>
        </div>

        {/* Review Campaign Stats */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="font-medium text-green-400 mb-3">📧 Review Request Campaign</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-white">95%</div>
              <div className="text-slate-400">Response Rate</div>
            </div>
            <div>
              <div className="font-medium text-white">127</div>
              <div className="text-slate-400">Reviews Generated</div>
            </div>
          </div>
        </div>

        {/* Rating Trend */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">4.2 → 4.6</div>
          <div className="text-sm text-slate-400">+0.4 star improvement</div>
          <Progress value={80} className="mt-2" />
        </div>
      </div>
    </ProfessionalCard>
  );
};

// Business Intelligence Product Demo Component
const BusinessIntelligenceProductDemo: React.FC = () => {
  return (
    <ProfessionalCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-6 w-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Unified Intelligence Dashboard</h3>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
            <div className="text-lg font-bold text-blue-400">73%</div>
            <div className="text-xs text-slate-400">Revenue at Risk</div>
          </div>
          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
            <div className="text-lg font-bold text-green-400">+28%</div>
            <div className="text-xs text-slate-400">Sentiment Impact</div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="font-medium text-purple-400 mb-2">🧠 AI Insight</div>
          <div className="text-sm text-slate-300 mb-2">
            Revenue down 12% vs competitor activity. Immediate competitive response recommended.
          </div>
          <div className="text-xs text-purple-400">
            Confidence: 89% | Impact: High
          </div>
        </div>

        {/* Trend Indicators */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Competitive Threat</span>
            <div className="flex items-center gap-2">
              <Progress value={45} className="w-20" />
              <span className="text-sm text-orange-400">45%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Market Position</span>
            <div className="flex items-center gap-2">
              <Progress value={78} className="w-20" />
              <span className="text-sm text-green-400">78%</span>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalCard>
  );
};

export default CompleteProductDemo;

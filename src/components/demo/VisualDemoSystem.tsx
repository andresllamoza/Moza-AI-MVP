import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Star,
  Building2,
  Wrench,
  Smartphone,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

interface DemoData {
  competitors: {
    name: string;
    logo: string;
    price: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
    marketShare: number;
  }[];
  insights: {
    id: string;
    type: 'pricing' | 'promotion' | 'inventory' | 'reviews';
    title: string;
    description: string;
    impact: number;
    confidence: number;
    timestamp: string;
  }[];
  metrics: {
    revenue: number;
    customers: number;
    marketShare: number;
    growth: number;
  };
}

const demoData: Record<string, DemoData> = {
  restaurants: {
    competitors: [
      { name: "Chili's", logo: "🌶️", price: 25.99, trend: 'down', change: -8.5, marketShare: 18.2 },
      { name: "Olive Garden", logo: "🫒", price: 32.50, trend: 'up', change: 12.3, marketShare: 22.1 },
      { name: "Applebee's", logo: "🍎", price: 28.75, trend: 'stable', change: 0.2, marketShare: 15.8 },
      { name: "Outback", logo: "🥩", price: 35.20, trend: 'up', change: 5.7, marketShare: 19.4 },
      { name: "Red Lobster", logo: "🦐", price: 29.90, trend: 'down', change: -3.2, marketShare: 12.6 }
    ],
    insights: [
      {
        id: '1',
        type: 'promotion',
        title: 'Chili\'s 2-for-$25 Promotion Detected',
        description: 'Major price reduction detected - 8.5% decrease in average order value',
        impact: -15,
        confidence: 94,
        timestamp: '2 minutes ago'
      },
      {
        id: '2',
        type: 'pricing',
        title: 'Olive Garden Price Increase',
        description: 'Premium pricing strategy - 12.3% increase in menu prices',
        impact: 8,
        confidence: 89,
        timestamp: '1 hour ago'
      },
      {
        id: '3',
        type: 'reviews',
        title: 'Applebee\'s Review Sentiment Drop',
        description: 'Negative review spike detected - 23% decrease in sentiment score',
        impact: -12,
        confidence: 91,
        timestamp: '3 hours ago'
      }
    ],
    metrics: {
      revenue: 124750,
      customers: 2847,
      marketShare: 18.2,
      growth: 12.5
    }
  },
  'home-services': {
    competitors: [
      { name: "Roto-Rooter", logo: "🔧", price: 185.00, trend: 'up', change: 25.0, marketShare: 28.4 },
      { name: "Benjamin Franklin", logo: "🏠", price: 165.50, trend: 'stable', change: 1.2, marketShare: 22.1 },
      { name: "Mr. Rooter", logo: "🌳", price: 172.30, trend: 'up', change: 8.7, marketShare: 19.8 },
      { name: "ServiceTitan", logo: "⚡", price: 195.75, trend: 'up', change: 15.3, marketShare: 24.6 },
      { name: "Angi", logo: "📱", price: 145.20, trend: 'down', change: -5.1, marketShare: 16.2 }
    ],
    insights: [
      {
        id: '1',
        type: 'pricing',
        title: 'Emergency Service Rate Increase',
        description: 'Roto-Rooter increased emergency rates by 25% - pricing opportunity detected',
        impact: 18,
        confidence: 96,
        timestamp: '30 minutes ago'
      },
      {
        id: '2',
        type: 'inventory',
        title: 'New Franchise Location Alert',
        description: 'Benjamin Franklin opened new location in your service area',
        impact: -8,
        confidence: 87,
        timestamp: '2 hours ago'
      },
      {
        id: '3',
        type: 'promotion',
        title: '24/7 Service Guarantee',
        description: 'Mr. Rooter announced 24/7 service guarantee - competitive advantage',
        impact: 6,
        confidence: 82,
        timestamp: '4 hours ago'
      }
    ],
    metrics: {
      revenue: 89250,
      customers: 1847,
      marketShare: 22.1,
      growth: 18.7
    }
  },
  electronics: {
    competitors: [
      { name: "Best Buy", logo: "📱", price: 899.99, trend: 'down', change: -10.0, marketShare: 32.1 },
      { name: "Target", logo: "🎯", price: 929.99, trend: 'stable', change: 0.0, marketShare: 24.8 },
      { name: "Amazon", logo: "📦", price: 879.99, trend: 'down', change: -5.2, marketShare: 28.6 },
      { name: "Walmart", logo: "🏪", price: 899.99, trend: 'down', change: -8.1, marketShare: 18.4 },
      { name: "Costco", logo: "🏢", price: 869.99, trend: 'down', change: -12.3, marketShare: 15.2 }
    ],
    insights: [
      {
        id: '1',
        type: 'pricing',
        title: 'iPhone Price Drop Alert',
        description: 'Best Buy reduced iPhone prices by 10% - price match recommended',
        impact: -12,
        confidence: 95,
        timestamp: '15 minutes ago'
      },
      {
        id: '2',
        type: 'inventory',
        title: 'Amazon Same-Day Delivery Expansion',
        description: 'Enhanced delivery options - consider local pickup advantages',
        impact: 6,
        confidence: 79,
        timestamp: '1 hour ago'
      },
      {
        id: '3',
        type: 'promotion',
        title: 'Black Friday Early Deals',
        description: 'Target announced early Black Friday pricing - competitive positioning',
        impact: 4,
        confidence: 73,
        timestamp: '6 hours ago'
      }
    ],
    metrics: {
      revenue: 156300,
      customers: 3247,
      marketShare: 8.7,
      growth: 24.3
    }
  }
};

interface VisualDemoSystemProps {
  industry: string;
  onClose: () => void;
}

export const VisualDemoSystem: React.FC<VisualDemoSystemProps> = ({ industry, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const data = demoData[industry];

  const demoSteps = [
    { title: "Loading Market Data", duration: 2000 },
    { title: "Analyzing Competitors", duration: 2500 },
    { title: "Generating Insights", duration: 3000 },
    { title: "Calculating Impact", duration: 2000 },
    { title: "Demo Complete", duration: 1000 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < demoSteps.length) {
      const step = demoSteps[currentStep];
      interval = setInterval(() => {
        setDemoProgress(prev => {
          const increment = 100 / (step.duration / 100);
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            setCurrentStep(prev => prev + 1);
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (currentStep >= demoSteps.length) {
      setCurrentStep(0);
      setDemoProgress(0);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDemoProgress(0);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Data Not Found</h2>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Close Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Demo Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Industry Selection
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {industry === 'restaurants' ? <Building2 className="w-5 h-5" /> :
                   industry === 'home-services' ? <Wrench className="w-5 h-5" /> :
                   <Smartphone className="w-5 h-5" />}
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    {industry === 'restaurants' ? 'Restaurant Intelligence Demo' :
                     industry === 'home-services' ? 'Home Services Demo' :
                     'Electronics Retail Demo'}
                  </h1>
                  <p className="text-gray-400 text-sm">Live competitive intelligence simulation</p>
                </div>
              </div>
            </div>

            {/* Demo Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="flex items-center gap-2 text-sm hover:bg-white/10 rounded px-2 py-1 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm hover:bg-white/10 rounded px-2 py-1 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              
              {isPlaying && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live Demo
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>{currentStep < demoSteps.length ? demoSteps[currentStep].title : 'Demo Complete'}</span>
                <span>{Math.round(demoProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${demoProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Competitor Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Competitor Price Analysis
              </h3>
              
              <div className="space-y-4">
                {data.competitors.map((competitor, index) => (
                  <motion.div
                    key={competitor.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{competitor.logo}</div>
                      <div>
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-gray-400">
                          {competitor.marketShare}% market share
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">${competitor.price}</div>
                        <div className={`text-sm flex items-center gap-1 ${
                          competitor.trend === 'up' ? 'text-green-400' :
                          competitor.trend === 'down' ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {competitor.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                           competitor.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                           <div className="w-3 h-3 rounded-full bg-gray-400" />}
                          {competitor.change > 0 ? '+' : ''}{competitor.change}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                AI-Generated Insights
              </h3>
              
              <div className="space-y-4">
                {data.insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-700/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-400">{insight.timestamp}</span>
                      </div>
                      <div className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {insight.confidence}% confidence
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-lg mb-2">{insight.title}</h4>
                    <p className="text-gray-300 mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`text-2xl font-bold ${
                        insight.impact > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {insight.impact > 0 ? '+' : ''}{insight.impact}%
                      </div>
                      <div className="text-sm text-gray-400">
                        Revenue Impact
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Key Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Revenue</span>
                  </div>
                  <span className="font-bold text-green-400">
                    ${data.metrics.revenue.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Customers</span>
                  </div>
                  <span className="font-bold text-blue-400">
                    {data.metrics.customers.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Market Share</span>
                  </div>
                  <span className="font-bold text-purple-400">
                    {data.metrics.marketShare}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Growth</span>
                  </div>
                  <span className="font-bold text-yellow-400">
                    +{data.metrics.growth}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Demo Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Demo Status
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Data Sources</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">5 Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Updates</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Real-time</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Security</span>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">SOC 2</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get This Level of Intelligence for Your Business?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              This is just a preview. Get real-time competitive intelligence, 
              AI-powered insights, and automated alerts for your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button 
                onClick={onClose}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Different Industry
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

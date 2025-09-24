import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Building2,
  Wrench,
  Smartphone,
  Star,
  Clock,
  Target
} from 'lucide-react';

interface IndustryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  competitors: {
    name: string;
    logo: string;
    recentActivity: string;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  insights: {
    type: 'pricing' | 'promotion' | 'inventory' | 'reviews';
    title: string;
    description: string;
    impact: number;
    confidence: number;
  }[];
  metrics: {
    competitorsTracked: number;
    alertsGenerated: number;
    revenueImpact: string;
    marketShare: string;
  };
}

const industryData: Record<string, IndustryData> = {
  restaurants: {
    id: 'restaurants',
    name: 'Restaurant & Food Service',
    icon: <Building2 className="w-8 h-8" />,
    competitors: [
      {
        name: "Chili's",
        logo: "🌶️",
        recentActivity: "2-for-$25 promotion launched",
        impact: 'negative'
      },
      {
        name: "Olive Garden",
        logo: "🫒",
        recentActivity: "Unlimited breadsticks price increased 15%",
        impact: 'positive'
      },
      {
        name: "Applebee's",
        logo: "🍎",
        recentActivity: "New happy hour menu released",
        impact: 'neutral'
      }
    ],
    insights: [
      {
        type: 'promotion',
        title: 'Competitor Promotion Alert',
        description: "Chili's 2-for-$25 deal is driving 23% more foot traffic",
        impact: -15,
        confidence: 92
      },
      {
        type: 'pricing',
        title: 'Pricing Opportunity',
        description: 'Olive Garden price increase creates competitive gap',
        impact: 12,
        confidence: 88
      }
    ],
    metrics: {
      competitorsTracked: 12,
      alertsGenerated: 47,
      revenueImpact: '+$23,400',
      marketShare: '15.3%'
    }
  },
  'home-services': {
    id: 'home-services',
    name: 'Home Services',
    icon: <Wrench className="w-8 h-8" />,
    competitors: [
      {
        name: "Roto-Rooter",
        logo: "🔧",
        recentActivity: "Emergency service rates increased 25%",
        impact: 'positive'
      },
      {
        name: "Benjamin Franklin",
        logo: "🏠",
        recentActivity: "New franchise location opened nearby",
        impact: 'negative'
      },
      {
        name: "Mr. Rooter",
        logo: "🌳",
        recentActivity: "24/7 service guarantee announced",
        impact: 'neutral'
      }
    ],
    insights: [
      {
        type: 'pricing',
        title: 'Pricing Gap Identified',
        description: 'Emergency service rates up 25% - opportunity to undercut',
        impact: 18,
        confidence: 95
      },
      {
        type: 'promotion',
        title: 'Service Expansion Alert',
        description: 'New competitor location - adjust service area strategy',
        impact: -8,
        confidence: 87
      }
    ],
    metrics: {
      competitorsTracked: 8,
      alertsGenerated: 23,
      revenueImpact: '+$18,900',
      marketShare: '22.1%'
    }
  },
  electronics: {
    id: 'electronics',
    name: 'Electronics Retail',
    icon: <Smartphone className="w-8 h-8" />,
    competitors: [
      {
        name: "Best Buy",
        logo: "📱",
        recentActivity: "iPhone prices dropped 10%",
        impact: 'negative'
      },
      {
        name: "Target",
        logo: "🎯",
        recentActivity: "Black Friday deals announced early",
        impact: 'neutral'
      },
      {
        name: "Amazon",
        logo: "📦",
        recentActivity: "Same-day delivery expanded",
        impact: 'negative'
      }
    ],
    insights: [
      {
        type: 'pricing',
        title: 'Price Match Recommendation',
        description: 'Best Buy iPhone discount - match to stay competitive',
        impact: -12,
        confidence: 94
      },
      {
        type: 'inventory',
        title: 'Delivery Advantage',
        description: 'Amazon delivery expansion - enhance local pickup options',
        impact: 6,
        confidence: 79
      }
    ],
    metrics: {
      competitorsTracked: 6,
      alertsGenerated: 31,
      revenueImpact: '+$31,200',
      marketShare: '8.7%'
    }
  }
};

interface IndustrySpecificDemoProps {
  industry: string;
  onBack: () => void;
}

export const IndustrySpecificDemo: React.FC<IndustrySpecificDemoProps> = ({ 
  industry, 
  onBack 
}) => {
  const [loading, setLoading] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);
  const data = industryData[industry];

  useEffect(() => {
    // Simulate loading industry-specific data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [industry]);

  useEffect(() => {
    if (!loading && data) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % data.insights.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [loading, data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry Not Found</h2>
          <button 
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            {data.icon}
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Loading {data.name} Intelligence
          </h2>
          <p className="text-gray-600">Analyzing competitor data and market trends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Industries
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  {data.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
                  <p className="text-gray-600">Live competitive intelligence dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Data
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Competitors</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{data.metrics.competitorsTracked}</div>
            <div className="text-sm text-gray-500">Tracked</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">Alerts</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{data.metrics.alertsGenerated}</div>
            <div className="text-sm text-gray-500">This Month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Revenue Impact</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{data.metrics.revenueImpact}</div>
            <div className="text-sm text-gray-500">Potential</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Market Share</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{data.metrics.marketShare}</div>
            <div className="text-sm text-gray-500">Current</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Competitor Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Recent Competitor Activity
            </h3>
            <div className="space-y-4">
              {data.competitors.map((competitor, index) => (
                <motion.div
                  key={competitor.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl">{competitor.logo}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{competitor.name}</div>
                    <div className="text-sm text-gray-600">{competitor.recentActivity}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    competitor.impact === 'positive' ? 'bg-green-100 text-green-800' :
                    competitor.impact === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {competitor.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              AI-Generated Insights
            </h3>
            <div className="h-64 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentInsight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-600">Live Insight</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {data.insights[currentInsight].confidence}% confidence
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {data.insights[currentInsight].title}
                    </h4>
                    <p className="text-gray-700 flex-1 mb-4">
                      {data.insights[currentInsight].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className={`text-2xl font-bold ${
                        data.insights[currentInsight].impact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {data.insights[currentInsight].impact > 0 ? '+' : ''}{data.insights[currentInsight].impact}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Impact on Revenue
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get This Level of Intelligence for Your Business?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join 2,847+ businesses already using MozaWave to dominate their market with real-time competitive intelligence.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

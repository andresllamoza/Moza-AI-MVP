// MozaWave Enterprise Demo Page
// Showcases the complete enterprise platform capabilities

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Eye,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Settings,
  Download,
  Zap,
  Target,
  Globe,
  Users,
  DollarSign,
  Clock,
  Bell,
  Mail,
  Slack,
  Phone
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

import { mozaWavePlatform } from '@/services/mozawave-enterprise-platform';
import MozaWaveEnterpriseDashboard from '@/components/enterprise/MozaWaveEnterpriseDashboardFallback';

export const EnterpriseDemoPage: React.FC = () => {
  const [isPlatformRunning, setIsPlatformRunning] = useState(false);
  const [platformStatus, setPlatformStatus] = useState<any>(null);
  const [platformMetrics, setPlatformMetrics] = useState<any>(null);
  const [activeDemo, setActiveDemo] = useState<'overview' | 'dashboard' | 'features'>('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize demo data
    initializeDemo();
  }, []);

  const initializeDemo = async () => {
    try {
      setIsLoading(true);
      
      // Initialize the platform
      await mozaWavePlatform.initialize();
      
      // Get platform status and metrics
      const status = mozaWavePlatform.getPlatformStatus();
      const metrics = mozaWavePlatform.getPlatformMetrics();
      
      setPlatformStatus(status);
      setPlatformMetrics(metrics);
      setIsPlatformRunning(true);
      
    } catch (error) {
      console.error('Failed to initialize demo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startPlatform = async () => {
    try {
      setIsLoading(true);
      await mozaWavePlatform.initialize();
      const status = mozaWavePlatform.getPlatformStatus();
      const metrics = mozaWavePlatform.getPlatformMetrics();
      
      setPlatformStatus(status);
      setPlatformMetrics(metrics);
      setIsPlatformRunning(true);
    } catch (error) {
      console.error('Failed to start platform:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopPlatform = async () => {
    try {
      await mozaWavePlatform.shutdown();
      setIsPlatformRunning(false);
      setPlatformStatus(null);
      setPlatformMetrics(null);
    } catch (error) {
      console.error('Failed to stop platform:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MozaWave Enterprise Platform</h1>
                <p className="text-slate-400">Complete Intelligence & Reputation Management Demo</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {platformStatus && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isPlatformRunning ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-slate-300">
                    {isPlatformRunning ? 'Platform Running' : 'Platform Stopped'}
                  </span>
                </div>
              )}
              
              {isPlatformRunning ? (
                <Button variant="outline" onClick={stopPlatform} className="border-red-500 text-red-400 hover:bg-red-500/10">
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Platform
                </Button>
              ) : (
                <Button onClick={startPlatform} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Platform
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/30 border-b border-slate-700">
        <div className="container mx-auto px-6">
          <Tabs value={activeDemo} onValueChange={(value: any) => setActiveDemo(value)}>
            <TabsList className="bg-slate-700/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500">
                Platform Overview
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500">
                Live Dashboard
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-blue-500">
                Feature Demo
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeDemo} onValueChange={(value: any) => setActiveDemo(value)}>
          <TabsContent value="overview" className="space-y-8">
            <PlatformOverview 
              platformStatus={platformStatus}
              platformMetrics={platformMetrics}
              isRunning={isPlatformRunning}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            {isPlatformRunning ? (
              <MozaWaveEnterpriseDashboard />
            ) : (
              <div className="text-center py-16">
                <div className="p-4 rounded-full bg-slate-700/50 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Play className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Start Platform to View Dashboard</h3>
                <p className="text-slate-400 mb-6">Click "Start Platform" to access the live enterprise dashboard</p>
                <Button onClick={startPlatform} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Platform
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <FeatureDemo isRunning={isPlatformRunning} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Platform Overview Component
const PlatformOverview: React.FC<{
  platformStatus: any;
  platformMetrics: any;
  isRunning: boolean;
}> = ({ platformStatus, platformMetrics, isRunning }) => {
  const services = [
    {
      name: 'MozaWave Market Watch',
      description: 'Real-time competitor intelligence across 10+ platforms',
      icon: Eye,
      features: ['Competitor Tracking', 'Price Monitoring', 'Ad Intelligence', 'Threat Analysis'],
      status: platformStatus?.services?.marketWatch || false
    },
    {
      name: 'MozaWave Reputation',
      description: 'AI-powered review management and sentiment tracking',
      icon: MessageCircle,
      features: ['AI Responses', 'Sentiment Analysis', 'Review Campaigns', 'Reputation Scoring'],
      status: platformStatus?.services?.reputation || false
    },
    {
      name: 'Business Intelligence',
      description: 'Unified analytics with proprietary metrics and insights',
      icon: BarChart3,
      features: ['Revenue-at-Risk', 'Threat Rating', 'Anomaly Detection', 'Predictive Analytics'],
      status: platformStatus?.services?.businessIntelligence || false
    },
    {
      name: 'Alert System',
      description: 'Multi-channel notifications with playbook automation',
      icon: Bell,
      features: ['Real-time Alerts', 'Email/Slack', 'Playbooks', 'Escalation'],
      status: platformStatus?.services?.alertSystem || false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">MozaWave Enterprise</h1>
              <p className="text-xl text-slate-400">Category-Defining Intelligence Platform</p>
            </div>
          </div>
          
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            The world's first unified platform combining competitor intelligence, reputation management, 
            and business analytics with proprietary AI-powered insights and real-time automation.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="h-4 w-4 mr-2" />
              Enterprise Ready
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Shield className="h-4 w-4 mr-2" />
              SOC 2 Compliant
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Platform Status */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProfessionalCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Platform Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {platformMetrics?.trackedCompetitors || 0}
                </div>
                <p className="text-slate-400">Tracked Competitors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {platformMetrics?.managedReviews || 0}
                </div>
                <p className="text-slate-400">Managed Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {platformMetrics?.totalAlerts || 0}
                </div>
                <p className="text-slate-400">Active Alerts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {platformMetrics?.activeInsights || 0}
                </div>
                <p className="text-slate-400">AI Insights</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Performance Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Response Time</span>
                      <span className="text-white">{platformMetrics?.responseTime || 0}ms</span>
                    </div>
                    <Progress value={100 - (platformMetrics?.responseTime || 0) / 2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">System Load</span>
                      <span className="text-white">{platformMetrics?.systemLoad || 0}%</span>
                    </div>
                    <Progress value={platformMetrics?.systemLoad || 0} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Service Health</h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-300">{service.name}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${service.status ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-slate-400">
                          {service.status ? 'Running' : 'Stopped'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>
      )}

      {/* Services Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <ProfessionalCard className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${service.status ? 'bg-green-500/20' : 'bg-slate-700/50'}`}>
                    <service.icon className={`h-6 w-6 ${service.status ? 'text-green-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                    <p className="text-slate-400 mb-4">{service.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Proprietary Metrics',
              description: 'Revenue-at-Risk scoring, Competitor Threat Rating, Sentiment Impact Score',
              icon: Target,
              color: 'text-blue-400'
            },
            {
              title: 'Adaptive AI Learning',
              description: 'Continuous improvement based on user feedback and outcomes',
              icon: Brain,
              color: 'text-purple-400'
            },
            {
              title: 'Real-time Automation',
              description: 'Playbooks, alerts, and responses with multi-channel notifications',
              icon: Zap,
              color: 'text-green-400'
            },
            {
              title: 'Enterprise Security',
              description: 'SOC 2 compliance, GDPR ready, role-based access control',
              icon: Shield,
              color: 'text-orange-400'
            },
            {
              title: 'Multi-platform Integration',
              description: 'Google, Yelp, Facebook, Instagram, Slack, Email, SMS',
              icon: Globe,
              color: 'text-cyan-400'
            },
            {
              title: 'Scalable Architecture',
              description: 'Cloud-native, auto-scaling, 99.9% uptime SLA',
              icon: TrendingUp,
              color: 'text-pink-400'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <ProfessionalCard className="p-6 text-center">
                <div className={`p-3 rounded-lg bg-slate-700/50 w-12 h-12 mx-auto mb-4 flex items-center justify-center`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </ProfessionalCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Feature Demo Component
const FeatureDemo: React.FC<{ isRunning: boolean }> = ({ isRunning }) => {
  const [activeFeature, setActiveFeature] = useState<'market-watch' | 'reputation' | 'analytics' | 'automation'>('market-watch');

  const features = [
    {
      id: 'market-watch',
      name: 'Market Watch',
      icon: Eye,
      description: 'Real-time competitor intelligence',
      demo: <MarketWatchDemo />
    },
    {
      id: 'reputation',
      name: 'Reputation Management',
      icon: MessageCircle,
      description: 'AI-powered review responses',
      demo: <ReputationDemo />
    },
    {
      id: 'analytics',
      name: 'Business Intelligence',
      icon: BarChart3,
      description: 'Proprietary metrics and insights',
      demo: <AnalyticsDemo />
    },
    {
      id: 'automation',
      name: 'Automation & Alerts',
      icon: Bell,
      description: 'Playbooks and notifications',
      demo: <AutomationDemo />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Interactive Feature Demo</h2>
        <p className="text-slate-400">Explore each service with live demonstrations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Button
            key={feature.id}
            variant={activeFeature === feature.id ? 'default' : 'outline'}
            onClick={() => setActiveFeature(feature.id as any)}
            className={`h-auto p-4 flex flex-col items-center gap-2 ${
              activeFeature === feature.id 
                ? 'bg-blue-600 text-white' 
                : 'border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <feature.icon className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">{feature.name}</div>
              <div className="text-xs opacity-75">{feature.description}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {features.find(f => f.id === activeFeature)?.demo}
      </div>
    </div>
  );
};

// Demo Components
const MarketWatchDemo: React.FC = () => (
  <ProfessionalCard className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Market Watch Demo</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-sm text-slate-400">Tracked Competitors</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">8</div>
          <div className="text-sm text-slate-400">Price Changes</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-sm text-slate-400">New Services</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-white">Recent Changes</h4>
        {[
          { competitor: 'Brooklyn Pizza Co', change: 'Increased prices by $2.50', impact: 'High' },
          { competitor: 'Green Clean Services', change: 'Launched mobile app', impact: 'Medium' },
          { competitor: 'Elite Fitness', change: 'Added personal training', impact: 'Low' }
        ].map((change, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">{change.competitor}</div>
              <div className="text-sm text-slate-400">{change.change}</div>
            </div>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
              {change.impact}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  </ProfessionalCard>
);

const ReputationDemo: React.FC = () => (
  <ProfessionalCard className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Reputation Management Demo</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">4.6</div>
          <div className="text-sm text-slate-400">Avg Rating</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">127</div>
          <div className="text-sm text-slate-400">Total Reviews</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">89%</div>
          <div className="text-sm text-slate-400">Response Rate</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">+12</div>
          <div className="text-sm text-slate-400">This Month</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-white">Recent Reviews</h4>
        {[
          { rating: 5, content: 'Excellent service! Very professional and quick response time.', platform: 'Google', sentiment: 'positive' },
          { rating: 4, content: 'Great experience overall. Will definitely use again.', platform: 'Yelp', sentiment: 'positive' },
          { rating: 2, content: 'Poor service quality. Very disappointed with the experience.', platform: 'Google', sentiment: 'negative' }
        ].map((review, index) => (
          <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} />
                ))}
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                {review.platform}
              </Badge>
            </div>
            <p className="text-sm text-slate-300 mb-2">{review.content}</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={review.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
              >
                {review.sentiment}
              </Badge>
              <Button size="sm" variant="outline" className="text-xs">
                AI Respond
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </ProfessionalCard>
);

const AnalyticsDemo: React.FC = () => (
  <ProfessionalCard className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Business Intelligence Demo</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">73</div>
          <div className="text-sm text-slate-400">Revenue-at-Risk</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">45</div>
          <div className="text-sm text-slate-400">Threat Rating</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">+28</div>
          <div className="text-sm text-slate-400">Sentiment Impact</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-white">AI Insights</h4>
        {[
          { title: 'Pricing Optimization Opportunity', priority: 'High', confidence: 85 },
          { title: 'Competitor Service Expansion Detected', priority: 'Medium', confidence: 72 },
          { title: 'Negative Review Trend Identified', priority: 'High', confidence: 90 }
        ].map((insight, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">{insight.title}</div>
              <div className="text-sm text-slate-400">{insight.confidence}% confidence</div>
            </div>
            <Badge 
              variant="secondary" 
              className={insight.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}
            >
              {insight.priority}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  </ProfessionalCard>
);

const AutomationDemo: React.FC = () => (
  <ProfessionalCard className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Automation & Alerts Demo</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">5</div>
          <div className="text-sm text-slate-400">Active Alerts</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-sm text-slate-400">Playbooks</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">89%</div>
          <div className="text-sm text-slate-400">Success Rate</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <div className="text-2xl font-bold text-white">24/7</div>
          <div className="text-sm text-slate-400">Monitoring</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-white mb-3">Active Alerts</h4>
          <div className="space-y-2">
            {[
              { title: 'Competitor Price Increase', severity: 'High', time: '2 min ago' },
              { title: 'Negative Review Posted', severity: 'Medium', time: '15 min ago' },
              { title: 'New Service Launch Detected', severity: 'Low', time: '1 hour ago' }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                <div>
                  <div className="text-sm font-medium text-white">{alert.title}</div>
                  <div className="text-xs text-slate-400">{alert.time}</div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={alert.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-white mb-3">Active Playbooks</h4>
          <div className="space-y-2">
            {[
              { name: 'Price Change Response', status: 'Active', triggers: 3 },
              { name: 'Review Response', status: 'Active', triggers: 12 },
              { name: 'Competitor Alert', status: 'Paused', triggers: 0 }
            ].map((playbook, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                <div>
                  <div className="text-sm font-medium text-white">{playbook.name}</div>
                  <div className="text-xs text-slate-400">{playbook.triggers} triggers today</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${playbook.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="text-xs text-slate-400">{playbook.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </ProfessionalCard>
);

// Loading Screen Component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
      />
      <h2 className="text-2xl font-bold text-white mb-2">Initializing MozaWave Enterprise</h2>
      <p className="text-slate-400">Loading platform services and data...</p>
    </div>
  </div>
);

export default EnterpriseDemoPage;

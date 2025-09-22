// Demo Launcher Page
// Choose between different demo experiences

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Target, 
  Eye, 
  MessageCircle, 
  BarChart3, 
  Globe,
  Clock,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

import { DemoWalkthrough } from '@/components/demo/DemoWalkthrough';
import { CompleteProductDemo } from '@/components/demo/CompleteProductDemo';

interface DemoOption {
  id: string;
  title: string;
  description: string;
  duration: string;
  audience: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
  features: string[];
  bestFor: string;
}

export const DemoLauncherPage: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = React.useState<string | null>(null);

  const demoOptions: DemoOption[] = [
    {
      id: 'complete-product',
      title: 'Complete Product Demo',
      description: 'Comprehensive showcase of all three MozaWave products with clear value propositions',
      duration: '8-10 minutes',
      audience: 'Prospects, Investors, Stakeholders',
      icon: <Target className="h-8 w-8" />,
      color: 'blue',
      features: [
        'All three products showcased',
        'Clear value propositions',
        'Pain point → Solution → Outcome',
        'Proven metrics and results',
        'Auto-play capabilities'
      ],
      bestFor: 'Full product presentation',
      component: <CompleteProductDemo onComplete={() => setSelectedDemo(null)} />
    },
    {
      id: 'walkthrough',
      title: 'Guided Walkthrough Demo',
      description: 'Step-by-step walkthrough following the exact presentation order for screen sharing',
      duration: '6-7 minutes',
      audience: 'Sales Calls, Screen Sharing',
      icon: <Play className="h-8 w-8" />,
      color: 'green',
      features: [
        'Exact presentation order',
        'Talking points included',
        'Timer controls',
        'Professional pacing',
        'Screen-share optimized'
      ],
      bestFor: 'Sales presentations and demos',
      component: <DemoWalkthrough onComplete={() => setSelectedDemo(null)} />
    },
    {
      id: 'market-watch',
      title: 'Market Watch Focus Demo',
      description: 'Deep dive into competitor intelligence and pricing insights',
      duration: '3-4 minutes',
      audience: 'Competitive Intelligence Focus',
      icon: <Eye className="h-8 w-8" />,
      color: 'purple',
      features: [
        'Competitor pricing examples',
        'New service detection',
        'Ad spend intelligence',
        'Revenue recommendations'
      ],
      bestFor: 'Competitor intelligence focus',
      component: <MarketWatchFocusDemo onComplete={() => setSelectedDemo(null)} />
    },
    {
      id: 'reputation',
      title: 'Reputation Manager Demo',
      description: 'Showcase AI-powered review management and customer engagement',
      duration: '3-4 minutes',
      audience: 'Reputation Management Focus',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'green',
      features: [
        'AI review responses',
        'Tone-matched replies',
        'Review request campaigns',
        'Rating improvement tracking'
      ],
      bestFor: 'Reputation management focus',
      component: <ReputationFocusDemo onComplete={() => setSelectedDemo(null)} />
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence Demo',
      description: 'Unified dashboard and AI-powered insights demonstration',
      duration: '3-4 minutes',
      audience: 'Business Intelligence Focus',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'purple',
      features: [
        'Unified dashboard',
        'AI insights engine',
        'Anomaly detection',
        'Revenue forecasting'
      ],
      bestFor: 'Business intelligence focus',
      component: <BusinessIntelligenceFocusDemo onComplete={() => setSelectedDemo(null)} />
    }
  ];

  if (selectedDemo) {
    const selectedOption = demoOptions.find(option => option.id === selectedDemo);
    if (selectedOption) {
      return selectedOption.component;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <Play className="h-12 w-12 text-blue-400" />
              <h1 className="text-4xl font-bold">MozaWave Demo Center</h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Choose the perfect demo experience for your audience. From comprehensive product showcases 
              to focused feature demonstrations, we have the right demo for every situation.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Demo Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ProfessionalCard 
                className="h-full p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedDemo(option.id)}
              >
                <div className="space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${option.color}-500/20`}>
                      <div className={`h-8 w-8 text-${option.color}-400`}>
                        {option.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-slate-600/50">
                          {option.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm">{option.description}</p>

                  {/* Audience */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">{option.audience}</span>
                  </div>

                  {/* Best For */}
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-sm font-medium text-white mb-2">Best For:</div>
                    <div className="text-sm text-slate-300">{option.bestFor}</div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="text-sm font-medium text-white mb-2">Key Features:</div>
                    <ul className="space-y-1">
                      {option.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${option.color}-400`} />
                          {feature}
                        </li>
                      ))}
                      {option.features.length > 3 && (
                        <li className="text-sm text-slate-400">
                          +{option.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-slate-600">
                    <Button 
                      className={`w-full bg-${option.color}-600 hover:bg-${option.color}-700`}
                      onClick={() => setSelectedDemo(option.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Demo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </ProfessionalCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Start Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <ProfessionalCard className="p-8 text-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Not Sure Which Demo to Choose?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Start with the Complete Product Demo for a full overview, or use our Quick Start Guide 
                to find the perfect demo for your specific needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ProfessionalButton 
                  size="lg" 
                  className="btn-vibrant-primary"
                  onClick={() => setSelectedDemo('complete-product')}
                >
                  <Target className="h-5 w-5 mr-2" />
                  Start Complete Demo
                </ProfessionalButton>
                <ProfessionalButton 
                  size="lg" 
                  variant="outline"
                  onClick={() => setSelectedDemo('walkthrough')}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Guided Walkthrough
                </ProfessionalButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-400">Total Demo Time</div>
                  <div className="text-lg font-semibold text-white">6-10 minutes</div>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-400">Auto-Play Available</div>
                  <div className="text-lg font-semibold text-white">Yes</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-400">Languages</div>
                  <div className="text-lg font-semibold text-white">English & Spanish</div>
                </div>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>
      </div>
    </div>
  );
};

// Placeholder components for focused demos
const MarketWatchFocusDemo: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <Eye className="h-16 w-16 text-blue-400 mx-auto" />
      <h2 className="text-2xl font-bold">Market Watch Focus Demo</h2>
      <p className="text-slate-400">Coming soon...</p>
      <Button onClick={onComplete}>Back to Demo Center</Button>
    </div>
  </div>
);

const ReputationFocusDemo: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <MessageCircle className="h-16 w-16 text-green-400 mx-auto" />
      <h2 className="text-2xl font-bold">Reputation Manager Focus Demo</h2>
      <p className="text-slate-400">Coming soon...</p>
      <Button onClick={onComplete}>Back to Demo Center</Button>
    </div>
  </div>
);

const BusinessIntelligenceFocusDemo: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <BarChart3 className="h-16 w-16 text-purple-400 mx-auto" />
      <h2 className="text-2xl font-bold">Business Intelligence Focus Demo</h2>
      <p className="text-slate-400">Coming soon...</p>
      <Button onClick={onComplete}>Back to Demo Center</Button>
    </div>
  </div>
);

export default DemoLauncherPage;

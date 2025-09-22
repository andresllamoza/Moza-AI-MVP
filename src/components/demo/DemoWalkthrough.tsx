// MozaWave Demo Walkthrough Component
// Professional demo flow following exact presentation order

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
  RotateCcw
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface DemoStep {
  id: string;
  title: string;
  duration: number; // seconds
  description: string;
  component: React.ReactNode;
  talkingPoints: string[];
}

interface DemoWalkthroughProps {
  onComplete?: () => void;
  autoPlay?: boolean;
  showControls?: boolean;
}

export const DemoWalkthrough: React.FC<DemoWalkthroughProps> = ({
  onComplete,
  autoPlay = false,
  showControls = true
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 'dashboard-snapshot',
      title: 'Dashboard Snapshot',
      duration: 30,
      description: 'One clean panel showing everything at a glance',
      talkingPoints: [
        'This is your command center - everything in one place',
        'See all your competitors monitored with their logos',
        'Rating trend shows your reputation improvement over 30 days',
        'Quick alerts highlight urgent actions needed'
      ],
      component: <DashboardSnapshotDemo />
    },
    {
      id: 'market-watch',
      title: 'Market Watch',
      duration: 120,
      description: 'Competitor intelligence and pricing insights',
      talkingPoints: [
        'Watch how we caught a competitor raising prices from $120 to $130',
        'New service flags alert you to market changes immediately',
        'Ad activity pulse shows when competitors increase spending',
        'Turn intelligence into revenue opportunities'
      ],
      component: <MarketWatchDemo />
    },
    {
      id: 'reputation-manager',
      title: 'Reputation Manager',
      duration: 120,
      description: 'AI-powered review management and customer engagement',
      talkingPoints: [
        'AI automatically suggests responses to reviews',
        'Tone-matched responses maintain your brand voice',
        'Automated email campaigns to request reviews from happy customers',
        'Save 10+ hours per week on reputation management'
      ],
      component: <ReputationManagerDemo />
    },
    {
      id: 'weekly-digest',
      title: 'Weekly Digest Email',
      duration: 60,
      description: 'Automated intelligence delivered to your inbox',
      talkingPoints: [
        'This digest comes to your inbox automatically every Monday',
        'Prioritized insights with actionable recommendations',
        'Revenue opportunities highlighted for quick action',
        'Never miss important competitive changes again'
      ],
      component: <WeeklyDigestDemo />
    },
    {
      id: 'closing-dashboard',
      title: 'Closing Dashboard',
      duration: 30,
      description: 'Everything in one place - simple and powerful',
      talkingPoints: [
        'Everything in one place - no more scattered tools',
        'AI does the heavy lifting while you focus on your business',
        'Turn competitive intelligence into revenue growth',
        'Ready to get started?'
      ],
      component: <ClosingDashboardDemo />
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < demoSteps.length) {
      setTimeRemaining(demoSteps[currentStep].duration);
      
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
            } else {
              setIsPlaying(false);
              onComplete?.();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, demoSteps.length, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(demoSteps[currentStep + 1].duration);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeRemaining(demoSteps[currentStep - 1].duration);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setTimeRemaining(demoSteps[0].duration);
    setIsPlaying(false);
  };

  const currentStepData = demoSteps[currentStep];
  const progress = ((currentStep + 1) / demoSteps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Demo Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-bold">MozaWave Demo Walkthrough</h1>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                {currentStep + 1} of {demoSteps.length}
              </Badge>
            </div>
            
            {showControls && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestart}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentStep === demoSteps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-slate-700">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Step Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-xl text-slate-400">{currentStepData.description}</p>
              
              {/* Timer */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-lg font-semibold">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <Progress value={(timeRemaining / currentStepData.duration) * 100} className="w-32" />
              </div>
            </div>

            {/* Talking Points */}
            <ProfessionalCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Key Talking Points
              </h3>
              <ul className="space-y-2">
                {currentStepData.talkingPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
            </ProfessionalCard>

            {/* Demo Component */}
            <div className="min-h-[600px]">
              {currentStepData.component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Dashboard Snapshot Demo Component
const DashboardSnapshotDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <ProfessionalCard className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Competitors Monitored */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              Competitors Monitored
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Brooklyn Pizza Co', logo: '🍕', status: 'active' },
                { name: 'Green Clean Services', logo: '🧽', status: 'active' },
                { name: 'Elite Fitness', logo: '💪', status: 'active' },
                { name: 'Sunset Salon', logo: '💇‍♀️', status: 'active' }
              ].map((competitor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-2xl">{competitor.logo}</span>
                  <div className="flex-1">
                    <div className="font-medium text-white">{competitor.name}</div>
                    <div className="text-sm text-green-400">✓ Monitoring Active</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Trend */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Rating Trend (30 Days)
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">4.2 → 4.6</div>
                <div className="text-sm text-slate-400">+0.4 star improvement</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Week 1</span>
                  <span>4.2 ⭐</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Week 2</span>
                  <span>4.3 ⭐</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Week 3</span>
                  <span>4.5 ⭐</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-green-400">
                  <span>Week 4</span>
                  <span>4.6 ⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Alerts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Quick Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <div className="font-medium text-orange-400">🚨 Price Alert</div>
                <div className="text-sm text-slate-300">2 competitors raised prices this week</div>
              </div>
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <div className="font-medium text-blue-400">📱 New Service</div>
                <div className="text-sm text-slate-300">Brooklyn Pizza added delivery</div>
              </div>
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="font-medium text-green-400">⭐ Review Alert</div>
                <div className="text-sm text-slate-300">5 new 5-star reviews received</div>
              </div>
            </div>
          </div>
        </div>
      </ProfessionalCard>
    </div>
  );
};

// Market Watch Demo Component
const MarketWatchDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Competitor Pricing Example */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          Competitor Pricing Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍕</span>
                  <div>
                    <div className="font-medium text-white">Brooklyn Pizza Co</div>
                    <div className="text-sm text-slate-400">Signature Pizza</div>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  Price Increase
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-red-400">$120</div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
                <div className="text-2xl font-bold text-white">$130</div>
              </div>
              <div className="text-sm text-slate-400">15% increase detected 2 hours ago</div>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="font-medium text-blue-400 mb-2">💡 AI Recommendation</div>
              <div className="text-sm text-slate-300">
                Consider raising your prices by $8-12 to maintain competitive positioning. 
                Market analysis shows 87% confidence in price acceptance.
              </div>
              <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                View Pricing Strategy
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$2,400</div>
              <div className="text-sm text-slate-400">Potential Monthly Revenue Increase</div>
            </div>
            <Progress value={87} className="h-2" />
            <div className="text-sm text-center text-slate-400">87% Confidence Score</div>
          </div>
        </div>
      </ProfessionalCard>

      {/* New Service Detection */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-400" />
          New Service Detection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { service: 'Mobile App Booking', competitor: 'Green Clean Services', impact: 'High' },
            { service: 'Contactless Delivery', competitor: 'Brooklyn Pizza Co', impact: 'Medium' },
            { service: 'Virtual Consultations', competitor: 'Sunset Salon', impact: 'High' }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className={
                  item.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                  item.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }>
                  {item.impact} Impact
                </Badge>
                <div className="text-sm text-slate-400">2 hours ago</div>
              </div>
              <div className="font-medium text-white mb-1">{item.service}</div>
              <div className="text-sm text-slate-400">by {item.competitor}</div>
            </div>
          ))}
        </div>
      </ProfessionalCard>

      {/* Ad Activity Pulse */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Ad Activity Pulse
        </h3>
        <div className="space-y-4">
          {[
            { competitor: 'Elite Fitness', platform: 'Google Ads', change: '+40%', status: 'increasing' },
            { competitor: 'Brooklyn Pizza Co', platform: 'Facebook Ads', change: '+25%', status: 'increasing' },
            { competitor: 'Green Clean Services', platform: 'Instagram Ads', change: '-15%', status: 'decreasing' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'increasing' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="font-medium text-white">{item.competitor}</div>
                  <div className="text-sm text-slate-400">{item.platform}</div>
                </div>
              </div>
              <div className={`text-lg font-bold ${
                item.status === 'increasing' ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </ProfessionalCard>
    </div>
  );
};

// Reputation Manager Demo Component
const ReputationManagerDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Auto-Response Suggestions */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-400" />
          AI Auto-Response Suggestions
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-400">Google Review</span>
              </div>
              <div className="text-sm text-slate-300 mb-3">
                "Excellent service! The team was professional and delivered exactly what they promised. Highly recommend!"
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="font-medium text-green-400 mb-2">🤖 AI Suggested Response</div>
                <div className="text-sm text-slate-300">
                  "Thank you so much for your wonderful feedback! We're thrilled to hear about your positive experience and really appreciate you taking the time to share it. We look forward to serving you again soon!"
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-slate-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-400">Yelp Review</span>
              </div>
              <div className="text-sm text-slate-300 mb-3">
                "Had some issues with the service. Not quite what I expected."
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <div className="font-medium text-orange-400 mb-2">🤖 AI Suggested Response</div>
                <div className="text-sm text-slate-300">
                  "Thank you for bringing this to our attention. We sincerely apologize for not meeting your expectations and would like to make this right. Please contact us directly at (555) 123-4567 so we can address your concerns personally."
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfessionalCard>

      {/* Tone-Matched Toggle */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-purple-400" />
          Tone-Matched Responses
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Response Tone:</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Professional
              </Button>
              <Button size="sm" variant="outline">
                Friendly
              </Button>
              <Button size="sm" variant="outline">
                Conversational
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <div className="text-sm text-slate-300">
              "Thank you for your feedback. We appreciate you taking the time to share your experience with us and will use your comments to continuously improve our services."
            </div>
            <div className="text-xs text-slate-500 mt-2">Professional tone selected</div>
          </div>
        </div>
      </ProfessionalCard>

      {/* Review Request Campaign */}
      <ProfessionalCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-green-400" />
          Automated Review Request Campaign
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-white">Email Campaign: "Happy Customer Follow-up"</div>
              <Badge className="bg-green-500/20 text-green-400">Active</Badge>
            </div>
            <div className="text-sm text-slate-400 mb-3">
              Sent to customers with 5-star internal ratings within 24 hours of service completion
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="font-medium text-green-400 mb-2">📧 Sample Email</div>
              <div className="text-sm text-slate-300 space-y-2">
                <div><strong>Subject:</strong> How was your recent service? We'd love your feedback!</div>
                <div><strong>Hi [Customer Name],</strong></div>
                <div>We hope you're enjoying your [service] from [date]! We'd love to hear about your experience.</div>
                <div>If you had a great experience, would you mind leaving us a quick review? It really helps other customers find us and helps us continue providing excellent service.</div>
                <div><strong>[Review Link]</strong></div>
                <div>Thank you for your business!</div>
                <div><strong>[Business Name]</strong></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">95%</div>
              <div className="text-sm text-slate-400">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-sm text-slate-400">Reviews Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">4.6</div>
              <div className="text-sm text-slate-400">Average Rating</div>
            </div>
          </div>
        </div>
      </ProfessionalCard>
    </div>
  );
};

// Weekly Digest Email Demo Component
const WeeklyDigestDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <ProfessionalCard className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Email Header */}
          <div className="border-b border-slate-600 pb-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">📊 Your Weekly Competitive Intelligence Digest</h3>
              <Badge className="bg-blue-500/20 text-blue-400">Monday, 9:00 AM</Badge>
            </div>
            <div className="text-sm text-slate-400">
              <strong>From:</strong> MozaWave Intelligence Team &lt;insights@mozawave.com&gt;
            </div>
            <div className="text-sm text-slate-400">
              <strong>To:</strong> business@yoursite.com
            </div>
          </div>

          {/* Email Content */}
          <div className="space-y-6">
            <div>
              <div className="text-white mb-2">Hi [Business Owner],</div>
              <div className="text-slate-300">
                Here's what your competitors were up to this week and how to turn it into revenue opportunities:
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="font-medium text-blue-400 mb-2">📈 This Week's Summary</div>
              <div className="text-slate-300">
                We detected 8 competitive changes across your tracked competitors. Here are the key opportunities:
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">🎯 Key Insights This Week:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-lg">🏷️</span>
                  <div>
                    <div className="font-medium text-white">Brooklyn Pizza Co raised prices by 15%</div>
                    <div className="text-sm text-green-400">Revenue opportunity: $2,000+/month</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-lg">📱</span>
                  <div>
                    <div className="font-medium text-white">Green Clean Services launched mobile app</div>
                    <div className="text-sm text-blue-400">Market gap: Consider mobile booking</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-lg">📢</span>
                  <div>
                    <div className="font-medium text-white">Elite Fitness increased ad spend by 40%</div>
                    <div className="text-sm text-purple-400">Marketing opportunity: Boost your presence</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-lg">⭐</span>
                  <div>
                    <div className="font-medium text-white">3 new negative reviews for competitors</div>
                    <div className="text-sm text-yellow-400">Reputation opportunity: Highlight your strengths</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">🚀 Recommended Actions:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Review your pricing strategy for signature items</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Evaluate mobile app development for booking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Increase your advertising presence in key areas</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Update your marketing to highlight competitive advantages</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-white mb-2">
                Want to dive deeper into any of these opportunities? 
                <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">Login to your dashboard</a> or 
                <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">book a strategy call</a> with our team.
              </div>
              <div className="text-slate-400 text-sm mt-2">
                Best regards,<br />
                The MozaWave Intelligence Team
              </div>
            </div>
          </div>
        </div>
      </ProfessionalCard>

      {/* Automation Highlight */}
      <ProfessionalCard className="p-6 bg-green-500/10 border-green-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="h-6 w-6 text-green-400" />
          <h3 className="text-lg font-semibold text-green-400">Automated Intelligence Delivery</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-slate-300">This digest comes to your inbox automatically every Monday at 9:00 AM</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-slate-300">AI analyzes competitor data and prioritizes insights by revenue impact</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-slate-300">Personalized recommendations based on your business type and goals</span>
          </div>
        </div>
      </ProfessionalCard>
    </div>
  );
};

// Closing Dashboard Demo Component
const ClosingDashboardDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <ProfessionalCard className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="h-12 w-12 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Everything in One Place</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-700/50 rounded-lg">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Competitor Intelligence</h3>
              <p className="text-sm text-slate-400">Track unlimited competitors across 10+ platforms</p>
            </div>
            
            <div className="p-6 bg-slate-700/50 rounded-lg">
              <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">AI Review Management</h3>
              <p className="text-sm text-slate-400">Automatically respond and generate more reviews</p>
            </div>
            
            <div className="p-6 bg-slate-700/50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Business Intelligence</h3>
              <p className="text-sm text-slate-400">Unified insights driving revenue growth</p>
            </div>
          </div>
          
          <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">AI Does the Heavy Lifting</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-slate-400">Automated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-sm text-slate-400">Hours Saved/Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$2,400</div>
                <div className="text-sm text-slate-400">Avg Revenue Increase</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0.4</div>
                <div className="text-sm text-slate-400">Star Rating Boost</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Ready to Get Started?</h3>
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
            </div>
          </div>
        </div>
      </ProfessionalCard>
    </div>
  );
};

export default DemoWalkthrough;

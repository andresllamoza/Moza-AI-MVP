// MozaWave Copy System Integration Component
// Provides copy, AI reasoning, and messaging throughout the platform

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Eye,
  MessageCircle,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  Users,
  Clock,
  Zap,
  Target,
  Shield,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

import {
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
} from '@/copy/mozawave-copy-system';

import { aiReasoningEngine } from '@/services/ai-reasoning-engine';
import { intelligentAlertSystem } from '@/services/intelligent-alert-system';

interface MozaWaveCopySystemProps {
  service: 'market-watch' | 'reputation' | 'business-intelligence';
  view: 'homepage' | 'service-page' | 'dashboard' | 'demo';
  businessContext?: {
    name: string;
    industry: string;
    location: string;
    size: 'small' | 'medium' | 'large';
  };
}

export const MozaWaveCopySystem: React.FC<MozaWaveCopySystemProps> = ({
  service,
  view,
  businessContext
}) => {
  const [activeInsight, setActiveInsight] = useState<any>(null);
  const [showAIReasoning, setShowAIReasoning] = useState(false);
  const [copyData, setCopyData] = useState<any>(null);

  useEffect(() => {
    initializeCopySystem();
  }, [service, view, businessContext]);

  const initializeCopySystem = async () => {
    try {
      // Initialize AI reasoning engine with business context
      if (businessContext) {
        await aiReasoningEngine.initialize({
          businessId: 'demo-business',
          industry: businessContext.industry,
          location: businessContext.location,
          businessSize: businessContext.size,
          currentMetrics: {
            revenue: 50000,
            rating: 4.2,
            reviewCount: 127,
            marketShare: 15
          },
          competitorData: [],
          reviewData: [],
          historicalData: []
        });
      }

      // Set up alert personalization
      if (businessContext) {
        await intelligentAlertSystem.setPersonalizationSettings('demo-business', {
          businessName: businessContext.name,
          industry: businessContext.industry,
          location: businessContext.location,
          businessSize: businessContext.size,
          preferredTone: 'professional',
          alertPreferences: {
            email: true,
            sms: true,
            slack: true,
            dashboard: true
          },
          urgencyThresholds: {
            low: 40,
            medium: 60,
            high: 80,
            critical: 90
          }
        });
      }

      // Load appropriate copy data
      const data = loadCopyData();
      setCopyData(data);

    } catch (error) {
      console.error('Failed to initialize copy system:', error);
    }
  };

  const loadCopyData = () => {
    switch (service) {
      case 'market-watch':
        return {
          copy: view === 'homepage' ? MarketWatchCopy.homepage : MarketWatchCopy.servicePage,
          dashboard: MarketWatchCopy.dashboard,
          reasoning: AIReasoningFlows.marketWatch
        };
      case 'reputation':
        return {
          copy: view === 'homepage' ? ReputationCopy.homepage : ReputationCopy.servicePage,
          dashboard: ReputationCopy.dashboard,
          reasoning: AIReasoningFlows.reputation
        };
      case 'business-intelligence':
        return {
          copy: view === 'homepage' ? BusinessIntelligenceCopy.homepage : BusinessIntelligenceCopy.servicePage,
          dashboard: BusinessIntelligenceCopy.dashboard,
          reasoning: AIReasoningFlows.businessIntelligence
        };
      default:
        return null;
    }
  };

  if (!copyData) {
    return <LoadingCopy />;
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {view === 'homepage' && (
          <HomepageCopy 
            copy={copyData.copy} 
            businessContext={businessContext}
            onShowReasoning={() => setShowAIReasoning(true)}
          />
        )}

        {view === 'service-page' && (
          <ServicePageCopy 
            copy={copyData.copy} 
            businessContext={businessContext}
            reasoning={copyData.reasoning}
          />
        )}

        {view === 'dashboard' && (
          <DashboardCopy 
            dashboard={copyData.dashboard}
            businessContext={businessContext}
            onInsightClick={setActiveInsight}
          />
        )}

        {view === 'demo' && (
          <DemoCopy 
            service={service}
            copy={copyData.copy}
            reasoning={copyData.reasoning}
            businessContext={businessContext}
          />
        )}

        {/* AI Reasoning Modal */}
        {showAIReasoning && (
          <AIReasoningModal 
            reasoning={copyData.reasoning}
            onClose={() => setShowAIReasoning(false)}
          />
        )}

        {/* Insight Details Modal */}
        {activeInsight && (
          <InsightDetailsModal 
            insight={activeInsight}
            onClose={() => setActiveInsight(null)}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

// Homepage Copy Component
const HomepageCopy: React.FC<{
  copy: any;
  businessContext?: any;
  onShowReasoning: () => void;
}> = ({ copy, businessContext, onShowReasoning }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      {/* Hero Section */}
      <div className="space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {copy.headline}
        </h1>
        
        <h2 className="text-3xl font-semibold text-white">
          {copy.subheadline}
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {copy.description}
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ProfessionalButton
          size="lg"
          className="btn-vibrant-primary text-lg px-8 py-4"
        >
          {copy.cta.primary}
        </ProfessionalButton>
        
        <ProfessionalButton
          size="lg"
          variant="outline"
          className="btn-vibrant-secondary text-lg px-8 py-4"
        >
          {copy.cta.secondary}
        </ProfessionalButton>
      </div>

      {/* Trust Signals */}
      <div className="flex flex-wrap justify-center gap-6">
        {copy.trustSignals.map((signal: string, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-400" />
            {signal}
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {copy.benefits.map((benefit: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <ProfessionalCard className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <p className="text-slate-300">{benefit}</p>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* AI Reasoning CTA */}
      <div className="mt-12">
        <ProfessionalCard className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            See How AI Powers These Insights
          </h3>
          <p className="text-slate-400 mb-4">
            Discover the intelligent reasoning behind every recommendation
          </p>
          <Button
            variant="outline"
            onClick={onShowReasoning}
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
          >
            <Brain className="h-4 w-4 mr-2" />
            View AI Reasoning
          </Button>
        </ProfessionalCard>
      </div>
    </motion.div>
  );
};

// Service Page Copy Component
const ServicePageCopy: React.FC<{
  copy: any;
  businessContext?: any;
  reasoning: any;
}> = ({ copy, businessContext, reasoning }) => {
  const [selectedReasoning, setSelectedReasoning] = useState<any>(null);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">{copy.headline}</h1>
        <h2 className="text-2xl text-muted-foreground">{copy.subheadline}</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">{copy.description}</p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {copy.benefits.map((benefit: string, index: number) => (
          <ProfessionalCard key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  {benefit.split(':')[0]}
                </h3>
                <p className="text-slate-400 text-sm">
                  {benefit.split(':')[1]}
                </p>
              </div>
            </div>
          </ProfessionalCard>
        ))}
      </div>

      {/* AI Reasoning Examples */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          AI Reasoning Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(reasoning).map((flow: any, index: number) => (
            <ProfessionalCard 
              key={index} 
              className="p-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedReasoning(flow)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <h4 className="font-semibold text-white">{flow.title}</h4>
                </div>
                <p className="text-sm text-slate-400">{flow.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                    {flow.confidence}% confidence
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-blue-400">
                    View Details
                  </Button>
                </div>
              </div>
            </ProfessionalCard>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <ProfessionalCard className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Business?
        </h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Join hundreds of businesses using AI-powered intelligence to stay ahead of competitors
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ProfessionalButton size="lg" className="btn-vibrant-primary">
            {copy.cta.primary}
          </ProfessionalButton>
          <ProfessionalButton size="lg" variant="outline">
            {copy.cta.secondary}
          </ProfessionalButton>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {copy.trustSignals.map((signal: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-400" />
              {signal}
            </div>
          ))}
        </div>
      </ProfessionalCard>

      {/* Reasoning Details Modal */}
      {selectedReasoning && (
        <ReasoningDetailsModal 
          reasoning={selectedReasoning}
          onClose={() => setSelectedReasoning(null)}
        />
      )}
    </div>
  );
};

// Dashboard Copy Component
const DashboardCopy: React.FC<{
  dashboard: any;
  businessContext?: any;
  onInsightClick: (insight: any) => void;
}> = ({ dashboard, businessContext, onInsightClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{dashboard.overview.title}</h2>
          <p className="text-slate-400">{dashboard.overview.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(dashboard.overview.metrics).map(([key, metric]: [string, any]) => (
          <ProfessionalCard key={key} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">{metric}</h3>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="h-4 w-4 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{TooltipExplanations.aiInsights.confidence}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {key === 'revenueAtRisk' ? '73%' : 
               key === 'competitiveThreat' ? '45%' :
               key === 'sentimentImpact' ? '+28%' : '12'}
            </div>
            <Progress value={key === 'revenueAtRisk' ? 73 : 45} className="h-2" />
          </ProfessionalCard>
        ))}
      </div>

      {/* Alerts Section */}
      <ProfessionalCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{dashboard.alerts.title}</h3>
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">
            3 Active
          </Badge>
        </div>
        <p className="text-sm text-slate-400 mb-4">{dashboard.alerts.subtitle}</p>
        
        <div className="space-y-3">
          {AlertTemplates.slice(0, 3).map((alert, index) => (
            <div key={index} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={
                      alert.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-slate-400">2 min ago</span>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{alert.message}</p>
                  <p className="text-xs text-blue-400 mb-3">{alert.reasoning}</p>
                  <Button size="sm" variant="outline" className="text-xs">
                    {alert.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ProfessionalCard>

      {/* Insights Section */}
      <ProfessionalCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{dashboard.insights.title}</h3>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
            5 New
          </Badge>
        </div>
        <p className="text-sm text-slate-400 mb-4">{dashboard.insights.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(AIReasoningFlows.businessIntelligence).map((insight: any, index: number) => (
            <div 
              key={index} 
              className="p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
              onClick={() => onInsightClick(insight)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  {insight.confidence}%
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mb-3">{insight.description}</p>
              <div className="flex items-center gap-2">
                <Badge className={
                  insight.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                  insight.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }>
                  {insight.priority}
                </Badge>
                <Button size="sm" variant="ghost" className="text-xs text-blue-400">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ProfessionalCard>
    </div>
  );
};

// Demo Copy Component
const DemoCopy: React.FC<{
  service: string;
  copy: any;
  reasoning: any;
  businessContext?: any;
}> = ({ service, copy, reasoning, businessContext }) => {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "AI Detects Competitor Change",
      description: "Our AI monitoring system detects a competitor price increase",
      content: "Brooklyn Pizza Co increased prices by 15% on signature items",
      reasoning: reasoning.priceChange
    },
    {
      title: "AI Analyzes Impact",
      description: "AI calculates revenue opportunity and threat level",
      content: "Analysis shows $2,000+ monthly revenue opportunity",
      reasoning: reasoning.priceChange
    },
    {
      title: "AI Generates Recommendation",
      description: "AI provides specific, actionable recommendation",
      content: "Consider raising prices by $1.50-$2.00 to maintain competitive positioning",
      reasoning: reasoning.priceChange
    },
    {
      title: "You Take Action",
      description: "Implement the recommendation and track results",
      content: "Revenue increased by $2,400 in the first month",
      reasoning: reasoning.priceChange
    }
  ];

  const startDemo = () => {
    setIsPlaying(true);
    setDemoStep(0);
    
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Live AI Demo</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          See how MozaWave's AI transforms competitive intelligence into actionable business decisions
        </p>
        <Button 
          onClick={startDemo} 
          disabled={isPlaying}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isPlaying ? (
            <>
              <Clock className="h-4 w-4 mr-2" />
              Demo Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Demo
            </>
          )}
        </Button>
      </div>

      {/* Demo Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ 
              opacity: index <= demoStep ? 1 : 0.5,
              scale: index === demoStep ? 1.05 : 0.9
            }}
            transition={{ duration: 0.3 }}
          >
            <ProfessionalCard className={`p-6 ${index === demoStep ? 'border-blue-500 bg-blue-500/10' : ''}`}>
              <div className="text-center space-y-4">
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                  index <= demoStep ? 'bg-blue-500' : 'bg-slate-600'
                }`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
                {index === demoStep && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-slate-700/50 rounded-lg"
                  >
                    <p className="text-sm text-white font-medium">{step.content}</p>
                  </motion.div>
                )}
              </div>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* AI Reasoning Display */}
      {demoStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProfessionalCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">AI Reasoning</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Analysis</h4>
                  <p className="text-sm text-slate-400">{demoSteps[demoStep].reasoning.analysis}</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Recommendation</h4>
                  <p className="text-sm text-slate-400">{demoSteps[demoStep].reasoning.recommendation}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Confidence</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={demoSteps[demoStep].reasoning.confidence} className="flex-1" />
                    <span className="text-sm text-white">{demoSteps[demoStep].reasoning.confidence}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Expected Outcome</h4>
                  <p className="text-sm text-slate-400">{demoSteps[demoStep].reasoning.expectedOutcome}</p>
                </div>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>
      )}
    </div>
  );
};

// Modal Components
const AIReasoningModal: React.FC<{
  reasoning: any;
  onClose: () => void;
}> = ({ reasoning, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">AI Reasoning Flows</h2>
        <Button variant="ghost" onClick={onClose} className="text-slate-400">
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {Object.entries(reasoning).map(([key, flow]: [string, any]) => (
          <ProfessionalCard key={key} className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{flow.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">Input</h4>
                <p className="text-sm text-slate-400">{flow.input}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Analysis</h4>
                <p className="text-sm text-slate-400">{flow.analysis}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Recommendation</h4>
                <p className="text-sm text-slate-400">{flow.recommendation}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Confidence</h4>
                <div className="flex items-center gap-2">
                  <Progress value={flow.confidence} className="flex-1" />
                  <span className="text-sm text-white">{flow.confidence}%</span>
                </div>
              </div>
            </div>
          </ProfessionalCard>
        ))}
      </div>
    </motion.div>
  </div>
);

const InsightDetailsModal: React.FC<{
  insight: any;
  onClose: () => void;
}> = ({ insight, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{insight.title}</h2>
        <Button variant="ghost" onClick={onClose} className="text-slate-400">
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
          <p className="text-slate-300">{insight.description}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">AI Reasoning</h3>
          <p className="text-slate-300">{insight.reasoning}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Expected Outcome</h3>
          <p className="text-slate-300">{insight.expectedOutcome}</p>
        </div>
        
        <div className="flex gap-4">
          <Button className="flex-1">Implement Recommendation</Button>
          <Button variant="outline" className="flex-1">Mark as Reviewed</Button>
        </div>
      </div>
    </motion.div>
  </div>
);

const ReasoningDetailsModal: React.FC<{
  reasoning: any;
  onClose: () => void;
}> = ({ reasoning, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">AI Reasoning Details</h2>
        <Button variant="ghost" onClick={onClose} className="text-slate-400">
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Input</h3>
            <p className="text-sm text-slate-400">{reasoning.input}</p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Analysis</h3>
            <p className="text-sm text-slate-400">{reasoning.analysis}</p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Prioritization</h3>
            <p className="text-sm text-slate-400">{reasoning.prioritization}</p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Confidence</h3>
            <div className="flex items-center gap-2">
              <Progress value={reasoning.confidence} className="flex-1" />
              <span className="text-sm text-white">{reasoning.confidence}%</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-white mb-2">Recommendation</h3>
          <p className="text-slate-300">{reasoning.recommendation}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-white mb-2">Expected Outcome</h3>
          <p className="text-slate-300">{reasoning.expectedOutcome}</p>
        </div>
      </div>
    </motion.div>
  </div>
);

const LoadingCopy: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <h3 className="text-lg font-semibold text-white mb-2">Loading Copy System</h3>
      <p className="text-slate-400">Preparing AI-powered content...</p>
    </div>
  </div>
);

export default MozaWaveCopySystem;

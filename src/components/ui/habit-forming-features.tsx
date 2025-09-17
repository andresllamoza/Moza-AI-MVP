import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfessionalCard } from './professional-card';
import { ProfessionalButton } from './professional-button';
import { 
  Mail, 
  Bell, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';

interface HabitFormingFeaturesProps {
  businessName: string;
  onEnableFeature: (feature: string) => void;
  onDisableFeature: (feature: string) => void;
}

export const HabitFormingFeatures: React.FC<HabitFormingFeaturesProps> = ({
  businessName,
  onEnableFeature,
  onDisableFeature
}) => {
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['morning_brief']);
  const [showMorningBrief, setShowMorningBrief] = useState(false);

  const features = [
    {
      id: 'morning_brief',
      name: 'Morning Intelligence Brief',
      description: 'Get 3 key insights delivered to your email every morning at 8 AM',
      icon: Mail,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
      benefits: ['Start each day with actionable intelligence', 'Never miss important opportunities', 'Stay ahead of competitors'],
      frequency: 'Daily at 8:00 AM',
      sample: {
        title: 'Your Morning Intelligence Brief',
        insights: [
          'Competitor launched new pricing strategy - opportunity to highlight your value',
          '3 new negative reviews for competitor - potential customer acquisition opportunity',
          'Industry trend emerging in your area - early adoption advantage available'
        ]
      }
    },
    {
      id: 'urgent_alerts',
      name: 'Urgent Opportunity Alerts',
      description: 'Get instant notifications when time-sensitive opportunities arise',
      icon: Bell,
      color: 'text-red-pink-400',
      bgColor: 'bg-red-pink-500/20',
      benefits: ['Never miss time-sensitive opportunities', 'Get instant competitive intelligence', 'Act on opportunities immediately'],
      frequency: 'Real-time',
      sample: {
        title: 'Urgent Alert: Competitor Price Drop',
        insights: [
          'Competitor just dropped prices by 20%',
          'Customer complaints about competitor service',
          'New competitor entering your market'
        ]
      }
    },
    {
      id: 'weekly_report',
      name: 'Weekly Competitive Intelligence',
      description: 'Comprehensive weekly report on competitor activities and market trends',
      icon: BarChart3,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20',
      benefits: ['Comprehensive market overview', 'Track competitor movements', 'Plan your weekly strategy'],
      frequency: 'Every Monday at 9:00 AM',
      sample: {
        title: 'Weekly Competitive Intelligence Report',
        insights: [
          'Competitor A launched new marketing campaign - analyze their strategy',
          'Market trend: 15% increase in demand for your services',
          'Customer sentiment analysis: 3 areas for improvement identified'
        ]
      }
    },
    {
      id: 'progress_dashboard',
      name: 'Progress Tracking Dashboard',
      description: 'Track your business improvement metrics and ROI over time',
      icon: TrendingUp,
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
      benefits: ['Visualize your business growth', 'Track ROI from insights', 'Identify what works best'],
      frequency: 'Updated in real-time',
      sample: {
        title: 'Your Progress This Month',
        insights: [
          'Revenue increased by 23% from implemented insights',
          'Customer satisfaction up 15% from service improvements',
          'Time saved: 12 hours per week from process optimizations'
        ]
      }
    }
  ];

  const toggleFeature = (featureId: string) => {
    if (enabledFeatures.includes(featureId)) {
      setEnabledFeatures(enabledFeatures.filter(id => id !== featureId));
      onDisableFeature(featureId);
    } else {
      setEnabledFeatures([...enabledFeatures, featureId]);
      onEnableFeature(featureId);
    }
  };

  const getSampleContent = (feature: typeof features[0]) => {
    return (
      <div className="mt-4 p-4 bg-dark-900 rounded-lg">
        <h5 className="text-white font-medium mb-3">{feature.sample.title}</h5>
        <div className="space-y-2">
          {feature.sample.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-warning-400 mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Build Daily Intelligence Habits</h3>
        <p className="text-muted-foreground">
          Turn MozaWave into your daily business intelligence routine
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isEnabled = enabledFeatures.includes(feature.id);
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProfessionalCard className={`p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900 ${
                isEnabled ? 'ring-2 ring-primary-500/50' : ''
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <ProfessionalButton
                    onClick={() => toggleFeature(feature.id)}
                    size="sm"
                    variant={isEnabled ? 'default' : 'outline'}
                    className={isEnabled ? 'btn-vibrant-primary' : 'btn-vibrant-secondary'}
                  >
                    {isEnabled ? 'Enabled' : 'Enable'}
                  </ProfessionalButton>
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2">{feature.name}</h4>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Benefits:</p>
                  <div className="space-y-1">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-success-400" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="text-white font-medium">{feature.frequency}</span>
                </div>
                
                {isEnabled && getSampleContent(feature)}
              </ProfessionalCard>
            </motion.div>
          );
        })}
      </div>

      {/* Morning Brief Preview */}
      {enabledFeatures.includes('morning_brief') && (
        <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Mail className="w-5 h-5 text-primary-400 mr-2" />
              Morning Brief Preview
            </h4>
            <ProfessionalButton
              onClick={() => setShowMorningBrief(!showMorningBrief)}
              size="sm"
              variant="outline"
              className="btn-vibrant-secondary"
            >
              {showMorningBrief ? 'Hide' : 'Show'} Preview
            </ProfessionalButton>
          </div>
          
          {showMorningBrief && (
            <div className="space-y-4">
              <div className="p-4 bg-dark-900 rounded-lg">
                <h5 className="text-white font-medium mb-3">Good morning! Here's your intelligence brief for {businessName}:</h5>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <p className="text-white font-medium">Competitor Analysis</p>
                      <p className="text-muted-foreground text-sm">Lucali Pizza launched a new "Summer Special" campaign. Opportunity to highlight your unique value proposition.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <p className="text-white font-medium">Customer Intelligence</p>
                      <p className="text-muted-foreground text-sm">3 new negative reviews for Di Fara Pizza. Potential customer acquisition opportunity in your area.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <p className="text-white font-medium">Market Trend</p>
                      <p className="text-muted-foreground text-sm">15% increase in demand for artisanal pizza in Brooklyn. Early adoption advantage available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ProfessionalCard>
      )}

      {/* Success Metrics */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 text-success-400 mr-2" />
          Your Intelligence Habits
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400 mb-1">{enabledFeatures.length}</div>
            <div className="text-sm text-muted-foreground">Active Features</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-400 mb-1">Daily</div>
            <div className="text-sm text-muted-foreground">Intelligence Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-400 mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Monitoring</div>
          </div>
        </div>
      </ProfessionalCard>
    </motion.div>
  );
};

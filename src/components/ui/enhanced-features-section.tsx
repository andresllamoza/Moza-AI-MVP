// Enhanced Features Section with FAANG-level design
// Scalable architecture and proven design patterns

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Eye,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Target,
  Brain,
  Globe,
  Users,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Award,
  Clock
} from 'lucide-react';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { Badge } from '@/components/ui/badge';

interface EnhancedFeaturesSectionProps {
  onFeatureClick?: (feature: string) => void;
}

export const EnhancedFeaturesSection: React.FC<EnhancedFeaturesSectionProps> = ({
  onFeatureClick
}) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const features = [
    {
      id: 'market-watch',
      title: 'MozaWave Market Watch',
      subtitle: 'Competitor Intelligence',
      description: 'Track unlimited competitors across 10+ platforms with real-time alerts and revenue opportunities.',
      icon: Eye,
      color: 'blue',
      metrics: {
        competitors: 'Unlimited',
        platforms: '10+',
        alerts: 'Real-time',
        accuracy: '95%'
      },
      benefits: [
        'Know when competitors raise prices (so you can too)',
        'Get alerts when they launch new services',
        'Track their ad spend and copy what works',
        'Weekly digest email with actionable insights'
      ],
      cta: 'Start Tracking Competitors',
      demo: 'Watch Demo'
    },
    {
      id: 'reputation',
      title: 'MozaWave Reputation',
      subtitle: 'AI Review Manager',
      description: 'AI automatically responds to reviews in your tone and generates more 5-star reviews.',
      icon: MessageCircle,
      color: 'green',
      metrics: {
        responseRate: '95%',
        ratingLift: '+0.5',
        timeSaved: '10+ hrs',
        automation: '24/7'
      },
      benefits: [
        'AI responds to reviews while you sleep',
        'Tone-matched responses maintain your brand voice',
        'Identify happy customers most likely to leave reviews',
        'Automated email campaigns for review requests'
      ],
      cta: 'Start Managing Reviews',
      demo: 'Watch Demo'
    },
    {
      id: 'intelligence',
      title: 'Business Intelligence Dashboard',
      subtitle: 'Unified Intelligence',
      description: 'See all your business intelligence in one place with AI-powered recommendations.',
      icon: BarChart3,
      color: 'purple',
      metrics: {
        dataSources: '10+',
        insights: 'Daily',
        accuracy: '92%',
        roi: '25%'
      },
      benefits: [
        'Unified dashboard combining all business data',
        'AI-powered insights with actionable recommendations',
        'Anomaly detection prevents revenue losses',
        'Revenue forecasting with 89% accuracy'
      ],
      cta: 'Start Getting Insights',
      demo: 'Watch Demo'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          gradient: 'from-blue-500/20 to-blue-600/20'
        };
      case 'green':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          text: 'text-green-400',
          gradient: 'from-green-500/20 to-green-600/20'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/20',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          gradient: 'from-purple-500/20 to-purple-600/20'
        };
      default:
        return {
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          gradient: 'from-slate-500/20 to-slate-600/20'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Three Powerful Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Dominate Your Market</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Stop losing customers to competitors. Stop losing revenue to bad reviews. 
              Get the intelligence you need to grow your business.
            </p>
          </motion.div>

          {/* Feature Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex gap-2 p-2 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50">
              {features.map((feature, index) => {
                const colors = getColorClasses(feature.color);
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index
                        ? `${colors.bg} ${colors.text} ${colors.border} border`
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <feature.icon className="w-4 h-4" />
                      <span className="font-medium">{feature.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Active Feature Display */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {features.map((feature, index) => {
            if (index !== activeFeature) return null;
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;

            return (
              <ProfessionalCard
                key={feature.id}
                className={`p-8 bg-gradient-to-br ${colors.gradient} border ${colors.border} backdrop-blur-sm`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Content */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${colors.bg}`}>
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        <div>
                          <Badge className={`${colors.bg} ${colors.text} ${colors.border} border`}>
                            {feature.subtitle}
                          </Badge>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                      <p className="text-lg text-slate-300 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(feature.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-slate-800/50 rounded-lg">
                          <div className={`text-2xl font-bold ${colors.text}`}>{value}</div>
                          <div className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                            <span className="text-slate-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <ProfessionalButton
                        onClick={() => onFeatureClick?.(feature.id)}
                        className="btn-vibrant-primary"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        {feature.cta}
                      </ProfessionalButton>
                      
                      <ProfessionalButton
                        onClick={() => onFeatureClick?.(feature.id)}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {feature.demo}
                      </ProfessionalButton>
                    </div>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="relative">
                    <div className="relative">
                      {/* Dashboard Preview */}
                      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-semibold">{feature.title}</h4>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 text-xs">Live</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(feature.metrics).slice(0, 4).map(([key, value]) => (
                              <div key={key} className={`${colors.bg} rounded-lg p-4`}>
                                <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                                <div className="text-xs text-slate-400 capitalize">{key}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-3">
                            <div className="text-slate-400 text-sm">Recent Activity</div>
                            <div className="space-y-2">
                              {feature.benefits.slice(0, 2).map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full`} />
                                  <span className="text-slate-300">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className="w-3 h-3 text-purple-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            );
          })}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Trusted by Industry Leaders</h3>
            <p className="text-slate-400">Join 500+ businesses already using MozaWave to dominate their markets</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {[
              { label: 'Average Rating', value: '4.8/5', icon: Star },
              { label: 'Customer Satisfaction', value: '96%', icon: Users },
              { label: 'Time Saved', value: '15+ hrs/week', icon: Clock },
              { label: 'Revenue Increase', value: '25%', icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedFeaturesSection;

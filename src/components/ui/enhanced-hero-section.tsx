// Enhanced Hero Section with FAANG-level design principles
// Inspired by BuzzFlow.ai design patterns and modern SaaS aesthetics

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Users,
  Target,
  CheckCircle,
  Sparkles,
  BarChart3,
  Brain,
  Eye,
  MessageCircle
} from 'lucide-react';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { Badge } from '@/components/ui/badge';

interface EnhancedHeroSectionProps {
  onDemoClick?: () => void;
  onCtaClick?: () => void;
}

export const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({
  onDemoClick,
  onCtaClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      controls.start('visible');
    }
  }, [inView, controls]);

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          {/* Trust Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 500+ Businesses
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Stop Losing Customers
            </span>
            <br />
            <span className="text-white">to Your Competitors</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            MozaWave gives you the intelligence to fight back. Track unlimited competitors, 
            manage your reputation with AI, and turn insights into revenue opportunities.
          </motion.p>

          {/* Value Props Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Eye,
                title: "Competitor Intelligence",
                description: "Real-time tracking across 10+ platforms"
              },
              {
                icon: MessageCircle,
                title: "AI Review Management",
                description: "Automated responses and reputation protection"
              },
              {
                icon: BarChart3,
                title: "Business Intelligence",
                description: "Unified insights driving revenue growth"
              }
            ].map((prop, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <prop.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white text-sm">{prop.title}</div>
                  <div className="text-slate-400 text-xs">{prop.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <ProfessionalButton
              onClick={onCtaClick}
              size="lg"
              className="btn-vibrant-primary px-8 py-4 text-lg font-semibold"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </ProfessionalButton>
            
            <ProfessionalButton
              onClick={onDemoClick}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </ProfessionalButton>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>First 2 weeks free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>500+ businesses trust us</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Dashboard Preview */}
        <motion.div
          className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden xl:block"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="w-80 h-64 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Live Dashboard</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/20 rounded-lg p-3">
                  <div className="text-blue-400 text-xs font-medium">Competitors</div>
                  <div className="text-white text-lg font-bold">12</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-3">
                  <div className="text-green-400 text-xs font-medium">Rating</div>
                  <div className="text-white text-lg font-bold">4.6</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-slate-400 text-xs">Recent Alerts</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="text-slate-300">Price increase detected</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <span className="text-slate-300">New review received</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedHeroSection;

// Enhanced Pricing Section with FAANG-level design
// Scalable pricing architecture with clear value communication

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Star,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Crown,
  Award,
  Clock,
  Globe
} from 'lucide-react';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { Badge } from '@/components/ui/badge';

interface EnhancedPricingSectionProps {
  onPlanSelect?: (plan: string) => void;
  onCtaClick?: () => void;
}

export const EnhancedPricingSection: React.FC<EnhancedPricingSectionProps> = ({
  onPlanSelect,
  onCtaClick
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 79,
      annualPrice: 790,
      icon: Target,
      color: 'slate',
      popular: false,
      features: [
        'Track up to 5 competitors',
        'Basic review management',
        'Weekly digest emails',
        'Standard support',
        'Mobile app access',
        'Basic analytics'
      ],
      limitations: [
        'Limited to 5 competitors',
        'Basic AI responses only',
        'No priority support'
      ],
      cta: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular for growing businesses',
      monthlyPrice: 149,
      annualPrice: 1490,
      icon: Zap,
      color: 'blue',
      popular: true,
      features: [
        'Track unlimited competitors',
        'Advanced AI review management',
        'Real-time alerts & notifications',
        'Priority support',
        'Advanced analytics & insights',
        'Custom integrations',
        'Team collaboration',
        'API access'
      ],
      limitations: [],
      cta: 'Start Free Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      monthlyPrice: 299,
      annualPrice: 2990,
      icon: Crown,
      color: 'purple',
      popular: false,
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom reporting & dashboards',
        'Advanced security & compliance',
        'White-label options',
        'Custom training & onboarding',
        'SLA guarantee',
        'Multi-location support'
      ],
      limitations: [],
      cta: 'Contact Sales'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          button: 'btn-vibrant-primary',
          gradient: 'from-blue-500/20 to-blue-600/20'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/20',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          button: 'bg-purple-600 hover:bg-purple-700',
          gradient: 'from-purple-500/20 to-purple-600/20'
        };
      case 'slate':
        return {
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          button: 'bg-slate-600 hover:bg-slate-700',
          gradient: 'from-slate-500/20 to-slate-600/20'
        };
      default:
        return {
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          button: 'bg-slate-600 hover:bg-slate-700',
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
              Simple, Transparent Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Growth Plan</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Start free for 2 weeks. No credit card required. 
              Cancel anytime. Scale as you grow.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex items-center gap-4 p-2 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 relative ${
                  billingCycle === 'annual'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                  Save 20%
                </Badge>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => {
            const colors = getColorClasses(plan.color);
            const Icon = plan.icon;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const savings = billingCycle === 'annual' ? Math.round(plan.monthlyPrice * 12 * 0.2) : 0;

            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-medium">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <ProfessionalCard
                  className={`p-8 h-full ${
                    plan.popular
                      ? `bg-gradient-to-br ${colors.gradient} border-2 ${colors.border}`
                      : 'bg-slate-800/50 border border-slate-700/50'
                  } backdrop-blur-sm relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  {plan.popular && (
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500 rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500 rounded-full blur-xl" />
                    </div>
                  )}

                  <div className="relative z-10 space-y-6">
                    {/* Plan Header */}
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className={`p-3 rounded-xl ${colors.bg}`}>
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                          <p className="text-slate-400 text-sm">{plan.description}</p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-5xl font-bold text-white">${price}</span>
                          <div className="text-left">
                            <div className="text-slate-400 text-sm">per month</div>
                            {billingCycle === 'annual' && (
                              <div className="text-green-400 text-sm">Save ${savings}/year</div>
                            )}
                          </div>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-slate-400 text-sm">
                            Billed annually (${Math.round(price / 12)}/month)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <ProfessionalButton
                      onClick={() => onPlanSelect?.(plan.id)}
                      className={`w-full ${
                        plan.popular ? colors.button : 'bg-slate-600 hover:bg-slate-700'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ProfessionalButton>

                    {/* Trust Signals */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>2 weeks free</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProfessionalCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-8"
        >
          <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Crown className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Need a Custom Solution?</h3>
              </div>
              <p className="text-slate-400 max-w-2xl mx-auto">
                For large organizations with complex needs, we offer custom pricing, 
                dedicated support, and tailored solutions to fit your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ProfessionalButton
                  onClick={onCtaClick}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Contact Enterprise Sales
                </ProfessionalButton>
                <ProfessionalButton
                  onClick={onCtaClick}
                  className="btn-vibrant-primary"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Schedule Demo
                </ProfessionalButton>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>SOC 2 Type II Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>500+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>25% Average Revenue Increase</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedPricingSection;

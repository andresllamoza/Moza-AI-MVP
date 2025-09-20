import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Star,
  ArrowRight,
  CreditCard,
  Zap,
  Shield,
  Users,
  BarChart3,
  MessageCircle,
  Eye,
  Crown,
  Rocket,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limitations: string[];
  cta: string;
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('core');

  const pricingTiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Free Trial',
      description: 'Perfect for testing the waters',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        '2 weeks free access',
        'Monitor 3 competitors',
        'Basic review management',
        'Email support',
        '5 AI responses per month',
        'Basic analytics'
      ],
      limitations: [
        'Limited to 2 weeks',
        'No phone support',
        'No advanced features'
      ],
      cta: 'Start Free Trial',
      icon: <Rocket className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20'
    },
    {
      id: 'core',
      name: 'Core',
      description: 'Everything you need to get started',
      price: {
        monthly: 79,
        yearly: 79 * 12 * 0.8 // 20% discount
      },
      features: [
        'Unlimited competitor tracking',
        'Full review management',
        'AI-powered responses',
        'Weekly digest emails',
        'Slack integration',
        'Priority support',
        'Advanced analytics',
        'CSV export'
      ],
      limitations: [
        'No custom integrations',
        'Standard response templates'
      ],
      cta: 'Start Core Plan',
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      color: 'text-primary-400',
      bgColor: 'bg-primary-600/20'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing businesses',
      price: {
        monthly: 149,
        yearly: 149 * 12 * 0.8 // 20% discount
      },
      features: [
        'Everything in Core',
        'Custom AI tone training',
        'Advanced competitor analysis',
        'Custom integrations',
        'White-label reports',
        'Phone support',
        'Custom response templates',
        'API access',
        'Team collaboration'
      ],
      limitations: [
        'Limited to 5 team members'
      ],
      cta: 'Start Pro Plan',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-warning-400',
      bgColor: 'bg-warning-600/20'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      price: {
        monthly: 299,
        yearly: 299 * 12 * 0.8 // 20% discount
      },
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Dedicated account manager',
        'Custom development',
        'SLA guarantees',
        'On-premise deployment',
        'Advanced security',
        'Custom training',
        'Priority feature requests'
      ],
      limitations: [],
      cta: 'Contact Sales',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    // Simulate Stripe integration
    if (planId === 'enterprise') {
      // Redirect to contact form or schedule demo
      alert('Redirecting to contact form for Enterprise plan...');
    } else {
      // Redirect to Stripe checkout
      alert(`Redirecting to Stripe checkout for ${planId} plan...`);
    }
  };

  const getCurrentPrice = (tier: PricingTier) => {
    return billingCycle === 'yearly' ? tier.price.yearly : tier.price.monthly;
  };

  const getSavings = (tier: PricingTier) => {
    if (billingCycle === 'yearly') {
      const monthlyTotal = tier.price.monthly * 12;
      return monthlyTotal - tier.price.yearly;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that fits your business. All plans include our core features 
            with no hidden fees or setup costs.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <ProfessionalCard className={`p-8 h-full flex flex-col ${
                tier.popular ? 'border-2 border-primary-600' : 'border border-dark-600'
              }`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-lg ${tier.bgColor} mb-4`}>
                    <div className={tier.color}>
                      {tier.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      ${getCurrentPrice(tier)}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && tier.price.yearly > 0 && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-400">
                      <span>Save ${getSavings(tier)}/year</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <ProfessionalButton
                  onClick={() => handleSelectPlan(tier.id)}
                  className={`w-full ${
                    tier.popular 
                      ? 'btn-vibrant-primary' 
                      : tier.id === 'free' 
                        ? 'btn-vibrant-secondary' 
                        : 'btn-vibrant-primary'
                  }`}
                  size="lg"
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ProfessionalButton>

                {tier.id === 'free' && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ✓ No credit card required
                  </p>
                )}
              </ProfessionalCard>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Compare All Features
          </h2>
          
          <ProfessionalCard className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="text-left py-4 px-6 text-white font-semibold">Features</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.id} className="text-center py-4 px-6">
                      <div className="flex flex-col items-center">
                        <span className="text-white font-semibold">{tier.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${getCurrentPrice(tier)}/{billingCycle === 'yearly' ? 'year' : 'month'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Competitor Tracking', free: '3', core: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'AI Review Responses', free: '5/month', core: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Email Support', free: '✓', core: '✓', pro: '✓', enterprise: '✓' },
                  { feature: 'Phone Support', free: '✗', core: '✓', pro: '✓', enterprise: '✓' },
                  { feature: 'Slack Integration', free: '✗', core: '✓', pro: '✓', enterprise: '✓' },
                  { feature: 'Custom Integrations', free: '✗', core: '✗', pro: '✓', enterprise: '✓' },
                  { feature: 'API Access', free: '✗', core: '✗', pro: '✓', enterprise: '✓' },
                  { feature: 'Team Collaboration', free: '✗', core: '✗', pro: '5 members', enterprise: 'Unlimited' },
                  { feature: 'Dedicated Support', free: '✗', core: '✗', pro: '✗', enterprise: '✓' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-dark-700">
                    <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">{row.free}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">{row.core}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">{row.pro}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ProfessionalCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfessionalCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing differences.
              </p>
            </ProfessionalCard>
            
            <ProfessionalCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                What happens after my free trial?
              </h3>
              <p className="text-muted-foreground">
                After your 2-week free trial, you can choose any paid plan or your account will be paused. 
                No charges until you select a plan.
              </p>
            </ProfessionalCard>
            
            <ProfessionalCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, 
                we'll refund your payment in full.
              </p>
            </ProfessionalCard>
            
            <ProfessionalCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Is there a setup fee?
              </h3>
              <p className="text-muted-foreground">
                No setup fees, no hidden costs. You only pay for your chosen plan. 
                Setup takes less than 5 minutes.
              </p>
            </ProfessionalCard>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <ProfessionalCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Stop Losing Customers?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ businesses using MozaWave to stay ahead of competitors and grow their reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton
                size="lg"
                className="btn-vibrant-primary"
                onClick={() => handleSelectPlan('free')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
              </ProfessionalButton>
              <ProfessionalButton
                size="lg"
                variant="outline"
                className="btn-vibrant-secondary"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Demo Call
              </ProfessionalButton>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✓ No credit card required • ✓ Cancel anytime • ✓ Setup in 5 minutes
            </p>
          </ProfessionalCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;

// Working One-Page Landing Design inspired by Google, Salesforce, and HubSpot
// Clean, professional, blue-focused Moza brand with smooth scrolling sections
// Updated: Enterprise-level SaaS platform with one-scroll design

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Award,
  Clock,
  DollarSign,
  Lightbulb,
  ArrowDown,
  ExternalLink
} from 'lucide-react';

export const WorkingOnePage: React.FC = () => {
  // Version 2.0 - Enterprise One-Scroll Design
  console.log('WorkingOnePage loaded - Enterprise One-Scroll Design');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress for parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Track scroll position for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'social-proof', 'pricing', 'cta'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Fixed Navigation - Google/HubSpot Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clean Google Style */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MozaWave</span>
            </div>

            {/* Desktop Navigation - HubSpot Style */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'features', label: 'Features' },
                { id: 'social-proof', label: 'Customers' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'cta', label: 'Get Started' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons - Salesforce Style */}
            <div className="hidden md:flex items-center gap-3">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {[
                { id: 'features', label: 'Features' },
                { id: 'social-proof', label: 'Customers' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'cta', label: 'Get Started' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button className="w-full text-left text-gray-600 hover:text-gray-900 py-2">
                  Sign In
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Start Free Trial
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Google Style */}
      <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Enterprise Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Enterprise-Grade Security
                </span>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Trusted by 500+ Businesses
                </span>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  99.9% Uptime SLA
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Stop Losing Customers
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                to Your Competitors
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              MozaWave gives you the intelligence to fight back. Track unlimited competitors, 
              manage your reputation with AI, and turn insights into revenue opportunities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Enterprise Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-600 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-lg border border-blue-100">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="font-medium">SOC 2 Type II</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-lg border border-blue-100">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">2 Weeks Free Trial</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-lg border border-blue-100">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="font-medium">5-Minute Setup</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-lg border border-blue-100">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Enterprise SLA</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - HubSpot Style */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4" />
                Enterprise Intelligence Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to
                <span className="text-blue-600"> Dominate Your Market</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The world's first dual intelligence platform combining external competitive intelligence 
                with internal customer data. Enterprise-grade security, real-time insights, and AI-powered recommendations.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "MozaWave Market Watch",
                subtitle: "Competitor Intelligence",
                description: "Enterprise-grade competitive intelligence across 10+ platforms with real-time alerts, AI-powered insights, and revenue opportunity identification.",
                features: [
                  "Real-time competitor monitoring",
                  "AI-powered price change alerts",
                  "New service & feature detection",
                  "Executive digest reports",
                  "Revenue impact analysis",
                  "Custom competitor dashboards"
                ],
                color: "blue"
              },
              {
                icon: MessageCircle,
                title: "MozaWave Reputation",
                subtitle: "AI Review Manager",
                description: "Enterprise AI review management with tone-matched responses, automated campaigns, and comprehensive reputation analytics.",
                features: [
                  "AI-powered review responses",
                  "Brand voice consistency",
                  "Automated review campaigns",
                  "Advanced sentiment analysis",
                  "Reputation risk alerts",
                  "Multi-platform management"
                ],
                color: "green"
              },
              {
                icon: BarChart3,
                title: "Business Intelligence Dashboard",
                subtitle: "Unified Intelligence",
                description: "Unified enterprise dashboard combining internal data with external intelligence for AI-powered business insights and strategic recommendations.",
                features: [
                  "Unified data dashboard",
                  "AI-powered business insights",
                  "Advanced anomaly detection",
                  "Predictive revenue forecasting",
                  "Custom KPI tracking",
                  "Executive reporting suite"
                ],
                color: "purple"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow h-full">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        feature.color === 'blue' ? 'bg-blue-100' :
                        feature.color === 'green' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        <feature.icon className={`w-8 h-8 ${
                          feature.color === 'blue' ? 'text-blue-600' :
                          feature.color === 'green' ? 'text-green-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className={`w-4 h-4 ${
                            feature.color === 'blue' ? 'text-blue-500' :
                            feature.color === 'green' ? 'text-green-500' :
                            'text-purple-500'
                          }`} />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section - Salesforce Style */}
      <section id="social-proof" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted by Enterprise Leaders
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join 500+ businesses, from startups to Fortune 500 companies, using MozaWave to gain competitive advantage and drive revenue growth.
              </p>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "MozaWave's competitive intelligence helped us identify a $2M revenue opportunity when our biggest competitor raised prices. We matched strategically and captured significant market share.",
                author: "Sarah Chen",
                title: "VP of Strategy, TechStart Inc.",
                rating: 5
              },
              {
                quote: "The AI review management system increased our rating from 3.8 to 4.6 in 60 days, directly impacting our enterprise sales pipeline by 35%.",
                author: "Mike Rodriguez",
                title: "Head of Customer Success, Rodriguez Group",
                rating: 5
              },
              {
                quote: "We discovered our competitor's $50K/month Facebook ad strategy through MozaWave and optimized our own campaigns, resulting in 40% lead increase and 25% cost reduction.",
                author: "Jennifer Park",
                title: "Marketing Director, GrowthCo",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Enterprise Clients', value: '500+', icon: Users },
              { label: 'Customer Satisfaction', value: '98%', icon: Star },
              { label: 'Average ROI', value: '340%', icon: TrendingUp },
              { label: 'Time to Value', value: '< 24hrs', icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section - Google Style */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4" />
                Enterprise-Grade Pricing
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose Your <span className="text-blue-600">Enterprise Plan</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start with a 2-week enterprise trial. No credit card required. Scale from startup to Fortune 500 with enterprise-grade security and support.
              </p>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$79',
                period: '/month',
                description: 'Perfect for startups and small teams getting started',
                features: [
                  'Track up to 5 competitors',
                  'Basic AI review management',
                  'Weekly executive digests',
                  'Standard enterprise support',
                  'Mobile & web access',
                  'Basic analytics dashboard'
                ],
                cta: 'Start Enterprise Trial',
                popular: false
              },
              {
                name: 'Professional',
                price: '$149',
                period: '/month',
                description: 'Most popular for growing enterprises',
                features: [
                  'Unlimited competitor tracking',
                  'Advanced AI review management',
                  'Real-time alerts & notifications',
                  'Priority enterprise support',
                  'Advanced analytics & insights',
                  'Custom integrations & APIs'
                ],
                cta: 'Start Enterprise Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$299',
                period: '/month',
                description: 'For Fortune 500 and large enterprises',
                features: [
                  'Everything in Professional',
                  'Dedicated customer success manager',
                  'Custom reporting & dashboards',
                  'SOC 2 Type II compliance',
                  'White-label & SSO options',
                  '99.9% SLA guarantee'
                ],
                cta: 'Contact Enterprise Sales',
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`bg-white border rounded-2xl p-8 h-full ${
                  plan.popular 
                    ? 'border-blue-200 shadow-lg' 
                    : 'border-gray-200'
                }`}>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - HubSpot Style */}
      <section id="cta" className="py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Business Intelligence?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join 500+ enterprises using MozaWave's dual intelligence platform to gain competitive advantage, 
                protect reputation, and drive measurable revenue growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Start Enterprise Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border border-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600/10 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Enterprise Demo
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>500+ Happy Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Google Style */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">MozaWave</span>
              </div>
              <p className="text-gray-400 text-sm">
                The world's first enterprise dual intelligence platform combining external 
                competitive intelligence with internal customer data. Trusted by Fortune 500 companies.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Market Watch</div>
                <div>Reputation Manager</div>
                <div>Business Intelligence</div>
                <div>API Access</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Blog</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2024 MozaWave. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkingOnePage;

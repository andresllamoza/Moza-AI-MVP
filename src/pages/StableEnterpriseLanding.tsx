import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Target,
  CheckCircle,
  BarChart3,
  Brain,
  Eye,
  MessageCircle,
  Menu,
  X,
  Award,
  Clock,
  DollarSign,
  Lightbulb,
  ExternalLink,
  Settings,
  FileText,
  PieChart,
  Database,
  Globe,
  Lock,
  Bell,
  Search,
  Download,
  Upload,
  Filter,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { AuthModal } from '../components/auth/AuthModal';

export const StableEnterpriseLanding: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Authentication handlers
  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Navigation - Salesforce Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MozaWave</span>
            </div>

            {/* Desktop Navigation - Always Visible */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('integrations')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Integrations
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('resources')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Resources
                </button>
              </div>
            </div>

            {/* CTA Buttons - Always Visible */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={handleSignIn}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
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
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('integrations')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Integrations
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('resources')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Resources
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button 
                  onClick={handleSignIn}
                  className="w-full text-left text-gray-600 hover:text-gray-900 py-2"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleGetStarted}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Stable, No Disappearing Elements */}
      <section id="hero" className="pt-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badges - Always Visible */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Enterprise Security
                </span>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  500+ Businesses
                </span>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  99.9% Uptime
                </span>
              </div>
            </div>

            {/* Main Headline - Stable */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Enterprise Intelligence
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>

            {/* Subheadline - Stable */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track competitors, manage reputation, and drive revenue with AI-powered insights. 
              Trusted by Fortune 500 companies worldwide.
            </p>

            {/* CTA Buttons - Stable */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats - Always Visible */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/50 rounded-lg border border-blue-100 p-4">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Enterprise Clients</div>
              </div>
              <div className="bg-white/50 rounded-lg border border-blue-100 p-4">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="bg-white/50 rounded-lg border border-blue-100 p-4">
                <div className="text-2xl font-bold text-blue-600">340%</div>
                <div className="text-sm text-gray-600">Average ROI</div>
              </div>
              <div className="bg-white/50 rounded-lg border border-blue-100 p-4">
                <div className="text-2xl font-bold text-blue-600">&lt;24hrs</div>
                <div className="text-sm text-gray-600">Time to Value</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Always Visible */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Business Intelligence Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to dominate your market with AI-powered insights and automation.
            </p>
          </div>

          {/* Product Cards - Stable Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Market Intelligence",
                description: "Track unlimited competitors with real-time alerts and AI-powered insights.",
                features: ["Competitor monitoring", "Price tracking", "Feature detection", "Market analysis"],
                color: "blue"
              },
              {
                icon: MessageCircle,
                title: "Reputation Manager",
                description: "AI-powered review management with automated responses and sentiment analysis.",
                features: ["AI responses", "Sentiment analysis", "Multi-platform", "Brand monitoring"],
                color: "green"
              },
              {
                icon: BarChart3,
                title: "Business Analytics",
                description: "Unified dashboard combining internal data with external intelligence.",
                features: ["Unified dashboard", "Custom reports", "Predictive analytics", "KPI tracking"],
                color: "purple"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${
                    product.color === 'blue' ? 'bg-blue-100' :
                    product.color === 'green' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    <product.icon className={`w-8 h-8 ${
                      product.color === 'blue' ? 'text-blue-600' :
                      product.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section - Always Visible */}
      <section id="integrations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your existing tools and workflows. Enterprise-grade integrations with leading platforms.
            </p>
          </div>

          {/* Integration Categories - Stable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "CRM & Sales",
                integrations: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
                icon: Users,
                color: "blue"
              },
              {
                title: "Marketing",
                integrations: ["Google Ads", "Facebook Ads", "Mailchimp", "HubSpot Marketing"],
                icon: Target,
                color: "green"
              },
              {
                title: "Analytics",
                integrations: ["Google Analytics", "Mixpanel", "Amplitude", "Tableau"],
                icon: BarChart3,
                color: "purple"
              },
              {
                title: "Communication",
                integrations: ["Slack", "Microsoft Teams", "Zoom", "Webex"],
                icon: MessageCircle,
                color: "orange"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    category.color === 'blue' ? 'bg-blue-100' :
                    category.color === 'green' ? 'bg-green-100' :
                    category.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <category.icon className={`w-5 h-5 ${
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'green' ? 'text-green-600' :
                      category.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <ul className="space-y-2">
                  {category.integrations.map((integration, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{integration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* API & Custom Integration */}
          <div className="mt-12 text-center">
            <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Custom Integrations</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Need a custom integration? Our enterprise API supports any platform or workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View API Docs
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Stable */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with a 2-week free trial. No credit card required. Scale from startup to Fortune 500.
            </p>
          </div>

          {/* Pricing Cards - Stable */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$79',
                period: '/month',
                description: 'Perfect for startups and small teams',
                features: [
                  'Track up to 5 competitors',
                  'Basic AI review management',
                  'Weekly executive digests',
                  'Standard support',
                  'Mobile & web access'
                ],
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
                  'Priority support',
                  'Advanced analytics & insights',
                  'Custom integrations & APIs'
                ],
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
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`bg-white border rounded-xl p-8 h-full ${
                  plan.popular 
                    ? 'border-blue-200 shadow-lg' 
                    : 'border-gray-200'
                }`}>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
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
                      {plan.popular ? 'Start Free Trial' : 'Contact Sales'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section - Always Visible */}
      <section id="resources" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Resources & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed with MozaWave. Documentation, guides, and enterprise support.
            </p>
          </div>

          {/* Resources Grid - Stable */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Documentation",
                description: "Comprehensive guides and API references",
                icon: FileText,
                color: "blue"
              },
              {
                title: "Help Center",
                description: "FAQs, tutorials, and troubleshooting",
                icon: Search,
                color: "green"
              },
              {
                title: "Enterprise Support",
                description: "Dedicated support for enterprise customers",
                icon: Phone,
                color: "purple"
              },
              {
                title: "Training",
                description: "Onboarding and advanced training sessions",
                icon: Users,
                color: "orange"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    resource.color === 'blue' ? 'bg-blue-100' :
                    resource.color === 'green' ? 'bg-green-100' :
                    resource.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <resource.icon className={`w-5 h-5 ${
                      resource.color === 'blue' ? 'text-blue-600' :
                      resource.color === 'green' ? 'text-green-600' :
                      resource.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Stable */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join 500+ enterprises using MozaWave to gain competitive advantage and drive revenue growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border border-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600/10 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
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
          </div>
        </div>
      </section>

      {/* Footer - Stable */}
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
                Enterprise intelligence platform trusted by Fortune 500 companies worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Market Intelligence</div>
                <div>Reputation Manager</div>
                <div>Business Analytics</div>
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

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default StableEnterpriseLanding;

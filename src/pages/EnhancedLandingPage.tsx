// Enhanced Landing Page with FAANG-level design
// Scalable architecture with proven design patterns and user-centric approach

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Target,
  CheckCircle,
  Sparkles,
  BarChart3,
  Eye,
  MessageCircle,
  Brain,
  Crown,
  Award
} from 'lucide-react';

import { EnhancedHeroSection } from '@/components/ui/enhanced-hero-section';
import { EnhancedFeaturesSection } from '@/components/ui/enhanced-features-section';
import { EnhancedPricingSection } from '@/components/ui/enhanced-pricing-section';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { Badge } from '@/components/ui/badge';

export const EnhancedLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleFeatureClick = (feature: string) => {
    console.log(`Feature clicked: ${feature}`);
    // Navigate to demo or feature page
  };

  const handlePlanSelect = (plan: string) => {
    console.log(`Plan selected: ${plan}`);
    // Navigate to signup or contact sales
  };

  const handleCtaClick = () => {
    console.log('CTA clicked');
    // Navigate to signup
  };

  const handleDemoClick = () => {
    console.log('Demo clicked');
    // Navigate to demo
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xl font-bold text-white">MozaWave</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'features', label: 'Features' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'demo', label: 'Demo' },
                { id: 'about', label: 'About' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <ProfessionalButton
                onClick={handleDemoClick}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Demo
              </ProfessionalButton>
              <ProfessionalButton
                onClick={handleCtaClick}
                size="sm"
                className="btn-vibrant-primary"
              >
                Start Free Trial
              </ProfessionalButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { id: 'features', label: 'Features' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'demo', label: 'Demo' },
                { id: 'about', label: 'About' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-slate-300 hover:text-white py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <ProfessionalButton
                  onClick={handleDemoClick}
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Demo
                </ProfessionalButton>
                <ProfessionalButton
                  onClick={handleCtaClick}
                  size="sm"
                  className="w-full btn-vibrant-primary"
                >
                  Start Free Trial
                </ProfessionalButton>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <EnhancedHeroSection
          onDemoClick={handleDemoClick}
          onCtaClick={handleCtaClick}
        />
      </section>

      {/* Features Section */}
      <section id="features">
        <EnhancedFeaturesSection onFeatureClick={handleFeatureClick} />
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Testimonials */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Customer Success Stories
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Trusted by Industry Leaders
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "MozaWave caught our biggest competitor raising prices by $5. We matched it the same day and added $2,000 to our monthly revenue.",
                    author: "Sarah Chen",
                    title: "CEO, TechStart Inc.",
                    rating: 5
                  },
                  {
                    quote: "Our Google rating went from 3.8 to 4.6 in 2 months. The AI review responses are incredibly professional and save us hours every week.",
                    author: "Mike Rodriguez",
                    title: "Owner, Rodriguez Restaurant Group",
                    rating: 5
                  },
                  {
                    quote: "We found out a competitor was advertising on Facebook for $3,000/month. We copied their strategy and got 40% more leads.",
                    author: "Jennifer Park",
                    title: "Marketing Director, GrowthCo",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm h-full">
                      <div className="space-y-4">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-300 italic">"{testimonial.quote}"</p>
                        <div className="space-y-1">
                          <div className="font-semibold text-white">{testimonial.author}</div>
                          <div className="text-slate-400 text-sm">{testimonial.title}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Happy Customers', value: '500+', icon: Users },
                { label: 'Average Rating', value: '4.8/5', icon: Star },
                { label: 'Revenue Increase', value: '25%', icon: TrendingUp },
                { label: 'Time Saved', value: '15+ hrs/week', icon: Zap }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <EnhancedPricingSection
          onPlanSelect={handlePlanSelect}
          onCtaClick={handleCtaClick}
        />
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Ready to Dominate Your Market?
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Stop Losing Customers to Competitors
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Join 500+ businesses already using MozaWave to track competitors, 
                manage reputation, and turn insights into revenue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton
                onClick={handleCtaClick}
                size="lg"
                className="btn-vibrant-primary px-8 py-4 text-lg font-semibold"
              >
                <Target className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </ProfessionalButton>
              
              <ProfessionalButton
                onClick={handleDemoClick}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </ProfessionalButton>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-400">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-lg font-bold text-white">MozaWave</span>
              </div>
              <p className="text-slate-400 text-sm">
                The world's first dual intelligence platform combining external 
                competitive intelligence with internal customer data.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Product</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>Market Watch</div>
                <div>Reputation Manager</div>
                <div>Business Intelligence</div>
                <div>API Access</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Company</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Blog</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Support</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-sm text-slate-400">
            © 2024 MozaWave. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;

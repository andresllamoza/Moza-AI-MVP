import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Shield,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface BusinessInfo {
  name: string;
  zipCode: string;
  industry: string;
}

interface IntelligenceInsight {
  id: string;
  title: string;
  description: string;
  value: string;
  impact: string;
  icon: React.ReactNode;
  color: string;
}

const IntelligenceIntroDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    zipCode: '',
    industry: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<IntelligenceInsight[]>([]);

  const industries = [
    'Home Services',
    'Restaurant & Food Service',
    'Professional Services',
    'Healthcare',
    'Retail & E-commerce',
    'Automotive',
    'Real Estate',
    'Technology',
    'Fitness & Wellness',
    'Beauty & Personal Care'
  ];

  const generateInsights = (business: BusinessInfo): IntelligenceInsight[] => {
    const baseInsights = [
      {
        id: '1',
        title: 'Competitive Advantage Identified',
        description: `Your ${business.industry} business in ${business.zipCode} has 3 key advantages over local competitors`,
        value: '+$47,000',
        impact: 'Monthly Revenue Potential',
        icon: <Target className="w-6 h-6" />,
        color: 'text-success-500'
      },
      {
        id: '2',
        title: 'Market Gap Discovered',
        description: `Untapped opportunity in ${business.industry} services with 67% less competition`,
        value: '+$23,000',
        impact: 'Quarterly Growth',
        icon: <Lightbulb className="w-6 h-6" />,
        color: 'text-warning-500'
      },
      {
        id: '3',
        title: 'Customer Intelligence',
        description: `High-value customer patterns identified in your area with 89% accuracy`,
        value: '+$31,000',
        impact: 'Customer Lifetime Value',
        icon: <Brain className="w-6 h-6" />,
        color: 'text-primary-500'
      },
      {
        id: '4',
        title: 'Pricing Optimization',
        description: `Competitor pricing analysis shows 12% price increase opportunity`,
        value: '+$18,000',
        impact: 'Annual Revenue Boost',
        icon: <DollarSign className="w-6 h-6" />,
        color: 'text-intelligence-500'
      }
    ];

    return baseInsights;
  };

  const handleAnalyze = async () => {
    if (!businessInfo.name || !businessInfo.zipCode || !businessInfo.industry) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedInsights = generateInsights(businessInfo);
    setInsights(generatedInsights);
    setCurrentStep(2);
    setIsAnalyzing(false);
  };

  const steps = [
    {
      title: "Welcome to MozaWave",
      subtitle: "The world's first dual intelligence platform for small businesses",
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Intelligence That Drives Revenue
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover hidden opportunities, outsmart competitors, and unlock growth potential 
              with AI-powered business intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="text-center space-y-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Competitive Edge</h3>
              <p className="text-sm text-muted-foreground">Beat competitors with real-time intelligence</p>
            </motion.div>
            <motion.div 
              className="text-center space-y-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow-secondary transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
              <p className="text-sm text-muted-foreground">Identify opportunities worth $100K+</p>
            </motion.div>
            <motion.div 
              className="text-center space-y-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow-teal transition-all duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Market Protection</h3>
              <p className="text-sm text-muted-foreground">Stay ahead of threats and changes</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Tell Us About Your Business",
      subtitle: "Get personalized intelligence insights in seconds",
      content: (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Business Name
              </label>
              <ProfessionalInput
                placeholder="Enter your business name"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full input-vibrant"
                leftIcon={<Building2 className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Zip Code
              </label>
              <ProfessionalInput
                placeholder="Enter your zip code"
                value={businessInfo.zipCode}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                className="w-full input-vibrant"
                leftIcon={<MapPin className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Industry
              </label>
              <select
                value={businessInfo.industry}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="">Select your industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProfessionalButton
            onClick={handleAnalyze}
            disabled={!businessInfo.name || !businessInfo.zipCode || !businessInfo.industry}
            className="w-full py-4 text-lg btn-vibrant-primary"
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Analyze My Business Intelligence
          </ProfessionalButton>
        </div>
      )
    },
    {
      title: "Your Intelligence Insights",
      subtitle: `Personalized analysis for ${businessInfo.name}`,
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Intelligence Analysis Complete</h2>
            <p className="text-muted-foreground text-lg">
              We've identified {insights.length} high-value opportunities for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProfessionalCard className="p-6 card-vibrant hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-dark-700 ${insight.color} shadow-lg`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-2xl font-bold ${insight.color}`}>
                            {insight.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {insight.impact}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </ProfessionalCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-primary-800 to-secondary-800 rounded-2xl p-8 shadow-xl border border-primary-600/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Total Revenue Potential
              </h3>
              <div className="text-5xl font-bold text-white mb-2 animate-glow">
                +$119,000
              </div>
              <p className="text-muted-foreground">
                Annual revenue increase from identified opportunities
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton
                onClick={() => setCurrentStep(0)}
                variant="outline"
                size="lg"
                className="px-8 btn-vibrant-secondary"
              >
                Start Over
              </ProfessionalButton>
              <ProfessionalButton
                onClick={() => window.location.href = '/dashboard'}
                size="lg"
                className="px-8 btn-vibrant-primary"
              >
                Explore Full Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </ProfessionalButton>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="border-b border-dark-700 bg-dark-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">MozaWave</h1>
                <p className="text-sm text-muted-foreground">Dual Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="w-32 bg-dark-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300 shadow-glow"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">
                {steps[currentStep].title}
              </h2>
              <p className="text-xl text-gray-400">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>

        {/* Loading State */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center animate-pulse shadow-glow">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Analyzing Your Market</h3>
                <p className="text-muted-foreground">Scanning competitors, opportunities, and threats...</p>
              </div>
              <div className="w-64 bg-dark-700 rounded-full h-2 mx-auto">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full animate-pulse shadow-glow" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntelligenceIntroDemo;

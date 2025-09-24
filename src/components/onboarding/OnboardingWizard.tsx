import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Target, 
  Building, 
  Settings, 
  Database, 
  Users, 
  BarChart3,
  Zap,
  ArrowRight,
  X,
  Star,
  Award,
  Trophy
} from 'lucide-react';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  isCompleted: boolean;
  isOptional: boolean;
}

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

// Step Components
const WelcomeStep: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="text-center space-y-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto"
    >
      <Target className="w-12 h-12 text-white" />
    </motion.div>
    
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">Welcome to MozaWave!</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Let's set up your enterprise intelligence platform in just a few minutes. 
        We'll help you get the most value from day one.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {[
        { icon: Target, title: "Track Competitors", description: "Monitor unlimited competitors with AI insights" },
        { icon: Users, title: "Manage Reputation", description: "AI-powered review management and responses" },
        { icon: BarChart3, title: "Drive Revenue", description: "Unified analytics and business intelligence" }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-6 text-center"
        >
          <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>

    <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
      Get Started
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
);

const IndustrySelectionStep: React.FC<{ onNext: () => void; onPrevious: () => void }> = ({ onNext, onPrevious }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const industries = [
    {
      id: 'restaurant',
      name: 'Restaurants & Food Service',
      icon: Building,
      description: 'Track competitor pricing, manage reviews, and optimize menu offerings',
      features: ['Review Management', 'Competitor Pricing', 'Menu Analytics', 'Local SEO']
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: Target,
      description: 'Monitor competitor products, pricing strategies, and customer sentiment',
      features: ['Product Tracking', 'Price Monitoring', 'Brand Monitoring', 'Market Analysis']
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medical',
      icon: Users,
      description: 'Manage patient reviews, track competitor services, and monitor compliance',
      features: ['Patient Reviews', 'Service Monitoring', 'Compliance Tracking', 'Reputation Management']
    },
    {
      id: 'technology',
      name: 'Technology & SaaS',
      icon: Zap,
      description: 'Track feature releases, monitor pricing changes, and analyze market positioning',
      features: ['Feature Tracking', 'Pricing Analysis', 'Market Intelligence', 'Competitive Positioning']
    },
    {
      id: 'professional',
      name: 'Professional Services',
      icon: BarChart3,
      description: 'Monitor competitor services, manage client reviews, and track market trends',
      features: ['Service Monitoring', 'Client Reviews', 'Market Trends', 'Competitive Analysis']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Industry</h2>
        <p className="text-lg text-gray-600">
          We'll customize your setup with industry-specific templates and configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              selectedIndustry === industry.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedIndustry(industry.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                selectedIndustry === industry.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <industry.icon className={`w-6 h-6 ${
                  selectedIndustry === industry.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedIndustry === industry.id && (
                <CheckCircle className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedIndustry}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const BusinessSetupStep: React.FC<{ onNext: () => void; onPrevious: () => void }> = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    location: '',
    businessSize: '',
    goals: [] as string[]
  });

  const businessSizes = ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'];
  const goalOptions = [
    'Increase customer satisfaction',
    'Monitor competitor pricing',
    'Improve online reputation',
    'Track market trends',
    'Generate more leads',
    'Reduce response time'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Your Business</h2>
        <p className="text-lg text-gray-600">
          Help us personalize your MozaWave experience.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State/Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Size
              </label>
              <select
                value={formData.businessSize}
                onChange={(e) => setFormData({...formData, businessSize: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select business size</option>
                {businessSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What are your main goals?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goalOptions.map((goal, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.goals.includes(goal)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({...formData, goals: [...formData.goals, goal]});
                    } else {
                      setFormData({...formData, goals: formData.goals.filter(g => g !== goal)});
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!formData.businessName || !formData.businessSize}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const IntegrationSetupStep: React.FC<{ onNext: () => void; onPrevious: () => void }> = ({ onNext, onPrevious }) => {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

  const integrations = [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: BarChart3,
      category: 'Analytics'
    },
    {
      id: 'salesforce',
      name: 'Salesforce CRM',
      description: 'Sync customer data and sales information',
      icon: Users,
      category: 'CRM'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Marketing automation and lead tracking',
      icon: Target,
      category: 'Marketing'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in Slack',
      icon: Settings,
      category: 'Communication'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps automatically',
      icon: Zap,
      category: 'Automation'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Tools</h2>
        <p className="text-lg text-gray-600">
          Integrate with your existing tools to get the most out of MozaWave.
          <span className="text-sm text-gray-500 block mt-2">
            You can always add more integrations later.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              selectedIntegrations.includes(integration.id)
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:shadow-lg'
            }`}
            onClick={() => {
              if (selectedIntegrations.includes(integration.id)) {
                setSelectedIntegrations(selectedIntegrations.filter(id => id !== integration.id));
              } else {
                setSelectedIntegrations([...selectedIntegrations, integration.id]);
              }
            }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                selectedIntegrations.includes(integration.id) ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <integration.icon className={`w-6 h-6 ${
                  selectedIntegrations.includes(integration.id) ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {integration.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </div>
              {selectedIntegrations.includes(integration.id) && (
                <CheckCircle className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-green-100">
            <Database className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Sample Data</h3>
            <p className="text-sm text-gray-600">Generate sample data to explore features immediately</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="sample-data"
            defaultChecked
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="sample-data" className="text-sm text-gray-700">
            Generate sample competitors, reviews, and analytics data
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          {selectedIntegrations.length > 0 ? 'Setup Integrations' : 'Skip for Now'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const CompletionStep: React.FC<{ onComplete: () => void; onPrevious: () => void }> = ({ onComplete, onPrevious }) => (
  <div className="text-center space-y-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto"
    >
      <Trophy className="w-16 h-16 text-white" />
    </motion.div>
    
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">Setup Complete!</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Congratulations! Your MozaWave account is ready. Let's explore your dashboard and start gaining competitive insights.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {[
        { icon: Target, title: "Track Competitors", description: "Monitor your competition in real-time" },
        { icon: Star, title: "Manage Reviews", description: "Respond to reviews with AI assistance" },
        { icon: BarChart3, title: "View Analytics", description: "Explore your business intelligence dashboard" }
      ].map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-6 text-center"
        >
          <action.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </motion.div>
      ))}
    </div>

    <div className="flex justify-between max-w-md mx-auto">
      <Button variant="outline" onClick={onPrevious}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <Button onClick={onComplete} size="lg" className="bg-blue-600 hover:bg-blue-700">
        Launch Dashboard
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
);

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Get started with MozaWave',
      icon: Target,
      component: WelcomeStep,
      isCompleted: completedSteps.includes('welcome'),
      isOptional: false
    },
    {
      id: 'industry',
      title: 'Industry',
      description: 'Choose your industry',
      icon: Building,
      component: IndustrySelectionStep,
      isCompleted: completedSteps.includes('industry'),
      isOptional: false
    },
    {
      id: 'business',
      title: 'Business Info',
      description: 'Tell us about your business',
      icon: Users,
      component: BusinessSetupStep,
      isCompleted: completedSteps.includes('business'),
      isOptional: false
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect your tools',
      icon: Settings,
      component: IntegrationSetupStep,
      isCompleted: completedSteps.includes('integrations'),
      isOptional: true
    },
    {
      id: 'completion',
      title: 'Complete',
      description: 'You\'re all set!',
      icon: CheckCircle,
      component: CompletionStep,
      isCompleted: completedSteps.includes('completion'),
      isOptional: false
    }
  ];

  const handleNext = () => {
    const currentStepData = steps[currentStep];
    if (!completedSteps.includes(currentStepData.id)) {
      setCompletedSteps([...completedSteps, currentStepData.id]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Setup Your Account</h1>
                <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-600 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.isCompleted
                      ? 'bg-green-100 text-green-600'
                      : index === currentStep
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            <CurrentStepComponent 
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

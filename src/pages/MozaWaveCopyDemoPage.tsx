// MozaWave Copy System Demo Page
// Comprehensive showcase of all copy, AI reasoning, and messaging flows

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Eye,
  MessageCircle,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  Users,
  Clock,
  Zap,
  Target,
  Shield,
  Mail,
  Phone,
  MessageSquare,
  Settings,
  Play,
  X,
  ChevronRight,
  ChevronLeft,
  Copy,
  Download,
  Send,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Monitor,
  Smartphone,
  Mail as MailIcon,
  MessageSquare as MessageIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

import { MozaWaveCopySystem } from '@/components/copy/MozaWaveCopySystem';

import {
  MarketWatchCopy,
  ReputationCopy,
  BusinessIntelligenceCopy,
  AIReasoningFlows,
  AlertTemplates,
  DigestTemplates,
  ReviewResponseTemplates,
  CampaignMessaging,
  DashboardMicrocopy,
  TooltipExplanations,
  CTAPhrasing,
  TrustSignals,
  Microcopy
} from '@/copy/mozawave-copy-system';

import { aiReasoningEngine } from '@/services/ai-reasoning-engine';
import { intelligentAlertSystem } from '@/services/intelligent-alert-system';

interface CopyDemoPageProps {
  initialService?: 'market-watch' | 'reputation' | 'business-intelligence';
  initialView?: 'homepage' | 'service-page' | 'dashboard' | 'demo';
}

export const MozaWaveCopyDemoPage: React.FC<CopyDemoPageProps> = ({
  initialService = 'market-watch',
  initialView = 'homepage'
}) => {
  const [activeService, setActiveService] = useState(initialService);
  const [activeView, setActiveView] = useState(initialView);
  const [businessContext, setBusinessContext] = useState({
    name: 'Brooklyn Pizza Co',
    industry: 'Restaurant',
    location: 'Brooklyn, NY',
    size: 'small' as const
  });
  const [selectedCopy, setSelectedCopy] = useState<any>(null);
  const [showCopyEditor, setShowCopyEditor] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const services = [
    {
      id: 'market-watch',
      name: 'MozaWave Market Watch',
      description: 'Competitor Intelligence',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'reputation',
      name: 'MozaWave Reputation',
      description: 'AI Review Manager',
      icon: MessageCircle,
      color: 'green'
    },
    {
      id: 'business-intelligence',
      name: 'Business Intelligence',
      description: 'Unified Dashboard',
      icon: BarChart3,
      color: 'purple'
    }
  ];

  const views = [
    {
      id: 'homepage',
      name: 'Homepage',
      description: 'Landing page copy',
      icon: Monitor
    },
    {
      id: 'service-page',
      name: 'Service Page',
      description: 'Detailed product copy',
      icon: BookOpen
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Interface copy & microcopy',
      icon: BarChart3
    },
    {
      id: 'demo',
      name: 'Live Demo',
      description: 'Interactive AI demo',
      icon: Play
    }
  ];

  const handleServiceChange = (serviceId: string) => {
    setActiveService(serviceId as any);
    setActiveView('homepage');
  };

  const handleViewChange = (viewId: string) => {
    setActiveView(viewId as any);
  };

  const handleBusinessContextChange = (field: string, value: string) => {
    setBusinessContext(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCustomCopy = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI copy generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call the AI reasoning engine
      // to generate personalized copy based on business context
      const customCopy = await aiReasoningEngine.generatePersonalizedCopy({
        businessContext,
        service: activeService,
        view: activeView,
        tone: 'professional',
        focus: 'conversion'
      });
      
      setSelectedCopy(customCopy);
      setShowCopyEditor(true);
    } catch (error) {
      console.error('Failed to generate custom copy:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportCopy = () => {
    const copyData = {
      service: activeService,
      view: activeView,
      businessContext,
      timestamp: new Date().toISOString(),
      copy: selectedCopy
    };
    
    const blob = new Blob([JSON.stringify(copyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moza-wave-copy-${activeService}-${activeView}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Header */}
        <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-8 w-8 text-purple-400" />
                  <h1 className="text-xl font-bold">MozaWave Copy System</h1>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  Demo Mode
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateCustomCopy}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Copy
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportCopy}
                  disabled={!selectedCopy}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Service Selection */}
              <ProfessionalCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                <div className="space-y-2">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceChange(service.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          activeService === service.id
                            ? 'bg-blue-500/20 border border-blue-500/30'
                            : 'hover:bg-slate-700/50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${
                          activeService === service.id ? 'text-blue-400' : 'text-slate-400'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            activeService === service.id ? 'text-white' : 'text-slate-300'
                          }`}>
                            {service.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {service.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ProfessionalCard>

              {/* View Selection */}
              <ProfessionalCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Views</h3>
                <div className="space-y-2">
                  {views.map((view) => {
                    const Icon = view.icon;
                    return (
                      <button
                        key={view.id}
                        onClick={() => handleViewChange(view.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          activeView === view.id
                            ? 'bg-green-500/20 border border-green-500/30'
                            : 'hover:bg-slate-700/50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${
                          activeView === view.id ? 'text-green-400' : 'text-slate-400'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            activeView === view.id ? 'text-white' : 'text-slate-300'
                          }`}>
                            {view.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {view.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ProfessionalCard>

              {/* Business Context */}
              <ProfessionalCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Business Context</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Business Name</Label>
                    <Input
                      value={businessContext.name}
                      onChange={(e) => handleBusinessContextChange('name', e.target.value)}
                      className="mt-1 bg-slate-700 border-slate-600"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-slate-300">Industry</Label>
                    <Select
                      value={businessContext.industry}
                      onValueChange={(value) => handleBusinessContextChange('industry', value)}
                    >
                      <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-slate-300">Location</Label>
                    <Input
                      value={businessContext.location}
                      onChange={(e) => handleBusinessContextChange('location', e.target.value)}
                      className="mt-1 bg-slate-700 border-slate-600"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-slate-300">Business Size</Label>
                    <Select
                      value={businessContext.size}
                      onValueChange={(value) => handleBusinessContextChange('size', value)}
                    >
                      <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-10 employees)</SelectItem>
                        <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                        <SelectItem value="large">Large (50+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ProfessionalCard>

              {/* Copy Components */}
              <ProfessionalCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Copy Components</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowCopyEditor(true)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Templates
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Alert Templates
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Templates
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS Templates
                  </Button>
                </div>
              </ProfessionalCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeService}-${activeView}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MozaWaveCopySystem
                    service={activeService}
                    view={activeView}
                    businessContext={businessContext}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Copy Editor Modal */}
        {showCopyEditor && (
          <CopyEditorModal
            copy={selectedCopy}
            businessContext={businessContext}
            service={activeService}
            view={activeView}
            onClose={() => setShowCopyEditor(false)}
            onSave={(updatedCopy) => setSelectedCopy(updatedCopy)}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

// Copy Editor Modal Component
const CopyEditorModal: React.FC<{
  copy: any;
  businessContext: any;
  service: string;
  view: string;
  onClose: () => void;
  onSave: (copy: any) => void;
}> = ({ copy, businessContext, service, view, onClose, onSave }) => {
  const [editedCopy, setEditedCopy] = useState(copy || {});
  const [activeTab, setActiveTab] = useState('homepage');

  const copySections = {
    homepage: MarketWatchCopy.homepage,
    servicePage: MarketWatchCopy.servicePage,
    dashboard: MarketWatchCopy.dashboard,
    alerts: AlertTemplates,
    digests: DigestTemplates,
    reviews: ReviewResponseTemplates,
    campaigns: CampaignMessaging,
    microcopy: Microcopy
  };

  const handleCopyUpdate = (section: string, field: string, value: string) => {
    setEditedCopy((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(editedCopy);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 rounded-lg p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Copy Editor</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose} className="text-slate-400">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="servicePage">Service Page</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-slate-300">Headline</Label>
                <Textarea
                  value={editedCopy.homepage?.headline || copySections.homepage.headline}
                  onChange={(e) => handleCopyUpdate('homepage', 'headline', e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600"
                  rows={2}
                />
              </div>
              
              <div>
                <Label className="text-slate-300">Subheadline</Label>
                <Textarea
                  value={editedCopy.homepage?.subheadline || copySections.homepage.subheadline}
                  onChange={(e) => handleCopyUpdate('homepage', 'subheadline', e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600"
                  rows={2}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={editedCopy.homepage?.description || copySections.homepage.description}
                  onChange={(e) => handleCopyUpdate('homepage', 'description', e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="servicePage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-slate-300">Headline</Label>
                <Textarea
                  value={editedCopy.servicePage?.headline || copySections.servicePage.headline}
                  onChange={(e) => handleCopyUpdate('servicePage', 'headline', e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600"
                  rows={2}
                />
              </div>
              
              <div>
                <Label className="text-slate-300">Subheadline</Label>
                <Textarea
                  value={editedCopy.servicePage?.subheadline || copySections.servicePage.subheadline}
                  onChange={(e) => handleCopyUpdate('servicePage', 'subheadline', e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600"
                  rows={2}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="space-y-4">
              {Object.entries(copySections.dashboard.overview.metrics).map(([key, metric]) => (
                <div key={key}>
                  <Label className="text-slate-300">{metric}</Label>
                  <Input
                    value={editedCopy.dashboard?.overview?.metrics?.[key] || metric}
                    onChange={(e) => handleCopyUpdate('dashboard', `overview.metrics.${key}`, e.target.value)}
                    className="mt-1 bg-slate-700 border-slate-600"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-4">
              {AlertTemplates.map((alert, index) => (
                <ProfessionalCard key={index} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-slate-300">Title</Label>
                      <Input
                        value={alert.title}
                        className="mt-1 bg-slate-700 border-slate-600"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-slate-300">Message</Label>
                      <Textarea
                        value={alert.message}
                        className="mt-1 bg-slate-700 border-slate-600"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-slate-300">CTA</Label>
                      <Input
                        value={alert.cta}
                        className="mt-1 bg-slate-700 border-slate-600"
                      />
                    </div>
                  </div>
                </ProfessionalCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MozaWaveCopyDemoPage;

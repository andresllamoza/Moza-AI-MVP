import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfessionalCard } from './professional-card';
import { ProfessionalButton } from './professional-button';
import { 
  CheckCircle2, 
  Star, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  FileText, 
  Share2,
  Calendar,
  TrendingUp,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface ActionableIntelligenceProps {
  insight: {
    id: string;
    title: string;
    description: string;
    actionableIntelligence: {
      specificAction: string;
      actionSteps: string[];
      templates: {
        email?: string;
        social?: string;
        website?: string;
        ad?: string;
      };
      successMetrics: {
        primary: string;
        secondary: string[];
        timeframe: string;
      };
      resources: {
        tools: string[];
        contacts: string[];
        budget: string;
      };
    };
    customerSuccess: {
      feedbackRating?: number;
      actionTaken?: 'yes' | 'no' | 'planning';
      resultsLogged?: {
        revenue?: number;
        leads?: number;
        timeSaved?: number;
        notes?: string;
      };
      followUpDate?: Date;
      successStory?: string;
    };
  };
  onActionTaken: (insightId: string, action: 'yes' | 'no' | 'planning') => void;
  onResultsLogged: (insightId: string, results: any) => void;
  onFeedback: (insightId: string, rating: number) => void;
}

export const ActionableIntelligence: React.FC<ActionableIntelligenceProps> = ({
  insight,
  onActionTaken,
  onResultsLogged,
  onFeedback
}) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showResultsForm, setShowResultsForm] = useState(false);
  const [results, setResults] = useState({
    revenue: 0,
    leads: 0,
    timeSaved: 0,
    notes: ''
  });

  const handleResultsSubmit = () => {
    onResultsLogged(insight.id, results);
    setShowResultsForm(false);
    setResults({ revenue: 0, leads: 0, timeSaved: 0, notes: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Actionable Intelligence Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <Lightbulb className="w-6 h-6 text-primary-400 mr-2" />
            Actionable Intelligence
          </h3>
          <p className="text-muted-foreground mb-4">{insight.actionableIntelligence.specificAction}</p>
        </div>
        <div className="flex items-center space-x-2">
          {insight.customerSuccess.feedbackRating && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < insight.customerSuccess.feedbackRating!
                      ? 'text-warning-400 fill-current'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Steps */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 text-success-400 mr-2" />
          Implementation Steps
        </h4>
        <div className="space-y-3">
          {insight.actionableIntelligence.actionSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-muted-foreground flex-1">{step}</p>
            </div>
          ))}
        </div>
      </ProfessionalCard>

      {/* Success Metrics */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 text-secondary-400 mr-2" />
          Success Metrics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Primary Metric</p>
            <p className="text-white font-medium">{insight.actionableIntelligence.successMetrics.primary}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Expected Timeline</p>
            <p className="text-white font-medium flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {insight.actionableIntelligence.successMetrics.timeframe}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Additional Metrics to Track</p>
          <div className="flex flex-wrap gap-2">
            {insight.actionableIntelligence.successMetrics.secondary.map((metric, index) => (
              <span key={index} className="px-3 py-1 bg-dark-700 text-white rounded-full text-sm">
                {metric}
              </span>
            ))}
          </div>
        </div>
      </ProfessionalCard>

      {/* Resources & Budget */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 text-warning-400 mr-2" />
          Resources & Budget
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tools Needed</p>
            <div className="space-y-1">
              {insight.actionableIntelligence.resources.tools.map((tool, index) => (
                <p key={index} className="text-white text-sm">• {tool}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Key Contacts</p>
            <div className="space-y-1">
              {insight.actionableIntelligence.resources.contacts.map((contact, index) => (
                <p key={index} className="text-white text-sm">• {contact}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Estimated Budget</p>
            <p className="text-white font-medium text-lg">{insight.actionableIntelligence.resources.budget}</p>
          </div>
        </div>
      </ProfessionalCard>

      {/* Templates */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white flex items-center">
            <FileText className="w-5 h-5 text-teal-400 mr-2" />
            Ready-to-Use Templates
          </h4>
          <ProfessionalButton
            onClick={() => setShowTemplates(!showTemplates)}
            size="sm"
            variant="outline"
            className="btn-vibrant-secondary"
          >
            {showTemplates ? 'Hide' : 'Show'} Templates
          </ProfessionalButton>
        </div>
        
        {showTemplates && (
          <div className="space-y-4">
            {insight.actionableIntelligence.templates.email && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Email Template</p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <p className="text-white text-sm whitespace-pre-line">
                    {insight.actionableIntelligence.templates.email}
                  </p>
                </div>
              </div>
            )}
            {insight.actionableIntelligence.templates.social && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Social Media Post</p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <p className="text-white text-sm whitespace-pre-line">
                    {insight.actionableIntelligence.templates.social}
                  </p>
                </div>
              </div>
            )}
            {insight.actionableIntelligence.templates.website && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Website Copy</p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <p className="text-white text-sm whitespace-pre-line">
                    {insight.actionableIntelligence.templates.website}
                  </p>
                </div>
              </div>
            )}
            {insight.actionableIntelligence.templates.ad && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Ad Copy</p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <p className="text-white text-sm whitespace-pre-line">
                    {insight.actionableIntelligence.templates.ad}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </ProfessionalCard>

      {/* Customer Success Tracking */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CheckCircle2 className="w-5 h-5 text-success-400 mr-2" />
          Track Your Success
        </h4>
        
        {/* Action Taken */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Did you implement this insight?</p>
          <div className="flex space-x-3">
            <ProfessionalButton
              onClick={() => onActionTaken(insight.id, 'yes')}
              size="sm"
              variant={insight.customerSuccess.actionTaken === 'yes' ? 'primary' : 'outline'}
              className={insight.customerSuccess.actionTaken === 'yes' ? 'btn-vibrant-primary' : 'btn-vibrant-secondary'}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Yes, Implemented
            </ProfessionalButton>
            <ProfessionalButton
              onClick={() => onActionTaken(insight.id, 'planning')}
              size="sm"
              variant={insight.customerSuccess.actionTaken === 'planning' ? 'primary' : 'outline'}
              className={insight.customerSuccess.actionTaken === 'planning' ? 'btn-vibrant-primary' : 'btn-vibrant-secondary'}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Planning To
            </ProfessionalButton>
            <ProfessionalButton
              onClick={() => onActionTaken(insight.id, 'no')}
              size="sm"
              variant={insight.customerSuccess.actionTaken === 'no' ? 'secondary' : 'outline'}
              className={insight.customerSuccess.actionTaken === 'no' ? 'btn-vibrant-secondary' : 'btn-vibrant-secondary'}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              Not Now
            </ProfessionalButton>
          </div>
        </div>

        {/* Results Logger */}
        {insight.customerSuccess.actionTaken === 'yes' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Log your results</p>
              <ProfessionalButton
                onClick={() => setShowResultsForm(!showResultsForm)}
                size="sm"
                variant="outline"
                className="btn-vibrant-secondary"
              >
                {showResultsForm ? 'Hide' : 'Log Results'}
              </ProfessionalButton>
            </div>
            
            {showResultsForm && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Revenue Generated</label>
                    <input
                      type="number"
                      value={results.revenue}
                      onChange={(e) => setResults({...results, revenue: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">New Leads</label>
                    <input
                      type="number"
                      value={results.leads}
                      onChange={(e) => setResults({...results, leads: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Time Saved (hours)</label>
                    <input
                      type="number"
                      value={results.timeSaved}
                      onChange={(e) => setResults({...results, timeSaved: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Additional Notes</label>
                  <textarea
                    value={results.notes}
                    onChange={(e) => setResults({...results, notes: e.target.value})}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white h-20"
                    placeholder="What happened? Any challenges or wins?"
                  />
                </div>
                <ProfessionalButton
                  onClick={handleResultsSubmit}
                  className="btn-vibrant-primary"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Save Results
                </ProfessionalButton>
              </div>
            )}
          </div>
        )}

        {/* Feedback Rating */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Rate this insight (1-5 stars)</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onFeedback(insight.id, rating)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  insight.customerSuccess.feedbackRating && rating <= insight.customerSuccess.feedbackRating
                    ? 'text-warning-400 bg-warning-500/20'
                    : 'text-muted-foreground hover:text-warning-400'
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </ProfessionalCard>
    </motion.div>
  );
};

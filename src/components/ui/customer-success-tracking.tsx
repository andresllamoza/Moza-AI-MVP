import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfessionalCard } from './professional-card';
import { ProfessionalButton } from './professional-button';
import { 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  Calendar,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

interface CustomerSuccessTrackingProps {
  insights: Array<{
    id: string;
    title: string;
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
  }>;
  onUpdateSuccess: (insightId: string, updates: any) => void;
}

export const CustomerSuccessTracking: React.FC<CustomerSuccessTrackingProps> = ({
  insights,
  onUpdateSuccess
}) => {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [showSuccessStories, setShowSuccessStories] = useState(false);

  // Calculate success metrics
  const totalInsights = insights.length;
  const implementedInsights = insights.filter(i => i.customerSuccess.actionTaken === 'yes').length;
  const planningInsights = insights.filter(i => i.customerSuccess.actionTaken === 'planning').length;
  const totalRevenue = insights.reduce((sum, i) => sum + (i.customerSuccess.resultsLogged?.revenue || 0), 0);
  const totalLeads = insights.reduce((sum, i) => sum + (i.customerSuccess.resultsLogged?.leads || 0), 0);
  const totalTimeSaved = insights.reduce((sum, i) => sum + (i.customerSuccess.resultsLogged?.timeSaved || 0), 0);
  const averageRating = insights
    .filter(i => i.customerSuccess.feedbackRating)
    .reduce((sum, i) => sum + (i.customerSuccess.feedbackRating || 0), 0) / 
    insights.filter(i => i.customerSuccess.feedbackRating).length || 0;

  const successRate = totalInsights > 0 ? (implementedInsights / totalInsights) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Success Overview */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Award className="w-6 h-6 text-success-400 mr-2" />
          Your Success Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-success-400 mb-2">{successRate.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-xs text-muted-foreground mt-1">{implementedInsights} of {totalInsights} implemented</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Revenue Generated</div>
            <div className="text-xs text-muted-foreground mt-1">From implemented insights</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-400 mb-2">{totalLeads}</div>
            <div className="text-sm text-muted-foreground">New Leads</div>
            <div className="text-xs text-muted-foreground mt-1">Generated from actions</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-400 mb-2">{totalTimeSaved}h</div>
            <div className="text-sm text-muted-foreground">Time Saved</div>
            <div className="text-xs text-muted-foreground mt-1">Hours recovered</div>
          </div>
        </div>
      </ProfessionalCard>

      {/* Implementation Status */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 text-primary-400 mr-2" />
          Implementation Status
        </h4>
        
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
              <div className="flex-1">
                <h5 className="text-white font-medium">{insight.title}</h5>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {insight.customerSuccess.feedbackRating ? (
                      [...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < insight.customerSuccess.feedbackRating!
                              ? 'text-warning-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Not rated</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {insight.customerSuccess.actionTaken === 'yes' && (
                      <span className="px-2 py-1 bg-success-500/20 text-success-300 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        Implemented
                      </span>
                    )}
                    {insight.customerSuccess.actionTaken === 'planning' && (
                      <span className="px-2 py-1 bg-warning-500/20 text-warning-300 rounded-full text-xs">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        Planning
                      </span>
                    )}
                    {insight.customerSuccess.actionTaken === 'no' && (
                      <span className="px-2 py-1 bg-muted-foreground/20 text-muted-foreground rounded-full text-xs">
                        Not Now
                      </span>
                    )}
                    {!insight.customerSuccess.actionTaken && (
                      <span className="px-2 py-1 bg-dark-700 text-muted-foreground rounded-full text-xs">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                {insight.customerSuccess.resultsLogged && (
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    {insight.customerSuccess.resultsLogged.revenue && (
                      <span className="text-success-400">
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        +${insight.customerSuccess.resultsLogged.revenue.toLocaleString()}
                      </span>
                    )}
                    {insight.customerSuccess.resultsLogged.leads && (
                      <span className="text-primary-400">
                        <Users className="w-3 h-3 inline mr-1" />
                        +{insight.customerSuccess.resultsLogged.leads} leads
                      </span>
                    )}
                    {insight.customerSuccess.resultsLogged.timeSaved && (
                      <span className="text-warning-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        +{insight.customerSuccess.resultsLogged.timeSaved}h saved
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <ProfessionalButton
                onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
                size="sm"
                variant="outline"
                className="btn-vibrant-secondary"
              >
                {selectedInsight === insight.id ? 'Hide' : 'Details'}
              </ProfessionalButton>
            </div>
          ))}
        </div>
      </ProfessionalCard>

      {/* Success Stories */}
      {insights.some(i => i.customerSuccess.successStory) && (
        <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Award className="w-5 h-5 text-success-400 mr-2" />
              Success Stories
            </h4>
            <ProfessionalButton
              onClick={() => setShowSuccessStories(!showSuccessStories)}
              size="sm"
              variant="outline"
              className="btn-vibrant-secondary"
            >
              {showSuccessStories ? 'Hide' : 'Show'} Stories
            </ProfessionalButton>
          </div>
          
          {showSuccessStories && (
            <div className="space-y-4">
              {insights
                .filter(i => i.customerSuccess.successStory)
                .map((insight) => (
                  <div key={insight.id} className="p-4 bg-dark-900 rounded-lg">
                    <h5 className="text-white font-medium mb-2">{insight.title}</h5>
                    <p className="text-muted-foreground text-sm">{insight.customerSuccess.successStory}</p>
                  </div>
                ))}
            </div>
          )}
        </ProfessionalCard>
      )}

      {/* Progress Chart Placeholder */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 text-teal-400 mr-2" />
          Progress Over Time
        </h4>
        <div className="h-64 bg-dark-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Progress chart coming soon</p>
            <p className="text-xs text-muted-foreground mt-1">Track your success metrics over time</p>
          </div>
        </div>
      </ProfessionalCard>
    </motion.div>
  );
};

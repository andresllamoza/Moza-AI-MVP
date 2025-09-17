import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  CheckCircle2,
  AlertTriangle,
  Star,
  MapPin,
  MessageCircle,
  Building2,
  Mail,
  ExternalLink,
  Download,
  Share2,
  Calendar,
  Users,
  Zap
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface ClientSummaryProps {
  businessName: string;
  location: string;
  industry: string;
  insights: any[];
  onScheduleCall?: () => void;
  onDownloadReport?: () => void;
  onShareReport?: () => void;
}

export const ClientSummaryPage: React.FC<ClientSummaryProps> = ({
  businessName,
  location,
  industry,
  insights,
  onScheduleCall,
  onDownloadReport,
  onShareReport
}) => {
  // Calculate summary statistics
  const totalInsights = insights.length;
  const highConfidenceInsights = insights.filter(insight => insight.confidence >= 80).length;
  const revenueOpportunities = insights.filter(insight => insight.impact.includes('Revenue')).length;
  const dataSources = [...new Set(insights.map(insight => insight.source))].length;
  
  // Calculate total potential revenue
  const totalRevenue = insights
    .filter(insight => insight.value.includes('$'))
    .reduce((sum, insight) => {
      const value = insight.value.replace(/[$,]/g, '');
      const numValue = parseInt(value) || 0;
      return sum + numValue;
    }, 0);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'news_api': return <BarChart3 className="w-4 h-4" />;
      case 'google_places': return <MapPin className="w-4 h-4" />;
      case 'yelp': return <Star className="w-4 h-4" />;
      case 'reddit': return <MessageCircle className="w-4 h-4" />;
      case 'clearbit': return <Building2 className="w-4 h-4" />;
      case 'hunter': return <Mail className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case 'news_api': return 'NewsAPI';
      case 'google_places': return 'Google Places';
      case 'yelp': return 'Yelp';
      case 'reddit': return 'Reddit';
      case 'clearbit': return 'Clearbit';
      case 'hunter': return 'Hunter.io';
      default: return 'Unknown';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'news_api': return 'text-primary-400 bg-primary-500/20';
      case 'google_places': return 'text-secondary-400 bg-secondary-500/20';
      case 'yelp': return 'text-warning-400 bg-warning-500/20';
      case 'reddit': return 'text-teal-400 bg-teal-500/20';
      case 'clearbit': return 'text-success-400 bg-success-500/20';
      case 'hunter': return 'text-red-pink-400 bg-red-pink-500/20';
      default: return 'text-primary-400 bg-primary-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Intelligence Analysis Complete
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive competitive intelligence for <span className="text-primary-400 font-semibold">{businessName}</span>
          </p>
          
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-secondary-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>{industry}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-warning-400" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <ProfessionalCard className="p-6 text-center border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="text-3xl font-bold text-primary-400 mb-2">{totalInsights}</div>
            <div className="text-sm text-muted-foreground">Total Insights</div>
            <div className="text-xs text-success-400 mt-1">{highConfidenceInsights} High Confidence</div>
          </ProfessionalCard>

          <ProfessionalCard className="p-6 text-center border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="text-3xl font-bold text-success-400 mb-2">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Revenue Opportunity</div>
            <div className="text-xs text-warning-400 mt-1">{revenueOpportunities} Opportunities</div>
          </ProfessionalCard>

          <ProfessionalCard className="p-6 text-center border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="text-3xl font-bold text-teal-400 mb-2">{dataSources}</div>
            <div className="text-sm text-muted-foreground">Data Sources</div>
            <div className="text-xs text-primary-400 mt-1">Real-time APIs</div>
          </ProfessionalCard>

          <ProfessionalCard className="p-6 text-center border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="text-3xl font-bold text-warning-400 mb-2">94%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            <div className="text-xs text-success-400 mt-1">AI-Powered Analysis</div>
          </ProfessionalCard>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Key Intelligence Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.slice(0, 6).map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getSourceColor(insight.source)}`}>
                        {getSourceIcon(insight.source)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{getSourceName(insight.source)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success-400">{insight.value}</div>
                      <div className="text-xs text-muted-foreground">{insight.impact}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Confidence: {insight.confidence}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {insight.dataPoints} data points
                    </div>
                  </div>
                </ProfessionalCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Data Sources & Methodology</h2>
          <ProfessionalCard className="p-8 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...new Set(insights.map(insight => insight.source))].map((source, index) => (
                <motion.div
                  key={source}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl ${getSourceColor(source)} flex items-center justify-center mb-3`}>
                    {getSourceIcon(source)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{getSourceName(source)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {insights.filter(insight => insight.source === source).length} insights
                  </p>
                </motion.div>
              ))}
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <ProfessionalButton
              onClick={onScheduleCall}
              size="lg"
              className="px-8 btn-vibrant-primary"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Strategy Call
            </ProfessionalButton>
            
            <ProfessionalButton
              onClick={onDownloadReport}
              variant="outline"
              size="lg"
              className="px-8 btn-vibrant-secondary"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Report
            </ProfessionalButton>
            
            <ProfessionalButton
              onClick={onShareReport}
              variant="outline"
              size="lg"
              className="px-8 btn-vibrant-teal"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share with Team
            </ProfessionalButton>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Ready to turn these insights into revenue?
            </p>
            <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-warning-400" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-primary-400" />
                <span>Team Collaboration</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3 text-success-400" />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

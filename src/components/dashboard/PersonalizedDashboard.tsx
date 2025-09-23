// FAANG-Level Personalized Dashboard for MozaWave
// Inspired by HubSpot, Google, and Salesforce design standards

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  Share2,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Zap,
  Shield,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { ProfessionalCard } from '../ui/professional-card';
import { ProfessionalButton } from '../ui/professional-button';
import { useAuth } from '../../hooks/use-auth';
import { realCompetitorAPI } from '../../services/realCompetitorAPI';

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface Insight {
  id: string;
  type: 'opportunity' | 'alert' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  action?: string;
  timestamp: Date;
  category: string;
}

interface CompetitorActivity {
  id: string;
  competitor: string;
  activity: string;
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  details: string;
  revenueImpact?: number;
}

const PersonalizedDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'competitors' | 'reputation' | 'insights'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [competitorActivity, setCompetitorActivity] = useState<CompetitorActivity[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls with realistic data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load metrics
      setMetrics([
        {
          id: 'revenue',
          title: 'Monthly Revenue',
          value: '$24,580',
          change: 12.5,
          changeType: 'increase',
          trend: 'up',
          icon: <DollarSign className="h-5 w-5" />,
          color: 'text-green-500',
          description: 'Revenue growth this month'
        },
        {
          id: 'competitors',
          title: 'Tracked Competitors',
          value: 8,
          change: 2,
          changeType: 'increase',
          trend: 'up',
          icon: <Users className="h-5 w-5" />,
          color: 'text-blue-500',
          description: 'Active competitor monitoring'
        },
        {
          id: 'rating',
          title: 'Average Rating',
          value: '4.7',
          change: 0.3,
          changeType: 'increase',
          trend: 'up',
          icon: <Star className="h-5 w-5" />,
          color: 'text-yellow-500',
          description: 'Customer satisfaction score'
        },
        {
          id: 'alerts',
          title: 'Active Alerts',
          value: 3,
          change: -1,
          changeType: 'decrease',
          trend: 'down',
          icon: <AlertTriangle className="h-5 w-5" />,
          color: 'text-orange-500',
          description: 'Issues requiring attention'
        }
      ]);

      // Load insights
      setInsights([
        {
          id: '1',
          type: 'opportunity',
          title: 'Competitor Price Increase',
          description: 'Joe\'s Pizza raised prices by 15%. Consider strategic pricing adjustment.',
          priority: 'high',
          impact: '+$2,400 potential monthly revenue',
          action: 'Review pricing strategy',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          category: 'Pricing'
        },
        {
          id: '2',
          type: 'alert',
          title: 'Review Response Needed',
          description: '3 new reviews require responses to maintain reputation.',
          priority: 'medium',
          impact: 'Maintain 95% response rate',
          action: 'Respond to reviews',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          category: 'Reputation'
        },
        {
          id: '3',
          type: 'achievement',
          title: 'Rating Improvement',
          description: 'Your rating increased from 4.5 to 4.7 this week.',
          priority: 'low',
          impact: 'Improved customer trust',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          category: 'Performance'
        }
      ]);

      // Load competitor activity
      setCompetitorActivity([
        {
          id: '1',
          competitor: 'Lucali',
          activity: 'Launched new delivery service',
          impact: 'negative',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          details: 'Added 30-minute delivery promise',
          revenueImpact: -800
        },
        {
          id: '2',
          competitor: 'Di Fara Pizza',
          activity: 'Increased social media presence',
          impact: 'neutral',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          details: '50% more Instagram posts this week',
          revenueImpact: 0
        }
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-4 w-4 text-green-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'achievement': return <Award className="h-4 w-4 text-blue-500" />;
      case 'recommendation': return <Zap className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/10';
      case 'medium': return 'border-l-orange-500 bg-orange-50/10';
      case 'low': return 'border-l-green-500 bg-green-50/10';
      default: return 'border-l-gray-500 bg-gray-50/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-300">Loading your personalized dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Here's what's happening with your business intelligence
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">3 alerts</span>
              </div>
              <ProfessionalButton variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </ProfessionalButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Time Range:</span>
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ProfessionalButton variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </ProfessionalButton>
            <ProfessionalButton variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </ProfessionalButton>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-100 dark:bg-slate-700 rounded-lg p-1 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'competitors', label: 'Competitors', icon: <Users className="h-4 w-4" /> },
            { id: 'reputation', label: 'Reputation', icon: <Star className="h-4 w-4" /> },
            { id: 'insights', label: 'Insights', icon: <Activity className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ProfessionalCard className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                          {metric.value}
                        </p>
                        <div className="flex items-center mt-2">
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          ) : metric.trend === 'down' ? (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          ) : (
                            <Activity className="h-4 w-4 text-gray-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${
                            metric.changeType === 'increase' ? 'text-green-600' : 
                            metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full ${metric.color.replace('text-', 'bg-').replace('-500', '-100')} dark:bg-slate-700`}>
                        <div className={metric.color}>
                          {metric.icon}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {metric.description}
                    </p>
                  </ProfessionalCard>
                </motion.div>
              ))}
            </div>

            {/* Insights and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Insights */}
              <ProfessionalCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Recent Insights
                  </h3>
                  <ProfessionalButton variant="ghost" size="sm">
                    View All
                  </ProfessionalButton>
                </div>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`border-l-4 ${getPriorityColor(insight.priority)} p-4 rounded-r-lg`}
                    >
                      <div className="flex items-start space-x-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {insight.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            {insight.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {insight.timestamp.toLocaleDateString()}
                            </span>
                            {insight.action && (
                              <ProfessionalButton variant="ghost" size="sm">
                                {insight.action}
                              </ProfessionalButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ProfessionalCard>

              {/* Competitor Activity */}
              <ProfessionalCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Competitor Activity
                  </h3>
                  <ProfessionalButton variant="ghost" size="sm">
                    View All
                  </ProfessionalButton>
                </div>
                <div className="space-y-4">
                  {competitorActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div className={`p-2 rounded-full ${
                        activity.impact === 'positive' ? 'bg-green-100 text-green-600' :
                        activity.impact === 'negative' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {activity.competitor}
                          </h4>
                          <span className="text-xs bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                            {activity.activity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {activity.details}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {activity.timestamp.toLocaleDateString()}
                          </span>
                          {activity.revenueImpact !== undefined && (
                            <span className={`text-xs font-medium ${
                              activity.revenueImpact > 0 ? 'text-green-600' :
                              activity.revenueImpact < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {activity.revenueImpact > 0 ? '+' : ''}${Math.abs(activity.revenueImpact)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ProfessionalCard>
            </div>
          </motion.div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 dark:text-slate-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon</p>
              <p className="text-sm mt-2">This section is being developed with FAANG-level features</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedDashboard;

// MozaWave Enterprise Dashboard - Unified Intelligence Platform
// Combines Market Watch, Reputation Management, and Business Intelligence

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Eye,
  MessageCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Star,
  Zap,
  Settings,
  Bell,
  Filter,
  Search,
  Download,
  RefreshCw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Target,
  Shield,
  Activity,
  Globe,
  Calendar,
  Mail,
  Slack,
  Phone
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

import { 
  marketWatchService,
  reputationService,
  biDashboard,
  alertSystem
} from '@/services';

import {
  BusinessMetrics,
  IntelligenceInsight,
  ProprietaryMetric,
  Alert,
  DashboardWidget,
  WidgetType,
  TrendDirection,
  AlertSeverity,
  Priority
} from '@/types/enterprise-platform';

interface MozaWaveEnterpriseDashboardProps {
  organizationId: string;
  userId: string;
}

export const MozaWaveEnterpriseDashboard: React.FC<MozaWaveEnterpriseDashboardProps> = ({
  organizationId,
  userId
}) => {
  // State management
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'market-watch' | 'reputation' | 'insights'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(300000); // 5 minutes

  // Data state
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  const [insights, setInsights] = useState<IntelligenceInsight[]>([]);
  const [proprietaryMetrics, setProprietaryMetrics] = useState<ProprietaryMetric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<IntelligenceInsight | null>(null);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize dashboard
  useEffect(() => {
    initializeDashboard();
  }, [organizationId, userId]);

  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh || !isInitialized) return;

    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, isInitialized]);

  const initializeDashboard = async () => {
    try {
      setIsLoading(true);
      
      // Initialize all services
      await biDashboard.initializeDashboard(organizationId, userId);
      await marketWatchService.startMonitoring();
      await reputationService.startMonitoring();
      await alertSystem.initialize();
      
      // Load initial data
      await refreshData();
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      const dashboardData = await biDashboard.getDashboardOverview(organizationId, userId);
      
      setMetrics(dashboardData.metrics);
      setInsights(dashboardData.insights);
      setProprietaryMetrics(dashboardData.proprietaryMetrics);
      setAlerts(dashboardData.alerts);
      setWidgets(dashboardData.widgets);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const handleInsightClick = (insight: IntelligenceInsight) => {
    setSelectedInsight(insight);
    setShowInsightModal(true);
  };

  const handleAlertAcknowledge = async (alertId: string) => {
    try {
      await alertSystem.acknowledgeAlert(alertId, userId);
      await refreshData();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const handleAlertResolve = async (alertId: string) => {
    try {
      await alertSystem.resolveAlert(alertId, userId);
      await refreshData();
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (!isInitialized) {
    return <InitializationError />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">MozaWave Enterprise</h1>
                  <p className="text-sm text-slate-400">Intelligence Platform</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  AI-Powered
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className="text-sm text-slate-300">Auto-refresh</span>
              </div>
              
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`bg-slate-800/30 backdrop-blur-sm border-r border-slate-700 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}>
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full justify-start text-slate-300 hover:bg-slate-700"
              >
                <Brain className="h-5 w-5 mr-3" />
                {!sidebarCollapsed && 'Navigation'}
              </Button>
            </div>

            <nav className="space-y-2 px-4">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3, badge: alerts.length },
                { id: 'market-watch', label: 'Market Watch', icon: Eye, badge: null },
                { id: 'reputation', label: 'Reputation', icon: MessageCircle, badge: null },
                { id: 'insights', label: 'AI Insights', icon: Brain, badge: insights.length }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full justify-start text-slate-300 hover:bg-slate-700 ${
                    activeTab === item.id ? 'bg-blue-500/20 text-blue-400' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {!sidebarCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <OverviewTab
                  key="overview"
                  metrics={metrics}
                  proprietaryMetrics={proprietaryMetrics}
                  alerts={alerts}
                  widgets={widgets}
                  onAlertAcknowledge={handleAlertAcknowledge}
                  onAlertResolve={handleAlertResolve}
                />
              )}
              
              {activeTab === 'market-watch' && (
                <MarketWatchTab
                  key="market-watch"
                  timeframe={selectedTimeframe}
                />
              )}
              
              {activeTab === 'reputation' && (
                <ReputationTab
                  key="reputation"
                  timeframe={selectedTimeframe}
                />
              )}
              
              {activeTab === 'insights' && (
                <InsightsTab
                  key="insights"
                  insights={insights}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onInsightClick={handleInsightClick}
                />
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Insight Modal */}
        {showInsightModal && selectedInsight && (
          <InsightModal
            insight={selectedInsight}
            onClose={() => setShowInsightModal(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  metrics: BusinessMetrics | null;
  proprietaryMetrics: ProprietaryMetric[];
  alerts: Alert[];
  widgets: DashboardWidget[];
  onAlertAcknowledge: (alertId: string) => void;
  onAlertResolve: (alertId: string) => void;
}> = ({ metrics, proprietaryMetrics, alerts, widgets, onAlertAcknowledge, onAlertResolve }) => {
  if (!metrics) return <div>Loading metrics...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue at Risk"
          value={`${proprietaryMetrics.find(m => m.name.includes('Revenue-at-Risk'))?.value || 0}%`}
          trend="up"
          icon={DollarSign}
          color="text-red-400"
          description="Revenue vulnerability score"
        />
        <MetricCard
          title="Competitive Threat"
          value={`${proprietaryMetrics.find(m => m.name.includes('Threat'))?.value || 0}%`}
          trend="down"
          icon={Shield}
          color="text-orange-400"
          description="Overall competitive threat level"
        />
        <MetricCard
          title="Sentiment Impact"
          value={`${proprietaryMetrics.find(m => m.name.includes('Sentiment'))?.value || 0}%`}
          trend="stable"
          icon={Star}
          color="text-green-400"
          description="Reputation sentiment score"
        />
        <MetricCard
          title="AI Insights"
          value={metrics ? '12' : '0'}
          trend="up"
          icon={Brain}
          color="text-purple-400"
          description="Active intelligence insights"
        />
      </div>

      {/* Alerts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPanel
          alerts={alerts}
          onAcknowledge={onAlertAcknowledge}
          onResolve={onAlertResolve}
        />
        <InsightPanel insights={proprietaryMetrics} />
      </div>

      {/* Widget Grid */}
      <WidgetGrid widgets={widgets} />
    </motion.div>
  );
};

// Market Watch Tab Component
const MarketWatchTab: React.FC<{ timeframe: string }> = ({ timeframe }) => {
  const [competitors] = useState(marketWatchService.getCompetitors());
  const [changes] = useState(marketWatchService.getRecentChanges(20));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Market Watch</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Plus className="h-4 w-4 mr-2" />
            Add Competitor
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfessionalCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Changes</h3>
            <div className="space-y-3">
              {changes.map((change, index) => (
                <ChangeItem key={index} change={change} />
              ))}
            </div>
          </ProfessionalCard>
        </div>

        <div>
          <ProfessionalCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tracked Competitors</h3>
            <div className="space-y-3">
              {competitors.map((competitor) => (
                <CompetitorItem key={competitor.id} competitor={competitor} />
              ))}
            </div>
          </ProfessionalCard>
        </div>
      </div>
    </motion.div>
  );
};

// Reputation Tab Component
const ReputationTab: React.FC<{ timeframe: string }> = ({ timeframe }) => {
  const [reviews] = useState(reputationService.getReviews());
  const [metrics] = useState(reputationService.getReputationMetrics('current-business'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reputation Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Plus className="h-4 w-4 mr-2" />
            Campaign
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Rating"
          value={metrics.averageRating.toFixed(1)}
          trend={metrics.reputationTrend}
          icon={Star}
          color="text-yellow-400"
          description="Overall review rating"
        />
        <MetricCard
          title="Total Reviews"
          value={metrics.totalReviews.toString()}
          trend="up"
          icon={MessageCircle}
          color="text-blue-400"
          description="Total review count"
        />
        <MetricCard
          title="Response Rate"
          value={`${metrics.responseRate.toFixed(1)}%`}
          trend="up"
          icon={Clock}
          color="text-green-400"
          description="Review response rate"
        />
        <MetricCard
          title="Sentiment Score"
          value={`${metrics.sentimentScore.toFixed(0)}%`}
          trend={metrics.reputationTrend}
          icon={TrendingUp}
          color="text-purple-400"
          description="Overall sentiment"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfessionalCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Reviews</h3>
          <div className="space-y-3">
            {reviews.slice(0, 10).map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </ProfessionalCard>

        <ProfessionalCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sentiment Distribution</h3>
          <SentimentChart reviews={reviews} />
        </ProfessionalCard>
      </div>
    </motion.div>
  );
};

// Insights Tab Component
const InsightsTab: React.FC<{
  insights: IntelligenceInsight[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInsightClick: (insight: IntelligenceInsight) => void;
}> = ({ insights, searchQuery, onSearchChange, onInsightClick }) => {
  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">AI Insights</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            onClick={() => onInsightClick(insight)}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Helper Components
const MetricCard: React.FC<{
  title: string;
  value: string;
  trend: TrendDirection;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}> = ({ title, value, trend, icon: Icon, color, description }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <ProfessionalCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-slate-700 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {getTrendIcon()}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400 mb-2">{title}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </ProfessionalCard>
  );
};

const AlertPanel: React.FC<{
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onResolve: (alertId: string) => void;
}> = ({ alerts, onAcknowledge, onResolve }) => {
  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'error': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  return (
    <ProfessionalCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
        <Badge variant="secondary" className="bg-red-500/20 text-red-400">
          {alerts.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {new Date(alert.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{alert.title}</h4>
                <p className="text-xs text-slate-400">{alert.message}</p>
              </div>
              <div className="flex gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAcknowledge(alert.id)}
                  className="text-slate-400 hover:text-white"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onResolve(alert.id)}
                  className="text-slate-400 hover:text-white"
                >
                  <Shield className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfessionalCard>
  );
};

const InsightPanel: React.FC<{ insights: ProprietaryMetric[] }> = ({ insights }) => (
  <ProfessionalCard className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-white">Key Metrics</h3>
      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
        {insights.length}
      </Badge>
    </div>
    <div className="space-y-4">
      {insights.slice(0, 3).map((metric) => (
        <div key={metric.id} className="p-3 rounded-lg bg-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white">{metric.name}</h4>
            <span className="text-lg font-bold text-white">{metric.value}</span>
          </div>
          <Progress 
            value={metric.value} 
            className="h-2 bg-slate-600"
          />
          <p className="text-xs text-slate-400 mt-1">{metric.interpretation.meaning}</p>
        </div>
      ))}
    </div>
  </ProfessionalCard>
);

const WidgetGrid: React.FC<{ widgets: DashboardWidget[] }> = ({ widgets }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {widgets.map((widget) => (
      <div
        key={widget.id}
        className={`col-span-${widget.size.width} row-span-${widget.size.height}`}
      >
        <ProfessionalCard className="p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{widget.title}</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-slate-400">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-slate-400">
            {widget.data.type === 'chart' && <div>Chart placeholder</div>}
            {widget.data.type === 'metric' && (
              <div className="text-3xl font-bold text-white">
                {widget.data.content.value}
              </div>
            )}
            {widget.data.type === 'table' && <div>Table placeholder</div>}
            {widget.data.type === 'list' && <div>List placeholder</div>}
          </div>
        </ProfessionalCard>
      </div>
    ))}
  </div>
);

const LoadingDashboard: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-white mb-2">Initializing MozaWave Enterprise</h2>
      <p className="text-slate-400">Loading intelligence data...</p>
    </div>
  </div>
);

const InitializationError: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Initialization Failed</h2>
      <p className="text-slate-400 mb-4">Unable to load dashboard data</p>
      <Button onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  </div>
);

// Additional helper components would be defined here...
const ChangeItem: React.FC<{ change: any }> = ({ change }) => (
  <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-white">{change.title}</h4>
        <p className="text-xs text-slate-400">{change.description}</p>
      </div>
      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
        {change.impact}
      </Badge>
    </div>
  </div>
);

const CompetitorItem: React.FC<{ competitor: any }> = ({ competitor }) => (
  <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-white">{competitor.name}</h4>
        <p className="text-xs text-slate-400">{competitor.industry}</p>
      </div>
      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
        {competitor.threatLevel}
      </Badge>
    </div>
  </div>
);

const ReviewItem: React.FC<{ review: any }> = ({ review }) => (
  <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">{review.platform}</span>
        </div>
        <p className="text-sm text-white mb-1">{review.content}</p>
        <p className="text-xs text-slate-400">
          {new Date(review.publishedAt).toLocaleDateString()}
        </p>
      </div>
      <Badge 
        variant="secondary" 
        className={`${
          review.sentiment === 'positive' || review.sentiment === 'very_positive' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}
      >
        {review.sentiment}
      </Badge>
    </div>
  </div>
);

const SentimentChart: React.FC<{ reviews: any[] }> = ({ reviews }) => {
  const sentimentCounts = reviews.reduce((acc, review) => {
    acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-2">
      {Object.entries(sentimentCounts).map(([sentiment, count]) => (
        <div key={sentiment} className="flex items-center justify-between">
          <span className="text-sm text-slate-300 capitalize">
            {sentiment.replace('_', ' ')}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-slate-600 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(count / reviews.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 w-8">{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const InsightCard: React.FC<{
  insight: IntelligenceInsight;
  onClick: () => void;
}> = ({ insight, onClick }) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <ProfessionalCard 
      className={`p-6 cursor-pointer transition-all hover:scale-105 border-2 ${getPriorityColor(insight.priority)}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          {insight.category}
        </Badge>
        <Badge className={getPriorityColor(insight.priority)}>
          {insight.priority}
        </Badge>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-3">{insight.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-slate-400">{insight.confidence}% confidence</span>
        </div>
        <span className="text-xs text-slate-400">
          {new Date(insight.createdAt).toLocaleDateString()}
        </span>
      </div>
    </ProfessionalCard>
  );
};

const InsightModal: React.FC<{
  insight: IntelligenceInsight;
  onClose: () => void;
}> = ({ insight, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{insight.title}</h2>
        <Button variant="ghost" onClick={onClose} className="text-slate-400">
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
          <p className="text-slate-300">{insight.description}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Recommendations</h3>
          <div className="space-y-2">
            {insight.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <h4 className="font-medium text-white mb-1">{rec.title}</h4>
                <p className="text-sm text-slate-400">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button className="flex-1">Implement Recommendation</Button>
          <Button variant="outline" className="flex-1">Mark as Reviewed</Button>
        </div>
      </div>
    </motion.div>
  </div>
);

export default MozaWaveEnterpriseDashboard;

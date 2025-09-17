import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Filter,
  Search,
  Bell,
  Settings,
  Zap,
  Shield,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard, ProfessionalCardContent, ProfessionalCardHeader, ProfessionalCardTitle } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { EnterpriseLoading, LoadingCard, SkeletonCard } from '@/components/ui/enterprise-loading';
import { Alert, FormField, StatusIndicator } from '@/components/ui/enterprise-feedback';
import { EnterpriseModal, ConfirmationModal } from '@/components/ui/enterprise-modal';
import { useDualIntelligenceStore } from '@/store/dualIntelligenceStore';
import { generateMozaIntelligenceData } from '@/data/mozaMockData';
import { generateCompetitiveIntelligenceData } from '@/data/competitiveIntelligenceData';

const DualIntelligenceDashboard: React.FC = () => {
  const {
    // Internal data
    customers,
    interactions,
    complaints,
    reviews,
    internalMetrics,
    
    // External data
    competitors,
    competitorComplaints,
    competitorProductLaunches,
    marketingTrends,
    marketOpportunities,
    competitiveThreats,
    dualIntelligenceInsights,
    competitiveDashboard,
    
    // Actions
    setInternalData,
    setExternalData,
    
    // Computed properties
    getCompetitiveAdvantages,
    getMarketGaps,
    getHighPriorityThreats,
    getRevenueOpportunities,
    getStrategicRecommendations,
    getCompetitivePositioning,
    getRevenueOptimizationOpportunities,
    getMarketTrendAnalysis,
    getCompetitiveThreatAnalysis,
    getOpportunityAnalysis
  } = useDualIntelligenceStore();

  // Loading and interaction states
  const [isLoading, setIsLoading] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize data
  useEffect(() => {
    if (customers.length === 0) {
      const internalData = generateMozaIntelligenceData();
      setInternalData({
        customers: internalData.customers,
        interactions: internalData.interactions,
        complaints: internalData.complaints,
        reviews: internalData.reviews,
        revenueIntelligence: internalData.revenueIntelligence,
        metrics: internalData.dashboardMetrics
      });
    }
    
    if (competitors.length === 0) {
      const externalData = generateCompetitiveIntelligenceData();
      setExternalData(externalData);
    }
  }, [customers.length, competitors.length, setInternalData, setExternalData]);

  if (!internalMetrics || !competitiveDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dual Intelligence Platform...</p>
        </div>
      </div>
    );
  }

  const competitiveAdvantages = getCompetitiveAdvantages();
  const marketGaps = getMarketGaps();
  const highPriorityThreats = getHighPriorityThreats();
  const revenueOpportunities = getRevenueOpportunities();
  const strategicRecommendations = getStrategicRecommendations();
  const competitivePositioning = getCompetitivePositioning();
  const revenueOptimization = getRevenueOptimizationOpportunities();
  const marketTrendAnalysis = getMarketTrendAnalysis();
  const threatAnalysis = getCompetitiveThreatAnalysis();
  const opportunityAnalysis = getOpportunityAnalysis();

  const StatCard = ({ title, value, change, icon: Icon, color = 'primary', subtitle, trend }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<any>;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'intelligence';
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => {
    const colorClasses = {
      primary: 'bg-primary-100 text-primary-600',
      success: 'bg-success-100 text-success-600',
      warning: 'bg-warning-100 text-warning-600',
      error: 'bg-error-100 text-error-600',
      intelligence: 'bg-intelligence-100 text-intelligence-600',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfessionalCard variant="elevated" className="hover:shadow-xl">
          <ProfessionalCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-label text-muted-foreground mb-1">{title}</p>
                <p className="text-display-sm text-foreground mb-2">{value}</p>
                {change && (
                  <div className="flex items-center">
                    {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-success-600 mr-1" />}
                    {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-error-600 mr-1" />}
                    <p className={`text-caption ${change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                      {change}
                    </p>
                  </div>
                )}
                {subtitle && (
                  <p className="text-caption text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
              <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </ProfessionalCardContent>
        </ProfessionalCard>
      </motion.div>
    );
  };

  const IntelligenceInsight = ({ insight }: { insight: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ProfessionalCard 
        variant="intelligence" 
        className="hover:shadow-lg cursor-pointer transition-all duration-200"
        onClick={() => {
          setSelectedInsight(insight);
          setShowInsightModal(true);
        }}
      >
        <ProfessionalCardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-heading-md text-foreground mb-2">{insight.title}</h4>
              <p className="text-body-sm text-muted-foreground mb-4">{insight.description}</p>
              <div className="flex items-center space-x-6 text-caption">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-success-600 mr-2" />
                  <span className="text-success-600 font-medium">
                    ${insight.internalData?.revenueImpact?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-intelligence-600 mr-2" />
                  <span className="text-intelligence-600 font-medium">
                    {insight.internalData?.timeToImplement || 'N/A'} days
                  </span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="text-primary-600 font-medium">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge 
                variant={insight.priority === 'critical' ? 'destructive' : 'secondary'}
              >
                {insight.priority}
              </Badge>
              <StatusIndicator status="online" size="sm" />
            </div>
          </div>
        </ProfessionalCardContent>
      </ProfessionalCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-display-md text-foreground font-bold">Moza Intelligence Pro</h1>
                  <p className="text-body-sm text-muted-foreground">Dual Intelligence: Internal + External</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <ProfessionalInput
                  placeholder="Search intelligence insights..."
                  className="w-80"
                  leftIcon={<Search className="w-4 h-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Alerts */}
              <div className="relative">
                <ProfessionalButton variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {highPriorityThreats.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-error-500 text-white">
                      {highPriorityThreats.length}
                    </Badge>
                  )}
                </ProfessionalButton>
              </div>
              
              {/* Settings */}
              <ProfessionalButton variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </ProfessionalButton>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Critical Intelligence Alerts */}
        {highPriorityThreats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ProfessionalCard variant="error" className="border-error-200">
              <ProfessionalCardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-error-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-error-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-md text-error-800 font-semibold mb-1">
                      High Priority Competitive Threats
                    </h3>
                    <p className="text-body-sm text-error-700">
                      {highPriorityThreats.length} urgent competitive threats require immediate attention
                    </p>
                  </div>
                  <ProfessionalButton size="sm" variant="outline" className="ml-auto">
                    View All Threats
                  </ProfessionalButton>
                </div>
              </ProfessionalCardContent>
            </ProfessionalCard>
          </motion.div>
        )}

        {/* Dual Intelligence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Internal Performance"
            value={internalMetrics.customerSatisfaction.toFixed(1)}
            change="+0.3 from last month"
            icon={Users}
            color="primary"
            subtitle="Customer satisfaction score"
            trend="up"
          />
          <StatCard
            title="Competitive Position"
            value={`${competitiveDashboard.marketShare}%`}
            change="+2.1% market share"
            icon={Target}
            color="success"
            subtitle="Market share vs competitors"
            trend="up"
          />
          <StatCard
            title="Revenue Opportunities"
            value={revenueOpportunities.length}
            change="+3 new opportunities"
            icon={DollarSign}
            color="intelligence"
            subtitle="High-value opportunities identified"
            trend="up"
          />
          <StatCard
            title="Intelligence Score"
            value={`${competitiveDashboard.opportunityScore}/100`}
            change="+5 points this week"
            icon={Brain}
            color="warning"
            subtitle="Overall intelligence effectiveness"
            trend="up"
          />
        </div>

        {/* Secondary Intelligence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Competitors"
            value={competitiveDashboard.totalCompetitors}
            change="+1 new competitor detected"
            icon={Globe}
            color="primary"
            subtitle="Monitored competitors"
            trend="up"
          />
          <StatCard
            title="Market Opportunities"
            value={competitiveDashboard.newOpportunities}
            change="+2 opportunities identified"
            icon={Lightbulb}
            color="success"
            subtitle="New market gaps found"
            trend="up"
          />
          <StatCard
            title="Threat Level"
            value={competitiveDashboard.threatLevel}
            change="Medium risk level"
            icon={Shield}
            color="warning"
            subtitle="Current competitive threat level"
            trend="neutral"
          />
          <StatCard
            title="Trending Tactics"
            value={competitiveDashboard.marketTrends}
            change="+4 new trends detected"
            icon={TrendingUp}
            color="intelligence"
            subtitle="Marketing trends identified"
            trend="up"
          />
        </div>

        {/* Main Intelligence Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="competitive">Competitive</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Competitive Advantages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Our Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competitiveAdvantages.slice(0, 5).map((advantage, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Market Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketGaps.slice(0, 5).map((gap) => (
                      <div key={gap.id} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">{gap.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline">{gap.opportunityScore}% opportunity</Badge>
                          <span className="text-xs text-gray-500">{gap.marketSize} market</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dual Intelligence Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Dual Intelligence Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dualIntelligenceInsights.slice(0, 4).map((insight) => (
                    <IntelligenceInsight key={insight.id} insight={insight} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitive" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Competitor Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Competitor Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competitors.slice(0, 5).map((competitor) => (
                      <div key={competitor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                          <p className="text-sm text-gray-600">{competitor.industry} • {competitor.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={competitor.threatLevel === 'high' ? 'destructive' : 'secondary'}>
                            {competitor.threatLevel}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{competitor.marketShare}% market share</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketTrendAnalysis.trendingUp.slice(0, 5).map((trend) => (
                      <div key={trend.id} className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{trend.name}</h4>
                          <Badge variant="outline" className="text-green-600">
                            {trend.adoptionRate}% adoption
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">
                            +{trend.engagementIncrease}% engagement
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunityAnalysis.quickWins.slice(0, 5).map((opportunity) => (
                    <div key={opportunity.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs">
                            <span className="text-blue-600">${opportunity.revenuePotential.toLocaleString()} potential</span>
                            <span className="text-gray-500">{opportunity.timeToMarket} days to market</span>
                            <span className="text-green-600">{opportunity.opportunityScore}% opportunity</span>
                          </div>
                        </div>
                        <Badge variant="outline">Quick Win</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatAnalysis.immediate.slice(0, 5).map((threat) => (
                    <div key={threat.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{threat.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs">
                            <span className="text-red-600">-{threat.potentialImpact.revenue}% revenue impact</span>
                            <span className="text-red-600">-{threat.potentialImpact.marketShare}% market share</span>
                            <span className="text-gray-500">{threat.threatType}</span>
                          </div>
                        </div>
                        <Badge variant="destructive">{threat.severity}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Intelligence Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dualIntelligenceInsights.slice(0, 6).map((insight) => (
                    <IntelligenceInsight key={insight.id} insight={insight} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategicRecommendations.slice(0, 5).map((recommendation) => (
                    <div key={recommendation.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs">
                            <span className="text-purple-600">${recommendation.impact.revenue.toLocaleString()} impact</span>
                            <span className="text-gray-500">{recommendation.impact.time} days</span>
                            <span className="text-green-600">{recommendation.confidence}% confidence</span>
                          </div>
                        </div>
                        <Badge variant={recommendation.priority === 'critical' ? 'destructive' : 'secondary'}>
                          {recommendation.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Insight Detail Modal */}
      <EnterpriseModal
        isOpen={showInsightModal}
        onClose={() => setShowInsightModal(false)}
        title={selectedInsight?.title}
        description={selectedInsight?.description}
        size="lg"
      >
        {selectedInsight && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-success-600" />
                  <span className="font-semibold text-success-900">Revenue Impact</span>
                </div>
                <p className="text-2xl font-bold text-success-700">
                  ${selectedInsight.internalData?.revenueImpact?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-intelligence-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-intelligence-600" />
                  <span className="font-semibold text-intelligence-900">Time to Implement</span>
                </div>
                <p className="text-2xl font-bold text-intelligence-700">
                  {selectedInsight.internalData?.timeToImplement || 'N/A'} days
                </p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-primary-900">Confidence</span>
                </div>
                <p className="text-2xl font-bold text-primary-700">
                  {selectedInsight.confidence}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Strategic Recommendations</h3>
              <div className="space-y-3">
                {selectedInsight.recommendations?.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-neutral-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <ProfessionalButton
                variant="outline"
                onClick={() => setShowInsightModal(false)}
              >
                Close
              </ProfessionalButton>
              <ProfessionalButton
                variant="primary"
                onClick={() => {
                  // Implement action
                  setShowInsightModal(false);
                }}
              >
                Take Action
              </ProfessionalButton>
            </div>
          </div>
        )}
      </EnterpriseModal>
    </div>
  );
};

export default DualIntelligenceDashboard;

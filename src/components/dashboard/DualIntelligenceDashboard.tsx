import React, { useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', subtitle, trend }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<any>;
    color?: string;
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change && (
                <div className="flex items-center mt-1">
                  {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />}
                  {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />}
                  <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                  </p>
                </div>
              )}
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            <div className={`p-3 rounded-full bg-${color}-100`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const IntelligenceInsight = ({ insight }: { insight: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">${insight.internalData?.revenueImpact?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-blue-600">{insight.internalData?.timeToImplement || 'N/A'} days</span>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-purple-600">{insight.confidence}% confidence</span>
            </div>
          </div>
        </div>
        <Badge variant={insight.priority === 'critical' ? 'destructive' : 'secondary'}>
          {insight.priority}
        </Badge>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Moza Intelligence Pro</h1>
                  <p className="text-sm text-gray-600">Dual Intelligence: Internal + External</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search intelligence insights..."
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Alerts */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {highPriorityThreats.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {highPriorityThreats.length}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
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
            className="mb-6"
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">High Priority Competitive Threats</h3>
                    <p className="text-sm text-red-700">
                      {highPriorityThreats.length} urgent competitive threats require immediate attention
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    View All Threats
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Dual Intelligence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Internal Performance"
            value={internalMetrics.customerSatisfaction.toFixed(1)}
            change="+0.3 from last month"
            icon={Users}
            color="blue"
            subtitle="Customer satisfaction score"
            trend="up"
          />
          <StatCard
            title="Competitive Position"
            value={`${competitiveDashboard.marketShare}%`}
            change="+2.1% market share"
            icon={Target}
            color="green"
            subtitle="Market share vs competitors"
            trend="up"
          />
          <StatCard
            title="Revenue Opportunities"
            value={revenueOpportunities.length}
            change="+3 new opportunities"
            icon={DollarSign}
            color="purple"
            subtitle="High-value opportunities identified"
            trend="up"
          />
          <StatCard
            title="Intelligence Score"
            value={`${competitiveDashboard.opportunityScore}/100`}
            change="+5 points this week"
            icon={Brain}
            color="orange"
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
            color="blue"
            subtitle="Monitored competitors"
            trend="up"
          />
          <StatCard
            title="Market Opportunities"
            value={competitiveDashboard.newOpportunities}
            change="+2 opportunities identified"
            icon={Lightbulb}
            color="green"
            subtitle="New market gaps found"
            trend="up"
          />
          <StatCard
            title="Threat Level"
            value={competitiveDashboard.threatLevel}
            change="Medium risk level"
            icon={Shield}
            color="yellow"
            subtitle="Current competitive threat level"
            trend="neutral"
          />
          <StatCard
            title="Trending Tactics"
            value={competitiveDashboard.marketTrends}
            change="+4 new trends detected"
            icon={TrendingUp}
            color="purple"
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
    </div>
  );
};

export default DualIntelligenceDashboard;

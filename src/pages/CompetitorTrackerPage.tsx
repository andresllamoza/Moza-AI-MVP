import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Star,
  MessageCircle,
  Bell,
  Mail,
  Slack,
  BarChart3,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Building2,
  Users,
  Calendar,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';

const CompetitorTrackerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const trackedCompetitors = [
    {
      id: 1,
      name: "Brooklyn Pizza Co",
      industry: "Restaurant",
      location: "Brooklyn, NY",
      status: "active",
      lastUpdate: "2 hours ago",
      priceChange: "+$2.50",
      reviewChange: "+0.2",
      newServices: ["Online Ordering", "Delivery"],
      adSpend: "$1,200/month",
      alerts: 3
    },
    {
      id: 2,
      name: "Green Clean Services",
      industry: "Home Services",
      location: "Austin, TX",
      status: "active",
      lastUpdate: "4 hours ago",
      priceChange: "-$5.00",
      reviewChange: "-0.1",
      newServices: ["Eco-Friendly Products"],
      adSpend: "$800/month",
      alerts: 1
    },
    {
      id: 3,
      name: "TechStart Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      status: "paused",
      lastUpdate: "1 day ago",
      priceChange: "No change",
      reviewChange: "+0.3",
      newServices: [],
      adSpend: "$2,500/month",
      alerts: 0
    }
  ];

  const marketInsights = [
    {
      category: "Pricing Trends",
      insight: "Average service prices increased 8% across tracked competitors",
      impact: "high",
      action: "Consider price adjustment strategy"
    },
    {
      category: "Service Expansion",
      insight: "3 competitors added online booking in the past month",
      impact: "medium",
      action: "Evaluate online presence opportunities"
    },
    {
      category: "Review Sentiment",
      insight: "Competitor review scores declining due to service delays",
      impact: "high",
      action: "Emphasize reliability in marketing"
    },
    {
      category: "Ad Spend",
      insight: "Competitors increased digital ad spend by 25%",
      impact: "medium",
      action: "Review advertising budget allocation"
    }
  ];

  const weeklyDigest = {
    date: "January 15, 2024",
    summary: "Weekly Competitive Intelligence Report",
    keyFindings: [
      "Brooklyn Pizza Co increased delivery fees by $2.50",
      "Green Clean Services launched eco-friendly product line",
      "Market average review score improved by 0.2 points",
      "Digital ad spend increased 25% across tracked competitors"
    ],
    recommendations: [
      "Consider matching delivery fee increase to maintain competitiveness",
      "Evaluate eco-friendly service offerings",
      "Focus on service quality to maintain review advantage",
      "Increase digital marketing budget by 15-20%"
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-400 bg-success-600/20';
      case 'paused': return 'text-warning-400 bg-warning-600/20';
      case 'error': return 'text-red-400 bg-red-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-600/20';
      case 'medium': return 'text-warning-400 bg-warning-600/20';
      case 'low': return 'text-success-400 bg-success-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary-600/20 rounded-lg">
              <Eye className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Automated Competitor & Local Market Tracker</h1>
              <p className="text-xl text-muted-foreground">
                Monitor pricing, reviews, services, and ad spend from competitors automatically
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600/20 rounded-lg">
                <Building2 className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{trackedCompetitors.length}</p>
                <p className="text-sm text-muted-foreground">Tracked Competitors</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success-600/20 rounded-lg">
                <Bell className="w-6 h-6 text-success-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {trackedCompetitors.reduce((sum, c) => sum + c.alerts, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-warning-600/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-warning-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$4.5K</p>
                <p className="text-sm text-muted-foreground">Total Ad Spend</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-muted-foreground">Market Insights</p>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'competitors'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Competitors
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'insights'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Market Insights
            </button>
            <button
              onClick={() => setActiveTab('digest')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'digest'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Weekly Digest
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <ProfessionalButton className="w-full justify-start btn-vibrant-primary">
                    <Plus className="w-5 h-5 mr-3" />
                    Add New Competitor
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Configure Alerts
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <Mail className="w-5 h-5 mr-3" />
                    Setup Email Digest
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <Slack className="w-5 h-5 mr-3" />
                    Connect Slack
                  </ProfessionalButton>
                </div>
              </ProfessionalCard>

              {/* Recent Activity */}
              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-red-600/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Brooklyn Pizza Co increased delivery fees</p>
                      <p className="text-muted-foreground text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-success-600/20 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-success-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Green Clean Services added new service</p>
                      <p className="text-muted-foreground text-xs">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-warning-600/20 rounded-lg">
                      <Bell className="w-4 h-4 text-warning-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Weekly digest sent successfully</p>
                      <p className="text-muted-foreground text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            </div>
          )}

          {activeTab === 'competitors' && (
            <div className="space-y-6">
              {trackedCompetitors.map((competitor) => (
                <ProfessionalCard key={competitor.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary-600/20 rounded-lg">
                        <Building2 className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{competitor.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{competitor.industry}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {competitor.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competitor.status)}`}>
                        {competitor.status}
                      </span>
                      {competitor.status === 'active' ? (
                        <ProfessionalButton size="sm" variant="outline">
                          <Pause className="w-4 h-4" />
                        </ProfessionalButton>
                      ) : (
                        <ProfessionalButton size="sm" className="btn-vibrant-primary">
                          <Play className="w-4 h-4" />
                        </ProfessionalButton>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{competitor.priceChange}</div>
                      <div className="text-xs text-muted-foreground">Price Change</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{competitor.reviewChange}</div>
                      <div className="text-xs text-muted-foreground">Review Change</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{competitor.adSpend}</div>
                      <div className="text-xs text-muted-foreground">Monthly Ad Spend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{competitor.alerts}</div>
                      <div className="text-xs text-muted-foreground">Active Alerts</div>
                    </div>
                  </div>

                  {competitor.newServices.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">New Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {competitor.newServices.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Last updated: {competitor.lastUpdate}</p>
                    <div className="flex space-x-2">
                      <ProfessionalButton size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </ProfessionalButton>
                    </div>
                  </div>
                </ProfessionalCard>
              ))}
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              {marketInsights.map((insight, index) => (
                <ProfessionalCard key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-warning-600/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-warning-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{insight.category}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{insight.insight}</p>
                      <p className="text-sm text-primary-400 font-medium">💡 {insight.action}</p>
                    </div>
                  </div>
                </ProfessionalCard>
              ))}
            </div>
          )}

          {activeTab === 'digest' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Latest Weekly Digest</h3>
                <div className="mb-4">
                  <p className="text-muted-foreground">Report Date: {weeklyDigest.date}</p>
                  <p className="text-lg font-medium text-white">{weeklyDigest.summary}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {weeklyDigest.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-success-400 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {weeklyDigest.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ProfessionalCard>

              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Digest Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Digest</p>
                      <p className="text-sm text-muted-foreground">Weekly summary via email</p>
                    </div>
                    <ProfessionalButton size="sm" className="btn-vibrant-primary">
                      <Mail className="w-4 h-4 mr-2" />
                      Configure
                    </ProfessionalButton>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Slack Notifications</p>
                      <p className="text-sm text-muted-foreground">Real-time alerts to Slack</p>
                    </div>
                    <ProfessionalButton size="sm" className="btn-vibrant-primary">
                      <Slack className="w-4 h-4 mr-2" />
                      Connect
                    </ProfessionalButton>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Alert Frequency</p>
                      <p className="text-sm text-muted-foreground">How often to check for changes</p>
                    </div>
                    <select className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                      <option>Every 2 hours</option>
                      <option>Every 4 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                </div>
              </ProfessionalCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompetitorTrackerPage;

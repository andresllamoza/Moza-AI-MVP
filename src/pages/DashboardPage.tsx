import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  Zap,
  ArrowRight,
  Play,
  FileText,
  Lightbulb,
  Building2
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

const DashboardPage: React.FC = () => {
  const quickActions = [
    {
      title: "New Intelligence Analysis",
      description: "Analyze a business and get competitive insights",
      icon: Brain,
      action: "Start Analysis",
      href: "/"
    },
    {
      title: "View Recent Reports",
      description: "Access your latest intelligence reports",
      icon: FileText,
      action: "View Reports",
      href: "/reports"
    },
    {
      title: "Explore Insights",
      description: "Discover actionable business insights",
      icon: Lightbulb,
      action: "View Insights",
      href: "/insights"
    },
    {
      title: "Manage Integrations",
      description: "Connect data sources and APIs",
      icon: Building2,
      action: "Manage",
      href: "/integrations"
    }
  ];

  const metrics = [
    { label: "Analyses Completed", value: "24", change: "+12%", trend: "up" },
    { label: "Insights Generated", value: "156", change: "+8%", trend: "up" },
    { label: "Revenue Impact", value: "$47K", change: "+23%", trend: "up" },
    { label: "Time Saved", value: "340h", change: "+15%", trend: "up" }
  ];

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
          <h1 className="text-4xl font-bold text-white mb-2">Intelligence Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Your command center for business intelligence and competitive analysis
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, index) => (
            <ProfessionalCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
                <div className="flex items-center space-x-1 text-success-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </ProfessionalCard>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <ProfessionalCard key={index} className="p-6 hover:bg-dark-700 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-600/20 rounded-lg">
                    <action.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-muted-foreground mb-4">{action.description}</p>
                    <ProfessionalButton
                      onClick={() => window.location.href = action.href}
                      size="sm"
                      className="btn-vibrant-primary"
                    >
                      {action.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ProfessionalButton>
                  </div>
                </div>
              </ProfessionalCard>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <ProfessionalCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="p-2 bg-success-600/20 rounded-lg">
                  <Zap className="w-5 h-5 text-success-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Analysis completed for "Mario's Artisan Pizza"</p>
                  <p className="text-sm text-muted-foreground">Generated 12 actionable insights • 2 hours ago</p>
                </div>
                <ProfessionalButton size="sm" variant="outline">
                  View Report
                </ProfessionalButton>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="p-2 bg-primary-600/20 rounded-lg">
                  <Target className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Competitive analysis updated for "Brooklyn Pizza Co"</p>
                  <p className="text-sm text-muted-foreground">3 new competitors identified • 5 hours ago</p>
                </div>
                <ProfessionalButton size="sm" variant="outline">
                  View Report
                </ProfessionalButton>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="p-2 bg-warning-600/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-warning-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Revenue impact analysis completed</p>
                  <p className="text-sm text-muted-foreground">Potential $12K increase identified • 1 day ago</p>
                </div>
                <ProfessionalButton size="sm" variant="outline">
                  View Report
                </ProfessionalButton>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

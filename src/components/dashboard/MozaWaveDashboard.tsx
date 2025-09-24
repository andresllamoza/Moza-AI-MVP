import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star, 
  AlertTriangle,
  Activity,
  Target,
  DollarSign,
  BarChart3,
  PieChart,
  LineChart,
  Bell
} from 'lucide-react';
import { GlassmorphismCard, CompactGlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { 
  CompetitorComparisonChart, 
  SentimentDonutChart, 
  RevenueImpactChart, 
  AlertIndicator,
  MetricTrendChart
} from '@/components/ui/animated-charts';
import { EnhancedThemeToggle } from '@/components/ui/enhanced-theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const competitorData = [
  { name: 'MozaWave', score: 92, color: '#4F46E5' },
  { name: 'Competitor A', score: 78, color: '#10B981' },
  { name: 'Competitor B', score: 65, color: '#F59E0B' },
  { name: 'Competitor C', score: 58, color: '#EF4444' },
];

const sentimentData = [
  { name: 'Positive', value: 75, color: '#10B981' },
  { name: 'Neutral', value: 20, color: '#F59E0B' },
  { name: 'Negative', value: 5, color: '#EF4444' },
];

const revenueData = [
  { date: 'Jan', revenue: 12000, impact: 15000 },
  { date: 'Feb', revenue: 15000, impact: 18000 },
  { date: 'Mar', revenue: 18000, impact: 22000 },
  { date: 'Apr', revenue: 22000, impact: 25000 },
  { date: 'May', revenue: 25000, impact: 28000 },
  { date: 'Jun', revenue: 28000, impact: 32000 },
];

const metricData = [
  { period: 'Q1', value: 85, target: 80 },
  { period: 'Q2', value: 92, target: 85 },
  { period: 'Q3', value: 88, target: 90 },
  { period: 'Q4', value: 95, target: 95 },
];

export const MozaWaveDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">M</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MozaWave</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Business Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {(['7d', '30d', '90d', '1y'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className="transition-all duration-200"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
              <EnhancedThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Key Metrics Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassmorphismCard
              title="Total Revenue"
              value="$284,392"
              change={{ value: 12.5, type: 'increase', period: 'vs last month' }}
              icon={DollarSign}
              iconColor="success"
              trend={{ data: [20, 25, 30, 35, 40, 45, 42], type: 'line' }}
            />
            <GlassmorphismCard
              title="Active Users"
              value="12,847"
              change={{ value: 8.2, type: 'increase', period: 'vs last month' }}
              icon={Users}
              iconColor="primary"
              trend={{ data: [100, 120, 140, 160, 180, 200, 195], type: 'bar' }}
            />
            <GlassmorphismCard
              title="Review Score"
              value="4.8"
              change={{ value: 2.1, type: 'increase', period: 'vs last month' }}
              icon={Star}
              iconColor="warning"
              trend={{ data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8], type: 'line' }}
            />
            <GlassmorphismCard
              title="Response Time"
              value="1.2s"
              change={{ value: -15.3, type: 'increase', period: 'vs last month' }}
              icon={Activity}
              iconColor="success"
              trend={{ data: [2.1, 1.9, 1.7, 1.5, 1.3, 1.2, 1.2], type: 'line' }}
            />
          </motion.div>

          {/* Alerts Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AlertIndicator
              type="success"
              message="All systems operational"
              count={0}
            />
            <AlertIndicator
              type="warning"
              message="3 reviews pending response"
              count={3}
            />
            <AlertIndicator
              type="info"
              message="New competitor analysis available"
              count={1}
            />
          </motion.div>

          {/* Charts Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompetitorComparisonChart data={competitorData} />
            <SentimentDonutChart data={sentimentData} />
          </motion.div>

          {/* Revenue Impact Chart */}
          <motion.div variants={itemVariants}>
            <RevenueImpactChart data={revenueData} />
          </motion.div>

          {/* Secondary Metrics Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CompactGlassmorphismCard
              title="Conversion Rate"
              value="24.3%"
              change={{ value: 3.2, type: 'increase' }}
              icon={Target}
              iconColor="success"
              subtitle="Website visitors to customers"
            />
            <CompactGlassmorphismCard
              title="Customer Satisfaction"
              value="94%"
              change={{ value: 1.8, type: 'increase' }}
              icon={MessageSquare}
              iconColor="primary"
              subtitle="Based on recent surveys"
            />
            <CompactGlassmorphismCard
              title="Market Share"
              value="12.4%"
              change={{ value: 0.9, type: 'increase' }}
              icon={PieChart}
              iconColor="warning"
              subtitle="In your industry segment"
            />
            <CompactGlassmorphismCard
              title="Growth Rate"
              value="18.7%"
              change={{ value: 2.3, type: 'increase' }}
              icon={TrendingUp}
              iconColor="success"
              subtitle="Monthly recurring revenue"
            />
          </motion.div>

          {/* Metric Trend Chart */}
          <motion.div variants={itemVariants}>
            <MetricTrendChart 
              data={metricData} 
              title="Performance vs Targets (Quarterly)"
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="glass-card h-20 flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="glass-card h-20 flex-col space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">Reviews</span>
              </Button>
              <Button variant="outline" className="glass-card h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Customers</span>
              </Button>
              <Button variant="outline" className="glass-card h-20 flex-col space-y-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Alerts</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 glass-card border-t border-border/50"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="glass-card">
                Enterprise Ready
              </Badge>
              <Badge variant="outline" className="glass-card">
                SOC 2 Compliant
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 MozaWave. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

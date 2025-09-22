// Temporary simplified dashboard to resolve build errors
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Users, BarChart3 } from 'lucide-react';

export const VibrantEnterpriseDashboardFallback = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enterprise Dashboard</h1>
        <Button>View Analytics</Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Brain, label: "AI Insights", value: "24", color: "text-primary" },
          { icon: TrendingUp, label: "Growth", value: "+15%", color: "text-success" },
          { icon: Users, label: "Users", value: "1,234", color: "text-warning" },
          { icon: BarChart3, label: "Analytics", value: "99.9%", color: "text-accent" }
        ].map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Intelligence Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dashboard functionality coming soon.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VibrantEnterpriseDashboardFallback;
// Simplified DualIntelligenceDashboard for Lovable latest version
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Users, BarChart3, Eye, Zap, Shield } from 'lucide-react';

const DualIntelligenceDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Dual Intelligence Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining internal customer data with external competitive intelligence for unprecedented business insights.
          </p>
        </div>

        {/* Intelligence Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Internal Intelligence */}
          <Card className="border-border hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Internal Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Deep analysis of your customer data, behavior patterns, and internal metrics.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Active Customers", value: "1,234", icon: Users },
                  { label: "Satisfaction", value: "94%", icon: TrendingUp },
                  { label: "Revenue Growth", value: "+18%", icon: BarChart3 },
                  { label: "Insights Generated", value: "47", icon: Eye }
                ].map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-muted/30 rounded-xl">
                    <metric.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* External Intelligence */}
          <Card className="border-border hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-accent" />
                External Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Competitive analysis, market trends, and external opportunities monitoring.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Competitors Tracked", value: "12", icon: Eye },
                  { label: "Market Opportunities", value: "8", icon: Zap },
                  { label: "Threat Level", value: "Low", icon: Shield },
                  { label: "Market Share", value: "23%", icon: TrendingUp }
                ].map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-muted/30 rounded-xl">
                    <metric.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fused Intelligence */}
        <Card className="border-border bg-gradient-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
              Fused Intelligence Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              AI-powered fusion of internal and external data creates actionable insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Revenue Opportunity",
                  value: "$15,400",
                  description: "Predicted monthly increase by addressing competitor weaknesses",
                  confidence: "87%"
                },
                {
                  title: "Customer Retention Risk",
                  value: "12 customers",
                  description: "At risk based on competitor promotions and satisfaction trends",
                  confidence: "92%"
                },
                {
                  title: "Market Position",
                  value: "Strong Growth",
                  description: "Outperforming 8 of 12 tracked competitors in key metrics",
                  confidence: "95%"
                }
              ].map((insight, index) => (
                <div key={index} className="p-6 bg-card rounded-2xl border border-border">
                  <div className="text-2xl font-bold text-foreground mb-2">{insight.value}</div>
                  <div className="text-sm font-semibold text-primary mb-2">{insight.title}</div>
                  <div className="text-sm text-muted-foreground mb-3">{insight.description}</div>
                  <div className="text-xs text-success font-medium">{insight.confidence} confidence</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-gradient-primary text-white px-8 py-3 rounded-2xl font-semibold">
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DualIntelligenceDashboard;
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmailClassificationCard } from "./EmailClassificationCard";
import { StatsCard } from "./StatsCard";
import { Mail, Clock, AlertTriangle, CheckCircle, BarChart3, Users, Target, Bot } from "lucide-react";

const sampleEmails = [
  {
    id: "1",
    subject: "URGENT: Payment Failed - Account Suspended",
    sender: "john.smith@company.com",
    snippet: "Hi, my payment failed this morning and now I can't access our premium features. This is affecting our entire team's productivity...",
    urgency: "urgent" as const,
    department: "billing" as const,
    intent: "complaint" as const,
    needsHuman: true,
    timestamp: "2 minutes ago",
    confidence: 0.94,
    senderHistory: "Premium customer, 2 previous tickets",
    estimatedResponseTime: "< 1 hour",
    autoResponse: {
      type: "escalation",
      message: "Your payment issue has been flagged as urgent and assigned to our senior billing specialist.",
      nextAction: "Human escalation to Sarah (Billing Manager)"
    },
    routing: {
      assignedTo: "Sarah Johnson - Billing Manager",
      priority: "P1 - Critical",
      sla: "1 hour response required"
    }
  },
  {
    id: "2",
    subject: "Question about API rate limits",
    sender: "developer@startup.io",
    snippet: "I'm integrating your API and need clarification on the rate limits for the pro plan. The documentation mentions...",
    urgency: "normal" as const,
    department: "support" as const,
    intent: "question" as const,
    needsHuman: false,
    timestamp: "5 minutes ago",
    confidence: 0.89,
    senderHistory: "New developer, first inquiry",
    estimatedResponseTime: "Auto-resolved",
    autoResponse: {
      type: "faq",
      message: "Auto-replied with API documentation and rate limit details for Pro plan (1000 req/min).",
      nextAction: "FAQ response sent, monitoring for follow-up"
    },
    routing: {
      assignedTo: "Auto-resolved",
      priority: "P3 - Low",
      sla: "Immediate (automated)"
    }
  },
  {
    id: "3",
    subject: "Thank you for the amazing service!",
    sender: "happy.customer@business.com",
    snippet: "Just wanted to say thanks for the incredible support yesterday. Your team went above and beyond to help us...",
    urgency: "low" as const,
    department: "general" as const,
    intent: "compliment" as const,
    needsHuman: false,
    timestamp: "8 minutes ago",
    confidence: 0.96,
    senderHistory: "Long-time customer, positive sentiment",
    estimatedResponseTime: "Auto-acknowledged",
    autoResponse: {
      type: "acknowledgment",
      message: "Automatic thank you response sent. Feedback forwarded to team for recognition.",
      nextAction: "Sentiment logged, team notification sent"
    },
    routing: {
      assignedTo: "Customer Success Team (FYI)",
      priority: "P4 - Info",
      sla: "No response required"
    }
  },
  {
    id: "4",
    subject: "Enterprise demo request",
    sender: "cto@bigcorp.com",
    snippet: "We're interested in your enterprise solution for our 500+ employee company. Could we schedule a demo this week?",
    urgency: "normal" as const,
    department: "sales" as const,
    intent: "request" as const,
    needsHuman: true,
    timestamp: "12 minutes ago",
    confidence: 0.91,
    senderHistory: "High-value prospect, enterprise domain",
    estimatedResponseTime: "< 2 hours",
    autoResponse: {
      type: "immediate_acknowledgment",
      message: "Enterprise demo request acknowledged. Sales team notified with high lead score.",
      nextAction: "Assigned to senior sales rep with enterprise experience"
    },
    routing: {
      assignedTo: "Mike Chen - Enterprise Sales",
      priority: "P2 - High",
      sla: "2 hours (high-value lead)"
    }
  },
  {
    id: "5",
    subject: "Password reset not working",
    sender: "user@company.com",
    snippet: "I've tried to reset my password multiple times but I'm not receiving the email. I need access urgently for a client meeting...",
    urgency: "urgent" as const,
    department: "support" as const,
    intent: "request" as const,
    needsHuman: false,
    timestamp: "15 minutes ago",
    confidence: 0.87,
    senderHistory: "Regular user, technical issue",
    estimatedResponseTime: "Auto-resolved",
    autoResponse: {
      type: "troubleshooting",
      message: "Auto-sent troubleshooting steps and manually triggered password reset.",
      nextAction: "Issue resolved automatically, follow-up scheduled"
    },
    routing: {
      assignedTo: "Auto-resolved with monitoring",
      priority: "P2 - High",
      sla: "Immediate (automated + monitor)"
    }
  }
];

export function DemoSection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [processedEmails, setProcessedEmails] = useState<typeof sampleEmails>([]);
  const [demoPhase, setDemoPhase] = useState(1);
  const [activeTab, setActiveTab] = useState("emails");

  const processNextEmail = () => {
    if (currentEmailIndex >= sampleEmails.length) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedEmails(prev => [...prev, sampleEmails[currentEmailIndex]]);
      setCurrentEmailIndex(prev => prev + 1);
      setIsProcessing(false);
    }, 2000);
  };

  const resetDemo = () => {
    setProcessedEmails([]);
    setCurrentEmailIndex(0);
    setIsProcessing(false);
  };

  const stats = [
    {
      title: "Emails Processed",
      value: processedEmails.length,
      change: "+12% this hour",
      icon: Mail,
      variant: "default" as const
    },
    {
      title: "Avg Processing Time",
      value: "0.3s",
      change: "85% faster",
      icon: Clock,
      variant: "success" as const
    },
    {
      title: "Auto-Resolution Rate",
      value: `${Math.round((processedEmails.filter(e => !e.needsHuman).length / Math.max(processedEmails.length, 1)) * 100)}%`,
      change: "Industry leading",
      icon: Bot,
      variant: "success" as const
    },
    {
      title: "Accuracy Score",
      value: processedEmails.length > 0 ? `${Math.round(processedEmails.reduce((acc, e) => acc + e.confidence, 0) / processedEmails.length * 100)}%` : "0%",
      change: "AI confidence",
      icon: Target,
      variant: "default" as const
    }
  ];

  // Sample data for demo
  const sampleLeads = [
    { name: 'Alex Turner', email: 'alex@example.com', phone: '(415) 555-1010', source: 'Website Form', status: 'new' },
    { name: 'Jordan Lee', email: 'jordan@example.com', phone: '(628) 555-9933', source: 'Google Ads', status: 'contacted' },
    { name: 'Sam Patel', email: 'sam@example.com', phone: '(650) 555-2211', source: 'Facebook', status: 'qualified' },
    { name: 'Taylor Brooks', email: 'taylor@example.com', phone: '(510) 555-7788', source: 'Referral', status: 'new' },
  ];

  const sampleReviews = [
    { customer: 'Taylor Brooks', rating: 5, source: 'Google', comment: 'Great work on our remodel!', sentiment: 'positive' },
    { customer: 'Chris Yang', rating: 4, source: 'Facebook', comment: 'Fast and professional.', sentiment: 'positive' },
    { customer: 'Morgan Diaz', rating: 3, source: 'Yelp', comment: 'Good but room for improvement.', sentiment: 'neutral' },
    { customer: 'Jamie Smith', rating: 5, source: 'Google', comment: 'Exceeded our expectations!', sentiment: 'positive' },
  ];

  const dashboardStats = [
    { title: "Leads Captured", value: 78, icon: Users, variant: "success" as const },
    { title: "Leads Missed", value: 42, icon: AlertTriangle, variant: "warning" as const },
    { title: "Conversion Rate", value: "65%", icon: Target, variant: "default" as const },
    { title: "Est. Monthly ROI", value: "$16,500", icon: BarChart3, variant: "success" as const },
  ];

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">Live Demo - No Login Required</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore all features of Moza AI including email intelligence, lead tracking, 
            review management, and dashboard analytics. Everything is fully functional in this demo.
          </p>
        </div>

        {/* Demo Navigation Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button 
            variant={activeTab === "emails" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("emails")}
          >
            Email Intelligence
          </Button>
          <Button 
            variant={activeTab === "dashboard" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard & ROI
          </Button>
          <Button 
            variant={activeTab === "leads" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("leads")}
          >
            Lead Management
          </Button>
          <Button 
            variant={activeTab === "reviews" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("reviews")}
          >
            Review Monitoring
          </Button>
        </div>

        {/* Email Intelligence Tab */}
        {activeTab === "emails" && (
          <>
            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Demo Phase Selector */}
            <div className="flex justify-center gap-2 mb-8">
              <Button 
                variant={demoPhase === 1 ? "default" : "outline"} 
                size="sm"
                onClick={() => setDemoPhase(1)}
              >
                Phase 1: Basic Classification
              </Button>
              <Button 
                variant={demoPhase === 2 ? "default" : "outline"} 
                size="sm"
                onClick={() => setDemoPhase(2)}
              >
                Phase 2: Smart Responses
              </Button>
              <Button 
                variant={demoPhase === 3 ? "default" : "outline"} 
                size="sm"
                onClick={() => setDemoPhase(3)}
              >
                Phase 3: Full Automation
              </Button>
            </div>

            {/* Demo Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                onClick={processNextEmail} 
                disabled={isProcessing || currentEmailIndex >= sampleEmails.length}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </>
                ) : currentEmailIndex >= sampleEmails.length ? (
                  "Demo Complete"
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4" />
                    Process Next Email
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetDemo}>
                Reset Demo
              </Button>
            </div>

            {/* Email Feed */}
            <div className="space-y-4 max-w-6xl mx-auto">
              {processedEmails.map((email, index) => (
                <div 
                  key={email.id}
                  className="animate-in slide-in-from-top-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EmailClassificationCard email={email} demoPhase={demoPhase} />
                </div>
              ))}
              
              {processedEmails.length === 0 && (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Ready to Process Emails</h3>
                  <p className="text-muted-foreground">
                    Click "Process Next Email" to see our AI classification and automation in action
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Dashboard & ROI Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-card-foreground">ROI Calculator</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Monthly Inquiries</label>
                      <div className="text-2xl font-bold text-foreground">120</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Leads Captured</label>
                      <div className="text-2xl font-bold text-success">78</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Value per Lead</label>
                      <div className="text-2xl font-bold text-foreground">$500</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Plan Cost</label>
                      <div className="text-2xl font-bold text-foreground">$500/mo</div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Regained Leads</div>
                      <div className="text-2xl font-semibold text-success">17</div>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Missed Leads</div>
                      <div className="text-2xl font-semibold text-warning">42</div>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Projected ROI</div>
                      <div className="text-2xl font-semibold text-success">$8,000</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-card-foreground">What's included in MVP</h3>
                </div>
                <div className="p-6">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Instant email auto-response via Resend</li>
                    <li>SMS follow-ups via Twilio</li>
                    <li>Review request sequences for Google</li>
                    <li>Leads and reviews dashboards with ROI tracking</li>
                    <li>AI-powered email classification and routing</li>
                    <li>Automated sentiment analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leads Management Tab */}
        {activeTab === "leads" && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-card-foreground">Lead Management Dashboard</h3>
                <p className="text-muted-foreground">Track and manage all your captured leads in one place</p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-card-foreground font-medium">Name</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Email</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Phone</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Source</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleLeads.map((lead, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4 font-medium text-card-foreground">{lead.name}</td>
                          <td className="p-4 text-muted-foreground">{lead.email}</td>
                          <td className="p-4 text-muted-foreground">{lead.phone}</td>
                          <td className="p-4 text-muted-foreground">{lead.source}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              lead.status === 'qualified' ? 'bg-success/10 text-success border border-success/20' :
                              lead.status === 'contacted' ? 'bg-primary/10 text-primary border border-primary/20' :
                              'bg-muted text-muted-foreground border border-border'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Management Tab */}
        {activeTab === "reviews" && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-card-foreground">Review Monitoring Dashboard</h3>
                <p className="text-muted-foreground">Monitor customer reviews and sentiment across all platforms</p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-card-foreground font-medium">Customer</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Rating</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Source</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Comment</th>
                        <th className="text-left p-4 text-card-foreground font-medium">Sentiment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleReviews.map((review, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4 font-medium text-card-foreground">{review.customer}</td>
                          <td className="p-4 text-muted-foreground">{'⭐'.repeat(review.rating)}</td>
                          <td className="p-4 text-muted-foreground">{review.source}</td>
                          <td className="p-4 max-w-xs truncate text-muted-foreground">{review.comment}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${
                              review.sentiment === 'positive' ? 'bg-success/10 text-success border-success/20' :
                              review.sentiment === 'neutral' ? 'bg-warning/10 text-warning border-warning/20' :
                              'bg-destructive/10 text-destructive border-destructive/20'
                            }`}>
                              {review.sentiment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, User, Flag, MessageCircle, Target, Brain, ArrowRight, Bot, Zap, Users } from "lucide-react";

interface EmailClassificationCardProps {
  email: {
    id: string;
    subject: string;
    sender: string;
    snippet: string;
    urgency: "urgent" | "normal" | "low";
    department: "sales" | "support" | "billing" | "general";
    intent: "complaint" | "question" | "request" | "compliment";
    needsHuman: boolean;
    timestamp: string;
    confidence: number;
    senderHistory: string;
    estimatedResponseTime: string;
    autoResponse: {
      type: string;
      message: string;
      nextAction: string;
    };
    routing: {
      assignedTo: string;
      priority: string;
      sla: string;
    };
  };
  demoPhase: number;
}

const urgencyColors = {
  urgent: "urgent",
  normal: "warning", 
  low: "success",
} as const;

const departmentColors = {
  sales: "primary",
  support: "accent",
  billing: "warning",
  general: "secondary",
} as const;

const responseTypeColors = {
  escalation: "urgent",
  faq: "accent",
  acknowledgment: "success", 
  immediate_acknowledgment: "primary",
  troubleshooting: "warning",
} as const;

export function EmailClassificationCard({ email, demoPhase }: EmailClassificationCardProps) {
  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-foreground line-clamp-1">{email.subject}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <User className="h-4 w-4" />
              <span>{email.sender}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{email.timestamp}</span>
              {demoPhase >= 2 && (
                <>
                  <Target className="h-4 w-4 ml-2" />
                  <span>{Math.round(email.confidence * 100)}% confidence</span>
                </>
              )}
            </div>
          </div>
          {email.needsHuman && (
            <Flag className="h-5 w-5 text-urgent" />
          )}
        </div>

        {/* Email snippet */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {email.snippet}
        </p>

        {/* Phase 1: Basic Classifications */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={urgencyColors[email.urgency] as any} className="capitalize">
            {email.urgency} Priority
          </Badge>
          <Badge variant={departmentColors[email.department] as any} className="capitalize">
            {email.department}
          </Badge>
          <Badge variant="outline" className="capitalize">
            <MessageCircle className="h-3 w-3 mr-1" />
            {email.intent}
          </Badge>
          {email.needsHuman && (
            <Badge variant="destructive">
              Requires Human
            </Badge>
          )}
        </div>

        {/* Phase 2: Smart Response System */}
        {demoPhase >= 2 && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Bot className="h-4 w-4 text-primary" />
              Automated Response Generated
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={responseTypeColors[email.autoResponse.type as keyof typeof responseTypeColors] as any} className="text-xs">
                  {email.autoResponse.type.replace('_', ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Response time: {email.estimatedResponseTime}
                </span>
              </div>
              <p className="text-sm text-foreground bg-background/50 p-2 rounded border-l-2 border-primary/20">
                {email.autoResponse.message}
              </p>
            </div>
          </div>
        )}

        {/* Phase 3: Full Automation & Routing */}
        {demoPhase >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Routing */}
            <div className="bg-accent/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <ArrowRight className="h-4 w-4" />
                Smart Routing
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned to:</span>
                  <span className="font-medium">{email.routing.assignedTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="font-medium">{email.routing.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SLA:</span>
                  <span className="font-medium">{email.routing.sla}</span>
                </div>
              </div>
            </div>

            {/* Sender Intelligence */}
            <div className="bg-success/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-success">
                <Brain className="h-4 w-4" />
                Sender Analysis
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">History:</span>
                  <span className="font-medium">{email.senderHistory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Action:</span>
                  <span className="font-medium text-wrap">{email.autoResponse.nextAction}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
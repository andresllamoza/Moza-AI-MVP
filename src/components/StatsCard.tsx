import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "urgent";
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  urgent: "bg-urgent/10 text-urgent",
};

export function StatsCard({ title, value, change, icon: Icon, variant = "default" }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 border-border/50 bg-gradient-subtle">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <p className="text-sm font-semibold text-success flex items-center gap-1">
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl shadow-glass ${variantStyles[variant]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
}
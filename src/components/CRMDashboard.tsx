import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Target,
  Activity,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { ReviewsManagement } from "./ReviewsManagement";
import { GoogleProfileManager } from "./GoogleProfileManager";

const quickStats = [
  { title: "Active Leads", value: "24", change: "+12%", icon: Users, variant: "default" as const },
  { title: "Avg. Rating", value: "4.7", change: "+0.3", icon: Star, variant: "success" as const },
  { title: "Response Rate", value: "94%", change: "+8%", icon: TrendingUp, variant: "success" as const },
  { title: "Urgent Items", value: "3", change: "-2", icon: AlertTriangle, variant: "warning" as const },
];

const recentActivity = [
  { type: "review", message: "New 5-star review from Sarah Johnson", time: "2 minutes ago", icon: Star },
  { type: "lead", message: "New lead inquiry from Mike Chen", time: "15 minutes ago", icon: Users },
  { type: "response", message: "Auto-response sent to Lisa Rodriguez", time: "1 hour ago", icon: Mail },
  { type: "profile", message: "Google profile updated with new photos", time: "3 hours ago", icon: MapPin },
  { type: "call", message: "Phone call scheduled with David Kim", time: "5 hours ago", icon: Phone },
];

const upcomingTasks = [
  { task: "Follow up with negative review", priority: "high", due: "Today", icon: AlertTriangle },
  { task: "Schedule consultation call", priority: "medium", due: "Tomorrow", icon: Phone },
  { task: "Update business hours", priority: "low", due: "This week", icon: Calendar },
  { task: "Add new project photos", priority: "medium", due: "Friday", icon: Activity },
];

export function CRMDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant={stat.variant} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.variant === 'success' ? 'success' : stat.variant === 'warning' ? 'warning' : 'primary'}/10`}>
                  <stat.icon className={`h-6 w-6 text-${stat.variant === 'success' ? 'success' : stat.variant === 'warning' ? 'warning' : 'primary'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Tasks */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Send Review Request
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Phone className="h-4 w-4" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MapPin className="h-4 w-4" />
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Target className="h-4 w-4" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-destructive' : 
                      task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main CRM Tabs */}
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews" className="gap-2">
            <Star className="h-4 w-4" />
            Reviews Management
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <MapPin className="h-4 w-4" />
            Google Profile
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <ReviewsManagement />
        </TabsContent>
        
        <TabsContent value="profile">
          <GoogleProfileManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
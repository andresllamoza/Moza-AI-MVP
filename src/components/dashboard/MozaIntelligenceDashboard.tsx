import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  AlertTriangle,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Eye,
  Filter,
  Search,
  Bell,
  Settings,
  BarChart3,
  Mail,
  Phone,
  Globe,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMozaIntelligenceStore } from '@/store/mozaIntelligenceStore';
import { generateMozaIntelligenceData } from '@/data/mozaMockData';

const MozaIntelligenceDashboard: React.FC = () => {
  const {
    customers,
    interactions,
    complaints,
    reviews,
    dashboardMetrics,
    alerts,
    setCustomers,
    setInteractions,
    setComplaints,
    setReviews,
    setDashboardMetrics,
    setAlerts,
    getUnreadAlerts,
    getCriticalAlerts
  } = useMozaIntelligenceStore();

  // Initialize data
  useEffect(() => {
    if (customers.length === 0) {
      const data = generateMozaIntelligenceData();
      setCustomers(data.customers);
      setInteractions(data.interactions);
      setComplaints(data.complaints);
      setReviews(data.reviews);
      setDashboardMetrics(data.dashboardMetrics);
      setAlerts(data.alerts);
    }
  }, [customers.length, setCustomers, setInteractions, setComplaints, setReviews, setDashboardMetrics, setAlerts]);

  const unreadAlerts = getUnreadAlerts();
  const criticalAlerts = getCriticalAlerts();

  if (!dashboardMetrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Moza Intelligence Pro...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', subtitle }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<any>;
    color?: string;
    subtitle?: string;
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
                <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {change}
                </p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Moza Intelligence Pro</h1>
                  <p className="text-sm text-gray-600">Customer Relationship Intelligence Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search customers, interactions..."
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Alerts */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadAlerts.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadAlerts.length}
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
        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
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
                    <h3 className="font-semibold text-red-800">Critical Alerts</h3>
                    <p className="text-sm text-red-700">
                      {criticalAlerts.length} urgent items require immediate attention
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Customers"
            value={dashboardMetrics.totalCustomers}
            change="+12% from last month"
            icon={Users}
            color="blue"
            subtitle="Active customer base"
          />
          <StatCard
            title="Active Interactions"
            value={dashboardMetrics.activeInteractions}
            change="+8% from last week"
            icon={MessageSquare}
            color="green"
            subtitle="Currently in progress"
          />
          <StatCard
            title="Open Complaints"
            value={dashboardMetrics.openComplaints}
            change="-15% from last week"
            icon={AlertTriangle}
            color="red"
            subtitle="Requiring attention"
          />
          <StatCard
            title="Average Rating"
            value={dashboardMetrics.reviewScore.toFixed(1)}
            change="+0.3 from last month"
            icon={Star}
            color="yellow"
            subtitle="Customer satisfaction"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Response Time"
            value={`${dashboardMetrics.averageResponseTime}m`}
            change="-12% from last month"
            icon={Clock}
            color="purple"
            subtitle="Average response time"
          />
          <StatCard
            title="Revenue This Month"
            value={`$${dashboardMetrics.revenueThisMonth.toLocaleString()}`}
            change={`+${dashboardMetrics.revenueGrowth}% from last month`}
            icon={DollarSign}
            color="green"
            subtitle="Monthly revenue"
          />
          <StatCard
            title="Resolution Rate"
            value={`${dashboardMetrics.complaintResolutionRate}%`}
            change="+5% from last month"
            icon={CheckCircle2}
            color="blue"
            subtitle="Complaints resolved"
          />
          <StatCard
            title="Review Response Rate"
            value={`${dashboardMetrics.reviewResponseRate}%`}
            change="+3% from last month"
            icon={MessageCircle}
            color="orange"
            subtitle="Reviews responded to"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Interactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Recent Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interactions.slice(0, 5).map((interaction) => (
                      <div key={interaction.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {interaction.channel === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                          {interaction.channel === 'phone' && <Phone className="w-5 h-5 text-blue-600" />}
                          {interaction.channel === 'website_form' && <Globe className="w-5 h-5 text-blue-600" />}
                          {interaction.channel === 'live_chat' && <MessageCircle className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {interaction.subject}
                          </p>
                          <p className="text-xs text-gray-500">
                            {interaction.timestamp.toLocaleDateString()} • {interaction.customerId}
                          </p>
                        </div>
                        <Badge variant={interaction.priority === 'urgent' ? 'destructive' : 'secondary'}>
                          {interaction.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Recent Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {review.title || review.content}
                          </p>
                          <p className="text-xs text-gray-500">
                            {review.platform} • {review.publishedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={review.sentiment === 'positive' ? 'default' : 'secondary'}>
                          {review.sentiment}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Interactions</CardTitle>
                <div className="flex items-center space-x-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="inquiry">Inquiries</SelectItem>
                      <SelectItem value="complaint">Complaints</SelectItem>
                      <SelectItem value="compliment">Compliments</SelectItem>
                      <SelectItem value="support_request">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="website_form">Website</SelectItem>
                      <SelectItem value="live_chat">Live Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactions.slice(0, 10).map((interaction) => (
                    <div key={interaction.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {interaction.channel === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                            {interaction.channel === 'phone' && <Phone className="w-5 h-5 text-blue-600" />}
                            {interaction.channel === 'website_form' && <Globe className="w-5 h-5 text-blue-600" />}
                            {interaction.channel === 'live_chat' && <MessageCircle className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{interaction.subject}</h4>
                            <p className="text-sm text-gray-600 mt-1">{interaction.content}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                {interaction.timestamp.toLocaleDateString()}
                              </span>
                              <Badge variant="outline">{interaction.type}</Badge>
                              <Badge variant="outline">{interaction.channel}</Badge>
                              <Badge variant={interaction.sentiment === 'positive' ? 'default' : 'secondary'}>
                                {interaction.sentiment}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={interaction.priority === 'urgent' ? 'destructive' : 'secondary'}>
                            {interaction.priority}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints.slice(0, 10).map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {complaint.createdAt.toLocaleDateString()}
                            </span>
                            <Badge variant="outline">{complaint.category}</Badge>
                            <Badge variant={complaint.severity === 'critical' ? 'destructive' : 'secondary'}>
                              {complaint.severity}
                            </Badge>
                            <Badge variant={complaint.status === 'resolved' ? 'default' : 'secondary'}>
                              {complaint.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.slice(0, 10).map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  fill={i < review.rating ? 'currentColor' : 'none'}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{review.rating}/5</span>
                            <Badge variant="outline">{review.platform}</Badge>
                          </div>
                          <h4 className="font-medium text-gray-900">{review.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{review.content}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {review.publishedAt.toLocaleDateString()}
                            </span>
                            <Badge variant={review.sentiment === 'positive' ? 'default' : 'secondary'}>
                              {review.sentiment}
                            </Badge>
                            {review.verified && (
                              <Badge variant="outline">Verified</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardMetrics.teamPerformance.map((member) => (
                      <div key={member.memberId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">
                            {member.interactionsHandled} interactions • {member.averageResponseTime}m avg response
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            ${member.revenueGenerated.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.resolutionRate}% resolution rate
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardMetrics.channelPerformance.map((channel) => (
                      <div key={channel.channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {channel.channel === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                            {channel.channel === 'phone' && <Phone className="w-4 h-4 text-blue-600" />}
                            {channel.channel === 'website_form' && <Globe className="w-4 h-4 text-blue-600" />}
                            {channel.channel === 'live_chat' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{channel.channel.replace('_', ' ')}</p>
                            <p className="text-sm text-gray-600">{channel.volume} interactions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{channel.averageResponseTime}m</p>
                          <p className="text-sm text-gray-600">
                            {(channel.conversionRate * 100).toFixed(1)}% conversion
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MozaIntelligenceDashboard;

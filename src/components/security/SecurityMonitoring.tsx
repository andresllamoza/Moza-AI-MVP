import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Clock,
  User,
  Lock,
  Unlock,
  Database,
  Server,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'login' | 'logout' | 'access_denied' | 'data_export' | 'role_change' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  ip: string;
  location: string;
  description: string;
  details: Record<string, any>;
}

interface AnomalyDetection {
  id: string;
  type: 'unusual_login' | 'data_access_spike' | 'failed_attempts' | 'privilege_escalation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  description: string;
  affectedUsers: number;
  status: 'investigating' | 'resolved' | 'false_positive';
  recommendations: string[];
}

interface SecurityMonitoringProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityMonitoring: React.FC<SecurityMonitoringProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit-logs' | 'anomalies' | 'threats'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isRealTime, setIsRealTime] = useState(true);

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'suspicious_activity',
      severity: 'high',
      user: 'unknown@external.com',
      ip: '192.168.1.100',
      location: 'New York, NY',
      description: 'Multiple failed login attempts from suspicious IP',
      details: { attempts: 15, timeWindow: '5 minutes' }
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:25:00Z',
      type: 'role_change',
      severity: 'medium',
      user: 'admin@company.com',
      ip: '10.0.0.50',
      location: 'San Francisco, CA',
      description: 'User role changed from Analyst to Manager',
      details: { fromRole: 'analyst', toRole: 'manager', targetUser: 'user@company.com' }
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:20:00Z',
      type: 'data_export',
      severity: 'medium',
      user: 'analyst@company.com',
      ip: '10.0.0.75',
      location: 'Austin, TX',
      description: 'Large dataset exported to CSV',
      details: { recordCount: 50000, dataType: 'competitor_data' }
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:15:00Z',
      type: 'login',
      severity: 'low',
      user: 'manager@company.com',
      ip: '10.0.0.25',
      location: 'Chicago, IL',
      description: 'Successful login with MFA',
      details: { method: 'totp', device: 'mobile' }
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:10:00Z',
      type: 'access_denied',
      severity: 'medium',
      user: 'contractor@external.com',
      ip: '203.0.113.42',
      location: 'London, UK',
      description: 'Attempted access to restricted data',
      details: { resource: '/api/competitors/sensitive', reason: 'insufficient_permissions' }
    }
  ]);

  const [anomalies] = useState<AnomalyDetection[]>([
    {
      id: '1',
      type: 'unusual_login',
      severity: 'high',
      detectedAt: '2024-01-15T14:30:00Z',
      description: 'Unusual login pattern detected for user admin@company.com',
      affectedUsers: 1,
      status: 'investigating',
      recommendations: ['Verify user identity', 'Review access permissions', 'Enable additional MFA']
    },
    {
      id: '2',
      type: 'data_access_spike',
      severity: 'medium',
      detectedAt: '2024-01-15T13:45:00Z',
      description: 'Unusual spike in data access requests from multiple users',
      affectedUsers: 5,
      status: 'investigating',
      recommendations: ['Review access patterns', 'Check for automated scraping', 'Implement rate limiting']
    },
    {
      id: '3',
      type: 'failed_attempts',
      severity: 'critical',
      detectedAt: '2024-01-15T14:25:00Z',
      description: 'Multiple failed login attempts from suspicious IP addresses',
      affectedUsers: 0,
      status: 'investigating',
      recommendations: ['Block suspicious IPs', 'Enable account lockout', 'Review security logs']
    }
  ]);

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'high':
        return <XCircle className="w-4 h-4" />;
      case 'critical':
        return <Zap className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Unlock className="w-4 h-4" />;
      case 'logout':
        return <Lock className="w-4 h-4" />;
      case 'access_denied':
        return <XCircle className="w-4 h-4" />;
      case 'data_export':
        return <Download className="w-4 h-4" />;
      case 'role_change':
        return <User className="w-4 h-4" />;
      case 'suspicious_activity':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Security Monitoring</h1>
                <p className="text-gray-600">Real-time security monitoring and audit logs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {isRealTime ? 'Real-time' : 'Paused'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'audit-logs', label: 'Audit Logs', icon: Database },
              { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
              { id: 'threats', label: 'Threat Detection', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Security Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Threats', value: '3', color: 'red', icon: AlertTriangle },
                  { label: 'Security Score', value: '94%', color: 'green', icon: Shield },
                  { label: 'Events Today', value: '1,247', color: 'blue', icon: Activity },
                  { label: 'Anomalies', value: '12', color: 'yellow', icon: TrendingUp }
                ].map((stat, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${
                      stat.color === 'green' ? 'text-green-600' : 
                      stat.color === 'red' ? 'text-red-600' :
                      stat.color === 'blue' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Recent Security Events */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-3">
                  {securityEvents.slice(0, 5).map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          event.severity === 'critical' ? 'bg-red-100' :
                          event.severity === 'high' ? 'bg-orange-100' :
                          event.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{event.description}</div>
                          <div className="text-sm text-gray-600">
                            {event.user} • {new Date(event.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(event.severity)}>
                        {getSeverityIcon(event.severity)}
                        {event.severity}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Security Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassmorphismCard className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Level Trend</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Critical', value: 3, color: 'red' },
                      { label: 'High', value: 8, color: 'orange' },
                      { label: 'Medium', value: 15, color: 'yellow' },
                      { label: 'Low', value: 42, color: 'blue' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphismCard>

                <GlassmorphismCard className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Security Events</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Failed Login Attempts', count: 156, trend: 'up' },
                      { label: 'Data Access Requests', count: 89, trend: 'down' },
                      { label: 'Role Changes', count: 23, trend: 'up' },
                      { label: 'Data Exports', count: 12, trend: 'down' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-red-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassmorphismCard>
              </div>
            </div>
          )}

          {activeTab === 'audit-logs' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search audit logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Audit Logs Table */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Severity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getEventTypeIcon(event.type)}
                              <span className="text-sm text-gray-900">{event.description}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {event.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                            {event.ip}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {event.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getSeverityColor(event.severity)}>
                              {getSeverityIcon(event.severity)}
                              {event.severity}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anomalies' && (
            <div className="space-y-6">
              {/* Anomaly Detection Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Active Anomalies', value: anomalies.filter(a => a.status === 'investigating').length, color: 'red' },
                  { label: 'Resolved Today', value: 8, color: 'green' },
                  { label: 'False Positives', value: 3, color: 'yellow' }
                ].map((stat, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <div className={`text-2xl font-bold mb-1 ${
                      stat.color === 'green' ? 'text-green-600' : 
                      stat.color === 'red' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Anomaly List */}
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <GlassmorphismCard key={anomaly.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${
                          anomaly.severity === 'critical' ? 'bg-red-100' :
                          anomaly.severity === 'high' ? 'bg-orange-100' :
                          anomaly.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            anomaly.severity === 'critical' ? 'text-red-600' :
                            anomaly.severity === 'high' ? 'text-orange-600' :
                            anomaly.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{anomaly.description}</h3>
                          <p className="text-sm text-gray-600">
                            Detected at {new Date(anomaly.detectedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {getSeverityIcon(anomaly.severity)}
                          {anomaly.severity}
                        </Badge>
                        <Badge variant="outline">
                          {anomaly.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="font-medium text-gray-900">{anomaly.type.replace('_', ' ')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Affected Users</div>
                        <div className="font-medium text-gray-900">{anomaly.affectedUsers}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Recommendations</div>
                      <div className="space-y-1">
                        {anomaly.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark as False Positive
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </GlassmorphismCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'threats' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Threat Detection</h3>
                <p className="text-gray-600">
                  Advanced threat detection features are being configured. This will include
                  machine learning-based threat detection, behavioral analysis, and automated response.
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Configure Threat Detection
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Users, 
  Database, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  Key,
  FileText,
  Award,
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { MultiFactorAuth } from './MultiFactorAuth';
import { RoleBasedAccess } from './RoleBasedAccess';
import { DataEncryption } from './DataEncryption';
import { SecurityMonitoring } from './SecurityMonitoring';
import { ComplianceManager } from './ComplianceManager';

interface SecurityDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ isOpen, onClose }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      color: 'green',
      icon: Shield
    },
    {
      title: 'MFA Adoption',
      value: '87%',
      change: '+5%',
      trend: 'up',
      color: 'blue',
      icon: Lock
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+12',
      trend: 'up',
      color: 'purple',
      icon: Users
    },
    {
      title: 'Encrypted Data',
      value: '98%',
      change: '+1%',
      trend: 'up',
      color: 'green',
      icon: Database
    }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'security',
      severity: 'high',
      message: 'Multiple failed login attempts detected',
      time: '2 minutes ago',
      status: 'investigating'
    },
    {
      id: '2',
      type: 'compliance',
      severity: 'medium',
      message: 'SOC 2 audit scheduled for next month',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'encryption',
      severity: 'low',
      message: 'Key rotation completed successfully',
      time: '3 hours ago',
      status: 'resolved'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'compliance':
        return <Award className="w-4 h-4" />;
      case 'encryption':
        return <Key className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  if (!isOpen) return null;

  return (
    <>
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Enterprise Security Dashboard</h1>
                  <p className="text-gray-600">Comprehensive security management and compliance monitoring</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {securityMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphismCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        metric.color === 'green' ? 'bg-green-100' :
                        metric.color === 'blue' ? 'bg-blue-100' :
                        metric.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                        <metric.icon className={`w-6 h-6 ${
                          metric.color === 'green' ? 'text-green-600' :
                          metric.color === 'blue' ? 'text-blue-600' :
                          metric.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.title}</div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>

            {/* Security Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Multi-Factor Authentication',
                  description: 'Manage 2FA settings, backup codes, and authentication methods',
                  icon: Lock,
                  color: 'blue',
                  action: () => setActiveModal('mfa')
                },
                {
                  title: 'Role-Based Access Control',
                  description: 'Configure user roles, permissions, and access policies',
                  icon: Users,
                  color: 'green',
                  action: () => setActiveModal('rbac')
                },
                {
                  title: 'Data Encryption',
                  description: 'Monitor encryption status, key management, and data protection',
                  icon: Database,
                  color: 'purple',
                  action: () => setActiveModal('encryption')
                },
                {
                  title: 'Security Monitoring',
                  description: 'Real-time security monitoring, audit logs, and threat detection',
                  icon: Activity,
                  color: 'red',
                  action: () => setActiveModal('monitoring')
                },
                {
                  title: 'Compliance Manager',
                  description: 'SOC 2, GDPR, CCPA compliance tracking and reporting',
                  icon: Award,
                  color: 'yellow',
                  action: () => setActiveModal('compliance')
                },
                {
                  title: 'Security Settings',
                  description: 'Configure security policies, session management, and alerts',
                  icon: Settings,
                  color: 'gray',
                  action: () => setActiveModal('settings')
                }
              ].map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphismCard 
                    className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={module.action}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        module.color === 'blue' ? 'bg-blue-100' :
                        module.color === 'green' ? 'bg-green-100' :
                        module.color === 'purple' ? 'bg-purple-100' :
                        module.color === 'red' ? 'bg-red-100' :
                        module.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <module.icon className={`w-6 h-6 ${
                          module.color === 'blue' ? 'text-blue-600' :
                          module.color === 'green' ? 'text-green-600' :
                          module.color === 'purple' ? 'text-purple-600' :
                          module.color === 'red' ? 'text-red-600' :
                          module.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          Manage
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>

            {/* Recent Security Alerts */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Security Alerts</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{alert.message}</div>
                        <div className="text-sm text-gray-600">{alert.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">
                        {alert.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {activeModal === 'mfa' && (
        <MultiFactorAuth
          isOpen={true}
          onComplete={() => setActiveModal(null)}
          onCancel={() => setActiveModal(null)}
          userEmail="user@company.com"
        />
      )}

      {activeModal === 'rbac' && (
        <RoleBasedAccess
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'encryption' && (
        <DataEncryption
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'monitoring' && (
        <SecurityMonitoring
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'compliance' && (
        <ComplianceManager
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

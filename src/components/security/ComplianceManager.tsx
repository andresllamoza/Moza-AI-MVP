import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Database,
  Lock,
  Eye,
  Globe,
  Settings,
  Calendar,
  Award,
  Clipboard,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  lastAudit: string;
  nextAudit: string;
  requirements: number;
  completed: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface ComplianceManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceManager: React.FC<ComplianceManagerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'standards' | 'reports' | 'templates'>('overview');

  const complianceStandards: ComplianceStandard[] = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2025-01-15',
      requirements: 64,
      completed: 64,
      icon: Shield,
      color: 'green'
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation compliance',
      status: 'compliant',
      lastAudit: '2024-01-01',
      nextAudit: '2024-07-01',
      requirements: 45,
      completed: 45,
      icon: Globe,
      color: 'green'
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      description: 'California Consumer Privacy Act compliance',
      status: 'compliant',
      lastAudit: '2024-01-01',
      nextAudit: '2024-07-01',
      requirements: 32,
      completed: 32,
      icon: Users,
      color: 'green'
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'partial',
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: 12,
      completed: 10,
      icon: Database,
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      compliant: 'bg-green-100 text-green-700',
      partial: 'bg-yellow-100 text-yellow-700',
      'non-compliant': 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || colors['non-compliant'];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4" />;
      case 'non-compliant':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Compliance Manager</h1>
                <p className="text-gray-600">SOC 2, GDPR, CCPA compliance and reporting</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6">
            {[
              { id: 'overview', label: 'Overview', icon: Shield },
              { id: 'standards', label: 'Standards', icon: FileText },
              { id: 'reports', label: 'Reports', icon: Download },
              { id: 'templates', label: 'Templates', icon: Clipboard }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700'
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
              {/* Compliance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Compliant Standards', value: '3', color: 'green', icon: CheckCircle },
                  { label: 'Partial Compliance', value: '1', color: 'yellow', icon: AlertTriangle },
                  { label: 'Next Audit', value: 'Jul 2024', color: 'blue', icon: Calendar },
                  { label: 'Certification Score', value: '94%', color: 'purple', icon: Award }
                ].map((stat, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${
                      stat.color === 'green' ? 'text-green-600' : 
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      stat.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Recent Compliance Activities */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Activities</h3>
                <div className="space-y-4">
                  {[
                    {
                      action: 'SOC 2 Type II Audit Completed',
                      date: '2024-01-15',
                      status: 'completed',
                      details: 'All 64 controls validated and certified'
                    },
                    {
                      action: 'GDPR Data Processing Agreement Updated',
                      date: '2024-01-10',
                      status: 'completed',
                      details: 'Updated DPA template for new EU customers'
                    },
                    {
                      action: 'PCI DSS Assessment Started',
                      date: '2024-01-05',
                      status: 'in-progress',
                      details: '2 of 12 requirements pending completion'
                    },
                    {
                      action: 'Privacy Policy Generator Updated',
                      date: '2024-01-01',
                      status: 'completed',
                      details: 'Added new privacy controls and consent management'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {activity.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <RefreshCw className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.details}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'standards' && (
            <div className="space-y-6">
              {/* Compliance Standards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceStandards.map((standard) => (
                  <GlassmorphismCard key={standard.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${
                          standard.color === 'green' ? 'bg-green-100' :
                          standard.color === 'yellow' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          <standard.icon className={`w-6 h-6 ${
                            standard.color === 'green' ? 'text-green-600' :
                            standard.color === 'yellow' ? 'text-yellow-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{standard.name}</h3>
                          <p className="text-sm text-gray-600">{standard.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(standard.status)}>
                        {getStatusIcon(standard.status)}
                        {standard.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Requirements Progress</span>
                        <span className="font-medium text-gray-900">
                          {standard.completed}/{standard.requirements}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            standard.status === 'compliant' ? 'bg-green-500' :
                            standard.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(standard.completed / standard.requirements) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Last Audit</div>
                        <div className="font-medium text-gray-900">
                          {new Date(standard.lastAudit).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Next Audit</div>
                        <div className="font-medium text-gray-900">
                          {new Date(standard.nextAudit).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="w-3 h-3 mr-1" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </GlassmorphismCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Compliance Reports */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'SOC 2 Type II Report',
                      description: 'Comprehensive security controls assessment',
                      date: '2024-01-15',
                      size: '2.3 MB',
                      type: 'PDF'
                    },
                    {
                      name: 'GDPR Compliance Assessment',
                      description: 'Data protection and privacy compliance report',
                      date: '2024-01-01',
                      size: '1.8 MB',
                      type: 'PDF'
                    },
                    {
                      name: 'CCPA Compliance Report',
                      description: 'California privacy rights compliance',
                      date: '2024-01-01',
                      size: '1.2 MB',
                      type: 'PDF'
                    },
                    {
                      name: 'Data Processing Agreement Template',
                      description: 'Standard DPA for customer agreements',
                      date: '2024-01-10',
                      size: '456 KB',
                      type: 'DOCX'
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-600">{report.description}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(report.date).toLocaleDateString()} • {report.size} • {report.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Compliance Templates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Privacy Policy Generator',
                    description: 'Automated privacy policy creation with GDPR/CCPA compliance',
                    features: ['GDPR compliant', 'CCPA compliant', 'Auto-updating', 'Multi-language'],
                    icon: Globe,
                    color: 'blue'
                  },
                  {
                    name: 'Data Processing Agreement',
                    description: 'Standard DPA template for customer contracts',
                    features: ['EU Standard Clauses', 'Customizable terms', 'Legal review ready', 'Version control'],
                    icon: FileText,
                    color: 'green'
                  },
                  {
                    name: 'Cookie Consent Manager',
                    description: 'GDPR-compliant cookie consent and management',
                    features: ['Granular consent', 'Auto-blocking', 'Audit trail', 'Multi-language'],
                    icon: Settings,
                    color: 'purple'
                  },
                  {
                    name: 'Incident Response Template',
                    description: 'Data breach response and notification templates',
                    features: ['72-hour notification', 'Regulatory reporting', 'Customer notification', 'Legal templates'],
                    icon: AlertTriangle,
                    color: 'red'
                  }
                ].map((template, index) => (
                  <GlassmorphismCard key={index} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${
                        template.color === 'blue' ? 'bg-blue-100' :
                        template.color === 'green' ? 'bg-green-100' :
                        template.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'
                      }`}>
                        <template.icon className={`w-6 h-6 ${
                          template.color === 'blue' ? 'text-blue-600' :
                          template.color === 'green' ? 'text-green-600' :
                          template.color === 'purple' ? 'text-purple-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {template.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </GlassmorphismCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

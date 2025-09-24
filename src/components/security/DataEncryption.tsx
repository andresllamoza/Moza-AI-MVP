import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Key, 
  Database, 
  Eye, 
  EyeOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  Upload,
  FileText,
  Server,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

interface EncryptionStatus {
  id: string;
  name: string;
  description: string;
  status: 'encrypted' | 'unencrypted' | 'partial';
  lastEncrypted: string;
  encryptionType: string;
  keyRotation: string;
  compliance: string[];
}

interface DataRetentionPolicy {
  id: string;
  name: string;
  description: string;
  retentionPeriod: string;
  dataType: string;
  autoDelete: boolean;
  lastCleanup: string;
  recordsAffected: number;
}

interface DataEncryptionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataEncryption: React.FC<DataEncryptionProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'encryption' | 'retention' | 'keys' | 'compliance'>('encryption');
  const [encryptionStatuses, setEncryptionStatuses] = useState<EncryptionStatus[]>([
    {
      id: 'user-data',
      name: 'User Personal Data',
      description: 'Names, emails, phone numbers, addresses',
      status: 'encrypted',
      lastEncrypted: '2024-01-15T10:30:00Z',
      encryptionType: 'AES-256-GCM',
      keyRotation: '90 days',
      compliance: ['GDPR', 'CCPA', 'SOC 2']
    },
    {
      id: 'financial-data',
      name: 'Financial Information',
      description: 'Payment methods, billing information, transaction history',
      status: 'encrypted',
      lastEncrypted: '2024-01-15T10:30:00Z',
      encryptionType: 'AES-256-GCM',
      keyRotation: '30 days',
      compliance: ['PCI DSS', 'SOC 2']
    },
    {
      id: 'business-data',
      name: 'Business Intelligence',
      description: 'Competitor data, analytics, reports',
      status: 'encrypted',
      lastEncrypted: '2024-01-15T10:30:00Z',
      encryptionType: 'AES-256-GCM',
      keyRotation: '90 days',
      compliance: ['SOC 2']
    },
    {
      id: 'system-logs',
      name: 'System Logs',
      description: 'Application logs, audit trails, error logs',
      status: 'partial',
      lastEncrypted: '2024-01-14T08:00:00Z',
      encryptionType: 'AES-128-GCM',
      keyRotation: '180 days',
      compliance: ['SOC 2']
    }
  ]);

  const [retentionPolicies, setRetentionPolicies] = useState<DataRetentionPolicy[]>([
    {
      id: 'user-accounts',
      name: 'User Account Data',
      description: 'Personal information of registered users',
      retentionPeriod: '7 years',
      dataType: 'Personal Data',
      autoDelete: true,
      lastCleanup: '2024-01-01T00:00:00Z',
      recordsAffected: 1247
    },
    {
      id: 'audit-logs',
      name: 'Audit Logs',
      description: 'System access and activity logs',
      retentionPeriod: '3 years',
      dataType: 'System Logs',
      autoDelete: true,
      lastCleanup: '2024-01-15T02:00:00Z',
      recordsAffected: 45678
    },
    {
      id: 'competitor-data',
      name: 'Competitor Intelligence',
      description: 'Scraped competitor data and analysis',
      retentionPeriod: '2 years',
      dataType: 'Business Data',
      autoDelete: false,
      lastCleanup: 'Never',
      recordsAffected: 8934
    },
    {
      id: 'review-data',
      name: 'Review Data',
      description: 'Customer reviews and sentiment analysis',
      retentionPeriod: '5 years',
      dataType: 'Business Data',
      autoDelete: true,
      lastCleanup: '2024-01-10T01:00:00Z',
      recordsAffected: 23456
    }
  ]);

  const [isRotatingKeys, setIsRotatingKeys] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      encrypted: 'bg-green-100 text-green-700',
      unencrypted: 'bg-red-100 text-red-700',
      partial: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status as keyof typeof colors] || colors.unencrypted;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'encrypted':
        return <CheckCircle className="w-4 h-4" />;
      case 'unencrypted':
        return <AlertTriangle className="w-4 h-4" />;
      case 'partial':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleKeyRotation = () => {
    setIsRotatingKeys(true);
    // Simulate key rotation process
    setTimeout(() => {
      setIsRotatingKeys(false);
      // Update encryption statuses with new timestamps
      setEncryptionStatuses(prev => prev.map(status => ({
        ...status,
        lastEncrypted: new Date().toISOString()
      })));
    }, 3000);
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
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Protection & Encryption</h1>
                <p className="text-gray-600">Manage encryption, data retention, and compliance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <EyeOff className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6">
            {[
              { id: 'encryption', label: 'Encryption Status', icon: Lock },
              { id: 'retention', label: 'Data Retention', icon: Database },
              { id: 'keys', label: 'Key Management', icon: Key },
              { id: 'compliance', label: 'Compliance', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
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
          {activeTab === 'encryption' && (
            <div className="space-y-6">
              {/* Encryption Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Encrypted Data', value: '85%', color: 'green', icon: CheckCircle },
                  { label: 'Key Rotation', value: 'Active', color: 'blue', icon: RefreshCw },
                  { label: 'Compliance', value: '100%', color: 'green', icon: Shield },
                  { label: 'Last Audit', value: 'Jan 15', color: 'blue', icon: FileText }
                ].map((stat, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${
                      stat.color === 'green' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Encryption Status Table */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Encryption Status by Data Type</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Encryption Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Key Rotation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Compliance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {encryptionStatuses.map((status) => (
                        <tr key={status.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{status.name}</div>
                              <div className="text-sm text-gray-500">{status.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(status.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(status.status)}
                                  {status.status}
                                </div>
                              </Badge>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {status.encryptionType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {status.keyRotation}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {status.compliance.map((comp) => (
                                <Badge key={comp} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Settings className="w-3 h-3" />
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

          {activeTab === 'retention' && (
            <div className="space-y-6">
              {/* Data Retention Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Active Policies', value: retentionPolicies.length, color: 'blue', icon: Database },
                  { label: 'Auto-Delete Enabled', value: retentionPolicies.filter(p => p.autoDelete).length, color: 'green', icon: RefreshCw },
                  { label: 'Total Records', value: retentionPolicies.reduce((sum, p) => sum + p.recordsAffected, 0).toLocaleString(), color: 'purple', icon: FileText }
                ].map((stat, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${
                      stat.color === 'green' ? 'text-green-600' : 
                      stat.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Retention Policies */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Data Retention Policies</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Policy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Retention Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Auto-Delete
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Records
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Cleanup
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {retentionPolicies.map((policy) => (
                        <tr key={policy.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{policy.name}</div>
                              <div className="text-sm text-gray-500">{policy.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {policy.retentionPeriod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{policy.dataType}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {policy.autoDelete ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {policy.recordsAffected.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {policy.lastCleanup === 'Never' ? 'Never' : new Date(policy.lastCleanup).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-6">
              {/* Key Management Overview */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Encryption Key Management</h3>
                  <Button
                    onClick={handleKeyRotation}
                    disabled={isRotatingKeys}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isRotatingKeys ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Rotating Keys...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Rotate Keys
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Current Keys',
                      value: '12',
                      description: 'Active encryption keys',
                      icon: Key,
                      color: 'blue'
                    },
                    {
                      title: 'Key Rotation',
                      value: '30 days',
                      description: 'Next automatic rotation',
                      icon: RefreshCw,
                      color: 'green'
                    },
                    {
                      title: 'Backup Keys',
                      value: '24',
                      description: 'Stored in secure vault',
                      icon: Database,
                      color: 'purple'
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <item.icon className={`w-8 h-8 mx-auto mb-2 ${
                        item.color === 'green' ? 'text-green-600' : 
                        item.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                      <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                      <div className="text-sm font-medium text-gray-900 mb-1">{item.title}</div>
                      <div className="text-xs text-gray-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Status */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Status</h3>
                <div className="space-y-4">
                  {[
                    { name: 'User Data Key', status: 'Active', expires: '2024-02-15', strength: 'AES-256' },
                    { name: 'Financial Data Key', status: 'Active', expires: '2024-02-01', strength: 'AES-256' },
                    { name: 'Business Data Key', status: 'Active', expires: '2024-04-15', strength: 'AES-256' },
                    { name: 'System Logs Key', status: 'Active', expires: '2024-07-15', strength: 'AES-128' }
                  ].map((key, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">{key.name}</div>
                          <div className="text-sm text-gray-600">{key.strength}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-green-100 text-green-700">{key.status}</Badge>
                        <div className="text-sm text-gray-600">
                          Expires: {new Date(key.expires).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              {/* Compliance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'SOC 2', status: 'Compliant', color: 'green', icon: CheckCircle },
                  { label: 'GDPR', status: 'Compliant', color: 'green', icon: CheckCircle },
                  { label: 'CCPA', status: 'Compliant', color: 'green', icon: CheckCircle },
                  { label: 'PCI DSS', status: 'Compliant', color: 'green', icon: CheckCircle }
                ].map((compliance, index) => (
                  <GlassmorphismCard key={index} className="p-4 text-center">
                    <compliance.icon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-lg font-bold text-gray-900 mb-1">{compliance.label}</div>
                    <Badge className="bg-green-100 text-green-700">{compliance.status}</Badge>
                  </GlassmorphismCard>
                ))}
              </div>

              {/* Compliance Details */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'SOC 2 Type II',
                      description: 'Security, availability, and confidentiality controls',
                      status: 'Certified',
                      lastAudit: '2024-01-15',
                      nextAudit: '2025-01-15',
                      requirements: ['Security', 'Availability', 'Confidentiality']
                    },
                    {
                      name: 'GDPR',
                      description: 'General Data Protection Regulation compliance',
                      status: 'Compliant',
                      lastAudit: '2024-01-01',
                      nextAudit: '2024-07-01',
                      requirements: ['Data Protection', 'Privacy Rights', 'Data Portability']
                    },
                    {
                      name: 'CCPA',
                      description: 'California Consumer Privacy Act compliance',
                      status: 'Compliant',
                      lastAudit: '2024-01-01',
                      nextAudit: '2024-07-01',
                      requirements: ['Privacy Rights', 'Data Disclosure', 'Opt-out Rights']
                    }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">{item.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Last Audit</div>
                          <div className="font-medium">{new Date(item.lastAudit).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Next Audit</div>
                          <div className="font-medium">{new Date(item.nextAudit).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-gray-600 mb-2">Requirements</div>
                        <div className="flex flex-wrap gap-2">
                          {item.requirements.map((req, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

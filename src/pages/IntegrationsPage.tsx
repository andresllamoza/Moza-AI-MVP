import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plug, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Settings,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Zap,
  Database,
  Globe,
  MessageSquare,
  MapPin,
  Building2
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

const IntegrationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connected');

  const integrations = [
    {
      id: 1,
      name: "NewsAPI",
      description: "Real-time news and market intelligence",
      category: "News & Media",
      status: "connected",
      lastSync: "2 minutes ago",
      dataPoints: 156,
      icon: Globe,
      color: "text-blue-400 bg-blue-600/20"
    },
    {
      id: 2,
      name: "Google Places",
      description: "Business location and review data",
      category: "Location Services",
      status: "connected",
      lastSync: "5 minutes ago",
      dataPoints: 89,
      icon: MapPin,
      color: "text-green-400 bg-green-600/20"
    },
    {
      id: 3,
      name: "Yelp API",
      description: "Restaurant and business reviews",
      category: "Reviews & Ratings",
      status: "connected",
      lastSync: "1 hour ago",
      dataPoints: 234,
      icon: MessageSquare,
      color: "text-red-400 bg-red-600/20"
    },
    {
      id: 4,
      name: "Reddit API",
      description: "Social media sentiment analysis",
      category: "Social Media",
      status: "error",
      lastSync: "Failed 2 hours ago",
      dataPoints: 0,
      icon: MessageSquare,
      color: "text-orange-400 bg-orange-600/20"
    },
    {
      id: 5,
      name: "Clearbit",
      description: "Business enrichment and contact data",
      category: "Business Data",
      status: "pending",
      lastSync: "Not connected",
      dataPoints: 0,
      icon: Building2,
      color: "text-purple-400 bg-purple-600/20"
    },
    {
      id: 6,
      name: "Hunter.io",
      description: "Email verification and contact discovery",
      category: "Contact Data",
      status: "pending",
      lastSync: "Not connected",
      dataPoints: 0,
      icon: Database,
      color: "text-cyan-400 bg-cyan-600/20"
    }
  ];

  const availableIntegrations = [
    {
      name: "Twitter API",
      description: "Social media monitoring and sentiment",
      category: "Social Media",
      icon: MessageSquare,
      color: "text-blue-400 bg-blue-600/20"
    },
    {
      name: "LinkedIn API",
      description: "Professional network and company data",
      category: "Professional",
      icon: Building2,
      color: "text-blue-600 bg-blue-700/20"
    },
    {
      name: "Google Analytics",
      description: "Website traffic and user behavior",
      category: "Analytics",
      icon: Database,
      color: "text-green-400 bg-green-600/20"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle2 className="w-5 h-5 text-success-400" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-warning-400" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-success-400 bg-success-600/20';
      case 'error': return 'text-red-400 bg-red-600/20';
      case 'pending': return 'text-warning-400 bg-warning-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const errorIntegrations = integrations.filter(i => i.status === 'error');
  const pendingIntegrations = integrations.filter(i => i.status === 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Data Integrations</h1>
          <p className="text-xl text-muted-foreground">
            Connect and manage your data sources for comprehensive intelligence
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success-600/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-success-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{connectedIntegrations.length}</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-600/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{errorIntegrations.length}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-warning-600/20 rounded-lg">
                <Clock className="w-6 h-6 text-warning-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingIntegrations.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600/20 rounded-lg">
                <Database className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {integrations.reduce((sum, i) => sum + i.dataPoints, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Data Points</p>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('connected')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'connected'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Connected ({connectedIntegrations.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'available'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Available ({availableIntegrations.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              All ({integrations.length})
            </button>
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {(activeTab === 'connected' ? connectedIntegrations :
            activeTab === 'available' ? availableIntegrations :
            integrations).map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <ProfessionalCard key={integration.id || integration.name} className="p-6 hover:bg-dark-700 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${integration.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.category}</p>
                    </div>
                  </div>
                  
                  {integration.status && (
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4">{integration.description}</p>
                
                {integration.status === 'connected' && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Sync</p>
                      <p className="text-sm text-white">{integration.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Points</p>
                      <p className="text-sm text-white">{integration.dataPoints?.toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <ProfessionalButton size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Data
                      </ProfessionalButton>
                    </>
                  ) : integration.status === 'error' ? (
                    <>
                      <ProfessionalButton size="sm" className="btn-vibrant-primary">
                        <Zap className="w-4 h-4 mr-2" />
                        Retry
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Fix
                      </ProfessionalButton>
                    </>
                  ) : (
                    <ProfessionalButton size="sm" className="btn-vibrant-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </ProfessionalButton>
                  )}
                </div>
              </ProfessionalCard>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {((activeTab === 'connected' && connectedIntegrations.length === 0) ||
          (activeTab === 'available' && availableIntegrations.length === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-12"
          >
            <Plug className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'connected' ? 'No connected integrations' : 'No available integrations'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === 'connected' 
                ? 'Connect your first data source to get started'
                : 'All integrations are already connected'
              }
            </p>
            <ProfessionalButton
              onClick={() => setActiveTab('available')}
              className="btn-vibrant-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Browse Integrations
            </ProfessionalButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntegrationsPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Share2, 
  Filter, 
  Search,
  Calendar,
  Eye,
  Star,
  MoreHorizontal,
  ArrowRight,
  TrendingUp,
  Building2,
  Target
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';

const ReportsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const reports = [
    {
      id: 1,
      title: "Mario's Artisan Pizza - Competitive Analysis",
      business: "Mario's Artisan Pizza",
      industry: "Restaurant",
      location: "Brooklyn, NY",
      date: "2024-01-15",
      status: "completed",
      insights: 12,
      competitors: 5,
      revenueImpact: "$12,500",
      rating: 4.8
    },
    {
      id: 2,
      title: "Brooklyn Pizza Co - Market Intelligence",
      business: "Brooklyn Pizza Co",
      industry: "Restaurant", 
      location: "Brooklyn, NY",
      date: "2024-01-12",
      status: "completed",
      insights: 8,
      competitors: 3,
      revenueImpact: "$8,200",
      rating: 4.6
    },
    {
      id: 3,
      title: "TechStart Solutions - Competitive Landscape",
      business: "TechStart Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      date: "2024-01-10",
      status: "in-progress",
      insights: 0,
      competitors: 0,
      revenueImpact: "TBD",
      rating: 0
    },
    {
      id: 4,
      title: "Green Clean Services - Market Analysis",
      business: "Green Clean Services",
      industry: "Home Services",
      location: "Austin, TX",
      date: "2024-01-08",
      status: "completed",
      insights: 15,
      competitors: 7,
      revenueImpact: "$18,300",
      rating: 4.9
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.business.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success-400 bg-success-600/20';
      case 'in-progress': return 'text-warning-400 bg-warning-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">Intelligence Reports</h1>
          <p className="text-xl text-muted-foreground">
            Access and manage your competitive intelligence reports
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <ProfessionalCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <ProfessionalInput
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                />
              </div>
              <div className="flex gap-2">
                <ProfessionalButton
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All
                </ProfessionalButton>
                <ProfessionalButton
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                  size="sm"
                >
                  Completed
                </ProfessionalButton>
                <ProfessionalButton
                  variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('in-progress')}
                  size="sm"
                >
                  In Progress
                </ProfessionalButton>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Reports Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredReports.map((report, index) => (
            <ProfessionalCard key={report.id} className="p-6 hover:bg-dark-700 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{report.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>{report.business}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status.replace('-', ' ')}
                  </span>
                  <button className="p-1 hover:bg-dark-600 rounded">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {report.status === 'completed' && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{report.insights}</div>
                    <div className="text-xs text-muted-foreground">Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{report.competitors}</div>
                    <div className="text-xs text-muted-foreground">Competitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-400">{report.revenueImpact}</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                </div>
              )}

              {report.status === 'completed' && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(report.rating) ? 'text-warning-400 fill-current' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{report.rating}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <ProfessionalButton
                  size="sm"
                  className="flex-1 btn-vibrant-primary"
                  onClick={() => window.location.href = `/report/${report.id}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Report
                </ProfessionalButton>
                {report.status === 'completed' && (
                  <>
                    <ProfessionalButton size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </ProfessionalButton>
                    <ProfessionalButton size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </ProfessionalButton>
                  </>
                )}
              </div>
            </ProfessionalCard>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first intelligence report'}
            </p>
            <ProfessionalButton
              onClick={() => window.location.href = '/'}
              className="btn-vibrant-primary"
            >
              Start New Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </ProfessionalButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Search,
  Filter,
  Star,
  ArrowRight,
  Building2,
  Users,
  BarChart3
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';

const InsightsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const insights = [
    {
      id: 1,
      title: "Competitor Price Optimization Opportunity",
      description: "Your competitors are charging 15% more for similar services. You can increase prices by 10% while maintaining competitive advantage.",
      category: "pricing",
      priority: "high",
      impact: "$8,500",
      effort: "low",
      status: "actionable",
      business: "Mario's Artisan Pizza",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Social Media Engagement Gap",
      description: "Your social media engagement is 40% lower than competitors. Focus on Instagram and TikTok content to reach younger demographics.",
      category: "marketing",
      priority: "medium",
      impact: "$3,200",
      effort: "medium",
      status: "actionable",
      business: "Mario's Artisan Pizza",
      date: "2024-01-15"
    },
    {
      id: 3,
      title: "Customer Service Improvement",
      description: "Negative reviews mention slow service. Implement online ordering system to reduce wait times by 30%.",
      category: "operations",
      priority: "high",
      impact: "$5,800",
      effort: "high",
      status: "in-progress",
      business: "Mario's Artisan Pizza",
      date: "2024-01-14"
    },
    {
      id: 4,
      title: "Market Expansion Opportunity",
      description: "Neighboring areas show 25% higher demand for your services. Consider opening a second location.",
      category: "growth",
      priority: "medium",
      impact: "$15,000",
      effort: "high",
      status: "planning",
      business: "Brooklyn Pizza Co",
      date: "2024-01-12"
    },
    {
      id: 5,
      title: "Competitor Weakness Exploitation",
      description: "Main competitor has poor online presence. Launch aggressive digital marketing campaign to capture their customers.",
      category: "competitive",
      priority: "high",
      impact: "$12,000",
      effort: "medium",
      status: "actionable",
      business: "Green Clean Services",
      date: "2024-01-10"
    }
  ];

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || insight.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-600/20';
      case 'medium': return 'text-warning-400 bg-warning-600/20';
      case 'low': return 'text-success-400 bg-success-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actionable': return 'text-success-400 bg-success-600/20';
      case 'in-progress': return 'text-warning-400 bg-warning-600/20';
      case 'planning': return 'text-primary-400 bg-primary-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pricing': return DollarSign;
      case 'marketing': return Target;
      case 'operations': return Clock;
      case 'growth': return TrendingUp;
      case 'competitive': return Building2;
      default: return Lightbulb;
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
          <h1 className="text-4xl font-bold text-white mb-2">Actionable Insights</h1>
          <p className="text-xl text-muted-foreground">
            Discover opportunities and recommendations to grow your business
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
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-muted-foreground">Actionable</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-warning-600/20 rounded-lg">
                <Clock className="w-6 h-6 text-warning-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600/20 rounded-lg">
                <Target className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-sm text-muted-foreground">Planning</p>
              </div>
            </div>
          </ProfessionalCard>
          
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success-600/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-success-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$44.5K</p>
                <p className="text-sm text-muted-foreground">Total Impact</p>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <ProfessionalCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <ProfessionalInput
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>
              <div className="flex gap-2">
                <ProfessionalButton
                  variant={filterCategory === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilterCategory('all')}
                  size="sm"
                >
                  All
                </ProfessionalButton>
                <ProfessionalButton
                  variant={filterCategory === 'pricing' ? 'primary' : 'outline'}
                  onClick={() => setFilterCategory('pricing')}
                  size="sm"
                >
                  Pricing
                </ProfessionalButton>
                <ProfessionalButton
                  variant={filterCategory === 'marketing' ? 'primary' : 'outline'}
                  onClick={() => setFilterCategory('marketing')}
                  size="sm"
                >
                  Marketing
                </ProfessionalButton>
                <ProfessionalButton
                  variant={filterCategory === 'operations' ? 'primary' : 'outline'}
                  onClick={() => setFilterCategory('operations')}
                  size="sm"
                >
                  Operations
                </ProfessionalButton>
              </div>
            </div>
          </ProfessionalCard>
        </motion.div>

        {/* Insights List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredInsights.map((insight, index) => {
            const CategoryIcon = getCategoryIcon(insight.category);
            return (
              <ProfessionalCard key={insight.id} className="p-6 hover:bg-dark-700 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-600/20 rounded-lg">
                    <CategoryIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{insight.business}</span>
                          <span>•</span>
                          <span>{new Date(insight.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                          {insight.priority} priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(insight.status)}`}>
                          {insight.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-success-400">{insight.impact}</div>
                        <div className="text-xs text-muted-foreground">Potential Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white capitalize">{insight.effort}</div>
                        <div className="text-xs text-muted-foreground">Effort Required</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-400">{insight.category}</div>
                        <div className="text-xs text-muted-foreground">Category</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <ProfessionalButton
                        size="sm"
                        className="btn-vibrant-primary"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Take Action
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <Star className="w-4 h-4 mr-2" />
                        Save
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Learn More
                      </ProfessionalButton>
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredInsights.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-12"
          >
            <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No insights found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Run an analysis to generate insights'}
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

export default InsightsPage;

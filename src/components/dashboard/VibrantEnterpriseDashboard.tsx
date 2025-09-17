import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Shield,
  Lightbulb,
  BarChart3,
  Bell,
  Search,
  Settings,
  Menu,
  X,
  ExternalLink,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { 
  newsAPIService, 
  placesAPIService, 
  socialMediaService, 
  businessEnrichmentService,
  fusedInsightsEngine,
  NewsArticle,
  CompetitorReview,
  SocialMention,
  FusedInsight
} from '@/services/apiIntegrations';

const VibrantEnterpriseDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  
  // Data states
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [reviewData, setReviewData] = useState<CompetitorReview[]>([]);
  const [socialData, setSocialData] = useState<SocialMention[]>([]);
  const [insights, setInsights] = useState<FusedInsight[]>([]);
  const [competitors] = useState(['Acme Corp', 'TechSolutions Inc', 'InnovateNow LLC']);
  const [industry] = useState('Technology Services');
  const [location] = useState('San Francisco, CA');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load all data in parallel
      const [news, reviews, social, businessData] = await Promise.all([
        newsAPIService.getCompetitorNews(competitors, industry),
        placesAPIService.getCompetitorReviews(competitors, location),
        socialMediaService.getTwitterMentions(competitors, ['#tech', '#innovation']),
        businessEnrichmentService.enrichBusinessData('MozaWave', 'mozawave.com')
      ]);

      setNewsData(news);
      setReviewData(reviews);
      setSocialData(social);

      // Generate fused insights
      const fusedInsights = await fusedInsightsEngine.generateInsights(
        { news, reviews, social },
        { complaints: [], reviews: [], revenue: 0 },
        { name: 'MozaWave', industry, location }
      );
      setInsights(fusedInsights);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-80 bg-dark-800 border-r border-dark-700 z-40"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MozaWave</h1>
              <p className="text-sm text-muted-foreground">Pro Platform</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3, active: true },
            { id: 'external', label: 'External Intelligence', icon: ExternalLink },
            { id: 'internal', label: 'Internal Data', icon: Building2 },
            { id: 'insights', label: 'Fused Insights', icon: Lightbulb },
            { id: 'reports', label: 'Reports', icon: Download },
            { id: 'integrations', label: 'Integrations', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-white hover:bg-dark-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );

  const Header = () => (
    <header className="bg-dark-800/80 backdrop-blur-md border-b border-dark-700 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-muted-foreground hover:text-white transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            <div>
              <h1 className="text-xl font-bold text-white">MozaWave</h1>
              <p className="text-sm text-muted-foreground">Dual Intelligence Platform</p>
            </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <ProfessionalInput
                placeholder="Search insights, competitors, trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 hidden md:block"
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            
            <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            <button className="p-2 text-muted-foreground hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Insights', value: insights.length, change: '+12%', icon: Lightbulb, color: 'text-primary-400', bgColor: 'bg-primary-500/20' },
          { title: 'Competitors Tracked', value: competitors.length, change: '+2', icon: Target, color: 'text-secondary-400', bgColor: 'bg-secondary-500/20' },
          { title: 'Data Sources', value: '15', change: '+3', icon: BarChart3, color: 'text-teal-400', bgColor: 'bg-teal-500/20' },
          { title: 'Revenue Impact', value: '$119K', change: '+25%', icon: DollarSign, color: 'text-success-400', bgColor: 'bg-success-500/20' }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProfessionalCard className="p-6 hover:shadow-xl transition-all duration-300 border border-dark-600">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2 font-medium">{metric.title}</p>
                  <p className="text-4xl font-bold text-white mb-2 tracking-tight">{metric.value}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-success-400 bg-success-500/20 px-2 py-1 rounded-full">
                      {metric.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${metric.bgColor} ${metric.color} shadow-lg`}>
                  <metric.icon className="w-7 h-7" />
                </div>
              </div>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* Fused Insights */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">AI-Powered Fused Insights</h2>
          <ProfessionalButton
            onClick={loadDashboardData}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </ProfessionalButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProfessionalCard className="p-6 hover:shadow-xl transition-all duration-300 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      insight.type === 'opportunity' ? 'bg-success-500/20 text-success-400' :
                      insight.type === 'threat' ? 'bg-red-pink-500/20 text-red-pink-400' :
                      insight.type === 'trend' ? 'bg-warning-500/20 text-warning-400' :
                      'bg-primary-500/20 text-primary-400'
                    } shadow-lg`}>
                      {insight.type === 'opportunity' ? <TrendingUp className="w-6 h-6" /> :
                       insight.type === 'threat' ? <AlertTriangle className="w-6 h-6" /> :
                       insight.type === 'trend' ? <BarChart3 className="w-6 h-6" /> :
                       <Target className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{insight.type.replace('_', ' ').toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    insight.priority === 'high' ? 'bg-red-pink-500/30 text-red-pink-300 border border-red-pink-500/50' :
                    insight.priority === 'medium' ? 'bg-warning-500/30 text-warning-300 border border-warning-500/50' :
                    'bg-success-500/30 text-success-300 border border-success-500/50'
                  }`}>
                    {insight.priority.toUpperCase()}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{insight.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
                    <span className="text-lg font-bold text-white">{insight.confidence}%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 shadow-glow"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-600">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Potential Impact: </span>
                      <span className="text-success-400 font-bold text-lg">+${insight.potentialImpact.revenue.toLocaleString()}</span>
                    </div>
                    <ProfessionalButton size="sm" variant="outline" className="btn-vibrant-teal">
                      View Details
                    </ProfessionalButton>
                  </div>
                </div>
              </ProfessionalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const ExternalIntelligenceTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">External Intelligence</h2>
      
      {/* News & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Competitor News</h3>
            <span className="text-sm font-semibold text-primary-400 bg-primary-500/20 px-3 py-1 rounded-full">{newsData.length} articles</span>
          </div>
          <div className="space-y-4">
            {newsData.slice(0, 3).map((article, index) => (
              <div key={article.id} className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 hover:bg-dark-700 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white line-clamp-2 leading-relaxed">{article.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ml-3 ${
                    article.sentiment === 'positive' ? 'bg-success-500/30 text-success-300 border border-success-500/50' :
                    article.sentiment === 'negative' ? 'bg-red-pink-500/30 text-red-pink-300 border border-red-pink-500/50' :
                    'bg-muted-foreground/30 text-muted-foreground border border-muted-foreground/50'
                  }`}>
                    {article.sentiment}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{article.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Relevance:</span>
                    <span className="text-xs font-bold text-primary-400">{article.relevanceScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ProfessionalCard>

        <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Competitor Reviews</h3>
            <span className="text-sm font-semibold text-secondary-400 bg-secondary-500/20 px-3 py-1 rounded-full">{reviewData.length} reviews</span>
          </div>
          <div className="space-y-4">
            {reviewData.slice(0, 3).map((review, index) => (
              <div key={review.id} className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 hover:bg-dark-700 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white">{review.businessName}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-warning-400' : 'text-dark-500'
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      review.sentiment === 'positive' ? 'bg-success-500/30 text-success-300 border border-success-500/50' :
                      review.sentiment === 'negative' ? 'bg-red-pink-500/30 text-red-pink-300 border border-red-pink-500/50' :
                      'bg-muted-foreground/30 text-muted-foreground border border-muted-foreground/50'
                    }`}>
                      {review.sentiment}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{review.reviewText}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{review.author}</span>
                  <span className="text-xs font-bold text-secondary-400 uppercase">{review.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </ProfessionalCard>
      </div>

      {/* Social Media Mentions */}
      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Social Media Mentions</h3>
          <span className="text-sm font-semibold text-teal-400 bg-teal-500/20 px-3 py-1 rounded-full">{socialData.length} mentions</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialData.map((mention, index) => (
            <div key={mention.id} className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 hover:bg-dark-700 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{mention.author}</span>
                <span className="text-xs font-bold text-teal-400 uppercase">{mention.platform}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{mention.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center font-medium">
                    <ThumbsUp className="w-3 h-3 mr-1 text-primary-400" />
                    {mention.engagement.likes}
                  </span>
                  <span className="flex items-center font-medium">
                    <MessageCircle className="w-3 h-3 mr-1 text-secondary-400" />
                    {mention.engagement.comments}
                  </span>
                  <span className="flex items-center font-medium">
                    <Share2 className="w-3 h-3 mr-1 text-teal-400" />
                    {mention.engagement.shares}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  mention.sentiment === 'positive' ? 'bg-success-500/30 text-success-300 border border-success-500/50' :
                  mention.sentiment === 'negative' ? 'bg-red-pink-500/30 text-red-pink-300 border border-red-pink-500/50' :
                  'bg-muted-foreground/30 text-muted-foreground border border-muted-foreground/50'
                }`}>
                  {mention.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ProfessionalCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'external':
        return <ExternalIntelligenceTab />;
      case 'internal':
        return <div className="text-white">Internal Data Tab - Coming Soon</div>;
      case 'insights':
        return <div className="text-white">Fused Insights Tab - Coming Soon</div>;
      case 'reports':
        return <div className="text-white">Reports Tab - Coming Soon</div>;
      case 'integrations':
        return <div className="text-white">Integrations Tab - Coming Soon</div>;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Sidebar />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-0">
        <Header />
        
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default VibrantEnterpriseDashboard;

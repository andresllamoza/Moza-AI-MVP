import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  RefreshCw,
  Download,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Star,
  Package,
  Megaphone,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { CompetitorTrackerMockData, CompetitorData, CompetitorChange } from '@/data/competitorTrackerMockData';

const CompetitorTrackerMVP: React.FC = () => {
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'google' | 'yelp' | 'facebook' | 'website'>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load initial mock data
    setCompetitors(CompetitorTrackerMockData.getCompetitors());
  }, []);

  const handleAddCompetitor = async () => {
    if (!newUrl.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCompetitor = CompetitorTrackerMockData.addCompetitor(newUrl, selectedPlatform);
      setCompetitors(prev => [...prev, newCompetitor]);
      setNewUrl('');
    } catch (error) {
      console.error('Error adding competitor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCompetitor = (id: string) => {
    if (CompetitorTrackerMockData.removeCompetitor(id)) {
      setCompetitors(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleRefreshCompetitor = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newChanges = CompetitorTrackerMockData.refreshCompetitor(id);
      setCompetitors(prev => prev.map(c => c.id === id ? {...c, currentData: {...c.currentData, lastChecked: new Date()}} : c));
    } catch (error) {
      console.error('Error refreshing competitor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = CompetitorTrackerMockData.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `competitor-changes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getChangeIcon = (type: CompetitorChange['type']) => {
    switch (type) {
      case 'price_change': return <TrendingUp className="w-4 h-4" />;
      case 'new_review': return <MessageCircle className="w-4 h-4" />;
      case 'new_service': return <Package className="w-4 h-4" />;
      case 'ad_campaign': return <Megaphone className="w-4 h-4" />;
      case 'rating_change': return <Star className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: CompetitorChange['impact']) => {
    switch (impact) {
      case 'positive': return 'text-green-400 bg-green-600/20';
      case 'negative': return 'text-red-400 bg-red-600/20';
      case 'neutral': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const filteredChanges = competitors
    .flatMap(competitor => 
      competitor.changes.map(change => ({ ...change, competitor }))
    )
    .filter(change => {
      const matchesFilter = filterType === 'all' || change.type === filterType;
      const matchesSearch = searchTerm === '' || 
        change.competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        change.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Competitor Tracker MVP</h1>
          <p className="text-muted-foreground">Monitor competitor changes and stay ahead of the market</p>
        </div>
        <ProfessionalButton onClick={handleExportCSV} className="btn-vibrant-primary">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </ProfessionalButton>
      </div>

      {/* Add Competitor Form */}
      <ProfessionalCard className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Competitor</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <ProfessionalInput
              placeholder="Enter competitor URL (Google, Yelp, Facebook, or website)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as any)}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="google">Google Business</option>
              <option value="yelp">Yelp</option>
              <option value="facebook">Facebook</option>
              <option value="website">Website</option>
            </select>
          </div>
          <ProfessionalButton
            onClick={handleAddCompetitor}
            disabled={isLoading || !newUrl.trim()}
            className="btn-vibrant-primary"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add Competitor
          </ProfessionalButton>
        </div>
      </ProfessionalCard>

      {/* Competitors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitors.map((competitor) => (
          <ProfessionalCard key={competitor.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{competitor.name}</h3>
                  <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full capitalize">
                    {competitor.platform}
                  </span>
                </div>
                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary-400 flex items-center space-x-1"
                >
                  <span>View on {competitor.platform}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex space-x-2">
                <ProfessionalButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleRefreshCompetitor(competitor.id)}
                  disabled={isLoading}
                >
                  <RefreshCw className="w-4 h-4" />
                </ProfessionalButton>
                <ProfessionalButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemoveCompetitor(competitor.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </ProfessionalButton>
              </div>
            </div>

            {/* Current Data */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {competitor.currentData.price && (
                <div className="text-center p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-white font-semibold">{competitor.currentData.price}</p>
                </div>
              )}
              <div className="text-center p-3 bg-dark-700/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Rating</p>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-warning-400 fill-current" />
                  <p className="text-white font-semibold">{competitor.currentData.rating?.toFixed(1)}</p>
                </div>
              </div>
              <div className="text-center p-3 bg-dark-700/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="text-white font-semibold">{competitor.currentData.reviewCount}</p>
              </div>
              <div className="text-center p-3 bg-dark-700/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Services</p>
                <p className="text-white font-semibold">{competitor.currentData.services?.length}</p>
              </div>
            </div>

            {/* Recent Changes */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Recent Changes ({competitor.changes.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {competitor.changes.slice(0, 3).map((change) => (
                  <div key={change.id} className="flex items-start space-x-3 p-2 bg-dark-700/30 rounded">
                    <div className="flex-shrink-0 mt-0.5">
                      {getChangeIcon(change.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{change.title}</p>
                      <p className="text-xs text-muted-foreground">{change.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {change.timestamp.toLocaleDateString()} {change.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ProfessionalCard>
        ))}
      </div>

      {/* Timeline View */}
      <ProfessionalCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Competitor Changes Timeline</h2>
          <div className="flex items-center space-x-4">
            <ProfessionalInput
              placeholder="Search changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="w-64"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
            >
              <option value="all">All Changes</option>
              <option value="price_change">Price Changes</option>
              <option value="new_review">New Reviews</option>
              <option value="new_service">New Services</option>
              <option value="ad_campaign">Ad Campaigns</option>
              <option value="rating_change">Rating Changes</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredChanges.map((change, index) => (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-4 p-4 bg-dark-700/50 rounded-lg border border-dark-600"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400">
                    {getChangeIcon(change.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-medium">{change.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(change.impact)}`}>
                      {change.impact}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{change.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{change.timestamp.toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>{change.competitor.name}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span className="capitalize">{change.type.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredChanges.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No changes found matching your criteria.</p>
            </div>
          )}
        </div>
      </ProfessionalCard>
    </div>
  );
};

export default CompetitorTrackerMVP;

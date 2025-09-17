import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  Star,
  TrendingUp,
  Building2,
  Users,
  FileText,
  Lightbulb,
  X,
  Command
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'business' | 'competitor' | 'report' | 'insight' | 'page';
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search data - in real app, this would come from API
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Mario\'s Artisan Pizza',
      description: 'Brooklyn, NY • Restaurant & Food Service',
      type: 'business',
      path: '/dashboard?business=marios-pizza',
      icon: Building2,
      category: 'Business'
    },
    {
      id: '2',
      title: 'Competitive Analysis Report',
      description: 'Latest insights on pizza industry competitors',
      type: 'report',
      path: '/reports/competitive-analysis',
      icon: FileText,
      category: 'Reports'
    },
    {
      id: '3',
      title: 'Pricing Strategy Insights',
      description: 'Revenue optimization opportunities identified',
      type: 'insight',
      path: '/insights/pricing-strategy',
      icon: Lightbulb,
      category: 'Insights'
    },
    {
      id: '4',
      title: 'Lucali Pizza',
      description: 'Competitor • Brooklyn, NY',
      type: 'competitor',
      path: '/competitors/lucali-pizza',
      icon: Users,
      category: 'Competitors'
    },
    {
      id: '5',
      title: 'Dashboard',
      description: 'Main intelligence dashboard',
      type: 'page',
      path: '/dashboard',
      icon: TrendingUp,
      category: 'Navigation'
    },
    {
      id: '6',
      title: 'Austin Elite Properties',
      description: 'Austin, TX • Real Estate',
      type: 'business',
      path: '/dashboard?business=austin-elite',
      icon: Building2,
      category: 'Business'
    }
  ];

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelectResult = (result: SearchResult) => {
    navigate(result.path);
    onClose();
    setQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'business': return 'text-primary-400';
      case 'competitor': return 'text-secondary-400';
      case 'report': return 'text-warning-400';
      case 'insight': return 'text-teal-400';
      case 'page': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'business': return Building2;
      case 'competitor': return Users;
      case 'report': return FileText;
      case 'insight': return Lightbulb;
      case 'page': return TrendingUp;
      default: return Search;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl mx-4 bg-dark-800 rounded-xl border border-dark-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center space-x-3 p-4 border-b border-dark-700">
          <Search className="w-5 h-5 text-muted-foreground" />
          <ProfessionalInput
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            placeholder="Search businesses, competitors, insights..."
            className="flex-1 bg-transparent border-0 text-white placeholder-muted-foreground focus:ring-0"
          />
          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-dark-700 rounded text-xs">Esc</kbd> to close
            </div>
            <ProfessionalButton
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              <X className="w-4 h-4" />
            </ProfessionalButton>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="animate-spin w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full mx-auto mb-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = getTypeIcon(result.type);
                const isSelected = index === selectedIndex;
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ProfessionalButton
                      onClick={() => handleSelectResult(result)}
                      variant="ghost"
                      className={`w-full justify-start p-4 h-auto ${
                        isSelected ? 'bg-dark-700' : 'hover:bg-dark-700'
                      }`}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`p-2 rounded-lg bg-dark-900 ${getTypeColor(result.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">{result.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-full bg-dark-900 ${getTypeColor(result.type)}`}>
                              {result.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                      </div>
                    </ProfessionalButton>
                  </motion.div>
                );
              })}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-xs mt-1">Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Command className="w-4 h-4" />
                  <span className="text-xs bg-dark-700 px-2 py-1 rounded">K</span>
                  <span>to search</span>
                </div>
                <div className="text-xs">
                  <p>Search for businesses, competitors, reports, and insights</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Searches */}
        {!query && (
          <div className="border-t border-dark-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Recent</span>
            </div>
            <div className="space-y-1">
              {['Mario\'s Artisan Pizza', 'Competitive Analysis', 'Pricing Strategy'].map((item, index) => (
                <ProfessionalButton
                  key={index}
                  onClick={() => setQuery(item)}
                  variant="ghost"
                  className="w-full justify-start text-sm text-muted-foreground hover:text-white"
                >
                  {item}
                </ProfessionalButton>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

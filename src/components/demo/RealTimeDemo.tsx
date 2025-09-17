import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  DollarSign,
  Clock,
  Users,
  Star,
  ExternalLink,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { ProfessionalButton } from '../ui/professional-button';
import { ProfessionalCard } from '../ui/professional-card';
import { 
  generateNYCRestaurantInsights, 
  generateNYCCompetitorAnalysis,
  generateNYCNewsData,
  generateNYCRedditData,
  nycRestaurantDemoScenario
} from '../../data/nycRestaurantDemo';

interface RealTimeDemoProps {
  businessName: string;
  location: string;
  industry: string;
  onComplete?: () => void;
}

export const RealTimeDemo: React.FC<RealTimeDemoProps> = ({ 
  businessName, 
  location, 
  industry, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [insights, setInsights] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [reddit, setReddit] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Analyzing Your Market",
      description: "Scanning competitor reviews, news mentions, and social media discussions...",
      icon: BarChart3,
      color: "text-primary-400"
    },
    {
      title: "Processing Customer Sentiment",
      description: "Analyzing 2,847+ reviews across Google, Yelp, and social platforms...",
      icon: Users,
      color: "text-secondary-400"
    },
    {
      title: "Identifying Opportunities",
      description: "Finding gaps in competitor service, pricing, and customer experience...",
      icon: Target,
      color: "text-teal-400"
    },
    {
      title: "Calculating Revenue Impact",
      description: "Estimating potential revenue from identified opportunities...",
      icon: DollarSign,
      color: "text-success-400"
    }
  ];

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(0);
    
    // Simulate real-time analysis
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Simulate processing time
      for (let progress = 0; progress <= 100; progress += 10) {
        setAnalysisProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Load data for this step
      if (i === 0) {
        setCompetitors(generateNYCCompetitorAnalysis());
      } else if (i === 1) {
        setNews(generateNYCNewsData());
        setReddit(generateNYCRedditData());
      } else if (i === 2) {
        setInsights(generateNYCRestaurantInsights());
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsAnalyzing(false);
    setCurrentStep(steps.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setInsights([]);
    setCompetitors([]);
    setNews([]);
    setReddit([]);
    setIsPlaying(false);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'threat': return AlertTriangle;
      case 'trend': return BarChart3;
      default: return Target;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-success-400 bg-success-500/20';
      case 'threat': return 'text-red-pink-400 bg-red-pink-500/20';
      case 'trend': return 'text-warning-400 bg-warning-500/20';
      default: return 'text-primary-400 bg-primary-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Real-Time Competitive Intelligence Analysis
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Analyzing <span className="text-primary-400 font-semibold">{businessName}</span> in <span className="text-secondary-400 font-semibold">{location}</span>
          </p>
          
          <div className="flex justify-center space-x-4">
            <ProfessionalButton
              onClick={startAnalysis}
              disabled={isAnalyzing}
              size="lg"
              className="px-8 btn-vibrant-primary"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Analysis
                </>
              )}
            </ProfessionalButton>
            
            <ProfessionalButton
              onClick={resetDemo}
              variant="outline"
              size="lg"
              className="px-8 btn-vibrant-secondary"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset
            </ProfessionalButton>
          </div>
        </div>

        {/* Analysis Steps */}
        {isAnalyzing && (
          <div className="mb-8">
            <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${steps[currentStep].color} bg-opacity-20`}>
                    <steps[currentStep].icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{steps[currentStep].title}</h3>
                    <p className="text-muted-foreground">{steps[currentStep].description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{analysisProgress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-dark-700 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300 shadow-glow"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </ProfessionalCard>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {currentStep === steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Key Insights */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">🎯 Key Intelligence Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {insights.map((insight, index) => {
                    const Icon = getInsightIcon(insight.type);
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-3 rounded-xl ${getInsightColor(insight.type)}`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1">{insight.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                  {insight.type.replace('_', ' ').toUpperCase()}
                                </p>
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

                          <p className="text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
                              <span className="text-lg font-bold text-white">{insight.confidence}%</span>
                            </div>
                            <div className="w-full bg-dark-700 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${insight.confidence}%` }}
                              />
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-dark-600">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-muted-foreground">Potential Revenue Impact:</span>
                              <span className="text-lg font-bold text-success-400">
                                +${insight.potentialImpact.revenue.toLocaleString()}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-white">Action Items:</h4>
                              <ul className="space-y-1">
                                {insight.actionItems.map((item: string, idx: number) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-center">
                                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </ProfessionalCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Competitor Analysis */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">🏆 Competitor Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {competitors.map((competitor, index) => (
                    <motion.div
                      key={competitor.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProfessionalCard className="p-6 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">{competitor.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-warning-400" />
                            <span className="text-lg font-bold text-white">{competitor.rating}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-400">{competitor.reviewCount}</div>
                            <div className="text-sm text-muted-foreground">Reviews</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-secondary-400">{competitor.sentimentScore}%</div>
                            <div className="text-sm text-muted-foreground">Sentiment</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-400 capitalize">{competitor.marketPosition}</div>
                            <div className="text-sm text-muted-foreground">Position</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-white">Recent Reviews:</h4>
                          {competitor.recentReviews.slice(0, 2).map((review: any, idx: number) => (
                            <div key={idx} className="p-3 bg-dark-700/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-white">{review.author}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating ? 'text-warning-400' : 'text-dark-500'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
                            </div>
                          ))}
                        </div>
                      </ProfessionalCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Revenue Opportunities Summary */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">💰 Revenue Opportunities</h2>
                <ProfessionalCard className="p-8 border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-900">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {nycRestaurantDemoScenario.revenueOpportunities.map((opportunity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-success-400 mb-2">{opportunity.potential}</div>
                        <div className="text-sm text-muted-foreground">{opportunity.source}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="text-4xl font-bold text-white mb-2">$127,000</div>
                    <div className="text-lg text-muted-foreground">Total Revenue Opportunity</div>
                  </div>
                </ProfessionalCard>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <ProfessionalButton
                  onClick={() => window.location.href = '/dashboard'}
                  size="lg"
                  className="px-8 btn-vibrant-primary"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Full Dashboard
                </ProfessionalButton>
                
                <ProfessionalButton
                  onClick={onComplete}
                  variant="outline"
                  size="lg"
                  className="px-8 btn-vibrant-secondary"
                >
                  Schedule Demo Call
                </ProfessionalButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

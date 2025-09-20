import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bot,
  User,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Zap,
  Target,
  BarChart3,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { reviewManagerAPI } from '@/services/reviewManagerApi';

const ReviewManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [aiResponse, setAiResponse] = useState<any>(null);

  // API Integration Functions
  const handleLoadReviews = async () => {
    setIsLoading(true);
    try {
      const reviews = await reviewManagerAPI.getReviews();
      setReviewsData(reviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      alert('Error loading reviews. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAIResponse = async (reviewText: string, rating: number) => {
    setIsLoading(true);
    try {
      const response = await reviewManagerAPI.generateAIResponse(reviewText, rating);
      setAiResponse(response);
    } catch (error) {
      console.error('Error generating AI response:', error);
      alert('Error generating AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplyToReview = async (reviewId: string, replyText: string) => {
    setIsLoading(true);
    try {
      const success = await reviewManagerAPI.replyToReview(reviewId, replyText);
      if (success) {
        alert('Reply sent successfully!');
        // Refresh reviews
        await handleLoadReviews();
      } else {
        alert('Failed to send reply. Please try again.');
      }
    } catch (error) {
      console.error('Error replying to review:', error);
      alert('Error replying to review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load reviews on component mount
  React.useEffect(() => {
    handleLoadReviews();
  }, []);

  const reviews = reviewsData.length > 0 ? reviewsData : [
    {
      id: 1,
      platform: "Google",
      rating: 5,
      text: "Amazing service! The team was professional and delivered exactly what they promised. Highly recommend!",
      customer: "Sarah Johnson",
      date: "2024-01-15",
      status: "responded",
      response: "Thank you Sarah! We're thrilled you had such a positive experience. We look forward to serving you again!",
      sentiment: "positive",
      autoResponse: true
    },
    {
      id: 2,
      platform: "Yelp",
      rating: 4,
      text: "Good service overall, but the wait time was longer than expected. The quality made up for it though.",
      customer: "Mike Chen",
      date: "2024-01-14",
      status: "pending",
      response: null,
      sentiment: "neutral",
      autoResponse: false
    },
    {
      id: 3,
      platform: "Google",
      rating: 2,
      text: "Disappointed with the service. The technician was late and didn't seem to know what he was doing.",
      customer: "Anonymous",
      date: "2024-01-13",
      status: "needs_response",
      response: null,
      sentiment: "negative",
      autoResponse: false
    },
    {
      id: 4,
      platform: "Facebook",
      rating: 5,
      text: "Outstanding work! Exceeded all expectations. Will definitely use again.",
      customer: "Lisa Rodriguez",
      date: "2024-01-12",
      status: "responded",
      response: "Lisa, thank you for the wonderful review! We're so glad we could exceed your expectations.",
      sentiment: "positive",
      autoResponse: true
    }
  ];

  const reputationMetrics = [
    {
      metric: "Overall Rating",
      current: "4.6",
      change: "+0.2",
      trend: "up",
      platform: "All Platforms"
    },
    {
      metric: "Google Rating",
      current: "4.7",
      change: "+0.1",
      trend: "up",
      platform: "Google"
    },
    {
      metric: "Yelp Rating",
      current: "4.5",
      change: "+0.3",
      trend: "up",
      platform: "Yelp"
    },
    {
      metric: "Response Rate",
      current: "87%",
      change: "+5%",
      trend: "up",
      platform: "All Platforms"
    }
  ];

  const autoResponseTemplates = [
    {
      id: 1,
      name: "Positive Review - Generic",
      trigger: "5-star rating",
      template: "Thank you for the amazing review! We're thrilled you had such a positive experience. We look forward to serving you again!",
      usage: 45,
      effectiveness: "95%"
    },
    {
      id: 2,
      name: "Negative Review - Apology",
      trigger: "1-2 star rating",
      template: "We sincerely apologize for not meeting your expectations. Please contact us directly so we can make this right. Your feedback helps us improve.",
      usage: 12,
      effectiveness: "78%"
    },
    {
      id: 3,
      name: "Neutral Review - Thank You",
      trigger: "3-4 star rating",
      template: "Thank you for your feedback! We appreciate you taking the time to share your experience. We're always working to improve our service.",
      usage: 23,
      effectiveness: "82%"
    }
  ];

  const campaignStats = [
    {
      name: "Review Request Campaign",
      sent: 156,
      responses: 23,
      rate: "14.7%",
      status: "active"
    },
    {
      name: "Follow-up Campaign",
      sent: 89,
      responses: 12,
      rate: "13.5%",
      status: "active"
    },
    {
      name: "Happy Customer Campaign",
      sent: 45,
      responses: 8,
      rate: "17.8%",
      status: "paused"
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success-400 bg-success-600/20';
      case 'negative': return 'text-red-400 bg-red-600/20';
      case 'neutral': return 'text-warning-400 bg-warning-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'text-success-400 bg-success-600/20';
      case 'pending': return 'text-warning-400 bg-warning-600/20';
      case 'needs_response': return 'text-red-400 bg-red-600/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Google': return 'text-blue-400 bg-blue-600/20';
      case 'Yelp': return 'text-red-400 bg-red-600/20';
      case 'Facebook': return 'text-blue-600 bg-blue-700/20';
      default: return 'text-muted-foreground bg-dark-600/20';
    }
  };

  const pendingReviews = reviews.filter(r => r.status === 'pending' || r.status === 'needs_response');
  const respondedReviews = reviews.filter(r => r.status === 'responded');

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
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary-600/20 rounded-lg">
              <MessageCircle className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">MozaWave Reputation</h1>
              <p className="text-xl text-muted-foreground">
                Stop losing customers because of bad reviews. AI automatically responds while nudging happy customers to leave 5-star reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reputation Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {reputationMetrics.map((metric, index) => (
            <ProfessionalCard key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary-600/20 rounded-lg">
                  <Star className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex items-center space-x-1 text-success-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{metric.current}</p>
                <p className="text-sm text-muted-foreground">{metric.metric}</p>
                <p className="text-xs text-muted-foreground">{metric.platform}</p>
              </div>
            </ProfessionalCard>
          ))}
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
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Reviews ({pendingReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Auto-Response
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'campaigns'
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Campaigns
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <ProfessionalButton className="w-full justify-start btn-vibrant-primary">
                    <Plus className="w-5 h-5 mr-3" />
                    Add Review Template
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    Send Review Request
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Configure Auto-Response
                  </ProfessionalButton>
                  <ProfessionalButton variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-5 h-5 mr-3" />
                    View Reputation Report
                  </ProfessionalButton>
                </div>
              </ProfessionalCard>

              {/* Recent Activity */}
              <ProfessionalCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-success-600/20 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-success-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Auto-responded to 5-star Google review</p>
                      <p className="text-muted-foreground text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-red-600/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">New 2-star review needs response</p>
                      <p className="text-muted-foreground text-xs">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg">
                    <div className="p-2 bg-primary-600/20 rounded-lg">
                      <Send className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Review request campaign sent to 45 customers</p>
                      <p className="text-muted-foreground text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Filter Bar */}
              <ProfessionalCard className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <ProfessionalInput
                      placeholder="Search reviews..."
                      icon={Search}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                      <option>All Platforms</option>
                      <option>Google</option>
                      <option>Yelp</option>
                      <option>Facebook</option>
                    </select>
                    <select className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                      <option>All Status</option>
                      <option>Needs Response</option>
                      <option>Responded</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
              </ProfessionalCard>

              {/* AI Response Display */}
              {aiResponse && (
                <ProfessionalCard className="p-6 mb-6 border-2 border-primary-600/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary-600/20 rounded-lg">
                      <Bot className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">AI-Generated Response</h3>
                    <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full">
                      {Math.round(aiResponse.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-muted-foreground mb-2">Suggested Response:</p>
                    <div className="p-4 bg-dark-700/50 rounded-lg">
                      <p className="text-white">{aiResponse.response}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Sentiment</p>
                      <p className="text-white capitalize">{aiResponse.sentiment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tone</p>
                      <p className="text-white capitalize">{aiResponse.tone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="text-white">{Math.round(aiResponse.confidence * 100)}%</p>
                    </div>
                  </div>

                  {aiResponse.suggestedActions && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Suggested Actions:</p>
                      <ul className="space-y-1">
                        {aiResponse.suggestedActions.map((action: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Target className="w-3 h-3 text-primary-400" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <ProfessionalButton 
                      size="sm" 
                      className="btn-vibrant-primary"
                      onClick={() => {
                        // In a real implementation, this would send the response
                        alert('AI response copied! You can now paste it as your reply.');
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Use This Response
                    </ProfessionalButton>
                    <ProfessionalButton 
                      size="sm" 
                      variant="outline"
                      onClick={() => setAiResponse(null)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Dismiss
                    </ProfessionalButton>
                  </div>
                </ProfessionalCard>
              )}

              {/* Reviews List */}
              {reviews.map((review) => (
                <ProfessionalCard key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getPlatformColor(review.platform)}`}>
                        <span className="text-sm font-medium">{review.platform}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-warning-400 fill-current' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(review.sentiment)}`}>
                        {review.sentiment}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status.replace('_', ' ')}
                      </span>
                      {review.autoResponse && (
                        <div className="flex items-center space-x-1 text-primary-400">
                          <Bot className="w-3 h-3" />
                          <span className="text-xs">Auto</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white mb-2">{review.text}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>— {review.customer}</span>
                      <span>•</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {review.response ? (
                    <div className="mb-4 p-4 bg-dark-700/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-primary-400" />
                        <span className="text-sm font-medium text-white">Your Response</span>
                      </div>
                      <p className="text-muted-foreground">{review.response}</p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-warning-400" />
                        <span className="text-sm font-medium text-white">Response Needed</span>
                      </div>
                      <div className="flex space-x-2">
                        <ProfessionalButton size="sm" className="btn-vibrant-primary">
                          <Edit className="w-4 h-4 mr-2" />
                          Write Response
                        </ProfessionalButton>
                        <ProfessionalButton 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleGenerateAIResponse(review.text, review.rating)}
                          disabled={isLoading}
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          {isLoading ? 'Generating...' : 'AI Response'}
                        </ProfessionalButton>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="text-muted-foreground hover:text-white">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <ProfessionalButton size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </ProfessionalButton>
                    </div>
                  </div>
                </ProfessionalCard>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              {autoResponseTemplates.map((template) => (
                <ProfessionalCard key={template.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Trigger: {template.trigger}</span>
                        <span>•</span>
                        <span>Used: {template.usage} times</span>
                        <span>•</span>
                        <span>Effectiveness: {template.effectiveness}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ProfessionalButton size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </ProfessionalButton>
                      <ProfessionalButton size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Test
                      </ProfessionalButton>
                    </div>
                  </div>

                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <p className="text-muted-foreground">{template.template}</p>
                  </div>
                </ProfessionalCard>
              ))}

              <ProfessionalCard className="p-6 border-2 border-dashed border-dark-600">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Create New Template</h3>
                  <p className="text-muted-foreground mb-4">Add a custom auto-response template for specific scenarios</p>
                  <ProfessionalButton className="btn-vibrant-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Template
                  </ProfessionalButton>
                </div>
              </ProfessionalCard>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {campaignStats.map((campaign, index) => (
                <ProfessionalCard key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{campaign.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Sent: {campaign.sent}</span>
                        <span>•</span>
                        <span>Responses: {campaign.responses}</span>
                        <span>•</span>
                        <span>Rate: {campaign.rate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'text-success-400 bg-success-600/20' 
                          : 'text-warning-400 bg-warning-600/20'
                      }`}>
                        {campaign.status}
                      </span>
                      {campaign.status === 'active' ? (
                        <ProfessionalButton size="sm" variant="outline">
                          <Pause className="w-4 h-4" />
                        </ProfessionalButton>
                      ) : (
                        <ProfessionalButton size="sm" className="btn-vibrant-primary">
                          <Play className="w-4 h-4" />
                        </ProfessionalButton>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{campaign.sent}</div>
                      <div className="text-xs text-muted-foreground">Messages Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{campaign.responses}</div>
                      <div className="text-xs text-muted-foreground">Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success-400">{campaign.rate}</div>
                      <div className="text-xs text-muted-foreground">Response Rate</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <ProfessionalButton size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </ProfessionalButton>
                    <ProfessionalButton size="sm" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </ProfessionalButton>
                    <ProfessionalButton size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Send Now
                    </ProfessionalButton>
                  </div>
                </ProfessionalCard>
              ))}

              <ProfessionalCard className="p-6 border-2 border-dashed border-dark-600">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Create New Campaign</h3>
                  <p className="text-muted-foreground mb-4">Set up automated review request campaigns to boost your reputation</p>
                  <ProfessionalButton className="btn-vibrant-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </ProfessionalButton>
                </div>
              </ProfessionalCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewManagerPage;

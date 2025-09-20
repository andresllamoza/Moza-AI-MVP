import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Edit,
  Send,
  Check,
  X,
  Filter,
  Search,
  TrendingUp,
  AlertTriangle,
  Clock,
  User,
  Globe,
  Facebook,
  Star as StarIcon
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { ReviewManagerMockData, Review, AIResponse } from '@/data/reviewManagerMockData';

const ReviewManagerMVP: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [currentAIResponse, setCurrentAIResponse] = useState<AIResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'responded'>('all');
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingResponse, setEditingResponse] = useState(false);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    setReviews(ReviewManagerMockData.getReviews());
    setAiResponses(ReviewManagerMockData.getAIResponses());
  }, []);

  const handleGenerateAIResponse = async (review: Review) => {
    setIsGenerating(true);
    setSelectedReview(review);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = ReviewManagerMockData.generateAIResponse(review.id);
      if (aiResponse) {
        setCurrentAIResponse(aiResponse);
        setAiResponses(prev => [...prev, aiResponse]);
        setEditedText(aiResponse.suggestedResponse);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveResponse = () => {
    if (!currentAIResponse) return;
    
    const success = ReviewManagerMockData.approveResponse(
      currentAIResponse.id,
      editingResponse ? editedText : undefined
    );
    
    if (success) {
      setReviews(prev => prev.map(r => 
        r.id === currentAIResponse.reviewId 
          ? { ...r, businessResponse: editingResponse ? editedText : currentAIResponse.suggestedResponse }
          : r
      ));
      setAiResponses(prev => prev.map(r => 
        r.id === currentAIResponse.id ? { ...r, approved: true } : r
      ));
      setCurrentAIResponse(null);
      setSelectedReview(null);
      setEditingResponse(false);
    }
  };

  const handleRejectResponse = () => {
    if (!currentAIResponse) return;
    
    const success = ReviewManagerMockData.rejectResponse(currentAIResponse.id);
    if (success) {
      setAiResponses(prev => prev.filter(r => r.id !== currentAIResponse.id));
      setCurrentAIResponse(null);
      setSelectedReview(null);
      setEditingResponse(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google': return <Globe className="w-4 h-4 text-blue-400" />;
      case 'yelp': return <MessageCircle className="w-4 h-4 text-red-400" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'text-blue-400 bg-blue-600/20';
      case 'yelp': return 'text-red-400 bg-red-600/20';
      case 'facebook': return 'text-blue-600 bg-blue-700/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-600/20';
      case 'negative': return 'text-red-400 bg-red-600/20';
      case 'neutral': return 'text-yellow-400 bg-yellow-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'grateful': return 'text-green-400 bg-green-600/20';
      case 'apologetic': return 'text-red-400 bg-red-600/20';
      case 'friendly': return 'text-blue-400 bg-blue-600/20';
      case 'professional': return 'text-purple-400 bg-purple-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'pending' && !review.businessResponse) ||
      (filterStatus === 'responded' && review.businessResponse);
    
    const matchesSentiment = filterSentiment === 'all' || review.sentiment === filterSentiment;
    
    const matchesSearch = searchTerm === '' || 
      review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSentiment && matchesSearch;
  });

  const stats = ReviewManagerMockData.getStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review Manager MVP</h1>
          <p className="text-muted-foreground">AI-powered review responses with tone matching</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfessionalCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalReviews}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </ProfessionalCard>
        
        <ProfessionalCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.respondedReviews}</p>
              <p className="text-sm text-muted-foreground">Responded</p>
            </div>
          </div>
        </ProfessionalCard>
        
        <ProfessionalCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-warning-600/20 rounded-lg">
              <StarIcon className="w-6 h-6 text-warning-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </ProfessionalCard>
        
        <ProfessionalCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-600/20 rounded-lg">
              <Bot className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.pendingAIResponses}</p>
              <p className="text-sm text-muted-foreground">Pending AI</p>
            </div>
          </div>
        </ProfessionalCard>
      </div>

      {/* Filters */}
      <ProfessionalCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <ProfessionalInput
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
            >
              <option value="all">All Reviews</option>
              <option value="pending">Pending Response</option>
              <option value="responded">Responded</option>
            </select>
            <select
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value as any)}
              className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
            >
              <option value="all">All Sentiment</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>
      </ProfessionalCard>

      {/* Reviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Reviews ({filteredReviews.length})</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedReview?.id === review.id
                      ? 'bg-primary-600/20 border-primary-600'
                      : 'bg-dark-700/50 border-dark-600 hover:border-dark-500'
                  }`}
                  onClick={() => setSelectedReview(review)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {review.reviewer.avatar ? (
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{review.reviewer.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'text-warning-400 fill-current' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(review.platform)}`}>
                            {getPlatformIcon(review.platform)}
                            <span className="ml-1 capitalize">{review.platform}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(review.sentiment)}`}>
                        {review.sentiment}
                      </span>
                      {review.businessResponse && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{review.text}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {review.date.toLocaleDateString()}
                    </span>
                    {!review.businessResponse && (
                      <ProfessionalButton
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateAIResponse(review);
                        }}
                        disabled={isGenerating}
                        className="btn-vibrant-primary"
                      >
                        {isGenerating ? (
                          <Clock className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Bot className="w-3 h-3 mr-1" />
                        )}
                        AI Response
                      </ProfessionalButton>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Response Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">AI Response</h2>
          
          {selectedReview && (
            <ProfessionalCard className="p-6">
              {!currentAIResponse && !selectedReview.businessResponse && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Generate an AI response for this review</p>
                  <ProfessionalButton
                    onClick={() => handleGenerateAIResponse(selectedReview)}
                    disabled={isGenerating}
                    className="btn-vibrant-primary"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        Generate AI Response
                      </>
                    )}
                  </ProfessionalButton>
                </div>
              )}

              {currentAIResponse && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="w-6 h-6 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">AI-Generated Response</h3>
                    <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full">
                      {Math.round(currentAIResponse.confidence * 100)}% confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tone</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToneColor(currentAIResponse.tone)}`}>
                        {currentAIResponse.tone}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sentiment</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(currentAIResponse.sentiment)}`}>
                        {currentAIResponse.sentiment}
                      </span>
                    </div>
                  </div>

                  {editingResponse ? (
                    <div className="space-y-4">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white resize-none"
                        rows={4}
                        placeholder="Edit the AI response..."
                      />
                      <div className="flex space-x-2">
                        <ProfessionalButton
                          size="sm"
                          onClick={() => setEditingResponse(false)}
                          variant="outline"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel Edit
                        </ProfessionalButton>
                        <ProfessionalButton
                          size="sm"
                          onClick={handleApproveResponse}
                          className="btn-vibrant-primary"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve Edited
                        </ProfessionalButton>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-dark-700/50 rounded-lg">
                        <p className="text-white">{currentAIResponse.suggestedResponse}</p>
                      </div>
                      <div className="flex space-x-2">
                        <ProfessionalButton
                          size="sm"
                          onClick={() => setEditingResponse(true)}
                          variant="outline"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </ProfessionalButton>
                        <ProfessionalButton
                          size="sm"
                          onClick={handleApproveResponse}
                          className="btn-vibrant-primary"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </ProfessionalButton>
                        <ProfessionalButton
                          size="sm"
                          onClick={handleRejectResponse}
                          variant="outline"
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </ProfessionalButton>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedReview.businessResponse && !currentAIResponse && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Response Sent</h3>
                  </div>
                  <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg">
                    <p className="text-white">{selectedReview.businessResponse}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Response approved and sent on {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </ProfessionalCard>
          )}

          {!selectedReview && (
            <ProfessionalCard className="p-6">
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a review to generate an AI response</p>
              </div>
            </ProfessionalCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewManagerMVP;

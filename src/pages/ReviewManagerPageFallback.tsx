import React, { useState } from 'react';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { Search, Star, ThumbsUp } from 'lucide-react';

const ReviewManagerPageFallback: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review Manager</h1>
          <p className="text-muted-foreground">Monitor and respond to customer reviews</p>
        </div>

        <ProfessionalCard className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <ProfessionalInput
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2">
              <ProfessionalButton variant="primary" size="sm">
                All Reviews
              </ProfessionalButton>
              <ProfessionalButton variant="outline" size="sm">
                Pending Response
              </ProfessionalButton>
            </div>
          </div>
        </ProfessionalCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProfessionalCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              "Great service and excellent food quality. Would definitely recommend!"
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Google Reviews</span>
              <ProfessionalButton size="sm" variant="outline">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Respond
              </ProfessionalButton>
            </div>
          </ProfessionalCard>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagerPageFallback;
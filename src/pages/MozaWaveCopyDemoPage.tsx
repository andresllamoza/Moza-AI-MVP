import React from 'react';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { FileText, Zap } from 'lucide-react';

const MozaWaveCopyDemoPageFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Copy Generation Demo</h1>
          <p className="text-muted-foreground">AI-powered marketing copy generation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfessionalCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Smart Copy Generation</h3>
                <p className="text-sm text-muted-foreground">AI-powered content creation</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Generate high-converting marketing copy using advanced AI models trained on successful campaigns.
            </p>
            <ProfessionalButton className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              Generate Copy
            </ProfessionalButton>
          </ProfessionalCard>

          <ProfessionalCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Copy Preview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Headline</h4>
                <p className="text-sm">"Transform Your Business with AI-Powered Intelligence"</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Call to Action</h4>
                <p className="text-sm">"Get Started Today - Free Trial Available"</p>
              </div>
            </div>
          </ProfessionalCard>
        </div>
      </div>
    </div>
  );
};

export default MozaWaveCopyDemoPageFallback;
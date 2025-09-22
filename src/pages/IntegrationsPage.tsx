import React from 'react';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { Plug, CheckCircle2, Globe } from 'lucide-react';

const IntegrationsPageFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground">Connect your tools and services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProfessionalCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-primary/20 text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">NewsAPI</h3>
                  <p className="text-sm text-muted-foreground">News & Media</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                  Connected
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">Real-time news and market intelligence</p>
            <ProfessionalButton size="sm" variant="outline">
              Configure
            </ProfessionalButton>
          </ProfessionalCard>

          <ProfessionalCard className="p-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <Plug className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">More integrations coming soon</p>
              </div>
            </div>
          </ProfessionalCard>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPageFallback;
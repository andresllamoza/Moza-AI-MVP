// Temporary simplified version to resolve build errors
import React from 'react';
import { Button } from '@/components/ui/button';

export const MozaWaveCopySystemFallback = () => {
  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Copy System</h2>
      <p className="text-muted-foreground">Copy system functionality coming soon.</p>
      <Button variant="outline" className="mt-4">
        Configure Copy
      </Button>
    </div>
  );
};

export default MozaWaveCopySystemFallback;
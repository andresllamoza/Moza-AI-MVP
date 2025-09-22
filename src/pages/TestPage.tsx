// Simple test page to verify routing
import React from 'react';

export const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Test Page Working!</h1>
        <p className="text-slate-600">If you can see this, routing is working correctly.</p>
      </div>
    </div>
  );
};

export default TestPage;

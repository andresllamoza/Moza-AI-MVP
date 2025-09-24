import React, { useState } from 'react';
import { SecurityDashboard } from '@/components/security/SecurityDashboard';
import { Shield } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enterprise Security</h1>
              <p className="text-gray-600">Comprehensive security management and compliance monitoring</p>
            </div>
          </div>
        </div>

        <SecurityDashboard 
          isOpen={isDashboardOpen} 
          onClose={() => setIsDashboardOpen(false)} 
        />
      </div>
    </div>
  );
};

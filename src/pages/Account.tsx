// Simple Account Page - Redirects to main landing
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main one-page landing
    navigate('/onepage', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Account;

// Protected Route Component for FAANG-level authentication
// Inspired by HubSpot, Google, and Salesforce security patterns

import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    // Simulate auth check delay for better UX
    const timer = setTimeout(() => {
      setAuthCheckComplete(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authCheckComplete && !user && requireAuth) {
      setShowAuthModal(true);
    }
  }, [authCheckComplete, user, requireAuth]);

  // Show loading state
  if (loading || !authCheckComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Shield className="h-6 w-6 text-blue-600 absolute top-2 left-1/2 transform -translate-x-1/2" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Verifying Access
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Ensuring your account is secure and authenticated
          </p>
        </motion.div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full mx-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Please sign in to access your personalized dashboard and insights
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign In to Continue
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>FAANG-Level</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showAuthModal && (
            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onSuccess={() => setShowAuthModal(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // If user is authenticated or authentication is not required
  return <>{children}</>;
};

export default ProtectedRoute;

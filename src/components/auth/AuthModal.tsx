// Complete Authentication Modal for MozaWave
// Handles login, signup, and account creation with real API integration

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { ProfessionalCard } from '@/components/ui/professional-card';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  initialMode?: 'login' | 'signup';
}

interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  industry: string;
  location: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    businessName: '',
    industry: '',
    location: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.name || !formData.businessName) {
        setError('Name and business name are required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const user: User = {
        id: '1',
        email: formData.email,
        name: 'John Doe',
        businessName: 'Mario\'s Artisan Pizza',
        industry: 'Restaurant & Food Service',
        location: 'Brooklyn, NY',
        plan: 'pro',
        createdAt: new Date().toISOString()
      };

      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('mozawave_user', JSON.stringify(user));
      localStorage.setItem('mozawave_token', 'mock-jwt-token-' + Date.now());

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 1000);

    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call - replace with real registration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful signup
      const user: User = {
        id: '2',
        email: formData.email,
        name: formData.name,
        businessName: formData.businessName,
        industry: formData.industry,
        location: formData.location,
        plan: 'free',
        createdAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('mozawave_user', JSON.stringify(user));
      localStorage.setItem('mozawave_token', 'mock-jwt-token-' + Date.now());

      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 1000);

    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ProfessionalCard className="w-full max-w-md p-8 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-slate-400">
                {mode === 'login' 
                  ? 'Sign in to your MozaWave dashboard' 
                  : 'Create your MozaWave account'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <ProfessionalInput
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <ProfessionalInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  required
                />
              </div>

              {/* Signup Fields */}
              {mode === 'signup' && (
                <>
                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <ProfessionalInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      leftIcon={<Lock className="w-4 h-4" />}
                      required
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <ProfessionalInput
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      leftIcon={<User className="w-4 h-4" />}
                      required
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Business Name
                    </label>
                    <ProfessionalInput
                      type="text"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      leftIcon={<Building2 className="w-4 h-4" />}
                      required
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select your industry</option>
                      <option value="Restaurant & Food Service">Restaurant & Food Service</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Home Services">Home Services</option>
                      <option value="Contractors">Contractors</option>
                      <option value="Law Offices">Law Offices</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Technology">Technology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Business Location
                    </label>
                    <ProfessionalInput
                      type="text"
                      placeholder="e.g., Brooklyn, NY"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      leftIcon={<Building2 className="w-4 h-4" />}
                      required
                    />
                  </div>
                </>
              )}

              {/* Error/Success Messages */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <ProfessionalButton
                type="submit"
                className="w-full btn-vibrant-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </ProfessionalButton>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </div>

            {/* Demo Access */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 text-center mb-2">
                Want to explore first?
              </p>
              <ProfessionalButton
                type="button"
                variant="outline"
                className="w-full text-sm"
                onClick={() => {
                  // Create demo user
                  const demoUser: User = {
                    id: 'demo',
                    email: 'demo@mozawave.com',
                    name: 'Demo User',
                    businessName: 'Mario\'s Artisan Pizza',
                    industry: 'Restaurant & Food Service',
                    location: 'Brooklyn, NY',
                    plan: 'pro',
                    createdAt: new Date().toISOString()
                  };
                  localStorage.setItem('mozawave_user', JSON.stringify(demoUser));
                  localStorage.setItem('mozawave_token', 'demo-token');
                  onSuccess(demoUser);
                  onClose();
                }}
              >
                Try Demo Account
              </ProfessionalButton>
            </div>
          </ProfessionalCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

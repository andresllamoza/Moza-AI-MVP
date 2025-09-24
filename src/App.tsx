import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { AuthGuard } from "@/components/AuthGuard";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/hooks/use-theme";
import LandingPage from "./components/demo/LandingPage";
import IntelligenceIntroDemo from "./components/demo/IntelligenceIntroDemo";
import ZeroFrictionIntroDemo from "./components/demo/ZeroFrictionIntroDemo";
import { RealTimeDemo } from "./components/demo/RealTimeDemo";
import EmailDemo from "./components/demo/EmailDemo";
import SmartDashboard from "./components/demo/SmartDashboard";
import ROICalculator from "./components/demo/ROICalculator";
import DemoNavigation from "./components/demo/DemoNavigation";
import MozaIntelligenceDashboard from "./components/dashboard/MozaIntelligenceDashboard";
import DualIntelligenceDashboard from "./components/dashboard/DualIntelligenceDashboard";
import VibrantEnterpriseDashboard from "./components/dashboard/VibrantEnterpriseDashboardFallback";
import PersonalizedDashboard from "./components/dashboard/PersonalizedDashboard";
import { MozaWaveDashboard } from "./components/dashboard/MozaWaveDashboard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Reviews from "./pages/Reviews";
import GoogleProfile from "./pages/GoogleProfile";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import InsightsPage from "./pages/InsightsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ServicesPage from "./pages/ServicesPage";
import CompetitorTrackerPage from "./pages/CompetitorTrackerPage";
import ReviewManagerPage from "./pages/ReviewManagerPage";
import { ContractorsLanding } from "./components/ContractorsLanding";
import { HospitalityLanding } from "./components/HospitalityLanding";
import { CarWashLanding } from "./components/CarWashLanding";
import { RestaurantsLanding } from "./components/RestaurantsLanding";
import DemoLauncherPage from "./pages/DemoLauncherPage";
import EnhancedLandingPage from "./pages/EnhancedLandingPage";
import OnePageLanding from "./pages/OnePageLanding";
import Account from "./pages/Account";
import TestPage from "./pages/TestPage";
import SimpleOnePage from "./pages/SimpleOnePage";
import WorkingOnePage from "./pages/WorkingOnePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { DesignSystemDemo } from "./pages/DesignSystemDemo";
import { StableEnterpriseLanding } from "./pages/StableEnterpriseLanding";
import { SecurityDashboard } from "./components/security/SecurityDashboard";
import { SecurityPage } from "./pages/SecurityPage";
import { IndustryDemoPage } from "./pages/IndustryDemoPage";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="mozawave-theme">
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout>
              <Routes>
              {/* MAIN ROUTE - Stable Enterprise Landing (Salesforce-Style) */}
              <Route path="/" element={<StableEnterpriseLanding />} />
              
              {/* AUTHENTICATED USER ROUTES - Protected with FAANG-level security */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PersonalizedDashboard />
                </ProtectedRoute>
              } />
              <Route path="/modern-dashboard" element={
                <ProtectedRoute>
                  <MozaWaveDashboard />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <InsightsPage />
                </ProtectedRoute>
              } />
              <Route path="/integrations" element={
                <ProtectedRoute>
                  <IntegrationsPage />
                </ProtectedRoute>
              } />
              <Route path="/services" element={
                <ProtectedRoute>
                  <ServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/services/competitor-tracker" element={
                <ProtectedRoute>
                  <CompetitorTrackerPage />
                </ProtectedRoute>
              } />
              <Route path="/services/review-manager" element={
                <ProtectedRoute>
                  <ReviewManagerPage />
                </ProtectedRoute>
              } />
              
              {/* ACCOUNT MANAGEMENT */}
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              
              {/* SECURITY MANAGEMENT */}
              <Route path="/security" element={
                <ProtectedRoute>
                  <SecurityPage />
                </ProtectedRoute>
              } />
              
              {/* PUBLIC DEMO ROUTES */}
              <Route path="/demo-center" element={<DemoLauncherPage />} />
              <Route path="/industry-selector" element={<IndustryDemoPage />} />
              <Route path="/design-system" element={<DesignSystemDemo />} />
              <Route path="/original-landing" element={<WorkingOnePage />} />
              <Route path="/real-time-demo" element={<RealTimeDemo businessName="Mario's Artisan Pizza" location="Brooklyn, NY" industry="restaurant" />} />
              
              {/* INDUSTRY LANDING PAGES (Public) */}
              <Route path="/contractors" element={<ContractorsLanding />} />
              <Route path="/hospitality" element={<HospitalityLanding />} />
              <Route path="/car-wash" element={<CarWashLanding />} />
              <Route path="/restaurants" element={<RestaurantsLanding />} />
              
              {/* LEGACY/DEVELOPMENT ROUTES */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/old-dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/leads" element={<AuthGuard><Leads /></AuthGuard>} />
              <Route path="/reviews" element={<AuthGuard><Reviews /></AuthGuard>} />
              <Route path="/google-profile" element={<AuthGuard><GoogleProfile /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
              <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />
              
              {/* CATCH-ALL ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
      </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;

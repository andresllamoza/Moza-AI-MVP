import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { AuthGuard } from "@/components/AuthGuard";
import { AppLayout } from "@/components/layout/AppLayout";
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

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout>
              <Routes>
              <Route path="/" element={<ZeroFrictionIntroDemo />} />
              <Route path="/old-intro" element={<IntelligenceIntroDemo />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/real-time-demo" element={<RealTimeDemo businessName="Mario's Artisan Pizza" location="Brooklyn, NY" industry="restaurant" />} />
              <Route path="/demo" element={
                <div>
                  <DemoNavigation />
                  <EmailDemo />
                </div>
              } />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/competitor-tracker" element={<CompetitorTrackerPage />} />
              <Route path="/services/review-manager" element={<ReviewManagerPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/dual-dashboard" element={<DualIntelligenceDashboard />} />
              <Route path="/internal-dashboard" element={<MozaIntelligenceDashboard />} />
              <Route path="/old-dashboard" element={
                <div>
                  <DemoNavigation />
                  <SmartDashboard />
                </div>
              } />
              <Route path="/roi-calculator" element={
                <div>
                  <DemoNavigation />
                  <ROICalculator />
                </div>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/contractors" element={<ContractorsLanding />} />
              <Route path="/hospitality" element={<HospitalityLanding />} />
              <Route path="/car-wash" element={<CarWashLanding />} />
              <Route path="/restaurants" element={<RestaurantsLanding />} />
              <Route path="/demo-center" element={<DemoLauncherPage />} />
              <Route path="/test-demo" element={<DemoLauncherPage />} />
              <Route path="/old-dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/leads" element={<AuthGuard><Leads /></AuthGuard>} />
              <Route path="/reviews" element={<AuthGuard><Reviews /></AuthGuard>} />
              <Route path="/google-profile" element={<AuthGuard><GoogleProfile /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
              <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;

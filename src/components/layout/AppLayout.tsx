import React from 'react';
import { useLocation } from 'react-router-dom';
// import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { FloatingActionButton } from '@/components/navigation/FloatingActionButton';

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showBreadcrumbs?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  pageTitle,
  showBreadcrumbs = true
}) => {
  const location = useLocation();
  
  // Don't show header on certain pages
  const hideHeaderPages = ['/auth', '/onboarding'];
  const shouldShowHeader = !hideHeaderPages.includes(location.pathname);
  
  // Don't show breadcrumbs on homepage
  const shouldShowBreadcrumbs = showBreadcrumbs && location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header temporarily disabled */}
      <main className="pb-20 lg:pb-0">
        {children}
      </main>
      <MobileBottomNav />
      <FloatingActionButton />
    </div>
  );
};

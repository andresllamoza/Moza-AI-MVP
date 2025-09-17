import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NavigationState {
  currentPage: string;
  breadcrumbs: Array<{
    label: string;
    path: string;
    isClickable: boolean;
  }>;
  recentPages: string[];
  favorites: string[];
  searchQuery: string;
  isMobileMenuOpen: boolean;
  activeSection: string;
  navigationHistory: string[];
  
  // Actions
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string; isClickable: boolean }>) => void;
  addToRecent: (page: string) => void;
  toggleFavorite: (page: string) => void;
  setSearchQuery: (query: string) => void;
  toggleMobileMenu: () => void;
  setActiveSection: (section: string) => void;
  navigateBack: () => string | null;
  navigateForward: () => string | null;
  clearNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      currentPage: '/',
      breadcrumbs: [],
      recentPages: [],
      favorites: [],
      searchQuery: '',
      isMobileMenuOpen: false,
      activeSection: 'dashboard',
      navigationHistory: ['/'],

      setCurrentPage: (page: string) => {
        const state = get();
        const newHistory = [...state.navigationHistory];
        
        // Don't add duplicate consecutive pages
        if (newHistory[newHistory.length - 1] !== page) {
          newHistory.push(page);
          // Keep only last 10 pages
          if (newHistory.length > 10) {
            newHistory.shift();
          }
        }

        set({
          currentPage: page,
          navigationHistory: newHistory,
        });
        
        // Add to recent pages
        get().addToRecent(page);
      },

      setBreadcrumbs: (breadcrumbs) => {
        set({ breadcrumbs });
      },

      addToRecent: (page: string) => {
        const state = get();
        const recent = state.recentPages.filter(p => p !== page);
        recent.unshift(page);
        
        // Keep only last 5 recent pages
        if (recent.length > 5) {
          recent.pop();
        }
        
        set({ recentPages: recent });
      },

      toggleFavorite: (page: string) => {
        const state = get();
        const favorites = state.favorites.includes(page)
          ? state.favorites.filter(f => f !== page)
          : [...state.favorites, page];
        
        set({ favorites });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      toggleMobileMenu: () => {
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
      },

      setActiveSection: (section: string) => {
        set({ activeSection: section });
      },

      navigateBack: () => {
        const state = get();
        if (state.navigationHistory.length > 1) {
          const newHistory = [...state.navigationHistory];
          newHistory.pop(); // Remove current page
          const previousPage = newHistory[newHistory.length - 1];
          
          set({
            currentPage: previousPage,
            navigationHistory: newHistory,
          });
          
          return previousPage;
        }
        return null;
      },

      navigateForward: () => {
        // This would require a forward history, which is complex
        // For now, return null as browser handles forward navigation
        return null;
      },

      clearNavigation: () => {
        set({
          currentPage: '/',
          breadcrumbs: [],
          recentPages: [],
          searchQuery: '',
          isMobileMenuOpen: false,
          activeSection: 'dashboard',
          navigationHistory: ['/'],
        });
      },
    }),
    {
      name: 'moza-navigation-storage',
      partialize: (state) => ({
        recentPages: state.recentPages,
        favorites: state.favorites,
        activeSection: state.activeSection,
      }),
    }
  )
);

// Navigation configuration
export const navigationConfig = {
  primaryNav: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', section: 'dashboard' },
    { label: 'Reports', path: '/reports', icon: 'FileText', section: 'reports' },
    { label: 'Insights', path: '/insights', icon: 'Lightbulb', section: 'insights' },
    { label: 'Integrations', path: '/integrations', icon: 'Plug', section: 'integrations' },
  ],
  secondaryNav: [
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Account', path: '/account', icon: 'User' },
  ],
  mobileBottomNav: [
    { label: 'Home', path: '/', icon: 'Home', section: 'home' },
    { label: 'Reports', path: '/reports', icon: 'FileText', section: 'reports' },
    { label: 'Insights', path: '/insights', icon: 'Lightbulb', section: 'insights' },
    { label: 'More', path: '/more', icon: 'MoreHorizontal', section: 'more' },
  ],
};

// Breadcrumb generator
export const generateBreadcrumbs = (pathname: string, pageTitle?: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { label: 'Home', path: '/', isClickable: true }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    let label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Custom labels for specific pages
    if (segment === 'dashboard') label = 'Dashboard';
    if (segment === 'reports') label = 'Reports';
    if (segment === 'insights') label = 'Insights';
    if (segment === 'integrations') label = 'Integrations';
    if (segment === 'demo') label = 'Live Demo';
    if (segment === 'zero-friction-demo') label = 'Intelligence Demo';
    if (segment === 'real-time-demo') label = 'Real-Time Analysis';
    
    // Use custom page title if provided and it's the last segment
    if (isLast && pageTitle) {
      label = pageTitle;
    }

    breadcrumbs.push({
      label,
      path: currentPath,
      isClickable: !isLast
    });
  });

  return breadcrumbs;
};

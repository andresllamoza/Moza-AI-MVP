import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Brain,
  Search,
  Bell,
  Settings,
  User,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Star,
  Clock,
  Home,
  FileText,
  Lightbulb,
  Plug,
  MoreHorizontal,
  ArrowLeft,
  Command,
  K
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { useNavigationStore, navigationConfig, generateBreadcrumbs } from '@/store/navigationStore';

interface GlobalHeaderProps {
  pageTitle?: string;
  showBreadcrumbs?: boolean;
  className?: string;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  pageTitle,
  showBreadcrumbs = true,
  className = ''
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    currentPage,
    breadcrumbs,
    recentPages,
    favorites,
    isMobileMenuOpen,
    activeSection,
    setCurrentPage,
    setBreadcrumbs,
    setSearchQuery,
    toggleMobileMenu,
    setActiveSection,
    navigateBack
  } = useNavigationStore();

  // Update breadcrumbs when location changes
  useEffect(() => {
    const newBreadcrumbs = generateBreadcrumbs(location.pathname, pageTitle);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentPage(location.pathname);
  }, [location.pathname, pageTitle, setBreadcrumbs, setCurrentPage]);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Escape to close modals/menus
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setShowUserMenu(false);
        setShowNotifications(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigation = (path: string, section?: string) => {
    navigate(path);
    if (section) {
      setActiveSection(section);
    }
    setIsMobileMenuOpen(false);
  };

  const handleBack = () => {
    const previousPage = navigateBack();
    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate('/');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/insights')) return 'insights';
    if (path.startsWith('/integrations')) return 'integrations';
    if (path.startsWith('/demo')) return 'demo';
    return 'dashboard';
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 bg-dark-800/95 backdrop-blur-md border-b border-dark-700 transition-all duration-300 ${
          isScrolled ? 'shadow-2xl' : 'shadow-lg'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">MozaWave</h1>
                <p className="text-xs text-muted-foreground">Dual Intelligence Platform</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationConfig.primaryNav.map((item) => (
                <motion.div key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ProfessionalButton
                    onClick={() => handleNavigation(item.path, item.section)}
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    size="sm"
                    className={`px-4 py-2 ${
                      isActive(item.path)
                        ? 'btn-vibrant-primary'
                        : 'text-muted-foreground hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      {React.createElement(
                        require('lucide-react')[item.icon],
                        { className: 'w-4 h-4' }
                      )}
                      <span>{item.label}</span>
                    </span>
                  </ProfessionalButton>
                </motion.div>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <ProfessionalButton
                  onClick={() => setIsSearchOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white hover:bg-dark-700"
                >
                  <Search className="w-4 h-4" />
                </ProfessionalButton>
                
                {/* Search Shortcut Hint */}
                <div className="hidden lg:flex items-center space-x-1 absolute -bottom-8 right-0 text-xs text-muted-foreground">
                  <Command className="w-3 h-3" />
                  <K className="w-3 h-3" />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <ProfessionalButton
                  onClick={() => setShowNotifications(!showNotifications)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white hover:bg-dark-700 relative"
                >
                  <Bell className="w-4 h-4" />
                  {/* Notification Badge */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </ProfessionalButton>
              </div>

              {/* User Menu */}
              <div className="relative">
                <ProfessionalButton
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white hover:bg-dark-700"
                >
                  <User className="w-4 h-4" />
                </ProfessionalButton>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <ProfessionalButton
                  onClick={toggleMobileMenu}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white hover:bg-dark-700"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </ProfessionalButton>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          {showBreadcrumbs && breadcrumbs.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-2 py-2 border-t border-dark-700"
            >
              <ProfessionalButton
                onClick={handleBack}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-white p-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </ProfessionalButton>
              
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                  )}
                  <ProfessionalButton
                    onClick={() => crumb.isClickable && handleNavigation(crumb.path)}
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      crumb.isClickable
                        ? 'text-muted-foreground hover:text-white'
                        : 'text-white font-medium'
                    }`}
                  >
                    {crumb.label}
                  </ProfessionalButton>
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md border-t border-dark-700">
        <div className="flex items-center justify-around py-2">
          {navigationConfig.mobileBottomNav.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <ProfessionalButton
                onClick={() => handleNavigation(item.path, item.section)}
                variant="ghost"
                size="sm"
                className={`w-full flex flex-col items-center space-y-1 py-2 ${
                  isActive(item.path)
                    ? 'text-primary-400'
                    : 'text-muted-foreground'
                }`}
              >
                {React.createElement(
                  require('lucide-react')[item.icon],
                  { className: 'w-5 h-5' }
                )}
                <span className="text-xs">{item.label}</span>
              </ProfessionalButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-dark-800 border-l border-dark-700 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <ProfessionalButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-5 h-5" />
                </ProfessionalButton>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-8">
                {navigationConfig.primaryNav.map((item) => (
                  <ProfessionalButton
                    key={item.path}
                    onClick={() => handleNavigation(item.path, item.section)}
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      isActive(item.path) ? 'btn-vibrant-primary' : ''
                    }`}
                  >
                    <span className="flex items-center space-x-3">
                      {React.createElement(
                        require('lucide-react')[item.icon],
                        { className: 'w-5 h-5' }
                      )}
                      <span>{item.label}</span>
                    </span>
                  </ProfessionalButton>
                ))}
              </div>

              {/* Recent Pages */}
              {recentPages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent
                  </h3>
                  <div className="space-y-1">
                    {recentPages.slice(0, 3).map((page) => (
                      <ProfessionalButton
                        key={page}
                        onClick={() => handleNavigation(page)}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                      >
                        {page === '/' ? 'Home' : page.charAt(1).toUpperCase() + page.slice(2)}
                      </ProfessionalButton>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Favorites
                  </h3>
                  <div className="space-y-1">
                    {favorites.slice(0, 3).map((page) => (
                      <ProfessionalButton
                        key={page}
                        onClick={() => handleNavigation(page)}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                      >
                        {page === '/' ? 'Home' : page.charAt(1).toUpperCase() + page.slice(2)}
                      </ProfessionalButton>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Navigation */}
              <div className="space-y-2">
                {navigationConfig.secondaryNav.map((item) => (
                  <ProfessionalButton
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                  >
                    <span className="flex items-center space-x-3">
                      {React.createElement(
                        require('lucide-react')[item.icon],
                        { className: 'w-4 h-4' }
                      )}
                      <span>{item.label}</span>
                    </span>
                  </ProfessionalButton>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl mx-4 bg-dark-800 rounded-xl border border-dark-700 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <ProfessionalInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search businesses, competitors, insights..."
                  className="flex-1 bg-dark-900 border-dark-700"
                  autoFocus
                />
                <ProfessionalButton
                  onClick={() => setIsSearchOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </ProfessionalButton>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-dark-700 rounded text-xs">Esc</kbd> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-4 top-16 w-80 bg-dark-800 rounded-xl border border-dark-700 p-4 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Notifications</h3>
              <ProfessionalButton
                onClick={() => setShowNotifications(false)}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </ProfessionalButton>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-dark-900 rounded-lg">
                <p className="text-sm text-white">New competitor analysis ready</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="p-3 bg-dark-900 rounded-lg">
                <p className="text-sm text-white">Market trend alert: Pizza industry</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Menu Dropdown */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-4 top-16 w-48 bg-dark-800 rounded-xl border border-dark-700 p-2 shadow-2xl z-50"
          >
            <div className="space-y-1">
              <ProfessionalButton
                onClick={() => handleNavigation('/account')}
                variant="ghost"
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-3" />
                Account
              </ProfessionalButton>
              <ProfessionalButton
                onClick={() => handleNavigation('/settings')}
                variant="ghost"
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </ProfessionalButton>
              <ProfessionalButton
                onClick={() => handleNavigation('/help')}
                variant="ghost"
                className="w-full justify-start"
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help
              </ProfessionalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

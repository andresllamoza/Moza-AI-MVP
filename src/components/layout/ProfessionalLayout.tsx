import React from 'react';
import { cn } from '@/lib/utils';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalInput } from '@/components/ui/professional-input';
import { ProfessionalNavigation } from '@/components/ui/professional-navigation';
import { 
  Brain, 
  Search, 
  Bell, 
  Settings, 
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useState } from 'react';

interface ProfessionalLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  navigationItems?: Array<{
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: string | number;
  }>;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

const ProfessionalLayout: React.FC<ProfessionalLayoutProps> = ({
  children,
  title = "Moza Intelligence Pro",
  subtitle = "Dual Intelligence: Internal + External",
  showSearch = true,
  showNotifications = true,
  showSettings = true,
  navigationItems = [],
  onSearch,
  onNotificationClick,
  onSettingsClick,
  className
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={cn("min-h-screen bg-neutral-50", isDarkMode && "dark", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">{title}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {navigationItems.length > 0 && (
              <nav className="hidden lg:flex items-center space-x-1">
                <ProfessionalNavigation
                  items={navigationItems}
                  variant="horizontal"
                  size="sm"
                />
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              {showSearch && (
                <form onSubmit={handleSearch} className="hidden sm:block">
                  <ProfessionalInput
                    placeholder="Search intelligence insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 lg:w-80"
                    leftIcon={<Search className="w-4 h-4" />}
                  />
                </form>
              )}

              {/* Dark Mode Toggle */}
              <ProfessionalButton
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hidden sm:flex"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </ProfessionalButton>

              {/* Notifications */}
              {showNotifications && (
                <ProfessionalButton
                  variant="ghost"
                  size="icon"
                  onClick={onNotificationClick}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </ProfessionalButton>
              )}

              {/* Settings */}
              {showSettings && (
                <ProfessionalButton
                  variant="ghost"
                  size="icon"
                  onClick={onSettingsClick}
                >
                  <Settings className="w-5 h-5" />
                </ProfessionalButton>
              )}

              {/* Mobile Menu Button */}
              <ProfessionalButton
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </ProfessionalButton>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="sm:hidden pb-4">
              <form onSubmit={handleSearch}>
                <ProfessionalInput
                  placeholder="Search intelligence insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && navigationItems.length > 0 && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <div className="px-4 py-4">
              <ProfessionalNavigation
                items={navigationItems}
                variant="vertical"
                size="default"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">Moza Intelligence Pro</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Revolutionary dual intelligence platform combining internal customer data 
                with external competitive intelligence to drive revenue growth and market dominance.
              </p>
              <div className="flex space-x-4">
                <ProfessionalButton variant="ghost" size="sm">
                  Privacy Policy
                </ProfessionalButton>
                <ProfessionalButton variant="ghost" size="sm">
                  Terms of Service
                </ProfessionalButton>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Dashboard</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Competitive Intelligence</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Market Opportunities</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Strategic Insights</ProfessionalButton></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Documentation</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">API Reference</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Contact Support</ProfessionalButton></li>
                <li><ProfessionalButton variant="ghost" size="sm" className="justify-start p-0 h-auto">Status Page</ProfessionalButton></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2024 Moza Intelligence Pro. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-sm text-muted-foreground">Version 2.0.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-sm text-success-600">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalLayout;

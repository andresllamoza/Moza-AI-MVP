import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Bell, 
  Settings, 
  Menu,
  X,
  Sun,
  Moon,
  Brain,
  HelpCircle,
  User
} from 'lucide-react';
import { useState } from 'react';

interface EnterpriseLayoutProps {
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

const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({
  children,
  title = "Moza Intelligence",
  subtitle = "Enterprise AI Platform",
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
    <div className={cn("min-h-screen bg-background", isDarkMode && "dark", className)}>
      {/* Top Navigation Bar - Enterprise Style */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-elegant">
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            {navigationItems.length > 0 && (
              <nav className="hidden lg:flex items-center space-x-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className="h-10 px-4 text-sm font-medium hover:bg-muted/80 transition-all duration-200"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                ))}
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              {showSearch && (
                <div className="hidden md:flex relative">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-80 pl-10 h-10 bg-input border-border focus:ring-ring/20 rounded-2xl"
                      />
                    </div>
                  </form>
                </div>
              )}

              {/* Help */}
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-muted/80"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-10 h-10 p-0 hover:bg-muted/80"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Notifications */}
              {showNotifications && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNotificationClick}
                  className="relative w-10 h-10 p-0 hover:bg-muted/80"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>
              )}

              {/* Settings */}
              {showSettings && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSettingsClick}
                  className="w-10 h-10 p-0 hover:bg-muted/80"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              )}

              {/* Profile */}
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-muted/80 rounded-full"
              >
                <User className="w-5 h-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 p-0"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 h-10 bg-input border-border focus:ring-ring/20 rounded-2xl"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && navigationItems.length > 0 && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-12 px-4 hover:bg-muted/80"
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-subtle">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Moza Intelligence</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Enterprise-grade AI platform that combines internal customer data 
                with external competitive intelligence to drive revenue growth.
              </p>
              <div className="flex space-x-6">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Button>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Platform</h3>
              <ul className="space-y-3">
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Dashboard</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Analytics</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Intelligence</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Reports</Button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Support</h3>
              <ul className="space-y-3">
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Documentation</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">API Reference</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Contact Support</Button></li>
                <li><Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground">Status</Button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2024 Moza Intelligence. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                <span className="text-sm text-muted-foreground">Version 2.0.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-success font-medium">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseLayout;
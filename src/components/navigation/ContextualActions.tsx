import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Plus,
  Star,
  Clock,
  TrendingUp,
  AlertTriangle,
  Download,
  Share2,
  Settings,
  HelpCircle,
  Zap,
  Target,
  BarChart3,
  Users,
  FileText,
  Lightbulb,
  Building2
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { useNavigationStore } from '@/store/navigationStore';

interface ContextualAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: 'primary' | 'secondary' | 'utility';
  shortcut?: string;
  isNew?: boolean;
}

interface ContextualActionsProps {
  className?: string;
}

export const ContextualActions: React.FC<ContextualActionsProps> = ({ className = '' }) => {
  const location = useLocation();
  const { recentPages, favorites, activeSection } = useNavigationStore();
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Generate contextual actions based on current page
  const getContextualActions = (): ContextualAction[] => {
    const actions: ContextualAction[] = [];

    // Common actions for all pages
    actions.push({
      id: 'new-analysis',
      label: 'New Analysis',
      description: 'Start a new business intelligence analysis',
      icon: Plus,
      action: () => window.location.href = '/',
      category: 'primary',
      shortcut: 'Ctrl+N',
      isNew: true
    });

    actions.push({
      id: 'search',
      label: 'Search',
      description: 'Find businesses, competitors, or insights',
      icon: Target,
      action: () => {
        // Trigger search modal
        const searchButton = document.querySelector('[data-search-trigger]') as HTMLButtonElement;
        if (searchButton) searchButton.click();
      },
      category: 'primary',
      shortcut: 'Ctrl+K'
    });

    // Page-specific actions
    if (location.pathname === '/dashboard') {
      actions.push({
        id: 'view-reports',
        label: 'View Reports',
        description: 'Browse all intelligence reports',
        icon: FileText,
        action: () => window.location.href = '/reports',
        category: 'secondary'
      });

      actions.push({
        id: 'insights',
        label: 'View Insights',
        description: 'See AI-powered business insights',
        icon: Lightbulb,
        action: () => window.location.href = '/insights',
        category: 'secondary'
      });

      actions.push({
        id: 'export-data',
        label: 'Export Data',
        description: 'Download current dashboard data',
        icon: Download,
        action: () => console.log('Exporting data...'),
        category: 'utility'
      });
    }

    if (location.pathname.startsWith('/reports')) {
      actions.push({
        id: 'create-report',
        label: 'Create Report',
        description: 'Generate a new intelligence report',
        icon: Plus,
        action: () => console.log('Creating report...'),
        category: 'primary'
      });

      actions.push({
        id: 'share-report',
        label: 'Share Report',
        description: 'Share current report with team',
        icon: Share2,
        action: () => console.log('Sharing report...'),
        category: 'secondary'
      });
    }

    if (location.pathname.startsWith('/insights')) {
      actions.push({
        id: 'set-alert',
        label: 'Set Alert',
        description: 'Get notified about new insights',
        icon: AlertTriangle,
        action: () => console.log('Setting alert...'),
        category: 'secondary'
      });

      actions.push({
        id: 'schedule-report',
        label: 'Schedule Report',
        description: 'Automate regular insight delivery',
        icon: Clock,
        action: () => console.log('Scheduling report...'),
        category: 'secondary'
      });
    }

    // Recent pages quick access
    if (recentPages.length > 0) {
      recentPages.slice(0, 3).forEach((page, index) => {
        const pageName = page === '/' ? 'Home' : page.charAt(1).toUpperCase() + page.slice(2);
        actions.push({
          id: `recent-${index}`,
          label: `Back to ${pageName}`,
          description: `Return to ${pageName}`,
          icon: Clock,
          action: () => window.location.href = page,
          category: 'utility'
        });
      });
    }

    // Favorites quick access
    if (favorites.length > 0) {
      favorites.slice(0, 2).forEach((page, index) => {
        const pageName = page === '/' ? 'Home' : page.charAt(1).toUpperCase() + page.slice(2);
        actions.push({
          id: `favorite-${index}`,
          label: pageName,
          description: `Favorite: ${pageName}`,
          icon: Star,
          action: () => window.location.href = page,
          category: 'utility'
        });
      });
    }

    return actions;
  };

  const actions = getContextualActions();
  const primaryActions = actions.filter(a => a.category === 'primary');
  const secondaryActions = actions.filter(a => a.category === 'secondary');
  const utilityActions = actions.filter(a => a.category === 'utility');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            const newAnalysisAction = actions.find(a => a.id === 'new-analysis');
            if (newAnalysisAction) newAnalysisAction.action();
            break;
          case 'k':
            e.preventDefault();
            const searchAction = actions.find(a => a.id === 'search');
            if (searchAction) searchAction.action();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);

  if (actions.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Primary Actions */}
      {primaryActions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {primaryActions.map((action) => (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProfessionalButton
                  onClick={action.action}
                  className="w-full justify-start h-auto p-3 btn-vibrant-primary"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="p-2 rounded-lg bg-primary-500/20">
                      <action.icon className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{action.label}</span>
                        {action.isNew && (
                          <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {action.shortcut && (
                          <kbd className="text-xs bg-dark-700 px-2 py-1 rounded">
                            {action.shortcut}
                          </kbd>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </ProfessionalButton>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Secondary Actions */}
      {secondaryActions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Page Actions
          </h3>
          <div className="space-y-1">
            {secondaryActions.map((action) => (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProfessionalButton
                  onClick={action.action}
                  variant="outline"
                  className="w-full justify-start h-auto p-3 btn-vibrant-secondary"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <action.icon className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 text-left">
                      <span className="font-medium">{action.label}</span>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </ProfessionalButton>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Utility Actions */}
      {utilityActions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Quick Access
          </h3>
          <div className="space-y-1">
            {utilityActions.map((action) => (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProfessionalButton
                  onClick={action.action}
                  variant="ghost"
                  className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-white"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <action.icon className="w-4 h-4" />
                    <div className="flex-1 text-left">
                      <span className="text-sm">{action.label}</span>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </ProfessionalButton>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="pt-4 border-t border-dark-700">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center justify-between">
            <span>New Analysis</span>
            <kbd className="px-2 py-1 bg-dark-700 rounded text-xs">Ctrl+N</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>Search</span>
            <kbd className="px-2 py-1 bg-dark-700 rounded text-xs">Ctrl+K</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>Close Modal</span>
            <kbd className="px-2 py-1 bg-dark-700 rounded text-xs">Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

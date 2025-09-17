import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Plus,
  X,
  Search,
  FileText,
  Lightbulb,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';

interface FloatingActionButtonProps {
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getPrimaryAction = () => {
    if (location.pathname === '/') {
      return {
        icon: Search,
        label: 'Search',
        action: () => {
          const searchButton = document.querySelector('[data-search-trigger]') as HTMLButtonElement;
          if (searchButton) searchButton.click();
        }
      };
    }
    
    if (location.pathname.startsWith('/dashboard')) {
      return {
        icon: FileText,
        label: 'New Report',
        action: () => window.location.href = '/reports'
      };
    }
    
    if (location.pathname.startsWith('/reports')) {
      return {
        icon: Plus,
        label: 'Create Report',
        action: () => console.log('Creating report...')
      };
    }
    
    if (location.pathname.startsWith('/insights')) {
      return {
        icon: Lightbulb,
        label: 'New Insight',
        action: () => console.log('Creating insight...')
      };
    }
    
    return {
      icon: Plus,
      label: 'New Analysis',
      action: () => window.location.href = '/'
    };
  };

  const primaryAction = getPrimaryAction();

  const secondaryActions = [
    {
      icon: Search,
      label: 'Search',
      action: () => {
        const searchButton = document.querySelector('[data-search-trigger]') as HTMLButtonElement;
        if (searchButton) searchButton.click();
      }
    },
    {
      icon: BarChart3,
      label: 'Dashboard',
      action: () => window.location.href = '/dashboard'
    },
    {
      icon: FileText,
      label: 'Reports',
      action: () => window.location.href = '/reports'
    },
    {
      icon: Lightbulb,
      label: 'Insights',
      action: () => window.location.href = '/insights'
    }
  ];

  return (
    <div className={`fixed bottom-20 right-4 z-40 lg:hidden ${className}`}>
      {/* Secondary Actions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 space-y-2"
          >
            {secondaryActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProfessionalButton
                  onClick={action.action}
                  className="w-12 h-12 rounded-full btn-vibrant-secondary shadow-lg"
                >
                  <action.icon className="w-5 h-5" />
                </ProfessionalButton>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Action Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ProfessionalButton
          onClick={() => {
            if (isOpen) {
              primaryAction.action();
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={`w-14 h-14 rounded-full shadow-2xl ${
            isOpen ? 'btn-vibrant-primary' : 'btn-vibrant-primary'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <primaryAction.icon className="w-6 h-6" />}
          </motion.div>
        </ProfessionalButton>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

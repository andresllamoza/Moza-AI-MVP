import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  Lightbulb,
  MoreHorizontal,
  LayoutDashboard,
  Plug
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { useNavigationStore } from '@/store/navigationStore';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setActiveSection } = useNavigationStore();

  const navItems = [
    { 
      label: 'Home', 
      path: '/', 
      icon: Home, 
      section: 'home' 
    },
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      section: 'dashboard' 
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: FileText, 
      section: 'reports' 
    },
    { 
      label: 'Insights', 
      path: '/insights', 
      icon: Lightbulb, 
      section: 'insights' 
    },
    { 
      label: 'More', 
      path: '/more', 
      icon: MoreHorizontal, 
      section: 'more' 
    },
  ];

  const handleNavigation = (path: string, section: string) => {
    navigate(path);
    setActiveSection(section);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md border-t border-dark-700 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProfessionalButton
                onClick={() => handleNavigation(item.path, item.section)}
                variant="ghost"
                size="sm"
                className={`w-full flex flex-col items-center space-y-1 py-2 px-1 ${
                  active
                    ? 'text-primary-400'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                <motion.div
                  animate={{ scale: active ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
                
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-400 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </ProfessionalButton>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

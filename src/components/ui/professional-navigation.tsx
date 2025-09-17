import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navigationVariants = cva(
  'flex items-center space-x-1 transition-all duration-200',
  {
    variants: {
      variant: {
        horizontal: 'flex-row space-x-1',
        vertical: 'flex-col space-y-1',
        tabs: 'flex-row space-x-0 border-b border-neutral-200',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'horizontal',
      size: 'default',
    },
  }
);

const navigationItemVariants = cva(
  'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
        active: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
        ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        intelligence: 'text-intelligence-700 hover:bg-intelligence-100 hover:text-intelligence-900',
        success: 'text-success-700 hover:bg-success-100 hover:text-success-900',
        warning: 'text-warning-700 hover:bg-warning-100 hover:text-warning-900',
        error: 'text-error-700 hover:bg-error-100 hover:text-error-900',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  variant?: 'default' | 'active' | 'ghost' | 'intelligence' | 'success' | 'warning' | 'error';
}

export interface ProfessionalNavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  showIcons?: boolean;
  showBadges?: boolean;
}

const ProfessionalNavigation = React.forwardRef<HTMLElement, ProfessionalNavigationProps>(
  ({ 
    className, 
    variant, 
    size, 
    items, 
    activeItem, 
    onItemClick, 
    showIcons = true,
    showBadges = true,
    ...props 
  }, ref) => {
    const location = useLocation();

    return (
      <nav
        ref={ref}
        className={cn(navigationVariants({ variant, size, className }))}
        {...props}
      >
        {items.map((item) => {
          const isActive = activeItem === item.id || location.pathname === item.href;
          const itemVariant = isActive ? 'active' : item.variant || 'default';

          return (
            <Link
              key={item.id}
              to={item.disabled ? '#' : item.href}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }
                onItemClick?.(item);
              }}
              className={cn(
                navigationItemVariants({ variant: itemVariant, size }),
                item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              {showIcons && item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span className="flex-1">{item.label}</span>
              {showBadges && item.badge && (
                <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    );
  }
);

ProfessionalNavigation.displayName = 'ProfessionalNavigation';

// Tab Navigation Component
export interface ProfessionalTabsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: NavigationItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  size?: 'sm' | 'default' | 'lg';
}

const ProfessionalTabs = React.forwardRef<HTMLDivElement, ProfessionalTabsProps>(
  ({ className, items, activeTab, onTabChange, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        <nav className="flex space-x-0 border-b border-neutral-200">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex items-center space-x-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                activeTab === item.id
                  ? 'border-primary-500 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900',
                size === 'sm' && 'px-3 py-2 text-xs',
                size === 'lg' && 'px-6 py-4 text-base'
              )}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    );
  }
);

ProfessionalTabs.displayName = 'ProfessionalTabs';

export { ProfessionalNavigation, ProfessionalTabs, navigationVariants, navigationItemVariants };

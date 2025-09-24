import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: LucideIcon;
  iconColor?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  trend?: {
    data: number[];
    type: 'line' | 'bar';
  };
}

const iconColorClasses = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

const changeColorClasses = {
  increase: 'text-success',
  decrease: 'text-error',
  neutral: 'text-muted-foreground',
};

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'primary',
  className,
  onClick,
  loading = false,
  trend,
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    return val;
  };

  const formatChange = (changeValue: number) => {
    const sign = changeValue > 0 ? '+' : '';
    return `${sign}${changeValue.toFixed(1)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'glass-card rounded-xl p-6 cursor-pointer relative overflow-hidden',
        'hover:shadow-xl hover:shadow-primary/10',
        'transition-all duration-300 ease-out',
        onClick && 'hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className={cn(
                  'p-2 rounded-lg bg-primary/10',
                  iconColorClasses[iconColor]
                )}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            )}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          {change && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                'flex items-center space-x-1 text-sm font-medium',
                changeColorClasses[change.type]
              )}
            >
              <span>{formatChange(change.value)}</span>
              {change.period && (
                <span className="text-xs text-muted-foreground">
                  {change.period}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          {loading ? (
            <div className="h-8 bg-muted animate-pulse rounded-lg" />
          ) : (
            <div className="text-3xl font-bold text-foreground">
              {formatValue(value)}
            </div>
          )}
        </motion.div>

        {/* Trend Indicator */}
        {trend && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-8 flex items-end space-x-1"
          >
            {trend.data.slice(-7).map((point, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((point / Math.max(...trend.data)) * 100, 10)}%` }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                className={cn(
                  'w-1 rounded-full',
                  trend.type === 'line' ? 'bg-primary' : 'bg-primary/60'
                )}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
    </motion.div>
  );
};

// Variant for compact cards
export const CompactGlassmorphismCard: React.FC<Omit<GlassmorphismCardProps, 'trend'> & {
  subtitle?: string;
}> = ({ title, value, change, icon: Icon, iconColor = 'primary', subtitle, className, onClick, loading = false }) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    return val;
  };

  const formatChange = (changeValue: number) => {
    const sign = changeValue > 0 ? '+' : '';
    return `${sign}${changeValue.toFixed(1)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        'glass-card rounded-lg p-4 cursor-pointer relative overflow-hidden',
        'hover:shadow-lg hover:shadow-primary/5',
        'transition-all duration-300 ease-out',
        onClick && 'hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={cn(
              'p-2 rounded-md bg-primary/10',
              iconColorClasses[iconColor]
            )}>
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
            {subtitle && (
              <p className="text-xs text-muted-foreground/70">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          {loading ? (
            <div className="h-5 w-16 bg-muted animate-pulse rounded" />
          ) : (
            <div className="text-lg font-semibold text-foreground">
              {formatValue(value)}
            </div>
          )}
          
          {change && !loading && (
            <div className={cn(
              'text-xs font-medium',
              changeColorClasses[change.type]
            )}>
              {formatChange(change.value)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

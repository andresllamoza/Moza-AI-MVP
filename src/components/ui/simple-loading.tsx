// Simplified enterprise loading component
import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleLoadingProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const SimpleLoading: React.FC<SimpleLoadingProps> = ({ 
  className, 
  size = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-muted border-t-primary",
        sizeClasses[size]
      )} />
    </div>
  );
};

export default SimpleLoading;
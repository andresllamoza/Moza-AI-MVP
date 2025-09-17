import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loadingVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        spinner: 'animate-spin',
        dots: 'space-x-1',
        pulse: 'animate-pulse',
        shimmer: 'animate-shimmer',
        bounce: 'animate-bounce',
      },
      size: {
        sm: 'w-4 h-4',
        default: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
      color: {
        primary: 'text-primary-600',
        secondary: 'text-secondary-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        error: 'text-error-600',
        neutral: 'text-neutral-600',
      },
    },
    defaultVariants: {
      variant: 'spinner',
      size: 'default',
      color: 'primary',
    },
  }
);

export interface EnterpriseLoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string;
  fullScreen?: boolean;
}

const EnterpriseLoading: React.FC<EnterpriseLoadingProps> = ({
  className,
  variant,
  size,
  color,
  text,
  fullScreen = false,
  ...props
}) => {
  const SpinnerIcon = () => (
    <svg
      className={cn(loadingVariants({ variant: 'spinner', size, color }))}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const DotsIcon = () => (
    <div className={cn(loadingVariants({ variant: 'dots', size, color }))}>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );

  const PulseIcon = () => (
    <div className={cn(loadingVariants({ variant: 'pulse', size, color }))}>
      <div className="w-full h-full bg-current rounded-full opacity-75" />
    </div>
  );

  const ShimmerIcon = () => (
    <div className={cn(loadingVariants({ variant: 'shimmer', size, color }))}>
      <div className="w-full h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 rounded" />
    </div>
  );

  const BounceIcon = () => (
    <div className={cn(loadingVariants({ variant: 'bounce', size, color }))}>
      <div className="w-full h-full bg-current rounded-full" />
    </div>
  );

  const renderLoadingIcon = () => {
    switch (variant) {
      case 'dots':
        return <DotsIcon />;
      case 'pulse':
        return <PulseIcon />;
      case 'shimmer':
        return <ShimmerIcon />;
      case 'bounce':
        return <BounceIcon />;
      default:
        return <SpinnerIcon />;
    }
  };

  const content = (
    <div className={cn('flex flex-col items-center space-y-3', className)} {...props}>
      {renderLoadingIcon()}
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-card p-8 rounded-xl shadow-lg border">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// Skeleton Loading Components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse', className)}>
    <div className="bg-neutral-200 rounded-lg h-4 w-3/4 mb-2" />
    <div className="bg-neutral-200 rounded-lg h-3 w-1/2 mb-4" />
    <div className="space-y-2">
      <div className="bg-neutral-200 rounded-lg h-3 w-full" />
      <div className="bg-neutral-200 rounded-lg h-3 w-5/6" />
      <div className="bg-neutral-200 rounded-lg h-3 w-4/6" />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={cn('animate-pulse space-y-4', className)}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="bg-neutral-200 rounded-lg h-4" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="bg-neutral-200 rounded-lg h-3" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonChart: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse space-y-4', className)}>
    <div className="bg-neutral-200 rounded-lg h-4 w-1/3" />
    <div className="h-64 bg-neutral-200 rounded-lg" />
    <div className="flex justify-between">
      <div className="bg-neutral-200 rounded-lg h-3 w-16" />
      <div className="bg-neutral-200 rounded-lg h-3 w-16" />
      <div className="bg-neutral-200 rounded-lg h-3 w-16" />
    </div>
  </div>
);

// Progress Indicators
export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'default' | 'lg';
}> = ({ value, max = 100, className, showLabel = true, size = 'default' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-neutral-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Loading States for Different Components
export const LoadingButton: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ loading, children, className }) => (
  <button
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200',
      'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    disabled={loading}
  >
    {loading && <EnterpriseLoading size="sm" className="mr-2" />}
    {children}
  </button>
);

export const LoadingCard: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ loading, children, className }) => (
  <div className={cn('relative', className)}>
    {loading && (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
        <EnterpriseLoading text="Loading..." />
      </div>
    )}
    {children}
  </div>
);

export { EnterpriseLoading, loadingVariants };

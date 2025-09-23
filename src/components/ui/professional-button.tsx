import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:from-blue-700 hover:to-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm border border-blue-600',
        secondary: 'bg-secondary-100 text-secondary-900 border border-secondary-200 hover:bg-secondary-200 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0',
        outline: 'border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0',
        ghost: 'text-slate-400 hover:bg-slate-700 hover:text-white',
        destructive: 'bg-error-500 text-white shadow-sm hover:bg-error-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        success: 'bg-success-500 text-white shadow-sm hover:bg-success-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        warning: 'bg-warning-500 text-white shadow-sm hover:bg-warning-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        intelligence: 'bg-gradient-to-r from-intelligence-600 to-intelligence-700 text-white shadow-sm hover:from-intelligence-700 hover:to-intelligence-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ProfessionalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ProfessionalButton = React.forwardRef<HTMLButtonElement, ProfessionalButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
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
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

ProfessionalButton.displayName = 'ProfessionalButton';

export { ProfessionalButton, buttonVariants };

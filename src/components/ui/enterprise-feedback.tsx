import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X, 
  Loader2 
} from 'lucide-react';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-white text-neutral-950',
        success: 'border-success-200 bg-success-50 text-success-900',
        warning: 'border-warning-200 bg-warning-50 text-warning-900',
        error: 'border-error-200 bg-error-50 text-error-900',
        info: 'border-primary-200 bg-primary-50 text-primary-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconVariants = cva(
  'h-6 w-6 flex-shrink-0',
  {
    variants: {
      variant: {
        default: 'text-neutral-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        error: 'text-error-600',
        info: 'text-primary-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  loading?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  className,
  variant,
  title,
  description,
  action,
  onClose,
  duration = 5000,
  loading = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    if (loading) {
      return <Loader2 className={cn(iconVariants({ variant }), 'animate-spin')} />;
    }

    switch (variant) {
      case 'success':
        return <CheckCircle2 className={iconVariants({ variant })} />;
      case 'warning':
        return <AlertTriangle className={iconVariants({ variant })} />;
      case 'error':
        return <AlertCircle className={iconVariants({ variant })} />;
      case 'info':
        return <Info className={iconVariants({ variant })} />;
      default:
        return <Info className={iconVariants({ variant })} />;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        'animate-slide-in-down',
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-sm font-semibold">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {action && (
            <div className="mt-2">{action}</div>
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Toast Container
export const ToastContainer: React.FC<{
  toasts: Array<ToastProps & { id: string }>;
  onRemove: (id: string) => void;
  className?: string;
}> = ({ toasts, onRemove, className }) => (
  <div className={cn('fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full', className)}>
    {toasts.map((toast) => (
      <Toast
        key={toast.id}
        {...toast}
        onClose={() => onRemove(toast.id)}
      />
    ))}
  </div>
);

// Alert Component
export const Alert: React.FC<{
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  closable?: boolean;
  onClose?: () => void;
}> = ({ variant, title, description, action, className, closable, onClose }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary-600" />;
      default:
        return <Info className="h-5 w-5 text-neutral-600" />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'border-success-200 bg-success-50 text-success-900';
      case 'warning':
        return 'border-warning-200 bg-warning-50 text-warning-900';
      case 'error':
        return 'border-error-200 bg-error-50 text-error-900';
      case 'info':
        return 'border-primary-200 bg-primary-50 text-primary-900';
      default:
        return 'border-neutral-200 bg-neutral-50 text-neutral-900';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        getVariantClasses(),
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-sm font-semibold">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {action && (
            <div className="mt-2">{action}</div>
          )}
        </div>
        {closable && onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Form Validation Feedback
export const FormField: React.FC<{
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, error, success, warning, helperText, required, children, className }) => {
  const getStatusIcon = () => {
    if (error) {
      return <AlertCircle className="h-4 w-4 text-error-600" />;
    }
    if (success) {
      return <CheckCircle2 className="h-4 w-4 text-success-600" />;
    }
    if (warning) {
      return <AlertTriangle className="h-4 w-4 text-warning-600" />;
    }
    return null;
  };

  const getStatusText = () => {
    if (error) return error;
    if (success) return success;
    if (warning) return warning;
    return helperText;
  };

  const getStatusColor = () => {
    if (error) return 'text-error-600';
    if (success) return 'text-success-600';
    if (warning) return 'text-warning-600';
    return 'text-muted-foreground';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}
      {children}
      {(error || success || warning || helperText) && (
        <div className="flex items-center space-x-1 text-xs">
          {getStatusIcon()}
          <span className={getStatusColor()}>
            {getStatusText()}
          </span>
        </div>
      )}
    </div>
  );
};

// Status Indicator
export const StatusIndicator: React.FC<{
  status: 'online' | 'offline' | 'busy' | 'away' | 'loading';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}> = ({ status, size = 'default', className }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    default: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-success-500';
      case 'offline':
        return 'bg-neutral-400';
      case 'busy':
        return 'bg-error-500';
      case 'away':
        return 'bg-warning-500';
      case 'loading':
        return 'bg-primary-500 animate-pulse';
      default:
        return 'bg-neutral-400';
    }
  };

  return (
    <div
      className={cn(
        'rounded-full border-2 border-white shadow-sm',
        sizeClasses[size],
        getStatusColor(),
        className
      )}
    />
  );
};

// Progress Steps
export const ProgressSteps: React.FC<{
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    status: 'completed' | 'current' | 'upcoming';
  }>;
  className?: string;
}> = ({ steps, className }) => (
  <div className={cn('space-y-4', className)}>
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {step.status === 'completed' ? (
            <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          ) : step.status === 'current' ? (
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-neutral-600">{index + 1}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn(
            'text-sm font-medium',
            step.status === 'completed' ? 'text-success-900' :
            step.status === 'current' ? 'text-primary-900' :
            'text-neutral-500'
          )}>
            {step.title}
          </div>
          {step.description && (
            <div className="text-sm text-neutral-500 mt-1">
              {step.description}
            </div>
          )}
        </div>
        {index < steps.length - 1 && (
          <div className="absolute left-4 top-8 w-0.5 h-8 bg-neutral-200" />
        )}
      </div>
    ))}
  </div>
);

export { Toast, toastVariants, iconVariants };

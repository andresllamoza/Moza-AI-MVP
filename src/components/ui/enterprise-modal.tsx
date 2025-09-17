import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X, Loader2 } from 'lucide-react';
import { ProfessionalButton } from './professional-button';

const modalVariants = cva(
  'relative bg-card rounded-xl shadow-xl border border-border',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
      },
      variant: {
        default: 'bg-card',
        glass: 'bg-card/80 backdrop-blur-md border-white/20',
        elevated: 'bg-card shadow-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export interface EnterpriseModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  loading?: boolean;
  footer?: React.ReactNode;
  preventCloseOnOverlayClick?: boolean;
  preventCloseOnEscape?: boolean;
}

const EnterpriseModal: React.FC<EnterpriseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  variant,
  showCloseButton = true,
  loading = false,
  footer,
  preventCloseOnOverlayClick = false,
  preventCloseOnEscape = false,
  className,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventCloseOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, preventCloseOnEscape]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !preventCloseOnOverlayClick) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          modalVariants({ size, variant }),
          'relative z-10 w-full max-h-[90vh] overflow-hidden',
          'animate-scale-in',
          className
        )}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex-1">
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <ProfessionalButton
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-4"
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </ProfessionalButton>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Confirmation Modal
export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
}) => (
  <EnterpriseModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={description}
    size="sm"
    loading={loading}
    footer={
      <div className="flex space-x-3">
        <ProfessionalButton
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </ProfessionalButton>
        <ProfessionalButton
          variant={variant === 'destructive' ? 'destructive' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </ProfessionalButton>
      </div>
    }
  >
    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  </EnterpriseModal>
);

// Drawer Component
export const Drawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  size = 'default',
  className,
}) => {
  const sizeClasses = {
    sm: side === 'left' || side === 'right' ? 'w-80' : 'h-80',
    default: side === 'left' || side === 'right' ? 'w-96' : 'h-96',
    lg: side === 'left' || side === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: side === 'left' || side === 'right' ? 'w-[40rem]' : 'h-[40rem]',
  };

  const positionClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const animationClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        className={cn(
          'absolute bg-card border-border shadow-xl',
          positionClasses[side],
          sizeClasses[size],
          'transition-transform duration-300 ease-in-out',
          animationClasses[side],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <ProfessionalButton
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </ProfessionalButton>
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

// Popover Component
export const Popover: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  trigger: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
}> = ({
  isOpen,
  onClose,
  children,
  trigger,
  side = 'bottom',
  align = 'center',
  className,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 bg-card border border-border rounded-lg shadow-lg p-2';
    
    switch (side) {
      case 'top':
        return `${baseClasses} bottom-full mb-2`;
      case 'bottom':
        return `${baseClasses} top-full mt-2`;
      case 'left':
        return `${baseClasses} right-full mr-2`;
      case 'right':
        return `${baseClasses} left-full ml-2`;
      default:
        return `${baseClasses} top-full mt-2`;
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return side === 'top' || side === 'bottom' ? 'left-0' : 'top-0';
      case 'end':
        return side === 'top' || side === 'bottom' ? 'right-0' : 'bottom-0';
      default:
        return side === 'top' || side === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2';
    }
  };

  return (
    <div className="relative inline-block">
      <div ref={triggerRef}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            getPositionClasses(),
            getAlignClasses(),
            'animate-scale-in',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { EnterpriseModal, modalVariants };

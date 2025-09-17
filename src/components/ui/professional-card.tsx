import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-white hover:shadow-md hover:-translate-y-1',
        elevated: 'border-neutral-200 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1',
        glass: 'border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:shadow-lg hover:-translate-y-1',
        intelligence: 'border-primary-200 bg-gradient-to-br from-primary-50 to-intelligence-50 hover:shadow-lg hover:-translate-y-1',
        success: 'border-success-200 bg-gradient-to-br from-success-50 to-success-100 hover:shadow-lg hover:-translate-y-1',
        warning: 'border-warning-200 bg-gradient-to-br from-warning-50 to-warning-100 hover:shadow-lg hover:-translate-y-1',
        error: 'border-error-200 bg-gradient-to-br from-error-50 to-error-100 hover:shadow-lg hover:-translate-y-1',
        neutral: 'border-neutral-200 bg-neutral-50 hover:shadow-md hover:-translate-y-1',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      interactive: false,
    },
  }
);

export interface ProfessionalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const ProfessionalCard = React.forwardRef<HTMLDivElement, ProfessionalCardProps>(
  ({ className, variant, padding, interactive, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        {...props}
      />
    );
  }
);

ProfessionalCard.displayName = 'ProfessionalCard';

const ProfessionalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));

ProfessionalCardHeader.displayName = 'ProfessionalCardHeader';

const ProfessionalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-heading-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

ProfessionalCardTitle.displayName = 'ProfessionalCardTitle';

const ProfessionalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body-sm text-muted-foreground', className)}
    {...props}
  />
));

ProfessionalCardDescription.displayName = 'ProfessionalCardDescription';

const ProfessionalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));

ProfessionalCardContent.displayName = 'ProfessionalCardContent';

const ProfessionalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));

ProfessionalCardFooter.displayName = 'ProfessionalCardFooter';

export {
  ProfessionalCard,
  ProfessionalCardHeader,
  ProfessionalCardFooter,
  ProfessionalCardTitle,
  ProfessionalCardDescription,
  ProfessionalCardContent,
  cardVariants,
};

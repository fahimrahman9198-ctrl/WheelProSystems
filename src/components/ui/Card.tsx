import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col overflow-hidden rounded-2xl border bg-brand-jet transition-all duration-300 ease-out-expo",
  {
    variants: {
      variant: {
        default: "border-brand-graphite shadow-card hover:shadow-card-hover hover:-translate-y-1",
        elevated: "border-brand-graphite-light shadow-card-hover hover:shadow-red-glow/20 hover:-translate-y-1",
        outlined: "border-brand-ash/60 shadow-none hover:border-brand-ash",
        flat: "border-brand-graphite shadow-none",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  footerClassName?: string;
  bodyClassName?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      header,
      footer,
      headerClassName,
      footerClassName,
      bodyClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      >
        {header && (
          <div
            className={cn(
              "flex items-center justify-between border-b border-brand-graphite/60 pb-4 mb-4",
              padding === "none" && "px-6 pt-6",
              headerClassName
            )}
          >
            {header}
          </div>
        )}
        <div className={cn("flex-1", bodyClassName)}>{children}</div>
        {footer && (
          <div
            className={cn(
              "flex items-center justify-between border-t border-brand-graphite/60 pt-4 mt-4",
              padding === "none" && "px-6 pb-6",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1.5 pb-4 border-b border-brand-graphite/60",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-display-sm text-brand-white tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-brand-silver leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between pt-4 border-t border-brand-graphite/60",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
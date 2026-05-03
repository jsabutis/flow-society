import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-sand-soft)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-terracotta)] text-[var(--color-sand-soft)] hover:bg-[var(--color-terracotta-deep)]",
        secondary:
          "bg-[var(--color-pine)] text-[var(--color-sand-soft)] hover:bg-[var(--color-pine-soft)]",
        outline:
          "border border-[var(--color-pine)]/20 bg-transparent text-[var(--color-pine)] hover:bg-[var(--color-pine)]/5",
        ghost:
          "bg-transparent text-[var(--color-pine)] hover:bg-[var(--color-pine)]/5",
        link:
          "underline-offset-4 hover:underline text-[var(--color-terracotta)] bg-transparent",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

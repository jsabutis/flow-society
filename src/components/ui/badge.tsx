import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
        terracotta:
          "bg-[var(--color-terracotta)]/15 text-[var(--color-terracotta-deep)]",
        agave:
          "bg-[var(--color-agave)]/20 text-[var(--color-agave-deep)]",
        pine:
          "bg-[var(--color-pine)] text-[var(--color-sand-soft)]",
        outline:
          "border border-[var(--color-pine)]/20 text-[var(--color-pine)]",
        soldout:
          "bg-[var(--color-ink-muted)]/20 text-[var(--color-ink-soft)] line-through",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

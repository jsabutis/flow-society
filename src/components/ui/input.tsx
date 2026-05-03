import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-[var(--color-pine)]/15 bg-white px-3 py-2 text-sm text-[var(--color-pine)] placeholder:text-[var(--color-ink-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-sand-soft)]",
        "aria-[invalid=true]:border-[var(--color-terracotta)] aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-[var(--color-terracotta)]/60",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[88px] w-full rounded-md border border-[var(--color-pine)]/15 bg-white px-3 py-2 text-sm text-[var(--color-pine)] placeholder:text-[var(--color-ink-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-sand-soft)]",
        "aria-[invalid=true]:border-[var(--color-terracotta)] aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-[var(--color-terracotta)]/60",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { useT } from "./language-provider";

function Submit({ idleLabel, pendingLabel }: { idleLabel: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}

export function NewsletterForm() {
  const t = useT();
  const [state, formAction] = useActionState(subscribeNewsletter, {});

  if (state.ok) {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-8 text-[var(--color-agave-deep)] font-medium"
      >
        {t.newsletterForm.success}
      </p>
    );
  }

  const errorId = "newsletter-error";
  return (
    <form action={formAction} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="newsletter-email" className="sr-only">
        {t.newsletterForm.emailLabel}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={t.newsletterForm.emailPlaceholder}
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? errorId : undefined}
        className="flex-1 h-12 px-4 rounded-full border border-[var(--color-pine)]/20 bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-sand-soft)] aria-[invalid=true]:border-[var(--color-terracotta)]"
      />
      <Submit idleLabel={t.newsletterForm.submit} pendingLabel={t.newsletterForm.sending} />
      {state.error && (
        <p
          id={errorId}
          role="alert"
          className="sm:col-span-2 text-sm text-[var(--color-terracotta-deep)] w-full text-center sm:text-left"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}

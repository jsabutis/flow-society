"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";
import { setLocaleAction } from "@/app/actions/locale";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  variant?: "header" | "mobile";
};

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onSelect = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    startTransition(async () => {
      await setLocaleAction(next);
      router.refresh();
      setOpen(false);
    });
  };

  const currentFlag = LOCALE_LABELS[locale].flag;
  const currentLabel = LOCALE_LABELS[locale].native;

  const triggerClasses =
    variant === "mobile"
      ? "flex h-10 w-full items-center justify-between gap-2 rounded-full border border-[var(--color-pine)]/15 bg-white/60 px-4 text-sm text-[var(--color-pine)] hover:bg-white"
      : "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-pine)]/15 bg-white/70 hover:bg-white h-9 pl-2.5 pr-2 text-sm text-[var(--color-pine)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-sand-soft)]";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={t.header.changeLanguage}
        disabled={isPending}
        className={cn(triggerClasses, isPending && "opacity-60")}
      >
        <Globe className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)]" aria-hidden />
        <span aria-hidden className="text-base leading-none">
          {currentFlag}
        </span>
        <span className="font-medium">{locale.toUpperCase()}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
        {variant === "mobile" && (
          <span className="sr-only">{currentLabel}</span>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-52 overflow-hidden rounded-xl border border-[var(--color-pine)]/10 bg-white p-1.5 shadow-[0_12px_40px_-16px_rgba(31,51,41,0.35)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
        >
          <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            {t.header.languageLabel}
          </p>
          <ul role="listbox" aria-label={t.header.languageLabel}>
            {LOCALES.map((code) => {
              const meta = LOCALE_LABELS[code];
              const active = code === locale;
              return (
                <li key={code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => onSelect(code)}
                    disabled={isPending}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-[var(--color-sand)] text-[var(--color-pine)]"
                        : "text-[var(--color-pine)] hover:bg-[var(--color-sand)]",
                    )}
                  >
                    <span aria-hidden className="text-lg leading-none">
                      {meta.flag}
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium">{meta.native}</span>
                      <span className="block text-xs text-[var(--color-ink-muted)]">
                        {meta.english}
                      </span>
                    </span>
                    {active && (
                      <Check className="h-4 w-4 text-[var(--color-terracotta)]" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

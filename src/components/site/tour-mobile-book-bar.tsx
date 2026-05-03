"use client";

import { formatUsd } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useT, formatMessage } from "./language-provider";

type Props = {
  basePriceUsd: number;
  nextStartLabel: string | null;
  calendarSectionId: string;
};

export function TourMobileBookBar({
  basePriceUsd,
  nextStartLabel,
  calendarSectionId,
}: Props) {
  const t = useT();
  const scrollToCalendar = () => {
    const el = document.getElementById(calendarSectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-pine)]/15 bg-[var(--color-sand-soft)]/95 backdrop-blur-md px-4 py-3 safe-area-pb"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[var(--color-ink-muted)]">{t.tourMobileBar.from}</p>
          <p className="font-serif text-lg text-[var(--color-pine)] truncate">
            {formatUsd(basePriceUsd)}
            <span className="text-xs font-sans text-[var(--color-ink-muted)]">
              {" "}{t.tourMobileBar.perRider}
            </span>
          </p>
          {nextStartLabel && (
            <p className="text-xs text-[var(--color-ink-soft)] truncate mt-0.5">
              {formatMessage(t.tourMobileBar.next, { label: nextStartLabel })}
            </p>
          )}
        </div>
        <Button type="button" size="lg" className="shrink-0" onClick={scrollToCalendar}>
          {t.tourMobileBar.checkDates}
        </Button>
      </div>
    </div>
  );
}

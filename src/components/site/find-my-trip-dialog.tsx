"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMessage, useT } from "./language-provider";

type Step = 0 | 1 | 2;

export function FindMyTripDialog({ children }: { children: React.ReactNode }) {
  const t = useT();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>(0);
  const [days, setDays] = React.useState<string>("2-3");
  const [level, setLevel] = React.useState<string>("INTERMEDIATE");
  const [bike, setBike] = React.useState<string>("both");

  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => {
    setOpen(false);
    setStep(0);
  }, []);

  // Modal lifecycle: ESC closes (WCAG 2.1.2), body-scroll lock, initial
  // focus on the close button, and return focus to the trigger on close
  // (WCAG 4.1.2 / focus management).
  React.useEffect(() => {
    if (!open) return;
    // Capture the trigger element now so the cleanup closure doesn't
    // read a ref value that may have changed by tear-down time.
    const triggerEl = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      const focusable = triggerEl?.querySelector<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    };
  }, [open, close]);

  const finish = () => {
    const params = new URLSearchParams();
    params.set("days", days);
    params.set("level", level);
    if (bike !== "both") params.set("bike", bike);
    router.push(`/tours?${params.toString()}`);
    close();
  };

  const DAYS = [
    { id: "1", label: t.findMyTrip.daysOptions.oneDay, param: "1" },
    { id: "2-3", label: t.findMyTrip.daysOptions.twoThreeDays, param: "2-3" },
    { id: "4", label: t.findMyTrip.daysOptions.fourPlusDays, param: "4" },
  ] as const;

  const LEVELS = [
    { id: "BEGINNER", label: t.findMyTrip.levelOptions.beginnerMixed },
    { id: "INTERMEDIATE", label: t.findMyTrip.levelOptions.intermediate },
    { id: "ADVANCED", label: t.findMyTrip.levelOptions.advanced },
  ] as const;

  const BIKES = [
    { id: "both", label: t.findMyTrip.bikeOptions.either },
    { id: "mtb", label: t.findMyTrip.bikeOptions.analogMtb },
    { id: "emtb", label: t.findMyTrip.bikeOptions.emtb },
  ] as const;

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="contents cursor-pointer"
      >
        {children}
      </span>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="find-trip-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--color-sand-soft)] text-[var(--color-pine)] shadow-2xl border border-[var(--color-pine)]/10 p-6 sm:p-8">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--color-sand)]"
              aria-label={t.findMyTrip.closeLabel}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {formatMessage(t.findMyTrip.stepLabel, {
                current: step + 1,
                total: 3,
              })}
            </p>
            <h2 id="find-trip-title" className="font-serif text-2xl mt-2">
              {step === 0 && t.findMyTrip.step1Title}
              {step === 1 && t.findMyTrip.step2Title}
              {step === 2 && t.findMyTrip.step3Title}
            </h2>

            {step === 0 && (
              <div className="mt-6 grid gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDays(d.param)}
                    className={`text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                      days === d.param
                        ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10"
                        : "border-[var(--color-pine)]/15 hover:border-[var(--color-pine)]/30"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="mt-6 grid gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLevel(l.id)}
                    className={`text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                      level === l.id
                        ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10"
                        : "border-[var(--color-pine)]/15 hover:border-[var(--color-pine)]/30"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="mt-6 grid gap-2">
                {BIKES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBike(b.id)}
                    className={`text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                      bike === b.id
                        ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10"
                        : "border-[var(--color-pine)]/15 hover:border-[var(--color-pine)]/30"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => (step > 0 ? setStep((s) => (s - 1) as Step) : close())}
              >
                {step === 0 ? t.findMyTrip.cancel : t.findMyTrip.back}
              </Button>
              {step < 2 ? (
                <Button type="button" onClick={() => setStep((s) => (s + 1) as Step)}>
                  {t.findMyTrip.next}
                </Button>
              ) : (
                <Button type="button" onClick={finish}>
                  {t.findMyTrip.seeMatching}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

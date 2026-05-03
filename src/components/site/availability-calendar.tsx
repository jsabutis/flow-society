"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateRange, formatUsd } from "@/lib/utils";
import type { DepartureAvailability } from "@/lib/types";
import Link from "next/link";

type Props = {
  tourSlug: string;
  basePriceUsd: number;
  departures: DepartureAvailability[];
  onSelect?: (departureId: string) => void;
  selectedDepartureId?: string;
};

export function AvailabilityCalendar({
  tourSlug,
  basePriceUsd,
  departures,
  onSelect,
  selectedDepartureId,
}: Props) {
  // Build day-level metadata for the picker
  const dayInfo = React.useMemo(() => {
    const map = new Map<string, DepartureAvailability>();
    for (const dep of departures) {
      const start = stripTime(new Date(dep.startDate));
      const end = stripTime(new Date(dep.endDate));
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        map.set(d.toISOString().slice(0, 10), dep);
      }
    }
    return map;
  }, [departures]);

  const isDayDisabled = (day: Date) => {
    const key = day.toISOString().slice(0, 10);
    const dep = dayInfo.get(key);
    if (!dep) return true; // not part of any departure
    if (dep.status === "SOLD_OUT" || dep.status === "BLOCKED") return true;
    return false;
  };

  const modifiers = {
    open: (day: Date) => dayInfo.get(day.toISOString().slice(0, 10))?.status === "OPEN",
    filling: (day: Date) =>
      dayInfo.get(day.toISOString().slice(0, 10))?.status === "FILLING",
    soldOut: (day: Date) =>
      dayInfo.get(day.toISOString().slice(0, 10))?.status === "SOLD_OUT",
  };

  // RGBA values mirror the agave (122,140,74), terracotta (168,69,31),
  // and ink-muted (99,99,99) tokens in globals.css. Day-cell text is set
  // to a darker token (terracotta-deep / pine) so each state still passes
  // WCAG AA contrast against the day's tinted background on the white
  // calendar surface.
  const modifiersStyles: Record<string, React.CSSProperties> = {
    open: {
      backgroundColor: "rgba(122, 140, 74, 0.18)",
      color: "var(--color-pine)",
    },
    filling: {
      backgroundColor: "rgba(168, 69, 31, 0.22)",
      color: "var(--color-terracotta-deep)",
    },
    soldOut: {
      textDecoration: "line-through",
      color: "var(--color-ink-muted)",
    },
  };

  const handleSelect = (day: Date | undefined) => {
    if (!day) return;
    const dep = dayInfo.get(day.toISOString().slice(0, 10));
    if (!dep || dep.status === "SOLD_OUT" || dep.status === "BLOCKED") return;
    onSelect?.(dep.id);
  };

  const selectedDeparture = React.useMemo(
    () => departures.find((d) => d.id === selectedDepartureId),
    [selectedDepartureId, departures],
  );

  // Determine the selected calendar day from the selected departure's start
  const selectedDay = selectedDeparture
    ? new Date(selectedDeparture.startDate)
    : undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-2xl border border-[var(--color-pine)]/10 p-4 md:p-6 inline-block">
        <DayPicker
          mode="single"
          fromDate={today}
          numberOfMonths={1}
          selected={selectedDay}
          onSelect={handleSelect}
          disabled={isDayDisabled}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          showOutsideDays={false}
        />
        <div className="mt-4 pt-4 border-t border-[var(--color-pine)]/10 flex flex-wrap gap-3 text-xs text-[var(--color-ink-soft)]">
          <Legend color="rgba(122, 140, 74, 0.7)">Open</Legend>
          <Legend color="rgba(168, 69, 31, 0.7)">Filling fast</Legend>
          <Legend color="rgba(99, 99, 99, 0.6)" struck>
            Sold out
          </Legend>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-2xl">
          {selectedDeparture ? "Your departure" : "Available departures"}
        </h3>

        {selectedDeparture ? (
          <SelectedSummary
            tourSlug={tourSlug}
            basePriceUsd={basePriceUsd}
            departure={selectedDeparture}
            onClear={() => onSelect?.("")}
          />
        ) : (
          <ul className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {departures
              .filter((d) => d.status !== "BLOCKED")
              .map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[var(--color-pine)]/10 bg-white"
                >
                  <div className="text-sm">
                    <p className="font-medium">
                      {formatDateRange(new Date(d.startDate), new Date(d.endDate))}
                    </p>
                    <p className="text-[var(--color-ink-muted)] text-xs">
                      {d.bookedSeats}/{d.capacity} riders booked
                    </p>
                  </div>
                  {d.status === "SOLD_OUT" ? (
                    <Badge variant="soldout">Sold out</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant={d.status === "FILLING" ? "primary" : "outline"}
                      onClick={() => onSelect?.(d.id)}
                    >
                      {d.status === "FILLING" ? "Few spots" : "Select"}
                    </Button>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Legend({
  color,
  children,
  struck,
}: {
  color: string;
  children: React.ReactNode;
  struck?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: color }}
      />
      <span className={struck ? "line-through" : ""}>{children}</span>
    </span>
  );
}

function SelectedSummary({
  tourSlug,
  basePriceUsd,
  departure,
  onClear,
}: {
  tourSlug: string;
  basePriceUsd: number;
  departure: DepartureAvailability;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-terracotta)]/30 bg-[var(--color-terracotta)]/5 p-5">
      <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta-deep)]">
        Selected
      </p>
      <p className="mt-1 font-serif text-2xl">
        {formatDateRange(new Date(departure.startDate), new Date(departure.endDate))}
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        {departure.capacity - departure.bookedSeats} of {departure.capacity} spots
        remaining · from {formatUsd(basePriceUsd)} per rider
      </p>
      <div className="mt-5 flex gap-3">
        <Button asChild size="lg">
          <Link href={`/book/${tourSlug}?dep=${departure.id}`}>
            Continue booking
          </Link>
        </Button>
        <Button variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

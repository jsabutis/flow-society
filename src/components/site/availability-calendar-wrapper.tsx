"use client";
import * as React from "react";
import { AvailabilityCalendar } from "./availability-calendar";
import type { DepartureAvailability } from "@/lib/types";

type Props = {
  tourSlug: string;
  basePriceUsd: number;
  departures: DepartureAvailability[];
};

export function AvailabilityCalendarWrapper(props: Props) {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  return (
    <AvailabilityCalendar
      {...props}
      selectedDepartureId={selected}
      onSelect={(id) => setSelected(id || undefined)}
    />
  );
}

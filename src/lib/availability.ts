import { prisma } from "@/lib/db";
import { tours as seedTours } from "@/lib/data/tours";
import { isStaticPreviewMode } from "@/lib/static-preview";
import type { DepartureAvailability } from "@/lib/types";

const FILLING_THRESHOLD = 0.6; // 60%+ booked = "filling fast"

export async function getTourAvailability(slug: string): Promise<DepartureAvailability[]> {
  if (isStaticPreviewMode()) {
    return buildPreviewUpcomingDepartures()
      .filter((entry) => entry.tour.slug === slug)
      .map((entry) => entry.departure);
  }
  const tour = await prisma.tour.findUnique({
    where: { slug },
    include: {
      departures: {
        orderBy: { startDate: "asc" },
        include: {
          bookings: {
            where: { status: { in: ["PENDING", "CONFIRMED"] } },
            select: { partySize: true },
          },
        },
      },
    },
  });
  if (!tour) return [];

  const blocks = await prisma.blockedDate.findMany({
    where: { OR: [{ tourId: tour.id }, { tourId: null }] },
  });
  const blockedTimestamps = new Set(blocks.map((b) => stripTime(b.date).getTime()));

  const today = stripTime(new Date());

  return tour.departures.map((dep) => {
    const booked = dep.bookings.reduce((sum, b) => sum + b.partySize, 0);
    const isPast = stripTime(dep.endDate).getTime() < today.getTime();
    const isBlocked = rangeOverlapsBlocks(dep.startDate, dep.endDate, blockedTimestamps);

    let status: DepartureAvailability["status"];
    if (isPast || isBlocked || dep.status === "HOLD") status = "BLOCKED";
    else if (dep.status === "SOLD_OUT" || booked >= dep.capacity) status = "SOLD_OUT";
    else if (booked / dep.capacity >= FILLING_THRESHOLD) status = "FILLING";
    else status = "OPEN";

    return {
      id: dep.id,
      startDate: dep.startDate.toISOString(),
      endDate: dep.endDate.toISOString(),
      capacity: dep.capacity,
      bookedSeats: booked,
      status,
    };
  });
}

export async function getAllUpcomingDepartures() {
  if (isStaticPreviewMode()) return buildPreviewUpcomingDepartures();
  const today = stripTime(new Date());
  const tours = await prisma.tour.findMany({
    include: {
      departures: {
        where: { startDate: { gte: today } },
        orderBy: { startDate: "asc" },
        include: {
          bookings: {
            where: { status: { in: ["PENDING", "CONFIRMED"] } },
            select: { partySize: true },
          },
        },
      },
    },
  });

  const blocks = await prisma.blockedDate.findMany();
  const blockedTimestamps = new Set(blocks.map((b) => stripTime(b.date).getTime()));

  return tours.flatMap((tour) =>
    tour.departures.map((dep) => {
      const booked = dep.bookings.reduce((sum, b) => sum + b.partySize, 0);
      const isBlocked = rangeOverlapsBlocks(dep.startDate, dep.endDate, blockedTimestamps);
      let status: DepartureAvailability["status"];
      if (isBlocked || dep.status === "HOLD") status = "BLOCKED";
      else if (dep.status === "SOLD_OUT" || booked >= dep.capacity) status = "SOLD_OUT";
      else if (booked / dep.capacity >= FILLING_THRESHOLD) status = "FILLING";
      else status = "OPEN";
      return {
        tour: {
          slug: tour.slug,
          name: tour.name,
          region: tour.region,
          difficulty: tour.difficulty,
          bikeTypes: tour.bikeTypes,
          durationDays: tour.durationDays,
          basePriceUsd: tour.basePriceUsd,
        },
        departure: {
          id: dep.id,
          startDate: dep.startDate.toISOString(),
          endDate: dep.endDate.toISOString(),
          capacity: dep.capacity,
          bookedSeats: booked,
          status,
        },
      };
    }),
  );
}

type UpcomingDeparture = Awaited<ReturnType<typeof getAllUpcomingDepartures>>[number];

function buildPreviewUpcomingDepartures(): UpcomingDeparture[] {
  const today = stripTime(new Date());
  const baseOffsetDays = 5;
  const departuresPerTour = 3;
  const spacingDays = 13;

  return seedTours
    .flatMap((tour, tourIndex) => {
      return Array.from({ length: departuresPerTour }).map((_, depIndex) => {
        const startDate = new Date(today);
        startDate.setDate(
          today.getDate() + baseOffsetDays + tourIndex * 7 + depIndex * spacingDays,
        );

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + Math.max(1, tour.durationDays) - 1);

        const capacity = Math.max(6, tour.maxGroup);
        const seatMix = [Math.floor(capacity * 0.35), Math.floor(capacity * 0.7), capacity];
        const bookedSeats = Math.min(capacity, seatMix[depIndex] ?? 0);
        const status: DepartureAvailability["status"] =
          bookedSeats >= capacity
            ? "SOLD_OUT"
            : bookedSeats / capacity >= FILLING_THRESHOLD
              ? "FILLING"
              : "OPEN";

        return {
          tour: {
            slug: tour.slug,
            name: tour.name,
            region: tour.region,
            difficulty: tour.difficulty,
            bikeTypes: tour.bikeTypes,
            durationDays: tour.durationDays,
            basePriceUsd: tour.basePriceUsd,
          },
          departure: {
            id: `pv-${tour.slug}-${depIndex + 1}`,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            capacity,
            bookedSeats,
            status,
          },
        };
      });
    })
    .sort(
      (a, b) =>
        new Date(a.departure.startDate).getTime() -
        new Date(b.departure.startDate).getTime(),
    );
}

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function rangeOverlapsBlocks(start: Date, end: Date, blocked: Set<number>) {
  const s = stripTime(start).getTime();
  const e = stripTime(end).getTime();
  const day = 24 * 60 * 60 * 1000;
  for (let t = s; t <= e; t += day) {
    if (blocked.has(t)) return true;
  }
  return false;
}

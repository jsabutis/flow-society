import type { Bike, Tour } from "@prisma/client";
import type { SeedBike } from "@/lib/data/bikes";
import { bikes as seedBikes } from "@/lib/data/bikes";
import type { SeedTour } from "@/lib/data/tours";
import { tours as seedTours } from "@/lib/data/tours";
import type { TourListFilters } from "@/lib/tour-filters";

function now() {
  return new Date();
}

/** Matches Prisma `tourWhereFromFilters` logic against seed tours. */
export function seedTourMatchesFilters(t: SeedTour, f: TourListFilters): boolean {
  if (f.days === "1") {
    if (t.durationDays !== 1) return false;
  } else if (f.days === "2-3") {
    if (t.durationDays < 2 || t.durationDays > 3) return false;
  } else if (f.days === "4") {
    if (t.durationDays < 4) return false;
  }

  if (f.level && ["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(f.level)) {
    if (t.difficulty !== f.level) return false;
  }

  if (f.bike === "emtb") {
    if (!t.bikeTypes.includes("E-MTB")) return false;
  } else if (f.bike === "mtb") {
    if (t.bikeTypes === "E-MTB") return false;
  }

  if (f.region && !t.region.includes(f.region)) return false;

  return true;
}

export function listSeedToursFiltered(filters: TourListFilters): SeedTour[] {
  const filtered = seedTours.filter((t) => seedTourMatchesFilters(t, filters));
  return [...filtered].sort((a, b) => {
    if (a.durationDays !== b.durationDays) return a.durationDays - b.durationDays;
    return a.slug.localeCompare(b.slug);
  });
}

export function seedTourToTour(s: SeedTour): Tour {
  const d = now();
  return {
    id: `pv-${s.slug}`,
    slug: s.slug,
    name: s.name,
    region: s.region,
    country: "Mexico",
    bikeTypes: s.bikeTypes,
    difficulty: s.difficulty,
    durationDays: s.durationDays,
    basePriceUsd: s.basePriceUsd,
    heroImage: s.heroImage,
    gallery: JSON.stringify(s.gallery),
    summary: s.summary,
    highlights: JSON.stringify(s.highlights),
    itinerary: JSON.stringify(s.itinerary),
    included: JSON.stringify(s.included),
    notIncluded: JSON.stringify(s.notIncluded),
    maxGroup: s.maxGroup,
    driveTimeMin: s.driveTimeMin,
    createdAt: d,
    updatedAt: d,
  };
}

export function findSeedTourBySlug(slug: string): Tour | null {
  const s = seedTours.find((t) => t.slug === slug);
  return s ? seedTourToTour(s) : null;
}

export function seedBikeToBike(s: SeedBike): Bike {
  return {
    id: `pv-${s.slug}`,
    slug: s.slug,
    brand: s.brand,
    model: s.model,
    category: s.category,
    travelMm: s.travelMm,
    wheelSize: s.wheelSize,
    drivetrain: s.drivetrain,
    brakes: s.brakes,
    suspension: s.suspension,
    tires: s.tires,
    sizesAvail: JSON.stringify(s.sizesAvail),
    riderHeightCm: s.riderHeightCm,
    dailyRateUsd: s.dailyRateUsd,
    heroImage: s.heroImage,
    gallery: JSON.stringify(s.gallery),
    notes: s.notes ?? null,
  };
}

export function findSeedBikeBySlug(slug: string): Bike | null {
  const s = seedBikes.find((b) => b.slug === slug);
  return s ? seedBikeToBike(s) : null;
}

export function previewTourSummary(slug: string): {
  slug: string;
  name: string;
  region: string;
} | null {
  const s = seedTours.find((t) => t.slug === slug);
  return s ? { slug: s.slug, name: s.name, region: s.region } : null;
}

export type TourListCardRow = {
  slug: string;
  name: string;
  region: string;
  bikeTypes: string;
  difficulty: string;
  durationDays: number;
  basePriceUsd: number;
  heroImage: string;
  summary: string;
  id: string;
};

export function seedTourToListRow(s: SeedTour): TourListCardRow {
  return {
    slug: s.slug,
    name: s.name,
    region: s.region,
    bikeTypes: s.bikeTypes,
    difficulty: s.difficulty,
    durationDays: s.durationDays,
    basePriceUsd: s.basePriceUsd,
    heroImage: s.heroImage,
    summary: s.summary,
    id: `pv-${s.slug}`,
  };
}

/** Matches `prisma.bike.findMany` select in book flow. */
export function listSeedBikesForBookingSelect(): Array<{
  slug: string;
  brand: string;
  model: string;
  category: string;
  travelMm: number;
  wheelSize: string;
  dailyRateUsd: number;
  sizesAvail: string;
  riderHeightCm: string;
}> {
  return [...seedBikes]
    .sort((a, b) => {
      const c = a.category.localeCompare(b.category);
      return c !== 0 ? c : a.brand.localeCompare(b.brand);
    })
    .map((b) => ({
      slug: b.slug,
      brand: b.brand,
      model: b.model,
      category: b.category,
      travelMm: b.travelMm,
      wheelSize: b.wheelSize,
      dailyRateUsd: b.dailyRateUsd,
      sizesAvail: JSON.stringify(b.sizesAvail),
      riderHeightCm: b.riderHeightCm,
    }));
}

export function listSeedBikeCardRows(): Array<{
  slug: string;
  brand: string;
  model: string;
  category: string;
  travelMm: number;
  wheelSize: string;
  dailyRateUsd: number;
  heroImage: string;
}> {
  return [...seedBikes]
    .sort((a, b) => {
      const c = a.category.localeCompare(b.category);
      return c !== 0 ? c : a.brand.localeCompare(b.brand);
    })
    .map((b) => ({
      slug: b.slug,
      brand: b.brand,
      model: b.model,
      category: b.category,
      travelMm: b.travelMm,
      wheelSize: b.wheelSize,
      dailyRateUsd: b.dailyRateUsd,
      heroImage: b.heroImage,
    }));
}

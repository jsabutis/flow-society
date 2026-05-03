import type { Prisma } from "@prisma/client";

export type TourListFilters = {
  days: string | null; // "1" | "2-3" | "4"
  level: string | null; // BEGINNER | INTERMEDIATE | ADVANCED
  bike: string | null; // mtb | emtb
  region: string | null;
};

export function parseTourListSearchParams(sp: {
  [key: string]: string | string[] | undefined;
}): TourListFilters {
  const g = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v ?? null;
  };
  return {
    days: g("days"),
    level: g("level"),
    bike: g("bike"),
    region: g("region"),
  };
}

export function tourWhereFromFilters(
  f: TourListFilters,
): Prisma.TourWhereInput {
  const where: Prisma.TourWhereInput = {};

  if (f.days === "1") {
    where.durationDays = 1;
  } else if (f.days === "2-3") {
    where.durationDays = { gte: 2, lte: 3 };
  } else if (f.days === "4") {
    where.durationDays = { gte: 4 };
  }

  if (f.level && ["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(f.level)) {
    where.difficulty = f.level;
  }

  if (f.bike === "emtb") {
    where.bikeTypes = { contains: "E-MTB" };
  } else if (f.bike === "mtb") {
    where.NOT = { bikeTypes: "E-MTB" };
  }

  if (f.region) {
    where.region = { contains: f.region };
  }

  return where;
}

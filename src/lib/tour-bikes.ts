import { prisma } from "@/lib/db";

/** Bikes we recommend for a tour based on its bikeTypes CSV (MTB, E-MTB, …). */
export async function getRecommendedBikesForTour(bikeTypesCsv: string, take = 6) {
  const upper = bikeTypesCsv.toUpperCase();
  const hasE = upper.includes("E-MTB");
  const hasAnalog = upper.includes("MTB") || (!hasE && upper.length > 0);

  const all = await prisma.bike.findMany({
    orderBy: [{ dailyRateUsd: "asc" }],
  });

  const filtered = all.filter((b) => {
    if (b.category === "E-MTB") return hasE;
    if (hasAnalog) return true;
    return hasE;
  });

  return filtered.slice(0, take);
}

/** Tours that can use this bike (for bike detail cross-link). */
export async function getToursForBikeCategory(category: string, take = 8) {
  const isE = category === "E-MTB";
  const tours = await prisma.tour.findMany({
    where: isE
      ? { bikeTypes: { contains: "E-MTB" } }
      : { NOT: { bikeTypes: "E-MTB" } },
    orderBy: { name: "asc" },
    select: {
      slug: true,
      name: true,
      region: true,
      difficulty: true,
      durationDays: true,
      basePriceUsd: true,
      heroImage: true,
      bikeTypes: true,
    },
    take,
  });
  return tours;
}

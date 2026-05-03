import { bikes as seedBikes } from "@/lib/data/bikes";
import { tours as seedTours } from "@/lib/data/tours";
import { prisma } from "@/lib/db";
import { isStaticPreviewMode } from "@/lib/static-preview";

/** Bikes we recommend for a tour based on its bikeTypes CSV (MTB, E-MTB, …). */
export async function getRecommendedBikesForTour(bikeTypesCsv: string, take = 6) {
  if (isStaticPreviewMode()) {
    const upper = bikeTypesCsv.toUpperCase();
    const hasE = upper.includes("E-MTB");
    const hasAnalog = upper.includes("MTB") || (!hasE && upper.length > 0);
    const filtered = seedBikes.filter((b) => {
      if (b.category === "E-MTB") return hasE;
      if (hasAnalog) return true;
      return hasE;
    });
    return filtered.slice(0, take).map((b) => ({
      id: `pv-${b.slug}`,
      slug: b.slug,
      brand: b.brand,
      model: b.model,
      category: b.category,
      travelMm: b.travelMm,
      wheelSize: b.wheelSize,
      drivetrain: b.drivetrain,
      brakes: b.brakes,
      suspension: b.suspension,
      tires: b.tires,
      sizesAvail: JSON.stringify(b.sizesAvail),
      riderHeightCm: b.riderHeightCm,
      dailyRateUsd: b.dailyRateUsd,
      heroImage: b.heroImage,
      gallery: JSON.stringify(b.gallery),
      notes: b.notes ?? null,
    }));
  }

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
  if (isStaticPreviewMode()) {
    const isE = category === "E-MTB";
    const filtered = seedTours.filter((tour) =>
      isE ? tour.bikeTypes.includes("E-MTB") : tour.bikeTypes !== "E-MTB",
    );
    return filtered.slice(0, take).map((t) => ({
      slug: t.slug,
      name: t.name,
      region: t.region,
      difficulty: t.difficulty,
      durationDays: t.durationDays,
      basePriceUsd: t.basePriceUsd,
      heroImage: t.heroImage,
      bikeTypes: t.bikeTypes,
    }));
  }

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

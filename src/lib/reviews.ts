import { prisma } from "@/lib/db";

export type TourReviewStats = {
  avg: number;
  count: number;
};

export async function getGlobalReviewStats(): Promise<TourReviewStats> {
  try {
    const agg = await prisma.review.aggregate({
      _avg: { rating: true },
      _count: { _all: true },
    });
    const avg = agg._avg.rating ?? 0;
    return {
      avg: Math.round(avg * 10) / 10,
      count: agg._count._all,
    };
  } catch {
    return { avg: 0, count: 0 };
  }
}

export async function getTourReviewStats(tourId: string): Promise<TourReviewStats> {
  try {
    const agg = await prisma.review.aggregate({
      where: { tourId },
      _avg: { rating: true },
      _count: { _all: true },
    });
    const rating = agg._avg.rating ?? 0;
    return {
      avg: Math.round(rating * 10) / 10,
      count: agg._count._all,
    };
  } catch {
    return { avg: 0, count: 0 };
  }
}

export async function getTourReviews(tourId: string, take = 8) {
  return prisma.review.findMany({
    where: { tourId },
    orderBy: { createdAt: "desc" },
    take,
  });
}

/** One DB round-trip: stats per tour id */
export async function getReviewStatsByTourIds(
  tourIds: string[],
): Promise<Map<string, TourReviewStats>> {
  if (tourIds.length === 0) return new Map();
  try {
    const rows = await prisma.review.groupBy({
      by: ["tourId"],
      where: { tourId: { in: tourIds } },
      _avg: { rating: true },
      _count: { _all: true },
    });
    const m = new Map<string, TourReviewStats>();
    for (const r of rows) {
      const rating = r._avg.rating ?? 0;
      m.set(r.tourId, {
        avg: Math.round(rating * 10) / 10,
        count: r._count._all,
      });
    }
    return m;
  } catch {
    return new Map();
  }
}

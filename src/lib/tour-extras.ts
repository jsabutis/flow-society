import { prisma } from "@/lib/db";

const FILLING_THRESHOLD = 0.6;

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * For each tour slug, the next bookable departure status (OPEN/FILLING) or null.
 */
export async function getNextDepartureFillingBySlug(
  slugs: string[],
): Promise<Map<string, boolean>> {
  const result = new Map<string, boolean>();
  if (slugs.length === 0) return result;
  const today = stripTime(new Date());

  const tours = await prisma.tour.findMany({
    where: { slug: { in: slugs } },
    select: {
      slug: true,
      departures: {
        where: { startDate: { gte: today } },
        orderBy: { startDate: "asc" },
        take: 1,
        include: {
          bookings: {
            where: { status: { in: ["PENDING", "CONFIRMED"] } },
            select: { partySize: true },
          },
        },
      },
    },
  });

  for (const t of tours) {
    const dep = t.departures[0];
    if (!dep || dep.status === "HOLD" || dep.status === "SOLD_OUT") {
      result.set(t.slug, false);
      continue;
    }
    const booked = dep.bookings.reduce((s, b) => s + b.partySize, 0);
    if (booked >= dep.capacity) {
      result.set(t.slug, false);
      continue;
    }
    const filling = booked / dep.capacity >= FILLING_THRESHOLD;
    result.set(t.slug, filling);
  }

  return result;
}

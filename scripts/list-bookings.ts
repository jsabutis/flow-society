import { prisma } from "../src/lib/db";

async function main() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { tour: true },
  });
  console.log(
    bookings.map((b) => ({
      id: b.id,
      lead: b.leadName,
      tour: b.tour.name,
      status: b.status,
      party: b.partySize,
      created: b.createdAt.toISOString(),
    })),
  );
}

main().finally(() => prisma.$disconnect());

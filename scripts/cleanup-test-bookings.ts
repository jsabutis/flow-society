import { prisma } from "../src/lib/db";

async function main() {
  const res = await prisma.bookingRequest.deleteMany({
    where: { OR: [{ email: "test@example.com" }, { email: "smoke@test.com" }] },
  });
  console.log(`Deleted ${res.count} test booking(s).`);
}

main().finally(() => prisma.$disconnect());

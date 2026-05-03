import { PrismaClient } from "@prisma/client";
import { tours } from "../src/lib/data/tours";
import { bikes } from "../src/lib/data/bikes";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data\u2026");
  await prisma.bookingRequest.deleteMany();
  await prisma.review.deleteMany();
  await prisma.tourDeparture.deleteMany();
  await prisma.blockedDate.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.bike.deleteMany();

  console.log(`Seeding ${bikes.length} bikes\u2026`);
  for (const b of bikes) {
    await prisma.bike.create({
      data: {
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
      },
    });
  }

  console.log(`Seeding ${tours.length} tours and 6 months of departures\u2026`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const t of tours) {
    const created = await prisma.tour.create({
      data: {
        slug: t.slug,
        name: t.name,
        region: t.region,
        bikeTypes: t.bikeTypes,
        difficulty: t.difficulty,
        durationDays: t.durationDays,
        basePriceUsd: t.basePriceUsd,
        driveTimeMin: t.driveTimeMin,
        heroImage: t.heroImage,
        gallery: JSON.stringify(t.gallery),
        summary: t.summary,
        highlights: JSON.stringify(t.highlights),
        itinerary: JSON.stringify(t.itinerary),
        included: JSON.stringify(t.included),
        notIncluded: JSON.stringify(t.notIncluded),
        maxGroup: t.maxGroup,
      },
    });

    const departures = generateDepartures(today, t.durationDays);
    for (const dep of departures) {
      await prisma.tourDeparture.create({
        data: {
          tourId: created.id,
          startDate: dep.start,
          endDate: dep.end,
          capacity: t.maxGroup,
          status: dep.status,
        },
      });
    }

    for (const rev of reviewVariantsForTour(t.slug)) {
      await prisma.review.create({
        data: {
          tourId: created.id,
          riderName: rev.riderName,
          riderLocation: rev.riderLocation,
          rating: rev.rating,
          quote: rev.quote,
          source: rev.source ?? "direct",
        },
      });
    }
  }

  console.log("Done.");
}

type ReviewSeed = {
  riderName: string;
  riderLocation: string;
  rating: number;
  quote: string;
  source?: string;
};

/** Curated quotes per Flow Society tour slug. */
function reviewVariantsForTour(slug: string): ReviewSeed[] {
  const common: Record<string, ReviewSeed[]> = {
    "primavera-ebike-brunch-principiante": [
      {
        riderName: "Carmen V.",
        riderLocation: "Guadalajara",
        rating: 5,
        quote:
          "Mi primera vez en e-bike y lo am\u00e9 \u2014 el grupo super peque\u00f1o, las paradas para fotos en el bosque y el brunch al final estuvieron incre\u00edbles.",
      },
      {
        riderName: "Alex M.",
        riderLocation: "Portland, OR",
        rating: 5,
        quote:
          "The beginner e-bike brunch was exactly the format we wanted \u2014 chill ride, real food, and the lounge afterwards is half the reason to come back.",
      },
    ],
    "primavera-ebike-brunch-intermedio": [
      {
        riderName: "Diego",
        riderLocation: "CDMX",
        rating: 5,
        quote:
          "Conozco La Primavera y a\u00fan as\u00ed me llevaron por l\u00edneas que no hab\u00eda rodado. Dos horas perfectas, y el lounge para la conversa con la comunidad.",
      },
      {
        riderName: "Elena R.",
        riderLocation: "Monterrey",
        rating: 5,
        quote:
          "Premium sin sentirse pretencioso. Bicis afinadas, gu\u00edas relajados, comida excelente. El nivel intermedio fue justo lo que buscaba.",
      },
    ],
    "brunch-lounge-pareja-hibrida": [
      {
        riderName: "Sof\u00eda & Mat\u00edas",
        riderLocation: "Guadalajara",
        rating: 5,
        quote:
          "Yo en muscular, \u00e9l en e-bike \u2014 el ritmo balanceado funciona perfecto. Llegamos al lounge sin que ninguno estuviera reventado ni aburrido.",
      },
      {
        riderName: "Lisa K.",
        riderLocation: "Vancouver, BC",
        rating: 5,
        quote:
          "Brought my partner who's never mountain biked \u2014 the hybrid format made it doable for both of us. Best date in months.",
      },
    ],
    "membresia-flow-society": [
      {
        riderName: "Pau",
        riderLocation: "Zapopan",
        rating: 5,
        quote:
          "La membres\u00eda cambi\u00f3 mi mes. Tres rides + master class fija, y las fechas prioritarias son oro cuando se llenan las del calendario p\u00fablico.",
      },
      {
        riderName: "Rob H.",
        riderLocation: "Austin, TX",
        rating: 5,
        quote:
          "Joined as a part-time GDL resident \u2014 the membership is the easiest way to get a real local riding crew without joining a club.",
      },
    ],
    "ebike-camping-experience": [
      {
        riderName: "Sarah",
        riderLocation: "Squamish, BC",
        rating: 5,
        quote:
          "The camping experience was magical \u2014 sunrise ride, brunch under the pines, and the lounge felt completely different from the day rides. Worth every peso.",
      },
      {
        riderName: "Tom W.",
        riderLocation: "UK",
        rating: 5,
        quote:
          "Two days felt like a proper escape. Small group, fire at night, perfect dirt in the morning. I'd do this every season.",
      },
      {
        riderName: "Paul",
        riderLocation: "CDMX",
        rating: 5,
        quote:
          "Acampar adentro del bosque, con la gente y la comida que arman, es de las mejores experiencias que he tenido en bici en M\u00e9xico.",
      },
    ],
  };
  return (
    common[slug] ?? [
      {
        riderName: "Rider",
        riderLocation: "GDL",
        rating: 5,
        quote: "Buena vibra, ride cuidado y un lounge que vale la pena. Volvemos seguro.",
      },
    ]
  );
}

function generateDepartures(start: Date, durationDays: number) {
  const out: { start: Date; end: Date; status: string }[] = [];
  for (let week = 1; week <= 26; week++) {
    if (week % 2 === 0) continue;
    const s = new Date(start);
    s.setDate(s.getDate() + week * 7 + 5);
    const e = new Date(s);
    e.setDate(e.getDate() + Math.max(0, durationDays - 1));
    const status = week === 3 ? "SOLD_OUT" : week === 7 ? "HOLD" : "OPEN";
    out.push({ start: s, end: e, status });
  }
  return out;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

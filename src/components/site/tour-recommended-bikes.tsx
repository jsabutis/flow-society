import Link from "next/link";
import { BikeCard } from "@/components/site/bike-card";
import { getT } from "@/lib/i18n/server";

type BikeRow = {
  slug: string;
  brand: string;
  model: string;
  category: string;
  travelMm: number;
  wheelSize: string;
  dailyRateUsd: number;
  heroImage: string;
};

export async function TourRecommendedBikes({ bikes }: { bikes: BikeRow[] }) {
  if (bikes.length === 0) return null;
  const { t } = await getT();
  return (
    <section className="py-20 bg-[var(--color-sand-soft)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl">{t.tourRecommendedBikes.title}</h2>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed">
          {t.tourRecommendedBikes.body}
        </p>
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
          {bikes.map((b) => (
            <div
              key={b.slug}
              className="snap-start shrink-0 w-[min(100%,280px)] sm:w-72"
            >
              <BikeCard {...b} />
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
          <Link href="/bikes" className="underline underline-offset-4 hover:text-[var(--color-terracotta)]">
            {t.tourRecommendedBikes.viewFullFleet}
          </Link>
        </p>
      </div>
    </section>
  );
}

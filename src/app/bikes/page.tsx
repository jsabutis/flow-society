import { prisma } from "@/lib/db";
import { listSeedBikeCardRows } from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { BikeCard } from "@/components/site/bike-card";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.bikes.metaTitle,
    description: t.bikes.metaDescription,
  };
}

export default async function BikesPage() {
  const { t } = await getT();
  const bikes = isStaticPreviewMode()
    ? listSeedBikeCardRows()
    : await prisma.bike.findMany({
        orderBy: [{ category: "asc" }, { brand: "asc" }],
        select: {
          slug: true,
          brand: true,
          model: true,
          category: true,
          travelMm: true,
          wheelSize: true,
          dailyRateUsd: true,
          heroImage: true,
        },
      });

  return (
    <div>
      <section className="bg-pine-gradient text-[var(--color-sand-soft)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-soft)]/70">
            {t.bikes.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight max-w-3xl">
            {t.bikes.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--color-sand-soft)]/80 leading-relaxed text-lg">
            {t.bikes.intro}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map((b) => (
              <BikeCard key={b.slug} {...b} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

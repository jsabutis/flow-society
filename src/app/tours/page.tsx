import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  listSeedToursFiltered,
  seedTourToListRow,
} from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { TourCard } from "@/components/site/tour-card";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import type { Metadata } from "next";
import { parseTourListSearchParams, tourWhereFromFilters } from "@/lib/tour-filters";
import { getReviewStatsByTourIds } from "@/lib/reviews";
import { getNextDepartureFillingBySlug } from "@/lib/tour-extras";
import { TourCompareControls } from "@/components/site/tour-compare-controls";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.tours.metaTitle,
    description: t.tours.metaDescription,
  };
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ToursPage({ searchParams }: Props) {
  const { t } = await getT();
  const sp = await searchParams;
  const filters = parseTourListSearchParams(sp);

  const tours = isStaticPreviewMode()
    ? listSeedToursFiltered(filters).map(seedTourToListRow)
    : await prisma.tour.findMany({
        where: tourWhereFromFilters(filters),
        orderBy: [{ durationDays: "asc" }, { createdAt: "asc" }],
        select: {
          slug: true,
          name: true,
          region: true,
          bikeTypes: true,
          difficulty: true,
          durationDays: true,
          basePriceUsd: true,
          heroImage: true,
          summary: true,
          id: true,
        },
      });

  const [cardReviewStats, fillingMap] = await Promise.all([
    getReviewStatsByTourIds(tours.map((tour) => tour.id)),
    getNextDepartureFillingBySlug(tours.map((tour) => tour.slug)),
  ]);

  return (
    <div>
      <section className="bg-agave-gradient">
        <Reveal as="div" className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.tours.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight max-w-3xl">
            {t.tours.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed text-lg">
            {t.tours.intro}
          </p>
        </Reveal>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <form
            method="get"
            className="flex flex-wrap items-end gap-3 mb-6 pb-6 border-b border-[var(--color-pine)]/10"
          >
            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t.tours.filters.length}
              <select
                name="days"
                defaultValue={filters.days ?? ""}
                className="rounded-lg border border-[var(--color-pine)]/20 bg-white px-3 py-2 text-sm text-[var(--color-pine)] min-w-[9rem]"
              >
                <option value="">{t.tours.filters.any}</option>
                <option value="1">{t.tours.filters.oneDay}</option>
                <option value="2-3">{t.tours.filters.twoThreeDays}</option>
                <option value="4">{t.tours.filters.fourPlusDays}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t.tours.filters.level}
              <select
                name="level"
                defaultValue={filters.level ?? ""}
                className="rounded-lg border border-[var(--color-pine)]/20 bg-white px-3 py-2 text-sm text-[var(--color-pine)] min-w-[9rem]"
              >
                <option value="">{t.tours.filters.any}</option>
                <option value="BEGINNER">{t.tours.filters.beginner}</option>
                <option value="INTERMEDIATE">{t.tours.filters.intermediate}</option>
                <option value="ADVANCED">{t.tours.filters.advanced}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t.tours.filters.bike}
              <select
                name="bike"
                defaultValue={filters.bike ?? ""}
                className="rounded-lg border border-[var(--color-pine)]/20 bg-white px-3 py-2 text-sm text-[var(--color-pine)] min-w-[9rem]"
              >
                <option value="">{t.tours.filters.any}</option>
                <option value="mtb">{t.tours.filters.analogMtb}</option>
                <option value="emtb">{t.tours.filters.emtb}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t.tours.filters.regionLabel}
              <input
                name="region"
                type="search"
                defaultValue={filters.region ?? ""}
                placeholder={t.tours.filters.regionPlaceholder}
                className="rounded-lg border border-[var(--color-pine)]/20 bg-white px-3 py-2 text-sm text-[var(--color-pine)] min-w-[10rem]"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-[var(--color-terracotta)] text-white px-5 py-2 text-sm font-medium hover:opacity-95"
            >
              {t.tours.filters.apply}
            </button>
            <Link
              href="/tours"
              className="text-sm text-[var(--color-ink-muted)] underline underline-offset-4 py-2"
            >
              {t.tours.filters.reset}
            </Link>
          </form>

          <TourCompareControls tours={tours.map((tour) => ({ slug: tour.slug, name: tour.name }))} />

          <RevealStagger
            stagger={0.06}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tours.map((tour) => {
              const r = cardReviewStats.get(tour.id);
              const { id, ...card } = tour;
              void id;
              return (
                <RevealItem key={tour.slug}>
                  <TourCard
                    {...card}
                    ratingAvg={r?.avg}
                    reviewCount={r?.count}
                    fillingFast={fillingMap.get(tour.slug) ?? false}
                  />
                </RevealItem>
              );
            })}
          </RevealStagger>
          {tours.length === 0 && (
            <p className="text-center text-[var(--color-ink-soft)] py-16">
              {t.tours.empty}{" "}
              <Link href="/tours" className="underline underline-offset-4 text-[var(--color-terracotta)]">
                {t.tours.clearFilters}
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

import type { Tour } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { findSeedTourBySlug } from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { formatUsd } from "@/lib/utils";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.compare.metaTitle,
    description: t.compare.metaDescription,
  };
}

type RouteParams = {
  searchParams: Promise<{ slugs?: string }>;
};

export default async function ToursComparePage({ searchParams }: RouteParams) {
  const { locale, t } = await getT();
  const sp = await searchParams;
  const raw = sp.slugs ?? "";
  const slugList = [...new Set(raw.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, 3);

  if (slugList.length < 2) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mb-8 text-left">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { href: "/tours", label: t.ux.breadcrumbTours },
              { label: t.ux.breadcrumbCompare },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
        </div>
        <h1 className="font-serif text-3xl">{t.compare.title}</h1>
        <p className="mt-4 text-[var(--color-ink-soft)]">
          {t.compare.tooFew.split(t.compare.tooFewLink)[0]}
          <Link href="/tours" className="text-[var(--color-terracotta)] underline underline-offset-4">
            {t.compare.tooFewLink}
          </Link>
          {t.compare.tooFew.split(t.compare.tooFewLink)[1]?.split(t.compare.tooFewClickLabel)[0]}
          <strong>{t.compare.tooFewClickLabel}</strong>
          {t.compare.tooFew.split(t.compare.tooFewClickLabel)[1]}
        </p>
      </div>
    );
  }

  const tours: Tour[] = isStaticPreviewMode()
    ? slugList.map((s) => findSeedTourBySlug(s)).filter((t): t is Tour => Boolean(t))
    : await prisma.tour.findMany({
        where: { slug: { in: slugList } },
      });
  if (tours.length < 2) notFound();

  const ordered = slugList
    .map((s) => tours.find((tour) => tour.slug === s))
    .filter((tour): tour is Tour => Boolean(tour));

  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { href: "/tours", label: t.ux.breadcrumbTours },
              { label: t.ux.breadcrumbCompare },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 pb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.compare.eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mt-3">{t.compare.title}</h1>
          <p className="mt-4 text-[var(--color-ink-soft)] max-w-2xl">
            {t.compare.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-pine)]/15">
              <th className="text-left py-3 pr-4 font-sans font-medium text-[var(--color-ink-muted)]">
                {t.compare.colTour}
              </th>
              {ordered.map((tour) => (
                <th key={tour.slug} className="text-left py-3 px-3 font-serif text-base">
                  <Link href={`/tours/${tour.slug}`} className="hover:text-[var(--color-terracotta)]">
                    {tour.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[var(--color-ink-soft)]">
            <CompRow label={t.compare.colRegion}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top">
                  {tour.region}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colDays}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top">
                  {tour.durationDays}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colDifficulty}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top capitalize">
                  {tour.difficulty.toLowerCase()}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colBikeTypes}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top">
                  {tour.bikeTypes}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colMaxGroup}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top">
                  {tour.maxGroup}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colDriveFromGdl}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top">
                  {Math.round(tour.driveTimeMin / 60) > 0
                    ? t.compare.driveHours.replace("{n}", String(Math.round(tour.driveTimeMin / 60)))
                    : t.compare.driveMinutes.replace("{n}", String(tour.driveTimeMin))}
                </td>
              ))}
            </CompRow>
            <CompRow label={t.compare.colFromUsd}>
              {ordered.map((tour) => (
                <td key={tour.slug} className="py-3 px-3 align-top font-medium text-[var(--color-pine)]">
                  {formatUsd(tour.basePriceUsd, locale)}
                </td>
              ))}
            </CompRow>
          </tbody>
        </table>
        <p className="mt-8">
          <Link href="/tours" className="text-sm underline underline-offset-4">
            {t.compare.backToAllTours}
          </Link>
        </p>
      </div>
    </div>
  );
}

function CompRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-[var(--color-pine)]/10">
      <th className="text-left py-3 pr-4 font-sans font-medium text-[var(--color-pine)] whitespace-nowrap">
        {label}
      </th>
      {children}
    </tr>
  );
}

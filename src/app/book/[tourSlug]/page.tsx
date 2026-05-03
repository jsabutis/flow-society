import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import {
  findSeedTourBySlug,
  listSeedBikesForBookingSelect,
} from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { getTourAvailability } from "@/lib/availability";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

type RouteParams = { tourSlug: string };

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t.booking.metaTitle };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<{ dep?: string }>;
}) {
  const { tourSlug } = await params;
  const { dep } = await searchParams;
  const { t } = await getT();

  const tour = isStaticPreviewMode()
    ? findSeedTourBySlug(tourSlug)
    : await prisma.tour.findUnique({ where: { slug: tourSlug } });
  if (!tour) notFound();

  const [departures, bikes] = await Promise.all([
    getTourAvailability(tourSlug),
    isStaticPreviewMode()
      ? Promise.resolve(listSeedBikesForBookingSelect())
      : prisma.bike.findMany({
          orderBy: [{ category: "asc" }, { brand: "asc" }],
          select: {
            slug: true,
            brand: true,
            model: true,
            category: true,
            travelMm: true,
            wheelSize: true,
            dailyRateUsd: true,
            sizesAvail: true,
            riderHeightCm: true,
          },
        }),
  ]);

  return (
    <div className="pb-24">
      <div className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-10 space-y-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { href: "/tours", label: t.ux.breadcrumbTours },
              { href: `/tours/${tourSlug}`, label: tour.name },
              { label: t.ux.breadcrumbBook },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
          <Link
            href={`/tours/${tourSlug}`}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-pine)]"
          >
            <ArrowLeft className="h-4 w-4" />{" "}
            {t.booking.backTo.replace("{tourName}", tour.name)}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
            {t.booking.bookTitle.replace("{tourName}", tour.name)}
          </h1>
          <p className="mt-2 text-[var(--color-ink-soft)]">
            {t.booking.bookIntro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-10">
        <BookingFlow
          tour={{
            slug: tour.slug,
            name: tour.name,
            region: tour.region,
            basePriceUsd: tour.basePriceUsd,
            durationDays: tour.durationDays,
            maxGroup: tour.maxGroup,
          }}
          departures={departures}
          bikes={bikes}
          initialDepartureId={dep}
        />
      </div>
    </div>
  );
}

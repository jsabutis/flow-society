import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { TourCard } from "@/components/site/tour-card";
import { CalendarStrip } from "@/components/site/calendar-strip";
import { DestinationsStrip } from "@/components/site/destinations-strip";
import { Testimonials } from "@/components/site/testimonials";
import { ParallaxHero } from "@/components/site/parallax-hero";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { getStorySummaries } from "@/lib/data/stories";
import { getGlobalReviewStats, getReviewStatsByTourIds } from "@/lib/reviews";
import { getNextDepartureFillingBySlug } from "@/lib/tour-extras";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { getT } from "@/lib/i18n/server";
import type { Dictionary } from "@/lib/i18n/server";
import { Route, UtensilsCrossed, Users, TreePine, type LucideIcon } from "lucide-react";

export default async function HomePage() {
  const { t } = await getT();
  const featured = await prisma.tour.findMany({
    take: 8,
    orderBy: { createdAt: "asc" },
    select: {
      slug: true,
      name: true,
      region: true,
      bikeTypes: true,
      difficulty: true,
      durationDays: true,
      basePriceUsd: true,
      heroImage: true,
      id: true,
    },
  });

  const [reviewStats, cardReviewStats, fillingMap] = await Promise.all([
    getGlobalReviewStats(),
    getReviewStatsByTourIds(featured.map((t) => t.id)),
    getNextDepartureFillingBySlug(featured.map((t) => t.slug)),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Flow Society",
            alternateName: "Flow Society MX",
            url: "https://flowsociety.mx",
            description:
              "E-bike experiences and trail culture in Bosque La Primavera, Jalisco. Brunch + Ride + Comunidad.",
            areaServed: "MX",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+52-33-2933-8357",
              contactType: "customer service",
              areaServed: "MX",
              availableLanguage: ["Spanish", "English"],
            },
          }),
        }}
      />
      <ParallaxHero
        reviewAvg={reviewStats.avg}
        reviewCount={reviewStats.count}
      />

      <section className="py-24 bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal as="div" className="grid md:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                {t.home.featured.eyebrow}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
                {t.home.featured.title}
              </h2>
            </div>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">
              {t.home.featured.description}
            </p>
          </Reveal>
          <RevealStagger
            stagger={0.07}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featured.map((tour) => {
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
        </div>
      </section>

      <CalendarStrip />

      <WhyUs t={t} />

      <Founder t={t} />

      <DestinationsStrip />

      <Stories t={t} />

      <Testimonials />

      <Newsletter t={t} />
    </>
  );
}

const WHY_US_ICONS: LucideIcon[] = [Route, UtensilsCrossed, Users, TreePine];

function WhyUs({ t }: { t: Dictionary }) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-12 gap-12">
        <Reveal direction="right" className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.home.whyUs.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
            {t.home.whyUs.title}
          </h2>
          <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed">
            {t.home.whyUs.description}
          </p>
        </Reveal>
        <RevealStagger
          stagger={0.12}
          className="md:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8"
        >
          {t.home.whyUs.items.map((it, i) => {
            const Icon = WHY_US_ICONS[i];
            return (
              <RevealItem key={it.title}>
                {Icon && (
                  <Icon
                    size={44}
                    strokeWidth={1.5}
                    className="mb-3 text-[var(--color-terracotta)]"
                  />
                )}
                <h3 className="font-serif text-xl">{it.title}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">
                  {it.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

function Founder({ t }: { t: Dictionary }) {
  return (
    <section className="py-24 bg-[var(--color-pine)] text-[var(--color-sand-soft)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="div" className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--color-pine-soft)]">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80"
              alt={t.home.founder.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-pine)]/60 to-transparent" />
            <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.2em] text-[var(--color-clay)]">
              {t.home.founder.role}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-clay)]">
              {t.home.founder.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              {t.home.founder.name}
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-sand-soft)]/80 leading-relaxed">
              <p>{t.home.founder.body1}</p>
              <p>{t.home.founder.body2}</p>
            </div>
            <blockquote className="mt-8 border-l-2 border-[var(--color-clay)] pl-5 italic text-[var(--color-sand-soft)]/70">
              &ldquo;{t.home.founder.quote}&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stories({ t }: { t: Dictionary }) {
  const stories = getStorySummaries()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  return (
    <section className="py-24 bg-[var(--color-sand)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="div" className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {t.home.stories.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              {t.home.stories.title}
            </h2>
          </div>
          <Link
            href="/stories"
            className="hidden md:inline-block text-sm underline underline-offset-4 hover:text-[var(--color-terracotta)]"
          >
            {t.home.stories.allStories}
          </Link>
        </Reveal>
        <RevealStagger stagger={0.1} className="grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/stories/${s.slug}`}
                className="flex h-full flex-col bg-[var(--color-sand-soft)] rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-[var(--color-pine)]/5"
              >
                <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
                  {s.kicker}
                </p>
                <h3 className="font-serif text-xl mt-2 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">
                  {s.excerpt}
                </p>
                <p className="mt-auto pt-4 text-xs text-[var(--color-ink-muted)]">
                  {s.author} &middot;{" "}
                  {t.home.stories.readMinutes.replace(
                    "{n}",
                    String(s.readMinutes),
                  )}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function Newsletter({ t }: { t: Dictionary }) {
  return (
    <section className="py-24 bg-[var(--color-sand-soft)]">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          {t.home.newsletter.eyebrow}
        </p>
        <h2 className="font-serif mt-3 max-w-2xl text-balance text-4xl leading-tight md:text-5xl">
          {t.home.newsletter.title}
        </h2>
        <p className="mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">
          {t.home.newsletter.description}
        </p>
        <NewsletterForm />
      </Reveal>
    </section>
  );
}

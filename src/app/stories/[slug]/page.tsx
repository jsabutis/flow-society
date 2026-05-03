import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { STORIES, getStory } from "@/lib/data/stories";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) {
    const { t } = await getT();
    return { title: t.storyDetail.notFound };
  }
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      authors: [story.author],
      publishedTime: story.date,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const { locale, t } = await getT();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const relatedTour =
    story.relatedTourSlug != null
      ? await prisma.tour.findUnique({
          where: { slug: story.relatedTourSlug },
          select: { slug: true, name: true, region: true },
        })
      : null;

  const others = STORIES.filter((s) => s.slug !== story.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 pt-12 space-y-4">
        <SiteBreadcrumbs
          items={[
            { href: "/", label: t.ux.breadcrumbHome },
            { href: "/stories", label: t.ux.breadcrumbStories },
            { label: story.title },
          ]}
          className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
        />
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-pine)]"
        >
          <ArrowLeft className="h-4 w-4" /> {t.storyDetail.allStories}
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-5 lg:px-8 mt-10">
        <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
          {story.kicker}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
          {story.title}
        </h1>
        <p className="mt-6 text-lg text-[var(--color-ink-soft)] leading-relaxed">
          {story.excerpt}
        </p>
        <div className="mt-8 pt-6 border-t border-[var(--color-pine)]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-ink-muted)]">
          <span>{t.storyDetail.by.replace("{author}", story.author)}</span>
          <span aria-hidden>&middot;</span>
          <span>{formatDate(story.date)}</span>
          <span aria-hidden>&middot;</span>
          <span>{t.storyDetail.readMinutes.replace("{n}", String(story.readMinutes))}</span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 lg:px-8 mt-10 space-y-6 text-lg text-[var(--color-ink-soft)] leading-relaxed">
        {story.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {relatedTour && (
        <div className="mx-auto max-w-3xl px-5 lg:px-8 mt-16">
          <div className="rounded-2xl border border-[var(--color-pine)]/10 bg-[var(--color-sand-soft)] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {t.storyDetail.rideItYourself}
            </p>
            <h2 className="font-serif text-2xl mt-3">{relatedTour.name}</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{relatedTour.region}</p>
            <Button asChild className="mt-6">
              <Link href={`/tours/${relatedTour.slug}`}>{t.storyDetail.viewTourDates}</Link>
            </Button>
          </div>
        </div>
      )}

      <section className="mt-20 border-t border-[var(--color-pine)]/10 pt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl">{t.storyDetail.keepReading}</h2>
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4 hover:text-[var(--color-terracotta)]"
            >
              {t.storyDetail.allStoriesLink} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/stories/${s.slug}`}
                className="group block bg-[var(--color-sand-soft)] rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-[var(--color-pine)]/5"
              >
                <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
                  {s.kicker}
                </p>
                <h3 className="font-serif text-xl mt-2 leading-snug group-hover:text-[var(--color-pine)] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
                  {formatDate(s.date)} &middot;{" "}
                  {t.storyDetail.readMinutes.replace("{n}", String(s.readMinutes))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

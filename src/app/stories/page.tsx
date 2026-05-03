import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getStorySummaries } from "@/lib/data/stories";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.stories.metaTitle,
    description: t.stories.metaDescription,
  };
}

export default async function StoriesPage() {
  const { locale, t } = await getT();
  const stories = getStorySummaries().sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const [featured, ...rest] = stories;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { label: t.ux.breadcrumbStories },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.stories.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight max-w-3xl">
            {t.stories.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
            {t.stories.intro}
          </p>
        </div>
      </section>

      {featured && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link
              href={`/stories/${featured.slug}`}
              className="group block bg-white rounded-3xl p-8 lg:p-12 hover:shadow-lg transition-all duration-300 border border-[var(--color-pine)]/5"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <span className="text-[var(--color-terracotta)]">
                  {t.stories.latestBadge} &middot; {featured.kicker}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl mt-4 leading-tight max-w-3xl group-hover:text-[var(--color-pine)] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-ink-muted)]">
                <span>{t.stories.by.replace("{author}", featured.author)}</span>
                <span aria-hidden>&middot;</span>
                <span>{formatDate(featured.date)}</span>
                <span aria-hidden>&middot;</span>
                <span>{t.stories.readMinutes.replace("{n}", String(featured.readMinutes))}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[var(--color-pine)] font-medium">
                  {t.stories.readTheStory}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl">{t.stories.moreFromTrail}</h2>
            <p className="text-sm text-[var(--color-ink-muted)]">
              {t.stories.storiesCount.replace("{n}", String(stories.length))}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((s) => (
              <Link
                key={s.slug}
                href={`/stories/${s.slug}`}
                className="group flex flex-col bg-white rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-[var(--color-pine)]/5"
              >
                <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
                  {s.kicker}
                </p>
                <h3 className="font-serif text-2xl mt-2 leading-snug group-hover:text-[var(--color-pine)] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
                  {s.excerpt}
                </p>
                <div className="mt-6 pt-5 border-t border-[var(--color-pine)]/10 flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                  <span>{s.author}</span>
                  <span>
                    {formatDate(s.date)} &middot;{" "}
                    {t.stories.readMinutes.replace("{n}", String(s.readMinutes))}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

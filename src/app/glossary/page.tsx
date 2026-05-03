import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.ux.glossary.metaTitle,
    description: t.ux.glossary.metaDescription,
  };
}

export default async function GlossaryPage() {
  const { t } = await getT();
  const u = t.ux.glossary;
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { label: t.ux.breadcrumbGlossary },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 pb-16">
          <h1 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">{u.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
            {u.intro}
          </p>
        </div>
      </section>

      <section className="py-16">
        <dl className="mx-auto max-w-3xl px-5 lg:px-8 space-y-10">
          {u.terms.map((entry) => (
            <div key={entry.term} className="border-b border-[var(--color-pine)]/10 pb-10 last:border-0">
              <dt className="font-serif text-xl text-[var(--color-pine)]">{entry.term}</dt>
              <dd className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.ux.tripPrep.metaTitle,
    description: t.ux.tripPrep.metaDescription,
  };
}

export default async function TripPrepPage() {
  const { t } = await getT();
  const u = t.ux.tripPrep;
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { label: t.ux.breadcrumbTripPrep },
            ]}
            className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 pb-16">
          <h1 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">{u.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
            {u.intro}
          </p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/glossary"
              className="text-[var(--color-terracotta)] underline underline-offset-4 hover:no-underline"
            >
              {u.glossaryLink}
            </Link>
            <Link
              href="/ride-fit"
              className="text-[var(--color-terracotta)] underline underline-offset-4 hover:no-underline"
            >
              {u.rideFitLink}
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 space-y-14">
          {u.sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-serif text-2xl">{sec.title}</h2>
              <ul className="mt-4 space-y-3 list-disc pl-5 text-[var(--color-ink-soft)]">
                {sec.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.ux.rideFit.metaTitle,
    description: t.ux.rideFit.metaDescription,
  };
}

export default async function RideFitPage() {
  const { t } = await getT();
  const u = t.ux.rideFit;
  const cols = u.columns;
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { label: t.ux.breadcrumbRideFit },
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

      <section className="py-12 overflow-x-auto">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <table className="w-full min-w-[640px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-pine)]/20">
                <th className="py-3 pr-4 text-left font-medium text-[var(--color-ink-muted)] w-[28%]" />
                <th className="py-3 px-2 text-left font-serif text-base">{cols.beginner}</th>
                <th className="py-3 px-2 text-left font-serif text-base">{cols.intermediate}</th>
                <th className="py-3 px-2 text-left font-serif text-base">{cols.advanced}</th>
              </tr>
            </thead>
            <tbody>
              {u.rows.map((row) => (
                <tr key={row.label} className="border-b border-[var(--color-pine)]/10 align-top">
                  <th className="py-4 pr-4 text-left font-medium text-[var(--color-pine)]">
                    {row.label}
                  </th>
                  <td className="py-4 px-2 text-[var(--color-ink-soft)] leading-relaxed">
                    {row.beginner}
                  </td>
                  <td className="py-4 px-2 text-[var(--color-ink-soft)] leading-relaxed">
                    {row.intermediate}
                  </td>
                  <td className="py-4 px-2 text-[var(--color-ink-soft)] leading-relaxed">
                    {row.advanced}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-sand)] border-y border-[var(--color-pine)]/10">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
          <h2 className="font-serif text-2xl">{u.notSureTitle}</h2>
          <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">{u.notSureBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="primary">
              <a href="https://wa.me/523329338357" target="_blank" rel="noopener noreferrer">
                {u.contactCta}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tours">{u.bookCta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

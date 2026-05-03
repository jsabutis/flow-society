import Link from "next/link";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.ux.howItWorks.metaTitle,
    description: t.ux.howItWorks.metaDescription,
  };
}

export default async function HowItWorksPage() {
  const { t } = await getT();
  const u = t.ux.howItWorks;
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-4">
          <SiteBreadcrumbs
            items={[
              { href: "/", label: t.ux.breadcrumbHome },
              { label: t.ux.breadcrumbHowItWorks },
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
        <div className="mx-auto max-w-3xl px-5 lg:px-8 space-y-12">
          {u.steps.map((step) => (
            <div key={step.title}>
              <h2 className="font-serif text-2xl">{step.title}</h2>
              <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="support"
        className="py-16 bg-[var(--color-sand)] border-y border-[var(--color-pine)]/10 scroll-mt-24"
      >
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl">{u.supportTitle}</h2>
          <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">{u.supportBody}</p>
          <Button asChild className="mt-8" variant="primary">
            <Link href="/contact">{u.supportCta}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

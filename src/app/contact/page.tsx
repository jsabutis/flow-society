import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
  };
}

export default async function ContactPage() {
  const { t } = await getT();
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.contact.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight max-w-3xl">
            {t.contact.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed text-lg">
            {t.contact.intro}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 grid sm:grid-cols-3 gap-6">
          <Card icon={<Mail className="h-5 w-5" />} title={t.contact.emailHeading}>
            <a href="mailto:hola@flowsociety.mx" className="underline">
              hola@flowsociety.mx
            </a>
          </Card>
          <Card icon={<Phone className="h-5 w-5" />} title={t.contact.phoneHeading}>
            +52 33 2933 8357
          </Card>
          <Card
            icon={<MessageCircle className="h-5 w-5" />}
            title={t.contact.whatsappHeading}
          >
            <a
              href="https://wa.me/523329338357"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              +52 33 2933 8357
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-[var(--color-pine)]/10 p-6">
      <div className="flex items-center gap-2 text-[var(--color-terracotta)]">
        {icon}
        <p className="text-xs uppercase tracking-wide">{title}</p>
      </div>
      <p className="mt-2 text-[var(--color-pine)]">{children}</p>
    </div>
  );
}

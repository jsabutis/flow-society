import Link from "next/link";
import { Logo } from "./logo";
import { getT } from "@/lib/i18n/server";

export async function SiteFooter() {
  const { t } = await getT();
  return (
    <footer className="mt-24 border-t border-[var(--color-pine)]/10 bg-[var(--color-pine)] text-[var(--color-sand-soft)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 border-b border-[var(--color-sand-soft)]/10">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-soft)]/60 text-center mb-5">
          {t.footer.partnersHeading}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[var(--color-sand-soft)]/70">
          <li>Bosque La Primavera</li>
          <li>Specialized · Trek · Giant E-MTB</li>
          <li>After Ride Lounge</li>
          <li>Trail care &amp; conservation</li>
          <li>Comunidad multidisciplinaria</li>
        </ul>
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="text-[var(--color-sand-soft)]">
            <Logo wordmarkClassName="brightness-0 invert" />
          </div>
          <p className="mt-4 max-w-md text-sm text-[var(--color-sand-soft)]/75 font-sans leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base mb-3">{t.footer.adventuresHeading}</h4>
          <ul className="space-y-2 text-sm text-[var(--color-sand-soft)]/75">
            <li>
              <Link href="/tours" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.allTours}
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.calendar}
              </Link>
            </li>
            <li>
              <Link href="/bikes" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.bikeFleet}
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.stories}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base mb-3">{t.footer.resourcesHeading}</h4>
          <ul className="space-y-2 text-sm text-[var(--color-sand-soft)]/75">
            <li>
              <Link href="/how-it-works" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.linkHowItWorks}
              </Link>
            </li>
            <li>
              <Link href="/trip-prep" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.linkTripPrep}
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.linkGlossary}
              </Link>
            </li>
            <li>
              <Link href="/ride-fit" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.linkRideFit}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base mb-3">{t.footer.contactHeading}</h4>
          <ul className="space-y-2 text-sm text-[var(--color-sand-soft)]/75">
            <li>
              <Link href="/contact" className="hover:text-[var(--color-sand-soft)]">
                {t.footer.getInTouch}
              </Link>
            </li>
            <li>Bosque La Primavera, Jalisco</li>
            <li>
              <a
                href="https://wa.me/523329338357"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-sand-soft)]"
              >
                +52 33 2933 8357 · WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:hola@flowsociety.mx"
                className="hover:text-[var(--color-sand-soft)]"
              >
                hola@flowsociety.mx
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-sand-soft)]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-[var(--color-sand-soft)]/60">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

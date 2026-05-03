"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useT } from "./language-provider";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV: { href: string; label: string }[] = [
    { href: "/tours", label: t.header.nav.tours },
    { href: "/calendar", label: t.header.nav.calendar },
    { href: "/stories", label: t.header.nav.stories },
    { href: "/about", label: t.header.nav.about },
  ];

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-[background-color,border-color,box-shadow,height] duration-300 ease-out ${
        scrolled
          ? "bg-[var(--color-sand-soft)]/95 border-b border-[var(--color-pine)]/15 shadow-[0_4px_24px_-12px_rgba(31,51,41,0.25)]"
          : "bg-[var(--color-sand-soft)]/70 border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between transition-[height] duration-300 ease-out ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Logo />

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-medium hover:text-[var(--color-terracotta)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5 text-sm">
          <LanguageSwitcher />
          <Button asChild variant="primary" size="sm">
            <Link href="/tours">{t.header.bookTour}</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="p-2 -mr-2"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-pine)]/10 bg-[var(--color-sand-soft)]">
          <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-3 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-1.5 font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link href="/tours" onClick={() => setOpen(false)}>
                {t.header.bookTour}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

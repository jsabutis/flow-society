import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { LanguageProvider } from "@/components/site/language-provider";
import { getDictionary, getLocale } from "@/lib/i18n/server";

const sans = Inter({
  variable: "--font-sans-base",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowsociety.mx"),
  title: {
    default: "Flow Society \u00b7 E-Bike Experiences & Trail Culture in Jalisco",
    template: "%s \u00b7 Flow Society",
  },
  description:
    "E-bike experiences, brunch & after-ride lounge, membership and camping in Bosque La Primavera, Jalisco. Brunch + Ride + Comunidad.",
  openGraph: {
    title: "Flow Society \u00b7 Join the flow",
    description:
      "Premium e-bike rides through Bosque La Primavera \u2014 small groups, after-ride lounge, level-adapted tours, membership and camping experiences.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return (
    <html
      lang={locale}
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-[var(--color-sand-soft)] text-[var(--color-pine)]">
        <LanguageProvider locale={locale} dictionary={dictionary}>
          <a href="#main-content" className="skip-link">
            {dictionary.ux.skipToMain}
          </a>
          <ScrollProgress />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}

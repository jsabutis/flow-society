export const LOCALES = ["en", "es", "de", "pt"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "mtb_locale";

export const LOCALE_LABELS: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  es: { native: "Espa\u00F1ol", english: "Spanish", flag: "\u{1F1EA}\u{1F1F8}" },
  de: { native: "Deutsch", english: "German", flag: "\u{1F1E9}\u{1F1EA}" },
  pt: { native: "Portugu\u00EAs", english: "Portuguese", flag: "\u{1F1F5}\u{1F1F9}" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

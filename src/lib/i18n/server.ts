import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import es from "./dictionaries/es";
import de from "./dictionaries/de";
import pt from "./dictionaries/pt";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  de,
  pt,
};

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export async function getT(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a Mexican-peso price. Kept as `formatUsd` for backwards-compat with
 * the many call sites that already import this name; the function now formats
 * MXN values (Flow Society publishes prices in pesos).
 */
export function formatUsd(value: number, locale: string = "es-MX") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Alias with the more accurate name; same behavior. */
export const formatPrice = formatUsd;

export function formatDateRange(
  start: Date,
  end: Date,
  locale: string = "en-US",
) {
  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const sm = start.toLocaleString(locale, { month: "short" });
  const em = end.toLocaleString(locale, { month: "short" });
  if (sameMonth) {
    return `${sm} ${start.getDate()}\u2013${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${sm} ${start.getDate()} \u2013 ${em} ${end.getDate()}, ${end.getFullYear()}`;
}

export function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

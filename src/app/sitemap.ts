import type { MetadataRoute } from "next";
import { bikes as seedBikes } from "@/lib/data/bikes";
import { STORIES } from "@/lib/data/stories";
import { tours as seedTours } from "@/lib/data/tours";
import { prisma } from "@/lib/db";
import { isStaticPreviewMode } from "@/lib/static-preview";

const BASE = process.env.SITE_URL ?? "https://flowsociety.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const tours = isStaticPreviewMode()
    ? seedTours.map((t) => ({ slug: t.slug, updatedAt: now }))
    : await prisma.tour.findMany({ select: { slug: true, updatedAt: true } });
  const bikes = isStaticPreviewMode()
    ? seedBikes.map((b) => ({ slug: b.slug }))
    : await prisma.bike.findMany({ select: { slug: true } });

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tours",
    "/bikes",
    "/calendar",
    "/about",
    "/contact",
    "/stories",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...tours.map((t) => ({
      url: `${BASE}/tours/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...bikes.map((b) => ({
      url: `${BASE}/bikes/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...STORIES.map((s) => ({
      url: `${BASE}/stories/${s.slug}`,
      lastModified: new Date(s.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

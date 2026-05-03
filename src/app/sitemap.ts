import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { STORIES } from "@/lib/data/stories";

const BASE = process.env.SITE_URL ?? "https://flowsociety.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, bikes] = await Promise.all([
    prisma.tour.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.bike.findMany({ select: { slug: true } }),
  ]);

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

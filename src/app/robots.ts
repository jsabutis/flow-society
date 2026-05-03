import type { MetadataRoute } from "next";

const BASE = process.env.SITE_URL ?? "https://flowsociety.mx";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/book/*/confirmation"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Prefer explicit site URL, otherwise build from Vercel env.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  const config: MetadataRoute.Robots = {
    rules: [{ userAgent: "*", allow: "/" }],
    // Only emit sitemap/host if we resolved a base URL
    ...(base ? { sitemap: `${base}/sitemap.xml`, host: base } : {}),
  };

  return config;
}

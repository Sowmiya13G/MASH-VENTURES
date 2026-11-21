import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    (Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production");

  return {
    rules: isPreview
      ? [
          {
            userAgent: "*",
            disallow: "/",
          },
        ]
      : [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/_next/", "/admin/"],
          },
          {
            userAgent: "Googlebot",
            allow: "/",
            disallow: ["/api/", "/_next/"],
          },
        ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

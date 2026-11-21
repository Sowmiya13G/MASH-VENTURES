import type { NextConfig } from "next";

const isPreview = process.env.VERCEL_ENV === "preview" || (Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Prevent Vercel staging and branch previews from leaking duplicate indexing to search engines
  ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // Enforce consistent URLs without trailing slash to prevent duplicate content indexing
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/characters/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/models/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // 301 Permanent Canonical Redirection: apex domain -> www canonical domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "mashventures.in",
          },
        ],
        destination: "https://www.mashventures.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

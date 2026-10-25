# MASH VENTURES: full source code

Every file in the project. Create each path as shown, or just unzip `mash-ventures.zip`.

Run: `npm install`, copy `.env.example` to `.env.local`, then `npm run dev`.


## Contents

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.env.example`
- `.gitignore`
- `public/logo.svg`
- `src/app/about/page.tsx`
- `src/app/api/enquiry/route.ts`
- `src/app/characters/[slug]/page.tsx`
- `src/app/characters/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/error.tsx`
- `src/app/experiences/[slug]/page.tsx`
- `src/app/experiences/page.tsx`
- `src/app/globals.css`
- `src/app/icon.tsx`
- `src/app/layout.tsx`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/Analytics.tsx`
- `src/components/BookingForm.tsx`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/components/sections/BookingSection.tsx`
- `src/components/sections/CharactersSection.tsx`
- `src/components/sections/ExperiencesSection.tsx`
- `src/components/sections/FaqSection.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/TaglineBand.tsx`
- `src/components/sections/WhereWeCreate.tsx`
- `src/components/sections/WhyMash.tsx`
- `src/components/ui/CharacterVisual.tsx`
- `src/components/ui/JsonLd.tsx`
- `src/components/ui/MotionProvider.tsx`
- `src/components/ui/Reveal.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/ui/styles.ts`
- `src/data/characters.ts`
- `src/data/experiences.ts`
- `src/data/faqs.ts`
- `src/lib/enquiry.ts`
- `src/lib/seo.ts`
- `src/lib/site.ts`


---

### `package.json`

```json
{
  "name": "mash-ventures",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource-variable/space-grotesk": "^5.3.0",
    "@hookform/resolvers": "^3.9.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.468.0",
    "next": "^15.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.7",
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.39.5",
    "eslint-config-next": "^15.5.28",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
```

---

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
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
    ];
  },
};

export default nextConfig;
```

---

### `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

---

### `eslint.config.mjs`

```js
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

---

### `.env.example`

```
# Copy this file to .env.local and fill in the values.

# Final live domain (no trailing slash). Used for canonical URLs, sitemap and Open Graph.
NEXT_PUBLIC_SITE_URL=https://www.mashventures.in

# Public contact details (shown on the site and in structured data)
NEXT_PUBLIC_CONTACT_EMAIL=hello@mashventures.in
NEXT_PUBLIC_PHONE=+91XXXXXXXXXX
# WhatsApp number in international format, digits only, e.g. 919876543210
NEXT_PUBLIC_WHATSAPP=91XXXXXXXXXX

# Social profiles (optional, used for Google "sameAs" links)
NEXT_PUBLIC_LINKEDIN=
NEXT_PUBLIC_INSTAGRAM=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Booking emails via Resend (https://resend.com)
RESEND_API_KEY=
# Where enquiries are delivered
ENQUIRY_TO_EMAIL=you@mashventures.in
# Verified sender. Until your domain is verified in Resend, use the default below.
ENQUIRY_FROM_EMAIL="MASH VENTURES <onboarding@resend.dev>"

# Google Search Console verification token (optional)
NEXT_PUBLIC_GSC_VERIFICATION=
```

---

### `.gitignore`

```
node_modules
.next
out
.env
.env.local
.env.*.local
.vercel
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

---

### `public/logo.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="MASH VENTURES logo"><rect width="512" height="512" rx="96" fill="#e10600"/><path d="M104 392V120h56l96 148 96-148h56v272h-52V208l-100 152h-8L156 208v184z" fill="#fff"/></svg>
```

---

### `src/app/about/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import WhyMash from "@/components/sections/WhyMash";
import TaglineBand from "@/components/sections/TaglineBand";
import { btnPrimary, container } from "@/components/ui/styles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About MASH VENTURES | Robotic Character Experience Company",
  description:
    "MASH VENTURES is an experience-based company creating larger-than-life robotic character experiences for brands, malls, corporates and celebrations in India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal pb-24 pt-36 sm:pb-32">
        <div className={container}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">About Us</p>
          <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            More Than Characters. Extraordinary Experiences.
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5 text-lg leading-relaxed text-chrome/80">
              <p>
                MASH VENTURES is an experience-based company specialising in robotic character appearances and
                immersive character entertainment.
              </p>
              <p>
                Our mission is to transform ordinary occasions into extraordinary experiences through larger-than-life
                robotic characters that capture attention, spark excitement and create lasting memories.
              </p>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-chrome/80">
              <p>
                From interactive meet-and-greets to high-impact brand experiences, we help businesses and individuals
                create moments that people remember long after the experience ends.
              </p>
              <p>
                Our vision is to build a new world of character-driven entertainment powered by creativity, innovation
                and futuristic design.
              </p>
            </div>
          </div>
          <p className="mt-12 border-l-4 border-mash-red pl-5 text-xl font-semibold">
            We don&apos;t organise events. We create extraordinary experiences through robotic characters.
          </p>
          <Link href="/contact#book" className={`${btnPrimary} mt-10`}>
            Book an Experience
          </Link>
        </div>
      </section>
      <WhyMash />
      <TaglineBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
```

---

### `src/app/api/enquiry/route.ts`

```ts
import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const EMAIL_TIMEOUT_MS = 8_000;

/* ---------- Rate limiting ---------- */
// In-memory, per server instance. Fine for a single instance or low traffic.
// For multi-instance production, replace with Upstash Redis or similar.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

/* ---------- Email ---------- */
const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value = "") => value.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type Mail = { to: string; subject: string; html: string; replyTo?: string };

async function sendEmail({ to, subject, html, replyTo }: Mail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "MASH VENTURES <onboarding@resend.dev>",
      to: [to],
      subject: singleLine(subject),
      html,
      reply_to: replyTo,
    }),
    signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

function teamEmailHtml(d: EnquiryInput): string {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company || "-"],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Location", d.location],
    ["Preferred date", d.date],
    ["Experience", d.experience],
    ["Character", d.character],
    ["Duration", d.duration],
    ["Requirements", d.requirements || "-"],
  ];
  const body = rows
    .map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${k}</b></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`)
    .join("");
  return `<h2>New enquiry: ${escapeHtml(d.experience)}</h2><table cellpadding="8" style="border-collapse:collapse">${body}</table>`;
}

function customerEmailHtml(d: EnquiryInput): string {
  return `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="color:#e10600">Thank you, ${escapeHtml(d.name)}.</h2>
<p>We have received your enquiry for <b>${escapeHtml(d.experience)}</b> with <b>${escapeHtml(d.character)}</b> on <b>${escapeHtml(d.date)}</b>.</p>
<p>Our team will contact you shortly with availability and next steps.</p>
<p style="margin-top:28px"><b>MASH VENTURES</b><br>${SITE.taglinePrimary} ${SITE.taglineSecondary}</p></div>`;
}

/* ---------- Handler ---------- */
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "Too many requests. Please try again in a few minutes." }, 429);
  }

  // Read as text first so oversized payloads are rejected before parsing.
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend it worked so they learn nothing.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message ?? "Please check the form and try again." }, 400);
  }
  const data = parsed.data;

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry:dev] Email is not configured. Enquiry received:", data);
      return json({ ok: true, dev: true });
    }
    console.error("[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL are not set.");
    return json({ error: "Our enquiry service is temporarily unavailable. Please contact us directly." }, 503);
  }

  // Send both emails and wait for them: serverless platforms can freeze a function
  // as soon as the response is returned, which would drop any un-awaited work.
  const [team, customer] = await Promise.allSettled([
    sendEmail({
      to: ENQUIRY_TO_EMAIL,
      subject: `New enquiry: ${data.experience} (${data.name})`,
      html: teamEmailHtml(data),
      replyTo: data.email,
    }),
    sendEmail({
      to: data.email,
      subject: "We received your MASH VENTURES enquiry",
      html: customerEmailHtml(data),
    }),
  ]);

  if (customer.status === "rejected") console.error("[enquiry] confirmation email failed:", customer.reason);

  // The enquiry only counts as delivered if our own team got it.
  if (team.status === "rejected") {
    console.error("[enquiry] team notification failed:", team.reason);
    return json({ error: "We couldn't send your enquiry just now. Please try again or contact us directly." }, 502);
  }

  return json({ ok: true });
}
```

---

### `src/app/characters/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import CharacterVisual from "@/components/ui/CharacterVisual";
import JsonLd from "@/components/ui/JsonLd";
import BookingSection from "@/components/sections/BookingSection";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import { availableCharacters, getCharacter } from "@/data/characters";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return availableCharacters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/characters/${c.slug}`,
  });
}

export default async function CharacterPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) notFound();

  const others = availableCharacters.filter((o) => o.slug !== c.slug);

  return (
    <>
      <article className="bg-charcoal pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-chrome/60">
            <Link href="/" className="hover:text-white">Home</Link> /{" "}
            <Link href="/characters" className="hover:text-white">Characters</Link> /{" "}
            <span className="text-white">{c.name}</span>
          </nav>

          <div className="mt-10 grid items-start gap-12 pb-24 lg:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-gunmetal">
              <CharacterVisual character={c} priority sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">{c.role}</p>
              <h1 className="mt-4 text-5xl font-bold uppercase tracking-tight sm:text-7xl">{c.name}</h1>
              <p className="mt-6 text-xl leading-relaxed text-chrome">{c.summary}</p>
              <div className="mt-6 space-y-4 leading-relaxed text-chrome/75">
                {c.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <Check size={18} className="text-mash-red" /> {h}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Ideal for</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {c.idealFor.map((i) => (
                  <li key={i} className="rounded-lg border border-white/10 bg-gunmetal/60 px-4 py-3 text-sm">
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={`/contact?character=${c.slug}#book`} className={btnPrimary}>
                  Book This Experience
                </Link>
                <Link href="/characters" className={btnGhost}>
                  All Characters
                </Link>
              </div>
            </div>
          </div>

          <section aria-labelledby="more-title" className="border-t border-white/10 pb-24 pt-12">
            <h2 id="more-title" className="text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              More characters
            </h2>
            <ul className="mt-6 flex flex-wrap gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/characters/${o.slug}`}
                    className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-mash-red hover:text-mash-red"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <BookingSection defaultCharacter={c.name} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Characters", path: "/characters" },
            { name: c.name, path: `/characters/${c.slug}` },
          ]),
          serviceJsonLd({
            name: `${c.name} robotic character experience`,
            description: c.seoDescription,
            path: `/characters/${c.slug}`,
            serviceType: "Robotic character appearance",
          }),
        ]}
      />
    </>
  );
}
```

---

### `src/app/characters/page.tsx`

```tsx
import type { Metadata } from "next";
import CharactersSection from "@/components/sections/CharactersSection";
import JsonLd from "@/components/ui/JsonLd";
import { container } from "@/components/ui/styles";
import { availableCharacters } from "@/data/characters";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Robotic Characters for Events, Malls & Brands",
  description:
    "Meet Striker, Titan and Colossus, MASH VENTURES' larger-than-life robotic characters for malls, launches, corporate events and celebrations across India.",
  path: "/characters",
  keywords: ["robotic characters India", "robot characters for events", "robot mascot hire"],
});

export default function CharactersPage() {
  return (
    <>
      <header className="bg-charcoal pt-36">
        <div className={container}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">The Characters</p>
          <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Meet Our Robotic Characters
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chrome/80">
            Each MASH VENTURES character has its own presence, personality and purpose. Choose the one that fits your
            venue, audience and brand.
          </p>
        </div>
      </header>
      <CharactersSection asPage />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Characters", path: "/characters" },
          ]),
          itemListJsonLd(
            "Robotic characters",
            availableCharacters.map((c) => ({ name: c.name, path: `/characters/${c.slug}` })),
          ),
        ]}
      />
    </>
  );
}
```

---

### `src/app/contact/page.tsx`

```tsx
import type { Metadata } from "next";
import BookingSection from "@/components/sections/BookingSection";
import JsonLd from "@/components/ui/JsonLd";
import { container } from "@/components/ui/styles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Book a Robotic Character Experience | Contact",
  description:
    "Request a robotic character experience for your mall, brand, corporate event, launch or celebration. Share your date and venue and MASH VENTURES will respond with availability.",
  path: "/contact",
});

// Static page. Links like /contact?character=titan are pre-selected by <BookingForm> in the browser.
export default function ContactPage() {
  return (
    <>
      <div className="pt-20">
        <BookingSection asPage />
      </div>
      <section className="bg-charcoal py-16" aria-label="Contact details">
        <div className={`${container} grid gap-8 text-center sm:grid-cols-3`}>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Email</h2>
            <a href={`mailto:${SITE.email}`} className="mt-3 block text-lg hover:text-mash-red">
              {SITE.email}
            </a>
          </div>
          {SITE.phone && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Phone</h2>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="mt-3 block text-lg hover:text-mash-red">
                {SITE.phone}
              </a>
            </div>
          )}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Service area</h2>
            <p className="mt-3 text-lg">Across India</p>
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact MASH VENTURES",
            url: `${SITE.url}/contact`,
            about: { "@id": `${SITE.url}/#organization` },
          },
        ]}
      />
    </>
  );
}
```

---

### `src/app/error.tsx`

```tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { btnGhost, btnPrimary } from "@/components/ui/styles";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mash-red">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-bold uppercase sm:text-6xl">System error.</h1>
        <p className="mx-auto mt-5 max-w-md text-chrome/70">An unexpected error occurred. Please try again.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className={btnPrimary}>
            Try again
          </button>
          <Link href="/" className={btnGhost}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### `src/app/experiences/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import BookingSection from "@/components/sections/BookingSection";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import { availableCharacters } from "@/data/characters";
import { experiences, getExperience } from "@/data/experiences";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) return {};
  return buildMetadata({
    title: e.seoTitle,
    description: e.seoDescription,
    path: `/experiences/${e.slug}`,
    keywords: e.keywords,
  });
}

export default async function ExperiencePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();
  const Icon = e.icon;
  const related = experiences.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <>
      <article className="bg-charcoal pb-24 pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-chrome/60">
            <Link href="/" className="hover:text-white">Home</Link> /{" "}
            <Link href="/experiences" className="hover:text-white">Experiences</Link> /{" "}
            <span className="text-white">{e.title}</span>
          </nav>

          <div className="mt-10 max-w-3xl">
            <Icon className="text-mash-red" size={44} strokeWidth={1.5} aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl">{e.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-chrome">{e.blurb}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-chrome/75">
              {e.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Ideal for</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {e.idealFor.map((i) => (
                <li key={i} className="rounded-lg border border-white/10 bg-gunmetal/60 px-4 py-3 text-sm">
                  {i}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              Characters for this experience
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {availableCharacters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/characters/${c.slug}`}
                    className="inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition hover:border-mash-red hover:text-mash-red"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={`/contact?type=${encodeURIComponent(e.title)}#book`} className={btnPrimary}>
                Request This Experience
              </Link>
              <Link href="/experiences" className={btnGhost}>
                All Experiences
              </Link>
            </div>
          </div>

          <section aria-labelledby="related-title" className="mt-20 border-t border-white/10 pt-12">
            <h2 id="related-title" className="text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              Related experiences
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/experiences/${r.slug}`}
                    className="block h-full rounded-xl border border-white/10 bg-gunmetal/60 p-5 font-semibold uppercase tracking-wide transition hover:border-mash-red"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <BookingSection defaultExperience={e.title} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
            { name: e.title, path: `/experiences/${e.slug}` },
          ]),
          serviceJsonLd({
            name: e.title,
            description: e.seoDescription,
            path: `/experiences/${e.slug}`,
            serviceType: e.title,
          }),
        ]}
      />
    </>
  );
}
```

---

### `src/app/experiences/page.tsx`

```tsx
import type { Metadata } from "next";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import WhereWeCreate from "@/components/sections/WhereWeCreate";
import BookingSection from "@/components/sections/BookingSection";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = buildMetadata({
  title: "Robotic Character Experiences & Brand Activations",
  description:
    "Robotic character appearances, meet and greets, brand activations, mall experiences, corporate events and celebrations by MASH VENTURES across India.",
  path: "/experiences",
  keywords: ["brand activation robot", "mall experiences", "corporate event entertainment India"],
});

export default function ExperiencesPage() {
  return (
    <>
      <div className="pt-20">
        <ExperiencesSection headingLevel="h1" />
      </div>
      <WhereWeCreate />
      <BookingSection />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
          ]),
          itemListJsonLd(
            "MASH VENTURES experiences",
            experiences.map((e) => ({ name: e.title, path: `/experiences/${e.slug}` })),
          ),
        ]}
      />
    </>
  );
}
```

---

### `src/app/globals.css`

```css
@import "tailwindcss";

@theme {
  --color-mash-red: #e10600;
  --color-mash-red-dark: #a80400;
  --color-chrome: #c9ced6;
  --color-gunmetal: #1c1f24;
  --color-charcoal: #0b0c0e;
  --font-sans: "Space Grotesk Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-display: "Space Grotesk Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}

html {
  scroll-behavior: smooth;
  background: var(--color-charcoal);
}

body {
  background: var(--color-charcoal);
  color: #fff;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-mash-red);
  color: #fff;
}

:focus-visible {
  outline: 2px solid var(--color-mash-red);
  outline-offset: 3px;
}

.bg-grid {
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}

.text-chrome-gradient {
  background: linear-gradient(180deg, #ffffff 0%, #c9ced6 55%, #7d8591 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.08); }
}

.animate-pulse-glow {
  animation: pulse-glow 6s ease-in-out infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(400%); }
}

.animate-scan {
  animation: scan 5s linear infinite;
}

/* CSS-only entrance animation: runs at first paint, no JavaScript needed (better LCP). */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}

.fade-up {
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-pulse-glow, .animate-scan, .fade-up { animation: none; }
}
```

---

### `src/app/icon.tsx`

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e10600",
          color: "#fff",
          fontSize: 22,
          fontWeight: 900,
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
```

---

### `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import MotionProvider from "@/components/ui/MotionProvider";
import JsonLd from "@/components/ui/JsonLd";
import { SITE } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "MASH VENTURES | Robotic Character Experiences in India",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "robotic character experiences",
    "robot characters for events India",
    "robot mascot hire",
    "brand activation India",
    "mall activation robot",
    "product launch entertainment",
    "corporate event robot",
    "wedding robot entertainment",
    "experiential marketing India",
    "MASH VENTURES",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: SITE.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "MASH VENTURES | Robotic Character Experiences in India",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MASH VENTURES | Robotic Character Experiences in India",
    description: SITE.description,
  },
  ...(SITE.gscVerification ? { verification: { google: SITE.gscVerification } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-mash-red focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
```

---

### `src/app/manifest.ts`

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MASH VENTURES",
    short_name: "MASH",
    description: "Robotic character experiences. Engineered to impress. Bring your brand to life.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#e10600",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
```

---

### `src/app/not-found.tsx`

```tsx
import Link from "next/link";
import { btnPrimary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mash-red">Error 404</p>
        <h1 className="mt-4 text-5xl font-bold uppercase sm:text-7xl">Signal lost.</h1>
        <p className="mx-auto mt-5 max-w-md text-chrome/70">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className={`${btnPrimary} mt-8`}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
```

---

### `src/app/opengraph-image.tsx`

```tsx
import { ImageResponse } from "next/og";

export const alt = "MASH VENTURES: Robotic character experiences. Engineered to impress.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0c0e 0%, #1c1f24 60%, #3a0300 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#e10600",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div style={{ marginLeft: 24, fontSize: 40, letterSpacing: 10, fontWeight: 700 }}>MASH VENTURES</div>
        </div>
        <div style={{ marginTop: 56, fontSize: 84, fontWeight: 800, lineHeight: 1.05, textTransform: "uppercase" }}>
          Engineered to impress.
        </div>
        <div style={{ marginTop: 20, fontSize: 52, fontWeight: 700, color: "#e10600", textTransform: "uppercase" }}>
          Bring your brand to life.
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#c9ced6" }}>
          Robotic character experiences in India
        </div>
      </div>
    ),
    size,
  );
}
```

---

### `src/app/page.tsx`

```tsx
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CharactersSection from "@/components/sections/CharactersSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import WhereWeCreate from "@/components/sections/WhereWeCreate";
import WhyMash from "@/components/sections/WhyMash";
import FaqSection from "@/components/sections/FaqSection";
import TaglineBand from "@/components/sections/TaglineBand";
import BookingSection from "@/components/sections/BookingSection";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";
import { availableCharacters } from "@/data/characters";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "MASH VENTURES | Robotic Character Experiences in India",
    description:
      "Larger-than-life robotic characters for malls, brands, corporates, exhibitions, launches and celebrations in India. Engineered to impress. Bring your brand to life.",
    path: "/",
  }),
  title: { absolute: "MASH VENTURES | Robotic Character Experiences in India" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CharactersSection />
      <ExperiencesSection />
      <WhereWeCreate />
      <WhyMash />
      <FaqSection />
      <TaglineBand />
      <BookingSection />
      <JsonLd
        data={[
          faqJsonLd(faqs),
          itemListJsonLd(
            "MASH VENTURES robotic characters",
            availableCharacters.map((c) => ({ name: c.name, path: `/characters/${c.slug}` })),
          ),
        ]}
      />
    </>
  );
}
```

---

### `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
```

---

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { availableCharacters } from "@/data/characters";
import { experiences } from "@/data/experiences";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed, honest date: search engines learn to ignore sitemaps that claim every page changes on every build.
  const lastModified = new Date(SITE.contentUpdated);

  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"]): Entry => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/characters", 0.9, "weekly"),
    ...availableCharacters.map((c) => entry(`/characters/${c.slug}`, 0.8, "monthly")),
    entry("/experiences", 0.9, "weekly"),
    ...experiences.map((e) => entry(`/experiences/${e.slug}`, 0.8, "monthly")),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.7, "monthly"),
  ];
}
```

---

### `src/components/Analytics.tsx`

```tsx
import Script from "next/script";
import { SITE } from "@/lib/site";

// Google Analytics 4 measurement IDs look like G-XXXXXXXXXX. Reject anything else
// so a bad environment value can never be injected into the inline script below.
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export default function Analytics() {
  if (!GA_ID_PATTERN.test(SITE.gaId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${SITE.gaId}');`}
      </Script>
    </>
  );
}
```

---

### `src/components/BookingForm.tsx`

```tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { DURATIONS, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { availableCharacters } from "@/data/characters";
import { experiences } from "@/data/experiences";
import { btnPrimary } from "@/components/ui/styles";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-chrome/40 transition focus:border-mash-red focus:outline-none aria-[invalid=true]:border-mash-red";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-widest text-chrome/70";

type FieldProps = {
  id: keyof EnquiryInput;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + accessible error message. */
function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-mash-red">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria attributes that link an invalid control to its error message. */
const a11y = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

type BookingFormProps = {
  defaultCharacter?: string;
  defaultExperience?: string;
  whatsappHref?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function BookingForm({ defaultCharacter = "", defaultExperience = "", whatsappHref = "" }: BookingFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { character: defaultCharacter, experience: defaultExperience },
  });

  useEffect(() => {
    // Computed on the client so the statically generated page never has a stale "today".
    setMinDate(new Date().toISOString().split("T")[0]);

    // Pre-select from links such as /contact?character=titan or /contact?type=Brand%20Activations.
    // Read client-side so /contact can stay a fast, fully static page.
    const params = new URLSearchParams(window.location.search);
    const character = availableCharacters.find((c) => c.slug === params.get("character"));
    const experience = experiences.find((e) => e.title === params.get("type"));
    if (character) setValue("character", character.name);
    if (experience) setValue("experience", experience.title);
  }, [setValue]);

  async function onSubmit(values: EnquiryInput) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");

      setStatus("sent");
      reset();
      // Optional GA4 conversion event (only fires when analytics is enabled).
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
        event_category: "booking",
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-mash-red/50 bg-gunmetal p-10 text-center">
        <CheckCircle2 className="mx-auto text-mash-red" size={48} aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-bold uppercase">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-chrome/75">
          Thank you. We have sent a confirmation to your email and our team will contact you shortly with availability
          and next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-chrome/70 underline hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2" aria-label="Booking enquiry form">
      <Field id="name" label="Full name *" error={errors.name?.message}>
        <input id="name" autoComplete="name" className={inputClass} placeholder="Your name" {...a11y("name", errors.name?.message)} {...register("name")} />
      </Field>

      <Field id="company" label="Company or organisation" error={errors.company?.message}>
        <input id="company" autoComplete="organization" className={inputClass} placeholder="Optional" {...register("company")} />
      </Field>

      <Field id="phone" label="Phone number *" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          placeholder="+91 98765 43210"
          {...a11y("phone", errors.phone?.message)}
          {...register("phone")}
        />
      </Field>

      <Field id="email" label="Email address *" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="you@company.com"
          {...a11y("email", errors.email?.message)}
          {...register("email")}
        />
      </Field>

      <Field id="location" label="Event location *" error={errors.location?.message}>
        <input id="location" className={inputClass} placeholder="Venue and city" {...a11y("location", errors.location?.message)} {...register("location")} />
      </Field>

      <Field id="date" label="Preferred date *" error={errors.date?.message}>
        <input id="date" type="date" min={minDate} className={inputClass} {...a11y("date", errors.date?.message)} {...register("date")} />
      </Field>

      <Field id="experience" label="Type of experience *" error={errors.experience?.message}>
        <select id="experience" className={inputClass} {...a11y("experience", errors.experience?.message)} {...register("experience")}>
          <option value="">Select an experience</option>
          {experiences.map((e) => (
            <option key={e.slug} value={e.title}>
              {e.title}
            </option>
          ))}
          <option value="Custom Character Experience">Custom Character Experience</option>
        </select>
      </Field>

      <Field id="character" label="Preferred character *" error={errors.character?.message}>
        <select id="character" className={inputClass} {...a11y("character", errors.character?.message)} {...register("character")}>
          <option value="">Select a character</option>
          {availableCharacters.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <Field id="duration" label="Duration required *" error={errors.duration?.message} className="sm:col-span-2">
        <select id="duration" className={inputClass} {...a11y("duration", errors.duration?.message)} {...register("duration")}>
          <option value="">Select a duration</option>
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>

      <Field id="requirements" label="Additional requirements" error={errors.requirements?.message} className="sm:col-span-2">
        <textarea
          id="requirements"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your venue, audience, branding or any special requests"
          {...a11y("requirements", errors.requirements?.message)}
          {...register("requirements")}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} w-full disabled:opacity-60 sm:w-auto`}>
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending
            </>
          ) : (
            "Request Your Experience"
          )}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm text-mash-red">
            {serverError}{" "}
            {whatsappHref && (
              <a href={whatsappHref} className="underline" target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp instead.
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
```

---

### `src/components/Footer.tsx`

```tsx
import Link from "next/link";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { experiences } from "@/data/experiences";
import { availableCharacters } from "@/data/characters";
import { container } from "@/components/ui/styles";

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-4`}>
        <div className="md:col-span-1">
          <p className="text-xl font-bold tracking-[0.18em]">MASH VENTURES</p>
          <p className="mt-4 text-sm uppercase leading-relaxed tracking-widest text-chrome/70">
            {SITE.taglinePrimary}
            <br />
            {SITE.taglineSecondary}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-chrome/60">
            Robotic character experiences for brands, malls, corporates and celebrations.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Explore</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Characters and experiences">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Experiences</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {experiences.map((e) => (
              <li key={e.slug}>
                <Link href={`/experiences/${e.slug}`} className="hover:text-white">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Characters</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {availableCharacters.map((c) => (
              <li key={c.slug}>
                <Link href={`/characters/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Contact</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            {SITE.phone && (
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Chat on WhatsApp
                </a>
              </li>
            )}
            {SITE.linkedin && (
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer me" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            )}
            {SITE.instagram && (
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer me" className="hover:text-white">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wider text-chrome/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
```

---

### `src/components/Navbar.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS, SITE } from "@/lib/site";
import { btnPrimary } from "@/components/ui/styles";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solid background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-white/10 bg-charcoal/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-mash-red text-lg font-black" aria-hidden="true">
            M
          </span>
          <span className="text-lg font-bold tracking-[0.18em]">MASH VENTURES</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "text-sm font-medium uppercase tracking-wider transition hover:text-white",
                  pathname === link.href ? "text-white" : "text-chrome/70",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact#book" className={clsx(btnPrimary, "hidden px-5 py-2.5 sm:inline-flex")}>
            Book an Experience
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-white/20 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-charcoal px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block border-b border-white/5 py-4 text-lg font-semibold uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact#book" className={clsx(btnPrimary, "mt-5 w-full")}>
            Book an Experience
          </Link>
        </div>
      )}
    </header>
  );
}
```

---

### `src/components/WhatsAppButton.tsx`

```tsx
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MASH VENTURES on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(0_0_0/0.45)] transition hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  );
}
```

---

### `src/components/sections/BookingSection.tsx`

```tsx
import { MessageCircle } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { btnGhost, container } from "@/components/ui/styles";
import { whatsappLink } from "@/lib/site";

type BookingSectionProps = {
  /** Pre-selects a character (used on character pages). */
  defaultCharacter?: string;
  /** Pre-selects an experience (used on experience pages). */
  defaultExperience?: string;
  /** Set on /contact, where this section holds the page's only <h1>. */
  asPage?: boolean;
};

export default function BookingSection({ defaultCharacter = "", defaultExperience = "", asPage = false }: BookingSectionProps) {
  const wa = whatsappLink();
  return (
    <section id="book" className="scroll-mt-20 bg-black py-24 sm:py-32" aria-labelledby="book-title">
      <div className={`${container} grid gap-14 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <SectionHeading id="book-title" eyebrow="Book an Experience" title="Request Your Experience" as={asPage ? "h1" : "h2"}>
            Tell us about your venue, date and audience. We will come back with availability and a tailored experience.
          </SectionHeading>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-8`}>
              <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
            </a>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 bg-gunmetal/60 p-6 sm:p-10">
          <BookingForm defaultCharacter={defaultCharacter} defaultExperience={defaultExperience} whatsappHref={wa} />
        </div>
      </div>
    </section>
  );
}
```

---

### `src/components/sections/CharactersSection.tsx`

```tsx
import Link from "next/link";
import { characters } from "@/data/characters";
import CharacterVisual from "@/components/ui/CharacterVisual";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";

/**
 * @param asPage Set on /characters, where the page already has its own <h1> and intro,
 *               so the section heading is omitted.
 */
export default function CharactersSection({ asPage = false }: { asPage?: boolean }) {
  return (
    <section
      id="characters"
      className="scroll-mt-20 bg-charcoal py-24 sm:py-32"
      aria-labelledby={asPage ? undefined : "characters-title"}
      aria-label={asPage ? "Our robotic characters" : undefined}
    >
      <div className={container}>
        {!asPage && (
          <SectionHeading id="characters-title" eyebrow="The Characters" title="Meet Our Characters">
            Larger-than-life robotic characters, each with its own presence, personality and impact.
          </SectionHeading>
        )}

        <ul className={`${asPage ? "" : "mt-14"} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {characters.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gunmetal transition duration-500 hover:border-mash-red/70 hover:shadow-[0_0_48px_rgb(225_6_0/0.25)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <CharacterVisual character={c} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold uppercase tracking-wide">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-chrome/70">{c.role}</p>
                    {c.available ? (
                      <div className="mt-6 flex flex-col gap-3">
                        <Link href={`/characters/${c.slug}`} className={`${btnGhost} px-4 py-3 text-xs`}>
                          Discover Character
                        </Link>
                        <Link href={`/contact?character=${c.slug}#book`} className={`${btnPrimary} px-4 py-3 text-xs`}>
                          Book This Experience
                        </Link>
                      </div>
                    ) : (
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Coming soon</p>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

---

### `src/components/sections/ExperiencesSection.tsx`

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

export default function ExperiencesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="experiences" className="scroll-mt-20 bg-black py-24 sm:py-32" aria-labelledby="experiences-title">
      <div className={container}>
        <SectionHeading id="experiences-title" eyebrow="What We Create" title="Our Experiences" as={headingLevel}>
          We don&apos;t organise events. We create extraordinary experiences powered by robotic characters.
        </SectionHeading>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => {
            const Icon = e.icon;
            return (
              <li key={e.slug} className="bg-charcoal">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link href={`/experiences/${e.slug}`} className="group flex h-full flex-col p-8 transition hover:bg-gunmetal">
                    <Icon className="text-mash-red" size={34} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-6 text-xl font-bold uppercase tracking-wide">{e.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-chrome/70">{e.blurb}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-chrome/60 transition group-hover:text-mash-red">
                      Learn more <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

---

### `src/components/sections/FaqSection.tsx`

```tsx
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

export default function FaqSection() {
  return (
    <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="faq-title">
      <div className={`${container} grid gap-14 lg:grid-cols-[1fr_1.4fr]`}>
        <SectionHeading id="faq-title" eyebrow="Good to Know" title="Frequently Asked Questions" />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {f.q}
                <Plus className="shrink-0 text-mash-red transition group-open:rotate-45" size={22} aria-hidden="true" />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-chrome/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `src/components/sections/Hero.tsx`

```tsx
import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";

/** Staggers the CSS entrance animation: <p className="fade-up" style={delay(0.2)}> */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Server component on purpose: the headline is in the HTML and animates with CSS only,
 * so it paints immediately (good for Largest Contentful Paint) and ships no extra JavaScript.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 bg-charcoal" aria-hidden="true">
        {SITE.heroVideo ? (
          <video
            className="h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={SITE.heroPoster ?? undefined}
          >
            <source src={SITE.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="bg-grid absolute inset-0" />
            <div className="animate-pulse-glow absolute right-[-10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-mash-red/30 blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-chrome/10 blur-[120px]" />
            <div className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-mash-red/10 to-transparent" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      </div>

      <div className={`${container} pb-24 pt-32`}>
        <p className="fade-up mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-mash-red sm:text-sm">
          Robotic Character Experiences in India
        </p>

        <h1
          id="hero-title"
          style={delay(0.1)}
          className="fade-up max-w-5xl text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-chrome-gradient">More Than Characters.</span>
          <br />
          <span className="text-mash-red">Extraordinary Experiences.</span>
        </h1>

        <p
          style={delay(0.3)}
          className="fade-up mt-8 text-lg font-semibold uppercase tracking-[0.2em] text-white sm:text-xl"
        >
          {SITE.taglinePrimary}
          <br />
          <span className="text-chrome/80">{SITE.taglineSecondary}</span>
        </p>

        <p style={delay(0.45)} className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-chrome/80 sm:text-lg">
          Not just a character. Not just an appearance. An experience that commands attention. We bring futuristic
          robotic characters to life through immersive interactions, spectacular appearances and unforgettable
          audience experiences.
        </p>

        <div style={delay(0.6)} className="fade-up mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/characters" className={btnPrimary}>
            Explore Our Characters
          </Link>
          <Link href="/contact#book" className={btnGhost}>
            Book an Experience
          </Link>
        </div>
      </div>

      <a
        href="#characters"
        aria-label="Scroll to characters"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-chrome/60 transition hover:text-white"
      >
        <ChevronDown size={32} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
```

---

### `src/components/sections/TaglineBand.tsx`

```tsx
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function TaglineBand() {
  return (
    <section className="relative overflow-hidden bg-mash-red py-20 sm:py-28" aria-label="Brand promise">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-5xl px-5 text-center">
        <p className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.taglinePrimary}
          <br />
          {SITE.taglineSecondary}
        </p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
          We don&apos;t organise events. We create extraordinary experiences.
        </p>
      </Reveal>
    </section>
  );
}
```

---

### `src/components/sections/WhereWeCreate.tsx`

```tsx
import Link from "next/link";
import { Briefcase, Building2, Heart, Lock, Rocket, Store } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

const places = [
  { label: "Brands & Corporates", icon: Briefcase, type: "Corporate Experiences" },
  { label: "Shopping Malls", icon: Store, type: "Shopping Mall Experiences" },
  { label: "Product Launches", icon: Rocket, type: "Brand Activations" },
  { label: "Exhibitions", icon: Building2, type: "Brand Activations" },
  { label: "Weddings & Celebrations", icon: Heart, type: "Special Celebrations" },
  { label: "Private Experiences", icon: Lock, type: "Robotic Character Appearances" },
] as const;

export default function WhereWeCreate() {
  return (
    <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="where-title">
      <div className={container}>
        <SectionHeading id="where-title" eyebrow="Where We Show Up" title="Where We Create Experiences" />
        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {places.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.label}>
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <Link
                    href={`/contact?type=${encodeURIComponent(p.type)}#book`}
                    className="group flex h-full min-h-40 flex-col justify-between rounded-2xl border border-white/10 bg-gunmetal/60 p-6 transition hover:border-mash-red/70 hover:bg-gunmetal sm:p-8"
                  >
                    <Icon
                      className="text-chrome/60 transition group-hover:text-mash-red"
                      size={30}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="mt-8 text-base font-bold uppercase tracking-wide sm:text-lg">{p.label}</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

---

### `src/components/sections/WhyMash.tsx`

```tsx
import { Cpu, Eye, Gauge, Rocket, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

const reasons = [
  {
    icon: Gauge,
    title: "Larger-than-Life Presence",
    text: "Robotic characters that naturally become the centre of attention.",
  },
  {
    icon: Cpu,
    title: "Immersive Interactions",
    text: "Experiences designed to encourage audience participation and memorable moments.",
  },
  {
    icon: Eye,
    title: "Brand Visibility",
    text: "A distinctive way to attract attention and create opportunities for meaningful brand engagement.",
  },
  {
    icon: Wrench,
    title: "Customisable Experiences",
    text: "Flexible character appearances tailored to your venue, audience and objectives.",
  },
  {
    icon: Rocket,
    title: "A Futuristic Vision",
    text: "A growing universe of robotic characters and innovative entertainment experiences.",
  },
] as const;

export default function WhyMash() {
  return (
    <section className="bg-black py-24 sm:py-32" aria-labelledby="why-title">
      <div className={container}>
        <SectionHeading id="why-title" eyebrow="Why MASH VENTURES" title="Built to Stand Out. Designed to Be Remembered." />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <li key={r.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="h-full border-t-2 border-mash-red pt-6">
                    <Icon className="text-chrome" size={28} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold uppercase leading-tight tracking-wide">{r.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-chrome/70">{r.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

---

### `src/components/ui/CharacterVisual.tsx`

```tsx
import Image from "next/image";
import type { Character } from "@/data/characters";

/**
 * Shows the character photo when one has been added (hasImage: true and a file at
 * /public/characters/<slug>.webp). Until then it renders an original, abstract robot silhouette.
 */
export default function CharacterVisual({
  character,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  character: Character;
  priority?: boolean;
  sizes?: string;
}) {
  if (character.hasImage) {
    return (
      <Image
        src={`/characters/${character.slug}.webp`}
        alt={`${character.name} robotic character by MASH VENTURES`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition duration-700 group-hover:scale-105"
      />
    );
  }

  const soon = !character.available;
  return (
    <div
      role="img"
      aria-label={soon ? "More robotic characters coming soon" : `${character.name} robotic character silhouette`}
      className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-gunmetal via-charcoal to-charcoal"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="animate-pulse-glow absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-mash-red/40 blur-3xl" />
      {soon ? (
        <p className="relative mb-24 text-center text-xs font-semibold uppercase tracking-[0.4em] text-chrome/60">
          New
          <br />
          characters
          <br />
          loading
        </p>
      ) : (
        <svg viewBox="0 0 200 300" className="relative h-[88%] w-auto" aria-hidden="true">
          <defs>
            <linearGradient id={`m-${character.slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e9edf2" />
              <stop offset="0.5" stopColor="#8b94a1" />
              <stop offset="1" stopColor="#2a2e35" />
            </linearGradient>
          </defs>
          <rect x="72" y="14" width="56" height="52" rx="10" fill={`url(#m-${character.slug})`} />
          <rect x="82" y="30" width="36" height="9" rx="4" fill="#e10600" />
          <rect x="90" y="66" width="20" height="14" fill="#555c68" />
          <path d="M40 90 L160 90 L172 150 L28 150 Z" fill={`url(#m-${character.slug})`} />
          <rect x="84" y="106" width="32" height="24" rx="4" fill="#e10600" opacity="0.9" />
          <rect x="14" y="88" width="38" height="30" rx="8" fill="#555c68" />
          <rect x="148" y="88" width="38" height="30" rx="8" fill="#555c68" />
          <rect x="20" y="118" width="22" height="86" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="158" y="118" width="22" height="86" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="62" y="150" width="76" height="46" rx="6" fill="#3a3f48" />
          <rect x="64" y="196" width="30" height="92" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="106" y="196" width="30" height="92" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="58" y="282" width="40" height="14" rx="5" fill="#e10600" />
          <rect x="102" y="282" width="40" height="14" rx="5" fill="#e10600" />
        </svg>
      )}
    </div>
  );
}
```

---

### `src/components/ui/JsonLd.tsx`

```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

---

### `src/components/ui/MotionProvider.tsx`

```tsx
"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the animation features we use (about 15 kB smaller than the full framer-motion bundle)
 * and honours the visitor's "reduce motion" operating-system setting.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
```

---

### `src/components/ui/Reveal.tsx`

```tsx
"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Fades content up once when it scrolls into view. Requires <MotionProvider> (set in the root layout). */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
```

---

### `src/components/ui/SectionHeading.tsx`

```tsx
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  /** Heading level. Use h1 only once per page. */
  as?: "h1" | "h2";
  /** Id placed on the heading so the parent <section> can reference it with aria-labelledby. */
  id?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  id,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">{eyebrow}</p>}
      <Tag id={id} className="text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </Tag>
      {children && <div className="mt-5 text-base leading-relaxed text-chrome/80 sm:text-lg">{children}</div>}
    </Reveal>
  );
}
```

---

### `src/components/ui/styles.ts`

```ts
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-mash-red px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-mash-red-dark hover:shadow-[0_0_32px_rgb(225_6_0/0.45)] active:scale-[0.98]";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10 active:scale-[0.98]";

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";
```

---

### `src/data/characters.ts`

```ts
export type Character = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  description: string[];
  idealFor: string[];
  highlights: string[];
  available: boolean;
  /** Set to true after adding /public/characters/<slug>.webp */
  hasImage: boolean;
  seoTitle: string;
  seoDescription: string;
};

/*
 * NOTE ON NAMES: Bumblebee, Optimus Prime and Hulkbuster are trademarked by their owners.
 * Until you hold commercial licences, the public site uses original names and describes
 * the characters as "inspired by" futuristic robotics. Change names here when licensed.
 */
export const characters: Character[] = [
  {
    slug: "striker",
    name: "Striker",
    role: "The bold, energetic crowd favourite",
    summary: "A vivid, high-energy robotic character that pulls crowds in and keeps them smiling.",
    description: [
      "Striker is the character people see first and remember longest. Bold colours, sharp mechanical detailing and playful movement make it a natural centre of attention in busy malls, expos and family venues.",
      "Built for interaction, Striker greets guests, poses for photographs and brings a burst of futuristic energy to promotions and celebrations.",
    ],
    idealFor: ["Shopping mall footfall drives", "Family and kids' events", "Birthdays and celebrations", "Retail launches and festivals"],
    highlights: ["High-energy crowd engagement", "Photo-friendly design", "Meet-and-greet ready"],
    available: true,
    hasImage: false,
    seoTitle: "Striker | Energetic Robotic Character for Malls & Events",
    seoDescription:
      "Meet Striker, MASH VENTURES' bold, high-energy robotic character for mall promotions, family events, launches and celebrations across India.",
  },
  {
    slug: "titan",
    name: "Titan",
    role: "The powerful, commanding presence",
    summary: "A towering, authoritative robotic character that commands every room it enters.",
    description: [
      "Titan carries a calm, commanding presence. Its imposing silhouette and polished metallic finish make it ideal for premium moments where you want people to stop, look and talk about it.",
      "From corporate stages to product reveals, Titan gives your brand a powerful face and a story audiences remember.",
    ],
    idealFor: ["Corporate events and conferences", "Product launches and reveals", "Exhibitions and trade shows", "Brand activations"],
    highlights: ["Commanding stage presence", "Premium metallic design", "Strong brand-reveal moments"],
    available: true,
    hasImage: false,
    seoTitle: "Titan | Commanding Robotic Character for Corporate Events",
    seoDescription:
      "Titan is MASH VENTURES' towering robotic character for product launches, corporate events, exhibitions and premium brand activations in India.",
  },
  {
    slug: "colossus",
    name: "Colossus",
    role: "The ultimate heavy-armour spectacle",
    summary: "A heavy-armour robotic suit built to be the biggest talking point of any venue.",
    description: [
      "Colossus is pure spectacle. A heavy-armour robotic design with serious visual weight, it turns any entrance, stage or atrium into a showpiece.",
      "Perfect for large-scale launches, exhibitions and mall centrepieces, Colossus delivers the kind of visual impact that fills social feeds.",
    ],
    idealFor: ["Large-scale product launches", "Mall atrium centrepieces", "Exhibitions and expos", "Festival and inauguration events"],
    highlights: ["Maximum visual impact", "Social-media ready", "Built for big venues"],
    available: true,
    hasImage: false,
    seoTitle: "Colossus | Heavy-Armour Robotic Suit Experience",
    seoDescription:
      "Colossus is MASH VENTURES' heavy-armour robotic suit for large launches, mall centrepieces and exhibitions. Book a spectacle that gets people talking.",
  },
  {
    slug: "coming-soon",
    name: "Coming Soon",
    role: "New experiences on the way",
    summary: "More robotic characters and themed collections are in development.",
    description: ["A growing universe of robotic characters is on the way."],
    idealFor: [],
    highlights: [],
    available: false,
    hasImage: false,
    seoTitle: "More Characters Coming Soon",
    seoDescription: "New robotic characters from MASH VENTURES are on the way.",
  },
];

export const availableCharacters = characters.filter((c) => c.available);

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug && c.available);
}
```

---

### `src/data/experiences.ts`

```ts
import { Building2, Megaphone, PartyPopper, Sparkles, Store, Users, type LucideIcon } from "lucide-react";

export type Experience = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  body: string[];
  idealFor: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const experiences: Experience[] = [
  {
    slug: "robotic-character-appearances",
    title: "Robotic Character Appearances",
    icon: Sparkles,
    blurb: "Make a powerful first impression with larger-than-life robotic characters at your venue.",
    body: [
      "A robotic character appearance puts a towering, futuristic figure at the heart of your venue. People stop, stare, smile and reach for their phones.",
      "We tailor the character, timing and movement to your space so the moment feels intentional, not tacked on.",
    ],
    idealFor: ["Venue openings", "Festivals and fairs", "Hotel and resort events", "Campus events"],
    seoTitle: "Robotic Character Appearances for Venues & Events in India",
    seoDescription:
      "Book larger-than-life robotic character appearances for malls, venues and events across India. Futuristic, photo-ready and unforgettable.",
    keywords: ["robotic character appearance", "robot character for events", "robot mascot hire India"],
  },
  {
    slug: "meet-and-greet-experiences",
    title: "Meet & Greet Experiences",
    icon: Users,
    blurb: "Give guests the chance to interact with robotic characters, take photographs and create unforgettable memories.",
    body: [
      "Meet and greets turn spectators into participants. Guests can walk up, wave, pose and take home a story worth sharing.",
      "Each session is paced to your crowd, from short walk-around moments to organised photo queues.",
    ],
    idealFor: ["Kids' and family events", "Mall weekends", "School and college fests", "Private parties"],
    seoTitle: "Robot Meet & Greet Experiences | Photo Opportunities",
    seoDescription:
      "Interactive robotic character meet and greets with photo opportunities for malls, schools, families and celebrations in India.",
    keywords: ["robot meet and greet", "character meet and greet India", "robot photo opportunity"],
  },
  {
    slug: "brand-activations",
    title: "Brand Activations",
    icon: Megaphone,
    blurb: "Turn your brand into the centre of attention with character-led promotional experiences.",
    body: [
      "Brand activations work when people notice them. A robotic character gives your campaign a face that cuts through noise and draws crowds to your stall, stage or storefront.",
      "We help you bring your brand to life with branded appearances, interactive moments and shareable content.",
    ],
    idealFor: ["Consumer brands", "Retail promotions", "Automotive and electronics launches", "Marketing agencies"],
    seoTitle: "Robotic Brand Activations | Bring Your Brand to Life",
    seoDescription:
      "Character-led brand activations with futuristic robots that attract crowds, create content and bring your brand to life across India.",
    keywords: ["brand activation robot", "experiential marketing India", "promotional robot characters"],
  },
  {
    slug: "shopping-mall-experiences",
    title: "Shopping Mall Experiences",
    icon: Store,
    blurb: "Attract visitors, encourage engagement and create memorable moments that make people stop, watch and participate.",
    body: [
      "Malls compete for attention and footfall. A robotic character in the atrium gives visitors a reason to come, stay longer and return.",
      "We design appearances around your campaigns, festivals and weekends so the experience supports your retail goals.",
    ],
    idealFor: ["Mall management", "Festive and seasonal campaigns", "Weekend footfall drives", "Retail tenants"],
    seoTitle: "Shopping Mall Robot Experiences | Boost Footfall",
    seoDescription:
      "Robotic character experiences for shopping malls in India. Attract visitors, boost engagement and create moments people share.",
    keywords: ["mall events robot", "mall activation ideas India", "robot character for mall"],
  },
  {
    slug: "corporate-experiences",
    title: "Corporate Experiences",
    icon: Building2,
    blurb: "Bring an unexpected element of entertainment to corporate celebrations, employee engagement activities and special occasions.",
    body: [
      "Corporate events are better with a surprise. A robotic character lifts annual days, offsites, conferences and employee engagement programmes with genuine wow factor.",
      "We work with your team on timing, branding and flow so the appearance suits your audience.",
    ],
    idealFor: ["Annual days", "Conferences and offsites", "Employee engagement", "Client events"],
    seoTitle: "Corporate Event Robot Characters | Employee Engagement",
    seoDescription:
      "Add wow factor to corporate events, annual days and employee engagement activities with futuristic robotic characters in India.",
    keywords: ["corporate event entertainment robot", "annual day robot", "employee engagement activity India"],
  },
  {
    slug: "special-celebrations",
    title: "Special Celebrations",
    icon: PartyPopper,
    blurb: "Add a futuristic touch to birthdays, weddings, private celebrations and other memorable occasions.",
    body: [
      "Private occasions deserve a moment guests will talk about for years. A robotic character makes an unforgettable entrance and a brilliant photo backdrop.",
      "From birthdays to weddings and receptions, we adapt the experience to the venue, guests and schedule.",
    ],
    idealFor: ["Weddings and receptions", "Birthday parties", "Private celebrations", "Resort events"],
    seoTitle: "Robot Characters for Weddings & Birthday Parties",
    seoDescription:
      "Hire futuristic robotic characters for weddings, birthdays and private celebrations in India. Memorable entrances and photo moments.",
    keywords: ["robot for wedding entry", "birthday party robot character", "futuristic wedding entertainment"],
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
```

---

### `src/data/faqs.ts`

```ts
export const faqs = [
  {
    q: "What is MASH VENTURES?",
    a: "MASH VENTURES is an experience-based company that creates extraordinary moments with larger-than-life robotic characters, from mall appearances and meet-and-greets to brand activations and celebrations.",
  },
  {
    q: "Are you an event management company?",
    a: "No. We don't organise whole events. We create character-led experiences that bring attention, excitement and engagement to your venue, campaign or celebration.",
  },
  {
    q: "Where can your robotic characters appear?",
    a: "Shopping malls, corporate venues, product launches, exhibitions, weddings, resorts, schools, colleges and private celebrations. Share your location in the enquiry and we will confirm availability and logistics.",
  },
  {
    q: "How do I book a robotic character experience?",
    a: "Fill in the booking form with your date, location, preferred character and requirements, or message us on WhatsApp. Our team will get back to you with availability and next steps.",
  },
  {
    q: "Can the experience be customised for my brand?",
    a: "Yes. We tailor appearance timing, interactions and branded moments to your venue, audience and objectives so the experience supports your campaign.",
  },
  {
    q: "How early should I enquire?",
    a: "As early as you can. Popular dates fill quickly, and earlier enquiries give us more time to plan logistics and branding with you.",
  },
];
```

---

### `src/lib/enquiry.ts`

```ts
import { z } from "zod";

export const DURATIONS = ["1 hour", "2 hours", "3-4 hours", "Full day", "Multiple days"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(120).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{8,18}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(160),
  location: z.string().trim().min(2, "Tell us where the experience will take place").max(160),
  date: z.string().trim().min(1, "Pick your preferred date"),
  experience: z.string().min(1, "Choose a type of experience"),
  character: z.string().min(1, "Choose a character"),
  duration: z.string().min(1, "Choose a duration"),
  requirements: z.string().trim().max(2000).optional(),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
```

---

### `src/lib/seo.ts`

```ts
import type { Metadata } from "next";
import { SITE, absoluteUrl, sameAsLinks } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
};

/** Builds consistent per-page metadata: canonical, Open Graph and Twitter. */
export function buildMetadata({ title, description, path, image, keywords, noindex }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/opengraph-image";
  // Don't append the brand again when the title already contains it.
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE.name} robotic character experiences` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.svg"),
    slogan: `${SITE.taglinePrimary} ${SITE.taglineSecondary}`,
    description: SITE.description,
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Robotic characters",
      "Brand activations",
      "Mall experiences",
      "Product launch entertainment",
      "Interactive character entertainment",
    ],
    ...(sameAsLinks().length ? { sameAs: sameAsLinks() } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        ...(SITE.phone ? { telephone: SITE.phone } : {}),
        areaServed: "IN",
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
```

---

### `src/lib/site.ts`

```ts
export const SITE = {
  name: "MASH VENTURES",
  shortName: "MASH",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mashventures.in").replace(/\/$/, ""),
  taglinePrimary: "Engineered to Impress.",
  taglineSecondary: "Bring Your Brand to Life.",
  headline: "More Than Characters. Extraordinary Experiences.",
  description:
    "MASH VENTURES creates extraordinary experiences with larger-than-life robotic characters for malls, brands, corporates, exhibitions, product launches and celebrations across India.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@mashventures.in",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, ""),
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  country: "IN",
  // Update this date whenever you change page content. It is used as the sitemap "last modified" value.
  contentUpdated: "2026-10-25",
  // Set to e.g. "/video/hero.mp4" once you add a muted, looping, compressed hero video.
  heroVideo: null as string | null,
  heroPoster: null as string | null,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/characters", label: "Characters" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(message = "Hi MASH VENTURES, I'd like to enquire about a robotic character experience.") {
  if (!SITE.whatsapp) return "";
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function sameAsLinks() {
  return [SITE.linkedin, SITE.instagram].filter(Boolean);
}
```

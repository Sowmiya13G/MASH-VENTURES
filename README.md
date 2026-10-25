# MASH VENTURES website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. Built for SEO, speed and mobile.

**Engineered to impress. Bring your brand to life.**

## Run it

```bash
npm install
cp .env.example .env.local     # then fill in your values
npm run dev                    # http://localhost:3000
npm run build && npm start     # production check
```

## Before you launch: replace these placeholders

| What | Where |
|---|---|
| Live domain | `NEXT_PUBLIC_SITE_URL` in `.env.local` / Vercel. Drives canonicals, sitemap, Open Graph |
| Email, phone, WhatsApp | `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP` |
| LinkedIn / Instagram URLs | `NEXT_PUBLIC_LINKEDIN`, `NEXT_PUBLIC_INSTAGRAM` (feeds Google `sameAs`) |
| Booking emails | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` |
| Analytics | `NEXT_PUBLIC_GA_ID` |
| Search Console | `NEXT_PUBLIC_GSC_VERIFICATION` |

The WhatsApp button only appears once `NEXT_PUBLIC_WHATSAPP` is set.

## Add your character photos

1. Export each photo as WebP (about 1200 x 1600, under 300 KB).
2. Save as `public/characters/striker.webp`, `titan.webp`, `colossus.webp`.
3. In `src/data/characters.ts`, set `hasImage: true` for that character.

Until then the site shows an original robot silhouette. For a hero video, add `public/video/hero.mp4`
(muted, looping, under 8 MB) and set `heroVideo` (and a `heroPoster`) in `src/lib/site.ts`.

## Character names and trademarks

Bumblebee, Optimus Prime and Hulkbuster are trademarks of their owners. The site uses original names
(Striker, Titan, Colossus). Do not use the trademarked names in page text, titles or keywords until you hold
commercial licences. To rename a character, edit `src/data/characters.ts`.

## Edit content

| Content | File |
|---|---|
| Characters | `src/data/characters.ts` |
| Experiences (each gets its own SEO page) | `src/data/experiences.ts` |
| FAQs (also output as FAQ structured data) | `src/data/faqs.ts` |
| Taglines, nav, site details | `src/lib/site.ts` |

Add a character or experience to its data file and the page, sitemap entry and structured data are created automatically.

## SEO built in

- Unique title, description, canonical, Open Graph and Twitter tags on every page
- Auto-generated `sitemap.xml`, `robots.txt`, web manifest, favicon and 1200x630 social share image
- JSON-LD: Organization, WebSite, BreadcrumbList, Service, ItemList, FAQPage, ContactPage
- One H1 per page, semantic landmarks, skip link, alt text, `lang="en-IN"`
- Statically pre-rendered pages, self-hosted font (no render-blocking third-party request), AVIF/WebP images
- Security headers and no `X-Powered-By`

## Deploy (Vercel)

```bash
git init && git add . && git commit -m "init: MASH VENTURES"
git remote add origin https://github.com/<you>/mash-ventures.git
git push -u origin main
```

Import the repo at vercel.com/new, add the environment variables, then add your domain.

## After launch: SEO checklist (this is where rankings come from)

1. **Google Search Console**: add the domain, verify, submit `https://yourdomain/sitemap.xml`.
2. **Google Business Profile**: create it for MASH VENTURES with category, service area and photos.
3. **Bing Webmaster Tools**: import from Search Console.
4. **Real photos and video** of each character at real venues, with descriptive file names and alt text.
5. **Backlinks and citations**: LinkedIn company page, Instagram, YouTube, mall and corporate partners, event directories (use the same name, email and phone everywhere).
6. **Publish content** that targets what customers search, for example "mall activation ideas", "robot character for product launch", "wedding entry ideas". Add pages under `src/app/blog`.
7. **Add testimonials and client logos** once you have them. Add `Review` structured data only for real reviews.
8. **Check Core Web Vitals** in Search Console and run Lighthouse on the live site.

## Booking email note

Resend only delivers to your own address until you verify your sending domain. Verify the domain in Resend,
then set `ENQUIRY_FROM_EMAIL` to an address on it so customer confirmations are delivered.

The rate limiter in `src/app/api/enquiry/route.ts` is in-memory. For heavy traffic, swap in Upstash Redis.

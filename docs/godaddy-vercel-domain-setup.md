# GoDaddy & Vercel Custom Domain SEO Configuration Guide

This guide details the exact production setup to connect your GoDaddy domain (`mashventures.in`) with your Vercel deployment, ensuring maximum SEO performance, zero duplicate content penalties, and valid SSL termination.

---

## 1. Domain Architecture & Canonical Strategy

To prevent Google and Bing from splitting page rank between multiple domain variants:
- **Canonical Primary Domain**: `https://www.mashventures.in`
- **Redirecting Domain**: `https://mashventures.in` (301 Permanent Redirect &rarr; `https://www.mashventures.in`)
- **Vercel Preview Subdomains**: `*.vercel.app` are protected with `X-Robots-Tag: noindex, nofollow` headers so search crawlers never index staging deployments.

---

## 2. GoDaddy DNS Management Setup

1. Log in to [GoDaddy Account Manager](https://account.godaddy.com/).
2. Navigate to **My Products** &rarr; find **mashventures.in** &rarr; click **DNS** (or **Manage DNS**).
3. Under **DNS Records**, add or edit the following two records:

| Record Type | Name (Host) | Value (Target) | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | `600 seconds` (or 1/2 hour) | Points apex domain to Vercel global edge network |
| **CNAME** | `www` | `cname.vercel-dns.com.` | `600 seconds` (or 1/2 hour) | Points www subdomain to Vercel canonical endpoint |

> [!IMPORTANT]
> **Remove Conflicting Records in GoDaddy:**
> - If an existing `A` record for `@` points to a GoDaddy IP (e.g. parked page `34.102.136.180`), edit it to `76.76.21.21` or delete it.
> - If an existing `CNAME` for `www` points to `@` or `_domainconnect`, update it to `cname.vercel-dns.com.`.
> - Do not alter existing MX (email) or TXT (SPF/Google verification) records.

---

## 3. Vercel Dashboard Configuration

1. Log in to [Vercel Dashboard](https://vercel.com/) and select the **MASH-VENTURES** project.
2. Go to **Settings** &rarr; **Domains**.
3. Add the two domains:
   - Enter `www.mashventures.in` and click **Add**.
   - Enter `mashventures.in` and click **Add**.
4. Configure Redirection:
   - On the domain card for `mashventures.in`, set **Redirect to**: `www.mashventures.in` with status code **301 Moved Permanently**.
   - Ensure `www.mashventures.in` is marked as **Production**.
5. Automatic SSL:
   - Once DNS propagates (typically 5–15 minutes), Vercel automatically issues an SSL certificate via Let's Encrypt for both hostnames.

---

## 4. Technical SEO Safeguards Implemented in Next.js

The code in this repository includes built-in SEO enhancements for this domain pair:

1. **Dual Redirection Redundancy (`next.config.ts`)**:
   - Both Vercel Edge and Next.js middleware automatically enforce 301 canonical redirects from `mashventures.in` to `https://www.mashventures.in`.
   - `trailingSlash: false` prevents duplicate URL variants (e.g., `/characters/` vs `/characters`).

2. **Preview Protection (`next.config.ts` & `src/app/robots.ts`)**:
   - Staging/Preview branches automatically return `X-Robots-Tag: noindex, nofollow` and `robots.txt: Disallow: /`.

3. **Canonical Meta Tags (`src/lib/seo.ts`)**:
   - Every page emits `<link rel="canonical" href="https://www.mashventures.in/..." />`.

4. **Sitemap and Robots (`src/app/sitemap.ts` & `src/app/robots.ts`)**:
   - Directs crawlers strictly to `https://www.mashventures.in/sitemap.xml`.
   - Disallows private paths (`/api/`, `/_next/`, `/admin/`).

5. **Google Knowledge Graph Schema (`src/lib/seo.ts`)**:
   - Organization JSON-LD includes valid high-res PNG logo (`/mash-logo-transparent.png`, 962x302), banner image, postal address (`Chennai, Tamil Nadu, IN`), contact points, and verified social links.

---

## 5. Post-Launch Verification Steps

Run these terminal checks once DNS changes are applied:

### A. Check DNS Propagation
```bash
nslookup -type=A mashventures.in
# Should return 76.76.21.21

nslookup -type=CNAME www.mashventures.in
# Should return cname.vercel-dns.com
```

### B. Verify 301 Canonical Redirect
```bash
curl -I https://mashventures.in
# Expected response:
# HTTP/2 301
# location: https://www.mashventures.in/
```

### C. Verify Robots.txt and Sitemap
```bash
curl -s https://www.mashventures.in/robots.txt
# Should display Sitemap: https://www.mashventures.in/sitemap.xml

curl -s https://www.mashventures.in/sitemap.xml
# Should display XML URLs all starting with https://www.mashventures.in/
```

### D. Google Search Console Setup
1. Open [Google Search Console](https://search.google.com/search-console).
2. Add Property &rarr; choose **URL Prefix**: `https://www.mashventures.in`.
3. Verify ownership (via HTML tag or DNS TXT record).
4. Go to **Sitemaps** &rarr; submit `sitemap.xml`.
5. Use **URL Inspection** on `https://www.mashventures.in` &rarr; click **Request Indexing**.


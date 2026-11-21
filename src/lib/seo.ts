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

const DEFAULT_KEYWORDS = [
  "robotic character experiences",
  "robot characters for events India",
  "robotic mascots hire",
  "brand activation robots",
  "mall activation robot India",
  "product launch entertainment",
  "corporate event robot entertainment",
  "animatronic robots India",
  "MASH VENTURES",
  "transforming robot experiences",
];

/** Builds consistent per-page metadata: canonical, Open Graph and Twitter. */
export function buildMetadata({ title, description, path, image, keywords, noindex }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/mash-ventures-banner.jpg";
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description,
    keywords: keywords ? [...keywords, ...DEFAULT_KEYWORDS] : DEFAULT_KEYWORDS,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} robotic character experiences`,
          type: "image/jpeg",
        },
      ],
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
    legalName: "MASH VENTURES",
    url: SITE.url,
    // Google Rich Snippets strictly requires high-res PNG/JPG logo with min 112x112px
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/mash-logo-transparent.png"),
      width: 962,
      height: 302,
    },
    image: absoluteUrl("/mash-ventures-banner.jpg"),
    slogan: `${SITE.taglinePrimary} ${SITE.taglineSecondary}`,
    description: SITE.description,
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: SITE.region,
      addressLocality: SITE.city,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Tamil Nadu" },
      { "@type": "AdministrativeArea", name: "Karnataka" },
      { "@type": "AdministrativeArea", name: "Maharashtra" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
    ],
    knowsAbout: [
      "Robotic characters for events",
      "Experiential brand activations",
      "Mall entertainment spectacles",
      "Product launch reveals",
      "Interactive mecha character entertainment",
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

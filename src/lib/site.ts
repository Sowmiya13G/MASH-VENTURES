// Production canonical domain configured via GoDaddy DNS to Vercel
const PRODUCTION_DOMAIN = "https://www.mashventures.in";

const resolveSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // If running in a Vercel preview deployment without a custom domain, use the Vercel host
  // so social link scrapers (WhatsApp, Twitter, LinkedIn) can resolve open graph images
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return PRODUCTION_DOMAIN;
};

export const SITE = {
  name: "MASH VENTURES",
  shortName: "MASH",
  // Ensures canonical URLs resolve accurately for both GoDaddy custom domain and Vercel environments
  url: resolveSiteUrl(),
  taglinePrimary: "Engineered to Impress.",
  taglineSecondary: "Bring Your Brand to Life.",
  headline: "More Than Characters. Extraordinary Experiences.",
  description:
    "MASH VENTURES creates extraordinary experiences with larger-than-life robotic characters for malls, brands, corporates, exhibitions, product launches and celebrations across India.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mashventuresindia@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 90034 90627",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "919003490627").replace(/\D/g, ""),
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "https://www.linkedin.com/in/mash-ventures-529792446",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "https://www.instagram.com/mashventures",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  country: "IN",
  city: "Chennai",
  region: "Tamil Nadu",
  // Update this date whenever page content changes. Used as sitemap lastmod date.
  contentUpdated: "2026-11-21",
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
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `🤖 HELLO, MASH VENTURES!

ROBOTIC EXPERIENCE REQUEST INITIATED.
EVENT MODE: ACTIVATED.
HUMAN INTERACTION LEVEL: MAXIMUM.

Please share your available robotic characters, event packages, and booking details.

AWAITING TRANSMISSION... ⚡`;

export function whatsappLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  const digits = (SITE.whatsapp || "919003490627").replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(message)}`;
}

export function sameAsLinks() {
  return [SITE.linkedin, SITE.instagram].filter(Boolean);
}

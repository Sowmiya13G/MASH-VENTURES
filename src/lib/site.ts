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
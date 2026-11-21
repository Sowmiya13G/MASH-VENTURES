import type { Metadata } from "next";
import BookingSection from "@/components/sections/BookingSection";
import JsonLd from "@/components/ui/JsonLd";
import { container } from "@/components/ui/styles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Book a Robotic Character Experience | Contact",
  description:
    "Request a robotic character experience for your mall, brand, corporate event, launch or celebration. Share your date and venue and MASH VENTURES will respond with availability.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappLink();

  const contactChannels = [
    {
      title: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      subtext: "General & corporate enquiries",
    },
    {
      title: "Phone",
      value: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, "")}`,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      subtext: "Direct voice call",
    },
    {
      title: "WhatsApp",
      value: SITE.phone || "+91 90034 90627",
      href: wa,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      subtext: "Instant transmission & bookings",
      external: true,
    },
    {
      title: "LinkedIn",
      value: "MASH VENTURES",
      href: SITE.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.63-1.63 1.64 1.64 0 1 0-1.63 1.63m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
        </svg>
      ),
      subtext: "Connect on LinkedIn",
      external: true,
    },
    {
      title: "Instagram",
      value: "@mashventures",
      href: SITE.instagram,
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#E4405F">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      subtext: "Follow behind-the-scenes",
      external: true,
    },
    {
      title: "Service Area",
      value: "Pan-India Coverage",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      subtext: "HQ: Chennai, Tamil Nadu",
    },
  ];

  return (
    <>
      <div className="pt-20">
        <BookingSection asPage />
      </div>

      <section className="bg-charcoal py-20 border-t border-white/10" aria-label="Official contact channels">
        <div className={container}>
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mash-red font-tech">
              Direct Transmission
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Connect With MASH VENTURES
            </h2>
            <p className="mt-3 text-sm text-chrome/70">
              Reach our robotic engineering and experience team across official business channels.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactChannels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer me" : undefined}
                className="group relative flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-gunmetal/70 transition-all duration-300 hover:border-mash-red/60 hover:bg-gunmetal hover:shadow-[0_8px_32px_rgba(225,6,0,0.18)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50 shadow-inner group-hover:scale-110 transition duration-300">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-chrome/60 font-tech">
                    {c.title}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-white truncate group-hover:text-mash-red transition-colors">
                    {c.value}
                  </h3>
                  <p className="mt-1 text-xs text-chrome/60">{c.subtext}</p>
                </div>
              </a>
            ))}
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
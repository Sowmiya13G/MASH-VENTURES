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
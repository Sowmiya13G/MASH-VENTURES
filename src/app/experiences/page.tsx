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
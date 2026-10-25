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
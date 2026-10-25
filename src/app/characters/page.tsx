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
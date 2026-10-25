import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import WhyMash from "@/components/sections/WhyMash";
import TaglineBand from "@/components/sections/TaglineBand";
import { btnPrimary, container } from "@/components/ui/styles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About MASH VENTURES | Robotic Character Experience Company",
  description:
    "MASH VENTURES is an experience-based company creating larger-than-life robotic character experiences for brands, malls, corporates and celebrations in India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal pb-24 pt-36 sm:pb-32">
        <div className={container}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">About Us</p>
          <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            More Than Characters. Extraordinary Experiences.
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5 text-lg leading-relaxed text-chrome/80">
              <p>
                MASH VENTURES is an experience-based company specialising in robotic character appearances and
                immersive character entertainment.
              </p>
              <p>
                Our mission is to transform ordinary occasions into extraordinary experiences through larger-than-life
                robotic characters that capture attention, spark excitement and create lasting memories.
              </p>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-chrome/80">
              <p>
                From interactive meet-and-greets to high-impact brand experiences, we help businesses and individuals
                create moments that people remember long after the experience ends.
              </p>
              <p>
                Our vision is to build a new world of character-driven entertainment powered by creativity, innovation
                and futuristic design.
              </p>
            </div>
          </div>
          <p className="mt-12 border-l-4 border-mash-red pl-5 text-xl font-semibold">
            We don&apos;t organise events. We create extraordinary experiences through robotic characters.
          </p>
          <Link href="/contact#book" className={`${btnPrimary} mt-10`}>
            Book an Experience
          </Link>
        </div>
      </section>
      <WhyMash />
      <TaglineBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
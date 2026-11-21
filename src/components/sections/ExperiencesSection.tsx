"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles, Filter, ChevronRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";
import SectionHeading from "@/components/ui/SectionHeading";
import { container, btnPrimary, btnGhost } from "@/components/ui/styles";

type CategoryId = "all" | "brand-retail" | "corporate-venue" | "celebrations";

interface CategoryFilter {
  id: CategoryId;
  label: string;
}


const CATEGORIES: readonly CategoryFilter[] = [
  { id: "all", label: "All Experiences" },
  { id: "brand-retail", label: "Brand & Retail" },
  { id: "corporate-venue", label: "Corporate & Venues" },
  { id: "celebrations", label: "Celebrations & Private" },
] as const;

const categoryMap: Record<string, Exclude<CategoryId, "all">> = {
  "brand-activations": "brand-retail",
  "shopping-mall-experiences": "brand-retail",
  "corporate-experiences": "corporate-venue",
  "robotic-character-appearances": "corporate-venue",
  "special-celebrations": "celebrations",
  "meet-and-greet-experiences": "celebrations",
};

const modalityTag: Record<string, string> = {
  "robotic-character-appearances": "IMMERSIVE PRESENCE",
  "meet-and-greet-experiences": "INTERACTIVE ENGAGEMENT",
  "brand-activations": "BRAND VISIBILITY",
  "shopping-mall-experiences": "FOOTFALL CATALYST",
  "corporate-experiences": "ENTERPRISE IMPACT",
  "special-celebrations": "EXCLUSIVE ENTERTAINMENT",
};

export default function ExperiencesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const baseLayoutId = useId();

  const filteredExperiences = experiences.filter((e) => {
    if (activeCategory === "all") return true;
    return categoryMap[e.slug] === activeCategory;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="experiences"
      className="relative scroll-mt-20 overflow-hidden bg-black py-16 sm:py-24 lg:py-32"
      aria-labelledby="experiences-title"
    >
      {/* Background Cybernetic Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-mash-red/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyber-gold/8 blur-[150px]" />

      <div className={`relative ${container}`}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            id="experiences-title"
            eyebrow="What We Create"
            title="Our Experiences"
            as={headingLevel}
          >
            We don&apos;t organise events. We engineer extraordinary, character-driven entertainment that captures attention and elevates brands.
          </SectionHeading>

          {/* Telemetry / Live Status Tag */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-white/10 bg-gunmetal/60 px-4 py-2 backdrop-blur-md self-start md:self-auto shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mash-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mash-red" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-chrome/80 font-tech">
              6 Curated Modalities Active
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Experience Categories">
          <div className="mr-2 hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-chrome/50 font-tech">
            <Filter size={14} className="text-mash-red" aria-hidden="true" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mash-red ${isActive ? "text-white" : "text-chrome/60 hover:text-white"
                  }`}
              >
                {isActive && (
                  <m.span
                    layoutId={`${baseLayoutId}-active-filter`}
                    className="absolute inset-0 rounded-full border border-mash-red/50 bg-mash-red/15 shadow-[0_0_20px_rgba(201,0,16,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Experience Cards Grid */}
        <m.ul
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((e, i) => {
              const Icon = e.icon;
              const expNumber = String(experiences.findIndex((item) => item.slug === e.slug) + 1).padStart(2, "0");
              const modality = modalityTag[e.slug] || "EXPERIENCE";

              return (
                <m.li
                  key={e.slug}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <div
                    onMouseMove={handleMouseMove}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-charcoal/90 p-5 sm:p-7 lg:p-8 backdrop-blur-sm transition-all duration-500 hover:border-mash-red/60 hover:shadow-[0_12px_40px_rgba(201,0,16,0.12)] hover:-translate-y-1"
                  >
                    {/* Interactive Cursor Spotlight Glow */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 0, 16, 0.14), transparent 70%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Cybernetic Corner Brackets */}
                    <span
                      className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-white/20 transition-colors duration-300 group-hover:border-mash-red"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white/20 transition-colors duration-300 group-hover:border-mash-red"
                      aria-hidden="true"
                    />

                    {/* Card Content Top */}
                    <div>
                      {/* Technical Meta Bar */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="font-tech text-xs font-bold tracking-widest text-chrome/50 group-hover:text-mash-red transition-colors">
                          {`${expNumber} // PROTOCOL`}
                        </span>
                        <span className="rounded-md border border-cyber-gold/25 bg-cyber-gold/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-cyber-gold font-tech">
                          {modality}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="mt-6 flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gunmetal/80 text-mash-red shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-mash-red/50 group-hover:shadow-[0_0_20px_rgba(201,0,16,0.3)]">
                          <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-white transition-colors">
                            {e.title}
                          </h3>
                        </div>
                      </div>

                      {/* Blurb */}
                      <p className="mt-4 text-sm leading-relaxed text-chrome/70">
                        {e.blurb}
                      </p>

                      {/* Target Venue / Ideal For Badges */}
                      <div className="mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-chrome/40 font-tech">
                          Engineered for
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {e.idealFor.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium font-tech tracking-wider text-chrome/70 transition-colors duration-200 group-hover:border-white/15 group-hover:text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-8 border-t border-white/10 pt-5">
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          href={`/experiences/${e.slug}`}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:text-mash-red"
                        >
                          <span>Explore Experience</span>
                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>

                        <Link
                          href={`/contact?type=${encodeURIComponent(e.title)}#book`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-chrome/80 backdrop-blur-sm transition hover:border-mash-red/50 hover:bg-mash-red hover:text-white"
                        >
                          <Calendar size={12} aria-hidden="true" />
                          <span>Book</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </m.li>
              );
            })}
          </AnimatePresence>
        </m.ul>

        {/* Bottom Call-to-Action Console Banner */}
        <div className="mt-12 sm:mt-14 rounded-2xl border border-white/10 bg-gradient-to-r from-gunmetal via-charcoal to-gunmetal p-5 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyber-gold font-tech">
                <Sparkles size={14} className="text-cyber-gold" aria-hidden="true" />
                <span>Custom Character Activations</span>
              </div>
              <h4 className="mt-2 text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                Need a bespoke production for your upcoming event?
              </h4>
              <p className="mt-2 text-sm text-chrome/70 leading-relaxed">
                From choreographed stage entrances to multi-city mall activation tours, our creative technology directors engineer custom character programming suited to your brand specifications.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/contact#book" className={`${btnPrimary} text-xs py-3.5 px-6`}>
                <span>Book Consultation</span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/characters" className={`${btnGhost} text-xs py-3.5 px-6`}>
                <span>View Robot Fleet</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

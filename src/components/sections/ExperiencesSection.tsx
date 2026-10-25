import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

export default function ExperiencesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="experiences" className="scroll-mt-20 bg-black py-24 sm:py-32" aria-labelledby="experiences-title">
      <div className={container}>
        <SectionHeading id="experiences-title" eyebrow="What We Create" title="Our Experiences" as={headingLevel}>
          We don&apos;t organise events. We create extraordinary experiences powered by robotic characters.
        </SectionHeading>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => {
            const Icon = e.icon;
            return (
              <li key={e.slug} className="bg-charcoal">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link href={`/experiences/${e.slug}`} className="group flex h-full flex-col p-8 transition hover:bg-gunmetal">
                    <Icon className="text-mash-red" size={34} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-6 text-xl font-bold uppercase tracking-wide">{e.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-chrome/70">{e.blurb}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-chrome/60 transition group-hover:text-mash-red">
                      Learn more <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
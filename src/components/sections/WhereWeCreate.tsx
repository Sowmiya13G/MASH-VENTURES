import Link from "next/link";
import { Briefcase, Building2, Cpu, Heart, Lock, Music, Rocket, Store } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

const places = [
  { label: "Brands & Corporates", icon: Briefcase, type: "Corporate Experiences" },
  { label: "Shopping Malls", icon: Store, type: "Shopping Mall Experiences" },
  { label: "Tech Symposia", icon: Cpu, type: "Robotic Character Appearances" },
  { label: "College Culturals", icon: Music, type: "Meet & Greet Experiences" },
  { label: "Product Launches", icon: Rocket, type: "Brand Activations" },
  { label: "Exhibitions", icon: Building2, type: "Brand Activations" },
  { label: "Weddings & Celebrations", icon: Heart, type: "Special Celebrations" },
  { label: "Private Experiences", icon: Lock, type: "Robotic Character Appearances" },
] as const;

export default function WhereWeCreate() {
  return (
    <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="where-title">
      <div className={container}>
        <SectionHeading id="where-title" eyebrow="Where We Show Up" title="Where We Create Experiences" />
        <ul className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {places.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.label}>
                <Reveal delay={(i % 4) * 0.07} className="h-full">
                  <Link
                    href={`/contact?type=${encodeURIComponent(p.type)}#book`}
                    className="group flex h-full min-h-36 sm:min-h-40 flex-col justify-between rounded-2xl border border-white/10 bg-gunmetal/60 p-5 sm:p-6 lg:p-8 transition hover:border-mash-red/70 hover:bg-gunmetal"
                  >
                    <Icon
                      className="text-chrome/60 transition group-hover:text-mash-red"
                      size={28}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="mt-6 sm:mt-8 text-sm sm:text-base font-bold uppercase tracking-wide lg:text-lg">{p.label}</span>
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

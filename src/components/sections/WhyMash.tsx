import { Cpu, Eye, Gauge, Rocket, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

const reasons = [
  {
    icon: Gauge,
    title: "Larger-than-Life Presence",
    text: "Robotic characters that naturally become the centre of attention.",
  },
  {
    icon: Cpu,
    title: "Immersive Interactions",
    text: "Experiences designed to encourage audience participation and memorable moments.",
  },
  {
    icon: Eye,
    title: "Brand Visibility",
    text: "A distinctive way to attract attention and create opportunities for meaningful brand engagement.",
  },
  {
    icon: Wrench,
    title: "Customisable Experiences",
    text: "Flexible character appearances tailored to your venue, audience and objectives.",
  },
  {
    icon: Rocket,
    title: "A Futuristic Vision",
    text: "A growing universe of robotic characters and innovative entertainment experiences.",
  },
] as const;

export default function WhyMash() {
  return (
    <section className="bg-black py-24 sm:py-32" aria-labelledby="why-title">
      <div className={container}>
        <SectionHeading id="why-title" eyebrow="Why MASH VENTURES" title="Built to Stand Out. Designed to Be Remembered." />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <li key={r.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="h-full border-t-2 border-mash-red pt-6">
                    <Icon className="text-chrome" size={28} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold uppercase leading-tight tracking-wide">{r.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-chrome/70">{r.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
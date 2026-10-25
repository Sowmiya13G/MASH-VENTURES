import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function TaglineBand() {
  return (
    <section className="relative overflow-hidden bg-mash-red py-20 sm:py-28" aria-label="Brand promise">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-5xl px-5 text-center">
        <p className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.taglinePrimary}
          <br />
          {SITE.taglineSecondary}
        </p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
          We don&apos;t organise events. We create extraordinary experiences.
        </p>
      </Reveal>
    </section>
  );
}
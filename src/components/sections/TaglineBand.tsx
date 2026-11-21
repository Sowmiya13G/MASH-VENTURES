import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function TaglineBand() {
  return (
    <section className="relative overflow-hidden bg-mash-red py-14 sm:py-20 lg:py-28" aria-label="Brand promise">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <p className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight tracking-tight">
          {SITE.taglinePrimary}
          <br />
          {SITE.taglineSecondary}
        </p>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/80">
          We don&apos;t organise events. We create extraordinary experiences.
        </p>
      </Reveal>
    </section>
  );
}
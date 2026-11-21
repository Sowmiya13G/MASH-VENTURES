import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import HeroTransformationWrapper from "@/components/three/TransformationHero/HeroTransformationWrapper";

/** Staggers the CSS entrance animation: <p className="fade-up" style={delay(0.2)}> */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 bg-charcoal" aria-hidden="true">
        {SITE.heroVideo ? (
          <video
            className="h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={SITE.heroPoster ?? undefined}
          >
            <source src={SITE.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="bg-grid absolute inset-0" />
            <div className="animate-pulse-glow absolute right-[-10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-mash-red/30 blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-chrome/10 blur-[120px]" />
            <div className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-mash-red/10 to-transparent" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      </div>

      <div className={`${container} pb-24 pt-32`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-mash-red/30 bg-mash-red/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-mash-red mb-6">
              <Sparkles size={13} className="text-mash-red" />
              <span>Signature 3D Experience</span>
            </div>

            <h1
              id="hero-title"
              style={delay(0.1)}
              className="fade-up max-w-5xl text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-6xl font-display"
            >
              <span className="text-chrome-gradient">Engineered</span>
              <br />
              <span className="text-mash-red">To Impress.</span>
            </h1>

            <p
              style={delay(0.3)}
              className="fade-up mt-6 text-lg font-semibold uppercase tracking-[0.2em] text-white sm:text-xl font-display"
            >
              {SITE.headline}
            </p>

            <p style={delay(0.45)} className="fade-up mt-5 max-w-xl text-base leading-relaxed text-chrome/80 sm:text-lg">
              Witness the signature mechanical transformation: a precision yellow supercar unfolding into an imposing humanoid robotic guardian. Interactive, powerful, and commandingly futuristic.
            </p>

            <div style={delay(0.6)} className="fade-up mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/characters" className={btnPrimary}>
                Explore Our Characters
              </Link>
              <Link href="/contact#book" className={btnGhost}>
                Book an Experience
              </Link>
            </div>
          </div>

          <div
            style={delay(0.2)}
            className="fade-up flex justify-center lg:col-span-6 lg:justify-end"
          >
            <HeroTransformationWrapper />
          </div>
        </div>
      </div>

      <a
        href="#characters"
        aria-label="Scroll to characters"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-chrome/60 transition hover:text-white"
      >
        <ChevronDown size={32} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

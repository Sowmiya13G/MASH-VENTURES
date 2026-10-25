import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import MashLogo from "@/components/ui/MashLogo";

/** Staggers the CSS entrance animation: <p className="fade-up" style={delay(0.2)}> */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Server component on purpose: the headline is in the HTML and animates with CSS only,
 * so it paints immediately (good for Largest Contentful Paint) and ships no extra JavaScript.
 */
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
          <div className="lg:col-span-7">
            <p className="fade-up mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-mash-red sm:text-sm">
              Robotic Character Experiences in India
            </p>

            <h1
              id="hero-title"
              style={delay(0.1)}
              className="fade-up max-w-5xl text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-7xl lg:text-7xl"
            >
              <span className="text-chrome-gradient">More Than Characters.</span>
              <br />
              <span className="text-mash-red">Extraordinary Experiences.</span>
            </h1>

            <p
              style={delay(0.3)}
              className="fade-up mt-8 text-lg font-semibold uppercase tracking-[0.2em] text-white sm:text-xl"
            >
              {SITE.taglinePrimary}
              <br />
              <span className="text-chrome/80">{SITE.taglineSecondary}</span>
            </p>

            <p style={delay(0.45)} className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-chrome/80 sm:text-lg">
              Not just a character. Not just an appearance. An experience that commands attention. We bring futuristic
              robotic characters to life through immersive interactions, spectacular appearances and unforgettable
              audience experiences.
            </p>

            <div style={delay(0.6)} className="fade-up mt-10 flex flex-col gap-4 sm:flex-row">
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
            className="fade-up flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm sm:p-10 shadow-2xl">
              <div className="absolute -top-3 left-6 rounded bg-mash-red px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                Official Identity
              </div>
              <MashLogo variant="full" size="hero" priority />
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold tracking-widest text-chrome/60 uppercase">
                <span>Cybernetic Core</span>
                <span className="flex items-center gap-1.5 text-mash-red">
                  <span className="h-2 w-2 rounded-full bg-mash-red animate-ping" />
                  Active
                </span>
              </div>
            </div>
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
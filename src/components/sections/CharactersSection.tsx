import Link from "next/link";
import { characters } from "@/data/characters";
import CharacterVisual from "@/components/ui/CharacterVisual";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";

/**
 * @param asPage Set on /characters, where the page already has its own <h1> and intro,
 *               so the section heading is omitted.
 */
export default function CharactersSection({ asPage = false }: { asPage?: boolean }) {
  return (
    <section
      id="characters"
      className="scroll-mt-20 bg-charcoal py-16 sm:py-24 lg:py-32"
      aria-labelledby={asPage ? undefined : "characters-title"}
      aria-label={asPage ? "Our robotic characters" : undefined}
    >
      <div className={container}>
        {!asPage && (
          <SectionHeading id="characters-title" eyebrow="The Characters" title="Meet Our Characters">
            Larger-than-life robotic characters, each with its own presence, personality and impact.
          </SectionHeading>
        )}

        <ul className={`${asPage ? "" : "mt-10 sm:mt-14"} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {characters.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition duration-500 ${
                    c.available
                      ? "border-mash-red/40 bg-gunmetal shadow-[0_0_30px_rgb(201_0_16/0.15)] hover:border-mash-red/80 hover:shadow-[0_0_48px_rgb(201_0_16/0.3)]"
                      : "border-white/5 bg-gunmetal/60 opacity-80 hover:opacity-100 hover:border-white/20"
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <CharacterVisual character={c} imageOnly priority={c.available} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">{c.name}</h3>
                      {c.available ? (
                        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-400 uppercase shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-chrome/60 uppercase">
                          SOON
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-chrome/70">{c.role}</p>
                    {c.available ? (
                      <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
                        <Link href={`/characters/${c.slug}`} className={`${btnGhost} px-4 py-3 text-xs`}>
                          Discover Character
                        </Link>
                        <Link href={`/contact?character=${c.slug}#book`} className={`${btnPrimary} px-4 py-3 text-xs`}>
                          Book This Experience
                        </Link>
                      </div>
                    ) : (
                      <div className="mt-5 sm:mt-6 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mash-red opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-mash-red" />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mash-red font-tech">
                          Coming soon
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
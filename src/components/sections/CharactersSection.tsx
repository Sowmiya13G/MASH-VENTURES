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
      className="scroll-mt-20 bg-charcoal py-24 sm:py-32"
      aria-labelledby={asPage ? undefined : "characters-title"}
      aria-label={asPage ? "Our robotic characters" : undefined}
    >
      <div className={container}>
        {!asPage && (
          <SectionHeading id="characters-title" eyebrow="The Characters" title="Meet Our Characters">
            Larger-than-life robotic characters, each with its own presence, personality and impact.
          </SectionHeading>
        )}

        <ul className={`${asPage ? "" : "mt-14"} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {characters.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gunmetal transition duration-500 hover:border-mash-red/70 hover:shadow-[0_0_48px_rgb(225_6_0/0.25)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <CharacterVisual character={c} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold uppercase tracking-wide">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-chrome/70">{c.role}</p>
                    {c.available ? (
                      <div className="mt-6 flex flex-col gap-3">
                        <Link href={`/characters/${c.slug}`} className={`${btnGhost} px-4 py-3 text-xs`}>
                          Discover Character
                        </Link>
                        <Link href={`/contact?character=${c.slug}#book`} className={`${btnPrimary} px-4 py-3 text-xs`}>
                          Book This Experience
                        </Link>
                      </div>
                    ) : (
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Coming soon</p>
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
import Link from "next/link";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { experiences } from "@/data/experiences";
import { availableCharacters } from "@/data/characters";
import { container } from "@/components/ui/styles";

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-4`}>
        <div className="md:col-span-1">
          <p className="text-xl font-bold tracking-[0.18em]">MASH VENTURES</p>
          <p className="mt-4 text-sm uppercase leading-relaxed tracking-widest text-chrome/70">
            {SITE.taglinePrimary}
            <br />
            {SITE.taglineSecondary}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-chrome/60">
            Robotic character experiences for brands, malls, corporates and celebrations.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Explore</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Characters and experiences">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Experiences</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {experiences.map((e) => (
              <li key={e.slug}>
                <Link href={`/experiences/${e.slug}`} className="hover:text-white">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Characters</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {availableCharacters.map((c) => (
              <li key={c.slug}>
                <Link href={`/characters/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red">Contact</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            {SITE.phone && (
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Chat on WhatsApp
                </a>
              </li>
            )}
            {SITE.linkedin && (
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer me" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            )}
            {SITE.instagram && (
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer me" className="hover:text-white">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wider text-chrome/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
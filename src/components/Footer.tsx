import Link from "next/link";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { experiences } from "@/data/experiences";
import { availableCharacters } from "@/data/characters";
import { container } from "@/components/ui/styles";
import MashLogo from "@/components/ui/MashLogo";

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className={`${container} grid gap-10 py-12 sm:py-16 sm:grid-cols-2 lg:grid-cols-4`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <MashLogo variant="full" size="md" />
          <p className="mt-4 text-xs sm:text-sm uppercase leading-relaxed tracking-widest text-chrome/70 font-tech">
            {SITE.taglinePrimary}
            <br />
            {SITE.taglineSecondary}
          </p>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-chrome/60 max-w-sm">
            Robotic character experiences for brands, malls, corporates and celebrations across India.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red font-tech">Explore</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Characters and experiences">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red font-tech">Experiences</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {experiences.map((e) => (
              <li key={e.slug}>
                <Link href={`/experiences/${e.slug}`} className="hover:text-white transition-colors">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red font-tech">Characters</h2>
          <ul className="space-y-3 text-sm text-chrome/80">
            {availableCharacters.map((c) => (
              <li key={c.slug}>
                <Link href={`/characters/${c.slug}`} className="hover:text-white transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-mash-red font-tech">Get In Touch</h2>
          <ul className="space-y-3.5 text-sm text-chrome/80">
            {/* Email */}
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-chrome/90 hover:text-white transition-colors group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#c90010] group-hover:border-[#c90010]/50 group-hover:bg-[#c90010]/10 transition">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-chrome/50 font-tech">Email</span>
                  <span className="text-xs font-medium text-white truncate">{SITE.email}</span>
                </div>
              </a>
            </li>

            {/* Phone */}
            {SITE.phone && (
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-chrome/90 hover:text-white transition-colors group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#c90010] group-hover:border-[#c90010]/50 group-hover:bg-[#c90010]/10 transition">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-chrome/50 font-tech">Phone</span>
                    <span className="text-xs font-medium text-white">{SITE.phone}</span>
                  </div>
                </a>
              </li>
            )}

            {/* WhatsApp */}
            {wa && (
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-chrome/90 hover:text-white transition-colors group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-tech font-bold">WhatsApp</span>
                    <span className="text-xs font-medium text-white">{SITE.phone || "Instant Booking"}</span>
                  </div>
                </a>
              </li>
            )}

            {/* LinkedIn */}
            {SITE.linkedin && (
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex items-center gap-3 text-chrome/90 hover:text-white transition-colors group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/10 text-[#0A66C2] group-hover:bg-[#0A66C2]/20 transition">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.63-1.63 1.64 1.64 0 1 0-1.63 1.63m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#0A66C2] font-tech font-bold">LinkedIn</span>
                    <span className="text-xs font-medium text-white truncate">MASH VENTURES</span>
                  </div>
                </a>
              </li>
            )}

            {/* Instagram */}
            {SITE.instagram && (
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex items-center gap-3 text-chrome/90 hover:text-white transition-colors group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4405F]/30 bg-[#E4405F]/10 text-[#E4405F] group-hover:bg-[#E4405F]/20 transition">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#E4405F] font-tech font-bold">Instagram</span>
                    <span className="text-xs font-medium text-white truncate">@mashventures</span>
                  </div>
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
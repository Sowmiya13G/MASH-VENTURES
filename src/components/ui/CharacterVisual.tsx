import Image from "next/image";
import type { Character } from "@/data/characters";

/**
 * Shows the character photo when one has been added (hasImage: true and a file at
 * /public/characters/<slug>.webp). Until then it renders an original, abstract robot silhouette.
 */
export default function CharacterVisual({
  character,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  character: Character;
  priority?: boolean;
  sizes?: string;
}) {
  if (character.hasImage) {
    return (
      <div className="relative h-full w-full bg-charcoal flex items-center justify-center p-2">
        <Image
          src={`/characters/${character.slug}.jpg`}
          alt={`${character.name} robotic character by MASH VENTURES`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-center transition duration-500 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        />
      </div>
    );
  }

  const soon = !character.available;
  return (
    <div
      role="img"
      aria-label={soon ? "More robotic characters coming soon" : `${character.name} robotic character silhouette`}
      className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-gunmetal via-charcoal to-charcoal"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="animate-pulse-glow absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-mash-red/40 blur-3xl" />
      {soon ? (
        <p className="relative mb-24 text-center text-xs font-semibold uppercase tracking-[0.4em] text-chrome/60">
          New
          <br />
          characters
          <br />
          loading
        </p>
      ) : (
        <svg viewBox="0 0 200 300" className="relative h-[88%] w-auto" aria-hidden="true">
          <defs>
            <linearGradient id={`m-${character.slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e9edf2" />
              <stop offset="0.5" stopColor="#8b94a1" />
              <stop offset="1" stopColor="#2a2e35" />
            </linearGradient>
          </defs>
          <rect x="72" y="14" width="56" height="52" rx="10" fill={`url(#m-${character.slug})`} />
          <rect x="82" y="30" width="36" height="9" rx="4" fill="#e10600" />
          <rect x="90" y="66" width="20" height="14" fill="#555c68" />
          <path d="M40 90 L160 90 L172 150 L28 150 Z" fill={`url(#m-${character.slug})`} />
          <rect x="84" y="106" width="32" height="24" rx="4" fill="#e10600" opacity="0.9" />
          <rect x="14" y="88" width="38" height="30" rx="8" fill="#555c68" />
          <rect x="148" y="88" width="38" height="30" rx="8" fill="#555c68" />
          <rect x="20" y="118" width="22" height="86" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="158" y="118" width="22" height="86" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="62" y="150" width="76" height="46" rx="6" fill="#3a3f48" />
          <rect x="64" y="196" width="30" height="92" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="106" y="196" width="30" height="92" rx="8" fill={`url(#m-${character.slug})`} />
          <rect x="58" y="282" width="40" height="14" rx="5" fill="#e10600" />
          <rect x="102" y="282" width="40" height="14" rx="5" fill="#e10600" />
        </svg>
      )}
    </div>
  );
}
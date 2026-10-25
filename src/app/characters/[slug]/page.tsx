import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import CharacterVisual from "@/components/ui/CharacterVisual";
import JsonLd from "@/components/ui/JsonLd";
import BookingSection from "@/components/sections/BookingSection";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import { availableCharacters, getCharacter } from "@/data/characters";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return availableCharacters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/characters/${c.slug}`,
  });
}

export default async function CharacterPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) notFound();

  const others = availableCharacters.filter((o) => o.slug !== c.slug);

  return (
    <>
      <article className="bg-charcoal pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-chrome/60">
            <Link href="/" className="hover:text-white">Home</Link> /{" "}
            <Link href="/characters" className="hover:text-white">Characters</Link> /{" "}
            <span className="text-white">{c.name}</span>
          </nav>

          <div className="mt-10 grid items-start gap-12 pb-24 lg:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-gunmetal">
              <CharacterVisual character={c} priority sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">{c.role}</p>
              <h1 className="mt-4 text-5xl font-bold uppercase tracking-tight sm:text-7xl">{c.name}</h1>
              <p className="mt-6 text-xl leading-relaxed text-chrome">{c.summary}</p>
              <div className="mt-6 space-y-4 leading-relaxed text-chrome/75">
                {c.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <Check size={18} className="text-mash-red" /> {h}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Ideal for</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {c.idealFor.map((i) => (
                  <li key={i} className="rounded-lg border border-white/10 bg-gunmetal/60 px-4 py-3 text-sm">
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={`/contact?character=${c.slug}#book`} className={btnPrimary}>
                  Book This Experience
                </Link>
                <Link href="/characters" className={btnGhost}>
                  All Characters
                </Link>
              </div>
            </div>
          </div>

          <section aria-labelledby="more-title" className="border-t border-white/10 pb-24 pt-12">
            <h2 id="more-title" className="text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              More characters
            </h2>
            <ul className="mt-6 flex flex-wrap gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/characters/${o.slug}`}
                    className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-mash-red hover:text-mash-red"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <BookingSection defaultCharacter={c.name} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Characters", path: "/characters" },
            { name: c.name, path: `/characters/${c.slug}` },
          ]),
          serviceJsonLd({
            name: `${c.name} robotic character experience`,
            description: c.seoDescription,
            path: `/characters/${c.slug}`,
            serviceType: "Robotic character appearance",
          }),
        ]}
      />
    </>
  );
}
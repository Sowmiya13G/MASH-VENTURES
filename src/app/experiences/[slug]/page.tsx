import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import BookingSection from "@/components/sections/BookingSection";
import { btnGhost, btnPrimary, container } from "@/components/ui/styles";
import { availableCharacters } from "@/data/characters";
import { experiences, getExperience } from "@/data/experiences";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) return {};
  return buildMetadata({
    title: e.seoTitle,
    description: e.seoDescription,
    path: `/experiences/${e.slug}`,
    keywords: e.keywords,
  });
}

export default async function ExperiencePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();
  const Icon = e.icon;
  const related = experiences.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <>
      <article className="bg-charcoal pb-24 pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-chrome/60">
            <Link href="/" className="hover:text-white">Home</Link> /{" "}
            <Link href="/experiences" className="hover:text-white">Experiences</Link> /{" "}
            <span className="text-white">{e.title}</span>
          </nav>

          <div className="mt-10 max-w-3xl">
            <Icon className="text-mash-red" size={44} strokeWidth={1.5} aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl">{e.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-chrome">{e.blurb}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-chrome/75">
              {e.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">Ideal for</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {e.idealFor.map((i) => (
                <li key={i} className="rounded-lg border border-white/10 bg-gunmetal/60 px-4 py-3 text-sm">
                  {i}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              Characters for this experience
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {availableCharacters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/characters/${c.slug}`}
                    className="inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition hover:border-mash-red hover:text-mash-red"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={`/contact?type=${encodeURIComponent(e.title)}#book`} className={btnPrimary}>
                Request This Experience
              </Link>
              <Link href="/experiences" className={btnGhost}>
                All Experiences
              </Link>
            </div>
          </div>

          <section aria-labelledby="related-title" className="mt-20 border-t border-white/10 pt-12">
            <h2 id="related-title" className="text-sm font-semibold uppercase tracking-[0.25em] text-mash-red">
              Related experiences
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/experiences/${r.slug}`}
                    className="block h-full rounded-xl border border-white/10 bg-gunmetal/60 p-5 font-semibold uppercase tracking-wide transition hover:border-mash-red"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <BookingSection defaultExperience={e.title} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
            { name: e.title, path: `/experiences/${e.slug}` },
          ]),
          serviceJsonLd({
            name: e.title,
            description: e.seoDescription,
            path: `/experiences/${e.slug}`,
            serviceType: e.title,
          }),
        ]}
      />
    </>
  );
}
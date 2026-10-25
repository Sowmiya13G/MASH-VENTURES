import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { availableCharacters } from "@/data/characters";
import { experiences } from "@/data/experiences";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed, honest date: search engines learn to ignore sitemaps that claim every page changes on every build.
  const lastModified = new Date(SITE.contentUpdated);

  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"]): Entry => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/characters", 0.9, "weekly"),
    ...availableCharacters.map((c) => entry(`/characters/${c.slug}`, 0.8, "monthly")),
    entry("/experiences", 0.9, "weekly"),
    ...experiences.map((e) => entry(`/experiences/${e.slug}`, 0.8, "monthly")),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.7, "monthly"),
  ];
}
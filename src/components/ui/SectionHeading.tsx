import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  /** Heading level. Use h1 only once per page. */
  as?: "h1" | "h2";
  /** Id placed on the heading so the parent <section> can reference it with aria-labelledby. */
  id?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  id,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-mash-red">{eyebrow}</p>}
      <Tag id={id} className="text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </Tag>
      {children && <div className="mt-5 text-base leading-relaxed text-chrome/80 sm:text-lg">{children}</div>}
    </Reveal>
  );
}
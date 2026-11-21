import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import SectionHeading from "@/components/ui/SectionHeading";
import { container } from "@/components/ui/styles";

export default function FaqSection() {
  return (
    <section className="bg-charcoal py-16 sm:py-24 lg:py-32" aria-labelledby="faq-title">
      <div className={`${container} grid gap-8 sm:gap-14 lg:grid-cols-[1fr_1.4fr]`}>
        <SectionHeading id="faq-title" eyebrow="Good to Know" title="Frequently Asked Questions" />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4 sm:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-semibold">
                {f.q}
                <Plus className="shrink-0 text-mash-red transition group-open:rotate-45" size={20} aria-hidden="true" />
              </summary>
              <p className="mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-base leading-relaxed text-chrome/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
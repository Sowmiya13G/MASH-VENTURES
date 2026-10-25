import { MessageCircle } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { btnGhost, container } from "@/components/ui/styles";
import { whatsappLink } from "@/lib/site";

type BookingSectionProps = {
  /** Pre-selects a character (used on character pages). */
  defaultCharacter?: string;
  /** Pre-selects an experience (used on experience pages). */
  defaultExperience?: string;
  /** Set on /contact, where this section holds the page's only <h1>. */
  asPage?: boolean;
};

export default function BookingSection({ defaultCharacter = "", defaultExperience = "", asPage = false }: BookingSectionProps) {
  const wa = whatsappLink();
  return (
    <section id="book" className="scroll-mt-20 bg-black py-24 sm:py-32" aria-labelledby="book-title">
      <div className={`${container} grid gap-14 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <SectionHeading id="book-title" eyebrow="Book an Experience" title="Request Your Experience" as={asPage ? "h1" : "h2"}>
            Tell us about your venue, date and audience. We will come back with availability and a tailored experience.
          </SectionHeading>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-8`}>
              <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
            </a>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 bg-gunmetal/60 p-6 sm:p-10">
          <BookingForm defaultCharacter={defaultCharacter} defaultExperience={defaultExperience} whatsappHref={wa} />
        </div>
      </div>
    </section>
  );
}
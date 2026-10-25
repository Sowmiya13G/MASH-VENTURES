"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { DURATIONS, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { availableCharacters } from "@/data/characters";
import { experiences } from "@/data/experiences";
import { btnPrimary } from "@/components/ui/styles";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-chrome/40 transition focus:border-mash-red focus:outline-none aria-[invalid=true]:border-mash-red";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-widest text-chrome/70";

type FieldProps = {
  id: keyof EnquiryInput;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + accessible error message. */
function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-mash-red">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria attributes that link an invalid control to its error message. */
const a11y = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

type BookingFormProps = {
  defaultCharacter?: string;
  defaultExperience?: string;
  whatsappHref?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function BookingForm({ defaultCharacter = "", defaultExperience = "", whatsappHref = "" }: BookingFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { character: defaultCharacter, experience: defaultExperience },
  });

  useEffect(() => {
    // Computed on the client so the statically generated page never has a stale "today".
    setMinDate(new Date().toISOString().split("T")[0]);

    // Pre-select from links such as /contact?character=titan or /contact?type=Brand%20Activations.
    // Read client-side so /contact can stay a fast, fully static page.
    const params = new URLSearchParams(window.location.search);
    const character = availableCharacters.find((c) => c.slug === params.get("character"));
    const experience = experiences.find((e) => e.title === params.get("type"));
    if (character) setValue("character", character.name);
    if (experience) setValue("experience", experience.title);
  }, [setValue]);

  async function onSubmit(values: EnquiryInput) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");

      setStatus("sent");
      reset();
      // Optional GA4 conversion event (only fires when analytics is enabled).
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
        event_category: "booking",
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-mash-red/50 bg-gunmetal p-10 text-center">
        <CheckCircle2 className="mx-auto text-mash-red" size={48} aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-bold uppercase">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-chrome/75">
          Thank you. We have sent a confirmation to your email and our team will contact you shortly with availability
          and next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-chrome/70 underline hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2" aria-label="Booking enquiry form">
      <Field id="name" label="Full name *" error={errors.name?.message}>
        <input id="name" autoComplete="name" className={inputClass} placeholder="Your name" {...a11y("name", errors.name?.message)} {...register("name")} />
      </Field>

      <Field id="company" label="Company or organisation" error={errors.company?.message}>
        <input id="company" autoComplete="organization" className={inputClass} placeholder="Optional" {...register("company")} />
      </Field>

      <Field id="phone" label="Phone number *" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          placeholder="+91 98765 43210"
          {...a11y("phone", errors.phone?.message)}
          {...register("phone")}
        />
      </Field>

      <Field id="email" label="Email address *" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="you@company.com"
          {...a11y("email", errors.email?.message)}
          {...register("email")}
        />
      </Field>

      <Field id="location" label="Event location *" error={errors.location?.message}>
        <input id="location" className={inputClass} placeholder="Venue and city" {...a11y("location", errors.location?.message)} {...register("location")} />
      </Field>

      <Field id="date" label="Preferred date *" error={errors.date?.message}>
        <input id="date" type="date" min={minDate} className={inputClass} {...a11y("date", errors.date?.message)} {...register("date")} />
      </Field>

      <Field id="experience" label="Type of experience *" error={errors.experience?.message}>
        <select id="experience" className={inputClass} {...a11y("experience", errors.experience?.message)} {...register("experience")}>
          <option value="">Select an experience</option>
          {experiences.map((e) => (
            <option key={e.slug} value={e.title}>
              {e.title}
            </option>
          ))}
          <option value="Custom Character Experience">Custom Character Experience</option>
        </select>
      </Field>

      <Field id="character" label="Preferred character *" error={errors.character?.message}>
        <select id="character" className={inputClass} {...a11y("character", errors.character?.message)} {...register("character")}>
          <option value="">Select a character</option>
          {availableCharacters.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <Field id="duration" label="Duration required *" error={errors.duration?.message} className="sm:col-span-2">
        <select id="duration" className={inputClass} {...a11y("duration", errors.duration?.message)} {...register("duration")}>
          <option value="">Select a duration</option>
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>

      <Field id="requirements" label="Additional requirements" error={errors.requirements?.message} className="sm:col-span-2">
        <textarea
          id="requirements"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your venue, audience, branding or any special requests"
          {...a11y("requirements", errors.requirements?.message)}
          {...register("requirements")}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} w-full disabled:opacity-60 sm:w-auto`}>
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending
            </>
          ) : (
            "Request Your Experience"
          )}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm text-mash-red">
            {serverError}{" "}
            {whatsappHref && (
              <a href={whatsappHref} className="underline" target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp instead.
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
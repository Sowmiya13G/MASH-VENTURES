"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { DURATIONS, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { availableCharacters } from "@/data/characters";
import { experiences } from "@/data/experiences";
import { btnPrimary } from "@/components/ui/styles";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-3.5 sm:px-4 py-3 sm:py-3.5 text-base text-white placeholder:text-chrome/40 transition focus:border-mash-red focus:outline-none aria-[invalid=true]:border-mash-red [&>option]:bg-zinc-900 [&>option]:text-white";
const labelClass = "mb-1.5 sm:mb-2 block text-xs font-semibold uppercase tracking-widest text-chrome/70 font-tech";

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
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-mash-red font-tech">
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

type Status = "idle" | "sending" | "error";

export default function BookingForm({
  defaultCharacter = "",
  defaultExperience = "",
  whatsappHref = "",
}: BookingFormProps) {
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

    // Pre-select from query parameters such as /contact?character=titan or /contact?type=Brand%20Activations.
    const params = new URLSearchParams(window.location.search);
    const character = availableCharacters.find((c) => c.slug === params.get("character"));
    const experience = experiences.find((e) => e.title === params.get("type"));
    if (character) setValue("character", character.name);
    if (experience) setValue("experience", experience.title);
  }, [setValue]);

  async function onSubmit(values: EnquiryInput) {
    if (status === "sending") return; // Prevent duplicate submissions

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "We couldn't send your enquiry. Please try again.");
      }

      // Clear the form fields immediately
      reset({
        name: "",
        company: "",
        phone: "",
        email: "",
        location: "",
        date: "",
        experience: "",
        character: "",
        duration: "",
        requirements: "",
        website: "",
      });

      setStatus("idle");

      // Show top-right toast notification via Sonner package
      toast.success("Enquiry Sent Successfully", {
        description: "Thank you! Your enquiry has been sent successfully. Our team will contact you soon.",
        duration: 6000,
      });

      // Optional GA4 conversion event
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
        event_category: "booking",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "We couldn't send your enquiry. Please try again.";

      // Preserve entered details if submission fails
      setServerError(errorMessage);
      setStatus("error");

      toast.error("Submission Failed", {
        description: errorMessage,
        duration: 6000,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
      aria-label="Booking enquiry form"
    >
      <Field id="name" label="Customer Full Name *" error={errors.name?.message}>
        <input
          id="name"
          autoComplete="name"
          className={inputClass}
          placeholder="e.g. John Doe"
          {...a11y("name", errors.name?.message)}
          {...register("name")}
        />
      </Field>

      <Field id="company" label="Company Name" error={errors.company?.message}>
        <input
          id="company"
          autoComplete="organization"
          className={inputClass}
          placeholder="Optional"
          {...register("company")}
        />
      </Field>

      <Field id="phone" label="Phone Number *" error={errors.phone?.message}>
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

      <Field id="email" label="Email Address *" error={errors.email?.message}>
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

      <Field id="location" label="Event Location *" error={errors.location?.message}>
        <input
          id="location"
          className={inputClass}
          placeholder="Venue and City"
          {...a11y("location", errors.location?.message)}
          {...register("location")}
        />
      </Field>

      <Field id="date" label="Event Date *" error={errors.date?.message}>
        <input
          id="date"
          type="date"
          min={minDate}
          className={inputClass}
          {...a11y("date", errors.date?.message)}
          {...register("date")}
        />
      </Field>

      <Field id="experience" label="Experience Type *" error={errors.experience?.message}>
        <select
          id="experience"
          className={inputClass}
          {...a11y("experience", errors.experience?.message)}
          {...register("experience")}
        >
          <option value="">Select an experience</option>
          {experiences.map((e) => (
            <option key={e.slug} value={e.title}>
              {e.title}
            </option>
          ))}
          <option value="Custom Character Experience">Custom Character Experience</option>
        </select>
      </Field>

      <Field id="character" label="Preferred Character *" error={errors.character?.message}>
        <select
          id="character"
          className={inputClass}
          {...a11y("character", errors.character?.message)}
          {...register("character")}
        >
          <option value="">Select a character</option>
          {availableCharacters.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <Field id="duration" label="Event Duration *" error={errors.duration?.message} className="sm:col-span-2">
        <select
          id="duration"
          className={inputClass}
          {...a11y("duration", errors.duration?.message)}
          {...register("duration")}
        >
          <option value="">Select a duration</option>
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="requirements"
        label="Additional Requirements"
        error={errors.requirements?.message}
        className="sm:col-span-2"
      >
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
        <button
          type="submit"
          disabled={status === "sending"}
          className={`${btnPrimary} w-full disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto`}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden="true" />
              <span>SENDING ENQUIRY...</span>
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              <span>SEND ENQUIRY</span>
            </>
          )}
        </button>

        {status === "error" && (
          <p role="alert" className="mt-4 text-sm text-mash-red font-tech">
            {serverError}{" "}
            {whatsappHref && (
              <a href={whatsappHref} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp instead.
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}

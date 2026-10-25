import { z } from "zod";

export const DURATIONS = ["1 hour", "2 hours", "3-4 hours", "Full day", "Multiple days"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(120).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{8,18}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(160),
  location: z.string().trim().min(2, "Tell us where the experience will take place").max(160),
  date: z.string().trim().min(1, "Pick your preferred date"),
  experience: z.string().min(1, "Choose a type of experience"),
  character: z.string().min(1, "Choose a character"),
  duration: z.string().min(1, "Choose a duration"),
  requirements: z.string().trim().max(2000).optional(),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
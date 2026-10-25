import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const EMAIL_TIMEOUT_MS = 8_000;

/* ---------- Rate limiting ---------- */
// In-memory, per server instance. Fine for a single instance or low traffic.
// For multi-instance production, replace with Upstash Redis or similar.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

/* ---------- Email ---------- */
const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value = "") => value.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type Mail = { to: string; subject: string; html: string; replyTo?: string };

async function sendEmail({ to, subject, html, replyTo }: Mail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "MASH VENTURES <onboarding@resend.dev>",
      to: [to],
      subject: singleLine(subject),
      html,
      reply_to: replyTo,
    }),
    signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

function teamEmailHtml(d: EnquiryInput): string {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company || "-"],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Location", d.location],
    ["Preferred date", d.date],
    ["Experience", d.experience],
    ["Character", d.character],
    ["Duration", d.duration],
    ["Requirements", d.requirements || "-"],
  ];
  const body = rows
    .map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${k}</b></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`)
    .join("");
  return `<h2>New enquiry: ${escapeHtml(d.experience)}</h2><table cellpadding="8" style="border-collapse:collapse">${body}</table>`;
}

function customerEmailHtml(d: EnquiryInput): string {
  return `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="color:#e10600">Thank you, ${escapeHtml(d.name)}.</h2>
<p>We have received your enquiry for <b>${escapeHtml(d.experience)}</b> with <b>${escapeHtml(d.character)}</b> on <b>${escapeHtml(d.date)}</b>.</p>
<p>Our team will contact you shortly with availability and next steps.</p>
<p style="margin-top:28px"><b>MASH VENTURES</b><br>${SITE.taglinePrimary} ${SITE.taglineSecondary}</p></div>`;
}

/* ---------- Handler ---------- */
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "Too many requests. Please try again in a few minutes." }, 429);
  }

  // Read as text first so oversized payloads are rejected before parsing.
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend it worked so they learn nothing.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message ?? "Please check the form and try again." }, 400);
  }
  const data = parsed.data;

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry:dev] Email is not configured. Enquiry received:", data);
      return json({ ok: true, dev: true });
    }
    console.error("[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL are not set.");
    return json({ error: "Our enquiry service is temporarily unavailable. Please contact us directly." }, 503);
  }

  // Send both emails and wait for them: serverless platforms can freeze a function
  // as soon as the response is returned, which would drop any un-awaited work.
  const [team, customer] = await Promise.allSettled([
    sendEmail({
      to: ENQUIRY_TO_EMAIL,
      subject: `New enquiry: ${data.experience} (${data.name})`,
      html: teamEmailHtml(data),
      replyTo: data.email,
    }),
    sendEmail({
      to: data.email,
      subject: "We received your MASH VENTURES enquiry",
      html: customerEmailHtml(data),
    }),
  ]);

  if (customer.status === "rejected") console.error("[enquiry] confirmation email failed:", customer.reason);

  // The enquiry only counts as delivered if our own team got it.
  if (team.status === "rejected") {
    console.error("[enquiry] team notification failed:", team.reason);
    return json({ error: "We couldn't send your enquiry just now. Please try again or contact us directly." }, 502);
  }

  return json({ ok: true });
}
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const EMAIL_TIMEOUT_MS = 8_000;

/* ---------- Rate Limiting (In-Memory per instance) ---------- */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries
  if (hits.size > 500) {
    for (const [key, entry] of hits) {
      if (entry.reset < now) hits.delete(key);
    }
  }

  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

/* ---------- HTML Sanitization ---------- */
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value = "") => value.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type MailPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

async function sendResendEmail({ to, subject, html, replyTo }: MailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    process.env.ENQUIRY_FROM_EMAIL ||
    "MASH VENTURES <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject: singleLine(subject),
      html,
      reply_to: replyTo,
    }),
    signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Resend API returned status ${res.status}: ${errorText}`);
  }
}

function teamEmailHtml(d: EnquiryInput, timestamp: string): string {
  const rows: [string, string][] = [
    ["Client Name", d.name],
    ["Company / Organisation", d.company || "—"],
    ["Phone Number", d.phone],
    ["Email Address", d.email],
    ["Event Location", d.location],
    ["Preferred Date", d.date],
    ["Experience Type", d.experience],
    ["Preferred Character", d.character],
    ["Required Duration", d.duration],
  ];

  const bodyRows = rows
    .map(
      ([k, v]) => `
      <tr style="border-bottom:1px solid #22262e;">
        <td style="padding:10px 14px;color:#8e96a4;font-size:13px;font-weight:600;width:170px;background:#101216;">${escapeHtml(k)}</td>
        <td style="padding:10px 14px;color:#ffffff;font-size:14px;">${escapeHtml(v)}</td>
      </tr>`,
    )
    .join("");

  const reqHtml = d.requirements
    ? escapeHtml(d.requirements).replace(/\n/g, "<br>")
    : '<em style="color:#6b7280;">None specified</em>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New MASH VENTURES Website Enquiry</title>
</head>
<body style="margin:0;padding:24px 0;background-color:#0b0c0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
  <div style="max-width:620px;margin:0 auto;background:#14171c;border:1px solid #262a33;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background:#0b0c0e;padding:28px 32px;border-bottom:2px solid #c90010;">
      <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:2px;color:#ffffff;text-transform:uppercase;">
        MASH <span style="color:#c90010;">VENTURES</span>
      </h1>
      <p style="margin:4px 0 0 0;font-size:11px;font-weight:600;letter-spacing:1.5px;color:#f59e0b;text-transform:uppercase;">
        Inbound Website Transmission // Robotic Entertainment
      </p>
    </div>

    <!-- Alert Banner -->
    <div style="background:rgba(201,0,16,0.08);border-bottom:1px solid rgba(201,0,16,0.2);padding:14px 32px;">
      <p style="margin:0;font-size:13px;color:#c90010;font-weight:700;letter-spacing:0.5px;">
        ● NEW CLIENT BOOKING ENQUIRY
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding:32px;">
      <h3 style="margin:0 0 12px 0;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#c9ced6;text-transform:uppercase;">
        Transmission Specifications
      </h3>
      
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;border:1px solid #22262e;border-radius:8px;overflow:hidden;">
        ${bodyRows}
      </table>

      <!-- Requirements Block -->
      <h3 style="margin:0 0 12px 0;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#c9ced6;text-transform:uppercase;">
        Additional Requirements & Context
      </h3>
      <div style="background:#0b0c0e;border:1px solid #22262e;border-radius:8px;padding:16px;color:#d1d5db;font-size:14px;line-height:1.6;margin-bottom:28px;">
        ${reqHtml}
      </div>

      <!-- Quick Action -->
      <div style="text-align:center;margin:28px 0 12px 0;">
        <a href="mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent("Re: MASH VENTURES Enquiry - " + d.experience)}" style="display:inline-block;background:#c90010;color:#ffffff;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:9999px;">
          Reply to ${escapeHtml(d.name)}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0b0c0e;border-top:1px solid #22262e;padding:18px 32px;font-size:11px;color:#6b7280;line-height:1.6;">
      <p style="margin:0;">
        Transmitted via MASH VENTURES Web Portal on <strong>${escapeHtml(timestamp)}</strong>.
      </p>
      <p style="margin:3px 0 0 0;">
        Direct client reply-to is set to <a href="mailto:${escapeHtml(d.email)}" style="color:#8e96a4;">${escapeHtml(d.email)}</a>.
      </p>
    </div>

  </div>
</body>
</html>`;
}

function customerEmailHtml(d: EnquiryInput): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>We received your MASH VENTURES enquiry</title>
</head>
<body style="margin:0;padding:24px 0;background-color:#0b0c0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
  <div style="max-width:580px;margin:0 auto;background:#14171c;border:1px solid #262a33;border-radius:12px;overflow:hidden;">
    <div style="background:#0b0c0e;padding:28px 32px;border-bottom:2px solid #c90010;">
      <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:2px;color:#ffffff;text-transform:uppercase;">
        MASH <span style="color:#c90010;">VENTURES</span>
      </h1>
      <p style="margin:4px 0 0 0;font-size:11px;letter-spacing:1.5px;color:#f59e0b;text-transform:uppercase;">
        Larger-Than-Life Robotic Entertainment
      </p>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px 0;font-size:20px;font-weight:700;color:#ffffff;">
        Thank you, ${escapeHtml(d.name)}.
      </h2>
      <p style="color:#c9ced6;font-size:15px;line-height:1.6;margin:0 0 20px 0;">
        We have received your enquiry for <strong>${escapeHtml(d.experience)}</strong> with <strong>${escapeHtml(d.character)}</strong> on <strong>${escapeHtml(d.date)}</strong> at <strong>${escapeHtml(d.location)}</strong>.
      </p>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 28px 0;">
        Our team will review your requirements and contact you shortly with availability, production details, and next steps.
      </p>
      <div style="border-top:1px solid #22262e;padding-top:20px;color:#6b7280;font-size:12px;line-height:1.6;">
        <p style="margin:0;font-weight:600;color:#ffffff;">MASH VENTURES</p>
        <p style="margin:2px 0 0 0;">${SITE.taglinePrimary} ${SITE.taglineSecondary}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/* ---------- Request Handler ---------- */
const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "Too many requests. Please try again in a few minutes." }, 429);
  }

  // Read raw text to guard against oversized payloads
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: "Request too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }

  // Honeypot spam check: bots fill hidden 'website' field
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    // Pretend success so bots do not learn or retry with variations
    return json({ ok: true });
  }

  // Validate form fields on the server
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: parsed.error.issues[0]?.message ?? "Please check all required fields and try again." },
      400,
    );
  }

  const data = parsed.data;
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL;

  // In development without API keys, simulate successful submission for developer testing
  if (!apiKey || !toEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact:dev] Email credentials not set. Simulated enquiry delivery:", {
        data,
        timestamp,
      });
      return json({ ok: true, dev: true });
    }

    console.error("[contact:prod] RESEND_API_KEY or CONTACT_TO_EMAIL is not set in environment.");
    return json({ error: "We couldn't send your enquiry. Please try again." }, 503);
  }

  try {
    // 1. Send internal notification email to MASH VENTURES team
    await sendResendEmail({
      to: toEmail,
      subject: "New MASH VENTURES Website Enquiry",
      html: teamEmailHtml(data, timestamp),
      replyTo: data.email,
    });

    // 2. Send customer confirmation receipt asynchronously
    sendResendEmail({
      to: data.email,
      subject: "We received your MASH VENTURES enquiry",
      html: customerEmailHtml(data),
    }).catch((err) => {
      console.error("[contact] Customer confirmation receipt delivery failed:", err);
    });

    return json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend email dispatch failed:", err);
    // Never expose internal API errors to customers
    return json({ error: "We couldn't send your enquiry. Please try again." }, 502);
  }
}

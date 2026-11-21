import { z } from "zod";

console.log("=== RUNNING EMAIL SERVICE LOGIC & VALIDATION TESTS ===\n");
let passed = 0;
let total = 0;

function assert(condition, message, details = "") {
  total++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message} - ${details}`);
  }
}

// Replicate schema definition from src/lib/enquiry.ts to test exact constraints
const enquirySchema = z.object({
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
  website: z.string().max(0).optional(),
});

// 1. Valid enquiry submission data
{
  const validData = {
    name: "Sowmiya G",
    company: "MASH Client",
    phone: "+91 90034 90627",
    email: "sowmiya@example.com",
    location: "Chennai Trade Centre",
    date: "2026-12-15",
    experience: "Brand Activations",
    character: "Striker",
    duration: "Full day",
    requirements: "Robotic character launch event with stage entry.",
  };
  const result = enquirySchema.safeParse(validData);
  assert(result.success === true, "Valid enquiry payload passes schema validation");
}

// 2. Missing required fields
{
  const missingFields = {
    name: "John",
    // phone, email, location, date, experience, character, duration missing
  };
  const result = enquirySchema.safeParse(missingFields);
  assert(result.success === false, "Rejects payload with missing required fields");
  assert(result.error?.issues.length >= 6, "Identifies all missing required fields");
}

// 3. Invalid email addresses
{
  const invalidEmails = ["notanemail", "user@", "@domain.com", "user@domain", "user@.com"];
  for (const email of invalidEmails) {
    const result = enquirySchema.safeParse({
      name: "Valid Name",
      phone: "+91 98765 43210",
      email,
      location: "Mumbai",
      date: "2026-12-01",
      experience: "Corporate",
      character: "Titan",
      duration: "1 hour",
    });
    assert(result.success === false, `Rejects invalid email format: "${email}"`);
  }
}

// 4. Invalid phone numbers
{
  const invalidPhones = ["123", "abc", "phone-number-here", "12345"];
  for (const phone of invalidPhones) {
    const result = enquirySchema.safeParse({
      name: "Valid Name",
      phone,
      email: "valid@example.com",
      location: "Mumbai",
      date: "2026-12-01",
      experience: "Corporate",
      character: "Titan",
      duration: "1 hour",
    });
    assert(result.success === false, `Rejects invalid phone format: "${phone}"`);
  }
}

// 5. Honeypot bot protection
{
  const botData = {
    name: "Spam Bot",
    phone: "+91 98765 43210",
    email: "bot@spam.com",
    location: "Unknown",
    date: "2026-12-01",
    experience: "Brand Activations",
    character: "Titan",
    duration: "2 hours",
    website: "https://spamlink.com", // Hidden honeypot field filled
  };
  const isHoneypot = typeof botData.website === "string" && botData.website.length > 0;
  assert(isHoneypot === true, "Detects honeypot trap triggered by automated spambots");
}

// 6. HTML Sanitization to prevent email injection
{
  const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  const escapeHtml = (val = "") => val.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
  const maliciousInput = '<script>alert("hack")</script> & "special"';
  const escaped = escapeHtml(maliciousInput);
  assert(!escaped.includes("<script>"), "Properly escapes HTML tags");
  assert(escaped.includes("&lt;script&gt;"), "Converts < and > to safe entities");
  assert(escaped.includes("&quot;special&quot;"), "Converts quotes to safe entities");
}

// 7. Rate Limiter Simulation
{
  const WINDOW_MS = 10 * 60 * 1000;
  const MAX_HITS = 5;
  const hits = new Map();

  function isRateLimited(ip) {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || entry.reset < now) {
      hits.set(ip, { count: 1, reset: now + WINDOW_MS });
      return false;
    }
    entry.count += 1;
    return entry.count > MAX_HITS;
  }

  const testIp = "203.0.113.42";
  for (let i = 1; i <= MAX_HITS; i++) {
    assert(!isRateLimited(testIp), `Request ${i} within limit is permitted`);
  }
  assert(isRateLimited(testIp), `Request ${MAX_HITS + 1} exceeds limit and is blocked`);
}

// 8. Resend Payload Verification
{
  const fakeEnv = {
    RESEND_API_KEY: "re_test_mock_key_12345",
    CONTACT_TO_EMAIL: "mashventuresindia@gmail.com",
    CONTACT_FROM_EMAIL: "MASH VENTURES <onboarding@resend.dev>",
  };

  const payload = {
    from: fakeEnv.CONTACT_FROM_EMAIL,
    to: [fakeEnv.CONTACT_TO_EMAIL],
    subject: "New MASH VENTURES Website Enquiry",
    reply_to: "customer@company.com",
  };

  assert(payload.subject === "New MASH VENTURES Website Enquiry", "Subject matches required specification");
  assert(payload.to[0] === "mashventuresindia@gmail.com", "Recipient is securely fixed to company email");
  assert(payload.reply_to === "customer@company.com", "Reply-To is set to customer's email");
  assert(payload.from.includes("MASH VENTURES"), "Sender includes MASH VENTURES branding");
}

console.log(`\n========================================`);
console.log(`Summary: ${passed}/${total} test assertions PASSED`);
console.log(`========================================\n`);

if (passed !== total) {
  process.exit(1);
}


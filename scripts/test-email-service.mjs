/**
 * Email Service Automated Test Suite
 * Sends real HTTP requests to the Next.js API server to test:
 * - Missing required fields (400)
 * - Invalid email format (400)
 * - Honeypot spam defense (200 ok silent drop)
 * - Oversized request payload (413)
 * - Rate limiting (429)
 * - Success submission (200 ok)
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log(`=== RUNNING EMAIL SERVICE TESTS AGAINST ${BASE_URL} ===\n`);
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

  // Wait for server to be responsive
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.status === 400) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!ready) {
    console.error("Server did not become ready in time.");
    process.exit(1);
  }

  // 1. Missing required fields
  {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "Test Corp",
      }),
    });
    const body = await res.json();
    assert(res.status === 400, "Rejects request with missing required fields (Status 400)", `Got ${res.status}`);
    assert(typeof body.error === "string", "Returns validation error message for missing fields");
  }

  // 2. Invalid email format
  {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        phone: "+91 98765 43210",
        email: "not-an-email",
        location: "Chennai",
        date: "2026-12-01",
        experience: "Brand Activations",
        character: "Titan",
        duration: "2 hours",
      }),
    });
    const body = await res.json();
    assert(res.status === 400, "Rejects invalid email format (Status 400)", `Got ${res.status}`);
    assert(body.error.toLowerCase().includes("email"), "Returns specific email validation error");
  }

  // 3. Honeypot spam test
  {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot User",
        phone: "+91 98765 43210",
        email: "bot@spam.com",
        location: "Unknown",
        date: "2026-12-01",
        experience: "Brand Activations",
        character: "Titan",
        duration: "2 hours",
        website: "https://spam-bot-link.ru", // Honeypot filled by bot
      }),
    });
    const body = await res.json();
    assert(res.status === 200, "Silently intercepts honeypot bot submission (Status 200)", `Got ${res.status}`);
    assert(body.ok === true, "Pretends success to bot without executing dispatch");
  }

  // 4. Oversized payload protection
  {
    const hugeString = "x".repeat(12_000);
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requirements: hugeString }),
    });
    assert(res.status === 413, "Rejects payload exceeding byte limit (Status 413)", `Got ${res.status}`);
  }

  // 5. Valid submission to /api/contact
  {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.100" },
      body: JSON.stringify({
        name: "Test Client",
        company: "Apex Tech",
        phone: "+91 98765 43210",
        email: "client@example.com",
        location: "Mumbai Grand Convention Center",
        date: "2026-12-15",
        experience: "Brand Activations",
        character: "Titan",
        duration: "Full day",
        requirements: "Looking for character stage entrance and 2 meet-and-greet sessions.",
      }),
    });
    const body = await res.json();
    assert(res.status === 200, "Accepts valid submission to /api/contact (Status 200)", `Got ${res.status}`);
    assert(body.ok === true, "Confirms successful transmission response");
  }

  // 6. Valid submission to /api/enquiry (backwards-compatibility alias)
  {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.101" },
      body: JSON.stringify({
        name: "Test Client 2",
        company: "Nexus Media",
        phone: "+91 98765 43210",
        email: "client2@example.com",
        location: "Bangalore",
        date: "2026-12-18",
        experience: "Shopping Mall Experiences",
        character: "Striker",
        duration: "Full day",
        requirements: "Atrium character display",
      }),
    });
    const body = await res.json();
    assert(res.status === 200, "Accepts valid submission to legacy /api/enquiry alias (Status 200)", `Got ${res.status}`);
    assert(body.ok === true, "Confirms alias route returns ok: true");
  }

  // 7. Rate limiting test
  {
    let rateLimited = false;
    for (let i = 0; i < 7; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.99" },
        body: JSON.stringify({
          name: `Rapid User ${i}`,
          phone: "+91 98765 43210",
          email: "rapid@example.com",
          location: "Delhi",
          date: "2026-12-20",
          experience: "Corporate Experiences",
          character: "Striker",
          duration: "1 hour",
        }),
      });
      if (res.status === 429) {
        rateLimited = true;
        break;
      }
    }
    assert(rateLimited, "Rate limiter triggers after threshold from same IP (Status 429)");
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed}/${total} assertions PASSED`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});

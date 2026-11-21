import { spawn } from "node:child_process";

const PORT = 3009;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log("Starting Next.js production server for API testing...");
  const server = spawn("node", ["./node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "inherit"],
    env: { ...process.env, PORT: String(PORT) },
  });

  // Wait for server ready line
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      process.stdout.write(text);
      if (text.includes("Ready in") || text.includes("Local:")) {
        resolve();
      }
    });
    server.on("error", reject);
    server.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Server exited prematurely with code ${code}`));
    });
  });

  console.log(`\nServer ready at ${BASE_URL}. Running test assertions...\n`);

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

  try {
    // 1. Missing required fields validation
    {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: "Test Corp" }),
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
          email: "invalid-email-string",
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
          name: "Spam Bot",
          phone: "+91 98765 43210",
          email: "bot@spamdomain.com",
          location: "Unknown",
          date: "2026-12-01",
          experience: "Brand Activations",
          character: "Titan",
          duration: "2 hours",
          website: "https://spam-link.ru", // Bot filled hidden field
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
        }),
      });
      const body = await res.json();
      assert(res.status === 200, "Accepts valid submission to /api/contact (Status 200)", `Got ${res.status}`);
      assert(body.ok === true, "Returns ok: true confirmation");
    }

    // 6. Valid submission to legacy /api/enquiry alias
    {
      const res = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.101" },
        body: JSON.stringify({
          name: "Corporate Client",
          company: "Enterprise Ltd",
          phone: "+91 98765 43210",
          email: "enterprise@example.com",
          location: "Bengaluru Tech Park",
          date: "2026-12-20",
          experience: "Corporate Experiences",
          character: "Titan",
          duration: "3-4 hours",
          requirements: "Annual day keynote appearance.",
        }),
      });
      const body = await res.json();
      assert(res.status === 200, "Legacy /api/enquiry alias works seamlessly (Status 200)", `Got ${res.status}`);
      assert(body.ok === true, "Alias route returns ok: true");
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
            date: "2026-12-25",
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
      assert(rateLimited, "Rate limiter kicks in and returns 429 after threshold", "Expected 429");
    }

    console.log(`\n========================================`);
    console.log(`All Tests: ${passed}/${total} assertions PASSED`);
    console.log(`========================================\n`);

    if (passed !== total) {
      process.exitCode = 1;
    }
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});


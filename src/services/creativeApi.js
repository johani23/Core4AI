// creativeApi.js (v3 - AutoRoute Resolver)

const ROUTES = [
  "/api/creative/generate",
  "/api/creative/generate_text",
  "/api/creative/generate-content",
];

export async function generateCreative(payload = {}) {
  // 1) جرّب POST
  for (const route of ROUTES) {
    try {
      const res = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) return await res.json();
    } catch (_) {}
  }

  // 2) جرّب GET fallback
  for (const route of ROUTES) {
    try {
      const res = await fetch(route);

      if (res.ok) return await res.json();
    } catch (_) {}
  }

  throw new Error("❌ No creative generation API route found");
}

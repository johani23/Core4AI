// creativeApi.js (v3 - AutoRoute Resolver)

const ROUTES = [
  "/api/creative/generate",
  "/api/creative/generate_text",
  "/api/creative/generate-content",
];

export async function generateCreative(payload = {}) {
  // 1) Ã˜Â¬Ã˜Â±Ã™â€˜Ã˜Â¨ POST
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

  // 2) Ã˜Â¬Ã˜Â±Ã™â€˜Ã˜Â¨ GET fallback
  for (const route of ROUTES) {
    try {
      const res = await fetch(route);

      if (res.ok) return await res.json();
    } catch (_) {}
  }

  throw new Error("Ã¢ÂÅ’ No creative generation API route found");
}


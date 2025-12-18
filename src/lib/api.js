// src/lib/api.js
const RAW_BASE = import.meta.env.VITE_API_BASE_URL;

if (!RAW_BASE) {
  console.error("❌ VITE_API_BASE_URL is not defined");
}

// 🔒 normalize base URL
const API_BASE = RAW_BASE.replace(/\/+$/, "");

export async function apiFetch(path, options = {}) {
  const safePath = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`${API_BASE}${safePath}`, {
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
}

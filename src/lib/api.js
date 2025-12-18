const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Accept": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}`);
  }

  return res.json();
}

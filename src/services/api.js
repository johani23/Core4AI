const API_BASE = "https://core4ai-backend-o3ie.onrender.com";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function getMerchantProducts() {
  return apiFetch("/api/merchant/products/");
}

export function createProduct(formData) {
  return fetch(`${API_BASE}/api/merchant/products/`, {
    method: "POST",
    body: formData,
  }).then((r) => r.json());
}

export function getProductMIT(productId) {
  return apiFetch(`/api/merchant/products/${productId}/mit`);
}

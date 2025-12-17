const API_BASE = "/api";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function getMerchantProducts() {
  return apiFetch("/merchant/products/");
}

export function createProduct(formData) {
  return fetch("/api/merchant/products/", {
    method: "POST",
    body: formData,
  }).then(r => r.json());
}

export function getProductMIT(productId) {
  return apiFetch(`/merchant/products/${productId}/mit`);
}

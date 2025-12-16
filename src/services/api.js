// src/services/api.js
const API_BASE = "/api";
const JSON_HEADERS = { "Content-Type": "application/json" };

async function apiFetch(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: JSON_HEADERS,
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

/* =========================
   MERCHANT PRODUCTS
========================= */

export async function createProduct(merchantId, payload) {
  return apiFetch(`/merchant/${merchantId}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMerchantProducts(merchantId) {
  return apiFetch(`/merchant/${merchantId}/products`);
}

/* =========================
   EXPORT
========================= */

export default {
  createProduct,
  getMerchantProducts,
};

// ============================================================
// Core4.AI – Unified API Layer (PRODUCTION SAFE)
// ============================================================

const API_BASE = "/api";
const JSON_HEADERS = { "Content-Type": "application/json" };

// ---------- helpers ----------
async function handleResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text);
  }
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: JSON_HEADERS,
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return handleResponse(res);
}

// ---------- MERCHANT ----------
export function createProduct(payload) {
  return apiFetch("/merchant/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMerchantProducts(merchantId) {
  return apiFetch(`/merchant/${merchantId}/products`);
}

// ---------- default ----------
export default {
  createProduct,
  getMerchantProducts,
};

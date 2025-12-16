// ============================================================
// 💚 Core4.AI – Unified API Layer (FINAL – PRODUCTION SAFE)
// Uses Render Static Rewrite → Backend Proxy (/api)
// ============================================================

const API_BASE = "/api";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

// ------------------------------------------------------------
// Internal fetch helper
// ------------------------------------------------------------
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...JSON_HEADERS,
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();

  // Important: detect HTML (index.html) early
  if (text.startsWith("<!doctype") || text.startsWith("<html")) {
    throw new Error(
      "API returned HTML instead of JSON. Check endpoint or rewrite rules."
    );
  }

  if (!res.ok) {
    throw new Error(text || `HTTP ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("Invalid JSON response: " + text);
  }
}

// ============================================================
// 🛒 MERCHANT – PRODUCTS
// ============================================================

// CREATE product
export function createProduct(merchantId, payload) {
  if (!merchantId) {
    throw new Error("merchantId is required");
  }

  return apiFetch(`/merchant/${merchantId}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// GET merchant products
export function getMerchantProducts(merchantId) {
  if (!merchantId) {
    throw new Error("merchantId is required");
  }

  return apiFetch(`/merchant/${merchantId}/products`);
}

// ============================================================
// 💰 PRICING
// ============================================================
export function updateProductPrice(productId, price) {
  if (!productId) {
    throw new Error("productId is required");
  }

  return apiFetch(`/product/${productId}/update-price`, {
    method: "POST",
    body: JSON.stringify({ price }),
  });
}

// ============================================================
// EXPORT DEFAULT (optional convenience)
// ============================================================
export default {
  createProduct,
  getMerchantProducts,
  updateProductPrice,
};

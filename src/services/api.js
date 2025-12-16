// ============================================================================
// 💚 Core4.AI – Unified API Layer (PRODUCTION SAFE)
// ============================================================================

// ✅ يعتمد على البيئة تلقائيًا
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://core4ai-backend.onrender.com";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function safeFetch(url, fallback, options = {}) {
  try {
    const res = await fetch(url, options);
    return await handleResponse(res);
  } catch (err) {
    console.warn("API fallback:", url, err.message);
    return fallback;
  }
}

// ------------------------------------------------------------
// MERCHANT – PRODUCTS
// ------------------------------------------------------------
export async function getMerchantProducts(merchantId) {
  return safeFetch(
    `${API_BASE}/api/merchant/${merchantId}/products`,
    []
  );
}

export async function createMerchantProduct(merchantId, payload) {
  return safeFetch(
    `${API_BASE}/api/merchant/${merchantId}/products`,
    null,
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(payload),
    }
  );
}

// ------------------------------------------------------------
// PRICING
// ------------------------------------------------------------
export async function updateProductPrice(productId, price) {
  return safeFetch(
    `${API_BASE}/api/product/${productId}/update-price`,
    null,
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ price }),
    }
  );
}

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------
export default {
  getMerchantProducts,
  createMerchantProduct,
  updateProductPrice,
};

export { API_BASE };

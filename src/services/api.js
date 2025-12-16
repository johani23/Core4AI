// ============================================================================
// 💚 Core4.AI – Unified API Layer (PRODUCTION CLEAN)
// Uses VITE_API_URL only – no local hardcoding
// ============================================================================

const API_BASE = import.meta.env.VITE_API_URL;
const JSON_HEADERS = { "Content-Type": "application/json" };

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
  });
  return handleResponse(res);
}

// ------------------------------------------------------------
// USER
// ------------------------------------------------------------
export function getUserProfile(userId) {
  return apiFetch(`/user/${userId}`);
}

export function getUserBadges(userId) {
  return apiFetch(`/user/${userId}/badges`);
}

// ------------------------------------------------------------
// WALLET
// ------------------------------------------------------------
export function getWallet(userId) {
  return apiFetch(`/wallet/${userId}`);
}

// ------------------------------------------------------------
// POSTS
// ------------------------------------------------------------
export function getPosts() {
  return apiFetch(`/posts`);
}

export function addPost(title, content) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("content", content);

  return apiFetch(`/posts`, {
    method: "POST",
    body: fd,
  });
}

// ------------------------------------------------------------
// GROUPS / TRIBES
// ------------------------------------------------------------
export function getGroups() {
  return apiFetch(`/groups`);
}

export function getGroupMetrics(groupId) {
  return apiFetch(`/groups/${groupId}/metrics`);
}

export function runCohesionAnalysis(groupId) {
  return apiFetch(`/groups/${groupId}/cohesion`);
}

// ------------------------------------------------------------
// MERCHANT – PRODUCTS
// ------------------------------------------------------------
export function getMerchantProducts(merchantId) {
  return apiFetch(`/api/merchant/${merchantId}/products`);
}

export function createProduct(merchantId, payload) {
  return apiFetch(`/api/merchant/${merchantId}/products`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
}

export function updateProductPrice(productId, price) {
  return apiFetch(`/api/product/${productId}/update-price`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ price }),
  });
}

// ------------------------------------------------------------
// CAMPAIGNS
// ------------------------------------------------------------
export function getCampaigns(merchantId) {
  return apiFetch(`/api/merchant/${merchantId}/campaigns`);
}

// ------------------------------------------------------------
// MARKET / PRICING
// ------------------------------------------------------------
export function getMarketInsights() {
  return apiFetch(`/api/market/insights`);
}

export function getPricingRecommendations(productId) {
  return apiFetch(`/api/product/${productId}/pricing`);
}

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------
export {
  API_BASE,
  JSON_HEADERS,
};

// src/services/api.js
import { apiFetch } from "@/lib/api";

export async function getMerchantProducts() {
  return apiFetch("/api/merchant/products/");
}

export async function getProductMIT(productId) {
  return apiFetch(`/api/merchant/products/${productId}/mit`);
}

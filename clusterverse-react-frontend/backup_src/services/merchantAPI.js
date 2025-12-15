import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Core4.AI â€“ MVP 18
 * Merchant API service for offers and registration.
 */

export async function getActiveOffers() {
  try {
    const res = await axios.get(`${API}/merchant/offers/active`);
    return res.data.offers || [];
  } catch (err) {
    console.error("âŒ Error fetching active offers:", err);
    return [];
  }
}

export async function registerMerchant(name, category) {
  const form = new FormData();
  form.append("name", name);
  form.append("category", category);
  const res = await axios.post(`${API}/merchant/register`, form);
  return res.data;
}

export async function createOffer(offerData) {
  const res = await axios.post(`${API}/merchant/offers`, offerData);
  return res.data;
}

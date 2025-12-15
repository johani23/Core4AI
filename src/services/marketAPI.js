import axios from "axios";
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getEMI() {
  const res = await axios.get(`${BASE}/market/emi`);
  return res.data;
}
export async function getMarketAdvice() {
  const res = await axios.get(`${BASE}/market/advice`);
  return res.data;
}


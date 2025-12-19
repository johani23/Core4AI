const API_BASE =
  import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

export async function pushDemand(event) {
  try {
    await fetch(`${API_BASE}/api/demand/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  } catch (e) {
    // silent fail — لا نكسر UX
    console.warn("Demand signal failed");
  }
}

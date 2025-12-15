// ============================================================================
// 📡 Core4.AI – Frontend Event Bus (Buyer → Merchant Analytics)
// ============================================================================

// Simple event dispatcher – can later be connected to backend API
export const sendEvent = (eventName, payload = {}) => {
  console.log("📡 Event Sent:", eventName, payload);

  // TODO: Send to backend analytics later:
  // fetch("/api/analytics/event", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ eventName, payload, ts: new Date().toISOString() }),
  // });
};

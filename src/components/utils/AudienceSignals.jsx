// ============================================================================
// 💚 Core4.AI – audienceSignals.js (v1)
// ----------------------------------------------------------------------------
// Utility بسيط لإرسال أحداث التفاعل (Signals) إلى الـ backend
// ============================================================================

export async function sendAudienceEvent(eventType, payload = {}) {
  try {
    await fetch("/api/audience/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        payload,
        ts: new Date().toISOString(),
      }),
    });
  } catch (e) {
    console.warn("⚠️ Failed to send audience event, logging only:", {
      eventType,
      payload,
    });
  }
}

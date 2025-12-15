// ============================================================================
// Ã°Å¸â€™Å¡ Core4.AI Ã¢â‚¬â€œ audienceSignals.js (v1)
// ----------------------------------------------------------------------------
// Utility Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â· Ã™â€žÃ˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ž Ã˜Â£Ã˜Â­Ã˜Â¯Ã˜Â§Ã˜Â« Ã˜Â§Ã™â€žÃ˜ÂªÃ™ÂÃ˜Â§Ã˜Â¹Ã™â€ž (Signals) Ã˜Â¥Ã™â€žÃ™â€° Ã˜Â§Ã™â€žÃ™â‚¬ backend
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
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Failed to send audience event, logging only:", {
      eventType,
      payload,
    });
  }
}


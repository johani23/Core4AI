// ============================================================================
// 💚 Core4.AI — audienceApi.jsx (SAFE MOCK MODE v2.0)
// ============================================================================
// This version:
//
// ✔ NO top-level console logs
// ✔ NO re-executed code on every import
// ✔ NO unicode corruption
// ✔ Pure functions that NEVER cause re-renders
// ============================================================================

// ⚠️ IMPORTANT:
// We DO NOT run any code at top-level.
// No console logs. No warnings. No side-effects.

export function fetchBuyerPersona(userId = "buyer_001") {
  return Promise.resolve({
    id: userId,
    name: "Core4 User",
    age: 27,
    personality: "Explorer",
    interests: ["Tech", "Beauty", "Events"],
    mood: "positive",
    momentum: "UP",
    emoji: "😊",
    summary:
      "User shows high engagement in creator content and positive purchase intent.",
  });
}

export function fetchAudienceFeed(userId = "buyer_001") {
  return Promise.resolve([
    {
      id: 1,
      type: "insight",
      title: "Top Engagement Window",
      content: "Your audience is most active between 6–10 PM.",
      icon: "📊",
    },
    {
      id: 2,
      type: "behavior",
      title: "Purchase Signal Detected",
      content: "User interacted with 3 beauty products in the last 24 hours.",
      icon: "🛍️",
    },
    {
      id: 3,
      type: "emotion",
      title: "Emotional Tone",
      content: "User is currently in exploration mode.",
      icon: "🧠",
    },
  ]);
}

export function fetchAudienceScore(userId = "buyer_001") {
  return Promise.resolve({
    engagement: 78,
    trust: 64,
    conversionLikelihood: 55,
    heatmapColor: "#8a2be2",
  });
}

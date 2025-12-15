// ============================================================================
// Ã°Å¸â€™Å½ Core4.AI Ã¢â‚¬â€œ dataSync.js (Noor FIXED v4 Ã¢â‚¬â€ Stable + Compatible)
// ============================================================================
// Works with:
//  - GroupStats.jsx (momentum colors)
//  - Dashboard widgets
//  - Offline safe mode
// ============================================================================

// Momentum color used across Tribe, Dashboard, and GroupStats
export function getMomentumColor(trend) {
  if (!trend) return "#aaa";

  const t = trend.toUpperCase();

  if (t === "UP") return "#4FBF77";     // green
  if (t === "DOWN") return "#D9534F";   // red
  if (t === "STEADY") return "#CBA65C"; // gold

  return "#999";
}

// Optional mock messages (instead of getMarketMessages)
export const marketMessages = [
  { id: 1, msg: "Ã˜Â§Ã™â€žÃ˜Â³Ã™Ë†Ã™â€š Ã™â€¦Ã˜Â³Ã˜ÂªÃ™â€šÃ˜Â± Ã˜Â­Ã˜Â§Ã™â€žÃ™Å Ã˜Â§Ã™â€¹ Ã¢Å“Â¨" },
  { id: 2, msg: "Ã˜Â§Ã™â€žÃ˜ÂªÃ™ÂÃ˜Â§Ã˜Â¹Ã™â€ž Ã™ÂÃ™Å  Ã˜Â§Ã˜Â±Ã˜ÂªÃ™ÂÃ˜Â§Ã˜Â¹ Ã°Å¸â€œË†" },
  { id: 3, msg: "Ã˜Â·Ã˜Â§Ã™â€šÃ˜Â© Ã˜Â§Ã™â€žÃ™â€šÃ˜Â¨Ã˜Â§Ã˜Â¦Ã™â€ž Ã™â€¦Ã™â€¦Ã˜ÂªÃ˜Â§Ã˜Â²Ã˜Â© Ã°Å¸â€Â¥" },
];

// No external API calls Ã¢â‚¬â€ safe for offline mode
export default {
  getMomentumColor,
  marketMessages,
};


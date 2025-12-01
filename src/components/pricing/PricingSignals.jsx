// ============================================================================
// ðŸ’š PricingSignals.js â€” Overpricing / Underpricing Detector
// ============================================================================

export function detectPriceStatus({ merchantPrice, minPrice, maxPrice, optimalPrice }) {
  const buffer = optimalPrice * 0.05; // 5%

  if (merchantPrice < minPrice) {
    return {
      status: "underpriced",
      message: "Ø§Ù„Ø³Ø¹Ø± Ø£Ù‚Ù„ Ù…Ù† Ø§Ù„Ù…Ø¯Ù‰ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ â€“ Ù‚Ø¯ ØªÙÙ‚Ø¯ Ø±Ø¨Ø­ Ù…Ø­ØªÙ…Ù„.",
      color: "green",
    };
  }

  if (merchantPrice > maxPrice) {
    return {
      status: "overpriced",
      message: "Ø§Ù„Ø³Ø¹Ø± Ø£Ø¹Ù„Ù‰ Ù…Ù† Ø§Ù„Ù…Ø¯Ù‰ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ â€“ Ù‚Ø¯ ØªØ®Ø³Ø± Ù…Ø¨ÙŠØ¹Ø§Øª.",
      color: "red",
    };
  }

  if (merchantPrice < optimalPrice - buffer) {
    return {
      status: "underpriced",
      message: "Ø§Ù„Ø³Ø¹Ø± Ø£Ù‚Ù„ Ù…Ù† Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø£Ù…Ø«Ù„. Ø¨Ø¥Ù…ÙƒØ§Ù†Ùƒ Ø±ÙØ¹ Ø§Ù„Ø³Ø¹Ø± Ø¨Ø£Ù…Ø§Ù†.",
      color: "green",
    };
  }

  if (merchantPrice > optimalPrice + buffer) {
    return {
      status: "overpriced",
      message: "Ø§Ù„Ø³Ø¹Ø± Ø£Ø¹Ù„Ù‰ Ù…Ù† Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø£Ù…Ø«Ù„. Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ù‚Ø¯ ØªØªØ£Ø«Ø±.",
      color: "red",
    };
  }

  return {
    status: "ideal",
    message: "Ø§Ù„Ø³Ø¹Ø± Ø¶Ù…Ù† Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ.",
    color: "yellow",
  };
}

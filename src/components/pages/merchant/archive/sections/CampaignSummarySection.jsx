// ============================================================================
// ðŸ’š CampaignSummarySection.jsx (v17 â€” Accurate Summary)
// ============================================================================

import React from "react";

export default function CampaignSummarySection({
  product,
  productIQ,
  competitorMatch,
  creative,
  merchantIntel,
}) {

  const ready =
    product && productIQ && competitorMatch && creative && merchantIntel;

  if (!ready) {
    return (
      <div className="bg-white border rounded-xl p-6 mt-6">
        <p className="text-gray-500 text-center">
          ...ÙŠØªÙ… ØªØ¬Ù‡ÙŠØ² Ø§Ù„Ù…Ù„Ø®Øµ â€” Ø£ÙƒÙ…Ù„ Ø§Ù„Ø®Ø·ÙˆØ§Øª
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-md">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸš€ Ù…Ù„Ø®Øµ Ø§Ù„Ø­Ù…Ù„Ø© Ø§Ù„Ø¬Ø§Ù‡Ø² Ù„Ù„Ù†Ø´Ø±
      </h2>

      <h3 className="font-bold text-lg">ðŸ“Œ Ø§Ù„Ù…Ù†ØªØ¬</h3>
      <p>{product.name}</p>
      <p>Ø³Ø¹Ø±Ù‡: {product.price} Ø±.Ø³</p>

      <h3 className="font-bold text-lg mt-6">ðŸŽ¯ ProductIQ</h3>
      <p>Ø§Ù„Ù…Ù†Ø§ÙØ³: {productIQ.competitor.name}</p>
      <p>Ø³Ø¹Ø±Ù‡: {productIQ.competitor.price} Ø±.Ø³</p>
      <p>Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø©: +{productIQ.feature_value} Ø±.Ø³</p>
      <p>Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {productIQ.recommended_price} Ø±.Ø³</p>

      <div className="border-t mt-6 pt-4 text-center">
        <p className="font-bold text-green-700 text-lg">
          ðŸŽ‰ Ø§Ù„Ø­Ù…Ù„Ø© Ø¬Ø§Ù‡Ø²Ø© â€” Ø§Ù†Ø·Ù„Ù‚!
        </p>
      </div>
    </div>
  );
}

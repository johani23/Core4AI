// ======================================================================
// ðŸ’š PricingResult.jsx â€” ØµÙØ­Ø© Ø§Ù„Ù†ØªØ§Ø¦Ø¬ Ø¨Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©
// ======================================================================

import React from "react";

export default function PricingResult({ bestPrice, range }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6">

      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Ø£ÙØ¶Ù„ Ø³Ø¹Ø± Ù„Ù…Ù†ØªØ¬Ùƒ
      </h1>

      <div className="bg-green-100 border border-green-300 p-5 rounded-lg">
        <p className="text-xl font-bold">
          Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {bestPrice} Ø±ÙŠØ§Ù„
        </p>
        <p className="text-gray-700 mt-2">
          Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù„ÙŠ ÙŠØªÙ‚Ø¨Ù„Ù‡ Ø§Ù„Ù†Ø§Ø³: {range}
        </p>
      </div>

      <button 
        className="btn-yellow mt-8 w-full"
        onClick={() => window.location.href = "/merchant/campaign"}
      >
        Ø³ÙŽÙˆÙ‘Ù Ø­Ù…Ù„Ø© ØªØ³ÙˆÙŠÙ‚
      </button>

    </div>
  );
}

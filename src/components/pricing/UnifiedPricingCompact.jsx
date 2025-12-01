// ============================================================================
// ðŸ’š UnifiedPricingCompact.jsx (v1.0 BETA)
// ----------------------------------------------------------------------------
// â€¢ Compact version of UnifiedPricing for analytics dashboards
// â€¢ Focused on top 5 actionable pricing signals only
// â€¢ Clean, light, optimized for embedding inside lists or panels
// ============================================================================

import React, { useEffect, useState } from "react";

export default function UnifiedPricingCompact({ productId, onExpand }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    try {
      const res = await fetch(`/api/pricing/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("âŒ Failed to fetch compact pricing", err);
    }
    setLoading(false);
  };

  if (loading || !data) {
    return (
      <div className="text-gray-500 text-sm text-center py-3">
        â³ ØªØ­Ù…ÙŠÙ„ Ø§Ù„ØªØ³Ø¹ÙŠØ± Ø§Ù„Ù…Ø®ØªØµØ±...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border p-4">

      {/* HEADER */}
      <h3 className="text-lg font-bold text-green-700 mb-3">
        ðŸ’š AI Pricing â€” Snapshot
      </h3>

      {/* PRICE FAST BLOCKS */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        {/* Suggested Price */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­</p>
          <p className="text-lg font-bold text-green-700">
            {data.ai_suggested_price} Ø±.Ø³
          </p>
        </div>

        {/* Recommended Range */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ</p>
          <p className="font-semibold">
            {data.min_price} â€“ {data.max_price}
          </p>
        </div>

        {/* Merchant Price */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">Ø³Ø¹Ø± Ø§Ù„ØªØ§Ø¬Ø±</p>
          <p className="font-semibold">{data.last_price} Ø±.Ø³</p>
        </div>

        {/* Net Revenue */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">ØµØ§ÙÙŠ Ø§Ù„Ø±Ø¨Ø­ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹</p>
          <p className="font-semibold">{data.net_revenue} Ø±.Ø³</p>
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={onExpand}
        className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
      >
        ðŸ” ÙØªØ­ Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø§Ù„ÙƒØ§Ù…Ù„
      </button>
    </div>
  );
}

// ============================================================================
// ðŸ’š PricingOverview.jsx â€“ v22 FIXED (ML-powered Overview Panel)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function PricingOverview({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/overview/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("PricingOverview load error:", err);
      setData(null);
    }
    setLoading(false);
  };

  if (!productId) return <div className="text-gray-400">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ù†ØªØ¬ Ù…Ø­Ø¯Ø¯.</div>;
  if (loading) return <div className="text-gray-400">â³ Loading ML overviewâ€¦</div>;
  if (!data) return <div className="text-gray-400">Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ ØªØ³Ø¹ÙŠØ±.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­</p>
        <p className="text-2xl font-bold text-yellow-300">
          {data.suggested_price} Ø±.Ø³
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ</p>
        <p className="text-lg text-green-300">{data.optimal_range}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">Ø§Ù„Ø«Ù‚Ø©</p>
        <p className="text-xl text-purple-300">{data.confidence_score}%</p>
      </div>
    </div>
  );
}

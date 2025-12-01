// ============================================================================
// ðŸ’š SmartPricingDashboardPanel.jsx (v4 â€“ Embedded MIT Pricing Panel)
// ----------------------------------------------------------------------------
// â€¢ Lightweight version of SmartPricingDashboard
// â€¢ Designed specifically for CampaignBuilder integration
// â€¢ Shows MIT Final Price, Range, Confidence, Elasticity & Discount
// ============================================================================

import React, { useEffect, useState } from "react";
import RecommendedPriceBox from "@/components/analytics/RecommendedPriceBox";
import PricingBreakdown from "@/components/analytics/PricingBreakdown";
import ElasticityPanel from "@/components/analytics/ElasticityPanel";

export default function SmartPricingDashboardPanel({ productId }) {
  const [loading, setLoading] = useState(true);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    if (productId) loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/pricing/recommend/${productId}`);
      const json = await res.json();
      setPricing(json);
    } catch (err) {
      console.error("Failed to load pricing data:", err);
    }

    setLoading(false);
  };

  if (!productId)
    return (
      <div className="text-gray-400 text-center">
        Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ù†ØªØ¬ Ù…Ø­Ø¯Ø¯.
      </div>
    );

  if (loading)
    return (
      <div className="text-gray-400 text-center py-6">
        â³ Loading Pricing Engineâ€¦
      </div>
    );

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow mb-8">
      <h2 className="text-xl font-bold text-green-400 mb-4">
        ðŸ”¥ MIT Smart Pricing Panel
      </h2>

      {/* Recommended Price */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-green-300">Recommended Price</h3>
        <p className="text-3xl font-bold text-yellow-300">
          {pricing?.recommended_price} SAR
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Optimal: {pricing?.range_min} â€“ {pricing?.range_max} SAR
        </p>
        <p className="text-xs text-purple-300 mt-2">
          Confidence: {pricing?.confidence}%
        </p>
      </div>

      {/* Breakdown */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Value Breakdown</h3>
        <PricingBreakdown productId={productId} />
      </div>

      {/* Elasticity */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Elasticity</h3>
        <ElasticityPanel productId={productId} />
      </div>

      {/* Summary Note */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mt-3">
        <h3 className="font-semibold text-green-300 mb-2">MIT Summary</h3>
        <p className="text-gray-300 text-sm">
          ÙŠØ¹ØªÙ…Ø¯ Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¹Ø± Ø¹Ù„Ù‰ ØªØ­Ù„ÙŠÙ„ Ø´Ø§Ù…Ù„ Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø§ØªØŒ Ø³Ù„ÙˆÙƒ Ø§Ù„Ø³ÙˆÙ‚ØŒ 
          Ù…Ø±ÙˆÙ†Ø© Ø§Ù„Ø³Ø¹Ø±ØŒ ÙˆÙ‚ÙˆØ© Ø§Ù„Ù…Ù†ØªØ¬ ÙÙŠ Ø£Ø¹ÙŠÙ† Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡.
        </p>
      </div>
    </div>
  );
}

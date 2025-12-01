// ============================================================================
// ðŸ’š ElasticityEngine.jsx (v3.0 BETA COMPLETE)
// ----------------------------------------------------------------------------
// â€¢ Elasticity Score
// â€¢ Optimal Price
// â€¢ Revenue Projection
// â€¢ Overpricing Detector
// â€¢ Opportunity Score (0â€“100)
// â€¢ Demand + Revenue Charts
// ============================================================================

import React, { useEffect, useState } from "react";
import PricingCharts from "@/components/pricing/PricingCharts";
import { detectPriceStatus } from "@/components/pricing/PricingSignals";
import { calculateOpportunityScore } from "@/components/pricing/OpportunityScore";
import RecommendationPanel from "@/components/pricing/RecommendationPanel";


export default function ElasticityEngine({ productId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadAIPrice();
  }, [productId]);

  const loadAIPrice = async () => {
    try {
      const res = await fetch(`/api/pricing/${productId}`);
      const ai = await res.json();

      // Base AI-suggested values
      const P0 = ai.ai_suggested_price;
      const Q0 = (ai.conversions_min + ai.conversions_max) / 2;

      // Synthetic demand points for elasticity modeling
      const points = [
        { price: P0 * 0.8, demand: Q0 * 1.3 },
        { price: P0 * 0.9, demand: Q0 * 1.15 },
        { price: P0, demand: Q0 },
        { price: P0 * 1.1, demand: Q0 * 0.85 },
        { price: P0 * 1.2, demand: Q0 * 0.7 },
      ];

      // Elasticity (midpoint method)
      const elasticity =
        ((points[3].demand - points[1].demand) / points[2].demand) /
        ((points[3].price - points[1].price) / points[2].price);

      // Revenue curve
      const revenueCurve = points.map((p) => ({
        price: p.price,
        revenue: p.price * p.demand,
      }));

      // Optimal price (max revenue)
      const optimal = revenueCurve.reduce((a, b) =>
        b.revenue > a.revenue ? b : a
      );

      // Status detector
      const status = detectPriceStatus({
        merchantPrice: ai.last_price,
        minPrice: ai.min_price,
        maxPrice: ai.max_price,
        optimalPrice: optimal.price,
      });

      // ðŸš€ Opportunity Score (NEW)
      const opportunity = calculateOpportunityScore({
        elasticity,
        optimalPrice: optimal.price,
        merchantPrice: ai.last_price,
        suggestedPrice: ai.ai_suggested_price,
        revenueAtOptimal: optimal.revenue,
        revenueAtCurrent: ai.last_price * Q0,
      });

      setData({
        points,
        elasticity,
        optimalPrice: optimal.price,
        optimalRevenue: optimal.revenue,
        ai,
        status,
        opportunity,
      });
    } catch (err) {
      console.error("Elasticity Engine Error:", err);
    }
  };

  if (!data) {
    return (
      <div className="text-gray-500 text-sm py-3 text-center">
        â³ ØªØ­Ù…ÙŠÙ„ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ø±ÙˆÙ†Ø©...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 border space-y-6">

      {/* Elasticity Score */}
      <div className="p-4 bg-gray-50 rounded-xl border">
        <p className="text-xs text-gray-500">Elasticity Score</p>
        <p className="text-xl font-bold">{data.elasticity.toFixed(2)}</p>
      </div>

      {/* Optimal Pricing */}
      <div className="p-4 bg-gray-50 rounded-xl border">
        <p className="text-xs text-gray-500">Optimal Price (Revenue-Max)</p>
        <p className="text-xl font-bold text-green-700">
          {Math.round(data.optimalPrice)} Ø±.Ø³
        </p>
      </div>

      {/* Opportunity Score */}
      <div className="p-4 bg-blue-50 rounded-xl border">
        <p className="text-xs text-gray-500">AI Opportunity Score</p>
        <p className="text-2xl font-bold text-blue-700">
          {data.opportunity}/100
        </p>

        <p className="text-sm mt-1 text-gray-600">
          {data.opportunity > 80 && "ðŸ”¥ ÙØ±ØµØ© Ù…Ù…ØªØ§Ø²Ø© â€” Ø§Ø¨Ø¯Ø£ Ø­Ù…Ù„Ø© Ø§Ù„Ø¢Ù†"}
          {data.opportunity > 50 && data.opportunity <= 80 && "ðŸ’¡ ÙØ±ØµØ© Ø¬ÙŠØ¯Ø© â€” ØªØ³ØªØ­Ù‚ Ø§Ù„ØªØ¬Ø±Ø¨Ø©"}
          {data.opportunity <= 50 && "âš ï¸ ÙØ±ØµØ© Ù…Ù†Ø®ÙØ¶Ø© â€” Ù‚Ø¯ Ù„Ø§ ÙŠÙƒÙˆÙ† Ø§Ù„ÙˆÙ‚Øª Ù…Ù†Ø§Ø³Ø¨"}
        </p>
      </div>

      {/* Revenue Projection */}
      <div className="p-4 bg-gray-50 rounded-xl border">
        <p className="text-xs text-gray-500">Projected Revenue at Optimal</p>
        <p className="text-lg font-semibold">
          {Math.round(data.optimalRevenue)} Ø±.Ø³
        </p>
      </div>

      {/* Status Alert */}
      <div
        className={`p-4 rounded-xl border mt-4 bg-${data.status.color}-50`}
      >
        <h3 className={`font-bold text-${data.status.color}-700 mb-1`}>
          {data.status.status === "overpriced" && "ðŸ“‰ Ø§Ù„Ù…Ù†ØªØ¬ Ù…Ø³Ø¹Ø± Ø£Ø¹Ù„Ù‰ Ù…Ù† Ø§Ù„Ù„Ø§Ø²Ù…"}
          {data.status.status === "underpriced" && "ðŸ“ˆ Ø§Ù„Ù…Ù†ØªØ¬ Ù…Ø³Ø¹Ø± Ø£Ù‚Ù„ Ù…Ù† Ø§Ù„Ù„Ø§Ø²Ù…"}
          {data.status.status === "ideal" && "â­ Ø§Ù„Ø³Ø¹Ø± Ù…Ø«Ø§Ù„ÙŠ"}
        </h3>
        <p className="text-gray-700 text-sm">{data.status.message}</p>
      </div>

      {/* Recommendation Panel */}
        <RecommendationPanel data={data} />


      {/* Charts */}
      <div className="mt-8">
        <PricingCharts points={data.points} />
      </div>
    </div>
  );
}

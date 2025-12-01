// ============================================================================
// ðŸ’š CampaignBudgetOptimizer.jsx (Phase 15 â€“ Budget Optimizer)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignBudgetOptimizer({
  productIQ,
  readiness,
  qualityScore
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        quality_score: qualityScore,
        readiness: readiness,
        feature_value: productIQ.feature_value
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (productIQ && readiness !== null && qualityScore !== null) load();
  }, [productIQ, readiness, qualityScore]);

  if (!data)
    return (
      <div className="p-6 border bg-white rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Budget</p>
      </div>
    );

  return (
    <div className="p-6 border bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ’° Campaign Budget Optimizer
      </h2>

      <div className="space-y-3 text-gray-800">

        <p><strong>Base Budget:</strong> {data.base} Ø±.Ø³</p>
        <p><strong>Quality Factor:</strong> {data.quality_factor} Ø±.Ø³</p>
        <p><strong>Readiness Factor:</strong> {data.readiness_factor} Ø±.Ø³</p>
        <p><strong>Price Factor:</strong> {data.price_factor} Ø±.Ø³</p>

        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <p className="font-bold text-gray-700">ðŸŽ› Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø­Ù…Ù„Ø©:</p>
          <p>â€¢ Ø®Ø·Ø© Ù…Ù†Ø®ÙØ¶Ø©: {data.tiers.low} Ø±.Ø³</p>
          <p>â€¢ Ø®Ø·Ø© Ù…Ù‚ØªØ±Ø­Ø©: {data.tiers.recommended} Ø±.Ø³</p>
          <p>â€¢ Ø®Ø·Ø© Ù‚ÙˆÙŠØ©: {data.tiers.aggressive} Ø±.Ø³</p>
        </div>

      </div>
    </div>
  );
}

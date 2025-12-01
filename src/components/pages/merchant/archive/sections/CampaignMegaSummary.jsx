// ============================================================================
// ðŸ’š CampaignMegaSummary.jsx (Phase 25 â€“ Final Mega Summary)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignMegaSummary({
  product,
  productIQ,
  merchantIntel,
  readiness,
  qualityScore,
  successProbability,
  budgetData,
  funnelData,
  roiData,
  cpaData,
  audienceFitData,
  personaData,
  toneData
}) {
  const [summary, setSummary] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/mega-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price,
        feature_value: productIQ.feature_value,
        recommended_price: productIQ.recommended_price,
        fair_price: productIQ.fair_price,
        premium_price: productIQ.premium_price,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness,
        quality_score: qualityScore,
        probability: successProbability,
        budget: budgetData?.tiers?.recommended,
        impressions: funnelData?.impressions,
        clicks: funnelData?.clicks,
        add_to_cart: funnelData?.add_to_cart,
        conversions: funnelData?.conversions,
        roi: roiData?.roi,
        cpa: cpaData?.cpa,
        audience_fit: audienceFitData?.audience_fit,
        persona: personaData,
        tone: toneData?.tone
      })
    });

    const data = await res.json();
    setSummary(data);
  };

  useEffect(() => {
    if (
      product &&
      productIQ &&
      merchantIntel &&
      readiness !== null &&
      qualityScore !== null &&
      successProbability !== null &&
      budgetData &&
      funnelData &&
      roiData &&
      cpaData &&
      audienceFitData &&
      personaData &&
      toneData
    ) {
      load();
    }
  }, [
    product,
    productIQ,
    merchantIntel,
    readiness,
    qualityScore,
    successProbability,
    budgetData,
    funnelData,
    roiData,
    cpaData,
    audienceFitData,
    personaData,
    toneData
  ]);

  if (!summary)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Building Final Summary</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“˜ Mega Campaign Summary
      </h2>

      <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
        {JSON.stringify(summary, null, 2)}
      </pre>

    </div>
  );
}

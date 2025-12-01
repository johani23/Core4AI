// ============================================================================
// ðŸ’š CampaignRiskFlags.jsx (Phase 14 â€“ Campaign Risk Flags)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignRiskFlags({
  productIQ,
  readiness,
  qualityScore
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        feature_value: productIQ.feature_value,
        readiness: readiness,
        quality_score: qualityScore
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
        <p className="text-center text-gray-400">...Checking Risks</p>
      </div>
    );

  return (
    <div className="p-6 border bg-white rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-red-700 mb-4">
        ðŸš¨ Campaign Risk Flags
      </h2>

      <p className="text-gray-700 mb-4">
        Price Gap: {data.price_gap} Ø±.Ø³
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-800">
        {data.risk_flags.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

    </div>
  );
}

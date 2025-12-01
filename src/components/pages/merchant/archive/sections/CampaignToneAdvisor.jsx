// ============================================================================
// ðŸ’š CampaignToneAdvisor.jsx (Phase 23 â€“ Tone & Messaging Advisor)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignToneAdvisor({
  product,
  productIQ,
  audienceFit,
  readiness
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        feature_value: productIQ.feature_value,
        audience_fit: audienceFit,
        readiness: readiness
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (
      product &&
      productIQ &&
      audienceFit !== null &&
      readiness !== null
    )
      load();
  }, [product, productIQ, audienceFit, readiness]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">...Generating Tone</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ—£ï¸ Messaging Tone & Suggested Copy
      </h2>

      <p className="text-lg font-bold text-gray-800 mb-3">
        Tone: {data.tone}
      </p>

      <div className="space-y-2 p-4 bg-gray-50 border rounded">
        {data.messages.map((m, i) => (
          <p key={i} className="text-gray-700">
            â€¢ {m}
          </p>
        ))}
      </div>
    </div>
  );
}

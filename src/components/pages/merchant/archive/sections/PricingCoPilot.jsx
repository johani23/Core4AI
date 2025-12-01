// ============================================================================
// ðŸ’š PricingCoPilot.jsx (Phase 8 â€“ Pricing Intelligence Advisor)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function PricingCoPilot({ product, productIQ }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/pricing/copilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        feature_value: productIQ.feature_value
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && productIQ) load();
  }, [product, productIQ]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">...Ø¬Ø§Ø±ÙŠ ØªØ­Ù„ÙŠÙ„ Ø§Ù„ØªØ³Ø¹ÙŠØ±</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ¤– Pricing Co-Pilot
      </h2>

      <ul className="list-disc pl-6 space-y-1 text-gray-800">
        {data.lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>

      <div className="mt-4 p-4 bg-green-50 border rounded-lg">
        <p className="font-bold text-green-700">{data.advice}</p>
      </div>
    </div>
  );
}

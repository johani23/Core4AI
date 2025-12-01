// ============================================================================
// ðŸ’š MerchantReadiness.jsx (Phase 9 â€“ Marketplace Readiness Score)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function MerchantReadiness({ product, productIQ, merchantIntel }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/merchant/readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && productIQ && merchantIntel) load();
  }, [product, productIQ, merchantIntel]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­Ø³Ø§Ø¨</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“¦ Marketplace Readiness
      </h2>

      <div className="space-y-3">

        <p><strong>Price Gap:</strong> {data.gap} Ø±.Ø³</p>
        <p><strong>Feature Strength:</strong> {data.feature_strength}%</p>
        <p><strong>Market Intel Strength:</strong> {data.intel_strength}%</p>

        <div className="mt-4 p-4 bg-green-50 border rounded-lg text-center">
          <p className="text-2xl font-bold text-green-700">
            {data.readiness}%
          </p>
          <p className="text-gray-600">Marketplace Readiness</p>
        </div>

      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function ProductIQSection({ product, onLoaded }) {
  const [loading, setLoading] = useState(true);
  const [iq, setIQ] = useState(null);

  const loadIQ = async () => {
    try {
      const res = await fetch("/api/product_iq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          features: product.features || [],
          competitor_name: product.competitor_name,
          competitor_price: product.competitor_price
        }),
      });

      const data = await res.json();
      setIQ(data);
      onLoaded && onLoaded(data);
    } catch (err) {}

    setLoading(false);
  };

  useEffect(() => {
    loadIQ();
  }, [product]);

  return (
    <div className="p-6 border rounded-xl shadow bg-white">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ ProductIQ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Phase 4 AI Pricing
      </h2>

      {loading && <p className="text-gray-500">...loading</p>}

      {iq && (
        <div className="space-y-3 text-gray-800">
          <p><strong>Competitor:</strong> {iq.competitor.name}</p>
          <p><strong>Competitor Price:</strong> {iq.competitor.price} SAR</p>
          <p><strong>AI Feature Value:</strong> +{iq.feature_value} SAR</p>
          <p><strong>Recommended:</strong> {iq.recommended_price} SAR</p>
          <p><strong>Fair:</strong> {iq.fair_price} SAR</p>
          <p><strong>Premium:</strong> {iq.premium_price} SAR</p>
        </div>
      )}

    </div>
  );
}


import React, { useEffect, useState } from "react";

export default function OverviewPanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadOverview();
  }, [productId]);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/overview/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load overview data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading overview...
      </div>
    );

  if (!data) return null;

  const card = "p-5 bg-gray-800/60 rounded-2xl border border-gray-700";

  return (
    <div className="space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-400">
        Pricing Overview
      </h2>

      {/* GRID 1 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Top Metrics */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className={card}>
          <h3 className="text-gray-300 font-semibold">Suggested Price</h3>
          <p className="text-3xl font-bold text-yellow-300 mt-2">
            {data.suggested_price} SAR
          </p>
        </div>

        <div className={card}>
          <h3 className="text-gray-300 font-semibold">Optimal Price Range</h3>
          <p className="text-xl font-semibold mt-2 text-blue-300">
            {data.optimal_range}
          </p>
        </div>

        <div className={card}>
          <h3 className="text-gray-300 font-semibold">Confidence Level</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {data.confidence_score}%
          </p>
        </div>

      </div>

      {/* GRID 2 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â MIT Strategy */}
      <div className={card}>
        <h3 className="text-gray-300 font-semibold mb-2">
          MIT Pricing Strategy
        </h3>

        <p className="text-xl text-purple-300 font-bold">
          {data.strategy}
        </p>

        <p className="text-gray-400 mt-3 leading-relaxed">
          {data.strategy_explanation}
        </p>
      </div>

      {/* GRID 3 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Why This Price? */}
      <div className={card}>
        <h3 className="text-gray-300 font-semibold mb-2">
          Why this price?
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {data.reason}
        </p>
      </div>
    </div>
  );
}


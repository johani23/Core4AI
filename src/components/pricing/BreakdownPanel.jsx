import React, { useEffect, useState } from "react";

export default function BreakdownPanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadBreakdown();
  }, [productId]);

  const loadBreakdown = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/breakdown/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load breakdown data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading price breakdown...
      </div>
    );

  if (!data) return null;

  const card = "p-5 bg-gray-800/60 rounded-2xl border border-gray-700";

  return (
    <div className="space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-400">
        Price Breakdown
      </h2>

      {/* Cost Section */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Base Cost Structure
        </h3>

        <div className="space-y-2 text-gray-300">
          <p>Product Cost: <span className="text-blue-300 font-bold">{data.product_cost} SAR</span></p>
          <p>Marketing Cost: <span className="text-blue-300 font-bold">{data.marketing_cost} SAR</span></p>
          <p>Distribution: <span className="text-blue-300 font-bold">{data.distribution_cost} SAR</span></p>
          <p>Fixed Overheads: <span className="text-blue-300 font-bold">{data.overhead_cost} SAR</span></p>
        </div>
      </div>

      {/* Margin Section */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Profitability
        </h3>

        <p className="text-gray-300">
          Target Margin:
          <span className="text-yellow-300 font-bold ml-2">
            {data.target_margin}%
          </span>
        </p>

        <p className="text-gray-300 mt-2">
          Recommended Markup:
          <span className="text-yellow-300 font-bold ml-2">
            {data.markup}%
          </span>
        </p>
      </div>

      {/* Competitive Pricing */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Competitive Context
        </h3>

        <p className="text-gray-300">
          Market Average:
          <span className="text-green-300 font-bold ml-2">
            {data.market_avg_price} SAR
          </span>
        </p>

        <p className="text-gray-300 mt-2">
          Market Ceiling:
          <span className="text-green-300 font-bold ml-2">
            {data.market_ceiling} SAR
          </span>
        </p>
      </div>

      {/* Total Price Calculation */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Total Price Projection
        </h3>

        <p className="text-gray-300">
          Cost-Based Price:
          <span className="text-purple-300 font-bold ml-2">
            {data.cost_based_price} SAR
          </span>
        </p>

        <p className="text-gray-300 mt-2">
          Value-Adjusted Price:
          <span className="text-purple-300 font-bold ml-2">
            {data.value_adjusted_price} SAR
          </span>
        </p>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";

export default function ElasticityPanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadElasticity();
  }, [productId]);

  const loadElasticity = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/elasticity/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load elasticity data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Loading elasticity analysis...
      </div>
    );

  if (!data) return null;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Price Elasticity Analysis
      </h2>

      {/* Current Price */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Current Price</h3>
        <p className="text-xl">{data.current_price} SAR</p>
      </div>

      {/* Current Demand */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Current Demand</h3>
        <p className="text-xl">{data.current_demand} units</p>
      </div>

      {/* Elasticity Value */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Elasticity (log-slope)</h3>
        <p className="text-xl text-blue-300">{data.elasticity}</p>
      </div>

      {/* Interpretation */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-2">Elasticity Classification</h3>

        <p className="text-lg text-purple-300">
          {data.elasticity_label || "N/A"}
        </p>

        <p className="text-gray-400 mt-2">{data.elasticity_comment}</p>
      </div>

      {/* Impact of +/- 10% Price Change */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-3">Impact of 10% Price Change</h3>

        <p className="mb-1">
          +10% Price â†’ Demand:{" "}
          <span className="text-green-300">{data.plus_10pct_demand}</span>
        </p>
        <p>
          -10% Price â†’ Demand:{" "}
          <span className="text-green-300">{data.minus_10pct_demand}</span>
        </p>
      </div>

      {/* Revenue impact */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-3">Revenue Impact</h3>

        <p className="mb-1">
          +10% Price â†’ Revenue:{" "}
          <span className="text-blue-400">{data.plus_10pct_revenue} SAR</span>
        </p>

        <p>
          -10% Price â†’ Revenue:{" "}
          <span className="text-blue-400">{data.minus_10pct_revenue} SAR</span>
        </p>
      </div>

      {/* MIT Recommendation */}
      <div className="p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-2">MIT Recommendation</h3>

        <p className="text-xl text-yellow-300">
          {data.recommendation || "N/A"}
        </p>
      </div>
    </div>
  );
}

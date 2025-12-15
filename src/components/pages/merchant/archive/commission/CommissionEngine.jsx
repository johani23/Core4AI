import React, { useEffect, useState } from "react";

export default function CommissionEngine({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadCommission();
  }, [productId]);

  const loadCommission = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/commission/calc/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load commission engine data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Calculating commissions...
      </div>
    );

  if (!data) return null;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">

      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Commission Sharing Engine (Model C)
      </h2>

      {/* Total Commission Pool */}
      <div className="mb-6 p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-1">Total Commission Pool</h3>
        <p className="text-3xl text-yellow-300">{data.total_pool} SAR</p>
      </div>

      {/* Commission Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Commission Distribution</h3>

        <table className="w-full text-left text-sm bg-gray-800 rounded-xl">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Role</th>
              <th className="p-2">Base %</th>
              <th className="p-2">Dynamic %</th>
              <th className="p-2">Final %</th>
              <th className="p-2">Payout (SAR)</th>
            </tr>
          </thead>

          <tbody>
            {data.breakdown?.map((row, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="p-2">{row.role}</td>
                <td className="p-2">{row.base_pct}%</td>
                <td className="p-2 text-blue-300">{row.dynamic_pct}%</td>
                <td className="p-2 text-purple-300">{row.final_pct}%</td>
                <td classname="p-2 text-green-300">{row.payout} SAR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tier Info */}
      <div className="mb-6 p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-1">Tier Classification</h3>
        <p className="text-xl text-blue-300">{data.tier}</p>
        <p className="text-gray-400 mt-2">{data.tier_comment}</p>
      </div>

      {/* Performance Influence */}
      <div className="mb-6 p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-1">Performance Impact</h3>

        <p className="mb-2">
          Conversion Rate Influence:{" "}
          <span className="text-green-300">{data.performance?.conversion_influence}</span>
        </p>

        <p className="mb-2">
          ROI Influence:{" "}
          <span className="text-green-300">{data.performance?.roi_influence}</span>
        </p>

        <p>
          Feature Uplift Influence:{" "}
          <span className="text-green-300">{data.performance?.feature_uplift_influence}</span>
        </p>
      </div>

      {/* MIT Recommendation */}
      <div className="p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-2">MIT Voice of Value</h3>
        <p className="text-lg text-yellow-300">{data.recommendation}</p>
      </div>
    </div>
  );
}


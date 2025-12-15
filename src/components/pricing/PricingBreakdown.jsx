import React, { useEffect, useState } from "react";

export default function PricingBreakdown({ productId }) {
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
      setData({ error: "Failed to load pricing breakdown" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading pricing breakdown...
      </div>
    );

  if (!data || data.error)
    return (
      <div className="text-center text-red-400 p-6">
        Failed to load breakdown.
      </div>
    );

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Pricing Breakdown (MIT Phase 2)
      </h2>

      {/* Reference Price */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-1">Reference Price</h3>
        <p className="text-xl">{data.reference_price} SAR</p>
      </div>

      {/* Differentiation Values */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-3">Differentiation Value by Feature</h3>

        {data.diff_values?.length ? (
          <ul className="list-disc ml-5">
            {data.diff_values.map((v, i) => (
              <li key={i} className="mb-1">
                {v.feature}: <span className="text-green-300">{v.value} SAR</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No differentiation values found.</p>
        )}
      </div>

      {/* Feature Utilities Table */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Feature Utilities (Conjoint Model)</h3>

        {data.utilities?.length ? (
          <table className="w-full text-left text-sm bg-gray-800 rounded-xl">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Feature</th>
                <th className="p-2">Utility</th>
                <th className="p-2">Value (SAR)</th>
              </tr>
            </thead>
            <tbody>
              {data.utilities.map((u, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="p-2">{u.feature}</td>
                  <td className="p-2">{u.utility}</td>
                  <td className="p-2 text-green-300">{u.value_sar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No features found.</p>
        )}
      </div>

      {/* Total Value */}
      <div className="p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Total Feature-Based Value</h3>
        <p className="text-2xl text-blue-300 mt-2">
          {data.total_value} SAR
        </p>
      </div>
    </div>
  );
}


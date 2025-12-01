import React, { useEffect, useState } from "react";

export default function EVCPanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadEVC();
  }, [productId]);

  const loadEVC = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/evc/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load EVC data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Loading EVC...
      </div>
    );

  if (!data) return null;

  const card = "p-5 bg-gray-800/60 rounded-2xl border border-gray-700";

  return (
    <div className="space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-400">
        MIT EVC Calculator (Value-Based Pricing)
      </h2>

      {/* Reference Price */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          Reference Price (Ø¨Ø¯ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ‚)
        </h3>
        <p className="text-2xl font-bold text-blue-300">
          {data.reference_price} SAR
        </p>
      </div>

      {/* Differentiation Value */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          Differentiation Value (Ù‚ÙŠÙ…Ø© Ø§Ù„ØªÙ…ÙŠÙ‘Ø²)
        </h3>
        <p className="text-2xl font-bold text-yellow-300">
          {data.diff_value} SAR
        </p>
        <p className="text-gray-400 mt-2">
          Ù…Ø¬Ù…ÙˆØ¹ Ù‚ÙŠÙ… Ø§Ù„Ù…Ù…ÙŠØ²Ø§Øª ÙƒÙ…Ø§ ØªÙ… Ø§Ø­ØªØ³Ø§Ø¨Ù‡Ø§ ÙÙŠ Ù†Ù…ÙˆØ°Ø¬ Conjoint.
        </p>
      </div>

      {/* Conjoint Table */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Feature Utilities (Conjoint)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2">Feature</th>
                <th className="py-2">Utility</th>
                <th className="py-2">Value (SAR)</th>
              </tr>
            </thead>
            <tbody>
              {data.features &&
                data.features.map((f, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-2 text-gray-300">{f.name}</td>
                    <td className="py-2 text-gray-300">{f.utility}</td>
                    <td className="py-2 text-green-300 font-semibold">
                      {f.value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total EVC */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          Total EVC (Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ÙŠØ© Ù„Ù„Ø¹Ù…ÙŠÙ„)
        </h3>
        <p className="text-3xl font-bold text-purple-300">
          {data.total_evc} SAR
        </p>
      </div>

      {/* Fair Price + Premium Price */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className={card}>
          <h3 className="font-semibold text-gray-300 mb-2">
            Fair Price (Ø³Ø¹Ø± Ù…Ù†Ø·Ù‚ÙŠ)
          </h3>
          <p className="text-3xl font-bold text-blue-300">
            {data.fair_price} SAR
          </p>
        </div>

        <div className={card}>
          <h3 className="font-semibold text-gray-300 mb-2">
            Premium Price (Ø³Ø¹Ø± Ù…Ù…ÙŠØ²)
          </h3>
          <p className="text-3xl font-bold text-yellow-300">
            {data.premium_price} SAR
          </p>
        </div>

      </div>

      {/* Recommendation */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          MIT Recommendation
        </h3>
        <p className="text-xl text-green-300 font-bold">
          {data.recommendation}
        </p>
      </div>
    </div>
  );
}

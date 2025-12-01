import React, { useEffect, useState } from "react";

export default function CommissionSharingPanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadCommission();
  }, [productId]);

  const loadCommission = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/commission/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load commission data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Loading commission data...
      </div>
    );

  if (!data) return null;

  const card = "p-5 bg-gray-800/60 rounded-2xl border border-gray-700";

  return (
    <div className="space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-400">
        Commission Sharing Model
      </h2>

      {/* Base Commission */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300">Base Commission</h3>
        <p className="text-4xl font-bold text-yellow-300 mt-2">
          {data.base_commission}%
        </p>
      </div>

      {/* Tiered Levels */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-3">
          Tiered Commission Levels
        </h3>

        <div className="space-y-3 text-gray-300">
          {data.tiers &&
            data.tiers.map((tier, i) => (
              <p key={i}>
                <span className="text-blue-300 font-semibold">
                  {tier.level}:
                </span>{" "}
                {tier.rate}% â€” {tier.description}
              </p>
            ))}
        </div>
      </div>

      {/* Bonus */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">Bonus Boosters</h3>

        <p className="text-green-300 font-bold text-xl">
          {data.bonus || "No bonus configured"}
        </p>
      </div>

      {/* Profit Impact */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          Profit Impact (After Commission)
        </h3>

        <p className="text-gray-300">
          Profit per Unit:
          <span className="text-purple-300 font-bold ml-2">
            {data.profit_after_commission} SAR
          </span>
        </p>

        <p className="text-gray-300 mt-2">
          Profit Margin:
          <span className="text-purple-300 font-bold ml-2">
            {data.margin_after_commission}%
          </span>
        </p>
      </div>

      {/* MIT Recommendation */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          MIT Recommendation
        </h3>

        <p className="text-2xl text-green-300 font-bold">
          {data.recommendation}
        </p>

        <p className="text-gray-400 mt-2">
          {data.recommendation_comment}
        </p>
      </div>
    </div>
  );
}

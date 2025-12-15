import React, { useEffect, useState } from "react";

export default function RecommendedPriceBox({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadRecommendation();
  }, [productId]);

  const loadRecommendation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/recommendation/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData(null);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-gray-300 p-10">ÃƒÂ¢Ã‚ÂÃ‚Â³ LoadingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</div>;
  if (!data) return null;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Recommended Price
      </h2>

      <div className="mb-6 p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Suggested Price</h3>
        <p className="text-3xl text-yellow-300 mt-2">
          {data.suggested_price} SAR
        </p>
      </div>

      <div className="mb-6 p-5 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-1">Optimal Price Range</h3>
        <p className="text-lg">{data.optimal_range}</p>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompetitorSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) load();
  }, [product]);

  const load = async () => {
    try {
      const res = await fetch("/api/competitor/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: product.name }),
      });

      const data = await res.json();

      const list =
        data.results || data.competitors || data.list || [];

      setCompetitors(list);
    } catch (err) {
      console.error("Competitor error:", err);
      setCompetitors([]);
    }
    setLoading(false);
  };

  const select = (c) => {
    navigate("/merchant/campaign-builder", {
      state: {
        product: {
          ...product,
          competitor_name: c.name,
          competitor_price: c.price,
        },
      },
    });
  };

  if (!product)
    return <p className="p-4 text-center">âš ï¸ Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ù†ØªØ¬ Ù…Ø­Ø¯Ø¯</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
        ðŸ” Ø§Ø®ØªØ± Ø§Ù„Ù…Ù†Ø§ÙØ³ Ø§Ù„Ø£Ù‚Ø±Ø¨
      </h2>

      {loading && (
        <p className="text-gray-500 text-center">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</p>
      )}

      {!loading && competitors.length === 0 && (
        <p className="text-gray-600 text-center">
          Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ù†Ø§ÙØ³ÙŠÙ† Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬.
        </p>
      )}

      {competitors.map((c, i) => (
        <div
          key={i}
          onClick={() => select(c)}
          className="p-4 border rounded-lg mb-4 cursor-pointer hover:shadow bg-gray-50"
        >
          <h3 className="font-bold">{c.name}</h3>
          <p className="text-gray-600">{c.price} Ø±.Ø³</p>
        </div>
      ))}
    </div>
  );
}

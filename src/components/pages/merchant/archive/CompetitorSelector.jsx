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
    return <p className="p-4 text-center">ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¯</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨
      </h2>

      {loading && (
        <p className="text-gray-500 text-center">ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾...</p>
      )}

      {!loading && competitors.length === 0 && (
        <p className="text-gray-600 text-center">
          Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬.
        </p>
      )}

      {competitors.map((c, i) => (
        <div
          key={i}
          onClick={() => select(c)}
          className="p-4 border rounded-lg mb-4 cursor-pointer hover:shadow bg-gray-50"
        >
          <h3 className="font-bold">{c.name}</h3>
          <p className="text-gray-600">{c.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        </div>
      ))}
    </div>
  );
}


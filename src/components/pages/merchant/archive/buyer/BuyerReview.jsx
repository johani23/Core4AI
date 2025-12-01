// ============================================================================
// ðŸ’š BuyerReview.jsx (Phase 6 â€“ Buyer Review Input)
// ============================================================================

import React, { useState, useEffect } from "react";

export default function BuyerReview() {
  const [product, setProduct] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const load = async () => {
    if (!product) return;
    const res = await fetch("/api/review/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });
    const data = await res.json();
    setReviews(data.reviews);
  };

  const send = async () => {
    await fetch("/api/review/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product, review }),
    });
    setReview("");
    load();
  };

  useEffect(() => {
    load();
  }, [product]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“ Ø¢Ø±Ø§Ø¡ Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ† (Buyer Reviews)
      </h2>

      <input
        type="text"
        placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <textarea
        placeholder="Ø§ÙƒØªØ¨ Ø±Ø£ÙŠÙƒ..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 border rounded mb-3"
        rows={3}
      />

      <button
        onClick={send}
        className="w-full bg-green-700 text-white py-3 rounded-lg"
      >
        Ø¥Ø±Ø³Ø§Ù„
      </button>

      <div className="mt-6 space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50">
            <p className="font-semibold">{r.review}</p>
            <p className="text-sm text-gray-600">
              {r.sentiment} (score {r.score})
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

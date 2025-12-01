// ============================================================================
// ðŸ’š BuyerConfidence.jsx (Phase 7 â€“ Confidence Score UI)
// ============================================================================

import React, { useState } from "react";

export default function BuyerConfidence() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState(null);

  const calc = async () => {
    const res = await fetch("/api/confidence/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });

    const data = await res.json();
    setResult(data);
  };

  const get = async () => {
    const res = await fetch("/api/confidence/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        â­ Buyer Confidence Score
      </h2>

      <input
        type="text"
        placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬..."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={calc}
        className="w-full bg-green-700 text-white py-3 rounded-lg mb-2"
      >
        Ø­Ø³Ø§Ø¨ Ø§Ù„Ø«Ù‚Ø©
      </button>

      <button
        onClick={get}
        className="w-full bg-gray-700 text-white py-3 rounded-lg"
      >
        Ø¬Ù„Ø¨ Ø¢Ø®Ø± Ù†ØªÙŠØ¬Ø©
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p><strong>WTP Avg:</strong> {result.wtp}</p>
          <p><strong>Sentiments:</strong> {Array.isArray(result.sentiments) ? result.sentiments.join(", ") : ""}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

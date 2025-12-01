// ============================================================================
// ðŸ’š CompetitorMatchSection.jsx (v8.0 â€œUses ProductIQ Outputâ€)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CompetitorMatchSection({ product, onLoaded }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (product) runMatch();
  }, [product]);

  const runMatch = async () => {
    try {
      const res = await fetch("/api/product_iq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          features: product.features || [],
          competitor_name: product.competitor_name || "Ø£Ù‚Ø±Ø¨ Ù…Ù†Ø§ÙØ³",
          competitor_price: product.competitor_price || 80
        })
      });

      const data = await res.json();

      const mapped = {
        competitor: data.competitor,
        price_gap: data.recommended_price - data.competitor.price,
        advantages: ["Ù…ÙŠØ²Ø© Ø¥Ø¶Ø§ÙÙŠØ©", "Ø¬ÙˆØ¯Ø© Ù…Ø­Ø³Ù‘Ù†Ø©"],
        weaknesses: data.feature_value < 15 ? ["Ù‚ÙŠÙ…Ø© Ù…ÙŠØ²Ø© Ù…Ù†Ø®ÙØ¶Ø©"] : []
      };

      setMatch(mapped);
      onLoaded && onLoaded(mapped);

    } catch (err) {
      console.error(err);
      setMatch({ error: "âŒ ÙØ´Ù„ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ÙØ³" });
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        âš”ï¸ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ÙØ³ â€” Competitor Match
      </h2>

      {!match && <p className="text-gray-500">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù„ÙŠÙ„...</p>}

      {match?.error && <p className="text-red-600">{match.error}</p>}

      {match && !match.error && (
        <div className="bg-gray-50 border p-4 rounded-lg">
          <p><strong>Ø§Ù„Ù…Ù†Ø§ÙØ³:</strong> {match.competitor.name}</p>
          <p><strong>Ø³Ø¹Ø± Ø§Ù„Ù…Ù†Ø§ÙØ³:</strong> {match.competitor.price} Ø±.Ø³</p>
          <p><strong>ÙØ±Ù‚ Ø§Ù„Ø³Ø¹Ø±:</strong> {match.price_gap} Ø±.Ø³</p>

          <h4 className="font-semibold mt-4">Ù†Ù‚Ø§Ø· ØªÙÙˆÙ‘Ù‚ Ù…Ù†ØªØ¬Ùƒ:</h4>
          <ul className="list-disc pl-6">
            {match.advantages.map((a, i) => <li key={i}>{a}</li>)}
          </ul>

          <h4 className="font-semibold mt-4">Ù†Ù‚Ø§Ø· Ø§Ù„Ø¶Ø¹Ù:</h4>
          <ul className="list-disc pl-6">
            {match.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

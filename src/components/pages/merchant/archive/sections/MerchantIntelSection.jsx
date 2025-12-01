// ============================================================================
// ðŸ’š MerchantIntelSection.jsx (v8.0 â€œStable + onLoadedâ€)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function MerchantIntelSection({ product, onLoaded }) {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) loadIntel();
  }, [product]);

  const loadIntel = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/merchant_intel/${encodeURIComponent(product.name)}`
      );
      const data = await res.json();
      setIntel(data);
      onLoaded && onLoaded(data);

    } catch (err) {
      console.error(err);
      setIntel({ error: "âŒ ÙØ´Ù„ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ‚" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“ˆ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ‚ â€” Market Intel
      </h2>

      {loading && <p className="text-gray-500">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù„ÙŠÙ„â€¦</p>}

      {intel && !intel.error && (
        <div className="bg-gray-50 border p-4 rounded">

          <p><strong>Ù‚ÙˆØ© Ø§Ù„Ù…ÙŠØ²Ø©:</strong> {intel.feature_advantage_score}%</p>

          <h4 className="font-semibold mt-3">ðŸŒ Ø§Ù„Ø£Ø³ÙˆØ§Ù‚</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(intel.markets || {}).map(([name, data], i) => (
              <div key={i} className="p-3 border bg-white rounded">
                <strong>{name}</strong>
                <p>Ø§Ù„Ø³Ø¹Ø±: {data.price} Ø±.Ø³</p>
                <p>{data.missing_feature ? "âŒ Ù†Ù‚Øµ" : "âœ” ÙƒØ§Ù…Ù„"}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold mt-4">ðŸ’° Ø£Ø³Ø¹Ø§Ø± Ø§Ù„Ø³ÙˆÙ‚</h4>
          <p>Ø§Ù„Ø¹Ø§Ø¯Ù„: {intel.pricing.fair} Ø±.Ø³</p>
          <p>Ø§Ù„Ø³ÙˆÙ‚: {intel.pricing.market} Ø±.Ø³</p>
          <p>Ø§Ù„Ù…Ù…ØªØ§Ø²: {intel.pricing.premium} Ø±.Ø³</p>

          <h4 className="font-semibold mt-4">âš ï¸ Ù†Ù‚Ø§Ø· Ø§Ù„Ø¶Ø¹Ù</h4>
          <ul className="list-disc pl-6">
            {intel.weak_spots?.map((w, i) => <li key={i}>{w}</li>)}
          </ul>

        </div>
      )}

      {intel?.error && <p className="text-red-600">{intel.error}</p>}
    </div>
  );
}

// ============================================================================
// ðŸ’š CreativeStudioSection.jsx (v8.0 â€œPOST Sync + onLoadedâ€)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CreativeStudioSection({ product, onLoaded }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) generateCreative();
  }, [product]);

  const generateCreative = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          message: `Ø§Ø¹Ù„Ø§Ù† Ù…Ù†ØªØ¬ ${product.name}`,
          tone: "friendly",
          target_audience: "Saudi Youth"
        })
      });

      const data = await res.json();
      setCreative(data);
      onLoaded && onLoaded(data);

    } catch (err) {
      console.error(err);
      setCreative({ error: "âŒ ÙØ´Ù„ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸŽ¨ Creative Studio â€” Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ
      </h2>

      {loading && <p className="text-gray-500">â³ Ø¬Ø§Ø±ÙŠ Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹â€¦</p>}

      {creative && (
        <div className="bg-gray-50 border p-4 rounded">
          <h3 className="font-bold mb-2">ðŸŽ¬ Storyboard</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {creative?.storyboard?.map((s, i) => (
              <li key={i}>{s.script}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">ðŸŽ¤ Hooks</h3>
          <ul className="list-disc pl-6">
            {creative?.ads?.slice(0, 3).map((ad, i) => (
              <li key={i}>{ad.hook}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

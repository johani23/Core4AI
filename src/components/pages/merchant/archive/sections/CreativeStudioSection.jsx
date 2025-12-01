// ============================================================================
// ðŸ’š CreativeStudioSection.jsx (v6.0 â€“ FINAL STABLE / Zero Crash)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CreativeStudioSection({ product, onLoaded }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  useEffect(() => {
    if (product) generateCreative();
  }, [product]);

  const generateCreative = async () => {
    setLoading(true);
    setCreative(null);

    try {
      const res = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          message: `Ø§Ø¹Ù„Ø§Ù† Ù…Ù†ØªØ¬ ${product.name}`,
          tone: "friendly",
          target: "Saudi Youth",
        }),
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

  if (!product) return null;

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸŽ¨ Creative Studio â€” ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ
      </h2>

      {loading && (
        <p className="text-gray-500">â³ Ø¬Ø§Ø±ÙŠ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰â€¦</p>
      )}

      {/* ERROR */}
      {creative?.error && (
        <p className="text-red-600">{creative.error}</p>
      )}

      {/* CONTENT */}
      {!loading && creative && !creative.error && (
        <div className="bg-gray-50 border rounded-lg p-4 mt-4 space-y-8">

          {/* STORYBOARD */}
          <div>
            <h3 className="font-bold mb-2">ðŸŽ¬ Ø§Ù„Ø³ØªÙˆØ±ÙŠ Ø¨ÙˆØ±Ø¯</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {safe(creative.storyboard).map((s, i) => (
                <li key={i}>
                  Ù…Ø´Ù‡Ø¯ {s.scene}: {s.script} â€” ({s.shot})
                </li>
              ))}
            </ul>
          </div>

          {/* HOOKS */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ðŸ§² Hooks</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {safe(creative.hooks).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* TIKTOK PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ðŸŽ¥ TikTok Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.tiktok_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.format}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* REELS PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ðŸŽžï¸ Reels Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.reels_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.hook}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CAROUSEL PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ðŸ–¼ï¸ Carousel Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.carousel_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

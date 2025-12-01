// ============================================================================
// ðŸ’š Core4.AI â€“ CreativeStudio.jsx (v5.0 FIXED â€“ Stable + Safe + API-Aligned)
// ============================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreativeStudio({ productName }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productName) return;
    generateCreative();
  }, [productName]);

  const generateCreative = async () => {
    if (!productName) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          message: `Introducing ${productName}`,
          tone: "friendly",
          target: "Saudi Youth",
        }),
      });

      const data = await res.json();
      setCreative(data);

    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ");
    }

    setLoading(false);
  };

  if (!productName) {
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl border shadow text-center">
        Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¹Ø¯.
      </div>
    );
  }

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-700">
            Creative Studio â€“ Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ØªÙˆÙ„ÙŠØ¯ ØªÙ„Ù‚Ø§Ø¦ÙŠ Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª Ø§Ù„ÙÙŠØ¯ÙŠÙˆ + Hooks + Ù…Ø­ØªÙˆÙ‰ Ø¬Ø§Ù‡Ø².
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Ø§Ù„Ù…Ù†ØªØ¬: <span className="font-semibold">{productName}</span>
          </p>
        </div>

        <button
          onClick={generateCreative}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªÙˆÙ„ÙŠØ¯..." : "ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªÙˆÙ„ÙŠØ¯"}
        </button>
      </div>

      {loading && (
        <p className="text-gray-600 text-sm">Ø¬Ø§Ø±ÙŠ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ...</p>
      )}

      {/* CONTENT */}
      {!loading && creative && (
        <div className="space-y-10">

          {/* STORYBOARD */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ðŸŽ¬ Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safe(creative.storyboard).map((scene, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <p className="font-bold text-green-700 mb-1">
                    Ù…Ø´Ù‡Ø¯ {scene.scene} â€“ {scene.shot}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">{scene.script}</p>
                  <p className="text-xs text-gray-500">{scene.camera}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HOOKS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ðŸ§² Hooks</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {safe(creative.hooks).map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          {/* TIKTOK PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ðŸŽ¥ TikTok Pack</h3>

            <div className="space-y-3">
              {safe(creative.tiktok_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.format}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </div>
              ))}
            </div>
          </div>

          {/* REELS PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ðŸŽžï¸ Reels Pack</h3>

            <div className="space-y-3">
              {safe(creative.reels_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.hook}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ðŸ–¼ï¸ Carousel Pack</h3>

            <div className="space-y-3">
              {safe(creative.carousel_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {!loading && !creative && (
        <p className="mt-4 text-sm text-gray-500">
          Ù„Ù… ÙŠØªÙ… ØªÙˆÙ„ÙŠØ¯ Ø£ÙŠ Ù…Ø­ØªÙˆÙ‰ Ø¨Ø¹Ø¯. Ø§Ø¶ØºØ· "Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªÙˆÙ„ÙŠØ¯".
        </p>
      )}
    </div>
  );
}

// ============================================================================
// ðŸ’š Core4.AI â€“ AdCalculator.jsx (v4.0 â€œZero-Input Smart Pricing Engineâ€)
// -----------------------------------------------------------------------------
// â€¢ Zero input: ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ productName ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹
// â€¢ Auto-load Recommended Pricing + Competitor Analysis
// â€¢ Clean, simple, fast UI
// ============================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdCalculator({ productName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // Auto fetch when productName changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (productName) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  // ---------------------------------------------------------------------------
  // Fetch ProductIQ
  // ---------------------------------------------------------------------------
  const fetchData = async () => {
    if (!productName) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/product_intel/${productName}`
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ ÙÙŠ Ø¬Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª ProductIQ");
    }

    setLoading(false);
  };

  if (!productName) {
    return (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl border shadow">
        <p className="text-center text-gray-600">Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¹Ø¯.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-blue-700">
            Ad Calculator â€“ Ø­Ø§Ø³Ø¨Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†
          </h2>
          <p className="text-sm text-gray-600">
            ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ÙØ³ÙŠÙ† + ØªÙˆØµÙŠØ© Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø£Ù…Ø«Ù„
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Ø§Ù„Ù…Ù†ØªØ¬: <span className="font-semibold">{productName}</span>
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„..." : "ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù…ÙŠÙ„"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600 text-sm">Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...</p>}

      {/* CONTENT */}
      {!loading && data && (
        <div className="space-y-8">

          {/* COMPETITOR */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ðŸ†š Ø§Ù„Ù…Ù†Ø§ÙØ³ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±
            </h3>

            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="font-bold text-gray-800 mb-1">
                {data.competitor.name}
              </p>
              <p className="text-sm text-gray-600">
                Ø§Ù„Ø³Ø¹Ø±:{" "}
                <span className="font-semibold">{data.competitor.price} Ø±.Ø³</span>
              </p>
              <p className="text-sm text-gray-600">
                Ù…ÙŠØ²Ø© Ù…ÙÙ‚ÙˆØ¯Ø©:{" "}
                <span className="font-semibold">
                  {data.competitor.missing_feature ? "Ù†Ø¹Ù…" : "Ù„Ø§"}
                </span>
              </p>
            </div>
          </div>

          {/* FEATURE VALUE */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ðŸ’Ž Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø© Ø§Ù„Ù…Ø¶Ø§ÙØ©
            </h3>

            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-blue-700">
                +{data.feature_value} Ø±.Ø³
              </p>
            </div>
          </div>

          {/* PRICING */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ðŸ’° Ø§Ù„ØªÙˆØµÙŠØ© Ø§Ù„Ø³Ø¹Ø±ÙŠØ©
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-gray-50 border rounded-lg text-center shadow-sm">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¹Ø§Ø¯Ù„</p>
                <p className="mt-2 text-xl font-bold text-blue-600">
                  {data.fair_price} Ø±.Ø³
                </p>
              </div>

              <div className="p-4 bg-white border rounded-lg text-center shadow shadow-md">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…ÙˆØµÙ‰ Ø¨Ù‡</p>
                <p className="mt-2 text-2xl font-bold text-blue-700">
                  {data.recommended_price} Ø±.Ø³
                </p>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg text-center shadow-sm">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù…ÙŠØ²</p>
                <p className="mt-2 text-xl font-bold text-blue-600">
                  {data.premium_price} Ø±.Ø³
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* EMPTY */}
      {!loading && !data && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Ù„Ù… ÙŠØªÙ… Ø¬Ù„Ø¨ Ø£ÙŠ Ø¨ÙŠØ§Ù†Ø§Øª Ø¨Ø¹Ø¯. Ø§Ø¶ØºØ· "Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù…ÙŠÙ„".
        </p>
      )}
    </div>
  );
}

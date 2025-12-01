// ============================================================================
// ðŸ’š Core4.AI â€“ MerchantIntel.jsx (v4.0 â€œSmart Market Scanner Editionâ€)
// -----------------------------------------------------------------------------
// â€¢ Zero input: ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ productName ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹
// â€¢ Auto-load market data (KSA / GCC / Global)
// â€¢ Shows weak spots + tribe forecast
// â€¢ Clean UI + Fast + Stable
// ============================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MerchantIntel({ productName }) {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // Auto fetch when product changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (productName) loadIntel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  // ---------------------------------------------------------------------------
  // Load Merchant Intel
  // ---------------------------------------------------------------------------
  const loadIntel = async () => {
    if (!productName) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/merchant_intel/${productName}`
      );
      const data = await res.json();
      setIntel(data);
    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø³ÙˆÙ‚");
    }

    setLoading(false);
  };

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  if (!productName) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl border shadow">
        <p className="text-center text-gray-600">Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¹Ø¯.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-orange-700">
            MerchantIntel â€“ Ø°ÙƒØ§Ø¡ Ø§Ù„Ø³ÙˆÙ‚
          </h2>
          <p className="text-sm text-gray-600">
            ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ø³ÙˆØ§Ù‚ (Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© â€“ Ø§Ù„Ø®Ù„ÙŠØ¬ â€“ Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠ) + ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Ø§Ù„Ù…Ù†ØªØ¬: <span className="font-semibold">{productName}</span>
          </p>
        </div>

        <button
          onClick={loadIntel}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-orange-700 text-white text-sm font-semibold hover:bg-orange-800 disabled:opacity-60"
        >
          {loading ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„..." : "ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù…ÙŠÙ„"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600">Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...</p>}

      {/* CONTENT */}
      {!loading && intel && (
        <div className="space-y-10">

          {/* FEATURE SCORE */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ðŸ” ØªÙ‚ÙŠÙŠÙ… Ù…ÙŠØ²Ø© Ø§Ù„Ù…Ù†ØªØ¬
            </h3>
            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-orange-700">
                {intel.feature_advantage_score}%
              </p>
            </div>
          </div>

          {/* MARKETS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ðŸŒ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ø³ÙˆØ§Ù‚
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* KSA */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">Ø§Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠ</p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.saudi?.price} Ø±.Ø³
                </p>
                <p className="text-sm text-gray-600">
                  Ù…ÙŠØ²Ø© Ù…ÙÙ‚ÙˆØ¯Ø©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.saudi?.missing_feature ? "Ù†Ø¹Ù…" : "Ù„Ø§"}
                  </span>
                </p>
              </div>

              {/* GCC */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">Ø§Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø®Ù„ÙŠØ¬ÙŠ</p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.gcc?.price} Ø±.Ø³
                </p>
                <p className="text-sm text-gray-600">
                  Ù…ÙŠØ²Ø© Ù…ÙÙ‚ÙˆØ¯Ø©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.gcc?.missing_feature ? "Ù†Ø¹Ù…" : "Ù„Ø§"}
                  </span>
                </p>
              </div>

              {/* GLOBAL */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">Ø§Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠ</p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.global?.price} Ø±.Ø³
                </p>
                <p className="text-sm text-gray-600">
                  Ù…ÙŠØ²Ø© Ù…ÙÙ‚ÙˆØ¯Ø©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.global?.missing_feature ? "Ù†Ø¹Ù…" : "Ù„Ø§"}
                  </span>
                </p>
              </div>

            </div>
          </div>

          {/* PRICING */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ðŸ’° Ù…Ø³ØªÙˆÙŠØ§Øª Ø§Ù„ØªØ³Ø¹ÙŠØ±
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-gray-50 border rounded-lg text-center">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¹Ø§Ø¯Ù„</p>
                <p className="mt-2 text-xl font-bold text-orange-600">
                  {intel.pricing?.fair} Ø±.Ø³
                </p>
              </div>

              <div className="p-4 bg-white border rounded-lg text-center shadow">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø³ÙˆÙ‚ÙŠ</p>
                <p className="mt-2 text-xl font-bold text-orange-700">
                  {intel.pricing?.market} Ø±.Ø³
                </p>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg text-center">
                <p className="text-gray-600 text-sm">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù…ÙŠØ²</p>
                <p className="mt-2 text-xl font-bold text-orange-600">
                  {intel.pricing?.premium} Ø±.Ø³
                </p>
              </div>

            </div>
          </div>

          {/* WEAK SPOTS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              âš ï¸ Ù†Ù‚Ø§Ø· Ø¶Ø¹Ù Ø§Ù„Ù…Ù†Ø§ÙØ³ÙŠÙ†
            </h3>

            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {intel.competitor_weak_spots?.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>

          {/* TRIBE FORECAST */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ðŸ”® ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(intel.tribe_forecast || {}).map(
                ([tribe, score], idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border rounded-lg shadow text-center"
                  >
                    <p className="text-sm text-gray-600">{tribe}</p>
                    <p className="mt-1 text-xl font-bold text-orange-700">
                      {score}%
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

        </div>
      )}

      {/* EMPTY */}
      {!loading && !intel && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Ù„Ù… ÙŠØªÙ… ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø³ÙˆÙ‚ Ø¨Ø¹Ø¯.
        </p>
      )}
    </div>
  );
}

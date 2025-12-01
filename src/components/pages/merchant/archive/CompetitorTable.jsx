// ============================================================================
// ðŸ’š Core4.AI â€“ CompetitorTable.jsx (v3.0 â€œSmart Competitor Comparisonâ€)
// -----------------------------------------------------------------------------
// â€¢ Zero input: ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ productName ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹
// â€¢ Auto-load competitor info from ProductIQ backend
// â€¢ Simple, clean competitor comparison card
// â€¢ Optional component â€” safe to include or hide
// ============================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CompetitorTable({ productName }) {
  const [competitor, setCompetitor] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // Auto-load competitor when productName changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (productName) loadCompetitorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  // ---------------------------------------------------------------------------
  // Load competitor using ProductIQ endpoint
  // ---------------------------------------------------------------------------
  const loadCompetitorData = async () => {
    if (!productName) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/product_intel/${productName}`
      );
      const data = await res.json();
      setCompetitor(data.competitor);
    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†Ø§ÙØ³");
    }

    setLoading(false);
  };

  // ---------------------------------------------------------------------------
  // UI (fallback)
  // ---------------------------------------------------------------------------
  if (!productName) {
    return (
      <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow rounded border">
        <p className="text-center text-gray-600">Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¹Ø¯.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          ðŸ†š Ù…Ù‚Ø§Ø±Ù†Ø© Ù…Ø¹ Ø§Ù„Ù…Ù†Ø§ÙØ³ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±
        </h3>

        <button
          onClick={loadCompetitorData}
          disabled={loading}
          className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-black disabled:opacity-50"
        >
          {loading ? "â³" : "ðŸ”„ ØªØ­Ø¯ÙŠØ«"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600 text-sm">Ø¬Ø§Ø± ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ÙØ³...</p>}

      {/* COMPETITOR CARD */}
      {!loading && competitor && (
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">

          <p className="font-bold text-gray-900 text-md">
            {competitor.name}
          </p>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p>
              ðŸ’° Ø§Ù„Ø³Ø¹Ø±:{" "}
              <span className="font-semibold">{competitor.price} Ø±.Ø³</span>
            </p>

            <p>
              âš ï¸ Ù…ÙŠØ²Ø© Ù…ÙÙ‚ÙˆØ¯Ø©:{" "}
              <span className="font-semibold">
                {competitor.missing_feature ? "Ù†Ø¹Ù…" : "Ù„Ø§"}
              </span>
            </p>
          </div>

        </div>
      )}

      {!loading && !competitor && (
        <p className="mt-4 text-center text-gray-500 text-sm">
          Ù„Ù… ÙŠØªÙ… ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†Ø§ÙØ³ Ø¨Ø¹Ø¯.
        </p>
      )}
    </div>
  );
}

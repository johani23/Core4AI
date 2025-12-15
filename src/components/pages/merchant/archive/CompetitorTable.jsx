// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CompetitorTable.jsx (v3.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSmart Competitor ComparisonÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// -----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Zero input: Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° productName ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Auto-load competitor info from ProductIQ backend
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Simple, clean competitor comparison card
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Optional component ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â safe to include or hide
// ============================================================================

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
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³");
    }

    setLoading(false);
  };

  // ---------------------------------------------------------------------------
  // UI (fallback)
  // ---------------------------------------------------------------------------
  if (!productName) {
    return (
      <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow rounded border">
        <p className="text-center text-gray-600">Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Â Ã…Â¡ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±
        </h3>

        <button
          onClick={loadCompetitorData}
          disabled={loading}
          className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-black disabled:opacity-50"
        >
          {loading ? "ÃƒÂ¢Ã‚ÂÃ‚Â³" : "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â«"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600 text-sm">ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³...</p>}

      {/* COMPETITOR CARD */}
      {!loading && competitor && (
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">

          <p className="font-bold text-gray-900 text-md">
            {competitor.name}
          </p>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p>
              ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±:{" "}
              <span className="font-semibold">{competitor.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</span>
            </p>

            <p>
              ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©:{" "}
              <span className="font-semibold">
                {competitor.missing_feature ? "Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦" : "Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§"}
              </span>
            </p>
          </div>

        </div>
      )}

      {!loading && !competitor && (
        <p className="mt-4 text-center text-gray-500 text-sm">
          Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.
        </p>
      )}
    </div>
  );
}



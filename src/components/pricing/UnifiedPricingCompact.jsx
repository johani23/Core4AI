// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ UnifiedPricingCompact.jsx (v1.0 BETA)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Compact version of UnifiedPricing for analytics dashboards
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Focused on top 5 actionable pricing signals only
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean, light, optimized for embedding inside lists or panels
// ============================================================================


export default function UnifiedPricingCompact({ productId, onExpand }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    try {
      const res = await fetch(`/api/pricing/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Failed to fetch compact pricing", err);
    }
    setLoading(false);
  };

  if (loading || !data) {
    return (
      <div className="text-gray-500 text-sm text-center py-3">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚ÂµÃƒËœÃ‚Â±...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border p-4">

      {/* HEADER */}
      <h3 className="text-lg font-bold text-green-700 mb-3">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ AI Pricing ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Snapshot
      </h3>

      {/* PRICE FAST BLOCKS */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        {/* Suggested Price */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­</p>
          <p className="text-lg font-bold text-green-700">
            {data.ai_suggested_price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
          </p>
        </div>

        {/* Recommended Range */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â·ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â </p>
          <p className="font-semibold">
            {data.min_price} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ {data.max_price}
          </p>
        </div>

        {/* Merchant Price */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±</p>
          <p className="font-semibold">{data.last_price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        </div>

        {/* Net Revenue */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500">ÃƒËœÃ‚ÂµÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â­ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹</p>
          <p className="font-semibold">{data.net_revenue} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={onExpand}
        className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
      >
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Ãƒâ„¢Ã‚ÂÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾
      </button>
    </div>
  );
}



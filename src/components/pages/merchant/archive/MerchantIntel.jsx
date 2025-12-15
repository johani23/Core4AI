// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantIntel.jsx (v4.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSmart Market Scanner EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// -----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Zero input: Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° productName ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Auto-load market data (KSA / GCC / Global)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Shows weak spots + tribe forecast
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean UI + Fast + Stable
// ============================================================================

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
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡");
    }

    setLoading(false);
  };

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  if (!productName) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl border shadow">
        <p className="text-center text-gray-600">Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-orange-700">
            MerchantIntel ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡
          </h2>
          <p className="text-sm text-gray-600">
            ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ (ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ) + ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬: <span className="font-semibold">{productName}</span>
          </p>
        </div>

        <button
          onClick={loadIntel}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-orange-700 text-white text-sm font-semibold hover:bg-orange-800 disabled:opacity-60"
        >
          {loading ? "ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾..." : "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600">ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª...</p>}

      {/* CONTENT */}
      {!loading && intel && (
        <div className="space-y-10">

          {/* FEATURE SCORE */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
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
              ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* KSA */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â </p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.saudi?.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
                <p className="text-sm text-gray-600">
                  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.saudi?.missing_feature ? "Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦" : "Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§"}
                  </span>
                </p>
              </div>

              {/* GCC */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¬Ãƒâ„¢Ã…Â </p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.gcc?.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
                <p className="text-sm text-gray-600">
                  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.gcc?.missing_feature ? "Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦" : "Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§"}
                  </span>
                </p>
              </div>

              {/* GLOBAL */}
              <div className="p-4 bg-white border rounded-lg shadow">
                <p className="text-sm font-semibold text-orange-700">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â </p>
                <p className="mt-2 text-gray-900 font-bold">
                  {intel.markets?.global?.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
                <p className="text-sm text-gray-600">
                  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©:{" "}
                  <span className="font-semibold">
                    {intel.markets?.global?.missing_feature ? "Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦" : "Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§"}
                  </span>
                </p>
              </div>

            </div>
          </div>

          {/* PRICING */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-gray-50 border rounded-lg text-center">
                <p className="text-gray-600 text-sm">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Å¾</p>
                <p className="mt-2 text-xl font-bold text-orange-600">
                  {intel.pricing?.fair} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
              </div>

              <div className="p-4 bg-white border rounded-lg text-center shadow">
                <p className="text-gray-600 text-sm">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â </p>
                <p className="mt-2 text-xl font-bold text-orange-700">
                  {intel.pricing?.market} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg text-center">
                <p className="text-gray-600 text-sm">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²</p>
                <p className="mt-2 text-xl font-bold text-orange-600">
                  {intel.pricing?.premium} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
                </p>
              </div>

            </div>
          </div>

          {/* WEAK SPOTS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â 
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
              ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â® ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾
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
          Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.
        </p>
      )}
    </div>
  );
}



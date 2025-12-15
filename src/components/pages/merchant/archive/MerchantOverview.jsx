// ===================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantOverview.jsx (Saudi Intelligence Dashboard)
// -------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Real-time merchant performance snapshot
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Pulls from /api/merchant/intel
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Shows: score, risk, campaigns, tribe match, forecast, best products
// ===================================================================

import {
  FiTrendingUp,
  FiTarget,
  FiAlertTriangle,
  FiBarChart2,
  FiLayers,
  FiStar,
} from "react-icons/fi";

export default function MerchantOverview() {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/merchant/intel")
      .then((res) => res.json())
      .then((data) => {
        setIntel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Merchant Intel Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-300 p-12">
        ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â­ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ========================= Header ========================= */}
      <div>
        <h2 className="text-2xl font-bold text-[#4cff9b] mb-1">Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â©</h2>
        <p className="text-gray-300">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Âµ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±Ãƒâ„¢Ã†â€™</p>
      </div>

      {/* ========================= GRID ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Merchant Power Score */}
        <div className="bg-[#01341c] border border-[#1b5e3a] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±</h3>
            <FiStar className="text-yellow-300 text-2xl" />
          </div>
          <p className="text-5xl font-extrabold text-[#4cff9b] mt-2">
            {intel.merchant_score}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡Ãƒâ„¢Ã†â€™ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â®ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â .
          </p>
        </div>

        {/* Risk Score */}
        <div className="bg-[#2b1200] border border-[#ff2e2e] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â±</h3>
            <FiAlertTriangle className="text-red-400 text-2xl" />
          </div>
          <p className="text-5xl font-extrabold text-red-400 mt-2">
            {intel.risk_score}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â³ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â®ÃƒËœÃ‚Â§ÃƒËœÃ‚Â·ÃƒËœÃ‚Â± ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€  ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±.
          </p>
        </div>

        {/* Best Tribe */}
        <div className="bg-[#01261a] border border-[#1b6647] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©</h3>
            <FiTarget className="text-[#4cff9b] text-2xl" />
          </div>
          <p className="text-4xl font-extrabold text-[#4cff9b] mt-3">
            {intel.best_tribe}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â«ÃƒËœÃ‚Â± ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã¢â‚¬Â¹ÃƒËœÃ‚Â§ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒâ„¢Ã†â€™ ÃƒËœÃ‚Â­ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¹ÃƒËœÃ‚Â§.
          </p>
        </div>

      </div>

      {/* ========================= Forecast ========================= */}
      <div className="bg-[#01341c] border border-[#1b6642] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiBarChart2 className="text-[#4cff9b]" /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-gray-300 text-sm">Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©</p>
            <p className="text-4xl font-extrabold text-[#4cff9b]">
              {intel.forecast.success}%
            </p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹</p>
            <p className="text-4xl font-extrabold text-green-300">
              SAR {intel.forecast.rev}
            </p>
          </div>
        </div>
      </div>

      {/* ========================= Suggested Campaigns ========================= */}
      <div className="bg-[#01341c] border border-[#1b6642] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiTrendingUp className="text-[#4cff9b]" /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ÃƒËœÃ‚Â©
        </h3>

        <div className="mt-4 space-y-4">
          {intel.suggested_campaigns.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#002015] border border-[#145536] p-4 rounded-lg"
            >
              <h4 className="text-lg font-bold text-[#4cff9b]">{c.title}</h4>
              <p className="text-gray-300 text-sm mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}



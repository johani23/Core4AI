// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MerchantPricingDashboard.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Advanced Pricing Dashboard)
// ============================================================================


export default function MerchantPricingDashboard({ product, productIQ }) {
  if (!product || !productIQ)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">... ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾</p>
      </div>
    );

  const competitorPrice = productIQ.competitor.price;
  const recommended = productIQ.recommended_price;
  const fair = productIQ.fair_price;
  const premium = productIQ.premium_price;

  const priceGap = recommended - competitorPrice;

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Advanced Pricing Dashboard
      </h2>

      {/* PRICE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Competitor */}
        <div className="border rounded-xl p-5 bg-gray-50 shadow">
          <h3 className="font-bold text-gray-800">ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³</h3>
          <p className="text-3xl font-extrabold text-red-600 mt-3">
            {competitorPrice} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
          </p>
          <p className="text-gray-500 mt-1">{productIQ.competitor.name}</p>
        </div>

        {/* Recommended */}
        <div className="border rounded-xl p-5 bg-green-50 shadow">
          <h3 className="font-bold text-gray-800">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­</h3>
          <p className="text-3xl font-extrabold text-green-700 mt-3">
            {recommended} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
          </p>
          <p className="text-gray-500 mt-1">+{productIQ.feature_value} Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©</p>
        </div>

        {/* Premium */}
        <div className="border rounded-xl p-5 bg-yellow-50 shadow">
          <h3 className="font-bold text-gray-800">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â¦</h3>
          <p className="text-3xl font-extrabold text-yellow-600 mt-3">
            {premium} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
          </p>
          <p className="text-gray-500 mt-1">Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â </p>
        </div>
      </div>

      {/* GAP CHART */}
      <div className="mt-10 p-6 border rounded-xl bg-gray-50 shadow">

        <h3 className="font-bold text-lg mb-4 text-gray-700">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â» Price Gap Analysis
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 rounded-full bg-red-200 relative">
            <div
              className={`absolute left-0 top-0 h-3 rounded-full ${
                priceGap > 0 ? "bg-green-600" : "bg-red-600"
              }`}
              style={{ width: `${Math.min(Math.abs(priceGap), 100)}%` }}
            />
          </div>
          <span
            className={`font-bold ${
              priceGap > 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {priceGap > 0 ? `+${priceGap} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³` : `${priceGap} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³`}
          </span>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-10 p-6 border rounded-xl bg-white shadow">

        <h3 className="font-bold text-lg mb-4 text-gray-700">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã¢â‚¬â„¢ Pricing Timeline (Suggested)
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ 1ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“2: ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â®ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Å¾ ({fair} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³)</li>
          <li>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ 3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“4: ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ ({recommended} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³)</li>
          <li>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ 5+: ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬ËœÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â¦ ({premium} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³) ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨</li>
        </ul>
      </div>

    </div>
  );
}



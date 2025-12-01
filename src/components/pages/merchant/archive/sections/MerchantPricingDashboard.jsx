// ============================================================================
// ðŸ’š MerchantPricingDashboard.jsx (v1.0 â€“ Advanced Pricing Dashboard)
// ============================================================================

import React from "react";

export default function MerchantPricingDashboard({ product, productIQ }) {
  if (!product || !productIQ)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">... Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„</p>
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
        ðŸ“Š Advanced Pricing Dashboard
      </h2>

      {/* PRICE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Competitor */}
        <div className="border rounded-xl p-5 bg-gray-50 shadow">
          <h3 className="font-bold text-gray-800">Ø³Ø¹Ø± Ø§Ù„Ù…Ù†Ø§ÙØ³</h3>
          <p className="text-3xl font-extrabold text-red-600 mt-3">
            {competitorPrice} Ø±.Ø³
          </p>
          <p className="text-gray-500 mt-1">{productIQ.competitor.name}</p>
        </div>

        {/* Recommended */}
        <div className="border rounded-xl p-5 bg-green-50 shadow">
          <h3 className="font-bold text-gray-800">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­</h3>
          <p className="text-3xl font-extrabold text-green-700 mt-3">
            {recommended} Ø±.Ø³
          </p>
          <p className="text-gray-500 mt-1">+{productIQ.feature_value} Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø©</p>
        </div>

        {/* Premium */}
        <div className="border rounded-xl p-5 bg-yellow-50 shadow">
          <h3 className="font-bold text-gray-800">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¨Ø±ÙŠÙ…ÙŠÙˆÙ…</h3>
          <p className="text-3xl font-extrabold text-yellow-600 mt-3">
            {premium} Ø±.Ø³
          </p>
          <p className="text-gray-500 mt-1">Ù„Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø±Ø§Ù‚ÙŠ</p>
        </div>
      </div>

      {/* GAP CHART */}
      <div className="mt-10 p-6 border rounded-xl bg-gray-50 shadow">

        <h3 className="font-bold text-lg mb-4 text-gray-700">
          ðŸ”» Price Gap Analysis
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
            {priceGap > 0 ? `+${priceGap} Ø±.Ø³` : `${priceGap} Ø±.Ø³`}
          </span>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-10 p-6 border rounded-xl bg-white shadow">

        <h3 className="font-bold text-lg mb-4 text-gray-700">
          ðŸ•’ Pricing Timeline (Suggested)
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 1â€“2: Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¹Ø§Ø¯Ù„ ({fair} Ø±.Ø³)</li>
          <li>Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 3â€“4: Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù„Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­ ({recommended} Ø±.Ø³)</li>
          <li>Ø§Ù„Ø£Ø³Ø§Ø¨ÙŠØ¹ 5+: Ø¬Ø±Ù‘Ø¨ Ø§Ù„Ø¨Ø±ÙŠÙ…ÙŠÙˆÙ… ({premium} Ø±.Ø³) Ø¥Ø°Ø§ Ø²Ø§Ø¯ Ø§Ù„Ø·Ù„Ø¨</li>
        </ul>
      </div>

    </div>
  );
}

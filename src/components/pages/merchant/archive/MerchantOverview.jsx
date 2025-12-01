// ===================================================================
// ðŸ’š Core4.AI â€“ MerchantOverview.jsx (Saudi Intelligence Dashboard)
// -------------------------------------------------------------------
// â€¢ Real-time merchant performance snapshot
// â€¢ Pulls from /api/merchant/intel
// â€¢ Shows: score, risk, campaigns, tribe match, forecast, best products
// ===================================================================

import React, { useEffect, useState } from "react";
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
        Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ù„ÙˆØ­Ø© Ø§Ù„Ø£Ø¯Ø§Ø¡â€¦
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ========================= Header ========================= */}
      <div>
        <h2 className="text-2xl font-bold text-[#4cff9b] mb-1">Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©</h2>
        <p className="text-gray-300">Ø§Ù„Ù…Ù„Ø®Øµ Ø§Ù„Ø°ÙƒÙŠ Ù„Ø£Ø¯Ø§Ø¡ Ù…ØªØ¬Ø±Ùƒ</p>
      </div>

      {/* ========================= GRID ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Merchant Power Score */}
        <div className="bg-[#01341c] border border-[#1b5e3a] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ù‚ÙˆØ© Ø§Ù„Ù…ØªØ¬Ø±</h3>
            <FiStar className="text-yellow-300 text-2xl" />
          </div>
          <p className="text-5xl font-extrabold text-[#4cff9b] mt-2">
            {intel.merchant_score}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ØªÙ‚ÙŠÙŠÙ… Ø´Ø§Ù…Ù„ Ù„Ø£Ø¯Ø§Ø¡Ùƒ Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ø§Ù„ØªØ¬Ø§Ø± Ø§Ù„Ø¢Ø®Ø±ÙŠÙ†.
          </p>
        </div>

        {/* Risk Score */}
        <div className="bg-[#2b1200] border border-[#ff2e2e] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ù…Ø¤Ø´Ø± Ø§Ù„Ø®Ø·Ø±</h3>
            <FiAlertTriangle className="text-red-400 text-2xl" />
          </div>
          <p className="text-5xl font-extrabold text-red-400 mt-2">
            {intel.risk_score}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ÙŠÙ‚ÙŠØ³ Ù…Ø®Ø§Ø·Ø± Ø¶Ø¹Ù Ø§Ù„ØªØ­ÙˆÙŠÙ„ Ø£Ùˆ Ø³ÙˆØ¡ Ø§Ù„ØªØ³Ø¹ÙŠØ±.
          </p>
        </div>

        {/* Best Tribe */}
        <div className="bg-[#01261a] border border-[#1b6647] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ø£ÙØ¶Ù„ Ù‚Ø¨ÙŠÙ„Ø©</h3>
            <FiTarget className="text-[#4cff9b] text-2xl" />
          </div>
          <p className="text-4xl font-extrabold text-[#4cff9b] mt-3">
            {intel.best_tribe}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø£ÙƒØ«Ø± ØªÙˆØ§ÙÙ‚Ù‹Ø§ Ù…Ø¹ Ù…Ù†ØªØ¬Ø§ØªÙƒ Ø­Ø§Ù„ÙŠÙ‹Ø§.
          </p>
        </div>

      </div>

      {/* ========================= Forecast ========================= */}
      <div className="bg-[#01341c] border border-[#1b6642] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiBarChart2 className="text-[#4cff9b]" /> Ø§Ù„ØªÙˆÙ‚Ø¹Ø§Øª
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-gray-300 text-sm">Ù†Ø³Ø¨Ø© Ø§Ù„Ù†Ø¬Ø§Ø­ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©</p>
            <p className="text-4xl font-extrabold text-[#4cff9b]">
              {intel.forecast.success}%
            </p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø© Ù‡Ø°Ø§ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹</p>
            <p className="text-4xl font-extrabold text-green-300">
              SAR {intel.forecast.rev}
            </p>
          </div>
        </div>
      </div>

      {/* ========================= Suggested Campaigns ========================= */}
      <div className="bg-[#01341c] border border-[#1b6642] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiTrendingUp className="text-[#4cff9b]" /> Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø§Ù„Ù…Ù‚ØªØ±Ø­Ø©
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

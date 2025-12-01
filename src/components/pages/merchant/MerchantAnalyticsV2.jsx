// ======================================================================
// ðŸ’š MerchantAnalyticsV2.jsx â€” Core4AI Merchant Intelligence v2 (Noor Edition)
// ======================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function MerchantAnalyticsV2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load pricing + influencers
  const pricing = JSON.parse(localStorage.getItem("core4ai_pricing") || "{}");
  const influencers = JSON.parse(
    localStorage.getItem("core4ai_selected_influencers") || "[]"
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await fetch("/api/merchant/analytics-v2/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: pricing.best_price || 0,
          influencers,
          expected_sales: influencers.reduce(
            (sum, inf) => sum + (inf.expectedSales || 0),
            0
          ),
          audience: "general",
          cost: influencers.reduce((sum, inf) => sum + (inf.price || 0), 0),
        }),
      });

      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-gray-300">
        <BackToMerchant />
        <p className="text-xl animate-pulse">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 page-wrapper">
      <BackToMerchant />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-green-600 drop-shadow">
          ØªØ­Ù„ÙŠÙ„Ø§Øª Core4AI â€” v2
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Ù†Ø¸Ø±Ø© Ø´Ø§Ù…Ù„Ø© Ø¹Ù„Ù‰ Ø£Ø¯Ø§Ø¡ Ù…Ù†ØªØ¬ÙƒØŒ Ø­Ù…Ù„ØªÙƒØŒ ÙˆÙ…Ø¤Ø«Ø±ÙŠÙƒ.
        </p>
      </motion.div>

      {/* ----------------------------------------------- */}
      {/* 1) Audience Fit */}
      {/* ----------------------------------------------- */}
      <div className="core-card mb-8">
        <h2 className="section-subtitle text-green-700 mb-3">
          ðŸŽ¯ Ù¡) Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ø§Ù„Ø£Ù†Ø³Ø¨ Ù„Ø³Ø¹Ø±Ùƒ
        </h2>

        <p className="text-gray-800 font-bold text-lg">
          {data.audience_fit.best_segment}
        </p>

        <p className="text-gray-600 mt-2">
          Ù†Ø³Ø¨Ø© Ø§Ù„ØªÙˆØ§ÙÙ‚: {Math.round(data.audience_fit.score * 100)}%
        </p>

        <p className="text-sm text-gray-500 mt-3">
          *Ø§Ù„Ù†Ø¸Ø§Ù… ÙŠÙ‚Ø§Ø±Ù† Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­ Ù…Ø¹ ØªÙ‚Ø¨Ù‘Ù„ Ø§Ù„ÙØ¦Ø§Øª Ø§Ù„Ù…Ø®ØªÙ„ÙØ© Ù„Ù„Ø³Ø¹Ø±.*
        </p>
      </div>

      {/* ----------------------------------------------- */}
      {/* 2) ROI */}
      {/* ----------------------------------------------- */}
      <div className="core-card mb-8">
        <h2 className="section-subtitle text-blue-700 mb-3">
          ðŸ’° Ù¢) Ø§Ù„Ø¹Ø§Ø¦Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø± (ROI)
        </h2>

        <p className="text-xl font-extrabold text-green-700">
          {Math.round(data.roi.roi * 100)}%
        </p>

        <p className="text-gray-700 mt-2">
          Ø§Ù„Ø£Ø±Ø¨Ø§Ø­ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {data.roi.expected_profit} Ø±ÙŠØ§Ù„
        </p>

        <p className="text-sm text-gray-500 mt-3">
          *Ù‡Ø°Ø§ Ø§Ù„Ø­Ø³Ø§Ø¨ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø¹Ø±ØŒ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†ØŒ ÙˆØ¹Ø¯Ø¯ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹.*
        </p>
      </div>

      {/* ----------------------------------------------- */}
      {/* 3) Success Prediction */}
      {/* ----------------------------------------------- */}
      <div className="core-card mb-8">
        <h2 className="section-subtitle text-purple-700 mb-3">
          â­ Ù£) Ø§Ø­ØªÙ…Ø§Ù„ÙŠØ© Ù†Ø¬Ø§Ø­ Ø§Ù„Ø­Ù…Ù„Ø©
        </h2>

        <p className="text-xl font-bold text-purple-800">
          {data.success.outcome}
        </p>

        <p className="text-gray-700 mt-2">Ø§Ù„Ø¯Ø±Ø¬Ø©: {data.success.score}/10</p>
      </div>

      {/* ----------------------------------------------- */}
      {/* 4) Funnel Projection */}
      {/* ----------------------------------------------- */}
      <div className="core-card mb-8">
        <h2 className="section-subtitle text-pink-700 mb-3">
          ðŸ“Š Ù¤) ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª (Funnel Projection)
        </h2>

        <p className="text-lg font-bold text-gray-800">
          Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {data.funnel_projection.estimated_sales}
        </p>

        <p className="text-gray-600 mt-2">
          Ù†Ø³Ø¨Ø© Ø§Ù„ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©:{" "}
          {Math.round(data.funnel_projection.conversion_rate * 100)}%
        </p>

        <p className="text-sm text-gray-500 mt-3">
          *Ø§Ù„Ù†Ø¸Ø§Ù… ÙŠØ¨Ù†ÙŠ Ø§Ù„ØªÙˆÙ‚Ø¹ Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù‚ÙˆØ© Ø§Ù„Ø³Ø¹Ø± + Ù‚ÙˆØ© Ø§Ù„Ø¬Ù…Ù‡ÙˆØ±.*
        </p>
      </div>

      {/* ----------------------------------------------- */}
      {/* 5) Influencer Quality */}
      {/* ----------------------------------------------- */}
      <div className="core-card mb-12">
        <h2 className="section-subtitle text-yellow-700 mb-3">
          ðŸ‘¥ Ù¥) Ø¬ÙˆØ¯Ø© Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†
        </h2>

        <p className="text-lg font-extrabold text-gray-900">
          {data.influencer_quality.rating}
        </p>

        <p className="text-gray-600 mt-2">
          ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø¬ÙˆØ¯Ø©: {data.influencer_quality.comment}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          *Ø§Ù„ØªØ­Ù„ÙŠÙ„ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø¹Ø±ØŒ Ø§Ù„Ø¬Ù…Ù‡ÙˆØ±ØŒ ÙˆØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª.*
        </p>
      </div>
    </div>
  );
}

// ======================================================================
// ðŸ’š CampaignSummary.jsx â€” Noor Edition (with Analytics v2 integrated)
// ======================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function CampaignSummary() {
  const [pricing, setPricing] = useState(null);
  const [influencers, setInfluencers] = useState([]);

  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    // Load pricing & influencers from localStorage
    setPricing(JSON.parse(localStorage.getItem("core4ai_pricing") || "{}"));
    setInfluencers(
      JSON.parse(localStorage.getItem("core4ai_selected_influencers") || "[]")
    );
  }, []);

  useEffect(() => {
    if (!pricing) return;

    const loadAnalytics = async () => {
      setLoadingAnalytics(true);

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
      setAnalytics(json);
      setLoadingAnalytics(false);
    };

    loadAnalytics();
  }, [pricing, influencers]);

  if (!pricing)
    return <div className="text-center mt-20 text-gray-400">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª.</div>;

  const totalCost = influencers.reduce((sum, inf) => sum + (inf.price || 0), 0);
  const expectedSales = influencers.reduce(
    (sum, inf) => sum + (inf.expectedSales || 0),
    0
  );
  const expectedRevenue = pricing.best_price * expectedSales;
  const expectedProfit = expectedRevenue - totalCost;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 page-wrapper">
      <BackToMerchant />

      <h1 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
        Ù…Ù„Ø®Øµ Ø§Ù„Ø­Ù…Ù„Ø© â€” Core4AI
      </h1>

      {/* ============================ */}
      {/* 1) Pricing Summary */}
      {/* ============================ */}
      <motion.div className="core-card mb-8">
        <h2 className="section-subtitle text-green-700">ðŸ’¸ ØªØ³Ø¹ÙŠØ± Core4AI</h2>

        <p>â€¢ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {pricing.best_price} Ø±ÙŠØ§Ù„</p>
        <p>â€¢ Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ù‚Ø¨ÙˆÙ„: {pricing.range}</p>
        <p>â€¢ Ø±Ø¯Ø© ÙØ¹Ù„ Ø§Ù„Ù†Ø§Ø³: {pricing.reaction}</p>
      </motion.div>

      {/* ============================ */}
      {/* 2) Influencers */}
      {/* ============================ */}
      <motion.div className="core-card mb-8">
        <h2 className="section-subtitle text-purple-700">ðŸ‘¥ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ø®ØªØ§Ø±ÙŠÙ†</h2>

        {influencers.length === 0 && (
          <p className="text-gray-500 text-sm">Ù„Ù… ÙŠØªÙ… Ø§Ø®ØªÙŠØ§Ø± Ù…Ø¤Ø«Ø±ÙŠÙ†.</p>
        )}

        {influencers.map((inf) => (
          <div
            key={inf.id}
            className="flex justify-between p-3 border-b last:border-none text-sm"
          >
            <div>
              <p className="font-bold text-gray-900">{inf.name}</p>
              <p className="text-gray-600">
                Ø§Ù„Ù…ØªÙˆÙ‚Ø¹ ÙŠØ¬Ù„Ø¨: {inf.expectedSales} Ù…Ø¨ÙŠØ¹Ø§Øª
              </p>
            </div>
            <p className="font-bold text-green-700">{inf.price} Ø±ÙŠØ§Ù„</p>
          </div>
        ))}
      </motion.div>

      {/* ============================ */}
      {/* 3) Sales & Revenue */}
      {/* ============================ */}
      <motion.div className="core-card mb-8">
        <h2 className="section-subtitle text-blue-700">ðŸ“Š Ø£Ø±Ù‚Ø§Ù… Ø§Ù„Ø­Ù…Ù„Ø©</h2>

        <p>â€¢ Ø¥Ø¬Ù…Ø§Ù„ÙŠ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†: {totalCost} Ø±ÙŠØ§Ù„</p>
        <p>â€¢ Ø¹Ø¯Ø¯ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹: {expectedSales} Ø¹Ù…Ù„ÙŠØ©</p>
        <p>â€¢ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {expectedRevenue} Ø±ÙŠØ§Ù„</p>

        <p className="font-bold text-green-700 mt-2">
          â€¢ ØµØ§ÙÙŠ Ø§Ù„Ø±Ø¨Ø­ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹: {expectedProfit} Ø±ÙŠØ§Ù„
        </p>
      </motion.div>

      {/* ============================ */}
      {/* 4) Analytics v2 (Core4AI AI Intelligence) */}
      {/* ============================ */}
      <motion.div className="core-card mb-12">
        <h2 className="section-subtitle text-yellow-700">
          ðŸ§  ØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ â€” Core4AI v2
        </h2>

        {loadingAnalytics ? (
          <p className="text-gray-500 text-center py-4 animate-pulse">
            â³ Ø¬Ø§Ø±ÙŠ ØªØ­Ù„ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø­Ù…Ù„â€¦
          </p>
        ) : (
          <>
            {/* Audience Fit */}
            <div className="mb-6">
              <h3 className="font-bold text-green-700">ðŸŽ¯ Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ø§Ù„Ø£Ù†Ø³Ø¨</h3>
              <p className="text-gray-800">
                {analytics.audience_fit.best_segment}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Ø§Ù„ØªÙˆØ§ÙÙ‚: {Math.round(analytics.audience_fit.score * 100)}%
              </p>
            </div>

            {/* ROI */}
            <div className="mb-6">
              <h3 className="font-bold text-blue-700">ðŸ’° Ø§Ù„Ø¹Ø§Ø¦Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø±</h3>
              <p className="text-xl font-bold text-green-700">
                {Math.round(analytics.roi.roi * 100)}%
              </p>
              <p className="text-sm text-gray-600">
                Ø±Ø¨Ø­ Ù…ØªÙˆÙ‚Ø¹: {analytics.roi.expected_profit} Ø±ÙŠØ§Ù„
              </p>
            </div>

            {/* Success */}
            <div className="mb-6">
              <h3 className="font-bold text-purple-700">â­ Ø§Ø­ØªÙ…Ø§Ù„ÙŠØ© Ø§Ù„Ù†Ø¬Ø§Ø­</h3>
              <p className="text-lg font-bold text-purple-800">
                {analytics.success.outcome}
              </p>
              <p className="text-sm text-gray-600">
                Ø§Ù„Ù†ØªÙŠØ¬Ø©: {analytics.success.score}/10
              </p>
            </div>

            {/* Funnel */}
            <div className="mb-6">
              <h3 className="font-bold text-pink-700">ðŸ“ˆ ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª</h3>
              <p className="text-lg font-bold text-gray-800">
                {analytics.funnel_projection.estimated_sales} Ù…Ø¨ÙŠØ¹Ø§Øª
              </p>
              <p className="text-sm text-gray-600">
                Ø§Ù„ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹:{" "}
                {Math.round(
                  analytics.funnel_projection.conversion_rate * 100
                )}%
              </p>
            </div>

            {/* Quality */}
            <div>
              <h3 className="font-bold text-yellow-700">ðŸ‘¥ Ø¬ÙˆØ¯Ø© Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†</h3>
              <p className="text-lg font-bold text-gray-900">
                {analytics.influencer_quality.rating}
              </p>
              <p className="text-sm text-gray-600">
                {analytics.influencer_quality.comment}
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* ============================ */}
      {/* Launch Button */}
      {/* ============================ */}
      <button
        className="btn-green w-full py-4 text-xl"
        onClick={() => alert("ðŸš€ ØªÙ… Ø¥Ø·Ù„Ø§Ù‚ Ø­Ù…Ù„ØªÙƒ Ø¨Ù†Ø¬Ø§Ø­!")}
      >
        ðŸš€ Ø£Ø·Ù„Ù‚ Ø§Ù„Ø­Ù…Ù„Ø© Ø§Ù„Ø¢Ù†
      </button>
    </div>
  );
}

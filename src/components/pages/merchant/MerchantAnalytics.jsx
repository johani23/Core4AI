// ======================================================================
// ðŸ’š MerchantAnalytics.jsx â€” Core4AI Merchant Intelligence v1 (Premium)
// ======================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function MerchantAnalytics() {
  const [pricing, setPricing] = useState(null);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const p = localStorage.getItem("core4ai_pricing");
    if (p) setPricing(JSON.parse(p));

    const inf = localStorage.getItem("core4ai_selected_influencers");
    if (inf) setInfluencers(JSON.parse(inf));
  }, []);

  if (!pricing) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-gray-500">
        <BackToMerchant />
        Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø¨Ø¹Ø¯. Ø£Ø¶Ù Ù…Ù†ØªØ¬ ÙˆØ§Ø¨Ø¯Ø£ Ø­Ù…Ù„Ø© Ø£ÙˆÙ„Ø§Ù‹.
      </div>
    );
  }

  const totalInfluencerCost = influencers.reduce(
    (sum, inf) => sum + (inf.price || 0),
    0
  );
  const expectedSales = influencers.reduce(
    (sum, inf) => sum + (inf.expectedSales || 0),
    0
  );

  const expectedRevenue = pricing.best_price * expectedSales;
  const expectedProfit = expectedRevenue - totalInfluencerCost;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 page-wrapper">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-blue-500 mb-8">
        ØªØ­Ù„ÙŠÙ„Ø§Øª Core4AI Ù„Ù„ØªØ§Ø¬Ø±
      </h1>

      {/* Section 1 â€“ Pricing Insight */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-subtitle text-green-700">Ù¡) Ù†Ø¸Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø¹Ø±</h2>
        <p>â€¢ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø£Ù…Ø«Ù„: {pricing.best_price} Ø±ÙŠØ§Ù„</p>
        <p>â€¢ Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ù‚Ø¨ÙˆÙ„: {pricing.range}</p>
        <p>â€¢ Ø±Ø¯Ø© ÙØ¹Ù„ Ø§Ù„Ù†Ø§Ø³: {pricing.reaction}</p>
        <p className="mt-2 text-sm text-gray-500">
          Ù‡Ø°Ù‡ Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ù…Ù† Core4AI Pricing Engine (Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø© + Ø­Ø³Ø§Ø³ÙŠØ© Ø§Ù„Ø³Ø¹Ø± + Ù…Ù†Ø­Ù†Ù‰ Ø§Ù„Ø·Ù„Ø¨).
        </p>
      </motion.div>

      {/* Section 2 â€“ Influencer Performance */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-subtitle text-purple-700">
          Ù¢) Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†
        </h2>

        {influencers.length === 0 && (
          <p className="text-gray-500 text-sm">
            Ù„Ù… ÙŠØªÙ… Ø§Ø®ØªÙŠØ§Ø± Ù…Ø¤Ø«Ø±ÙŠÙ† Ø¨Ø¹Ø¯.
          </p>
        )}

        {influencers.map((inf) => (
          <div
            key={inf.id}
            className="flex justify-between p-3 border-b last:border-none text-sm"
          >
            <div>
              <p className="font-bold text-gray-900">{inf.name}</p>
              <p className="text-gray-600">
                ÙŠØªÙˆÙ‚Ø¹ ÙŠØ¬ÙŠØ¨: {inf.expectedSales} Ù…Ø¨ÙŠØ¹Ø§Øª
              </p>
            </div>
            <p className="font-bold text-green-700">{inf.price} Ø±ÙŠØ§Ù„</p>
          </div>
        ))}
      </motion.div>

      {/* Section 3 â€“ Campaign Performance */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-subtitle text-blue-700">
          Ù£) Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø­Ù…Ù„Ø©
        </h2>

        <p>â€¢ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†: {totalInfluencerCost} Ø±ÙŠØ§Ù„</p>
        <p>â€¢ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {expectedSales} Ø¹Ù…Ù„ÙŠØ©</p>
        <p>â€¢ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {expectedRevenue} Ø±ÙŠØ§Ù„</p>
        <p className="font-bold text-green-700 mt-2">
          â€¢ ØµØ§ÙÙŠ Ø§Ù„Ø±Ø¨Ø­ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹: {expectedProfit} Ø±ÙŠØ§Ù„
        </p>
      </motion.div>

      {/* Section 4 â€“ Recommendations */}
      <motion.div
        className="core-card bg-yellow-50 border-yellow-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-subtitle text-yellow-700">
          Ù¤) ØªÙˆØµÙŠØ§Øª Core4AI
        </h2>

        {pricing.elasticity > 1 && (
          <p>â€¢ Ø³Ø¹Ø±Ùƒ Ø­Ø³Ø§Ø³â€¦ Ù†ÙˆØµÙ‘ÙŠ ØªØ²ÙŠØ¯ Ø¹Ø¯Ø¯ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø£Ùˆ ØªÙ‚Ø¯Ù‘Ù… Ø¹Ø±Ø¶ Ø®Ø§Øµ.</p>
        )}

        {pricing.elasticity < 1 && (
          <p>â€¢ Ø³Ø¹Ø±Ùƒ Ù…Ù‚Ø¨ÙˆÙ„â€¦ ØªÙ‚Ø¯Ø± ØªØ±ÙƒØ² Ø¹Ù„Ù‰ Ø¬ÙˆØ¯Ø© Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø£ÙƒØ«Ø± Ù…Ù† Ø§Ù„Ø®ØµÙ….</p>
        )}

        {expectedProfit < 0 && (
          <p>â€¢ Ø£Ø±Ø¨Ø§Ø­Ùƒ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø© Ø³Ø§Ù„Ø¨Ø©â€¦ Ø®ÙÙ‘Ø¶ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø£Ùˆ Ø¹Ø¯Ù‘Ù„ Ø§Ù„Ø³Ø¹Ø±.</p>
        )}

        {expectedProfit > 0 && (
          <p>â€¢ Ø§Ù„Ø£Ù…ÙˆØ± Ù…Ù…ØªØ§Ø²Ø©â€¦ Ø§Ø³ØªÙ…Ø± Ø¨Ù†ÙØ³ Ø§Ù„Ø¥Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© ÙˆØ±Ø§Ù‚Ø¨ Ø§Ù„Ù†ØªØ§Ø¦Ø¬.</p>
        )}

        <p className="text-sm text-gray-600 mt-3">
          Ù‡Ø°Ù‡ Ø§Ù„ØªÙˆØµÙŠØ§Øª Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ ØªØ³Ø¹ÙŠØ± Core4AI + Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† + ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ø·Ù„Ø¨.
        </p>
      </motion.div>
    </div>
  );
}

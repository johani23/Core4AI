// ======================================================================
// ðŸ’š MerchantHome.jsx â€” Saudi Premium (Core4AI Merchant Dashboard)
// ======================================================================

import React from "react";
import { motion } from "framer-motion";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function MerchantHome() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper">

      {/* Saudi Back Button */}
      <BackToMerchant />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold text-green-600 drop-shadow-xl">
          ðŸ‡¸ðŸ‡¦ Ù…Ø±ÙƒØ² Ø§Ù„ØªØ§Ø¬Ø± â€” Core4AI
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Ù…Ù†ØµØ© Ø³Ø¹ÙˆØ¯ÙŠØ© ØªØ±ØªÙ‚ÙŠ Ø¨Ø£Ø¹Ù…Ø§Ù„Ùƒ Ø¨Ø®Ø·ÙˆØ§Øª Ø¨Ø³ÙŠØ·Ø© ÙˆÙˆØ§Ø¶Ø­Ø©.
        </p>
      </motion.div>

      {/* BUTTONS GRID */}
      <div className="grid grid-cols-1 gap-6">

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-green text-xl py-5"
          onClick={() => (window.location.href = "/merchant/add-product")}
        >
          âž• Ø£Ø¶Ù Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-blue text-xl py-5"
          onClick={() => (window.location.href = "/merchant/campaign")}
        >
          ðŸ“ˆ Ø³ÙŽÙˆÙ‘Ù Ø­Ù…Ù„Ø© ØªØ³ÙˆÙŠÙ‚
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-yellow text-xl py-5"
          onClick={() => (window.location.href = "/merchant/earnings")}
        >
          ðŸ’° Ø£Ø±Ø¨Ø§Ø­ÙŠ
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-purple text-xl py-5"
          onClick={() => (window.location.href = "/merchant/influencers")}
        >
          ðŸ‘¥ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-pink text-xl py-5"
          onClick={() => (window.location.href = "/merchant/analytics")}
        >
          ðŸ“Š ØªØ­Ù„ÙŠÙ„Ø§Øª Core4AI
        </motion.button>

      </div>
    </div>
  );
}

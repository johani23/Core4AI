// ======================================================================
// ðŸ’š BackToMerchant.jsx â€” Ø²Ø± Ø±Ø¬ÙˆØ¹ Ù…Ù„ÙƒÙŠ Ø¨Ø³ØªØ§ÙŠÙ„ Ø³Ø¹ÙˆØ¯ÙŠ ÙØ§Ø®Ø±
// ======================================================================

import React from "react";
import { motion } from "framer-motion";

export default function BackToMerchant() {
  return (
    <motion.button
      onClick={() => (window.location.href = "/merchant")}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed top-4 left-4 z-50
        bg-gradient-to-r from-green-700 to-green-500
        text-white font-extrabold tracking-wide
        px-5 py-2 rounded-full shadow-xl
        border border-green-300
        backdrop-blur-md
        flex items-center gap-2
      "
    >
      <span className="text-yellow-300 text-lg">ðŸ‘‘</span>
      <span>Ø±Ø¬ÙˆØ¹ Ù„Ù…Ø±ÙƒØ² Ø§Ù„ØªØ§Ø¬Ø±</span>
    </motion.button>
  );
}

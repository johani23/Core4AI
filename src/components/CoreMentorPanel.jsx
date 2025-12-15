// ============================================================================
// ðŸ’Ž Core4.AI â€“ CoreMentorPanel.jsx (Noor FIXED v3)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CoreMentorPanel() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setMessage("ðŸ‘‹ Ø£Ù‡Ù„Ø§Ù‹! Ø¬Ø§Ù‡Ø² ØªØ¨Ø¯Ø£ Ø±Ø­Ù„ØªÙƒ Ø¯Ø§Ø®Ù„ Core4.AIØŸ");
        break;
      case "/grow":
        setMessage("ðŸ”¥ Ù†ØµÙŠØ­Ø©: ØªØ¹Ø§ÙˆÙ† Ù…Ø¹ Ù‚Ø¨ÙŠÙ„ØªÙƒâ€¦ Ù‚ÙˆØ© Ø§Ù„ØªØ£Ø«ÙŠØ± ØªØªØ¶Ø§Ø¹Ù!");
        break;
      case "/wallet":
        setMessage("ðŸ’° ÙƒÙ„ ØªÙØ§Ø¹Ù„ ÙŠØ²ÙŠØ¯ Ù…Ø³ØªÙˆÙ‰ C4T Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ.");
        break;
      case "/pulse":
        setMessage("ðŸ“¡ Ù…Ø¤Ø´Ø± D-Index ÙŠØ±ØªÙØ¹ØŸ Ø§Ù„Ø´Ø¨ÙƒØ© ØªØªÙØ§Ø¹Ù„ Ø¨Ø´ÙƒÙ„ Ù…Ù…ØªØ§Ø²!");
        break;
      default:
        setMessage("âœ¨ Ø§Ø³ØªÙ…Ø± ÙÙŠ Ø§Ø³ØªÙƒØ´Ø§Ù Ù†Ø¸Ø§Ù… Core4.AI.");
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 bg-[#111827] border border-gray-700 rounded-2xl shadow-lg p-4 w-72 z-50 flex flex-col justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <p className="text-sm text-gray-300 leading-snug">{message}</p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-300 self-end"
          >
            Ø¥Ø®ÙØ§Ø¡
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


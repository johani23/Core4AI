// ============================================================
// ðŸ’« Core4.AI â€“ CoreMentorPanel.jsx (v1.0 â€œFloating Assistantâ€)
// ------------------------------------------------------------
// âœ… Persistent floating assistant (bottom-right corner)
// âœ… Context-aware messages per route
// âœ… Future-ready for CoreSyncContext integration
// ============================================================

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
        setMessage("ðŸ‘‹ Welcome! Ready to explore your creator journey?");
        break;
      case "/grow":
        setMessage("ðŸš€ Tip: Collaborate with your Tribe to multiply rewards.");
        break;
      case "/wallet":
        setMessage("ðŸ’° Every transaction increases your C4T level â€” keep it up!");
        break;
      case "/pulse":
        setMessage("ðŸŒ D-Index rising? That means the network is thriving!");
        break;
      default:
        setMessage("âœ¨ Letâ€™s keep exploring the Core4.AI ecosystem.");
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
            Hide
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

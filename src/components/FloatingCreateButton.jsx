// ============================================================
// ðŸŽ¨ FloatingCreateButton.jsx (v1.0 â€œTikTok Modeâ€)
// ------------------------------------------------------------
// ðŸ’« Global â€œ+â€ button for instant post creation
// âœ… Opens Create & Promote modal from anywhere
// ============================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function FloatingCreateButton() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [tribe, setTribe] = useState("");
  const [merchant, setMerchant] = useState("");

  const handlePost = () => {
    if (!content.trim()) return alert("Write something first!");
    alert(`ðŸš€ Posted to ${tribe || "Unassigned"} ${
      merchant ? "with offer: " + merchant : ""
    }`);
    setContent("");
    setTribe("");
    setMerchant("");
    setOpen(false);
  };

  return (
    <>
      {/* Floating Create Button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-xl hover:scale-110 hover:shadow-purple-500/40 transition-all z-50"
      >
        +
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[480px] text-white relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                ðŸš€ Create & Promote
              </h2>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your story, insight, or product link..."
                rows={3}
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-sm text-white mb-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
              ></textarea>

              <div className="flex flex-col gap-3 mb-4">
                <select
                  value={tribe}
                  onChange={(e) => setTribe(e.target.value)}
                  className="bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select Tribe</option>
                  <option value="Fashion Tribe">Fashion Tribe</option>
                  <option value="Event Tribe">Event Tribe</option>
                  <option value="Tech Tribe">Tech Tribe</option>
                  <option value="Health Tribe">Health Tribe</option>
                </select>

                <select
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Attach Merchant Offer</option>
                  <option value="UrbanGear Sneaker">UrbanGear Sneaker</option>
                  <option value="Techy Fitness Band">Techy Fitness Band</option>
                </select>
              </div>

              <button
                onClick={handlePost}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
              >
                ðŸš€ Post Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

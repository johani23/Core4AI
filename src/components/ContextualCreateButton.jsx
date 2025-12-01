// ============================================================
// ðŸŽ¯ ContextualCreateButton.jsx (v2.0 â€œRole-Aware Per-Tab Actionâ€)
// ------------------------------------------------------------
// âœ… Shows contextual â€œCreateâ€ per page
// âœ… Uses userRole (buyer / creator) for visibility
// ============================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreatePostModal from "@components/CreatePostModal";

export default function ContextualCreateButton({ page, userRole }) {
  const [open, setOpen] = useState(false);

  // hide irrelevant actions by role
  if (userRole === "buyer" && page !== "offers") return null;
  if (userRole === "creator" && page === "offers") return null;

  const getLabel = () => {
    switch (page) {
      case "offers": return "âž• Add Offer";
      case "feed": return "âœï¸ New Post";
      case "promote": return "ðŸš€ Promote Product";
      case "collab": return "ðŸ¤ Start Collaboration";
      default: return "âž• Create";
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
      >
        {getLabel()}
      </motion.button>

      <AnimatePresence>
        {open && (
          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
            context={page}
            userRole={userRole}
          />
        )}
      </AnimatePresence>
    </>
  );
}

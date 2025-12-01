// ============================================================
// ðŸ’Ž Core4.AI â€“ GlobalStatusBar.jsx (MVP-101.3 â€œSystem Live HUDâ€)
// ------------------------------------------------------------
// âœ… Shows Synaptic + Council connection status
// âœ… Displays latest reward + live D-Index
// âœ… Auto-updates via CoreSyncContext (no sockets needed)
// âœ… Minimal footer bar for all pages
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function GlobalStatusBar() {
  const { status, councilStatus, dindex, rewards = [] } = useCoreSync();
  const [lastReward, setLastReward] = useState(null);

  useEffect(() => {
    if (rewards.length > 0) setLastReward(rewards[0]);
  }, [rewards]);

  const statusColor = status.includes("ðŸŸ¢")
    ? "text-green-400"
    : status.includes("ðŸ”´")
    ? "text-red-400"
    : "text-gray-400";

  const councilColor = councilStatus.includes("ðŸŸ¢")
    ? "text-green-400"
    : councilStatus.includes("ðŸ”´")
    ? "text-red-400"
    : "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 border-t border-fuchsia-700/40 backdrop-blur-sm text-[11px] md:text-xs text-gray-300 flex justify-between items-center px-4 py-1"
    >
      {/* ðŸ§  Connection State */}
      <div className="flex items-center gap-3">
        <span className={`${statusColor}`}>Synaptic: {status}</span>
        <span className={`${councilColor}`}>Council: {councilStatus}</span>
      </div>

      {/* ðŸ’° Reward / D-Index Summary */}
      <div className="flex items-center gap-3">
        <span className="text-fuchsia-300">
          D-Index: {(dindex * 100).toFixed(1)}%
        </span>
        {lastReward ? (
          <span className="text-emerald-400">
            +{lastReward.C4T_tokens} C4T â€¢ {lastReward.tribe}
          </span>
        ) : (
          <span className="text-gray-500">No rewards yet</span>
        )}
      </div>

      {/* ðŸ§© Build Info */}
      <div className="hidden md:block text-gray-500">
        Beta v10.1 â€¢ Unified Status HUD
      </div>
    </motion.div>
  );
}

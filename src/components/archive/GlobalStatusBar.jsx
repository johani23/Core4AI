// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ GlobalStatusBar.jsx (MVP-101.3 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSystem Live HUDÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows Synaptic + Council connection status
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays latest reward + live D-Index
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-updates via CoreSyncContext (no sockets needed)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Minimal footer bar for all pages
// ============================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function GlobalStatusBar() {
  const { status, councilStatus, dindex, rewards = [] } = useCoreSync();
  const [lastReward, setLastReward] = useState(null);

  useEffect(() => {
    if (rewards.length > 0) setLastReward(rewards[0]);
  }, [rewards]);

  const statusColor = status.includes("ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢")
    ? "text-green-400"
    : status.includes("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´")
    ? "text-red-400"
    : "text-gray-400";

  const councilColor = councilStatus.includes("ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢")
    ? "text-green-400"
    : councilStatus.includes("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´")
    ? "text-red-400"
    : "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 border-t border-fuchsia-700/40 backdrop-blur-sm text-[11px] md:text-xs text-gray-300 flex justify-between items-center px-4 py-1"
    >
      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Connection State */}
      <div className="flex items-center gap-3">
        <span className={`${statusColor}`}>Synaptic: {status}</span>
        <span className={`${councilColor}`}>Council: {councilStatus}</span>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Reward / D-Index Summary */}
      <div className="flex items-center gap-3">
        <span className="text-fuchsia-300">
          D-Index: {(dindex * 100).toFixed(1)}%
        </span>
        {lastReward ? (
          <span className="text-emerald-400">
            +{lastReward.C4T_tokens} C4T ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {lastReward.tribe}
          </span>
        ) : (
          <span className="text-gray-500">No rewards yet</span>
        )}
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Build Info */}
      <div className="hidden md:block text-gray-500">
        Beta v10.1 ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Unified Status HUD
      </div>
    </motion.div>
  );
}



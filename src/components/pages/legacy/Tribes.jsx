// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Tribes.jsx (v138 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œLive Reward & Level SyncÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¶ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â 
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ simulateReward() Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â  CoreSyncContext
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â« dopamine Ãƒâ„¢Ã‹â€  D-Index Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂºÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ 1 ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ (Tribes + TokenWeight + Reward Integration)
// ============================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function Tribes() {
  const { tribes, council, backendStatus, simulateReward } = useCoreSync();
  const [loadingTribe, setLoadingTribe] = useState(null);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Trigger Reward Simulation
  // ------------------------------------------------------------
  const handleReward = async (tribeName) => {
    setLoadingTribe(tribeName);
    await simulateReward(tribeName);
    setTimeout(() => setLoadingTribe(null), 800); // smooth reset
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Level Badge Helper
  // ------------------------------------------------------------
  const levelBadge = (level) => {
    if (level >= 5) return "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Master";
    if (level >= 3) return "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Pro";
    if (level >= 2) return "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ Rising";
    return "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Novice";
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Dopamine Color Logic
  // ------------------------------------------------------------
  const dopamineColor = (val) => {
    if (val > 0.7) return "text-emerald-400";
    if (val > 0.5) return "text-yellow-400";
    return "text-red-400";
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Render Tribe Cards
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-400 flex items-center gap-2">
          ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂÃƒÂ¯Ã‚Â¸Ã‚Â Active Tribes
        </h1>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            backendStatus === "online"
              ? "bg-emerald-600/30 text-emerald-300"
              : "bg-red-600/30 text-red-300"
          }`}
        >
          {backendStatus === "online" ? "Live Sync" : "Offline Mode"}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-8">
        ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¶ÃƒËœÃ‚ÂºÃƒËœÃ‚Â· ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â£Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¯Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â£ÃƒËœÃ‚Â© Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ /reward/simulate
      </p>

      {/* Tribe Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tribes.map((t) => (
          <motion.div
            key={t.name}
            whileHover={{ scale: 1.02 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${t.color} shadow-lg relative overflow-hidden border border-gray-800`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{t.name}</h2>
              <span className="text-xs bg-gray-900/40 px-2 py-1 rounded-lg">
                {levelBadge(t.level)}
              </span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <div>
                <p className="text-gray-400">Level</p>
                <p className="text-lg font-semibold text-fuchsia-300">
                  {t.level}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Dopamine</p>
                <p
                  className={`text-lg font-semibold ${dopamineColor(
                    t.dopamine
                  )}`}
                >
                  {(t.dopamine * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              <p>
                Tokens:{" "}
                <span className="text-fuchsia-300 font-semibold">
                  {t.tokens}
                </span>{" "}
                | Mood:{" "}
                <span className="text-cyan-300 font-semibold">
                  {t.dopamine > 0.7
                    ? "Peak"
                    : t.dopamine > 0.55
                    ? "Active"
                    : "Low"}
                </span>
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleReward(t.name)}
              disabled={loadingTribe === t.name}
              className={`w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                loadingTribe === t.name
                  ? "bg-gray-700 text-gray-400 cursor-wait"
                  : "bg-black/40 text-fuchsia-300 hover:bg-fuchsia-700/40"
              }`}
            >
              {loadingTribe === t.name
                ? "Processing..."
                : "Trigger Reward Cycle"}
            </motion.button>

            {/* D-Index Pulse bar */}
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-black/20">
              <motion.div
                className="h-full bg-fuchsia-400/70"
                animate={{ width: `${council.dindex}%`, opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Council Overview */}
      <div className="mt-10 p-4 border border-gray-800 rounded-xl bg-gray-900/40">
        <h3 className="text-lg font-semibold text-emerald-400 mb-2">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Council D-Index
        </h3>
        <p className="text-gray-300 text-sm">
          Current D-Index:{" "}
          <span className="text-fuchsia-400 font-bold">
            {council.dindex.toFixed(2)}
          </span>{" "}
          ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ measures tribe harmony and engagement power.
        </p>
      </div>
    </div>
  );
}



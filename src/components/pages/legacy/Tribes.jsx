// ============================================================
// ðŸ’Ž Core4.AI â€“ Tribes.jsx (v138 â€œLive Reward & Level Syncâ€)
// ------------------------------------------------------------
// âœ… ÙŠØ¹Ø±Ø¶ Ù…Ø³ØªÙˆÙŠØ§Øª Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„ ÙˆÙ…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù†Ø´Ø§Ø· ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ
// âœ… ÙŠØªÙØ§Ø¹Ù„ Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ø¹ simulateReward() Ù…Ù† CoreSyncContext
// âœ… ÙŠÙØ­Ø¯Ø« dopamine Ùˆ D-Index ÙÙˆØ±ÙŠØ§Ù‹ Ø¨Ø¹Ø¯ ÙƒÙ„ ØªÙØ§Ø¹Ù„
// âœ… ÙŠØºÙ„Ù‚ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 1 Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ (Tribes + TokenWeight + Reward Integration)
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function Tribes() {
  const { tribes, council, backendStatus, simulateReward } = useCoreSync();
  const [loadingTribe, setLoadingTribe] = useState(null);

  // ------------------------------------------------------------
  // ðŸ§® Trigger Reward Simulation
  // ------------------------------------------------------------
  const handleReward = async (tribeName) => {
    setLoadingTribe(tribeName);
    await simulateReward(tribeName);
    setTimeout(() => setLoadingTribe(null), 800); // smooth reset
  };

  // ------------------------------------------------------------
  // ðŸŽ¨ Level Badge Helper
  // ------------------------------------------------------------
  const levelBadge = (level) => {
    if (level >= 5) return "ðŸ’Ž Master";
    if (level >= 3) return "ðŸ”¥ Pro";
    if (level >= 2) return "ðŸŒŸ Rising";
    return "ðŸŽ¯ Novice";
  };

  // ------------------------------------------------------------
  // ðŸ“Š Dopamine Color Logic
  // ------------------------------------------------------------
  const dopamineColor = (val) => {
    if (val > 0.7) return "text-emerald-400";
    if (val > 0.5) return "text-yellow-400";
    return "text-red-400";
  };

  // ------------------------------------------------------------
  // ðŸ§  Render Tribe Cards
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-400 flex items-center gap-2">
          âš”ï¸ Active Tribes
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
        Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø£ÙŠ Ù‚Ø¨ÙŠÙ„Ø© Ù„ØªØ¬Ø±Ø¨Ø© Ø¯ÙˆØ±Ø© Ø§Ù„Ù…ÙƒØ§ÙØ£Ø© ÙˆØ§Ø®ØªØ¨Ø§Ø± Ø§Ù„ØªÙØ§Ø¹Ù„ Ù…Ø¹ /reward/simulate
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
          ðŸ§­ Council D-Index
        </h3>
        <p className="text-gray-300 text-sm">
          Current D-Index:{" "}
          <span className="text-fuchsia-400 font-bold">
            {council.dindex.toFixed(2)}
          </span>{" "}
          â€“ measures tribe harmony and engagement power.
        </p>
      </div>
    </div>
  );
}

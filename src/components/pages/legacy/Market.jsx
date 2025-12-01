// ============================================================
// ðŸ’¹ Core4.AI â€“ Market.jsx (MVP-93.1 â€œSynaptic Market Pulseâ€)
// ------------------------------------------------------------
// âœ… Integrated with CoreSyncContext (no direct WebSocket)
// âœ… Real-time dopamine sync from Synaptic Stream
// âœ… Council risk auto-sync + pulse highlighting
// ============================================================

import React from "react";
import { useCoreSync } from "@context/CoreSyncContext";
import { motion } from "framer-motion";

export default function Market() {
  const { heatmap = {}, synapticFeed = [], avgMood = 0.5 } = useCoreSync() || {};

  const tribes = Object.keys(heatmap).length
    ? heatmap
    : {
        "Vibe Makers": 0.6,
        "Deep Thinkers": 0.6,
        "Humor League": 0.6,
      };

  // ðŸ” extract last risk if exists
  const lastRiskEvent = synapticFeed.find((e) => e.risk);
  const risk = lastRiskEvent?.risk || "Low";

  const tribeColors = {
    "Vibe Makers": "from-pink-500 to-fuchsia-600",
    "Deep Thinkers": "from-blue-500 to-indigo-600",
    "Humor League": "from-amber-400 to-orange-500",
  };

  const riskStyles = {
    High: "opacity-40 saturate-50",
    Medium: "opacity-70 saturate-75",
    Low: "opacity-100 saturate-100",
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-fuchsia-300">
        ðŸ’¹ Synaptic Market Pulse
      </h2>
      <p className="text-sm text-gray-400 mb-2">
        Token value mirrors tribe dopamine energy.
      </p>
      <p className="text-xs text-gray-400 mb-6">
        Council Risk State:{" "}
        <span
          className={`font-semibold ${
            risk === "High"
              ? "text-red-400"
              : risk === "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {risk}
        </span>
      </p>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {Object.entries(tribes).map(([tribe, val]) => (
          <motion.div
            key={tribe}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-xl text-center font-bold text-white bg-gradient-to-r ${tribeColors[tribe]} ${
              riskStyles[risk]
            }`}
          >
            <h3 className="text-lg mb-1">{tribe}</h3>
            <p className="text-xs text-gray-100/80 mb-2">
              Dopamine: {val.toFixed(2)}
            </p>
            <p className="text-3xl">{(val * 100).toFixed(1)} VIS</p>
          </motion.div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Synaptic and Council streams are unified in real time.
      </div>
    </div>
  );
}

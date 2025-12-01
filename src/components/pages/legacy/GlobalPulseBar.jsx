// ============================================================
// ðŸ’Ž Core4.AI â€“ GlobalPulseTopBar.jsx (MVP-101.4 â€œSynaptic-Linked Editionâ€)
// ------------------------------------------------------------
// âœ… Reads D-Index + live dopamine pulses directly from CoreSyncContext
// âœ… Auto-animates gradient based on global energy (no polling)
// âœ… Broadcasts globalMoodUpdate to other tabs
// âœ… Works seamlessly with SimulationHub + Dashboard
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function GlobalPulseTopBar() {
  const { dindex = 0, status = "ðŸ”´ Offline" } = useCoreSync() || {};
  const [avg, setAvg] = useState(50);
  const [statusLabel, setStatusLabel] = useState("Calm");
  const [mood, setMood] = useState("neutral");

  // ðŸ§  derive avg% whenever D-Index updates
  useEffect(() => {
    const avgPercent = Math.round((dindex || 0) * 100);
    setAvg(avgPercent);
    const label =
      avgPercent > 75
        ? "ðŸ”¥ Peak Energy"
        : avgPercent > 60
        ? "ðŸŒ¤ Rising"
        : avgPercent > 45
        ? "ðŸŒ« Calm"
        : "ðŸŒ§ Low";
    setStatusLabel(label);

    // Broadcast to all open tabs (Dashboard, Market, etc.)
    window.dispatchEvent(
      new CustomEvent("globalMoodUpdate", {
        detail: { mood, avg: avgPercent, status: label },
      })
    );
  }, [dindex, mood]);

  // optional listener for cross-component market mood events
  useEffect(() => {
    const handler = (e) => setMood(e.detail.mood);
    window.addEventListener("marketMoodUpdate", handler);
    return () => window.removeEventListener("marketMoodUpdate", handler);
  }, []);

  // ðŸŽ¨ color + emoji mapping
  const color =
    mood === "bullish"
      ? "from-green-400 to-emerald-600"
      : mood === "bearish"
      ? "from-red-500 to-pink-700"
      : avg > 75
      ? "from-yellow-400 to-red-500"
      : avg > 60
      ? "from-sky-400 to-indigo-600"
      : avg > 45
      ? "from-purple-600 to-pink-700"
      : "from-gray-600 to-gray-800";

  const emoji =
    mood === "bullish"
      ? "ðŸ˜Ž"
      : mood === "bearish"
      ? "ðŸ˜¨"
      : avg > 75
      ? "ðŸ”¥"
      : avg > 60
      ? "ðŸŒ¤"
      : avg > 45
      ? "ðŸŒ«"
      : "ðŸŒ§";

  const online = status.includes("ðŸŸ¢");

  return (
    <div className="w-full sticky top-0 left-0 z-50">
      {/* Animated top gradient bar */}
      <motion.div
        className={`h-[3px] bg-gradient-to-r ${color}`}
        animate={{ width: ["100%", "90%", "100%"], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Status line */}
      <div className="text-center text-[11px] py-1 bg-black/60 backdrop-blur-sm text-gray-300 tracking-wide">
        {emoji} {statusLabel} â€¢{" "}
        <span
          className={`font-semibold ${
            online ? "text-green-400" : "text-red-400"
          }`}
        >
          {online ? "Online" : "Offline"}
        </span>{" "}
        â€¢ <span className="text-gray-400">Global Dopamine:</span>{" "}
        <span className="text-yellow-400 font-semibold">{avg.toFixed(1)}%</span>
      </div>
    </div>
  );
}

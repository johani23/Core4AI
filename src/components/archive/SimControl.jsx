// ============================================================
// ðŸ’  Core4.AI â€“ SimControl.jsx (MVP-65.4 â€œStable Game Consoleâ€)
// ------------------------------------------------------------
// âœ… Safe handling for undefined values (no more .toFixed() crash)
// âœ… Adds live indicator + total events + scenario hint
// âœ… Auto-hides when simulation layer not active
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function SimControl() {
  const {
    isSimRunning = false,
    eventCount = 0,
    speed = 1,
    scenario = "steady_growth",
    startSim,
    stopSim,
    setSimSpeed,
    setSimScenario,
  } = useCoreSync();

  // ðŸ§® Defensive numeric formatter
  const fmt = (v, digits = 1) =>
    Number.isFinite(v) ? v.toFixed(digits) : (0).toFixed(digits);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 bg-gray-900/80 backdrop-blur-xl border border-fuchsia-500/40 rounded-2xl p-4 shadow-lg text-sm text-gray-200 w-64"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-fuchsia-400">
          ðŸŽ® Simulation Control
        </div>
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isSimRunning ? "bg-green-400 animate-pulse" : "bg-red-500"
          }`}
        ></div>
      </div>

      {/* Scenario Selector */}
      <div className="flex items-center justify-between mb-2">
        <span>Scenario:</span>
        <select
          value={scenario}
          onChange={(e) => setSimScenario(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-md text-gray-200 text-xs px-2 py-1"
        >
          <option value="steady_growth">Steady Growth</option>
          <option value="viral_spike">Viral Spike</option>
          <option value="tribe_conflict">Tribe Conflict</option>
          <option value="creator_boom">Creator Boom</option>
        </select>
      </div>

      {/* Speed Control */}
      <div className="flex items-center justify-between mb-2">
        <span>Speed:</span>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={speed ?? 1}
          onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
          className="accent-fuchsia-500 w-24"
        />
        <span>{fmt(speed)}x</span>
      </div>

      {/* Stats */}
      <div className="flex justify-between mb-3">
        <span>Events:</span>
        <span className="text-fuchsia-300 font-mono">
          {Number.isFinite(eventCount) ? eventCount : 0}
        </span>
      </div>

      {/* Control Buttons */}
      {isSimRunning ? (
        <button
          onClick={stopSim}
          className="w-full bg-red-600 hover:bg-red-700 rounded-md py-1 transition-colors"
        >
          â¹ Stop Simulation
        </button>
      ) : (
        <button
          onClick={startSim}
          className="w-full bg-green-600 hover:bg-green-700 rounded-md py-1 transition-colors"
        >
          â–¶ï¸ Start Simulation
        </button>
      )}

      {/* Scenario Hint */}
      <p className="text-[10px] text-gray-400 mt-3 italic text-center">
        {scenario === "steady_growth"
          ? "Balanced organic rise."
          : scenario === "viral_spike"
          ? "Sudden surge in engagement."
          : scenario === "tribe_conflict"
          ? "Polarized tribes clashing."
          : "Rapid creator onboarding wave."}
      </p>
    </motion.div>
  );
}

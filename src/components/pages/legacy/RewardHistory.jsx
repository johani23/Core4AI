// ============================================================
// ðŸ’Ž Core4.AI â€“ RewardHistory.jsx (v10.2 â€œCumulative Memory Layerâ€)
// ------------------------------------------------------------
// âœ… Tracks last 10 reward simulations
// âœ… Saves to localStorage for persistence
// âœ… Displays chronological list (latest on top)
// âœ… Seamless plug-in for Dashboard.jsx
// ============================================================

import React, { useEffect, useState } from "react";

export default function RewardHistory() {
  const [history, setHistory] = useState([]);

  // ðŸ§  Load saved history on mount
  useEffect(() => {
    const stored = localStorage.getItem("rewardHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // ðŸ’¾ Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("rewardHistory", JSON.stringify(history));
  }, [history]);

  // ðŸ§© Append new record manually from console (for test)
  // window.addTestReward({ tribe: "Thinkers", reward_index: 0.42, C4T_tokens: 44, Tribe_tokens: 13 });

  // ðŸ§± UI Component
  return (
    <div className="mt-10 p-5 bg-gray-900/60 border border-fuchsia-700/40 rounded-xl text-sm max-w-lg">
      <h2 className="text-fuchsia-400 font-semibold mb-3">
        ðŸ“œ Reward History (Last 10 Simulations)
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 italic text-xs">
          No simulations yet â€” results will appear here after you run Simulate.
        </p>
      ) : (
        <ul className="space-y-2 max-h-[260px] overflow-y-auto">
          {history
            .slice()
            .reverse()
            .map((r, i) => (
              <li
                key={i}
                className="border border-gray-700 rounded-lg p-3 bg-gray-800/50 hover:bg-gray-800 transition"
              >
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{new Date(r.timestamp).toLocaleTimeString()}</span>
                  <span className="text-fuchsia-300 font-medium">{r.tribe}</span>
                </div>

                <div className="mt-1 text-gray-300">
                  ðŸ’Ž <span className="text-fuchsia-400">{r.reward_index}</span>{" "}
                  | +{r.C4T_tokens}{" "}
                  <span className="text-green-400">C4T</span> / +{r.Tribe_tokens}{" "}
                  <span className="text-blue-400">Tribe</span>
                </div>
              </li>
            ))}
        </ul>
      )}

      <div className="text-xs text-gray-600 mt-3">
        Beta Core v10.2 â€¢ Reward History Memory Layer
      </div>
    </div>
  );
}

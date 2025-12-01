import React, { useEffect, useState } from "react";
import { getLeaderboardData } from "@services/api";
import { getMomentumColor } from "@data/dataSync";

/**
 * 💎 Core4.AI – MVP-24.9 Leaderboard.jsx
 * ------------------------------------------------------------
 * Displays top-performing Core4 groups with live momentum
 * indicators and dopamine-inspired visuals.
 * ------------------------------------------------------------
 */

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const data = await getLeaderboardData();
        setLeaderboard(data);
      } catch (err) {
        console.warn("⚠️ Error loading leaderboard:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading leaderboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Core4 Leaderboard</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {leaderboard.map((entry) => {
          const color = getMomentumColor(entry.momentum || "neutral");

          return (
            <div
              key={entry.rank}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 
                         rounded-2xl p-5 shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full text-black font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {entry.rank}
                  </div>
                  <h2 className="text-lg font-semibold">{entry.group}</h2>
                </div>

                <span
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: color + "20",
                    color: color,
                  }}
                >
                  {entry.momentum}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>XP: {entry.xp.toLocaleString()}</span>
                <span>Growth: {entry.growth}</span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${Math.min(entry.xp / 35, 100)}%`,
                    backgroundColor: color,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// ðŸ† TribeLeaderboard.jsx (MVP-27)
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTribeLeaderboard } from "@services/api";

export default function TribeLeaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getTribeLeaderboard();
      setLeaders(data);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4">ðŸ† Tribe Leaderboard</h1>

      <div className="space-y-4">
        {leaders.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between items-center bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-emerald-400">
                #{item.rank}
              </span>
              <span className="text-lg">{item.tribe}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">
                Price:{" "}
                <span className="text-white">{item.price_index.toFixed(2)}</span>
              </p>
              <p
                className={`text-sm ${
                  item.sentiment > 0
                    ? "text-emerald-400"
                    : item.sentiment < 0
                    ? "text-rose-400"
                    : "text-zinc-400"
                }`}
              >
                Sentiment: {item.sentiment}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

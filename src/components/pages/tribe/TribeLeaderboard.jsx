// ============================================================
// ðŸ§­ Core4.AI â€“ TribeLeaderboard.jsx (v1.0 â€œInsight Pulse Boardâ€)
// ------------------------------------------------------------
// âœ… Displays top tribes by mood, conversion, and engagement
// âœ… Simulated dopamine pulse animation
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Smile, Users } from "lucide-react";

const baseTribes = [
  { name: "Fashion Tribe", color: "from-pink-500 to-purple-500" },
  { name: "Tech Tribe", color: "from-blue-500 to-cyan-500" },
  { name: "Event Tribe", color: "from-orange-400 to-red-500" },
  { name: "Health Tribe", color: "from-green-400 to-emerald-600" },
];

export default function TribeLeaderboard() {
  const [tribes, setTribes] = useState([]);

  useEffect(() => {
    const data = baseTribes.map((t) => ({
      ...t,
      mood: Math.random().toFixed(2),
      conversion: (Math.random() * (6 - 2) + 2).toFixed(1),
      members: Math.floor(Math.random() * 800 + 200),
    }));
    setTribes(data.sort((a, b) => b.mood - a.mood));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-cyan-400 flex items-center gap-2">
        <Users className="w-7 h-7" /> Tribe Leaderboard
      </h1>
      <p className="text-gray-400 text-sm">
        Live tribe performance board. Dopamine pulse = average engagement vibe.
      </p>

      {tribes.map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.01 }}
          className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white font-semibold text-lg">{t.name}</h2>
            <span className="text-xs text-gray-400">#{i + 1}</span>
          </div>

          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <motion.div
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${t.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${t.mood * 100}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Smile className="w-3 h-3 text-yellow-400" /> Mood {t.mood}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" /> {t.conversion}% CR
            </span>
            <span>{t.members} members</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

/**
 * Core4.AI â€“ MVP 20 SpotlightCard
 * -----------------------------------------------
 * Displays top-performing groups within Spotlight.
 * Uses framer-motion for animated entry and hover.
 */

export default function SpotlightCard({ name, index }) {
  const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // gold, silver, bronze
  const rankEmojis = ["ðŸ¥‡", "ðŸ¥ˆ", "ðŸ¥‰"];

  const color = rankColors[index - 1] || "#A78BFA";
  const emoji = rankEmojis[index - 1] || "â­";

  return (
    <motion.div
      className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center shadow-md hover:shadow-yellow-500/10 transition-all cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, borderColor: color }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="text-3xl mb-2" style={{ color }}>
        {emoji}
      </div>
      <h3 className="text-lg font-semibold text-yellow-300">{name}</h3>
      <p className="text-gray-400 text-sm mt-2">
        Consistent engagement and creative synergy detected.
      </p>
      <div className="mt-3 text-xs text-gray-500">
        <span className="px-2 py-1 bg-gray-800 rounded-lg">Rank #{index}</span>
      </div>
    </motion.div>
  );
}

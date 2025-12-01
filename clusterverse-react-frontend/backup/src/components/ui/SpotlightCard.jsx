import React from "react";
import { motion } from "framer-motion";

/**
 * Core4.AI – MVP 18 UI Component
 * -----------------------------------------------------------
 * SpotlightCard
 * Displays a ranked group card used in Spotlight page.
 * Animated entry + adaptive colors based on rank.
 */

export default function SpotlightCard({ name, index }) {
  // Gradient & accent color logic per rank
  const rankColors = [
    "from-yellow-500/20 to-yellow-700/40 border-yellow-400 text-yellow-300",
    "from-gray-700/40 to-gray-900/60 border-gray-400 text-gray-300",
    "from-amber-800/20 to-amber-600/40 border-amber-400 text-amber-300",
  ];
  const rankStyle = rankColors[index - 1] || "from-gray-800/20 to-gray-900/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-2xl border bg-gradient-to-b ${rankStyle} 
      p-5 shadow-lg hover:shadow-yellow-400/10 hover:scale-[1.02] 
      transition-all duration-300 cursor-default`}
    >
      {/* Rank number */}
      <div className="absolute -top-3 -right-3 bg-gray-900 border border-gray-700 
        text-xs text-yellow-400 font-semibold px-3 py-1 rounded-full">
        #{index}
      </div>

      {/* Group name */}
      <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>

      {/* Fake progress bar / XP level visualization */}
      <div className="w-full bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${90 - index * 10}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-2 bg-yellow-400 rounded-full shadow-inner"
        ></motion.div>
      </div>

      <p className="text-sm text-gray-400 mt-3 italic">
        Consistent performance & creative growth.
      </p>
    </motion.div>
  );
}

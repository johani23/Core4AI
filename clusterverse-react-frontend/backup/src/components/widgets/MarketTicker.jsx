// ============================================================
// 💬 MarketTicker.jsx – Scrolling Market Events
// ============================================================
import React from "react";
import { motion } from "framer-motion";

export default function MarketTicker({ news = [] }) {
  if (!news || news.length === 0)
    return (
      <p className="text-zinc-500 text-sm mb-3">No recent market news.</p>
    );

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-zinc-800 py-2">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        className="inline-block text-sm text-zinc-300"
      >
        {news.map((item, i) => (
          <span key={i} className="mx-6">
            {item.tribe} → {item.message}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

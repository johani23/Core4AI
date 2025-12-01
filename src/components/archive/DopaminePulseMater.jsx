// ============================================================
// ðŸ’Ž Core4.AI â€“ DopaminePulseMeter.jsx (MVP-64.4 â€œCollective Energy Gaugeâ€)
// ------------------------------------------------------------
// âœ… Computes rolling dopamine score from simulation events
// âœ… Animated radial pulse + numeric indicator
// âœ… Works anywhere (Dashboard / LiveFeed / Navbar)
// ============================================================

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function DopaminePulseMeter({ size = 140 }) {
  const { logs } = useCoreSync();
  const [score, setScore] = useState(50);

  // ðŸ§  Compute rolling mood score
  useEffect(() => {
    if (logs.length === 0) return;

    // Assign mood weights based on event type
    const weights = {
      "user.created": 2,
      "user.join": 4,
      "post.created": 6,
      "post.voted": 3,
      "user.rep": 5,
    };

    const recent = logs.slice(-30); // last ~30 events
    const total = recent.reduce((acc, ev) => acc + (weights[ev.type] || 1), 0);
    const normalized = Math.min(100, Math.max(0, total / recent.length / 6 * 100));
    setScore(normalized || 50);
  }, [logs]);

  // ðŸŽ¨ Color + size logic
  const ringColor =
    score > 75 ? "rgba(147,51,234,0.9)" : score > 50 ? "rgba(16,185,129,0.9)" : "rgba(239,68,68,0.8)";
  const glow = {
    boxShadow: `0 0 ${score / 3}px ${score / 6}px ${ringColor}`,
  };

  return (
    <div className="flex flex-col items-center text-center select-none">
      <motion.div
        className="relative flex items-center justify-center rounded-full border-4 border-fuchsia-500/20 bg-gray-900"
        style={{ width: size, height: size, ...glow }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            `0 0 ${score / 3}px ${score / 6}px ${ringColor}`,
            `0 0 ${score / 2.5}px ${score / 5}px ${ringColor}`,
            `0 0 ${score / 3}px ${score / 6}px ${ringColor}`,
          ],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <motion.span
          key={score}
          className="text-3xl font-bold"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          style={{ color: ringColor }}
        >
          {Math.round(score)}
        </motion.span>
      </motion.div>
      <div className="mt-2 text-xs text-gray-400 uppercase tracking-wider">
        Dopamine Index
      </div>
    </div>
  );
}

// ============================================================
// 💎 Core4.AI – DopamineOrb.jsx (MVP-28.2 Biofeedback Edition)
// ------------------------------------------------------------
// A floating orb that glows, expands, and pulses based on
// the collective dopamine energy from /dopamine/heatmap.
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DopamineOrb() {
  const [dopamine, setDopamine] = useState(50);
  const [mood, setMood] = useState("neutral");

  // 🧠 Fetch dopamine + mood every few seconds
  async function fetchDopamine() {
    try {
      const res = await fetch("http://127.0.0.1:8000/dopamine/heatmap");
      if (!res.ok) throw new Error("Fetch error");
      const data = await res.json();
      setDopamine(data.average_dopamine ?? 50);
    } catch {
      setDopamine(50);
    }
  }

  async function fetchMood() {
    try {
      const res = await fetch("http://127.0.0.1:8000/market/mood");
      if (!res.ok) throw new Error("Fetch error");
      const data = await res.json();
      setMood(data.mood?.toLowerCase() || "neutral");
    } catch {
      setMood("neutral");
    }
  }

  useEffect(() => {
    fetchDopamine();
    fetchMood();
    const interval = setInterval(() => {
      fetchDopamine();
      fetchMood();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 💡 Determine color + size from dopamine & mood
  const baseSize = 28 + dopamine / 4;
  const glowStrength = dopamine / 100;
  const orbColor =
    mood === "bullish"
      ? `rgba(52, 211, 153, ${glowStrength})`
      : mood === "bearish"
      ? `rgba(248, 113, 113, ${glowStrength})`
      : `rgba(250, 204, 21, ${glowStrength})`;

  const glowShadow = `0 0 ${10 + dopamine / 5}px ${orbColor}`;

  return (
    <motion.div
      className="fixed top-4 right-5 z-50 pointer-events-none"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.9, 1, 0.9],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        borderRadius: "50%",
        background: orbColor,
        boxShadow: glowShadow,
        filter: "blur(1px)",
      }}
    ></motion.div>
  );
}

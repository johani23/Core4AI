import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalPulseTopBar() {
  const [avg, setAvg] = useState(50);
  const [status, setStatus] = useState("Calm");
  const [mood, setMood] = useState("neutral");

  // ðŸ” Fetch global dopamine baseline
  useEffect(() => {
    async function fetchAvg() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dopamine/heatmap");
        const json = await res.json();
        const avg = json.global_avg || 50;
        setAvg(avg);
        setStatus(
          avg > 75 ? "ðŸ”¥ Peak Energy"
          : avg > 60 ? "ðŸŒ¤ Rising"
          : avg > 45 ? "ðŸŒ« Calm"
          : "ðŸŒ§ Low"
        );
        // also broadcast to all tabs
        const newMood = { mood, avg, status };
        window.dispatchEvent(new CustomEvent("globalMoodUpdate", { detail: newMood }));
      } catch (err) {
        console.warn("âš ï¸ Pulse fetch failed:", err.message);
      }
    }
    fetchAvg();
    const interval = setInterval(fetchAvg, 5000);
    return () => clearInterval(interval);
  }, [mood]);

  // ðŸŽ¯ Listen to Market updates
  useEffect(() => {
    const handler = (e) => {
      console.log("ðŸŽ¯ Received marketMoodUpdate:", e.detail);
      setMood(e.detail.mood);
      window.dispatchEvent(
        new CustomEvent("globalMoodUpdate", { detail: e.detail })
      );
    };
    window.addEventListener("marketMoodUpdate", handler);
    return () => window.removeEventListener("marketMoodUpdate", handler);
  }, []);

  // ðŸŽ¨ Color & emoji mapping
  const color =
    mood === "bullish"
      ? "from-green-400 to-emerald-600"
      : mood === "bearish"
      ? "from-red-500 to-pink-700"
      : avg > 75
      ? "from-yellow-400 to-red-500"
      : avg > 60
      ? "from-sky-400 to-indigo-600"
      : avg > 45
      ? "from-purple-600 to-pink-700"
      : "from-gray-600 to-gray-800";

  const emoji =
    mood === "bullish"
      ? "ðŸ˜Ž"
      : mood === "bearish"
      ? "ðŸ˜¨"
      : avg > 75
      ? "ðŸ”¥"
      : avg > 60
      ? "ðŸŒ¤"
      : avg > 45
      ? "ðŸŒ«"
      : "ðŸŒ§";

  return (
    <div className="w-full sticky top-0 left-0 z-50">
      <motion.div
        className={`h-[3px] bg-gradient-to-r ${color}`}
        animate={{ width: ["100%", "90%", "100%"], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="text-center text-[11px] py-1 bg-black/60 backdrop-blur-sm text-gray-300 tracking-wide">
        {emoji} {status} â€¢ Global Dopamine Avg:&nbsp;
        <span className="text-yellow-400 font-semibold">{avg.toFixed(1)}</span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalPulseTopBar() {
  const [avg, setAvg] = useState(50);
  const [status, setStatus] = useState("Stable");

  useEffect(() => {
    async function fetchAvg() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dopamine/heatmap");
        const json = await res.json();
        const avg = json.global_avg || 50;
        setAvg(avg);

        setStatus(
          avg > 75
            ? "🔥 Peak Energy"
            : avg > 60
            ? "🌤 Rising"
            : avg > 45
            ? "🌫 Calm"
            : "🌧 Low"
        );
      } catch (err) {
        console.warn("⚠️ Pulse fetch failed:", err.message);
      }
    }

    fetchAvg();
    const interval = setInterval(fetchAvg, 5000);
    return () => clearInterval(interval);
  }, []);

  // Color and intensity
  const gradient =
    avg > 75
      ? "from-yellow-400 via-orange-500 to-red-500"
      : avg > 60
      ? "from-sky-400 via-blue-600 to-indigo-600"
      : avg > 45
      ? "from-purple-600 via-fuchsia-700 to-pink-700"
      : "from-gray-700 via-gray-600 to-gray-800";

  return (
    <motion.div
      className={`fixed top-[56px] left-0 w-full h-1.5 bg-gradient-to-r ${gradient} shadow-lg z-50`}
      animate={{ opacity: [0.8, 1, 0.8], scaleX: [1, 0.95, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <div className="absolute right-3 -top-6 text-xs text-gray-300 font-medium tracking-wide select-none">
        {status} • {avg.toFixed(1)}
      </div>
    </motion.div>
  );
}

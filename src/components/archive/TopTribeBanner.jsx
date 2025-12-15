import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopTribeBanner({ tribes = {} }) {
  const [top, setTop] = useState(null);
  const [prevName, setPrevName] = useState(null);
  const [isCrowning, setIsCrowning] = useState(false);

  useEffect(() => {
    // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Connect to Synaptic WebSocket
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.event === "tribe_pulse" || msg.event === "pulse") {
          const heatmap = msg.heatmap || {};
          const sorted = Object.entries(heatmap)
            .map(([name, val]) => ({ name, mood_index: val * 100 }))
            .sort((a, b) => b.mood_index - a.mood_index);

          if (sorted.length > 0) {
            const newTop = sorted[0];
            // ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ Crown transition if top tribe changes
            if (top && newTop.name !== top.name) {
              setPrevName(top.name);
              setIsCrowning(true);
              setTimeout(() => setIsCrowning(false), 2000);
            }
            setTop(newTop);
          }
        }
      } catch (err) {
        console.error("WS parse error in TopTribeBanner:", err);
      }
    };

    ws.onopen = () => console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€ TopTribeBanner WS connected");
    ws.onclose = () => console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â TopTribeBanner WS closed");
    ws.onerror = (e) => console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ WS Error:", e);

    return () => ws.close();
  }, []);

  if (!top)
    return (
      <div className="w-full text-center text-gray-500 italic py-3 animate-pulse">
        Waiting for live dopamine feed...
      </div>
    );

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‹â€  Mood-based color
  const moodColor =
    top.mood_index >= 70
      ? "from-emerald-400 via-green-500 to-lime-400"
      : top.mood_index >= 50
      ? "from-indigo-400 via-blue-500 to-cyan-400"
      : "from-rose-500 via-red-600 to-orange-400";

  return (
    <div className="relative mb-8 flex justify-center">
      {/* ÃƒÂ¢Ã…â€œÃ‚Â¨ Glow background */}
      <motion.div
        key={top.name}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 bg-gradient-to-r ${moodColor} blur-2xl opacity-30 animate-pulse`}
      ></motion.div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ Crown animation layer */}
      <AnimatePresence>
        {isCrowning && (
          <motion.div
            key="crown"
            initial={{ opacity: 0, y: -40, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1.1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: 1, duration: 1.5 }}
              className="text-5xl drop-shadow-[0_0_12px_gold]"
            >
              ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â« Content card */}
      <motion.div
        key={top.name}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 inline-block px-6 py-4 bg-black/60 backdrop-blur-lg border border-yellow-400/30 rounded-2xl shadow-xl text-center"
      >
        <p className="text-xs uppercase text-yellow-300/80 tracking-widest mb-1">
          Leading Tribe
        </p>
        <div className="flex items-center justify-center gap-2">
          <motion.h2
            key={top.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent"
          >
            {top.name}
          </motion.h2>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-yellow-400 text-lg"
          >
            ÃƒÂ¢Ã‚Â­Ã‚Â
          </motion.span>
        </div>
        <p className="text-sm text-yellow-200 mt-1">
          Mood Index: {top.mood_index.toFixed(1)}
        </p>
      </motion.div>

      {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â Transition text for previous tribe */}
      <AnimatePresence>
        {isCrowning && prevName && (
          <motion.div
            key="handover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-[-1.5rem] text-sm text-gray-400 italic"
          >
            {prevName} gracefully passed the crown ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


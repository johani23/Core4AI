import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopTribeBanner from "@components/TopTribeBanner";

export default function TribeBoard() {
  const [tribes, setTribes] = useState({
    Thinkers: 55,
    Humorists: 55,
    EventGoers: 55,
    Fashionists: 55,
  });

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Connect to WebSocket /ws/synaptic
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.event === "tribe_pulse" || msg.event === "pulse") {
          if (msg.heatmap) {
            const updated = {};
            for (const [k, v] of Object.entries(msg.heatmap)) {
              updated[k] = (v * 100).toFixed(1);
            }
            setTribes(updated);
          }
        }
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    ws.onopen = () => console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€ TribeBoard WebSocket connected");
    ws.onclose = () => console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â TribeBoard WebSocket closed");
    ws.onerror = (e) => console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ TribeBoard WS Error", e);

    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Helpers
  // ------------------------------------------------------------
  const getMoodGradient = (val) => {
    const v = parseFloat(val);
    if (v >= 70) return "from-green-500/40 to-emerald-700/40";
    if (v >= 50) return "from-blue-500/40 to-indigo-700/40";
    return "from-rose-500/40 to-red-700/40";
  };

  const getBarColor = (val) => {
    const v = parseFloat(val);
    if (v >= 70) return "bg-green-400";
    if (v >= 50) return "bg-blue-400";
    return "bg-red-400";
  };

  const tribeEntries = Object.entries(tribes);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â± Render
  // ------------------------------------------------------------
  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Tribe Mood Board ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Live Dopamine Pulse
      </motion.h2>

      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¦ Top Tribe Banner */}
      <TopTribeBanner tribes={tribes} />

      <AnimatePresence mode="sync">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {tribeEntries.length > 0 ? (
            tribeEntries.map(([name, mood]) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${getMoodGradient(
                  mood
                )} border border-gray-800/40 shadow-lg hover:shadow-purple-500/20 backdrop-blur-lg transform hover:-translate-y-1 transition-all duration-300`}
              >
                <h3 className="text-xl font-semibold mb-2">{name}</h3>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mood}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full ${getBarColor(mood)}`}
                  ></motion.div>
                </div>

                <p className="text-lg font-medium text-yellow-300">
                  {mood} / 100
                </p>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-center col-span-full"
            >
              Waiting for live tribe updates...
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


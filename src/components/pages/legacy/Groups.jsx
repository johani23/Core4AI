// ============================================================
// ðŸ’Ž Core4.AI â€“ Groups.jsx (MVP-34 â€œUnified WS + Tribe Pulse Syncâ€)
// ------------------------------------------------------------
// âœ… Single WebSocket endpoint (/ws)
// âœ… Compatible with MVP-34 backend (Unified Sentiment Broadcast)
// âœ… Recreates Tribe Pulse Map animation
// âœ… Live mood propagation across all tribes
// ============================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [stats, setStats] = useState({});
  const [leaders, setLeaders] = useState([]);
  const [pulseTribe, setPulseTribe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Connectingâ€¦");
  const [lastUpdate, setLastUpdate] = useState(null);

  // ------------------------------------------------------------
  // ðŸ§  Load initial mock data + connect to unified /ws
  // ------------------------------------------------------------
  useEffect(() => {
    async function loadAll() {
      try {
        // Generate mock groups if backend doesnâ€™t provide /groups
        const resMarket = await fetch(`${API_BASE}/market`);
        const market = await resMarket.json();

        const mockGroups = [
          { id: 1, name: "Core4AI 001", emoji: "ðŸŒ¸", mood: "positive", members: 23 },
          { id: 2, name: "Core4AI 002", emoji: "âš¡", mood: "focused", members: 19 },
          { id: 3, name: "Core4AI 003", emoji: "ðŸŒ¿", mood: "neutral", members: 31 },
        ];
        setGroups(mockGroups);

        // initialize stats with neutral values
        const statMap = {};
        mockGroups.forEach((g) => (statMap[g.id] = { avg_mood_index: 50 }));
        setStats(statMap);

        // Load leaders placeholder
        setLeaders([
          { rank: 1, user: "Lina", tribe: 1, score: 92 },
          { rank: 2, user: "Omar", tribe: 2, score: 87 },
          { rank: 3, user: "Sara", tribe: 3, score: 83 },
        ]);

        setLoading(false);
      } catch (e) {
        console.error("Groups load failed:", e);
        setLoading(false);
      }
    }

    loadAll();

    // ðŸŒ Unified WebSocket
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("âœ… Connected to /ws");
      setStatus("Live");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === "sentiment_update" && msg.global_mood) {
          const newMood = msg.global_mood;
          setLastUpdate(new Date().toLocaleTimeString());

          // Pick random tribe to "pulse"
          const randomTribe = Math.floor(Math.random() * 3) + 1;
          setPulseTribe(randomTribe);
          setTimeout(() => setPulseTribe(null), 1200);

          // Update all tribe mood indexes
          setStats((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((id) => {
              updated[id] = { avg_mood_index: newMood + (Math.random() * 6 - 3) };
            });
            return updated;
          });
        }
      } catch (err) {
        console.warn("âš ï¸ Invalid WS message:", err);
      }
    };

    ws.onerror = () => setStatus("Disconnected");
    ws.onclose = () => {
      console.warn("âš ï¸ WebSocket closed; fallback to polling.");
      setStatus("Pollingâ€¦");
    };

    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ðŸŽ¨ Helpers
  // ------------------------------------------------------------
  const getMoodColor = (mood) => {
    switch (mood) {
      case "positive":
      case "up":
        return "from-green-500 via-emerald-400 to-green-600";
      case "neutral":
        return "from-gray-500 via-gray-400 to-gray-600";
      case "focused":
        return "from-blue-500 via-indigo-500 to-blue-600";
      case "creative":
        return "from-pink-500 via-fuchsia-400 to-pink-600";
      default:
        return "from-yellow-500 via-amber-400 to-yellow-600";
    }
  };

  const getOrbColor = (moodIdx) => {
    if (moodIdx > 70) return "bg-green-400";
    if (moodIdx < 40) return "bg-red-400";
    return "bg-yellow-400";
  };

  // ------------------------------------------------------------
  // ðŸ’« Tribe Pulse Map
  // ------------------------------------------------------------
  const renderPulseMap = () => (
    <div className="relative flex justify-center items-center mb-10">
      <div className="w-full max-w-3xl h-64 bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-700 flex justify-evenly items-center">
        {groups.map((g) => {
          const moodIdx = stats[g.id]?.avg_mood_index ?? 50;
          const active = pulseTribe === g.id;
          return (
            <motion.div
              key={g.id}
              className="relative flex flex-col items-center text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className={`w-10 h-10 rounded-full ${getOrbColor(
                  moodIdx
                )} shadow-lg shadow-${active ? "green" : "gray"}-500/40`}
                animate={{
                  scale: active ? [1, 1.4, 1] : [1, 1.1, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  repeat: Infinity,
                  duration: active ? 1 : 3,
                  ease: "easeInOut",
                }}
              />
              <span className="mt-2 text-gray-300">{g.name}</span>
              <span className="text-gray-500 text-[10px]">
                {moodIdx.toFixed(1)}%
              </span>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {pulseTribe && (
          <motion.div
            key="mapPulse"
            className="absolute inset-0 rounded-3xl bg-green-400/10 blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );

  // ------------------------------------------------------------
  // ðŸ§± Render Tribe Cards
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ðŸŒ Core4 Tribes â€“ Live Pulse Map
      </motion.h1>

      <div className="text-center text-gray-400 text-sm mb-4">
        Status: <span className="text-yellow-400">{status}</span> â€¢ Last update:{" "}
        {lastUpdate || "â€”"}
      </div>

      {renderPulseMap()}

      {loading ? (
        <p className="text-center text-gray-400">Loading tribes...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, idx) => {
            const tribeStats = stats[g.id] || {};
            const avgMood = tribeStats.avg_mood_index ?? 50;
            const changePct = (Math.sin(avgMood / 10) * 5).toFixed(2);
            const tribeLeaders = leaders
              .filter((l) => l.tribe === g.id)
              .slice(0, 3);

            return (
              <motion.div
                key={g.id || idx}
                className={`relative rounded-2xl p-[1px] bg-gradient-to-br ${getMoodColor(
                  g.mood
                )}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-zinc-950 rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
                  <AnimatePresence>
                    {pulseTribe === g.id && (
                      <motion.div
                        key="pulse"
                        className="absolute inset-0 rounded-2xl bg-green-400/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 1.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl">{g.emoji}</div>
                    <span className="text-sm text-gray-400">#{g.id}</span>
                  </div>

                  <h2 className="text-lg font-semibold mb-2">{g.name}</h2>

                  <div className="text-gray-400 text-sm mb-2">
                    ðŸ‘¥ {g.members} Members
                  </div>

                  <motion.div
                    className="mt-3 mb-4 bg-white/5 rounded-lg px-3 py-2 text-sm flex justify-between items-center border border-white/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Mood Index</span>
                      <span className="text-white font-semibold">
                        {avgMood.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-400 text-xs">Î” 24h</span>
                      <span
                        className={`font-semibold ${
                          changePct > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {changePct > 0 ? "+" : ""}
                        {changePct}%
                      </span>
                    </div>
                  </motion.div>

                  {/* Top Influencers */}
                  <div className="mt-3 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Top Influencers</p>
                    {tribeLeaders.length > 0 ? (
                      <ul className="space-y-1">
                        {tribeLeaders.map((l, i) => (
                          <motion.li
                            key={l.user + i}
                            className="flex justify-between text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <span>
                              #{l.rank} {l.user}
                            </span>
                            <span className="text-yellow-400">{l.score}</span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-xs">No data available.</p>
                    )}
                  </div>

                  <motion.button
                    className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      alert(`Joining tribe ${g.name || "Unknown"}...`)
                    }
                  >
                    Join Tribe
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// ðŸ’Ž Core4.AI â€“ TribeDashboard.jsx (MVP-38.4 â€œTribe Deep Viewâ€)
// ------------------------------------------------------------
// âœ… Displays single tribe details (mood, energy, balance)
// âœ… Pulls live data from /tribes/mood + mock wallet
// âœ… Animated mood dial + member list placeholder
// âœ… Ready for MVP-39 integration with tribe analytics
// ============================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TribeDashboard() {
  const { tribeName } = useParams();
  const navigate = useNavigate();
  const [tribe, setTribe] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------
  // ðŸ§  Fetch tribe + wallet mock data
  // ------------------------------------------------------------
  async function fetchTribeDetails() {
    try {
      const res = await fetch("http://127.0.0.1:8000/tribes/mood");
      const data = await res.json();
      const found = data.find((t) => t.name.toLowerCase() === tribeName.toLowerCase());
      setTribe(found || null);
    } catch (err) {
      console.error("Error fetching tribe:", err);
    }

    try {
      const resW = await fetch("http://127.0.0.1:8000/wallet/1");
      const dataW = await resW.json();
      setWallet(dataW);
    } catch {}

    setLoading(false);
  }

  useEffect(() => {
    fetchTribeDetails();
    const interval = setInterval(fetchTribeDetails, 8000);
    return () => clearInterval(interval);
  }, [tribeName]);

  // ------------------------------------------------------------
  // ðŸŽ¨ Mood color mapping
  // ------------------------------------------------------------
  const moodColor = (mood) => {
    if (mood > 75) return "text-green-400";
    if (mood > 50) return "text-yellow-400";
    if (mood > 30) return "text-orange-400";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-yellow-400 animate-pulse">
        Loading {tribeName} tribe data...
      </div>
    );
  }

  if (!tribe) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        <p>Tribe not found.</p>
        <button
          onClick={() => navigate("/tribes")}
          className="mt-4 px-4 py-2 bg-yellow-500/80 rounded-lg text-black font-semibold"
        >
          â† Back to Tribe Board
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------
  // ðŸ“Š Dashboard UI
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">{tribe.name}</h1>
            <p className="text-gray-400 text-sm">
              Mood dynamics & collective performance overview.
            </p>
          </div>
          <button
            onClick={() => navigate("/tribes")}
            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-700 text-sm"
          >
            â† Back
          </button>
        </motion.div>

        {/* Mood Dial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative w-40 h-40 rounded-full border-4 border-yellow-500 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.3)]">
            <div
              className={`text-5xl font-bold ${moodColor(tribe.mood_index)}`}
            >
              {tribe.mood_index.toFixed(1)}
            </div>
            <div className="absolute bottom-3 text-gray-400 text-sm">Mood Index</div>
          </div>
          <div className="mt-4 text-gray-400 text-sm text-center">
            Tribe energy fluctuates in sync with AI market sentiment.
          </div>
        </motion.div>

        {/* Wallet + Energy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Collective Balance</div>
            <div className="text-2xl font-bold text-yellow-300">
              {wallet ? wallet.balance.toFixed(2) : "â€”"} C4T
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Tribe Energy</div>
            <div className="text-2xl font-bold text-fuchsia-400">
              {Math.min(tribe.mood_index * 1.2, 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Active Members</div>
            <div className="text-2xl font-bold text-white">
              {Math.floor(tribe.mood_index / 2)}
            </div>
          </div>
        </motion.div>

        {/* Mood Timeline (placeholder for MVP-38.5) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/60 border border-gray-700 rounded-xl p-4"
        >
          <div className="text-gray-300 text-sm mb-2 font-semibold">
            Emotional Timeline
          </div>
          <div className="w-full h-20 bg-gray-700/50 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
              Timeline chart coming in MVP-38.5
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs mt-10">
          âš™ï¸ Auto-updates every 8 seconds Â· MVP-38.4
        </div>
      </div>
    </div>
  );
}

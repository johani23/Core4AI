// 💎 TribeMarket – simplified Tailwind + Motion
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function TribeMarket() {
  const [tribes, setTribes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTribes() {
    try {
      const res = await fetch(`${API_BASE}/market/tribes`);
      const data = await res.json();
      setTribes(data);
    } catch (err) {
      console.error("Error fetching tribes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTribes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-400 animate-pulse">Loading Tribe Market...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🌐 Tribe Market Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tribes.map((tribe, index) => (
          <motion.div
            key={tribe.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-5 hover:shadow-cyan-500/30 transition"
          >
            <div className="flex justify-between mb-3">
              <h3 className="text-xl font-bold">{tribe.badge} {tribe.name}</h3>
              <span className="text-sm text-gray-400">
                👥 {tribe.total_members}
              </span>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>💰 Pool: <span className="text-cyan-400 font-semibold">{tribe.pool_balance.toFixed(2)} C4T</span></p>
              <p>📈 Value: <span className="text-green-400 font-semibold">{tribe.market_value.toFixed(2)}</span></p>
            </div>
            <button
              onClick={() => (window.location.href = `/tribe/${tribe.name.toLowerCase()}`)}
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold"
            >
              View Tribe Dashboard
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

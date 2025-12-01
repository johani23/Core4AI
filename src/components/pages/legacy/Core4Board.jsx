// ============================================================
// ðŸ’Ž Core4.AI â€“ MVP 30.0 "Core4 Token Market Board"
// ------------------------------------------------------------
// Displays dynamic tokenized Core4 groups with price, trend,
// dopamine, and engagement metrics. Live refresh every 15s.
// ============================================================

import React, { useEffect, useState } from "react";
import { getCore4Tokens, getMarketMood } from "@services/api";
import { motion } from "framer-motion";

export default function Core4Board() {
  const [tokens, setTokens] = useState([]);
  const [mood, setMood] = useState({ mood: "Neutral", emoji: "ðŸŒ¤", emi: 50 });
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    async function fetchData() {
      try {
        const tokenData = await getCore4Tokens();
        const moodData = await getMarketMood();
        setTokens(tokenData);
        setMood(moodData);
        setLoading(false);
      } catch (err) {
        console.error("âš ï¸ Error fetching Core4 tokens:", err);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15s auto-refresh
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        ðŸ”„ Loading Core4 Market Board...
      </div>
    );

  // Trend color logic
  const getTrendColor = (trend) => {
    if (trend === "UP") return "text-green-400";
    if (trend === "DOWN") return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* ðŸ§  Global Market Mood */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">ðŸ’¹ Core4 Token Market Board</h1>
        <p className="text-lg text-gray-400">
          Global Market Mood: <span className="text-purple-300">{mood.emoji} {mood.mood}</span> | EMI:{" "}
          <span className="text-blue-400">{mood.emi}</span>
        </p>
      </div>

      {/* ðŸ”¹ Token Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tokens.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 border border-gray-700"
          >
            <h2 className="text-xl font-bold text-yellow-300 mb-2">{t.name}</h2>
            <div className="text-gray-300 text-sm space-y-2">
              <div>
                ðŸ’° <span className="font-semibold text-white">{t.price.toFixed(2)}</span> C4T{" "}
                <span className={`${getTrendColor(t.trend)} ml-1`}>{t.change}</span>
              </div>
              <div>
                âš¡ Engagement:{" "}
                <span className="text-green-300">{(t.engagement * 100).toFixed(1)}%</span>
              </div>
              <div>
                ðŸ§  Dopamine:{" "}
                <span className="text-blue-300">{(t.dopamine * 100).toFixed(1)}%</span>
              </div>
              <div>
                ðŸ“ˆ Trend: <span className={getTrendColor(t.trend)}>{t.trend}</span>
              </div>
            </div>

            {/* ðŸª™ Mock Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 rounded-lg py-2 text-sm font-semibold">
                Buy
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2 text-sm font-semibold">
                Sell
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

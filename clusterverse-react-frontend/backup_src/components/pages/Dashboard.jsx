import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getWallet, getMarketMood } from "@services/tokenAPI";

export default function Dashboard() {
  const userId = 1; // temporary for MVP testing
  const [wallet, setWallet] = useState({ balance: 0, symbol: "C4T" });
  const [mood, setMood] = useState({ mood: "neutral", score: 50 });
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Load wallet + mood on mount
  // -------------------------------
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const w = await getWallet(userId);
      const m = await getMarketMood();
      setWallet(w);
      setMood(m);
      setLoading(false);
    }
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  // -------------------------------
  // Mood color + emoji
  // -------------------------------
  const getMoodProps = (moodState) => {
    switch (moodState) {
      case "bullish":
        return { color: "text-green-400", emoji: "🚀", label: "Rising Energy" };
      case "bearish":
        return { color: "text-red-400", emoji: "🩸", label: "Cooling Down" };
      default:
        return { color: "text-yellow-400", emoji: "⚖️", label: "Stable Flow" };
    }
  };

  const { color, emoji, label } = getMoodProps(mood.mood);

  // -------------------------------
  // Animated pulse background
  // -------------------------------
  const pulseColor =
    mood.mood === "bullish"
      ? "bg-green-500/10"
      : mood.mood === "bearish"
      ? "bg-red-500/10"
      : "bg-yellow-500/10";

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 px-6 overflow-hidden">
      {/* Animated glow background */}
      <motion.div
        className={`absolute inset-0 ${pulseColor} blur-3xl`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold tracking-tight z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Core4.AI Dashboard
      </motion.h1>

      {loading ? (
        <p className="text-gray-400 mt-12">Loading market data...</p>
      ) : (
        <motion.div
          className="mt-12 z-10 flex flex-col items-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Wallet Info */}
          <div className="bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10 w-80 text-center">
            <p className="text-sm text-gray-400 mb-1">Your Balance</p>
            <motion.p
              key={wallet.balance}
              className="text-3xl font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8 }}
            >
              💰 {wallet.balance.toFixed(2)} {wallet.symbol}
            </motion.p>
          </div>

          {/* Market Mood */}
          <div className="bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10 w-80 text-center">
            <p className="text-sm text-gray-400 mb-1">Market Sentiment</p>
            <motion.p
              key={mood.mood}
              className={`text-3xl font-semibold ${color}`}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.8 }}
            >
              {emoji} {mood.mood.toUpperCase()}
            </motion.p>
            <p className="text-gray-400 mt-1 text-sm">
              {label} • Score: {mood.score}
            </p>
          </div>

          {/* Tip message (no dopamine wording) */}
          <div className="text-gray-400 text-xs text-center max-w-sm leading-relaxed">
            The market dynamically reflects community energy.  
            Keep sharing meaningful content — your actions shape the curve.
          </div>
        </motion.div>
      )}
    </div>
  );
}

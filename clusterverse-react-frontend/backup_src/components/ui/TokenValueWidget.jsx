import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserTokens, getCreatorLeaderboard, getMarketSummary } from "@services/tokenAPI";

/**
 * Core4.AI – MVP 18
 * Token Value Widget
 * -------------------------------------------------------------
 * Displays live C4T price, % change and user token balance.
 * Designed for use in Navbar or Dashboard header.
 */

export default function TokenValueWidget({ userId = 1 }) {
  const [price, setPrice] = useState(3.0);
  const [change, setChange] = useState(0);
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("Stable 🌕");

  // Fetch live data
  async function refreshData() {
    try {
      const [summary, creators, tokens] = await Promise.all([
        getMarketSummary(),
        getCreatorLeaderboard(),
        getUserTokens(userId),
      ]);

      // derive market price from creators (average of top 5)
      if (creators.length > 0) {
        const avgPrice =
          creators.slice(0, 5).reduce((sum, c) => sum + (c.token_value || 0), 0) /
          Math.min(creators.length, 5);
        setPrice(avgPrice.toFixed(2));

        const avgChange =
          creators.slice(0, 5).reduce((sum, c) => sum + (c.change || 0), 0) /
          Math.min(creators.length, 5);
        setChange(avgChange.toFixed(2));
      }

      if (summary.ai_forecast) {
        setStatus(summary.ai_forecast);
      }

      if (tokens?.remaining !== undefined) {
        setBalance(tokens.remaining);
      }
    } catch (err) {
      console.error("⚠️ Error loading token widget data:", err);
    }
  }

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const changeColor =
    change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-yellow-400";

  return (
    <motion.div
      className="flex items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-2 shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* 💎 Token price */}
      <div className="flex flex-col mr-4">
        <span className="text-xs text-gray-400">C4T Token</span>
        <span className="text-lg font-bold text-yellow-400">${price}</span>
      </div>

      {/* 📈 Change */}
      <div className="flex flex-col mr-4">
        <span className="text-xs text-gray-400">Change</span>
        <span className={`text-lg font-semibold ${changeColor}`}>
          {change >= 0 ? "▲" : "▼"} {Math.abs(change)} %
        </span>
      </div>

      {/* 🪙 Remaining tokens */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">My Tokens</span>
        <span className="text-lg font-semibold text-blue-400">{balance}</span>
      </div>

      {/* Market status */}
      <div className="ml-4 text-xs text-gray-500 hidden sm:block">{status}</div>
    </motion.div>
  );
}

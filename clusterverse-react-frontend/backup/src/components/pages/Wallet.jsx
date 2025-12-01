// ============================================================
// 💎 Core4.AI – Wallet.jsx (Group Edition – Style A)
// ------------------------------------------------------------
// Shows personal balance + group pool + engagement energy
// Elegantly styled with dark background + gold/emerald glow
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getWallet, getGroups } from "@services/api";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const w = await getWallet(1); // 🔹 real wallet endpoint
        const groups = await getGroups(); // 🔹 group-level data
        // for demo: assume user belongs to group 1
        const myGroup = groups?.[0] || null;
        setWallet(w);
        setGroup(myGroup);
      } catch (err) {
        console.error("⚠️ Wallet load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 animate-pulse">
        Loading wallet data…
      </div>
    );
  }

  // 💰 Extracted values
  const { username, balance, symbol, dopamine } = wallet;
  const pool = group?.pool_balance ?? 0;
  const share = pool / 4; // each member 25%
  const engagement = group?.engagement ?? 0;

  // 🎚️ Progress bars
  const dopPercent = Math.min(Math.max((dopamine / 100) * 100, 0), 100);
  const engPercent = Math.min(Math.max((engagement / 100) * 100, 0), 100);

  const dopColor =
    dopamine > 70
      ? "from-emerald-400 to-lime-400"
      : dopamine > 40
      ? "from-yellow-400 to-amber-400"
      : "from-rose-500 to-red-400";

  const engColor =
    engagement > 75
      ? "from-emerald-500 to-green-400"
      : engagement > 50
      ? "from-yellow-500 to-amber-400"
      : "from-rose-500 to-red-400";

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-yellow-400 mb-6"
      >
        💰 My Core4 Wallet
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md shadow-lg"
      >
        {/* User Info */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Member</span>
          <span className="text-white font-semibold">{username}</span>
        </div>

        {/* Personal Balance */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Personal Balance</span>
          <span className="text-emerald-400 text-2xl font-bold">
            {balance.toFixed(2)} {symbol}
          </span>
        </div>

        {/* Group Pool */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Group Pool</span>
          <span className="text-yellow-400 font-semibold">
            {pool.toFixed(2)} C4T
          </span>
        </div>

        {/* Share */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">My Share (¼)</span>
          <span className="text-white font-semibold">
            {share.toFixed(2)} C4T
          </span>
        </div>

        {/* Dopamine Energy Bar */}
        <div className="mt-4">
          <p className="text-sm text-zinc-400 mb-1">Dopamine Energy</p>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${dopColor}`}
              style={{ width: `${dopPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{dopamine} / 100</p>
        </div>

        {/* Group Engagement Bar */}
        <div className="mt-5">
          <p className="text-sm text-zinc-400 mb-1">
            Group Engagement Level
          </p>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${engColor}`}
              style={{ width: `${engPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{engagement}% synergy</p>
        </div>

        {/* Info */}
        <div className="text-sm text-zinc-400 mt-6 mb-4">
          Your personal balance reflects your earned tokens.  
          The group pool represents shared creative capital of your 4-member Core4.
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/groups")}
            className="py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:from-emerald-400 hover:to-green-300 transition-all"
          >
            👥 My Group
          </button>
          <button
            onClick={() => navigate("/market/pulse")}
            className="py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-semibold hover:from-yellow-400 hover:to-amber-300 transition-all"
          >
            💹 Market Pulse
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// ðŸŽ Core4.AI â€“ Rewards.jsx (MVP-24.8 Final)
// Live Reward Engine â€¢ Dopamine Glow â€¢ Challenge Claimer
// ============================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Rewards() {
  const [tokens, setTokens] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [message, setMessage] = useState("Loading dopamine updates...");
  const [glow, setGlow] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(true);

  const API = "http://127.0.0.1:8000";
  const userId = 1;

  // ------------------------------------------------------------
  // ðŸ§© Fetch all data (wallet, challenges, rewards, dopamine message)
  // ------------------------------------------------------------
  async function refreshAll() {
    try {
      const [wallet, challengeList, rewardList, marketMsg] = await Promise.all([
        fetch(`${API}/user/${userId}/tokens`).then((r) => r.json()),
        fetch(`${API}/challenges`).then((r) => r.json()),
        fetch(`${API}/rewards/history/${userId}`).then((r) => r.json()),
        fetch(`${API}/market/messages`).then((r) => r.json()),
      ]);

      setTokens(wallet.balance || 0);
      setChallenges(Array.isArray(challengeList) ? challengeList : []);
      setRewards(Array.isArray(rewardList.rewards) ? rewardList.rewards : []);
      setMessage(marketMsg.message || "Keep the vibes high âš¡");
    } catch (err) {
      console.error("âŒ Rewards fetch failed:", err);
      setMessage("âš ï¸ Connection lost â€” retrying soon...");
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------------------------
  // ðŸ§  Claim reward from backend + dopamine pulse animation
  // ------------------------------------------------------------
  async function handleClaim(points) {
    if (cooldown) return;
    setCooldown(true);

    try {
      const res = await fetch(`${API}/rewards/claim/${userId}/${points}`, { method: "POST" });
      const data = await res.json();

      setTokens(data.new_balance || tokens + points / 10);
      setGlow(true);
      setRewards((prev) => [
        {
          challenge: data.message || "âœ… Reward claimed",
          amount: data.added_tokens || points / 10,
          type: "token",
          timestamp: new Date().toISOString(),
        },
        ...prev.slice(0, 4),
      ]);
    } catch (err) {
      console.warn("âš ï¸ Reward claim failed:", err);
      // fallback offline simulation
      setTokens((prev) => prev + points / 10);
      setRewards((prev) => [
        { challenge: "Offline Reward", amount: points / 10, type: "token", timestamp: new Date().toISOString() },
        ...prev,
      ]);
    } finally {
      setTimeout(() => setGlow(false), 1500);
      setTimeout(() => setCooldown(false), 2500);
    }
  }

  // ------------------------------------------------------------
  // ðŸ” Periodic refresh
  // ------------------------------------------------------------
  useEffect(() => {
    refreshAll();
    const interval = setInterval(refreshAll, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-yellow-400 animate-pulse">
        Loading Rewards Centerâ€¦
      </div>
    );
  }

  // ------------------------------------------------------------
  // ðŸŽ¨ UI
  // ------------------------------------------------------------
  return (
    <div className="p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold mb-4">ðŸŽ Core4.AI Rewards Center</h1>

      {/* ðŸ’° Wallet / Token Display */}
      <motion.div
        className={`rounded-2xl p-4 border shadow-lg inline-block ${
          glow ? "border-yellow-400 bg-yellow-500/10" : "border-yellow-400 bg-black/60"
        }`}
        animate={glow ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] } : {}}
        transition={{ duration: 1 }}
      >
        <p className="text-yellow-300 text-sm">Your Tokens</p>
        <p className="text-4xl font-bold">{tokens.toFixed(2)} C4T</p>
      </motion.div>

      {/* ðŸ”¥ Active Challenges */}
      <div className="bg-black/40 rounded-xl p-5 border border-gray-700">
        <h2 className="text-lg text-yellow-400 mb-3">ðŸ”¥ Active Challenges</h2>
        {challenges.length === 0 ? (
          <p className="text-gray-500 italic">No active challenges found.</p>
        ) : (
          challenges.map((c) => (
            <motion.div
              key={c.id}
              className="p-3 border-b border-gray-700 flex flex-col md:flex-row items-center justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-left">
                <p className="font-semibold text-white">{c.title}</p>
                <p className="text-sm text-gray-400">{c.description}</p>
                <p className="text-yellow-300 text-sm">+{c.points} pts</p>
              </div>
              <button
                onClick={() => handleClaim(c.points)}
                disabled={cooldown}
                className={`mt-2 md:mt-0 px-4 py-2 rounded-xl font-semibold text-sm ${
                  cooldown
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {cooldown ? "â³ Cooling Down..." : "Claim Reward"}
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* ðŸ† Reward History */}
      <div className="bg-black/40 rounded-xl p-5 border border-gray-700">
        <h2 className="text-lg text-yellow-400 mb-3">ðŸ† Reward History</h2>
        <AnimatePresence>
          {rewards.length === 0 ? (
            <p className="text-gray-500 italic">No rewards yet â€” complete a challenge!</p>
          ) : (
            rewards.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-between text-sm border-b border-gray-800 py-1"
              >
                <span>{r.challenge}</span>
                <span className="text-gray-400">
                  +{r.amount} {r.type === "token" ? "C4T" : "ðŸ§ "}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ðŸ’¬ Motivational Dopamine Message */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-md mt-6"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <p className="text-sm italic">{message}</p>
      </motion.div>
    </div>
  );
}

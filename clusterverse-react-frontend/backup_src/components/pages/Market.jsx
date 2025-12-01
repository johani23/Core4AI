import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getMarketSummary,
  getMarketMood,
  getRecentTrades,
  internalEmotionUpdate,
} from "@services/tokenAPI";
import { triggerRewardEvaluation, getRewardHistory } from "@services/api";
import { useNavigate } from "react-router-dom";

export default function Market() {
  const navigate = useNavigate();
  const [market, setMarket] = useState(null);
  const [mood, setMood] = useState({ mood: "neutral", score: 50 });
  const [trades, setTrades] = useState([]);
  const [lastPrice, setLastPrice] = useState(3.42);
  const [priceChange, setPriceChange] = useState(0);
  const [refreshCountdown, setRefreshCountdown] = useState(8);
  const [lastOrder, setLastOrder] = useState(null);
  const [rewardMsg, setRewardMsg] = useState(null);
  const [rewards, setRewards] = useState([]);

  const fmt = (v) => (typeof v === "number" && !isNaN(v) ? v.toFixed(2) : "—");

  /* ---------------- REFRESH ---------------- */
  async function fetchMarket() {
    try {
      const [summary, sentiment, recent] = await Promise.all([
        getMarketSummary(),
        getMarketMood(),
        getRecentTrades ? getRecentTrades() : Promise.resolve([]),
      ]);
      setMarket(summary || {});
      setMood(sentiment || { mood: "neutral", score: 50 });
      setTrades(Array.isArray(recent) ? recent : []);

      if (summary?.last_trade && summary.last_trade !== lastPrice) {
        setPriceChange(summary.last_trade > lastPrice ? 1 : -1);
        setLastPrice(summary.last_trade);
        setTimeout(() => setPriceChange(0), 1200);
      }
    } catch (e) {
      console.error("⚠️ Market fetch error:", e);
    }
  }

  async function fetchRewardHistory() {
    try {
      const list = await getRewardHistory(1);
      setRewards(Array.isArray(list) ? list.slice(0, 5) : []);
    } catch (e) {
      console.warn("Reward history fetch failed:", e);
    }
  }

  useEffect(() => {
    fetchMarket();
    fetchRewardHistory();
    const refresh = setInterval(fetchMarket, 8000);
    const timer = setInterval(() =>
      setRefreshCountdown((p) => (p > 1 ? p - 1 : 8)), 1000);
    const rewardTimer = setInterval(fetchRewardHistory, 30000);
    return () => {
      clearInterval(refresh);
      clearInterval(timer);
      clearInterval(rewardTimer);
    };
  }, []);

  /* ---------------- SYNC EMOTION / REWARD ---------------- */
  async function syncEmotionAndReward(side) {
    try {
      const content =
        side === "BUY" ? "Optimistic trade placed" : "Bearish sentiment detected";
      await internalEmotionUpdate({ user_id: 1, content });
      const res = await triggerRewardEvaluation(1);
      if (res?.result?.count > 0) {
        setRewardMsg(
          `🎁 ${res.result.count} reward${res.result.count > 1 ? "s" : ""} earned!`
        );
        setTimeout(() => setRewardMsg(null), 5000);
        fetchRewardHistory();
      }
    } catch (err) {
      console.warn("⚠️ Emotion/Reward sync failed:", err);
    }
  }

  /* ---------------- TRADING ---------------- */
  function placeOrder(side) {
    const price = parseFloat(document.getElementById("orderPrice").value);
    const qty = parseInt(document.getElementById("orderQty").value);
    if (!price || !qty || qty <= 0) return alert("Enter valid price and quantity.");

    const newTrade = { price, qty, side, timestamp: Date.now() };
    setTrades((p) => [...p.slice(-19), newTrade]);
    setLastPrice(price);
    setLastOrder(newTrade);

    const newMood =
      side === "BUY"
        ? { mood: "bullish", score: Math.min(mood.score + 2, 100) }
        : { mood: "bearish", score: Math.max(mood.score - 2, 0) };
    setMood(newMood);

    // 🔗 broadcast to GlobalPulseTopBar
    window.dispatchEvent(new CustomEvent("marketMoodUpdate", { detail: newMood }));

    syncEmotionAndReward(side);
  }

  /* ---------------- STYLES ---------------- */
  const bgGlow =
    mood.mood === "bullish"
      ? "from-green-900/40 via-black to-black"
      : mood.mood === "bearish"
      ? "from-red-900/40 via-black to-black"
      : "from-purple-900/30 via-black to-black";

  const emojiMap = { bullish: "😎", bearish: "😨", neutral: "😐" };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgGlow} text-white flex flex-col items-center justify-start py-10 px-4 transition-all duration-700`}
    >
      {/* 🟢 Title */}
      <div className="flex items-center gap-2 mb-4">
        <motion.span
          className="w-3 h-3 bg-green-400 rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <h1 className="text-3xl font-bold">
          Core4.AI <span className="text-yellow-400">Token Market</span>
        </h1>
      </div>

      {/* 💰 Current Price */}
      <motion.div
        animate={{
          scale: priceChange === 1 ? 1.05 : priceChange === -1 ? 0.95 : 1,
          color:
            priceChange === 1
              ? "#4ade80"
              : priceChange === -1
              ? "#f87171"
              : "#facc15",
        }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 px-8 py-6 rounded-2xl text-center shadow-lg border border-gray-800"
      >
        <h3 className="text-gray-400 text-sm mb-2">Current Price</h3>
        <p className="text-4xl font-extrabold flex items-center justify-center gap-2">
          {fmt(lastPrice)}
          <span className="text-yellow-400 text-2xl font-semibold">C4T</span>
          <span className="text-3xl">{emojiMap[mood.mood]}</span>
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {mood.mood.toUpperCase()} • Score: {fmt(mood.score)}
        </p>
      </motion.div>

      {/* 📊 Summary */}
      {market && (
        <div className="bg-[#0B0B11] mt-10 p-6 rounded-2xl shadow-xl max-w-md w-full border border-gray-800">
          <h2 className="text-lg font-semibold mb-3 text-yellow-300">
            Market Summary
          </h2>
          <ul className="space-y-2 text-sm">
            <li>🟢 <b>Highest Bid:</b> {fmt(market.best_buy)} C4T</li>
            <li>🔴 <b>Lowest Ask:</b> {fmt(market.best_sell)} C4T</li>
            <li>🪙 <b>Last Trade:</b> {fmt(market.last_trade)} C4T</li>
            <li>📊 <b>Total Trades:</b> {trades.length}</li>
            <li>
              💬 <b>Community Sentiment:</b>{" "}
              {mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1)}
            </li>
          </ul>
        </div>
      )}

      <button
        onClick={fetchMarket}
        className="mt-8 bg-yellow-400 text-black font-semibold px-6 py-2 rounded-xl hover:bg-yellow-300 transition"
      >
        Refresh Market ({refreshCountdown}s)
      </button>

      <div className="mt-10 w-full max-w-lg">
        <Sparkline data={trades.map((t) => t.price)} />
      </div>

      {/* 🧩 Trading Pad */}
      <div className="mt-14 bg-[#0B0B11] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-yellow-300 mb-4">
          Simulated Trading Pad
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            id="orderPrice"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Price"
            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
          <input
            id="orderQty"
            type="number"
            min="1"
            step="1"
            placeholder="Qty"
            className="w-20 bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => placeOrder("BUY")}
            className="flex-1 mr-1 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg py-2 transition"
          >
            Buy
          </button>
          <button
            onClick={() => placeOrder("SELL")}
            className="flex-1 ml-1 bg-red-500 hover:bg-red-400 text-black font-semibold rounded-lg py-2 transition"
          >
            Sell
          </button>
        </div>

        {lastOrder && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-gray-400 text-center"
          >
            ✅ {lastOrder.side} order for {lastOrder.qty} @{" "}
            {lastOrder.price.toFixed(2)} C4T
          </motion.div>
        )}

        {rewardMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-3 bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full text-center shadow-md"
          >
            {rewardMsg}
          </motion.div>
        )}
      </div>

      <p className="text-gray-500 text-xs mt-6 italic">
        Trading simulation live in MVP-24.2 🚀
      </p>

      <RewardLedger
        rewards={rewards}
        mood={mood}
        onViewAll={() => navigate("/rewards")}
      />
    </div>
  );
}

/* ---------------- Sparkline ---------------- */
function Sparkline({ data = [] }) {
  if (!data || data.length < 2) return null;
  const width = 300, height = 60;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`
    )
    .join(" ");
  return (
    <svg width={width} height={height} className="mx-auto mt-4">
      <polyline fill="none" stroke="#facc15" strokeWidth="2" points={pts} />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="3"
        fill={data[data.length - 1] >= data[data.length - 2] ? "#4ade80" : "#f87171"}
      />
    </svg>
  );
}

/* ---------------- Reward Ledger ---------------- */
function RewardLedger({ rewards = [], mood, onViewAll }) {
  const timeAgo = (iso) => {
    const d = new Date(iso);
    const diff = Math.max(0, Date.now() - d.getTime());
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m} m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} h ago`;
    return `${Math.floor(h / 24)} d ago`;
  };

  const pulseColor =
    mood.mood === "bullish"
      ? "rgba(74,222,128,0.15)"
      : mood.mood === "bearish"
      ? "rgba(248,113,113,0.15)"
      : "rgba(168,85,247,0.1)";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="hidden md:block fixed right-6 top-28 z-40 w-72 bg-[#0B0B11]/95 border border-gray-800 rounded-2xl shadow-xl backdrop-blur px-4 py-4 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: pulseColor }}
        animate={{ opacity: [0.3, 0.05, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-yellow-300">
            Reward Ledger
          </div>
          <div className="text-[10px] text-gray-400">Auto-sync</div>
        </div>
        {(!rewards || rewards.length === 0) && (
          <div className="text-xs text-gray-500">
            No rewards yet — complete a challenge!
          </div>
        )}
        <ul className="space-y-2 mt-2">
          {rewards.slice(0, 5).map((r, i) => (
            <motion.li
              key={`${r.timestamp}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-lg border border-gray-800/70 bg-black/30 px-3 py-2 relative z-10"
            >
              <span className="text-lg">🎁</span>
              <div className="text-xs">
                <div className="text-gray-200">
                  <span className="font-medium capitalize">{r.type}</span>
                  {typeof r.amount === "number" ? ` +${r.amount}` : ""}
                  {r.challenge_id ? ` • #${r.challenge_id}` : ""}
                </div>
                <div className="text-[11px] text-gray-500">
                  {timeAgo(r.timestamp)}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        {rewards.length > 0 && (
          <button
            onClick={onViewAll}
            className="mt-3 text-[11px] text-yellow-400 hover:text-yellow-300 underline transition"
          >
            View all rewards →
          </button>
        )}
      </div>
    </motion.aside>
  );
}

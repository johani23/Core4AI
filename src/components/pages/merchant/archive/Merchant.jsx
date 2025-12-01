// ============================================================
// ðŸ’Ž Core4.AI â€“ Merchant.jsx (v101 â€œIntegrated Analytics + Mini Flywheelâ€)
// ------------------------------------------------------------
// âœ… Combines Live Transactions + Analytics + Mini Flywheel
// âœ… Hooks into CoreSyncContext (simulateReward + stats + council)
// âœ… Auto-updates via WebSocket pulses
// ============================================================

import React, { useEffect, useState } from "react";
import { useCoreSync } from "@context/CoreSyncContext";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Coins, Activity } from "lucide-react";

// ðŸ’  Mini Flywheel visual config
const FlowCircle = ({ label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br ${color} shadow-lg`}
  >
    <span className="text-white font-semibold">{label}</span>
  </motion.div>
);

export default function Merchant() {
  const { tribes, stats, council, backendStatus, simulateReward } = useCoreSync();
  const [txFeed, setTxFeed] = useState([]);
  const [ping, setPing] = useState("--");
  const [connected, setConnected] = useState(false);

  // ðŸ”„ WS latency monitor (heartbeat simulation)
  useEffect(() => {
    let last = Date.now();
    const timer = setInterval(() => {
      const diff = (Date.now() - last) / 1000;
      setPing(diff.toFixed(1));
      last = Date.now();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ðŸ§® Simulate merchant transaction (manual trigger)
  const handleMerchantTx = async (tribe) => {
    await simulateReward(tribe);
    const tx = {
      id: Date.now(),
      tribe,
      value: (Math.random() * 100).toFixed(2),
      timestamp: new Date().toLocaleTimeString(),
    };
    setTxFeed((prev) => [tx, ...prev.slice(0, 8)]);
  };

  return (
    <div className="p-10 text-gray-200 min-h-[90vh] bg-gray-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-400 flex items-center gap-2">
            <ShoppingBag className="text-pink-400" /> Merchant Hub
          </h1>
          <p className="text-sm text-gray-400">
            Real-time merchant transactions, token flows, and influence analytics.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm">
            D-Index:{" "}
            <span className="text-pink-400 font-semibold">
              {council.dindex?.toFixed(2)}%
            </span>
          </p>
          <p className="text-xs text-gray-400">
            WS:{" "}
            <span
              className={
                backendStatus === "online" ? "text-green-400" : "text-red-400"
              }
            >
              {backendStatus.toUpperCase()}
            </span>{" "}
            | Ping {ping}s
          </p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="text-yellow-400" />
            <h2 className="font-semibold text-lg text-gray-100">Token Flow</h2>
          </div>
          <p className="text-3xl font-bold text-yellow-300">
            {stats.totalTokensBurned.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">Total Tokens Burned</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="text-blue-400" />
            <h2 className="font-semibold text-lg text-gray-100">
              Influence Gain
            </h2>
          </div>
          <p className="text-3xl font-bold text-blue-300">
            {stats.totalInfluence.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">Cumulative Influence Growth</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-emerald-400" />
            <h2 className="font-semibold text-lg text-gray-100">
              Merchant Value
            </h2>
          </div>
          <p className="text-3xl font-bold text-emerald-300">
            {(stats.totalInfluence * 0.82).toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">Projected Merchant Impact</p>
        </div>
      </div>

      {/* Live Transactions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">
          ðŸ’¹ Live Merchant Transactions
        </h2>
        <div className="bg-gray-900 rounded-2xl p-4 h-48 overflow-y-auto border border-gray-800">
          {txFeed.length === 0 ? (
            <p className="text-gray-500 italic">No transactions yet...</p>
          ) : (
            txFeed.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center py-2 border-b border-gray-800 text-sm"
              >
                <span className="text-gray-300">
                  {tx.tribe} <span className="text-gray-500">â€¢</span>{" "}
                  {tx.timestamp}
                </span>
                <span className="text-green-400 font-semibold">
                  +{tx.value} Tokens
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mini Flywheel */}
      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-purple-300 mb-6">
          ðŸ”„ Flywheel Simulation
        </h2>
        <div className="flex justify-center gap-8">
          <FlowCircle label="Content" color="from-purple-500 to-pink-500" delay={0.1} />
          <FlowCircle label="Tokens" color="from-amber-400 to-yellow-500" delay={0.3} />
          <FlowCircle label="Merchants" color="from-emerald-400 to-green-500" delay={0.5} />
          <FlowCircle label="Influence" color="from-blue-400 to-indigo-500" delay={0.7} />
        </div>
        <p className="mt-6 text-gray-400 text-sm">
          Value flows dynamically between content creators, merchants, and the tribe ecosystem.
        </p>
      </div>

      {/* Simulate Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() =>
            handleMerchantTx(
              tribes[Math.floor(Math.random() * tribes.length)].name
            )
          }
          className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-semibold hover:opacity-90 shadow-lg"
        >
          Simulate Merchant Transaction
        </button>
      </div>
    </div>
  );
}

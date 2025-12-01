// ============================================================
// ðŸ’Ž Core4.AI â€“ AI_Arena.jsx (MVP-38 â€œBehavioral Mirrorâ€)
// ------------------------------------------------------------
// âœ… Live Pulse â€¢ AI Trades â€¢ Swarm â€¢ Predictions â€¢ Digital Twin
// ============================================================

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function AIArena() {
  const [moods, setMoods] = useState([]);
  const [aiPulse, setAiPulse] = useState(null);
  const [logs, setLogs] = useState([]);
  const [swarm, setSwarm] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [mirror, setMirror] = useState(null);
  const [insight, setInsight] = useState(null);
  const wsRef = useRef(null);

  // ------------------------------------------------------------
  // ðŸ›°ï¸ Init + WebSocket
  // ------------------------------------------------------------
  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/ai-pulse");
    wsRef.current.onmessage = (e) => setAiPulse(JSON.parse(e.data));
    loadMoods();
    return () => wsRef.current && wsRef.current.close();
  }, []);

  async function loadMoods() {
    const res = await fetch(`${API_BASE}/tribes/mood`);
    setMoods(await res.json());
  }

  async function triggerTrade(user_id, token, action) {
    const res = await fetch(`${API_BASE}/ai/trade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, token, action }),
    });
    const data = await res.json();
    setLogs((p) => [{ ts: new Date().toLocaleTimeString(), ...data }, ...p.slice(0, 9)]);
  }

  async function updateSwarm() {
    const res = await fetch(`${API_BASE}/swarm/update`, { method: "POST" });
    setSwarm(await res.json());
  }

  async function predictMarket() {
    const res = await fetch(`${API_BASE}/predict/market`, { method: "POST" });
    setForecast(await res.json());
  }

  async function syncTwin() {
    const res = await fetch(`${API_BASE}/mirror/sync/1`, { method: "POST" });
    setMirror(await res.json());
  }

  async function simulateTwinTrade() {
    await fetch(`${API_BASE}/mirror/trade/1`, { method: "POST" });
    const res = await fetch(`${API_BASE}/mirror/compare/1`, { method: "POST" });
    const data = await res.json();
    setInsight(data.insight);
  }

  // ------------------------------------------------------------
  // ðŸŽ¨ Render
  // ------------------------------------------------------------
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        âš¡ AI Arena â€“ Social-AI Fusion & Behavioral Mirror
      </motion.h1>

      {/* ðŸ”´ Live AI Pulse */}
      {aiPulse && (
        <div
          className={`rounded-2xl p-4 mb-6 text-center border shadow-xl ${
            aiPulse.market_trend === "up"
              ? "border-green-500 bg-green-700/30"
              : aiPulse.market_trend === "down"
              ? "border-red-500 bg-red-700/30"
              : "border-yellow-500 bg-yellow-700/30"
          }`}
        >
          <p>Market Trend â†’ {aiPulse.market_trend}</p>
          <p>AI Activity : {aiPulse.ai_activity}%</p>
          <p>Wisdom Index : {aiPulse.wisdom_index}</p>
        </div>
      )}

      {/* ðŸ’  Tribe Moods */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-8">
        {moods.map((t) => (
          <motion.div
            key={t.tribe_id}
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-1">{t.name}</h2>
            <p className="text-sm text-gray-300">
              Mood Index: {t.mood_index.toFixed(2)}
            </p>
            <button
              onClick={() => triggerTrade(t.tribe_id, "Core4Token", "buy")}
              className="mt-3 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium"
            >
              Simulate AI Trade
            </button>
          </motion.div>
        ))}
      </div>

      {/* ðŸ“Š Recent AI Trades */}
      <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent AI Trades</h3>
        <ul className="space-y-1 text-sm">
          {logs.map((l, i) => (
            <li key={i} className="flex justify-between text-gray-300">
              <span>
                [{l.ts}] {l.action?.toUpperCase()} {l.token}
              </span>
              <span
                className={l.outcome > 0 ? "text-green-400" : "text-red-400"}
              >
                {l.outcome > 0 ? "+" : ""}
                {l.outcome.toFixed(2)} ({l.balance?.toFixed(0)})
              </span>
            </li>
          ))}
          {logs.length === 0 && (
            <li className="text-gray-500 italic">No AI trades yet</li>
          )}
        </ul>
      </div>

      {/* ðŸŒ Swarm Consensus Panel */}
      <div className="bg-indigo-900/30 border border-indigo-700 rounded-2xl p-4 text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">ðŸ§  Collective Market Consensus</h3>
        {swarm && (
          <>
            <p>Consensus Trend: <b>{swarm.consensus}</b></p>
            <p>Average Confidence: {swarm.avg_confidence}</p>
            <p>Energy Level: {swarm.energy_level}</p>
          </>
        )}
        <button
          onClick={updateSwarm}
          className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-medium"
        >
          Update Swarm
        </button>
      </div>

      {/* ðŸ”® Predictive Market */}
      <div className="bg-purple-900/30 border border-purple-700 rounded-2xl p-4 text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">ðŸ”® Predictive Market</h3>
        {forecast && (
          <>
            <p>Predicted Trend: <b>{forecast.predicted_trend}</b></p>
            <p>Confidence: {forecast.confidence}</p>
          </>
        )}
        <button
          onClick={predictMarket}
          className="mt-3 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium"
        >
          Run Market Prediction
        </button>
      </div>

      {/* ðŸªž Digital Twin Mirror */}
      <div className="bg-fuchsia-900/30 border border-fuchsia-700 rounded-2xl p-4 text-center">
        <h3 className="text-xl font-semibold mb-2">ðŸªž Digital Twin Simulation</h3>
        {mirror && (
          <>
            <p>Risk Profile: {mirror.risk_profile}</p>
            <p>Confidence: {mirror.confidence}</p>
          </>
        )}
        <button
          onClick={syncTwin}
          className="mt-3 px-4 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl text-sm font-medium"
        >
          Sync Twin
        </button>
        <button
          onClick={simulateTwinTrade}
          className="mt-3 ml-2 px-4 py-1.5 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-xl text-sm font-medium"
        >
          Simulate Mirror Trade
        </button>
        {insight && <p className="mt-3 text-sm text-gray-200">{insight}</p>}
      </div>
    </div>
  );
}

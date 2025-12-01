// ============================================================
// ðŸ’Ž Core4.AI â€“ MVP-31.6 â€œDopamine Overlayâ€
// ------------------------------------------------------------
// Adds animated background color pulses based on market mood
// ============================================================

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000";
const WS_BASE = "ws://127.0.0.1:8000";

export default function IntelligenceBoard() {
  const [globalMood, setGlobalMood] = useState(0);
  const [tribes, setTribes] = useState([]);
  const [market, setMarket] = useState([]);
  const [selectedToken, setSelectedToken] = useState("C4AI");
  const [ohlcData, setOhlcData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [pulseColor, setPulseColor] = useState(null); // ðŸ”¥ overlay color state

  const wsMarketRef = useRef(null);
  const wsTribeRefs = useRef({});

  // ------------------------------------------------------------------
  // ðŸ§© Fetch Data
  // ------------------------------------------------------------------
  async function fetchData() {
    try {
      const tribeRes = await fetch(`${API_BASE}/analytics/tribe-summary`);
      const tribeData = await tribeRes.json();
      setGlobalMood(tribeData.global_mood_index || 0);
      setTribes(tribeData.tribe_summary || []);

      const marketRes = await fetch(`${API_BASE}/analytics/market-summary`);
      const marketData = await marketRes.json();
      setMarket(marketData.market_summary || []);

      const ohlcRes = await fetch(`${API_BASE}/analytics/market-ohlc?token=${selectedToken}&limit=30`);
      const ohlc = await ohlcRes.json();
      if (ohlc && ohlc.token) {
        setOhlcData([
          { name: "Open", value: ohlc.open },
          { name: "High", value: ohlc.high },
          { name: "Low", value: ohlc.low },
          { name: "Close", value: ohlc.close },
        ]);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
  }

  // ------------------------------------------------------------------
  // ðŸ”” Live Alerts + Dopamine Pulse trigger
  // ------------------------------------------------------------------
  const pushAlert = (msg, type = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, msg, type }]);
    triggerPulse(type);
    setTimeout(() => setAlerts((prev) => prev.filter((a) => a.id !== id)), 6000);
  };

  const triggerPulse = (type) => {
    if (type === "up") setPulseColor("green");
    else if (type === "down") setPulseColor("red");
    else setPulseColor("purple");
    setTimeout(() => setPulseColor(null), 1000); // fade after 1s
  };

  // ------------------------------------------------------------------
  // ðŸ“¡ WebSocket connections
  // ------------------------------------------------------------------
  const connectMarketWS = () => {
    wsMarketRef.current = new WebSocket(`${WS_BASE}/ws/market`);
    wsMarketRef.current.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      if (payload?.data?.change_pct) {
        const { token_symbol, change_pct } = payload.data;
        if (Math.abs(change_pct) >= 7) {
          pushAlert(
            `${token_symbol} token moved ${change_pct > 0 ? "up" : "down"} ${Math.abs(change_pct)}%`,
            change_pct > 0 ? "up" : "down"
          );
        }
      }
    };
    wsMarketRef.current.onclose = () => setTimeout(connectMarketWS, 3000);
  };

  const connectTribeWS = (tribeId) => {
    const ws = new WebSocket(`${WS_BASE}/ws/tribe/${tribeId}`);
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.mood_index < 30)
        pushAlert(`âš ï¸ Tribe ${tribeId} mood dropped (${d.mood_index.toFixed(1)}%)`, "down");
      if (d.mood_index > 80)
        pushAlert(`ðŸ”¥ Tribe ${tribeId} mood surged (${d.mood_index.toFixed(1)}%)`, "up");
    };
    ws.onclose = () => setTimeout(() => connectTribeWS(tribeId), 3000);
    wsTribeRefs.current[tribeId] = ws;
  };

  // ------------------------------------------------------------------
  // â™»ï¸ Lifecycle
  // ------------------------------------------------------------------
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    connectMarketWS();
    ["001", "002", "003"].forEach(connectTribeWS);
    return () => {
      clearInterval(interval);
      wsMarketRef.current?.close();
      Object.values(wsTribeRefs.current).forEach((ws) => ws.close());
    };
  }, [selectedToken]);

  // ------------------------------------------------------------------
  // ðŸ’Ž UI
  // ------------------------------------------------------------------
  return (
    <div className="relative p-6 text-white bg-black min-h-screen overflow-hidden">
      {/* Dopamine Pulse Overlay */}
      <AnimatePresence>
        {pulseColor && (
          <motion.div
            key={pulseColor}
            className={`absolute inset-0 z-0 ${
              pulseColor === "green"
                ? "bg-green-500/40"
                : pulseColor === "red"
                ? "bg-red-500/40"
                : "bg-purple-700/40"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* ðŸ”” Live Alerts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
        <AnimatePresence>
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              className={`p-3 rounded-xl shadow-lg text-sm z-50 ${
                a.type === "up"
                  ? "bg-green-700/80"
                  : a.type === "down"
                  ? "bg-red-700/80"
                  : "bg-zinc-700/80"
              }`}
            >
              {a.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <motion.h1
        className="text-3xl font-bold mb-4 text-center relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ðŸ§  Core4.AI Intelligence Board
      </motion.h1>

      {/* Global Mood */}
      <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 rounded-2xl p-4 mb-8 text-center shadow-xl relative z-10">
        <h2 className="text-xl font-semibold">Global Tribe Mood Index</h2>
        <motion.div
          className="text-5xl font-bold mt-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {globalMood.toFixed(1)}%
        </motion.div>
      </div>

      {/* Tribe Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-10 relative z-10">
        {tribes.map((t) => (
          <motion.div
            key={t.tribe_id}
            className="bg-zinc-900 rounded-2xl p-4 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">ðŸŒ¸ Tribe {t.tribe_id}</h3>
            <p className="text-sm text-gray-400">
              Avg Mood: {t.avg_mood_index.toFixed(1)}%
            </p>
            <motion.div
              className={`text-3xl font-bold mt-2 ${
                t.avg_mood_index > 60
                  ? "text-green-400"
                  : t.avg_mood_index < 40
                  ? "text-red-500"
                  : "text-yellow-400"
              }`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {t.avg_mood_index.toFixed(0)}%
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Market Overview */}
      <div className="bg-zinc-950 rounded-2xl p-4 shadow-lg mb-8 relative z-10">
        <h2 className="text-xl font-semibold mb-4">ðŸ“ˆ Market Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-zinc-700 text-sm text-gray-400">
              <tr>
                <th className="py-2">Token</th>
                <th>Price</th>
                <th>Î”%</th>
                <th>Trend</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {market.map((m) => (
                <tr
                  key={m.token}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer"
                  onClick={() => setSelectedToken(m.token)}
                >
                  <td className="py-2">{m.token}</td>
                  <td>{m.current_price.toFixed(2)}</td>
                  <td
                    className={`${
                      m.change_pct > 0
                        ? "text-green-400"
                        : m.change_pct < 0
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {m.change_pct > 0 ? "+" : ""}
                    {m.change_pct.toFixed(2)}%
                  </td>
                  <td>{m.trend}</td>
                  <td className="capitalize">{m.dominant_sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Chart */}
      <div className="bg-zinc-950 rounded-2xl p-4 shadow-lg relative z-10">
        <h2 className="text-xl font-semibold mb-4">
          ðŸª™ Token Analytics: {selectedToken}
        </h2>
        {ohlcData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ohlcData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Loading token data...</p>
        )}
      </div>
    </div>
  );
}

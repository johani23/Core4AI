// ============================================================
// ðŸ’Ž Core4.AI â€“ GovernanceInfluence.jsx (MVP-51 â€œInfluence Graphâ€)
// ------------------------------------------------------------
// âœ… Visualizes council decisions vs tribe mood shifts
// âœ… Live data from /ws/influence
// âœ… Auto-coloring & smooth transition lines
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function GovernanceInfluence() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/influence");
      wsRef.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "governance_influence") {
          const point = { time: new Date().toLocaleTimeString() };
          msg.tribe_updates.forEach((t) => {
            point[t.tribe] = t.new_mood;
          });
          setData((prev) => [...prev.slice(-24), point]);
        }
      };
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 4000);
      };
    };
    connect();
    return () => wsRef.current && wsRef.current.close();
  }, []);

  const colors = {
    "ðŸŽ¨ Fashion": "#ec4899",
    "ðŸŽ­ Events": "#facc15",
    "ðŸ§  Thinkers": "#38bdf8",
    "ðŸ˜‚ Humor": "#22c55e",
  };

  return (
    <div className="px-8 py-6 text-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold text-purple-300">
          ðŸ§­ Governance Influence Graph
        </h1>
        <div
          className={`text-sm px-3 py-1 rounded-full ${
            connected ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-400"
          }`}
        >
          {connected ? "Live Feed Active" : "Disconnected"}
        </div>
      </div>

      <div className="bg-black/40 border border-purple-800/40 rounded-2xl p-5">
        <h2 className="text-lg font-medium text-purple-300 mb-4">
          Tribe Mood Index (Live Influence)
        </h2>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
              <YAxis domain={[30, 70]} tickFormatter={(v) => `${v}`} />
              <Tooltip
                labelStyle={{ color: "#ccc" }}
                formatter={(v, name) => [`${v.toFixed(1)} mood`, name]}
              />
              <Legend />
              {Object.keys(colors).map((tribe) => (
                <Line
                  key={tribe}
                  type="monotone"
                  dataKey={tribe}
                  stroke={colors[tribe]}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 text-center text-sm text-gray-400"
      >
        <p>
          Each pulse represents a <span className="text-purple-300">Council decision</span> 
          impacting tribe mood equilibrium.
        </p>
      </motion.div>
    </div>
  );
}

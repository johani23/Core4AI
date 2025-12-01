// ============================================================
// ðŸ’Ž Core4.AI â€“ Economy.jsx (v137 â€œLive Intelligence Hybridâ€)
// ------------------------------------------------------------
// âœ… Combines analytics table + real-time WS sync
// âœ… Keeps same naming and design
// âœ… D-Index + Influence Share update dynamically
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function Economy() {
  const { heatmap = {} } = useCoreSync();
  const [influenceShare, setInfluenceShare] = useState({});
  const [dindex, setDindex] = useState(0);
  const [wsStatus, setWsStatus] = useState("Offline");
  const [timestamp, setTimestamp] = useState("");

  // ðŸŒ Initial data fetch
  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((r) => r.json())
      .then((data) => {
        if (data.influence_share) setInfluenceShare(data.influence_share);
        if (data.dindex) setDindex(data.dindex);
      })
      .catch(() => console.warn("Health fetch failed"));
  }, []);

  // ðŸŒ WebSocket live updates
  useEffect(() => {
    let ws;
    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");
      ws.onopen = () => setWsStatus("Online");
      ws.onclose = () => {
        setWsStatus("Reconnecting...");
        setTimeout(connect, 3000);
      };
      ws.onerror = () => setWsStatus("Error");

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === "influence_update" && msg.influence_share) {
            setInfluenceShare(msg.influence_share);
          }
          if (msg.event === "tribe_pulse" && msg.heatmap) {
            // update dopamine values directly
            Object.keys(msg.heatmap).forEach((tribe) => {
              heatmap[tribe] = msg.heatmap[tribe];
            });
          }
          if (msg.dindex !== undefined) setDindex(msg.dindex);
          if (msg.timestamp) setTimestamp(msg.timestamp);
        } catch (e) {
          console.warn("WS parse error", e);
        }
      };
    };
    connect();
    return () => ws && ws.close();
  }, [heatmap]);

  // Derived Data
  const tribes = [
    { name: "Fashionists", multiplier: 1.2 },
    { name: "Adventurers", multiplier: 1.2 },
    { name: "EventGoers", multiplier: 1.2 },
    { name: "Techy", multiplier: 1.0 },
  ];

  const forecast = (dopamine) => {
    if (dopamine > 0.6) return "Upward";
    if (dopamine < 0.4) return "Decline";
    return "Stable";
  };

  const score = (dopamine, mult) =>
    ((dopamine || 0.5) * mult * 0.8).toFixed(2);

  return (
    <div className="p-8 text-gray-200 min-h-[85vh] bg-[#0d1117]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">ðŸ’  Tribe Economy</h1>
        <div
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            wsStatus === "Online"
              ? "bg-green-600"
              : wsStatus === "Reconnecting..."
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          WS: {wsStatus}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Tribe</th>
            <th className="px-3 py-2">Dopamine</th>
            <th className="px-3 py-2">Multiplier</th>
            <th className="px-3 py-2">Score</th>
            <th className="px-3 py-2">Forecast</th>
            <th className="px-3 py-2">Influence Share</th>
          </tr>
        </thead>
        <tbody>
          {tribes.map((t, idx) => {
            const dopamine = heatmap[t.name] || 0.5;
            const mult = t.multiplier;
            const sc = score(dopamine, mult);
            const fc = forecast(dopamine);
            const share = influenceShare[t.name] || 0;

            return (
              <tr
                key={t.name}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
              >
                <td className="px-3 py-2 text-gray-400">{idx + 1}</td>
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2">{(dopamine * 100).toFixed(1)}%</td>
                <td className="px-3 py-2">Ã—{mult.toFixed(1)}</td>
                <td className="px-3 py-2 text-green-400">{sc}</td>
                <td className="px-3 py-2 text-gray-300">{fc}</td>
                <td className="px-3 py-2 text-blue-400">
                  {share.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* D-Index bar */}
      <motion.div
        animate={{
          width: `${(dindex * 100).toFixed(1)}%`,
          backgroundColor: "#38bdf8",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mt-6 h-2 rounded-full shadow-[0_0_20px_2px_rgba(56,189,248,0.5)]"
      />
      <div className="text-xs text-gray-400 mt-1 flex justify-between">
        <span>D-Index {(dindex * 100).toFixed(2)}%</span>
        <span>
          {timestamp ? `Last update: ${new Date(timestamp).toLocaleTimeString()}` : ""}
        </span>
      </div>
    </div>
  );
}

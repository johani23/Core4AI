// ============================================================
// ðŸ’Ž Core4.AI â€“ InfluenceMonitor.jsx (v136.2 â€œLive Influence Consoleâ€)
// ------------------------------------------------------------
// âœ… Connects to /ws/synaptic + /ws/simulation
// âœ… Displays D-Index, Tribe Heatmap, and Influence Share
// âœ… Streams live flywheel events between tribes
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

export default function InfluenceMonitor() {
  const [dIndex, setDIndex] = useState(0);
  const [heatmap, setHeatmap] = useState({});
  const [share, setShare] = useState({});
  const [flywheel, setFlywheel] = useState([]);
  const [history, setHistory] = useState([]);
  const wsSynRef = useRef(null);
  const wsSimRef = useRef(null);

  // ------------------------------------------------------------
  // ðŸ§  Connect to Synaptic Stream
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/synaptic");
    wsSynRef.current = ws;

    ws.onopen = () => console.log("âœ… Connected to /ws/synaptic");
    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.dindex) setDIndex(data.dindex);
        if (data.heatmap) setHeatmap(data.heatmap);
        if (data.influence_share) setShare(data.influence_share);
        setHistory((prev) => [
          ...prev.slice(-25),
          { time: new Date().toLocaleTimeString(), value: data.dindex || 0 },
        ]);
      } catch (err) {
        console.error("Synaptic parse error:", err);
      }
    };
    ws.onclose = () => console.log("âš ï¸ Synaptic socket closed");
    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ðŸŽ¡ Connect to Flywheel Stream
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/simulation");
    wsSimRef.current = ws;

    ws.onopen = () => console.log("âœ… Connected to /ws/simulation");
    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.source && data.target) {
          setFlywheel((prev) => [
            ...prev.slice(-10),
            {
              time: new Date().toLocaleTimeString(),
              source: data.source,
              target: data.target,
              intensity: data.intensity,
            },
          ]);
        }
      } catch (err) {
        console.error("Simulation parse error:", err);
      }
    };
    ws.onclose = () => console.log("âš ï¸ Simulation socket closed");
    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ðŸŽ¨ UI
  // ------------------------------------------------------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          ðŸŒ Live Influence Console
        </h1>
        <span className="text-sm text-gray-500">
          D-Index: <b>{dIndex.toFixed(2)}%</b>
        </span>
      </div>

      {/* ðŸ“ˆ D-Index Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          D-Index Momentum
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ðŸ”¥ Tribe Heatmap */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Tribe Dopamine Heatmap
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(heatmap).map(([tribe, value]) => (
            <div key={tribe} className="p-3 rounded-xl border text-center">
              <div className="text-gray-500 text-sm">{tribe}</div>
              <div
                className="font-bold text-lg"
                style={{
                  color:
                    value > 0.6
                      ? "#16a34a"
                      : value > 0.4
                      ? "#eab308"
                      : "#ef4444",
                }}
              >
                {(value * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ðŸ“Š Influence Share */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Influence Share (Rebalanced)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(share).map(([tribe, pct]) => (
            <div key={tribe} className="p-3 rounded-xl border text-center">
              <div className="text-gray-500 text-sm">{tribe}</div>
              <div className="font-bold text-lg text-blue-600">
                {pct.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ðŸŒ€ Live Flywheel Activity */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Flywheel Activity Stream
        </h2>
        <div className="space-y-1 max-h-48 overflow-y-auto text-sm">
          {flywheel.map((f, idx) => (
            <div key={idx} className="flex justify-between text-gray-600 border-b pb-1">
              <span>
                {f.time} â†’ <b>{f.source}</b> âžœ <b>{f.target}</b>
              </span>
              <span className="text-blue-500">
                {(f.intensity * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

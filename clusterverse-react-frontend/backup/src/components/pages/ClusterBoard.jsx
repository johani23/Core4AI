// ============================================================
// ðŸ’Ž Core4.AI â€“ ClusterBoard.jsx (MVP-28-Live)
// ------------------------------------------------------------
// Visualizes tribe mood, token flow & correlation live.
// WebSocket pushes instant updates.
// ============================================================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ForceGraph2D } from "react-force-graph";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const API = "http://127.0.0.1:8000";

export default function ClusterBoard() {
  const [tribes, setTribes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mood, setMood] = useState(null);
  const [flow, setFlow] = useState([]);
  const [correlation, setCorrelation] = useState([]);

  useEffect(() => {
    loadTribes();
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (["sentiment_update", "token_transfer", "market_pulse"].includes(msg.type)) {
        if (selected) refreshData(selected.id);
      }
    };
    return () => ws.close();
  }, [selected]);

  async function loadTribes() {
    const res = await axios.get(`${API}/market/tribes`);
    setTribes(res.data);
    if (res.data.length) {
      setSelected(res.data[0]);
      refreshData(res.data[0].id);
    }
  }

  async function refreshData(id) {
    const [m, f, c] = await Promise.all([
      axios.get(`${API}/tribe/${id}/mood`),
      axios.get(`${API}/token/flow/${id}`),
      axios.get(`${API}/market/emotion_value_index`),
    ]);
    setMood(m.data); setFlow(f.data); setCorrelation(c.data);
  }

  const graphData = {
    nodes: flow
      .flatMap((t) => [
        { id: t.sender, group: "sender" },
        { id: t.receiver, group: "receiver" },
      ])
      .filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i),
    links: flow.map((t) => ({
      source: t.sender,
      target: t.receiver,
      value: t.amount,
    })),
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">ðŸ’  Sentiment Cluster & Token Flow</h1>
      <div className="flex gap-3 mb-4">
        {tribes.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelected(t);
              refreshData(t.id);
            }}
            className={`px-4 py-2 rounded-xl ${
              selected?.id === t.id ? "bg-purple-600" : "bg-gray-700"
            }`}
          >
            {t.badge} {t.name}
          </button>
        ))}
      </div>

      {mood && (
        <div className="bg-gray-800 p-4 rounded-xl mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Tribe Mood: {mood.mood.toUpperCase()} {mood.emoji}
            </h2>
            <p className="text-gray-400">MPI: {mood.mpi}</p>
          </div>
          <div
            className={`w-10 h-10 rounded-full ${
              mood.mood === "bullish"
                ? "bg-green-500"
                : mood.mood === "bearish"
                ? "bg-red-500"
                : "bg-yellow-400"
            } animate-pulse`}
          ></div>
        </div>
      )}

      <div className="bg-gray-900 p-4 rounded-xl mb-8">
        <h3 className="mb-3 font-semibold">ðŸ”„ Token Flow Network</h3>
        {flow.length === 0 ? (
          <p className="text-gray-500">No token transactions yet.</p>
        ) : (
          <div style={{ height: 400 }}>
            <ForceGraph2D
              graphData={graphData}
              nodeAutoColorBy="group"
              linkDirectionalParticles={2}
              linkWidth={(l) => Math.log(l.value + 1)}
            />
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-4 rounded-xl">
        <h3 className="mb-3 font-semibold">ðŸ“ˆ Emotionâ€“Value Correlation</h3>
        <LineChart width={600} height={250} data={correlation}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="tribe" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Line type="monotone" dataKey="mpi" stroke="#8884d8" name="Mood Index" />
          <Line type="monotone" dataKey="transactions" stroke="#82ca9d" name="Tx Count" />
        </LineChart>
      </div>
    </div>
  );
}

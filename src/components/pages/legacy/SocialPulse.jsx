// ============================================================
// ðŸ’Ž Core4.AI â€“ SocialPulse.jsx (MVP-34 â€œUnified WS + Global Mood Indexâ€)
// ------------------------------------------------------------
// âœ… Connects to unified WebSocket endpoint: /ws
// âœ… Listens for global 'sentiment_update' broadcasts
// âœ… Displays live Global Mood Index + Tribe Cards
// âœ… Fallback: auto-refresh from /market endpoint if WS closes
// ============================================================

import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function SocialPulse() {
  const [tribes, setTribes] = useState([]);
  const [globalMood, setGlobalMood] = useState(50.0);
  const [status, setStatus] = useState("Connectingâ€¦");
  const [lastUpdate, setLastUpdate] = useState(null);

  // ------------------------------------------------------------
  // ðŸ“¡ Load tribes (initial snapshot)
  // ------------------------------------------------------------
  async function loadTribes() {
    try {
      const res = await fetch(`${API_BASE}/market`);
      const data = await res.json();

      // Generate static tribe placeholders from price baseline
      const base = data.price || 3.42;
      const fakeTribes = [
        { id: 1, name: "Core4AI 001", mood: globalMood, price: base + 0.1 },
        { id: 2, name: "Core4AI 002", mood: globalMood, price: base - 0.05 },
        { id: 3, name: "Core4AI 003", mood: globalMood, price: base },
      ];
      setTribes(fakeTribes);
      setLastUpdate(new Date().toLocaleTimeString());
      setStatus("Online");
    } catch (err) {
      console.error("âŒ Failed to load tribes:", err);
      setStatus("Offline");
    }
  }

  // ------------------------------------------------------------
  // ðŸ§  WebSocket connection to unified /ws
  // ------------------------------------------------------------
  useEffect(() => {
    loadTribes();

    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("âœ… Connected to /ws");
      setStatus("Live");
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);

        // ðŸ§© Handle AI Sentiment update
        if (msg.type === "sentiment_update" && msg.global_mood) {
          const newMood = msg.global_mood;
          setGlobalMood(newMood);

          // Update tribesâ€™ mood locally
          setTribes((prev) =>
            prev.map((t) => ({
              ...t,
              mood: newMood,
            }))
          );

          setLastUpdate(new Date().toLocaleTimeString());
        }

        // ðŸª™ Optional market update broadcast
        if (msg.event === "market_update" && msg.tribes) {
          setTribes(msg.tribes);
          setLastUpdate(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn("âš ï¸ Invalid WS message:", err);
      }
    };

    ws.onerror = () => setStatus("Disconnected");
    ws.onclose = () => {
      console.warn("âš ï¸ WebSocket closed, enabling polling...");
      setStatus("Pollingâ€¦");
      const poll = setInterval(loadTribes, 6000);
      return () => clearInterval(poll);
    };

    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ðŸŽ¨ Mood color logic
  // ------------------------------------------------------------
  const moodColor =
    globalMood > 65
      ? "text-red-400"
      : globalMood < 40
      ? "text-blue-400"
      : globalMood >= 45 && globalMood <= 55
      ? "text-green-400"
      : "text-purple-400";

  const moodLabel =
    globalMood > 65
      ? "ðŸ”¥ Excited"
      : globalMood < 40
      ? "ðŸ’§ Low"
      : globalMood >= 45 && globalMood <= 55
      ? "ðŸŒ¿ Calm"
      : "âš¡ Mixed";

  // ------------------------------------------------------------
  // ðŸ–¼ï¸ Render
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">Social Pulse</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            Status: <span className="text-yellow-400">{status}</span>
          </p>
          <p className="text-xs text-gray-500">
            Last update: {lastUpdate || "â€”"}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Global Mood Index:{" "}
        <span className={`${moodColor} font-bold`}>
          {globalMood.toFixed(1)}%
        </span>{" "}
        <span className="ml-2 text-sm text-gray-400">{moodLabel}</span>
      </h2>

      {/* ðŸ§© Tribe Mood Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tribes.map((t) => (
          <div
            key={t.id}
            className="bg-gradient-to-b from-gray-800 to-gray-900 border border-green-700 rounded-2xl p-5 shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
            <p className="text-gray-400 text-sm mb-2">
              ðŸ’° Price: <span className="text-yellow-300">{t.price.toFixed(2)} C4T</span>
            </p>
            <p className={`text-lg font-bold ${moodColor}`}>
              Mood: {t.mood.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">0 interactions</p>
          </div>
        ))}
      </div>
    </div>
  );
}

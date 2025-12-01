// ============================================================
// ðŸ’  Core4.AI â€“ LiveFeedStream.jsx (MVP-71.5 â€œAutonomous Feed Pulseâ€)
// ------------------------------------------------------------
// âœ… Connects to ws://127.0.0.1:8000/ws/ai-pulse
// âœ… Streams simulated posts + tribe dopamine events
// âœ… Fixes 'reading user' error with safe optional chaining
// âœ… Animated entry for each new event
// ============================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveFeedStream() {
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws;
    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws/ai-pulse");

      ws.onopen = () => {
        setConnected(true);
        console.log("âœ… Connected to AI-Pulse Stream");
      };

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          setEvents((prev) => [
            ...prev.slice(-39), // keep last 40
            {
              ...msg,
              id: Date.now() + Math.random(),
            },
          ]);
        } catch (err) {
          console.error("Invalid WS message", err);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        console.log("ðŸ”´ Disconnected from AI-Pulse Stream, retryingâ€¦");
        setTimeout(connect, 3000);
      };
    };

    connect();
    return () => ws && ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-fuchsia-400 mb-2">
        ðŸ”¥ Live Simulation Feed
      </h1>
      <p className="text-center text-gray-400 mb-6">
        Watch AI-generated users, posts, and votes stream in real time.
      </p>

      <div className="flex justify-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            connected ? "bg-green-700/40 text-green-300" : "bg-red-700/40 text-red-300"
          }`}
        >
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-900/70 border border-fuchsia-600/40 rounded-2xl p-5 shadow-lg">
        <AnimatePresence>
          {events.length === 0 ? (
            <p className="text-center text-gray-400 italic py-10">
              Waiting for AI-pulse data...
            </p>
          ) : (
            events
              .slice()
              .reverse()
              .map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 border-b border-gray-800 pb-2"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-fuchsia-300 font-semibold">
                        {event?.type === "ai-pulse"
                          ? `${event?.tribe || "Unknown Tribe"}`
                          : event?.type || "event"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {event?.post?.title
                          ? `ðŸ“ ${event.post.title} â€” Engagement ${event.post.engagement}`
                          : "New simulation activity detected"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event?.timestamp || Date.now()).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </AnimatePresence>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6">
        Beta Core v7.1.5 â€¢ Live Feed Engine
      </div>
    </div>
  );
}

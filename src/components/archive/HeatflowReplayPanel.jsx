// ============================================================
// ðŸ’Ž Core4.AI â€“ HeatflowReplayPanel.jsx (MVP-65 â€œEmotional Replayâ€)
// ------------------------------------------------------------
// âœ… Records dopamine scores over time
// âœ… Visual heatbar + time scrub slider
// âœ… Replays emotional energy timeline (5-minute window)
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function HeatflowReplayPanel({ width = 520, height = 80 }) {
  const { logs } = useCoreSync();
  const [timeline, setTimeline] = useState([]); // [{ts, score}]
  const [cursor, setCursor] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ðŸŽ§ Convert logs â†’ dopamine energy history
  useEffect(() => {
    if (!logs.length) return;
    const weights = { "user.created": 2, "user.join": 4, "post.created": 6, "post.voted": 3, "user.rep": 5 };
    const recent = logs.slice(-20);
    const total = recent.reduce((a, ev) => a + (weights[ev.type] || 1), 0);
    const score = Math.min(100, Math.max(0, total / recent.length / 6 * 100));
    const entry = { ts: Date.now(), score };
    setTimeline((prev) => [...prev.slice(-299), entry]); // ~5min @1s sampling
  }, [logs]);

  // ðŸŽžï¸ Playback controller
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCursor((c) => (c + 1) % timeline.length);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying, timeline.length]);

  const gradientStops = timeline
    .map((t, i) => {
      const hue = Math.round(260 - (t.score / 100) * 160); // purpleâ†’greenâ†’red
      return `${hue},100%,${40 + (t.score / 100) * 40}%`;
    })
    .join(" | ");

  // ðŸ§® helper for color
  const getColor = (s) => {
    const hue = Math.round(260 - (s / 100) * 160);
    return `hsl(${hue},100%,50%)`;
  };

  return (
    <div
      className="mx-auto mt-8 flex flex-col items-center text-gray-300 select-none"
      style={{ width }}
    >
      <div className="text-fuchsia-400 font-semibold mb-2 uppercase text-xs">
        Emotional Heatflow Replay
      </div>

      {/* Heat Bar */}
      <div className="relative w-full h-6 bg-gray-800 rounded-full overflow-hidden mb-3">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-200"
          style={{
            width: `${(cursor / (timeline.length || 1)) * 100}%`,
            background: getColor(timeline[cursor]?.score || 0),
            boxShadow: `0 0 12px ${getColor(timeline[cursor]?.score || 0)}`,
          }}
        ></div>

        {/* Trail */}
        <div className="absolute inset-0 opacity-30 flex">
          {timeline.map((t, i) => (
            <div
              key={i}
              style={{
                width: `${100 / (timeline.length || 1)}%`,
                backgroundColor: getColor(t.score),
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max={timeline.length - 1}
        value={cursor}
        onChange={(e) => setCursor(parseInt(e.target.value))}
        className="w-full accent-fuchsia-500 mb-2"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1 rounded-md text-sm ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPlaying ? "â¹ Pause" : "â–¶ï¸ Play"}
        </button>
        <button
          onClick={() => setCursor(0)}
          className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
        >
          â® Reset
        </button>
      </div>

      {/* Current Value */}
      {timeline[cursor] && (
        <div className="mt-3 text-xs text-gray-400">
          {new Date(timeline[cursor].ts).toLocaleTimeString()} Â·{" "}
          <span style={{ color: getColor(timeline[cursor].score) }}>
            {timeline[cursor].score.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

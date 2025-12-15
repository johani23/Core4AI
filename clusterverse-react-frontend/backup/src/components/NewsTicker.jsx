// ============================================================
// ðŸ’Ž Core4.AI â€“ NewsTicker.jsx (MVP-28: Dopamine-Reactive Edition)
// ------------------------------------------------------------
// Scrolls live headlines from /market/news and adapts both color
// + glow intensity based on market mood & dopamine index.
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export default function NewsTicker() {
  const [news, setNews] = useState([]);
  const [mood, setMood] = useState({ mood: "neutral", emoji: "âš–ï¸", label: "Stable" });
  const [dopamine, setDopamine] = useState(50); // default midpoint
  const [loading, setLoading] = useState(true);

  // ðŸ§© Fetch Tribe News
  async function fetchNews() {
    try {
      const res = await fetch("http://127.0.0.1:8000/market/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      if (Array.isArray(data)) setNews(data);
    } catch (err) {
      console.warn("âš ï¸ News fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ðŸ’¹ Fetch Global Market Mood
  async function fetchMood() {
    try {
      const res = await fetch("http://127.0.0.1:8000/market/mood");
      if (!res.ok) throw new Error("Failed to fetch mood");
      const data = await res.json();
      setMood(data);
    } catch (err) {
      console.warn("âš ï¸ Mood fetch error:", err);
    }
  }

  // ðŸ’¥ Fetch Dopamine Heatmap Average
  async function fetchDopamine() {
    try {
      const res = await fetch("http://127.0.0.1:8000/dopamine/heatmap");
      if (!res.ok) throw new Error("Failed to fetch dopamine");
      const data = await res.json();
      const avg = data.average_dopamine ?? 50;
      setDopamine(avg);
    } catch (err) {
      console.warn("âš ï¸ Dopamine fetch error:", err);
    }
  }

  useEffect(() => {
    fetchNews();
    fetchMood();
    fetchDopamine();
    const interval = setInterval(() => {
      fetchNews();
      fetchMood();
      fetchDopamine();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ðŸŒˆ Mood-based color tone
  const moodColor =
    mood.mood === "bullish"
      ? "text-emerald-400"
      : mood.mood === "bearish"
      ? "text-red-400"
      : "text-yellow-400";

  // ðŸ”¥ Dopamine glow intensity (0â€“100 â†’ 0â€“1)
  const glowOpacity = Math.min(1, dopamine / 100);
  const glowColor =
    mood.mood === "bullish"
      ? `rgba(52, 211, 153, ${glowOpacity})`
      : mood.mood === "bearish"
      ? `rgba(248, 113, 113, ${glowOpacity})`
      : `rgba(250, 204, 21, ${glowOpacity})`;

  if (loading)
    return (
      <div className="w-full py-1 bg-black text-gray-500 text-center text-xs animate-pulse">
        Loading market updates...
      </div>
    );

  if (!news.length)
    return (
      <div className="w-full py-1 bg-black text-gray-500 text-center text-xs">
        No active tribe news yet.
      </div>
    );

  return (
    <div className="relative w-full overflow-hidden border-t border-b border-zinc-800">
      {/* ðŸ”¹ Ticker Content */}
      <div className={`bg-black text-sm ${moodColor}`}>
        <motion.div
          className="flex whitespace-nowrap py-1"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <span className="flex items-center gap-2 ml-6">
            <Newspaper size={14} className={moodColor} />
            <span className="mr-6 text-xs opacity-70">
              {mood.emoji} {mood.label.toUpperCase()} â€¢ Dopamine {Math.round(dopamine)}
            </span>
            {news.map((item, i) => (
              <span key={i} className="mr-10">
                <strong>{item.tribe}:</strong> {item.headline}
              </span>
            ))}
          </span>
        </motion.div>
      </div>

      {/* ðŸ”¥ Dopamine Glow Bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px] transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, ${glowColor} 0%, transparent 100%)`,
          boxShadow: `0 0 ${10 + dopamine / 5}px ${glowColor}`,
        }}
      ></div>
    </div>
  );
}

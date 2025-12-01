// ============================================================
// ðŸ’Ž Core4.AI â€“ NewsTicker.jsx (Stable v28)
// ------------------------------------------------------------
// Handles missing or undefined API data gracefully.
// ============================================================

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function NewsTicker() {
  const [news, setNews] = useState([]);
  const [mood, setMood] = useState({ mood: "neutral", emoji: "ðŸŒ¤", trend: "stable" });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
    fetchMood();
    const interval = setInterval(() => {
      fetchNews();
      fetchMood();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchNews() {
    try {
      const res = await axios.get(`${API}/market/news`);
      setNews(res.data || []);
    } catch (err) {
      console.error("âš ï¸ News fetch error:", err);
      setError("Failed to load news.");
    }
  }

  async function fetchMood() {
    try {
      const res = await axios.get(`${API}/market/mood`);
      setMood(res.data || { mood: "neutral", emoji: "ðŸŒ¤", trend: "stable" });
    } catch (err) {
      console.error("âš ï¸ Mood fetch error:", err);
      setMood({ mood: "neutral", emoji: "ðŸŒ¤", trend: "stable" });
    }
  }

  const safeMood = mood?.mood?.toUpperCase?.() || "NEUTRAL";

  return (
    <div className="w-full bg-black/60 text-sm text-gray-300 px-3 py-2 flex justify-between">
      <div className="flex gap-4 items-center">
        <span>ðŸ§  <strong>Market Mood:</strong> {safeMood} {mood.emoji}</span>
        <span className="text-green-400">Trend: {mood.trend}</span>
      </div>
      <marquee scrollamount="4" className="text-yellow-300">
        {news.length
          ? news.map((n) => `${n.headline} (${n.impact})`).join(" â€¢ ")
          : "Loading Core4.AI sentiment updates..."}
      </marquee>
    </div>
  );
}

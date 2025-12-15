import React, { useState, useCallback } from "react";
import axios from "axios";
import useLivePulse from "@/hooks/useLivePulse";

const API_BASE = "http://127.0.0.1:8000";

export default function TribeMoodBar() {
  const [moods, setMoods] = useState([]);

  const fetchMoods = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/market/emotion_value_index`);
      setMoods(res.data);
    } catch (err) {
      console.error("Mood refresh error:", err);
    }
  }, []);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â auto-refresh every 10 s
  useLivePulse(fetchMoods, 10000);

  return (
    <div className="flex justify-center items-center gap-4 bg-black/30 backdrop-blur-lg px-4 py-2 rounded-xl text-sm">
      {moods.map((m) => (
        <div key={m.tribe} className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full animate-pulse ${
              m.correlation_hint === "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ"
                ? "bg-green-500"
                : m.correlation_hint === "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“"
                ? "bg-red-500"
                : "bg-yellow-400"
            }`}
          ></span>
          <span>{m.tribe}</span>
          <span className="opacity-70">({Math.round(m.mpi)})</span>
        </div>
      ))}
    </div>
  );
}


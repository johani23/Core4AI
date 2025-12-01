// ============================================================
// ðŸ’Ž CouncilInsights.jsx â€“ MVP-82.8 â€œProphetic Insightsâ€
// ------------------------------------------------------------
// Displays AI dream interpretations and confidence levels
// ============================================================

import React, { useEffect, useState } from "react";

export default function CouncilInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/council/insights");
      const data = await res.json();
      setInsights(data.insights || []);
    };
    fetchInsights();
    const interval = setInterval(fetchInsights, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl text-purple-400 font-bold mb-6">
        ðŸ”® Council Prophetic Insights
      </h1>
      {insights.slice().reverse().map((i, idx) => (
        <div key={idx}
          className="mb-4 p-4 rounded-lg bg-gray-900/70 border border-purple-400/40">
          <div className="text-xs text-gray-400 mb-2">
            {new Date(i.time).toLocaleString()} â€¢ Confidence {i.confidence}
          </div>
          <div className="text-lg text-purple-200 font-medium mb-2">
            {i.summary}
          </div>
          {i.symbols?.length > 0 && (
            <div className="text-sm text-gray-400">
              Symbols: {i.symbols.join(" ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

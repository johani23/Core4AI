// ============================================================================
// 💡 SmartFeed.jsx — Phase 5 Updated (Basic Insights)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function SmartFeed() {
  const { generatePredictiveAdvice } = useInfluence();

  const insights = generatePredictiveAdvice();

  if (!insights || insights.length === 0) return null;

  return (
    <div
      className="bg-white/5 border border-white/10 p-5 rounded-xl mt-6"
      dir="rtl"
    >
      <h2 className="text-lg font-bold text-purple-300 mb-3">
        توصيات Core4 الذكية 💡
      </h2>

      <ul className="space-y-3">
        {insights.map((msg, i) => (
          <li
            key={i}
            className="bg-white/5 px-4 py-3 rounded-lg border border-white/10 text-sm text-gray-200"
          >
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

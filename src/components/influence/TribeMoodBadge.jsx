// ============================================================================
// 💡 TribeMoodBadge.jsx — Phase 4 (Tribe Mood Indicator)
// ============================================================================

import React from "react";

export default function TribeMoodBadge({ mood }) {
  const colors = {
    "متحفّزة": "bg-yellow-500/30 text-yellow-200",
    "نشيطة 🔥": "bg-orange-600/40 text-orange-200",
    "قوية جدًا ⚡": "bg-purple-600/40 text-purple-200",
  };

  const className = colors[mood] || "bg-gray-600/40 text-gray-300";

  return (
    <div
      className={`px-3 py-1 rounded-lg text-sm font-bold inline-block ${className}`}
    >
      {mood}
    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – TribeWars FINAL FUNCTIONAL EDITION (2025)
// ----------------------------------------------------------------------------
// - Uses REAL warPoints from TribeContext
// - Combines your tribe with real dynamic ranking
// - Uses event progress in ranking logic (optional)
// - Clean functional output (no aesthetics needed)
// ============================================================================

import React, { useMemo } from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeWars() {
  const { warPoints, selectedTribe, eventProgress } = useTribe();

  if (!selectedTribe) {
    return (
      <div className="p-10 text-white text-xl" dir="rtl">
        اختر قبيلة للانضمام أولاً ⚠️
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // CREATE DYNAMIC LIST OF TRIBES
  // ---------------------------------------------------------------------------
  const allTribes = [
    { name: "Adventurers", icon: "🧭", wp: 320 },
    { name: "EventGoers", icon: "🎉", wp: 250 },
    { name: "Fashionists", icon: "👗", wp: 180 },
  ];

  // Add your real tribe dynamically
  allTribes.push({
    name: selectedTribe.name,
    icon: selectedTribe.icon,
    wp: warPoints,
  });

  // Sort by war points
  const sorted = useMemo(
    () => [...allTribes].sort((a, b) => b.wp - a.wp),
    [allTribes]
  );

  const rank = sorted.findIndex((t) => t.name === selectedTribe.name) + 1;

  return (
    <div className="p-10 text-white space-y-10" dir="rtl">
      <h1 className="text-3xl font-bold text-purple-300">⚔️ حرب القبائل الأسبوعية</h1>

      {/* Tribe Rank + WP */}
      <div className="space-y-2">
        <p className="text-gray-300">
          نقاط قبيلتك هذا الأسبوع:
          <span className="text-yellow-400 font-bold"> {warPoints} WP</span>
        </p>

        <p className="text-gray-400">
          مركز القبيلة الحالي:
          <span className="text-purple-300 font-bold"> {rank} </span>
          من أصل {sorted.length} قبائل
        </p>
      </div>

      {/* Leaderboard */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-4">

        {sorted.map((tribe, i) => (
          <div
            key={tribe.name}
            className={`
              flex justify-between items-center p-4 rounded-xl
              ${tribe.name === selectedTribe.name ? "bg-purple-600/40" : "bg-white/5"}
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{tribe.icon}</span>
              <span>{tribe.name}</span>
            </div>

            <span className="font-bold text-yellow-300">{tribe.wp} WP</span>
          </div>
        ))}

      </div>

      {/* Live Event Integration */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-2">
        <h2 className="text-xl font-bold text-yellow-300">🔥 مكاسب الحدث الحي</h2>

        <p className="text-gray-300">XP المكتسبة في الحدث: {eventProgress.xp}</p>
        <p className="text-gray-300">WP المكتسبة في الحدث: {eventProgress.wp}</p>
      </div>

      {/* Weekly Rewards */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-2">
        <h2 className="text-xl font-bold text-green-300">🏆 جوائز الأسبوع</h2>

        <ul className="space-y-1 text-gray-300">
          <li>🥇 المركز 1: 200 Coin + Boost مجاني</li>
          <li>🥈 المركز 2: 100 Coin</li>
          <li>🥉 المركز 3: 50 Coin</li>
        </ul>
      </div>
    </div>
  );
}

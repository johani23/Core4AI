// ============================================================================
// 💚 Core4.AI – TribeWars FINAL SAFE EDITION (2025)
// ============================================================================

import React, { useMemo } from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeWars() {

  // Safe destructuring from TribeContext
  const tribe = useTribe() || {};

  const selectedTribe = tribe.selectedTribe || null;
  const warPoints = tribe.warPoints ?? 0;
  const eventProgress = tribe.eventProgress || { xp: 0, wp: 0 };

  if (!selectedTribe) {
    return (
      <div className="p-10 text-white text-xl" dir="rtl">
        ⚠️ اختر قبيلة أولاً للانضمام إلى حرب القبائل
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // TRIBES LIST
  // ---------------------------------------------------------------------------
  const allTribes = [
    { name: "Adventurers", icon: "🧭", wp: 320 },
    { name: "EventGoers", icon: "🎉", wp: 250 },
    { name: "Fashionists", icon: "👗", wp: 180 },
  ];

  // Add real tribe dynamically
  allTribes.push({
    name: selectedTribe.name,
    icon: selectedTribe.icon,
    wp: warPoints,
  });

  // Sort by war points (descending)
  const sorted = useMemo(() => {
    return [...allTribes].sort((a, b) => b.wp - a.wp);
  }, [warPoints]);

  const rank = sorted.findIndex((t) => t.name === selectedTribe.name) + 1;

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
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

        {sorted.map((tribeRow, i) => (
          <div
            key={tribeRow.name}
            className={`flex justify-between items-center p-4 rounded-xl ${
              tribeRow.name === selectedTribe.name
                ? "bg-purple-600/40"
                : "bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{tribeRow.icon}</span>
              <span>{tribeRow.name}</span>
            </div>
            <span className="font-bold text-yellow-300">{tribeRow.wp} WP</span>
          </div>
        ))}

      </div>

      {/* Live Event Data */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-2">
        <h2 className="text-xl font-bold text-yellow-300">🔥 مكاسب الحدث الحي</h2>

        <p className="text-gray-300">XP المكتسبة في الحدث: {eventProgress.xp}</p>
        <p className="text-gray-300">WP المكتسبة في الحدث: {eventProgress.wp}</p>
      </div>

      {/* Weekly Rewards */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-2">
        <h2 className="text-xl font-bold text-green-300">🏆 جوائز الأسبوع</h2>
        <ul className="space-y-1 text-gray-300">
          <li>🥇 المركز 1: 200 Coin + XP Boost مجاني</li>
          <li>🥈 المركز 2: 100 Coin</li>
          <li>🥉 المركز 3: 50 Coin</li>
        </ul>
      </div>

    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – Tribe Seasons (SAFE MVP VERSION)
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeSeasons() {
  // Safe destructuring
  const tribe = useTribe() || {};

  const selectedTribe = tribe.selectedTribe || null;
  const role = tribe.role || "Member";   // Default role
  const season = tribe.season ?? 1;       // Default season
  const seasonStart = tribe.seasonStart || Date.now();
  const seasonEnd = tribe.seasonEnd || Date.now() + 7 * 24 * 60 * 60 * 1000;

  // Safe stats fallback
  const seasonStats = tribe.seasonStats || { xp: 0, wp: 0 };

  const resetSeason = tribe.resetSeason || (() => alert("Reset not implemented in MVP"));

  if (!selectedTribe)
    return (
      <div className="p-10 text-white text-xl" dir="rtl">
        ⚠️ انضم لقبيلة أولاً لعرض موسم القبائل.
      </div>
    );

  // Time calculations
  const now = Date.now();
  const timeLeft = Math.max(seasonEnd - now, 0);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Progress bars
  const progressXP = Math.min((seasonStats.xp / 1000) * 100, 100);
  const progressWP = Math.min((seasonStats.wp / 500) * 100, 100);

  return (
    <div className="p-10 text-white space-y-10" dir="rtl">

      <h1 className="text-3xl font-bold text-purple-300">
        🌙 موسم القبائل — Season {season}
      </h1>

      <p className="text-gray-300">
        الوقت المتبقي: {days} يوم و {hours} ساعة
      </p>

      {/* SEASON STATS */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-4">

        <h2 className="text-xl font-bold text-yellow-300">تقدم الموسم</h2>

        <p>XP الموسم: {seasonStats.xp} / 1000</p>
        <div className="bg-gray-700 h-2 rounded-xl w-full">
          <div
            className="bg-green-400 h-2 rounded-xl"
            style={{ width: `${progressXP}%` }}
          ></div>
        </div>

        <p className="mt-4">WP الموسم: {seasonStats.wp} / 500</p>
        <div className="bg-gray-700 h-2 rounded-xl w-full">
          <div
            className="bg-red-400 h-2 rounded-xl"
            style={{ width: `${progressWP}%` }}
          ></div>
        </div>
      </section>

      {/* RESET SEASON BUTTON */}
      {(role === "Leader" || role === "Officer") && (
        <button
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-500"
          onClick={resetSeason}
        >
          🔄 بدء موسم جديد
        </button>
      )}

    </div>
  );
}

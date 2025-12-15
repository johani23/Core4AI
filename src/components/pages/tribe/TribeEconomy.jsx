// ============================================================================
// 💸 Core4.AI – Tribe Economy Center (FINAL FUNCTIONAL EDITION)
// ----------------------------------------------------------------------------
// Uses REAL variables from TribeContext FINAL:
// - coins
// - treasury
// - contribution
// - warPoints
// - upgrades
// - eventProgress
// ----------------------------------------------------------------------------
// No aesthetics, only clear functional display.
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeEconomy() {
  const {
    coins,
    treasury,
    contribution,
    warPoints,
    upgrades,
    eventProgress,
    liveEvent,
  } = useTribe();

  return (
    <div className="text-white p-10 space-y-10" dir="rtl">

      <h1 className="text-3xl font-bold text-purple-300">
        اقتصاد القبيلة 💰
      </h1>

      {/* USER ECONOMY */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl text-yellow-300 font-bold">رصيدك الشخصي</h2>

        <p className="text-gray-300">
          🪙 Coins: <span className="text-green-400 font-bold">{coins}</span>
        </p>

        <p className="text-gray-300">
          🎖️ مساهمتك (Contribution):{" "}
          <span className="text-blue-400 font-bold">{contribution}</span>
        </p>

        <p className="text-gray-300">
          ⚔️ نقاط الحرب (War Points):{" "}
          <span className="text-red-400 font-bold">{warPoints}</span>
        </p>
      </section>

      {/* TRIBE ECONOMY */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl text-purple-300 font-bold">اقتصاد القبيلة</h2>

        <p className="text-gray-300">
          💰 خزنة القبيلة (Treasury):{" "}
          <span className="text-purple-400 font-bold">{treasury}</span>
        </p>

        <p className="text-gray-300">
          💎 مستوى ترقية القبيلة:{" "}
          <span className="text-pink-300 font-bold">{upgrades.tribeLevel.level}</span>
        </p>
      </section>

      {/* LIVE EVENT ECONOMY */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl text-green-300 font-bold">الحدث الحي (إن وجد)</h2>

        {liveEvent?.active ? (
          <>
            <p className="text-gray-300">
              🔥 الحدث الجاري: {liveEvent.name}
            </p>
            <p className="text-gray-300">
              XP المكتسبة خلال الحدث:{" "}
              <span className="text-green-400 font-bold">{eventProgress.xp}</span>
            </p>
            <p className="text-gray-300">
              WP المكتسبة خلال الحدث:{" "}
              <span className="text-red-400 font-bold">{eventProgress.wp}</span>
            </p>
          </>
        ) : (
          <p className="text-gray-400">لا يوجد حدث نشط</p>
        )}
      </section>

      {/* UPGRADE OVERVIEW */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl text-cyan-300 font-bold">الترقيات المتاحة</h2>

        <ul className="text-gray-300 space-y-2 text-sm">
          <li>⚡ XP Boost All — مستوى: {upgrades.xpBoostAll.level}</li>
          <li>🔥 XP Boost Challenges — مستوى: {upgrades.xpBoostChallenges.level}</li>
          <li>🪙 Coin Boost — مستوى: {upgrades.coinBoost.level}</li>
          <li>🌿 Theme Unlock — مستوى: {upgrades.unlockTheme.level}</li>
          <li>📅 Weekly Challenge+ — مستوى: {upgrades.extraWeeklyChallenge.level}</li>
        </ul>
      </section>

    </div>
  );
}

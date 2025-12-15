// ============================================================================
// 💚 Core4.AI – TribeChallenges PRO (FINAL v4 – 2025)
// ----------------------------------------------------------------------------
// - Daily / Weekly / Milestones Challenges
// - XP calculation with Boosts (xpBoostMultiplier)
// - Calls completeChallenge() + addXP()
// - Safe against missing upgrades object
// - Clean UI + RTL + Smooth Animations
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useTribe } from "@/context/TribeContext";

export default function TribeChallengesPRO({ theme }) {
  const { completeChallenge, addXP, upgrades, completedChallenges } = useTribe();

  // ---------------------------------------------------------------------------
  // XP BOOST MULTIPLIER (safe fallback)
  // ---------------------------------------------------------------------------

  const xpBoostMultiplier =
    upgrades?.xpBoostChallenges?.level > 0
      ? 1 + upgrades.xpBoostChallenges.effect * upgrades.xpBoostChallenges.level
      : 1;

  // ---------------------------------------------------------------------------
  // DEFINING CHALLENGE CATEGORIES
  // ---------------------------------------------------------------------------

  const daily = [
    { id: "d1", title: "انشر منشوراً داخل القبيلة", reward: 15 },
    { id: "d2", title: "تفاعل مع 3 منشورات", reward: 10 },
    { id: "d3", title: "أضف GIF أو صورة", reward: 15 },
  ];

  const weekly = [
    { id: "w1", title: "اكسب 100 XP هذا الأسبوع", reward: 40 },
    { id: "w2", title: "أكمل 5 تحديات يومية", reward: 50 },
    { id: "w3", title: "شارك في استطلاع قبلي", reward: 25 },
  ];

  const milestones = [
    { id: "m1", title: "وصل إلى رتبة Pathfinder", reward: 100 },
    { id: "m2", title: "جمع 300 XP داخل القبيلة", reward: 200 },
  ];

  // ---------------------------------------------------------------------------
  // CHALLENGE CARD COMPONENT
  // ---------------------------------------------------------------------------

  function ChallengeCard({ c }) {
    const isDone = completedChallenges?.includes(c.id);

    function complete() {
      if (isDone) return; // prevent double claiming

      const boosted = Math.floor(c.reward * xpBoostMultiplier);
      completeChallenge(c.id);
      addXP(boosted);
    }

    return (
      <motion.div
        className={`p-5 rounded-xl bg-white/5 border border-white/10 shadow-md transition
          ${isDone ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white font-semibold text-sm">{c.title}</p>

            <p className="text-gray-400 text-xs mt-1">
              مكافأة:{" "}
              <span style={{ color: theme?.primary || "#a855f7" }}>
                {Math.floor(c.reward * xpBoostMultiplier)} XP
              </span>
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={complete}
            disabled={isDone}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold text-white transition ${
              isDone ? "bg-gray-600" : ""
            }`}
            style={{
              backgroundColor: isDone ? "#444" : theme?.primary || "#9333ea",
            }}
          >
            {isDone ? "مكتمل" : "إكمال"}
          </button>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER SECTION
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-10" dir="rtl">

      {/* DAILY */}
      <section>
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: theme?.primary || "#a855f7" }}
        >
          🔥 التحديات اليومية
        </h2>

        <div className="space-y-3">
          {daily.map((c) => (
            <ChallengeCard key={c.id} c={c} />
          ))}
        </div>
      </section>

      {/* WEEKLY */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-blue-300">
          🌙 التحديات الأسبوعية
        </h2>

        <div className="space-y-3">
          {weekly.map((c) => (
            <ChallengeCard key={c.id} c={c} />
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-pink-300">
          🏆 إنجازات (Milestones)
        </h2>

        <div className="space-y-3">
          {milestones.map((c) => (
            <ChallengeCard key={c.id} c={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

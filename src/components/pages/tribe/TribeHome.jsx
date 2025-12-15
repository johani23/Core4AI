// ============================================================================
// 💚 Core4.AI – TribeHome PRO FINAL v7.3
// ----------------------------------------------------------------------------
// - Fully connected to TribeContext Lifecycle Engine
// - Spot → Assess → Develop → Recruit → Motivate (LIVE & dynamic)
// - XP, Challenges, Feed, Events all update lifecycle automatically
// - FINAL UI placement for TribeLifecycleProgress
// - RTL-safe layout
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useTribe } from "@/context/TribeContext";

// Components
import TribeRankBadge from "./components/TribeRankBadge";
import TribeXPBar from "./components/TribeXPBar";
import TribeChallengesPRO from "./components/TribeChallengesPRO";
import TribeFeedPRO from "./components/TribeFeedPRO";
import TribeSidebar from "./components/TribeSidebar";
import TribeTopBar from "./components/TribeTopBar";
import TribeLifecycleProgress from "./components/TribeLifecycleProgress";

import { tribeThemes } from "./theme";

export default function TribeHome() {
  const {
    tribes,
    selectedTribe,
    joinTribe,

    // NEW LIFECYCLE ENGINE DATA
    lifecycleStage,
    lifecycleProgress,
    talentScore,

    addXP,
    liveEvent,
  } = useTribe();

  // ---------------------------------------------------------------------------
  // 1) TRIBE SELECTION SCREEN
  // ---------------------------------------------------------------------------

  if (!selectedTribe) {
    return (
      <div
        className="min-h-screen p-10 flex flex-col items-center"
        dir="rtl"
        style={{
          background:
            "radial-gradient(circle at top, #ffffff10, #0f0f0f 70%)",
        }}
      >
        <motion.h1
          className="text-4xl font-bold text-purple-300 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          اختر قبيلتك 🔥
        </motion.h1>

        <p className="text-gray-400 mb-10">
          كل قبيلة تمثل طاقة، أسلوب، ورغبة… اختر العالم الذي تنتمي إليه.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tribes.map((t) => (
            <motion.div
              key={t.id}
              onClick={() => joinTribe(t)}
              className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 
                         p-8 rounded-3xl hover:border-purple-400 hover:bg-white/20 transition shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-6xl mb-4">{t.icon}</div>
              <h2 className="text-2xl font-bold text-purple-200 mb-2">{t.name}</h2>
              <p className="text-gray-300 text-sm">الأعضاء: {t.members}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2) APPLY THEME
  // ---------------------------------------------------------------------------
  const theme = tribeThemes[selectedTribe.name] || tribeThemes.Techy;

  // ---------------------------------------------------------------------------
  // 3) MAIN TRIBE HOME
  // ---------------------------------------------------------------------------
  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ background: theme.bg }}
    >
      {/* TOP BAR */}
      <div className="px-6 pt-10" dir="rtl">
        <TribeTopBar theme={theme} />
      </div>

      {/* LIVE EVENT BANNER */}
      {liveEvent?.active && (
        <div
          className="mx-6 mt-4 bg-purple-700/30 border border-purple-500 
                     p-4 rounded-2xl text-center text-yellow-300 
                     font-bold shadow-lg animate-pulse"
          dir="rtl"
        >
          🔥 حدث حي جارٍ: {liveEvent.name} — مكافأة XP +{liveEvent.xpBonus * 100}%
        </div>
      )}

      {/* SIDEBAR + CONTENT */}
      <div className="flex flex-row-reverse gap-10 px-6 pb-12 pt-6 min-h-screen">

        {/* SIDEBAR */}
        <div dir="ltr">
          <TribeSidebar theme={theme} />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-12" dir="rtl">

          {/* HEADER */}
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1
                className="text-4xl font-bold drop-shadow-lg flex items-center gap-3"
                style={{ color: theme.primary }}
              >
                قبيلة {selectedTribe.name} {selectedTribe.icon}
              </h1>

              <p className="text-gray-300 mt-1">
                رحلتك نحو التأثير تبدأ من هنا ✨  
              </p>

              {/* TALENT SCORE (optional) */}
              <p className="text-sm text-purple-300 mt-1">
                ⚡ مستوى الموهبة: {talentScore}
              </p>
            </div>

            <TribeRankBadge theme={theme} />
          </motion.div>

          {/* XP BAR + LIFECYCLE PROGRESS */}
          <motion.div
            className="bg-white/10 border border-white/20 p-8 rounded-3xl shadow-xl backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* XP BAR */}
            <TribeXPBar theme={theme} />

            {/* LIFECYCLE PROGRESS (LIVE) */}
            <div className="mt-10">
              <TribeLifecycleProgress
                currentStage={lifecycleStage}
                progress={lifecycleProgress}
              />
            </div>
          </motion.div>

          {/* CHALLENGES + FEED */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* CHALLENGES PRO */}
            <motion.div
              className="p-8 rounded-3xl shadow-xl backdrop-blur-xl"
              style={{
                background: `linear-gradient(to bottom right, ${theme.primary}33, ${theme.secondary}22)`
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <TribeChallengesPRO theme={theme} />
            </motion.div>

            {/* FEED PRO */}
            <motion.div
              className="p-8 rounded-3xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <TribeFeedPRO theme={theme} />
            </motion.div>
          </div>

          {/* XP BOOST BUTTONS */}
          <motion.div
            className="p-6 mx-auto max-w-xl rounded-xl border backdrop-blur-xl text-center"
            style={{ borderColor: theme.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: theme.primary }}
            >
              أدوات التطوير (XP Boost)
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => addXP(10)}
                className="px-4 py-2 rounded-lg shadow"
                style={{ backgroundColor: theme.primary }}
              >
                XP 10+
              </button>

              <button
                onClick={() => addXP(50)}
                className="px-4 py-2 rounded-lg shadow"
                style={{ backgroundColor: theme.primary }}
              >
                XP 50+
              </button>

              <button
                onClick={() => addXP(100)}
                className="px-4 py-2 rounded-lg shadow"
                style={{ backgroundColor: theme.primary }}
              >
                XP 100+
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – TribeRecruitment Board PRO (2025 Edition)
// ----------------------------------------------------------------------------
// - Shows all tribe members sorted by lifecycle readiness
// - Uses lifecycleStage + lifecycleProgress + talentScore + XP
// - Merchants & Influencers can browse candidates
// ============================================================================

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTribe } from "@/context/TribeContext";

export default function TribeRecruitmentBoard() {
  const {
    members,
    lifecycleStage,
    computeLifecycleFromXP,
    selectedTribe,
  } = useTribe();

  const candidates = useMemo(() => {
    return members.map((m) => {
      const { stage, progress } = computeLifecycleFromXP(m.xp || 0);
      const talentScore = Math.floor(m.xp / 10 + progress);

      return {
        ...m,
        stage,
        progress,
        talentScore,
      };
    }).sort((a, b) => b.talentScore - a.talentScore);
  }, [members]);

  const stageColors = {
    spot: "text-gray-400",
    assess: "text-blue-300",
    develop: "text-yellow-300",
    recruit: "text-green-400",
    motivate: "text-purple-400",
  };

  const stageLabels = {
    spot: "Spot – اكتشاف",
    assess: "Assess – تقييم",
    develop: "Develop – تطوير",
    recruit: "Recruit – جاهز للتجنيد",
    motivate: "Motivate – نجم القبيلة",
  };

  return (
    <div
      className="min-h-screen p-10 text-white space-y-10"
      dir="rtl"
      style={{
        background: "radial-gradient(circle at top, #111, #0a0a0a 60%)",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-purple-300">
            قائمة المرشحين – {selectedTribe?.name} {selectedTribe?.icon}
          </h1>
          <p className="text-gray-400 mt-1">أفضل أعضاء القبيلة استعدادًا للتجنيد</p>
        </div>
      </div>

      {/* CANDIDATES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {candidates.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-xl shadow-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://i.pravatar.cc/150?u=${c.id}`}
                className="w-16 h-16 rounded-full border border-white/20"
              />
              <div>
                <p className="text-xl font-bold">{c.name}</p>
                <p className="text-gray-300 text-sm">{c.role}</p>
              </div>
            </div>

            {/* STAGE */}
            <p className={`mt-4 font-bold ${stageColors[c.stage]}`}>
              المرحلة: {stageLabels[c.stage]}
            </p>

            {/* XP + Talent */}
            <p className="text-gray-300 mt-1">
              XP: <span className="text-green-300">{c.xp}</span>
            </p>
            <p className="text-gray-300 mt-1">
              Talent Score: <span className="text-yellow-300">{c.talentScore}</span>
            </p>

            {/* PROGRESS BAR */}
            <div className="mt-3 w-full bg-white/10 h-2 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.progress}%` }}
                className="h-full bg-green-400 rounded-full"
              />
            </div>

            {/* RECRUIT BUTTON */}
            <button className="mt-5 bg-purple-600 hover:bg-purple-500 w-full py-2 rounded-xl font-bold shadow-lg">
              🚀 تجنيد هذا العضو
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

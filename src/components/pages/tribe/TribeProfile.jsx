// ============================================================================
// 💚 Core4.AI – TribeProfile FINAL PRO v4 (2025)
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTribe } from "@/context/TribeContext";
import TribeLifecycleProgress from "./components/TribeLifecycleProgress";
import { tribeThemes } from "./theme";

export default function TribeProfile() {
  const navigate = useNavigate();
  const {
    selectedTribe,
    role,
    members,
    coins,
    treasury,
    contribution,
    lifecycleStage,
    lifecycleProgress,
    talentScore,
    xp,
    rank,
  } = useTribe();

  if (!selectedTribe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl" dir="rtl">
        لم يتم اختيار قبيلة بعد…
      </div>
    );
  }

  const theme = tribeThemes[selectedTribe.name] || tribeThemes.Techy;

  const values = ["الولاء القبلي", "التطوير المستمر", "الجرأة في التعبير", "المنافسة الشريفة"];

  const badges = [
    { name: "🔥 Founder", color: theme.primary },
    { name: "⚔️ Challenge Master", color: "#9333ea" },
    { name: "⭐ Elite Member", color: "#FFD447", text: "#000" },
  ];

  const rules = [
    "الاحترام بين أعضاء القبيلة إلزامي",
    "التفاعل الأسبوعي مطلوب للحفاظ على الرتبة",
    "يمنع نشر روابط خارجية بدون إذن",
    "التحديات الخاصة بإدارة القائد أو الضباط",
  ];

  return (
    <div
      className="p-10 text-white space-y-10"
      dir="rtl"
      style={{
        background: theme.bg,
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <motion.div
        className="bg-white/10 border border-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-xl flex items-center gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl">{selectedTribe.icon}</div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold drop-shadow-lg" style={{ color: theme.primary }}>
            قبيلة {selectedTribe.name}
          </h1>

          <p className="text-gray-300 mt-2">الهوية الرسمية للقبيلة</p>

          <p className="text-gray-400 text-sm mt-2">
            دورك الحالي: <span className="text-purple-300">{role}</span>
          </p>
        </div>

        {/* Tribe Level */}
        <div
          className="px-6 py-3 rounded-xl shadow-lg text-center"
          style={{ backgroundColor: theme.primary, color: "#fff" }}
        >
          <p className="text-sm">مستوى القبيلة</p>
          <p className="text-3xl font-bold">1</p>
        </div>
      </motion.div>

      {/* JOURNEY + TALENT */}
      <motion.section
        className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
          🚀 رحلتك داخل القبيلة
        </h2>

        <div className="space-y-6">
          <TribeLifecycleProgress currentStage={lifecycleStage} progress={lifecycleProgress} />

          <div className="bg-black/20 border border-white/20 p-4 rounded-2xl text-center">
            <p className="text-sm text-purple-300">مؤشر الموهبة (Talent Score)</p>
            <p className="text-4xl font-bold text-yellow-300 mt-1">{talentScore}</p>

            <p className="text-sm text-gray-400 mt-2">
              XP: {xp} | رتبتك: {rank}
            </p>
          </div>
        </div>
      </motion.section>

      {/* VALUES */}
      <motion.section
        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.secondary }}>
          🌿 قيم القبيلة
        </h2>
        <div className="flex flex-wrap gap-3">
          {values.map((v, i) => (
            <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm">
              {v}
            </span>
          ))}
        </div>
      </motion.section>

      {/* BADGES */}
      <motion.section
        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
          🏅 شاراتك داخل القبيلة
        </h2>
        <div className="flex flex-wrap gap-3">
          {badges.map((b, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{ backgroundColor: b.color, color: b.text || "#fff" }}
            >
              {b.name}
            </span>
          ))}
        </div>
      </motion.section>

      {/* MEMBERS */}
      <motion.section
        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
          👥 أعضاء القبيلة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${m.id}`}
                  className="w-14 h-14 rounded-full border border-white/20"
                />
                <div>
                  <p className="font-bold">{m.name}</p>
                  <p className="text-gray-300 text-sm">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ECONOMY */}
      <motion.section
        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">💰 اقتصاد القبيلة</h2>

        <p>رصيدك: <span className="text-green-400">{coins} Coin</span></p>
        <p>مساهمتك: <span className="text-blue-400">{contribution}</span></p>
        <p>خزنة القبيلة: <span className="text-purple-300">{treasury} Coin</span></p>
      </motion.section>

      {/* RULES */}
      <motion.section
        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-red-300">📜 قوانين القبيلة</h2>
        <ul className="space-y-2 text-gray-300">
          {rules.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </motion.section>

      {/* INVITE BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(`/invite/${selectedTribe.name}`)}
          className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-2xl text-lg font-bold shadow-lg shadow-purple-600/40"
        >
          🔗 دعوة عضو جديد
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 💜 Core4.AI – CreatorHome PRO v5 (2025)
// - CreatorLayout integrated (Sidebar + Page Content)
// - XP bar + Rank
// - Hybrid Analytics (Studio style)
// - Creator Missions (Gamified)
// - CollabMode button
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useCreator } from "@/context/CreatorContext";
import { useNavigate } from "react-router-dom";
import CreatorLayout from "./CreatorLayout";

export default function CreatorHome() {
  const navigate = useNavigate();
  const { creatorXP, creatorRank, creatorPosts, missions, addCreatorXP } = useCreator();

  const insights = {
    views: creatorPosts.reduce((s, p) => s + (p.views || 0), 0),
    likes: creatorPosts.reduce((s, p) => s + (p.likes || 0), 0),
    saves: creatorPosts.reduce((s, p) => s + (p.saves || 0), 0),
  };

  const engagementRate =
    insights.views > 0 ? ((insights.likes + insights.saves) / insights.views) * 100 : 0;

  return (
    <CreatorLayout>
      <div className="space-y-10">

        {/* HEADER */}
        <motion.div
          className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-xl shadow-xl flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-extrabold text-purple-300 drop-shadow-lg">
              لوحة المؤثر – Creator Dashboard
            </h1>
            <p className="text-gray-300 mt-2">تحليل الأداء – تطوير – فرص التعاون</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-purple-200">الرتبة</p>
            <p className="text-3xl font-bold text-yellow-300">{creatorRank}</p>
          </div>
        </motion.div>

        {/* COLLAB BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/creator/collabs")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white shadow-lg"
          >
            🤝 فرص التعاون
          </button>
        </div>

        {/* XP BAR */}
        <motion.div
          className="bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="font-bold text-lg text-purple-200">خبرتك (Creator XP)</p>

          <div className="w-full bg-white/20 rounded-full h-3 mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(creatorXP % 100) || 0}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-purple-400 to-yellow-300"
            />
          </div>

          <p className="text-sm text-gray-300 mt-2">{creatorXP} XP</p>
        </motion.div>

        {/* ANALYTICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard label="المشاهدات" value={insights.views} color="text-yellow-300" />
          <AnalyticsCard label="الإعجابات" value={insights.likes} color="text-green-300" />
          <AnalyticsCard label="الحفظ" value={insights.saves} color="text-blue-300" />
        </section>

        {/* ENGAGEMENT RATE */}
        <motion.div
          className="bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg font-bold text-purple-200">معدل التفاعل</p>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {engagementRate.toFixed(1)}%
          </p>
        </motion.div>

        {/* MISSIONS */}
        <motion.section
          className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-purple-300">🎯 مهام المؤثر اليومية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((m) => (
              <div
                key={m.id}
                className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{m.title}</p>
                  <p className="text-sm text-gray-400">XP +{m.reward}</p>
                </div>

                <button
                  onClick={() => addCreatorXP(m.reward)}
                  className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-500"
                >
                  إكمال
                </button>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </CreatorLayout>
  );
}

function AnalyticsCard({ label, value, color }) {
  return (
    <motion.div
      className="bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-lg font-bold">{label}</p>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
    </motion.div>
  );
}

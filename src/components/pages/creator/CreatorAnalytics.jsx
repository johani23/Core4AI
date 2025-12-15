// ============================================================================
// 💜 Core4.AI – CreatorAnalytics FINAL PRO v3 (2025)
// Wrapped in CreatorLayout + Unified Theme
// ============================================================================

import React from "react";
import { useCreator } from "@/context/CreatorContext";
import { motion } from "framer-motion";
import CreatorLayout from "./CreatorLayout";

export default function CreatorAnalytics() {
  const { creatorPosts } = useCreator();

  const views  = creatorPosts.reduce((s, p) => s + (p.views  || 0), 0);
  const likes  = creatorPosts.reduce((s, p) => s + (p.likes  || 0), 0);
  const saves  = creatorPosts.reduce((s, p) => s + (p.saves  || 0), 0);

  const engagement =
    views > 0 ? (((likes + saves) / views) * 100).toFixed(1) : 0;

  return (
    <CreatorLayout>
      <div
        className="p-10 min-h-screen text-white space-y-10"
        dir="rtl"
      >
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-purple-300 mb-4">
          📊 تحليلات الأداء
        </h1>

        {/* TOP CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Box label="المشاهدات" value={views} color="text-yellow-300" />
          <Box label="الإعجابات" value={likes} color="text-green-300" />
          <Box label="الحفظ" value={saves} color="text-blue-300" />
        </section>

        {/* ENGAGEMENT */}
        <motion.div
          className="bg-white/10 p-8 rounded-3xl border border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xl font-bold text-purple-200">معدل التفاعل</p>
          <p className="text-5xl font-bold text-green-400 mt-3">
            {engagement}%
          </p>
        </motion.div>
      </div>
    </CreatorLayout>
  );
}

/* COMPONENTS --------------------------------------------------------------- */

function Box({ label, value, color }) {
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

// ============================================================================
// 💚 Core4.AI — CreatorEarnings PRO (v7 FINAL)
// Revenue Dashboard + Smart AI Insights
// Designed by Sama — Engineered by Noor
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Receipt,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function CreatorEarnings() {
  const [period, setPeriod] = useState("month");

  // MOCK DATA (Later replaced with backend)
  const earningsData = {
    day: { total: 120, ads: 40, offers: 35, sales: 20, tribe: 15, boost: 10 },
    week: { total: 860, ads: 220, offers: 180, sales: 150, tribe: 180, boost: 130 },
    month: { total: 3450, ads: 950, offers: 820, sales: 610, tribe: 690, boost: 380 },
    year: { total: 41200, ads: 11000, offers: 9800, sales: 7100, tribe: 7200, boost: 6100 },
  };

  const current = earningsData[period];

  const sections = [
    { label: "إعلانات", value: current.ads, color: "text-blue-500" },
    { label: "عروض ترويجية", value: current.offers, color: "text-purple-500" },
    { label: "مبيعات مباشرة", value: current.sales, color: "text-green-500" },
    { label: "مكافآت القبيلة", value: current.tribe, color: "text-orange-500" },
    { label: "Boost Rewards", value: current.boost, color: "text-pink-500" },
  ];

  const AI_Suggestions = [
    "قم بتحميل 3 ريلز إضافية هذا الأسبوع لرفع العوائد بنسبة 18%.",
    "استهدف Techy Tribe — لديهم معدل شراء أعلى بـ 27%.",
    "فعّل Boost Plus لمنشورك الأخير لرفع مبيعاته المحتملة.",
  ];

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <div className="mb-10 flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          💰 أرباح المنشئ
        </h1>
        <p className="text-gray-500">
          نظرة شاملة على جميع مصادر الدخل داخل Core4.AI.
        </p>
      </div>

      {/* PERIOD SELECTOR */}
      <div className="mb-10 flex gap-3">
        {["day", "week", "month", "year"].map((t) => (
          <button
            key={t}
            onClick={() => setPeriod(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold 
            ${
              period === t
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            {t === "day"
              ? "اليوم"
              : t === "week"
              ? "هذا الأسبوع"
              : t === "month"
              ? "هذا الشهر"
              : "هذه السنة"}
          </button>
        ))}
      </div>

      {/* TOTAL BOX */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mb-12 border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-700">
            <Wallet size={32} /> إجمالي الأرباح
          </h2>

          <span className="text-3xl font-extrabold text-green-600">
            {current.total} SAR
          </span>
        </div>

        <p className="text-gray-500 mt-2 text-sm">
          جميع مصادر الدخل مدمجة — يتم تحديثها باستمرار.
        </p>
      </motion.div>

      {/* BREAKDOWN SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        {sections.map((sec, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
          >
            <h3
              className={`font-bold text-lg ${sec.color} flex items-center gap-2`}
            >
              <Receipt size={20} /> {sec.label}
            </h3>

            <p className="text-2xl font-extrabold mt-3">{sec.value} SAR</p>
          </motion.div>
        ))}
      </div>

      {/* AI INSIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-50 border border-purple-200 rounded-2xl shadow-inner p-8 max-w-4xl mx-auto mb-12"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Sparkles /> توصيات Core4.AI الذكية لزيادة أرباحك
        </h2>

        <ul className="space-y-3 text-gray-700">
          {AI_Suggestions.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <ArrowUpRight className="text-green-600" /> {s}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* TREND GRAPH PLACEHOLDER */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white border border-gray-300 rounded-2xl p-10 max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <BarChart3 size={22} /> منحنى الأرباح الشهري
        </h2>

        <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
          📈 Graph Placeholder (جاهز لربطه لاحقًا)
        </div>
      </motion.div>
    </div>
  );
}

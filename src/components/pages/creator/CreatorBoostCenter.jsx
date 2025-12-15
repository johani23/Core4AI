// ============================================================================
// ⚡ Core4.AI — CreatorBoostCenter PRO v3 (FINAL)
// Ultra-Premium Boost Engine — Designed by Sama, Engineered by Noor
// Dark Mode + AI Insights + ROI Calculator + Boost History
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Coins,
  Zap,
  Gauge,
  CalendarRange,
  LineChart,
  Sparkles,
  CheckCircle2,
  Rocket,
  History,
} from "lucide-react";

export default function CreatorBoostCenter() {
  const [goal, setGoal] = useState("");
  const [tribe, setTribe] = useState("");
  const [budget, setBudget] = useState(50);
  const [days, setDays] = useState(3);
  const [estimate, setEstimate] = useState(null);
  const [history, setHistory] = useState([]);

  // ========================================================================
  // AI BOOST CALCULATOR
  // ========================================================================

  const calculateBoost = () => {
    if (!goal || !tribe) {
      alert("⚠️ اختر الهدف والقبيلة أولاً!");
      return;
    }

    let reach = budget * 120;
    if (tribe === "techy") reach *= 1.25;
    if (tribe === "fashionists") reach *= 1.15;

    const result = {
      reach: Math.floor(reach),
      followers: Math.floor(reach * 0.009),
      engagement: Math.floor(reach * 0.016),
      roi: Math.floor((reach / budget) * 0.85),
      score: Math.min(100, Math.floor(reach / 2000 + budget / 8 + days * 2)),
      time: new Date().toLocaleString(),
      goal,
      tribe,
      budget,
      days,
    };

    setEstimate(result);
    setHistory((prev) => [result, ...prev]);
  };

  // ========================================================================
  // UI START
  // ========================================================================

  return (
    <div
      className="min-h-screen bg-[#0A0F12] text-white p-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <Rocket className="text-purple-500" /> مركز تعزيز المحتوى (Boost Center)
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          عزّز منشورك باستخدام ذكاء Core4.AI واحصل على توقعات دقيقة قبل الدفع.
        </p>
      </div>

      {/* MAIN WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT PANEL — FORM */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-10">

          {/* GOAL */}
          <div>
            <label className="font-bold text-xl flex items-center gap-2 mb-3">
              <Target className="text-blue-400" /> الهدف
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl p-3 text-white"
            >
              <option value="">اختر الهدف…</option>
              <option value="reach">زيادة الوصول</option>
              <option value="followers">زيادة المتابعين</option>
              <option value="engagement">رفع التفاعل</option>
              <option value="sales">زيادة المبيعات</option>
            </select>
          </div>

          {/* TRIBE */}
          <div>
            <label className="font-bold text-xl flex items-center gap-2 mb-3">
              <Users className="text-green-400" /> القبيلة المستهدفة
            </label>
            <select
              value={tribe}
              onChange={(e) => setTribe(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl p-3 text-white"
            >
              <option value="">بدون تحديد</option>
              <option value="techy">Techy Tribe</option>
              <option value="fashionists">Fashionists</option>
              <option value="event">EventGoers</option>
            </select>
          </div>

          {/* BUDGET */}
          <div>
            <label className="font-bold text-xl flex items-center gap-2 mb-3">
              <Coins className="text-yellow-400" /> الميزانية (SAR)
            </label>
            <input
              type="number"
              min="10"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl p-3 text-white"
            />
          </div>

          {/* DAYS */}
          <div>
            <label className="font-bold text-xl flex items-center gap-2 mb-3">
              <CalendarRange className="text-purple-400" /> المدة بالأيام
            </label>
            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl p-3 text-white"
            />
          </div>

          {/* AI BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-purple-600 hover:bg-purple-700 w-full py-4 rounded-xl text-lg font-bold shadow-lg"
            onClick={calculateBoost}
          >
            🔮 تحليل الذكاء الاصطناعي
          </motion.button>
        </div>

        {/* RIGHT PANEL — ESTIMATE */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gauge className="text-indigo-400" /> التوقعات الذكية
          </h2>

          {!estimate ? (
            <p className="text-gray-500">
              👇 املأ النموذج واضغط زر التحليل لعرض التوقعات...
            </p>
          ) : (
            <>
              <p className="text-lg mb-3">
                📈 <b>الوصول المتوقع:</b>{" "}
                <span className="text-purple-400">{estimate.reach}</span>
              </p>
              <p className="text-lg mb-3">
                👥 <b>المتابعين المحتمل إضافتهم:</b>{" "}
                <span className="text-green-400">{estimate.followers}</span>
              </p>
              <p className="text-lg mb-3">
                🔥 <b>التفاعل المتوقع:</b>{" "}
                <span className="text-red-400">{estimate.engagement}</span>
              </p>
              <p className="text-lg mb-3">
                💰 <b>Return on Influence:</b>{" "}
                <span className="text-yellow-300">{estimate.roi}%</span>
              </p>
              <p className="text-lg mb-3">
                ⭐ <b>قوة الحملة:</b>{" "}
                <span className="text-indigo-400">{estimate.score} / 100</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 bg-green-600 hover:bg-green-700 w-full py-3 text-white font-bold rounded-xl shadow-md"
                onClick={() => alert("🚀 Boost Activated Successfully!")}
              >
                تأكيد التعزيز <CheckCircle2 className="inline ml-2" size={20} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* ============================================================
          BOOST HISTORY
      ============================================================ */}
      <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <History className="text-purple-400" /> سجّل التعزيزات السابقة
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">لا يوجد تعزيزات سابقة.</p>
        ) : (
          <div className="space-y-4">
            {history.map((h, i) => (
              <div
                key={i}
                className="bg-black/20 rounded-xl border border-white/10 p-4 text-sm"
              >
                <p>
                  <span className="text-gray-400">⏱</span> {h.time}
                </p>
                <p>
                  🎯 <b>{h.goal}</b> — 👥 {h.tribe} — 💸 {h.budget} SAR
                </p>
                <p>
                  📈 Reach: {h.reach} — ⭐ Score: {h.score}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

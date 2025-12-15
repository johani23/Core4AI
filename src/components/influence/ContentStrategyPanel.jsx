// ============================================================================
// 🎨 ContentStrategyPanel.jsx — Phase 10 PRO Edition
// AI Content Engine: Formats + Patterns + Ideas + Posting Window
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function ContentStrategyPanel() {
  const influenceAPI = useInfluence();

  if (!influenceAPI || !influenceAPI.influence) {
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6">
        ⚠️ لا يمكن تحميل إستراتيجية المحتوى حالياً.
      </div>
    );
  }

  const {
    influence,
    extractContentPatterns,
    suggestContentFormats,
    generateContentIdeas,
    suggestPostingTime,
  } = influenceAPI;

  // جلب الأنماط والبيانات الأساسية
  const pattern = extractContentPatterns();
  const formats = suggestContentFormats();
  const ideas = generateContentIdeas();

  return (
    <div
      className="bg-white/5 border border-white/10 p-6 rounded-xl mt-6"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-blue-300 mb-4">
        🎨 إستراتيجية المحتوى الذكية — Core4.AI (الإصدار المتقدم)
      </h2>

      {/* الكشف عن نمط المحتوى */}
      <div className="bg-black/20 p-4 rounded-xl border border-white/10 mb-6">
        <h3 className="text-yellow-300 text-lg font-semibold mb-2">
          ⚡ نمط المحتوى الأعلى أداءً:
        </h3>
        <p className="text-white">الفئة الأساسية: {pattern.dominantCategory}</p>
        <p className="text-gray-300 text-sm mt-1">
          متوسط الوصول: {pattern.avgReach}
        </p>
        <p className="text-gray-300 text-sm">
          قوة المحتوى:{" "}
          {pattern.contentStrength === "strong" ? "قوي جدًا" : "متوسط"}
        </p>
      </div>

      {/* أفضل الـ Formats */}
      <div className="bg-purple-800/20 border border-purple-400/30 p-4 rounded-xl mb-6">
        <h3 className="text-purple-300 text-lg font-semibold mb-2">
          🎬 أفضل صيغة نشر الآن:
        </h3>
        <ul className="flex flex-wrap gap-3">
          {formats.map((fmt, idx) => (
            <li
              key={idx}
              className="bg-black/30 px-4 py-2 text-sm rounded-full border border-white/10 text-white"
            >
              {fmt}
            </li>
          ))}
        </ul>
      </div>

      {/* اقتراحات المحتوى */}
      <h3 className="text-lg text-pink-300 font-bold mb-3">
        ✨ أفكار جاهزة للمحتوى القادم:
      </h3>

      <div className="space-y-3">
        {ideas.map((idea, i) => (
          <div
            key={i}
            className="bg-black/30 p-4 rounded-lg border border-white/10 text-gray-200"
          >
            {i + 1}. {idea}
          </div>
        ))}
      </div>

      {/* أفضل وقت للنشر */}
      <div className="bg-green-700/20 border border-green-400/30 rounded-lg p-4 mt-6">
        <h3 className="text-green-300 text-lg font-semibold mb-2">
          🕒 أفضل وقت للنشر:
        </h3>
        <p>{suggestPostingTime()}</p>
      </div>

      {/* CTA Panel */}
      <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4 mt-6">
        <h3 className="text-blue-300 text-lg font-semibold mb-2">
          📣 CTA جاهزة:
        </h3>
        <p className="text-gray-200">
          جرّب الفكرة اللي فوق… وتأكد أنك تضيف CTA جذابة:
        </p>
        <p className="text-white font-semibold mt-2">
          👉 “شوفوا هذا… لازم تجربونه بنفسكم!”  
        </p>
      </div>
    </div>
  );
}

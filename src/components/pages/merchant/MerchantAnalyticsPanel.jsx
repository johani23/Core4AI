// ============================================================================
// 💚 MerchantAnalyticsPanel.jsx — AI Commercial Analysis Panel (Phase 6)
// ============================================================================
// - يعرض ذكاء Core4.AI التجاري للحملة
// - قائم على التحليل: Fit • Success • Growth • Tribe Mood • Content Strength
// ============================================================================

import React from "react";

export default function MerchantAnalyticsPanel({ analysis }) {
  if (!analysis) return null;

  return (
    <div
      className="bg-black/20 border border-white/10 p-5 rounded-xl mt-6"
      dir="rtl"
    >
      <h3 className="text-xl font-bold text-cyan-300 mb-4">
        🔍 الذكاء التجاري — تحليل الحملة
      </h3>

      {/* readiness score */}
      <p className="text-white text-lg font-bold mb-3">
        درجة الجاهزية:
        <span className="text-green-300"> {analysis.readiness}%</span>
      </p>

      {/* Opportunities */}
      <h4 className="text-yellow-300 font-semibold mt-4">الفرص:</h4>
      <ul className="list-disc pr-6 text-gray-300">
        {analysis.opportunities.map((o, idx) => (
          <li key={idx}>{o}</li>
        ))}
      </ul>

      {/* Risks */}
      <h4 className="text-red-300 font-semibold mt-4">المخاطر:</h4>
      <ul className="list-disc pr-6 text-gray-300">
        {analysis.risks.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>

      {/* Final recommendation */}
      <div className="mt-5 text-center text-lg font-bold text-white">
        {analysis.recommendation}
      </div>
    </div>
  );
}

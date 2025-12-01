// ============================================================================
// 💚 Core4.AI – AudienceInsightsPanel.jsx (PRO Edition)
// ============================================================================

import React from "react";
import { useAudience } from "@/context/AudienceContext";

export default function AudienceInsightsPanel() {
  const { persona } = useAudience();

  const demoTopCategories = ["قهوة", "أجهزة", "تجارب موسم الرياض"];
  const demoNextBestActions = [
    "عرض باكج عمل من الكوفي القريب منك",
    "منتج جديد يناسب جلسات التركيز",
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl" dir="rtl">
      <div className="text-sm font-semibold text-indigo-300 mb-3">
        كيف Core4 يقرأ إشاراتك؟
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">اهتماماتك الآن:</div>
        <div className="flex flex-wrap gap-2">
          {demoTopCategories.map((c) => (
            <span
              key={c}
              className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-200 text-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Next Best Offers:</div>
        <ul className="list-disc pr-4 text-xs text-gray-300 space-y-1">
          {demoNextBestActions.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-[11px] text-gray-500">
        حسابك الحالي مصنف كـ{" "}
        <span className="text-gray-300 font-semibold">
          {persona?.level}
        </span>.
      </div>
    </div>
  );
}

// ============================================================================
// 💡 BoostSuggestions.jsx — Phase 6.5 (Behavior-Driven Booster Suggestions)
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function BoostSuggestions() {
  const { recommendBoost } = useInfluence();
  const navigate = useNavigate();

  const rec = recommendBoost();

  // لو ما في توصية واضحة → لا نعرض شيء
  if (!rec || rec.type === "none") {
    if (!rec) return null;
    return (
      <div
        className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 text-sm text-gray-200"
        dir="rtl"
      >
        <div className="font-semibold text-purple-300 mb-1">
          Core4 ملاحظ:
        </div>
        <div>{rec.reason}</div>
      </div>
    );
  }

  const goToShop = () => {
    navigate("/influence/shop");
  };

  return (
    <div
      className="bg-purple-900/30 border border-purple-500/60 p-4 rounded-xl mt-4"
      dir="rtl"
    >
      <div className="text-sm text-purple-200 mb-1 font-semibold">
        Core4 يقترح عليك الآن:
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-white font-bold text-base">
          {rec.label}
        </div>
        <div className="text-gray-200 text-sm">
          {rec.reason}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={goToShop}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold"
          >
            فتح متجر التأثير
          </button>
        </div>
      </div>
    </div>
  );
}

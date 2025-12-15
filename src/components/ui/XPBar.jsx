// ============================================================================
// 💜 XPBar — Creator Rank Progress Component
// ============================================================================

import React from "react";
import { useCreatorXP } from "@/context/CreatorXPContext";
import { Sparkles } from "lucide-react";

export default function XPBar() {
  const { xp, level, rank } = useCreatorXP();

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-inner mt-8">
      <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
        <Sparkles className="text-purple-600" />
        مستوى صانع المحتوى: {level} — رتبة {rank}
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-purple-200 rounded-full h-3 mt-4">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${xp}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-2">{xp}% نحو المستوى التالي</p>
    </div>
  );
}

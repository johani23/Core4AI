// ============================================================================
// 💚 Core4.AI – TribeXPBar.jsx (MVP v1)
// ----------------------------------------------------------------------------
// Simple XP progress bar connected directly to TribeContext
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeXPBar() {
  const { xp, progress, rank } = useTribe();

  return (
    <div className="w-full space-y-1" dir="rtl">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-sm">رتبتك الحالية:</span>
        <span className="text-green-400 font-bold">{rank}</span>
      </div>

      {/* XP Progress Bar */}
      <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-400 text-xs mt-1">{xp} XP</p>
    </div>
  );
}

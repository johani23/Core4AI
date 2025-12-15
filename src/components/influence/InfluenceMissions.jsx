// ============================================================================
// 💡 InfluenceMissions.jsx — مركز المهام الكامل (XP Missions)
// ============================================================================

import React from "react";
import { useInfluenceMissions } from "@/context/InfluenceMissionsContext";

export default function InfluenceMissions() {
  const { missions, completed, completeMission } = useInfluenceMissions();

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">مركز المهام</h1>

      <p className="text-gray-400 text-sm mb-2">
        أكمل المهام اليومية لزيادة نقاط الخبرة (XP)، وتحسين مستوى التأثير والسمعة.
      </p>

      <div className="space-y-4">
        {missions.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-xl border backdrop-blur-xl transition-all ${
              completed.includes(m.id)
                ? "bg-green-500/20 border-green-400/40"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-semibold">{m.title}</div>
                <div className="text-green-300 text-sm">+{m.xp} XP</div>
              </div>

              {!completed.includes(m.id) ? (
                <button
                  onClick={() => completeMission(m.id)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm"
                >
                  إتمام المهمة
                </button>
              ) : (
                <div className="text-green-300 font-bold text-sm">✓ مكتملة</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

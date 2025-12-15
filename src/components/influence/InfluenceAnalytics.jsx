// ============================================================================
// 💡 InfluenceAnalytics.jsx — التحليلات (Reach – Growth – Conversions)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import PulseValue from "@/components/influence/PulseValue";

export default function InfluenceAnalytics() {
  const { influence } = useInfluence();

  return (
    <div className="p-6 space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">تحليلات التأثير</h1>

      {/* ===================== Reach ====================== */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl">
        <div className="text-gray-400 text-sm">مدى الوصول</div>

        <PulseValue value={influence.reach}>
          <div className="text-4xl text-green-300 font-bold">
            {influence.reach}
          </div>
        </PulseValue>

        <PulseValue value={influence.growth}>
          <div className="text-purple-300 text-sm mt-1">
            النمو: {(influence.growth * 100).toFixed(1)}%
          </div>
        </PulseValue>
      </div>

      {/* ===================== Conversions ====================== */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl">
        <div className="text-gray-400 text-sm">عدد التحويلات</div>

        <PulseValue value={influence.conversions}>
          <div className="text-3xl text-yellow-300 font-bold">
            {influence.conversions}
          </div>
        </PulseValue>
      </div>

      {/* ===================== Top Content ====================== */}
      <div>
        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          أفضل المحتويات
        </h2>

        <div className="space-y-3">
          {influence.topContent.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <div className="text-white font-semibold">{c.title}</div>
                <div className="text-gray-400 text-xs">
                  الوصول: {c.reach}
                </div>
              </div>

              <span className="text-purple-300 font-bold">
                {Math.round((c.reach / influence.reach) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

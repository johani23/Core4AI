// ============================================================================
// 💡 InfluenceMiniStats.jsx — Phase 4 (Tribe + Influence Stats)
// ============================================================================

import React from "react";
import PulseValue from "@/components/influence/PulseValue";
import TribeMoodBadge from "@/components/influence/TribeMoodBadge";

export default function InfluenceMiniStats({
  tribePower,
  tribeMembers,
  tribeRank,
  tribeMood,
  dailyGain,
  reputation,
  cluster,
}) {
  return (
    <div className="grid grid-cols-2 gap-4" dir="rtl">

      {/* طاقة القبيلة */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">طاقة القبيلة</div>
        <PulseValue value={tribePower}>
          <div className="text-green-300 text-xl font-bold">{tribePower}</div>
        </PulseValue>
      </div>

      {/* ترتيب القبيلة */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">ترتيب القبيلة</div>
        <PulseValue value={tribeRank}>
          <div className="text-purple-300 text-xl font-bold">#{tribeRank}</div>
        </PulseValue>
      </div>

      {/* عدد الأعضاء */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">عدد الأعضاء</div>
        <PulseValue value={tribeMembers}>
          <div className="text-blue-300 text-xl font-bold">{tribeMembers}</div>
        </PulseValue>
      </div>

      {/* حالة القبيلة */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex flex-col">
        <div className="text-gray-400 text-xs">حالة القبيلة</div>
        <TribeMoodBadge mood={tribeMood} />
      </div>

      {/* المكسب اليومي */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">المكسب اليومي</div>
        <PulseValue value={dailyGain}>
          <div className="text-yellow-300 text-xl font-bold">+{dailyGain}</div>
        </PulseValue>
      </div>

      {/* السمعة */}
      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">السمعة</div>
        <PulseValue value={reputation}>
          <div className="text-fuchsia-300 text-xl font-bold">
            {reputation}
          </div>
        </PulseValue>
      </div>

    </div>
  );
}

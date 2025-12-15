// ============================================================================
// 💡 InfluenceLeaderboard.jsx — Phase 4 (Tribe × Influence Integration)
// ============================================================================

import React, { useMemo } from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import PulseValue from "@/components/influence/PulseValue";

export default function InfluenceLeaderboard() {
  const { influence } = useInfluence();

  // ========================================================================
  // 1) البيانات الأساسية للمؤثرين — نموذج واقعي (يمكن تطويره لاحقاً)
  // المؤثر الأول هو المستخدم نفسه + بقية المؤثرين افتراضيين
  // ========================================================================

  const baseInfluencers = [
    {
      id: 0,
      name: "أنت",
      tribe: "قبيلتك",
      score: influence.score,
      growth: influence.growth,
      tribePower: influence.tribePower,
      tribeRank: influence.tribeRank,
    },
    {
      id: 2,
      name: "لينا",
      tribe: "TechWave",
      score: 980,
      growth: 0.12,
      tribePower: 85,
      tribeRank: 10,
    },
    {
      id: 3,
      name: "فهد",
      tribe: "TrendMakers",
      score: 920,
      growth: 0.09,
      tribePower: 70,
      tribeRank: 12,
    },
    {
      id: 4,
      name: "سارة",
      tribe: "StyleHub",
      score: 905,
      growth: 0.15,
      tribePower: 100,
      tribeRank: 6,
    },
    {
      id: 5,
      name: "عمر",
      tribe: "EcoTribe",
      score: 860,
      growth: 0.07,
      tribePower: 60,
      tribeRank: 14,
    },
  ];

  // ========================================================================
  // 2) معادلة الترتيب — Tribe + Score + Growth
  // ========================================================================

  const rankedList = useMemo(() => {
    return [...baseInfluencers].sort((a, b) => {
      const calcA =
        a.score +
        a.tribePower * 3 +
        (15 - a.tribeRank) * 12 +
        a.growth * 100;

      const calcB =
        b.score +
        b.tribePower * 3 +
        (15 - b.tribeRank) * 12 +
        b.growth * 100;

      return calcB - calcA; // ترتيب تنازلي
    });
  }, [influence]);

  // ========================================================================
  // UI
  // ========================================================================

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">
        ترتيب المؤثرين حسب قوة التأثير والقبيلة
      </h1>

      <div className="space-y-3">
        {rankedList.map((inf, index) => (
          <div
            key={inf.id}
            className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl"
          >
            {/* الرقم */}
            <div className="text-purple-300 font-extrabold text-xl w-10">
              #{index + 1}
            </div>

            {/* الاسم + القبيلة */}
            <div className="flex-1 mr-4">
              <div className="text-white font-semibold text-lg">{inf.name}</div>
              <div className="text-gray-400 text-xs">{inf.tribe}</div>
            </div>

            {/* نقاط التأثير */}
            <PulseValue value={inf.score}>
              <div className="text-green-300 font-bold text-lg">
                {inf.score}
              </div>
            </PulseValue>

            {/* Tribe Power */}
            <PulseValue value={inf.tribePower}>
              <div className="text-yellow-300 font-bold text-sm ml-4">
                ⚡ {inf.tribePower}
              </div>
            </PulseValue>
          </div>
        ))}
      </div>
    </div>
  );
}

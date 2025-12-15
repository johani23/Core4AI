// ============================================================================
// 💎 InfluencerMatchTop3Panel.jsx — Merchant View (Top-3 Influencers)
// Phase 9 PRO — Future-Proof Engine
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function InfluencerMatchTop3Panel({ product }) {
  const influenceAPI = useInfluence();

  if (!product)
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl">
        ⚠️ لا يوجد منتج لتحليل المؤثرين.
      </div>
    );

  if (!influenceAPI)
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl">
        ⚠️ لا يوجد بيانات مؤثر لتحليلها.
      </div>
    );

  const { calculateFitScore, predictCommercialSuccess, influence } =
    influenceAPI;

  // حتى الآن لديك مؤثر واحد فقط: "Self Influencer"
  const influencers = [
    {
      id: "creator_001",
      name: "المؤثر الرئيسي",
      data: influence,
    },
  ];

  const ranked = influencers
    .map((inf) => ({
      ...inf,
      fit: calculateFitScore(product),
      projection: predictCommercialSuccess(product),
    }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 3);

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl mt-6" dir="rtl">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        👑 أفضل المؤثرين للمنتج
      </h2>

      {ranked.map((inf, index) => (
        <div
          key={inf.id}
          className="bg-black/20 p-4 mb-4 rounded-xl border border-white/10"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">
              #{index + 1} — {inf.name}
            </span>
            <span className="text-yellow-300 font-semibold">
              ملائمة: {inf.fit} / 200
            </span>
          </div>

          <div className="text-green-300 mb-1">
            نسبة نجاح الحملة المتوقعة: {inf.projection}%
          </div>

          <div className="text-gray-400 text-sm">
            يعتمد التحليل على: المحتوى الأعلى أداءً — قوة القبيلة — سلوك المؤثر.
          </div>
        </div>
      ))}
    </div>
  );
}

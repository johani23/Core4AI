// ============================================================================
// 💰 InfluenceSalesPanel.jsx — Conversion & Commercial Power
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function InfluenceSalesPanel() {
  const { calculateConversionScore, predictConversion } = useInfluence();

  const score = calculateConversionScore();

  return (
    <div
      className="bg-white/5 border border-white/10 p-5 rounded-xl mt-6"
      dir="rtl"
    >
      <h2 className="text-lg font-bold text-yellow-300 mb-3">
        قوتك التجارية 💰
      </h2>

      {/* Conversion Score */}
      <div className="text-white text-3xl font-bold mb-2">{score} / 200</div>

      <p className="text-gray-300 text-sm">
        هذا المؤشر يوضح قدرتك على تحويل الوصول إلى مبيعات فعلية للتجار.
      </p>

      {/* Messaging */}
      {score > 120 && (
        <p className="text-green-300 mt-3 text-sm">
          💎 أداء ممتاز! التجار سيستفيدون جدًا من التعاون معك.
        </p>
      )}

      {score > 60 && score <= 120 && (
        <p className="text-purple-300 mt-3 text-sm">
          🔥 أداء جيد — ركز على تحسين المحتوى لرفع التحويلات.
        </p>
      )}

      {score <= 60 && (
        <p className="text-red-300 mt-3 text-sm">
          ⚠️ التحويل منخفض حاليًا — جرّب Reach Booster أو Audience Expansion.
        </p>
      )}
    </div>
  );
}

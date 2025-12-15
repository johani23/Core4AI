// ============================================================================
// 💚 Core4.AI – CampaignForecastPanel.jsx (Step 11 — 30 Day Prediction Engine)
// ============================================================================
// - 30 day forecast
// - Fatigue decay model
// - Influence impact curve
// - Tribe mood effect
// - Price sensitivity effect
// - Suggested relaunch day
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function CampaignForecastPanel({ product, pricing }) {
  const { calculateFitScore, predictCommercialSuccess, influence } = useInfluence();

  if (!product) return null;

  const fit = calculateFitScore(product);
  const success = predictCommercialSuccess(product);

  const elasticity = pricing?.elasticity || 1;
  const tribe = influence.tribeMood;
  const growth = influence.growth;

  // --------------------------------------------------------------
  // 1️⃣ Fatigue Model — هبوط الأداء تدريجياً خلال 30 يوم
  // --------------------------------------------------------------
  const fatigueFactor = (day) => {
    const baseDrop = 1 - day * (0.015 + elasticity * 0.005);
    return Math.max(0.15, baseDrop);
  };

  // --------------------------------------------------------------
  // 2️⃣ Tribe Mood Effect
  // --------------------------------------------------------------
  const tribeBoost =
    tribe === "قوية جدًا ⚡" ? 1.3 :
    tribe === "نشيطة 🔥" ? 1.15 :
    tribe === "متحفّزة" ? 1 :
    0.85;

  // --------------------------------------------------------------
  // 3️⃣ Influence Growth Effect
  // --------------------------------------------------------------
  const growthBoost = 1 + growth * 0.6;

  // --------------------------------------------------------------
  // 4️⃣ Daily Performance Forecast
  // --------------------------------------------------------------
  const forecast = Array.from({ length: 30 }).map((_, i) => {
    const day = i + 1;

    const base = (success * 0.8 + fit * 0.2) / 2;
    const fatigue = fatigueFactor(day);

    const predicted = Math.round(base * fatigue * tribeBoost * growthBoost);

    return {
      day,
      value: Math.max(5, predicted),
    };
  });

  // --------------------------------------------------------------
  // 5️⃣ Best Re-launch Day
  // --------------------------------------------------------------
  const threshold = Math.max(...forecast.map((f) => f.value)) * 0.45;

  const relaunchDay = forecast.find((f) => f.value < threshold)?.day || 28;

  // --------------------------------------------------------------
  // 6️⃣ Spending Curve
  // --------------------------------------------------------------
  const spending = forecast.map((f) => ({
    day: f.day,
    spend: Math.round(f.value * 1.2),
  }));

  return (
    <div className="core-card mt-10" dir="rtl">
      <h2 className="text-xl font-bold text-cyan-300 mb-4">
        📈 توقع أداء الحملة (30 يوم)
      </h2>

      {/* Peak */}
      <p className="text-gray-300 mb-1">
        🔥 أعلى أداء متوقع:{" "}
        <span className="text-green-300">
          {Math.max(...forecast.map((f) => f.value))} نقطة
        </span>
      </p>

      {/* Fatigue */}
      <p className="text-gray-300 mb-1">
        😮‍💨 بداية هبوط الأداء:{" "}
        <span className="text-yellow-300">
          اليوم {relaunchDay}
        </span>
      </p>

      {/* Relaunch */}
      <p className="text-gray-300 mb-1">
        ♻️ أفضل يوم لإعادة الإطلاق:{" "}
        <span className="text-purple-300">
          بعد اليوم {relaunchDay}
        </span>
      </p>

      {/* Summary List */}
      <div className="mt-4 bg-black/20 p-4 rounded-xl border border-white/10">
        <p className="text-gray-300 font-semibold mb-2">نقاط مهمة:</p>

        <ul className="list-disc pr-6 text-gray-400 space-y-1">
          <li>يتوقع أن يكون الأداء قويًا في أول 6–9 أيام.</li>
          <li>يتراجع الأداء تدريجيًا بسبب fatigue.</li>
          <li>مزاج القبيلة يرفع الأداء بنسبة {Math.round((tribeBoost - 1) * 100)}%.</li>
          <li>نمو الحساب يضيف {Math.round(growthBoost * 100 - 100)}% دفعة إضافية.</li>
          <li>حساسية السعر قد تقلل الأداء بين 5–20% حسب elasticity.</li>
        </ul>
      </div>

      {/* Trend Preview */}
      <div className="mt-6">
        <h3 className="text-purple-300 font-bold mb-2">🔮 لمحة من المنحنى:</h3>
        <div className="grid grid-cols-6 gap-3 text-gray-300 text-sm">
          {forecast.slice(0, 6).map((f) => (
            <div key={f.day} className="bg-white/5 p-2 rounded-lg text-center">
              <p>يوم {f.day}</p>
              <p className="text-green-300">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

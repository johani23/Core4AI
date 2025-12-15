// ============================================================================
// 💚 Core4.AI – RevenueSimulatorPanel.jsx (Step 15 — ROI Engine)
// ============================================================================
// - محاكاة الإيرادات للتاجر
// - يعتمد على الذكاء من InfluenceScoreContext
// - يعرض أفضل سعر / عمولة / Bonus + توصية نهائية
// ============================================================================

import React, { useState } from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function RevenueSimulatorPanel({ product, pricing }) {
  const {
    calculateFitScore,
    predictCommercialSuccess,
  } = useInfluence();

  if (!product) return null;

  // ==============================
  // Base AI Inputs
  // ==============================
  const fit = calculateFitScore(product);
  const proj = predictCommercialSuccess(product); // Success %
  const basePrice = Number(product.price);

  // ==============================
  // User Editable Inputs (Simulation)
  // ==============================
  const [price, setPrice] = useState(basePrice);
  const [commission, setCommission] = useState(10);
  const [bonus, setBonus] = useState(0);

  // ==============================
  // AI Revenue Simulation Logic
  // ==============================

  // تأثير السعر
  const priceFactor =
    price > basePrice
      ? 1 - (price - basePrice) * 0.015
      : 1 + (basePrice - price) * 0.008;

  // تأثير العمولة
  const commissionFactor = 1 + commission * 0.015;

  // تأثير البونص
  const bonusFactor = 1 + bonus * 0.002;

  // تأثير ملاءمة المؤثر + نجاح الحملة
  const influenceFactor = (fit / 200) * 0.6 + (proj / 100) * 0.4;

  // الإيرادات النهائية
  const estimatedRevenue = Math.round(
    price * influenceFactor * priceFactor * commissionFactor * bonusFactor * 10
  );

  // قرار AI
  let decision = "";
  if (estimatedRevenue > 750) decision = "🔥 ممتاز — أطلق الحملة الآن!";
  else if (estimatedRevenue > 450) decision = "✨ جيد… لكن يمكن تحسين السعر والعمولة.";
  else decision = "❄️ غير مناسب… يفضّل تعديل السعر والمحتوى.";

  return (
    <div className="core-card mt-6" dir="rtl">
      <h2 className="section-title">📈 محاكاة الإيرادات (ROI)</h2>

      {/* PRICE */}
      <div className="mb-3">
        <label className="text-gray-300">السعر المقترح</label>
        <input
          type="number"
          className="input mt-1"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      {/* COMMISSION */}
      <div className="mb-3">
        <label className="text-gray-300">نسبة العمولة (%)</label>
        <input
          type="number"
          className="input mt-1"
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
        />
      </div>

      {/* BONUS */}
      <div className="mb-4">
        <label className="text-gray-300">مكافأة إضافية للمؤثر (اختياري)</label>
        <input
          type="number"
          className="input mt-1"
          value={bonus}
          onChange={(e) => setBonus(Number(e.target.value))}
        />
      </div>

      {/* OUTPUT */}
      <div className="p-4 bg-black/30 rounded-xl border border-white/10">
        <p className="text-lg font-bold text-green-300">
          الإيرادات المتوقعة: {estimatedRevenue} ريال
        </p>
        <p className="text-xl font-bold mt-3 text-purple-300">{decision}</p>
      </div>
    </div>
  );
}

// ============================================================================
// 💚 MerchantAlertsPanel.jsx — Step 12 (Smart Alerts Engine)
// ============================================================================
// - Price Alerts
// - Demand Alerts
// - Category Alerts
// - Influencer Alerts
// - Timing Alerts
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function MerchantAlertsPanel({ product, pricing }) {
  const { calculateFitScore, predictCommercialSuccess, extractContentPatterns, influence } =
    useInfluence();

  if (!product) return null;

  const fit = calculateFitScore(product);
  const success = predictCommercialSuccess(product);
  const pattern = extractContentPatterns();
  const elasticity = pricing?.elasticity || 1;
  const competitor = pricing?.competitor_price || product.price - 20;

  const alerts = [];

  // ============================================================================
  // PRICE ALERTS
  // ============================================================================
  if (competitor < product.price)
    alerts.push("⚠️ أحد المنافسين يقدم سعرًا أقل — قد يؤثر على الحملة.");

  if (elasticity > 1.5)
    alerts.push("🚨 حساسية السعر عالية — تعديل السعر قد يكون ضروريًا.");

  // ============================================================================
  // DEMAND ALERTS
  // ============================================================================
  if (success < 50)
    alerts.push("📉 توقعات النجاح منخفضة — يفضل تعزيز المحتوى قبل الإطلاق.");

  if (influence.growth < 0.05)
    alerts.push("⚠️ معدل نمو الحساب منخفض — قد يؤثر على نتائج الحملة.");

  // ============================================================================
  // CATEGORY ALERTS
  // ============================================================================
  if (pattern.growthMomentum < 0.05)
    alerts.push("❄️ الفئة ضعيفة حاليًا — ليس أفضل وقت لحملة قوية.");

  if (pattern.growthMomentum > 0.15)
    alerts.push("🔥 الفئة تحترق الآن — فرصة قوية جداً للإطلاق.");

  // ============================================================================
  // INFLUENCER ALERTS
  // ============================================================================
  if (fit < 100)
    alerts.push("⚡ يمكن اختيار مؤثر أقوى — درجة الملاءمة الحالية ضعيفة.");

  // ============================================================================
  // TIMING ALERTS
  // ============================================================================
  const hour = new Date().getHours();
  if (hour < 14 || hour > 23)
    alerts.push("⏳ الوقت الحالي ليس الأفضل — فترة المساء أكثر تفاعلاً.");

  return (
    <div className="core-card bg-red-900/10 border border-red-500 mt-10" dir="rtl">
      <h2 className="text-xl font-bold text-red-400 mb-4">🚨 تنبيهات هامة</h2>

      {alerts.length === 0 ? (
        <p className="text-green-300 font-semibold">✔ لا توجد تنبيهات — الوضع ممتاز! </p>
      ) : (
        <ul className="list-disc pr-6 text-gray-300 space-y-2">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

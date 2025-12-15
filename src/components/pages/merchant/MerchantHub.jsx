// ============================================================================
// 💚 Core4.AI – MerchantHub.jsx (FULL VERSION — Steps 1–13)
// ============================================================================
// - Real-Time Insight Engine
// - Sales Prediction
// - Price Sensitivity
// - Competitor Watch
// - Market Heat-Level
// - Launch Timing AI
// - Demand Risk
// - Final Recommendation
// - AI Action Engine (Auto Buttons)
// - Revenue Simulator (Profit + Break-even)
// - 30-Day Forecast Engine
// - Smart Alerts Engine
// - Earnings Breakdown
// - Wallet Panel
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";

// PANELS
import AIActionPanel from "./AIActionPanel";
import RevenueSimulatorPanel from "./RevenueSimulatorPanel";
import CampaignForecastPanel from "./CampaignForecastPanel";
import MerchantAlertsPanel from "./MerchantAlertsPanel";
import MerchantEarningsPanel from "./MerchantEarningsPanel";
import MerchantWallet from "./MerchantWallet";

export default function MerchantHub() {
  const [product, setProduct] = useState(null);
  const [pricing, setPricing] = useState(null);

  const {
    calculateFitScore,
    predictCommercialSuccess,
    extractContentPatterns,
  } = useInfluence();

  useEffect(() => {
    const p = localStorage.getItem("core4ai_new_product");
    if (p) setProduct(JSON.parse(p));

    const pr = localStorage.getItem("core4ai_pricing");
    if (pr) setPricing(JSON.parse(pr));
  }, []);

  if (!product)
    return (
      <div className="text-gray-500 text-center mt-20">
        لا توجد بيانات لعرضها...
      </div>
    );

  // ============================================================================  
  // 🔮 AI SALES PREDICTION  
  // ============================================================================  
  const baseSales = predictCommercialSuccess(product);
  const priceImpact = pricing?.elasticity ? 1 - pricing.elasticity * 0.1 : 1;
  const projectedSales = Math.round(baseSales * priceImpact);

  // ============================================================================  
  // 💰 PRICE SENSITIVITY  
  // ============================================================================  
  let priceMessage = "";
  if (pricing?.elasticity > 1.5)
    priceMessage = "⚠️ المنتج حساس للسعر. رفع السعر سيقلل الطلب بسرعة.";
  else if (pricing?.elasticity > 1)
    priceMessage = "⚡ يجب مراقبة التفاعل… السعر مؤثر على سلوك الشراء.";
  else priceMessage = "✔ المنتج منخفض الحساسية — السعر مناسب.";

  // ============================================================================  
  // ⚔️ COMPETITOR WATCH  
  // ============================================================================  
  const competitorPrice =
    pricing?.competitor_price || product.price - 20;

  const undercut = competitorPrice > product.price;

  // ============================================================================  
  // 🔥 CATEGORY HEAT  
  // ============================================================================  
  const pattern = extractContentPatterns();
  const heat =
    pattern.growthMomentum > 0.15
      ? "🔥 ساخنة جداً"
      : pattern.growthMomentum > 0.08
      ? "✨ مستقرة ونشطة"
      : "❄️ منخفضة الطلب";

  // ============================================================================  
  // ⏰ BEST LAUNCH TIME  
  // ============================================================================  
  const hour = new Date().getHours();
  const launchTime =
    hour >= 13 && hour <= 21
      ? "🔥 الآن أفضل وقت للإطلاق (ذروة التفاعل)"
      : "⏳ يفضّل الانتظار حتى فترة المساء";

  // ============================================================================  
  // ⚠️ DEMAND RISK  
  // ============================================================================  
  const demandRisk =
    projectedSales < 50
      ? "❗ انخفاض شديد متوقع — يفضل إضافة Bonus للمؤثر"
      : projectedSales < 70
      ? "⚠️ التوقعات منخفضة — تقوية المحتوى ضرورية"
      : "✔ الطلب مستقر";

  // ============================================================================  
  // 🎯 FINAL RECOMMENDATION  
  // ============================================================================  
  const recommendation =
    projectedSales > 70
      ? "🔥 جاهز — أطلق الحملة الآن!"
      : projectedSales > 50
      ? "✨ جيد… لكن حسّن المحتوى قبل الإطلاق."
      : "❄️ غير جاهز — قم بتحسين المحتوى والسعر أولاً.";

  // ============================================================================  

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-green-600 mb-8">
        مركز التاجر — الذكاء الفوري
      </h1>

      {/* PRODUCT CARD */}
      <div className="core-card mb-6">
        <h2 className="section-title">📦 بيانات المنتج</h2>
        <p><strong>الاسم:</strong> {product.name}</p>
        <p><strong>السعر:</strong> {product.price} ريال</p>
        <p><strong>الفئة:</strong> {product.category}</p>
      </div>

      {/* SALES PREDICTION */}
      <div className="core-card mb-6">
        <h2 className="section-title">🔮 توقعات المبيعات</h2>
        <p className="text-gray-300 mb-2">
          التوقع العام:
          <span className="text-green-300"> {projectedSales}%</span>
        </p>
        <p className="text-blue-300">{launchTime}</p>
      </div>

      {/* PRICE SENSITIVITY */}
      <div className="core-card mb-6">
        <h2 className="section-title">💰 حساسية السعر</h2>
        <p className="text-gray-300">{priceMessage}</p>
      </div>

      {/* COMPETITOR WATCH */}
      <div className="core-card mb-6">
        <h2 className="section-title">⚔️ المنافسين</h2>
        <p className="text-gray-300">
          متوسط سعر المنافسين: {competitorPrice} ريال
        </p>
        <p className="text-gray-400 mt-1">
          {undercut
            ? "✔ منتجك أرخص من السوق — نقطة قوة!"
            : "⚠️ المنافس أرخص — راجع استراتيجيتك."}
        </p>
      </div>

      {/* MARKET HEAT */}
      <div className="core-card mb-6">
        <h2 className="section-title">🔥 حرارة السوق</h2>
        <p className="text-gray-300">{heat}</p>
      </div>

      {/* DEMAND ALERT */}
      <div className="core-card mb-6">
        <h2 className="section-title">⚠️ تنبيه الطلب</h2>
        <p className="text-gray-300">{demandRisk}</p>
      </div>

      {/* FINAL RECOMMENDATION */}
      <div className="core-card bg-purple-900/20 border border-purple-400 mb-8">
        <h2 className="section-title">🎯 التوصية النهائية</h2>
        <p className="text-xl font-bold text-white mb-4">{recommendation}</p>

        <AIActionPanel product={product} />
      </div>

      {/* REVENUE SIMULATOR */}
      <RevenueSimulatorPanel product={product} pricing={pricing} />

      {/* 30-DAY FORECAST ENGINE */}
      <CampaignForecastPanel product={product} pricing={pricing} />

      {/* ALERTS ENGINE */}
      <MerchantAlertsPanel product={product} pricing={pricing} />

      {/* EARNINGS PANEL */}
      <MerchantEarningsPanel
        earnings={[
          {
            product: product.name,
            revenue: 3800,
            commission: 600,
            ads: 900,
          },
          {
            product: product.name,
            revenue: 2100,
            commission: 300,
            ads: 400,
          },
        ]}
      />

      {/* WALLET PANEL */}
      <MerchantWallet />
    </div>
  );
}

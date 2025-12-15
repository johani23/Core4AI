// ============================================================================
// 💚 Core4.AI – CampaignWizard.jsx (AI: Budget + Summary Prep + AutoPick)
// ============================================================================
// - Arabic RTL Premium UI
// - Smart AI Integration: FitScore, Success Prediction, Content Ideas
// - Budget Allocator, AutoPick Influencer, Summary Data Export
// ============================================================================

import { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

// ⭐ دوال الذكاء الاصطناعي
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function CampaignWizard() {
  const [step, setStep] = useState(1);
  const [pricingData, setPricingData] = useState(null);
  const [product, setProduct] = useState(null);

  const {
    calculateFitScore,
    predictCommercialSuccess,
    suggestContentFormats,
    generateContentIdeas,
    autoPickInfluencer,
    influence
  } = useInfluence();

  useEffect(() => {
    const p = localStorage.getItem("core4ai_pricing");
    if (p) setPricingData(JSON.parse(p));

    const savedProduct = localStorage.getItem("core4ai_new_product");
    if (savedProduct) setProduct(JSON.parse(savedProduct));
  }, []);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const isProductReady = product?.name && product?.category && product?.price;

  const fitScore = isProductReady ? calculateFitScore(product) : null;
  const projScore = isProductReady ? predictCommercialSuccess(product) : null;
  const contentFormats = isProductReady ? suggestContentFormats() : [];
  const contentIdeas = isProductReady ? generateContentIdeas() : [];

  // =====================================================================
  // ⭐ AI BUDGET ENGINE — Phase 5.6
  // =====================================================================
  const calculateBudget = (product, fit, success, growth, mood) => {
    if (!product) return null;

    const price = Number(product.price) || 50;

    const base = price * 0.06; // 6%

    const moodMultiplier =
      mood === "قوية جدًا ⚡" ? 2 :
      mood === "نشيطة 🔥" ? 1.5 :
      mood === "متحفّزة" ? 1.2 :
      1;

    const fitMultiplier =
      fit > 150 ? 2 :
      fit > 100 ? 1.4 :
      1;

    const successMultiplier =
      success > 70 ? 1.8 :
      success > 40 ? 1.3 :
      1;

    const suggested = Math.round(base * moodMultiplier * fitMultiplier * successMultiplier);

    const influencers =
      fit > 150 ? 3 :
      fit > 100 ? 2 :
      1;

    const duration =
      growth > 0.15 ? 7 :
      growth > 0.10 ? 10 :
      14;

    const roi = Math.min(
      Math.round((success * 1.5) + (fit * 0.2) + (growth * 100)),
      200
    );

    return { budget: suggested, influencers, duration, roi };
  };

  const budgetAI = isProductReady
    ? calculateBudget(product, fitScore, projScore, influence.growth, influence.tribeMood)
    : null;

  // =====================================================================
  // ⭐ STEP 4 — Save Summary Data for CampaignSummary.jsx
  // =====================================================================
  const goToSummary = () => {
    const summary = {
      product,
      fitScore,
      projScore,
      contentFormats,
      contentIdeas,
      budgetAI,
      pricingData,
      confidence:
        Math.round((projScore * 0.6) + (fitScore * 0.3) + (influence.growth * 100 * 0.1)),
      bestInfluencer: autoPickInfluencer(product)
    };

    localStorage.setItem("core4ai_campaign_summary", JSON.stringify(summary));
    window.location.href = "/merchant/campaign-summary";
  };

  // =====================================================================
  // UI
  // =====================================================================

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 page-wrapper" dir="rtl">

      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-blue-600 mb-8 text-right">
        إنشاء حملة تسويقية
      </h1>

      {/* STEP 1 */}
      {step === 1 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">اختَر هدف الحملة</h2>

          {isProductReady && (
            <div className="bg-purple-900/20 border border-purple-400 p-4 rounded-lg mb-5">
              <h3 className="font-bold text-purple-300">🧠 تحليل المنتج للحملة</h3>

              <p className="text-gray-300 mt-1">
                درجة ملائمة المؤثر:
                <span className="text-yellow-300"> {fitScore}/200</span>
              </p>

              <p className="text-gray-300">
                نسبة النجاح المتوقعة:
                <span className="text-green-300"> {projScore}%</span>
              </p>

              <p className="text-blue-300 mt-2">
                {fitScore > 150
                  ? "🔥 المنتج مناسب لحملات المبيعات المباشرة"
                  : fitScore > 100
                  ? "✨ نتائج جيدة محتملة"
                  : "⚠️ يفضل حملة تعريف قبل المبيعات"}
              </p>
            </div>
          )}

          {pricingData && (
            <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg mb-5">
              <p className="font-bold">📌 تسعير Core4AI:</p>
              <p>السعر المقترح: {pricingData.best_price} ريال</p>
              <p>النطاق المناسب: {pricingData.range}</p>
            </div>
          )}

          <button className="btn-green w-full mb-3">زيادة المبيعات</button>
          <button className="btn-blue w-full mb-3">زيادة الزيارات</button>
          <button className="btn-gray w-full">حملة تعريف / حضور</button>

          <button onClick={next} className="btn-green w-full mt-6">
            التالي
          </button>
        </motion.div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">اختر فئة الحملة</h2>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-gray">شباب</button>
            <button className="btn-gray">عائلات</button>
            <button className="btn-gray">طلاب</button>
            <button className="btn-gray">فئة راقية</button>
            <button className="btn-gray">الرياض</button>
            <button className="btn-gray">جدة</button>
            <button className="btn-gray">شرائح خاصة</button>
            <button className="btn-gray">مجموعة مختارة</button>
          </div>

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>رجوع</button>
            <button className="btn-green" onClick={next}>التالي</button>
          </div>
        </motion.div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">اختيار المؤثرين</h2>

          {isProductReady && (
            <div className="bg-purple-800/20 border border-purple-500 p-4 rounded-xl mb-6">
              <h3 className="text-purple-300 font-bold mb-3">👑 أفضل مؤثر للحملة</h3>

              {(() => {
                const best = autoPickInfluencer(product);

                return (
                  <>
                    <p className="text-white text-lg font-bold">{best.name}</p>
                    <p className="text-yellow-300 mt-1">الملاءمة: {best.fit} / 200</p>
                    <p className="text-green-300 mt-1">النجاح المتوقع: {best.projection}%</p>

                    <button
                      className="btn-green w-full mt-4"
                      onClick={() => alert(`✔ تم اختيار ${best.name}`)}
                    >
                      ✔ اختيار هذا المؤثر تلقائيًا
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          {isProductReady && (
            <div className="bg-indigo-900/20 border border-indigo-400 p-4 rounded-lg mb-5">
              <h3 className="font-bold text-indigo-300 mb-2">📸 أفضل أنواع المحتوى</h3>

              <p className="text-gray-300">{contentFormats.join(" • ")}</p>

              <p className="text-gray-400 mt-3">💡 أفضل 3 أفكار:</p>
              <ul className="text-gray-300 list-disc pr-6">
                {contentIdeas.slice(0, 3).map((idea, idx) => (
                  <li key={idx}>{idea}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="btn-blue w-full"
            onClick={() => (window.location.href = "/merchant/influencers")}
          >
            عرض المؤثرين
          </button>

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>رجوع</button>
            <button className="btn-green" onClick={next}>التالي</button>
          </div>
        </motion.div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">تفاصيل الحملة</h2>

          <input className="input mb-4" placeholder="نسبة العمولة (%)" />
          <input className="input mb-4" placeholder="ميزانية ثابتة (اختياري)" />
          <input className="input mb-4" placeholder="Bonus إضافي (اختياري)" />

          <button
            className="btn-yellow w-full mt-6 py-3 text-lg"
            onClick={goToSummary}
          >
            📊 عرض ملخص الحملة
          </button>

        </motion.div>
      )}

    </div>
  );
}

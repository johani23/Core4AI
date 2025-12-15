// ============================================================================
// 💡 ProductInfluencerSuggestions.jsx — Merchant Matching (Phase 9)
//            STABLE BUILD (Crash-Proof)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function ProductInfluencerSuggestions({ product }) {
  // 🔒 حماية المنتج
  if (!product) {
    return (
      <div className="bg-red-500/20 p-4 text-red-300 rounded-xl mt-6">
        ⚠️ لا يوجد منتج لتحليل الملائمة.
      </div>
    );
  }

  const influenceAPI = useInfluence();

  // 🔒 حماية الـ context
  if (!influenceAPI) {
    return (
      <div className="bg-red-500/20 p-4 text-red-300 rounded-xl mt-6">
        ⚠️ النظام غير جاهز — (Context Error)
      </div>
    );
  }

  const { calculateFitScore, predictCommercialSuccess } = influenceAPI;

  // 🔒 حماية الدوال
  if (
    typeof calculateFitScore !== "function" ||
    typeof predictCommercialSuccess !== "function"
  ) {
    return (
      <div className="bg-red-500/20 p-4 text-red-300 rounded-xl mt-6">
        ⚠️ دوال الملائمة غير متوفرة حالياً. (Phase 9)
      </div>
    );
  }

  let fitScore = null;
  let projected = null;

  try {
    fitScore = calculateFitScore(product);
    projected = predictCommercialSuccess(product);
  } catch (err) {
    console.error("Merchant Matching ERROR:", err);
    return (
      <div className="bg-red-500/20 p-4 text-red-300 rounded-xl mt-6">
        ⚠️ حدث خطأ أثناء حساب الملائمة. يرجى المحاولة لاحقًا.
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl mt-6" dir="rtl">
      <h3 className="text-lg font-bold text-purple-300 mb-3">
        مدى ملائمة المؤثر لهذا المنتج
      </h3>

      <div className="text-white text-xl font-bold mb-2">
        {product.name}
      </div>

      <div className="text-yellow-300 text-sm mb-1">
        درجة الملائمة: {fitScore} / 200
      </div>

      <div className="text-green-300 text-sm mb-3">
        نسبة النجاح المتوقعة: {projected}%
      </div>

      <p className="text-gray-300 text-sm">
        تم احتساب هذه النسبة بناءً على تحليل المحتوى، قوة القبيلة، القدرة التجارية،
        ونمط سلوك المؤثر.
      </p>
    </div>
  );
}

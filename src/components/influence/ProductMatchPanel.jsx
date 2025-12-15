// ============================================================================
// 💡 ProductMatchPanel.jsx — Best Product Match for Influencer (STABLE BUILD)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { products } from "../../data/products";

export default function ProductMatchPanel() {
  // 🔒 حماية المنتجات
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6">
        ⚠️ لا توجد منتجات متاحة حالياً.
      </div>
    );
  }

  const influenceAPI = useInfluence();

  // 🔒 حماية context
  if (!influenceAPI) {
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6">
        ⚠️ النظام لم يُحمَّل بعد… (Context Error)
      </div>
    );
  }

  const { calculateFitScore, predictCommercialSuccess } = influenceAPI;

  // 🔒 حماية الدوال
  if (typeof calculateFitScore !== "function" || typeof predictCommercialSuccess !== "function") {
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6">
        ⚠️ النظام غير جاهز — دوال التنبؤ غير متوفرة.
      </div>
    );
  }

  // 🔧 حساب الملائمة
  let scored = [];

  try {
    scored = products
      .map((p) => ({
        ...p,
        fit: calculateFitScore(p),
        projection: predictCommercialSuccess(p),
      }))
      .sort((a, b) => b.fit - a.fit);
  } catch (err) {
    console.error("MATCHING ENGINE ERROR:", err);
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6">
        ⚠️ حدث خطأ أثناء تحليل المنتج — يرجى المحاولة لاحقاً.
      </div>
    );
  }

  const top = scored[0];

  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl mt-6" dir="rtl">
      <h2 className="text-lg font-bold text-purple-300 mb-3">
        أفضل منتج مناسب لك
      </h2>

      <div className="text-xl text-white font-bold">{top.name}</div>

      <div className="text-yellow-300 mt-1">
        درجة الملائمة: {top.fit} / 200
      </div>

      <div className="text-green-300 mt-1">
        نسبة نجاح التعاون: {top.projection}%
      </div>

      <p className="text-gray-300 text-sm mt-3">
        تم احتساب هذه النسبة اعتماداً على المحتوى الأعلى أداءً،
        قوة القبيلة، نمط السلوك، والقدرة التجارية للمؤثر.
      </p>
    </div>
  );
}

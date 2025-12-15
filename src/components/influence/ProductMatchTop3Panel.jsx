// ============================================================================
// 💎 ProductMatchTop3Panel.jsx — Top 3 Best Products for Influencer (Phase 9 PRO)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { products } from "../../data/products";

export default function ProductMatchTop3Panel() {
  const influenceAPI = useInfluence();

  // حماية ضد context not loaded
  if (!influenceAPI) {
    return (
      <div className="bg-red-500/20 p-4 rounded-xl text-red-300 mt-6">
        ⚠️ النظام غير جاهز لتحليل المنتجات.
      </div>
    );
  }

  const { calculateFitScore, predictCommercialSuccess } = influenceAPI;

  // حماية ضد دوال ناقصة
  if (
    typeof calculateFitScore !== "function" ||
    typeof predictCommercialSuccess !== "function"
  ) {
    return (
      <div className="bg-red-500/20 p-4 rounded-xl text-red-300 mt-6">
        ⚠️ نظام الملائمة غير مكتمل — يرجى إعادة تحميل الصفحة.
      </div>
    );
  }

  // حماية ضد بيانات المنتجات
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="bg-red-500/20 p-4 rounded-xl text-red-300 mt-6">
        ⚠️ لا توجد منتجات لعرض الملائمة.
      </div>
    );
  }

  let scoredProducts = [];
  try {
    scoredProducts = products
      .map((p) => ({
        ...p,
        fit: calculateFitScore(p),
        projection: predictCommercialSuccess(p),
      }))
      .sort((a, b) => b.fit - a.fit)
      .slice(0, 3); // أفضل 3
  } catch (err) {
    console.error("MATCHING ENGINE ERROR:", err);
    return (
      <div className="bg-red-500/20 p-4 rounded-xl text-red-300 mt-6">
        ⚠️ حدث خطأ أثناء تحليل المنتجات.
      </div>
    );
  }

  return (
    <div
      className="bg-white/5 border border-white/10 p-6 rounded-xl mt-6"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        🔥 أفضل 3 منتجات مناسبة لك
      </h2>

      <div className="space-y-5">
        {scoredProducts.map((p, index) => (
          <div
            key={p.id}
            className="bg-black/20 border border-white/10 p-4 rounded-xl hover:bg-black/30 transition"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-bold text-white">
                #{index + 1} — {p.name}
              </span>
              <span className="text-yellow-300 font-semibold">
                ملائمة: {p.fit} / 200
              </span>
            </div>

            <div className="text-green-300 text-sm">
              نسبة نجاح التعاون: {p.projection}%
            </div>

            <p className="text-gray-300 text-xs mt-2">
              تم تحليل هذا المنتج بناءً على قوة تأثيرك، محتواك الأعلى أداءً، 
              حالة القبيلة لديك، ونمط سلوكك كمؤثر.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – TribeInfluencePanel
// ----------------------------------------------------------------------------
// واجهة تعرض أفضل أعضاء القبيلة للترويج لمنتج معين بناءً على:
// - شرائح MIT (Audience Clusters)
// - موهبة العضو (Talent)
// - مرحلة حياته داخل القبيلة (Lifecycle Stage)
// - قوة الميزة الأساسية للمنتج (Feature)
// ============================================================================

import React from "react";
import { useTribeInfluence } from "@/context/TribeInfluenceContext";
import { useAudience } from "@/context/AudienceContext";

export default function TribeInfluencePanel({ product }) {
  const { clusters } = useAudience();
  const { getTopAmbassadors, getRecommendedCluster } = useTribeInfluence();

  if (!product)
    return (
      <div className="text-gray-400 text-sm">
        لا يوجد منتج محدد حاليًا — اختر منتجًا من واجهة التاجر.
      </div>
    );

  if (!clusters || !clusters.length)
    return (
      <div className="text-gray-400 text-sm">
        لا توجد شرائح جمهور جاهزة — يرجى إكمال تحليل MIT Audience.
      </div>
    );

  const topCluster = getRecommendedCluster(product);
  const ambassadors = getTopAmbassadors(product, 3);

  return (
    <div
      className="
        bg-white/10 border border-white/20 rounded-2xl 
        p-6 shadow-xl backdrop-blur-xl text-white space-y-4
      "
    >
      <h2 className="text-xl font-bold mb-2">🎯 موجز القبيلة لهذا المنتج</h2>

      {/* PRODUCT SUMMARY */}
      <div className="text-sm text-gray-200">
        <p>
          <b>المنتج:</b> {product.name}
        </p>
        <p>
          <b>السعر:</b> {product.price} ريال
        </p>
      </div>

      {/* CLUSTER SUMMARY */}
      {topCluster && (
        <div className="mt-3 bg-black/20 p-4 rounded-xl text-sm">
          <p className="font-bold text-green-300">
            👥 الشريحة الأنسب للإطلاق: {topCluster.label}
          </p>
          <p className="text-gray-300 mt-1">{topCluster.meaning}</p>
          <p className="mt-2 text-gray-300">
            💰 العائد المتوقع من هذه الشريحة:{" "}
            <b className="text-green-200">
              {topCluster.expectedRevenue?.toLocaleString("ar-EG")} ريال
            </b>
          </p>
        </div>
      )}

      {/* AMBASSADORS */}
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">🏆 أفضل سفراء لهذا المنتج</h3>

        {ambassadors.length === 0 && (
          <p className="text-sm text-gray-400">
            لا يوجد أعضاء جاهزون حالياً — طوّر مهارات أعضاء قبيلتك عبر التحديات.
          </p>
        )}

        {ambassadors.map((m, i) => (
          <div
            key={m.id || i}
            className="mt-2 bg-white/5 rounded-xl p-3 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-bold">
                {i + 1}. {m.name || "عضو بدون اسم"}
              </p>
              <p className="text-gray-300">
                درجة التأثير لهذا المنتج:{" "}
                <span className="text-green-300 font-bold">
                  {m.influenceScore}
                </span>
              </p>
            </div>
            <span className="text-xs bg-purple-600 px-3 py-1 rounded-full">
              Ambassador
            </span>
          </div>
        ))}
      </div>

      {/* AI TEXT SUMMARY */}
      <div className="mt-4 text-sm text-gray-200">
        <p className="font-bold mb-1">🤖 توصية Core4.AI:</p>
        <p>
          ابدأ الحملة عبر الشريحة الأعلى عائدًا ثم اختر{" "}
          <b>السفير الأول في القائمة</b> لقيادة المحتوى.  
          استخدم أسلوبه في التأثير لإقناع الجمهور المستهدف، ثم فعّل بقية
          أعضاء القبيلة تدريجيًا.
        </p>
      </div>
    </div>
  );
}

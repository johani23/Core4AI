// ============================================================================
// 💚 Core4.AI – Tribe Influence Briefing (AI-Powered Creator Brief)
// FINAL EDITION v1.0 — Personalized Influence Guide
// ----------------------------------------------------------------------------
// - Converts MIT Insights + Feature Strength + Talent Score into a 
//   personalized Influence Strategy for each Tribe Member.
// - Helps each member understand: WHO to target, HOW to talk, WHAT to post,
//   WHY they are uniquely positioned to promote this product.
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useTribe } from "@/context/TribeContext";

// Helper
const formatNumber = (n) => n?.toLocaleString("ar-EG") || n;

export default function TribeInfluenceBriefing({ product, clusters, feature }) {
  const { member, talentScore, lifecycleStage } = useTribe();

  // 1) Pick Best Audience Cluster to Match Member Talent
  const bestCluster = clusters.sort((a, b) => b.expectedRevenue - a.expectedRevenue)[0];

  // 2) Map lifecycle to communication style
  const lifecycleVoice = {
    spot: "أسلوب اكتشاف وفرص — محتوى يلفت الانتباه",
    assess: "أسلوب تقييم وتحليل — محتوى يقارن ويشرح",
    develop: "أسلوب تعليم وتجربة — محتوى يقدم خطوات أو نتائج",
    recruit: "أسلوب إقناع اجتماعي — محتوى يشجع على الانضمام أو التجربة",
    motivate: "أسلوب تحفيزي — محتوى يلهم المتابعين لاتخاذ خطوة الآن"
  }[lifecycleStage];

  // 3) Content formats based on talent score
  const smartFormat =
    talentScore >= 80
      ? "فيديو قصير ديناميكي + تجربة شخصية مباشرة"
      : talentScore >= 50
      ? "شرح قصير + عرض ميزة واحدة قوية"
      : "صور + نص بسيط مباشر يتضمن فائدة واحدة";

  // 4) Suggested angle from product feature
  const angle = `ركز على "${feature?.name}" لأنها أكثر نقطة تميز المنتج وتجذب فئة ${bestCluster.label}.`;

  // 5) Personalized CTA
  const customCTA = {
    high: "🔥 اطلب الآن — أفضل قيمة مقابل جودة استثنائية",
    mid: "✨ جرّب المنتج — السعر مناسب والمعايير ممتازة",
    low: "💸 استغل الخصم — فرصة لا تعوّض الآن!"
  }[bestCluster.type];

  return (
    <motion.div
      className="
        bg-white/10 border border-white/20 rounded-3xl 
        p-8 shadow-xl backdrop-blur-2xl text-white space-y-6
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      dir="rtl"
    >
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
        ⚡ موجز التأثير الشخصي (Influence Briefing)
      </h1>

      <p className="text-gray-300 text-sm">
        هذا الموجز صُمّم خصيصًا لك بناءً على موهبتك، أسلوبك، ونمط تأثيرك داخل المنصة.
      </p>

      {/* PRODUCT */}
      <div className="bg-white/5 border border-white/20 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-purple-200 mb-2">📦 المنتج</h2>
        <p><b>الاسم:</b> {product?.name}</p>
        <p><b>السعر:</b> {formatNumber(product?.price)} ريال</p>
        <p><b>الميزة الأقوى:</b> {feature.name}</p>
      </div>

      {/* BEST AUDIENCE CLUSTER */}
      <div className="bg-white/5 border border-white/20 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-green-300 mb-3">🎯 الشريحة الأنسب لك</h2>
        <p>
          Core4.AI وجد أن أفضل شريحة تتوافق مع طريقة تأثيرك هي:
          <span className="font-bold text-green-400"> {bestCluster.label} </span>
        </p>

        <ul className="mt-3 text-sm text-gray-300 space-y-1">
          <li>💰 السعر المناسب لهم: {bestCluster.price} ريال</li>
          <li>👥 حجم الشريحة المتوقع: {formatNumber(bestCluster.expectedVolume)} عميل</li>
          <li>🔥 العائد المتوقع للحملة: {formatNumber(bestCluster.expectedRevenue)} ريال</li>
        </ul>
      </div>

      {/* PERSONALISED CONTENT STRATEGY */}
      <div className="bg-white/5 border border-white/20 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-blue-300 mb-3">🎨 استراتيجية المحتوى الخاصة بك</h2>

        <p className="mb-3">🧠 <b>أسلوبك الأنسب:</b> {lifecycleVoice}</p>
        <p className="mb-3">🎬 <b>أنسب صيغة محتوى لك:</b> {smartFormat}</p>
        <p className="mb-3">🎯 <b>الزاوية المقترحة:</b> {angle}</p>
        <p className="mb-3">📣 <b>CTA جاهز للنشر:</b> {customCTA}</p>
      </div>

      {/* PERFORMANCE IMPACT */}
      <div className="bg-white/5 border border-white/20 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-yellow-300 mb-3">📈 تأثيرك المتوقع</h2>

        <p>
          بناءً على موهبتك <b>{talentScore}</b> ونمطك في التأثير داخل دورة العضو،
          نظام Core4.AI يتوقع أنك قادر على تحقيق:
        </p>

        <ul className="mt-3 space-y-1 text-gray-300 text-sm">
          <li>✨ وصول أوسع ضمن فئة {bestCluster.label}</li>
          <li>🚀 رفع التحويلات بنسبة تعتمد على أسلوبك ({lifecycleStage})</li>
          <li>🏆 زيادة XP بناءً على جودة المحتوى المنشور</li>
        </ul>
      </div>

      <p className="text-center text-purple-300 font-bold mt-6">
        💜 استخدم هذا الموجز كخارطة طريق للتميز في حملات Core4.AI القادمة.
      </p>
    </motion.div>
  );
}

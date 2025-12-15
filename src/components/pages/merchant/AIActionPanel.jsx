// ============================================================================
// 💚 Core4.AI – AIActionPanel.jsx (Step 9)
// ============================================================================
// - Auto Pricing
// - Auto Influencer
// - Auto Discount
// - Auto Launch Script
// - Auto Posting Time
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { products } from "@/data/products";

export default function AIActionPanel({ product }) {
  const {
    calculateFitScore,
    predictCommercialSuccess,
    suggestContentFormats,
    generateContentIdeas,
  } = useInfluence();

  if (!product) return null;

  const fit = calculateFitScore(product);
  const proj = predictCommercialSuccess(product);
  const formats = suggestContentFormats();
  const ideas = generateContentIdeas();

  const autoBestPrice = () => {
    const base = product.price;
    const optimized = Math.round(base * (proj > 70 ? 1.1 : 0.9));
    alert(`✔ السعر المثالي للحملة هو: ${optimized} ريال`);
  };

  const autoDiscount = () => {
    const discount = proj > 80 ? 5 : proj > 60 ? 10 : 15;
    alert(`💰 الخصم المقترح هو: ${discount}%`);
  };

  const autoInfluencer = () => {
    const topMatch = {
      name: "Lina StyleHub",
      fit,
      proj,
    };
    alert(`👑 أفضل مؤثر هو: ${topMatch.name}`);
  };

  const autoLaunchScript = () => {
    const script = `
🎥 حملة جديدة لمنتج ${product.name}
• النوع: ${formats.join(", ")}
• فكرة قوية: ${ideas[0]}
• نقطة البيع الذهبية: ${ideas[1]}
• CTA المقترح: اشترِ الآن – العرض محدود!
    `;
    alert(script);
  };

  const autoPostingTime = () => {
    const hour = new Date().getHours();
    const message =
      hour >= 13 && hour <= 22
        ? "🔥 الوقت الحالي ممتاز للنشر!"
        : "⏳ الأفضل الانتظار إلى وقت الذروة (8:00PM)";
    alert(message);
  };

  return (
    <div className="core-card mt-10" dir="rtl">
      <h2 className="text-xl font-bold text-purple-300 mb-4">
        🤖 إجراءات الذكاء الاصطناعي — AI Actions
      </h2>

      <div className="grid grid-cols-1 gap-3">

        <button
          className="btn-green"
          onClick={autoBestPrice}
        >
          💰 ضبط السعر المثالي تلقائياً
        </button>

        <button
          className="btn-purple"
          onClick={autoInfluencer}
        >
          👑 اختيار أفضل مؤثر للحملة
        </button>

        <button
          className="btn-blue"
          onClick={autoLaunchScript}
        >
          📸 إنشاء سيناريو حملة جاهز
        </button>

        <button
          className="btn-yellow"
          onClick={autoDiscount}
        >
          🔥 اقتراح خصم تلقائي لتحفيز البيع
        </button>

        <button
          className="btn-gray"
          onClick={autoPostingTime}
        >
          ⏰ أفضل وقت للنشر الآن
        </button>

      </div>
    </div>
  );
}

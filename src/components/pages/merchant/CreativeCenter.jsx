// ============================================================================
// 💚 Core4.AI – CreativeCenter (API + LocalStorage Safe Edition)
// ============================================================================
// - Loads product from backend if possible
// - Falls back to LocalStorage (MVP safe)
// - AI Concept Generator improved to use real product data
// ============================================================================

import React, { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { motion } from "framer-motion";

export default function CreativeCenter() {
  const { generateContentIdeas } = useInfluence();

  const [product, setProduct] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [copies, setCopies] = useState([]);
  const [storyboard, setStoryboard] = useState([]);

  // Try to load productId from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");

  // ============================================================================
  // LOAD PRODUCT: Backend → fallback LocalStorage
  // ============================================================================
  useEffect(() => {
    async function load() {
      try {
        if (productId) {
          const res = await fetch(`/api/merchant/products/${productId}`);
          if (res.ok) {
            const data = await res.json();
            setProduct(data);
            return;
          }
        }
      } catch (err) {
        console.error("Backend product load failed:", err);
      }

      // Fallback LocalStorage
      const local = JSON.parse(localStorage.getItem("core4ai_new_product") || "null");
      if (local) setProduct(local);
    }

    load();
  }, [productId]);

  // ============================================================================
  // AI GENERATORS (Safe + Improved)
  // ============================================================================

  const generateConcepts = () => {
    if (!product) return;

    // use product name + features to create better concepts
    const baseIdeas = generateContentIdeas(product.name);

    const ideas = [
      `💡 فكرة: عرض ميزة "${product.features?.[0]?.name || "الميزة الرئيسية"}" بصور واقعية.`,
      `⚡ فيديو قصير يوضح فائدة ${product.name} في الحياة اليومية.`,
      `🎯 إبراز الفرق بين ${product.name} وبين المنافسين عبر مقارنة ذكية.`,
      ...baseIdeas.slice(0, 2),
    ];

    setConcepts(ideas.slice(0, 3));
  };

  const generateCopies = () => {
    if (!product) return;

    const name = product.name || "المنتج";

    const cp = [
      `✨ قدّم يومك بشكل أفضل مع ${name} — التقنية التي تمنحك راحة حقيقية.`,
      `🔥 لماذا يحب الجميع ${name}؟ لأنه يجمع بين الجودة والقيمة.`,
      `💚 ${name}: اختيار ذكي لمن يبحث عن أفضل تجربة.`,
    ];

    setCopies(cp);
  };

  const generateStoryboard = () => {
    if (!product) return;

    const frames = [
      "📸 لقطة افتتاحية لإظهار تصميم المنتج بشكل جمالي",
      `👤 عميل يستخدم ${product.name} في موقف حقيقي`,
      "⚡ لقطة تركّز على الميزة الأقوى",
      "🎯 نص كبير يظهر الفائدة الأساسية",
      "🛒 CTA: اطلب الآن – العرض محدود",
    ];

    setStoryboard(frames);
  };

  // ============================================================================
  // UI
  // ============================================================================
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <div className="mt-6 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          الاستديو الإبداعي
        </h1>
        <p className="text-gray-500 mt-1">
          أنشئ أفكارًا وصورًا ونصوصًا إعلانية باستخدام الذكاء الاصطناعي
        </p>
      </div>

      {!product && (
        <p className="text-gray-500 text-center mt-20">
          لا يوجد منتج لتحليل المحتوى… أضف منتج أولاً.
        </p>
      )}

      {product && (
        <div className="space-y-12">

          {/* ===================================================== */}
          {/* 1) AI CONCEPT GENERATOR */}
          {/* ===================================================== */}
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🎨 مولّد الأفكار الإبداعية
            </h2>

            <p className="text-gray-600 mb-6">
              احصل على أفضل 3 أفكار إعلانية متوافقة مع منتجك
            </p>

            <button
              className="btn-purple px-8 py-3 mb-6"
              onClick={generateConcepts}
            >
              🚀 توليد الأفكار
            </button>

            {concepts.length > 0 && (
              <div className="space-y-4">
                {concepts.map((idea, i) => (
                  <CreativeCard key={i} index={i + 1} text={idea} />
                ))}
              </div>
            )}
          </section>

          {/* ===================================================== */}
          {/* 2) AD COPY GENERATOR */}
          {/* ===================================================== */}
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ✍️ مولّد النصوص الإعلانية (Ad Copy)
            </h2>

            <p className="text-gray-600 mb-6">
              نصوص جاهزة للاستخدام مباشرة في حملتك الإعلانية
            </p>

            <button
              className="btn-blue px-8 py-3 mb-6"
              onClick={generateCopies}
            >
              ✨ إنشاء نصوص إعلانية
            </button>

            {copies.length > 0 && (
              <div className="space-y-4">
                {copies.map((copy, i) => (
                  <CreativeCard key={i} index={i + 1} text={copy} />
                ))}
              </div>
            )}
          </section>

          {/* ===================================================== */}
          {/* 3) STORYBOARD GENERATOR */}
          {/* ===================================================== */}
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🎞️ لوحة القصة الإعلانية (Storyboard)
            </h2>

            <p className="text-gray-600 mb-6">
              تسلسل بصري جاهز لفيديو إعلان احترافي
            </p>

            <button
              className="btn-green px-8 py-3 mb-6"
              onClick={generateStoryboard}
            >
              🎬 إنشاء Storyboard
            </button>

            {storyboard.length > 0 && (
              <div className="space-y-3">
                {storyboard.map((frame, i) => (
                  <StoryboardRow key={i} index={i + 1} text={frame} />
                ))}
              </div>
            )}
          </section>

        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

const CreativeCard = ({ index, text }) => (
  <motion.div
    className="p-4 bg-gray-50 border rounded-xl shadow-sm"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 className="font-bold text-gray-900 mb-2">الفكرة {index}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const StoryboardRow = ({ index, text }) => (
  <motion.div
    className="p-3 bg-gray-50 border rounded-lg shadow-sm"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="font-bold text-gray-800">المشهد {index}</p>
    <p className="text-gray-600 text-sm">{text}</p>
  </motion.div>
);

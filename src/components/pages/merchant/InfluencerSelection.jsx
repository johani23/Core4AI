// ============================================================================
// 💚 Core4.AI – InfluencerSelection (AI + Cluster Matching)
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { useAudience } from "@/context/AudienceContext";
import { motion } from "framer-motion";

export default function InfluencerSelection() {
  const { calculateFitScore, predictCommercialSuccess } = useInfluence();
  const { clusters } = useAudience();

  const [product, setProduct] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  useEffect(() => {
    async function load() {
      if (productId) {
        const res = await fetch(`/api/merchant/products/${productId}`);
        if (res.ok) setProduct(await res.json());
      } else {
        const local = JSON.parse(localStorage.getItem("core4ai_new_product") || "null");
        if (local) setProduct(local);
      }
    }
    load();
  }, []);

  if (!product)
    return <div className="text-center text-gray-600 mt-16">جاري تحميل المنتج…</div>;

  const topCluster = clusters ? clusters[0] : null;

  // AI scoring + adjust to cluster
  function influencerClusterScore(inf) {
    const base = calculateFitScore(product);
    if (!topCluster) return base;

    if (topCluster.type === "high") return base * 1.3;
    if (topCluster.type === "mid") return base * 1.0;
    return base * 0.85;
  }

  const aiPick = {
    id: "ai_auto",
    name: "المؤثر المقترح من الذكاء الاصطناعي",
    fit: influencerClusterScore(product),
    projection: predictCommercialSuccess(product),
    reasons: [
      "تحليل الشريحة ذات العائد العالي",
      `سعر مناسب للشريحة: ${topCluster?.price} ريال`,
    ],
    cluster: topCluster,
  };

  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-8">اختيار المؤثرين</h1>

      <motion.div className="bg-purple-50 border p-5 rounded-xl">
        <h2 className="font-bold text-purple-700 text-xl">المؤثر الذكي (AI)</h2>

        <p className="text-lg font-bold mt-2">{aiPick.name}</p>
        <p className="text-sm text-gray-700 mt-1">
          ملاءمة: {aiPick.fit}
        </p>
        <p className="text-sm text-gray-700">
          النجاح المتوقع: {aiPick.projection}%
        </p>

        {topCluster && (
          <div className="mt-3 text-sm text-gray-800">
            <p>🎯 الشريحة: {topCluster.label}</p>
            <p>{topCluster.meaning}</p>
          </div>
        )}

        <button
          className="btn-purple mt-4 px-6 py-2"
          onClick={() => {
            localStorage.setItem(
              "core4ai_selected_influencers",
              JSON.stringify([aiPick])
            );
            alert("✔ تم اختيار المؤثر بنجاح!");
          }}
        >
          اختيار هذا المؤثر
        </button>
      </motion.div>
    </div>
  );
}

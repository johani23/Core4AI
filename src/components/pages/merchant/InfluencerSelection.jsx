// ============================================================================
// 💚 Core4.AI – InfluencerSelection
// AI MATCHER PRO + Tabs + Influencer Marketplace (MVP + AI Fit Badge)
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { motion } from "framer-motion";

// ============================================================================
// Simple AI Matching for Marketplace (Fit Score Only – MVP)
// ============================================================================
function calculateMarketplaceFitScore(product, influencer) {
  if (!product) return 0;

  let score = 0;

  const productCategory = product.category?.toLowerCase() || "";

  // 1) Category match
  if (productCategory === influencer.category) {
    score += 35;
  }

  // 2) Content similarity (very simple proxy – MVP)
  if (product.features?.some((f) => f.name?.toLowerCase().includes(influencer.category))) {
    score += 25;
  }

  // 3) Engagement weight (placeholder – يمكن تطويره لاحقاً)
  score += 20;

  // 4) Base signal so nobody hits zero
  score += 5;

  return Math.min(score, 100);
}

// Helper for Arabic label
function categoryLabel(cat) {
  return {
    beauty: "الجمال",
    tech: "التقنية",
    family: "العائلة",
    general: "عام",
  }[cat] || cat;
}

// ============================================================================
// Marketplace Data (Simple MVP)
// ============================================================================
const MARKETPLACE_INFLUENCERS = [
  // Beauty
  { id: "inf_b1", name: "سارة جمال", category: "beauty" },
  { id: "inf_b2", name: "نور ستايل", category: "beauty" },
  { id: "inf_b3", name: "ريم مكياج", category: "beauty" },
  { id: "inf_b4", name: "لمى عطور", category: "beauty" },

  // Tech
  { id: "inf_t1", name: "عبدالعزيز التقنية", category: "tech" },
  { id: "inf_t2", name: "علي قيمر", category: "tech" },
  { id: "inf_t3", name: "يوسف مراجعات", category: "tech" },
  { id: "inf_t4", name: "سما ديجيتال", category: "tech" },

  // Family
  { id: "inf_f1", name: "أم ريان", category: "family" },
  { id: "inf_f2", name: "سارة تنظيم", category: "family" },
  { id: "inf_f3", name: "شهد المطبخ", category: "family" },

  // General
  { id: "inf_g1", name: "حسن لايف", category: "general" },
  { id: "inf_g2", name: "مريم يومياتي", category: "general" },
  { id: "inf_g3", name: "نواف محتوى عام", category: "general" },
];

// ============================================================================
// COMPONENT
// ============================================================================
export default function InfluencerSelection() {
  const {
    predictCommercialSuccess,
    aiMatchProductToInfluencer,
  } = useInfluence();

  const [product, setProduct] = useState(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState("ai");

  // Marketplace filter state
  const [filterCategory, setFilterCategory] = useState("all");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  // --------------------------------------------------------------------------
  // Load product
  // --------------------------------------------------------------------------
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
        console.error("Backend load failed:", err);
      }

      // fallback
      const p = JSON.parse(localStorage.getItem("core4ai_new_product") || "null");
      if (p) setProduct(p);
    }

    load();
  }, []);

  if (!product)
    return <div className="text-center text-gray-500 mt-20">لا يوجد منتج.</div>;

  // --------------------------------------------------------------------------
  // AI Suggested Influencer (Smart Pick)
  // --------------------------------------------------------------------------
  const match = aiMatchProductToInfluencer(product) || { score: 0, reasons: [] };

  const topInfluencer = {
    id: "ai_match",
    name: "المؤثر الأنسب للمنتج",
    fit: match.score,
    projection: predictCommercialSuccess(product),
    reasons: match.reasons || [],
  };

  // --------------------------------------------------------------------------
  // Marketplace Data with Fit Score & Sorting
  // --------------------------------------------------------------------------
  const enrichedInfluencers = MARKETPLACE_INFLUENCERS.map((inf) => ({
    ...inf,
    fitScore: calculateMarketplaceFitScore(product, inf),
  }));

  const filteredInfluencers = enrichedInfluencers
    .filter((inf) =>
      filterCategory === "all" ? true : inf.category === filterCategory
    )
    .sort((a, b) => b.fitScore - a.fitScore); // الأعلى أولاً

  // --------------------------------------------------------------------------
  // Select influencer from marketplace
  // --------------------------------------------------------------------------
  function handleSelectFromMarketplace(inf) {
    const selected = {
      id: inf.id,
      name: inf.name,
      fit: inf.fitScore,
      projection: predictCommercialSuccess(product),
      reasons: [
        "تم اختيار المؤثر من سوق المؤثرين.",
        `فئة المؤثر: ${categoryLabel(inf.category)}`,
        `درجة الملاءمة حسب الذكاء الاصطناعي: ${inf.fitScore}%`,
      ],
    };

    localStorage.setItem(
      "core4ai_selected_influencers",
      JSON.stringify([selected])
    );

    alert("✔ تم اختيار المؤثر من سوق المؤثرين بنجاح");
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-8">
        اختيار المؤثرين الذكي
      </h1>

      {/* =========================
          TAB SWITCHER
      ========================== */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={() => setActiveTab("ai")}
          className={`px-5 py-2 rounded-lg font-bold transition ${
            activeTab === "ai"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          الذكاء الاصطناعي
        </button>

        <button
          onClick={() => setActiveTab("market")}
          className={`px-5 py-2 rounded-lg font-bold transition ${
            activeTab === "market"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          سوق المؤثرين
        </button>
      </div>

      {/* =========================
          TAB CONTENT
      ========================== */}

      {/* TAB 1 — AI Recommended */}
      {activeTab === "ai" && (
        <motion.div
          className="bg-purple-50 border border-purple-300 rounded-xl p-6 mb-12 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-bold text-purple-700">
            👑 المؤثر المقترح بالذكاء الاصطناعي
          </h3>

          <p className="mt-2 text-gray-800 text-lg font-bold">
            {topInfluencer.name}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            الملاءمة: {topInfluencer.fit} / 100
          </p>
          <p className="text-sm text-gray-600">
            النجاح المتوقع: {topInfluencer.projection}%
          </p>

          {topInfluencer.reasons?.length > 0 && (
            <ul className="mt-3 text-gray-700 text-sm list-disc pr-6">
              {topInfluencer.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}

          <button
            className="btn-purple mt-4 px-8 py-3"
            onClick={() => {
              localStorage.setItem(
                "core4ai_selected_influencers",
                JSON.stringify([topInfluencer])
              );
              alert("✔ تم اختيار المؤثر بنجاح");
            }}
          >
            ✔ اختيار هذا المؤثر
          </button>
        </motion.div>
      )}

      {/* TAB 2 — Marketplace */}
      {activeTab === "market" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {[
              { key: "all", label: "الكل" },
              { key: "beauty", label: "الجمال" },
              { key: "tech", label: "التقنية" },
              { key: "family", label: "العائلة" },
              { key: "general", label: "عام" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterCategory(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  filterCategory === f.key
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Influencers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredInfluencers.map((inf, index) => (
              <div
                key={inf.id}
                className="bg-white p-5 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                  {inf.name}

                  {/* AI Fit Badge */}
                  <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-700 font-bold">
                    {inf.fitScore}%{index === 0 ? " ⭐" : ""}
                  </span>
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  الفئة: {categoryLabel(inf.category)}
                </p>

                <button
                  className="btn-green w-full mt-4 py-2"
                  onClick={() => handleSelectFromMarketplace(inf)}
                >
                  اختيار هذا المؤثر
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

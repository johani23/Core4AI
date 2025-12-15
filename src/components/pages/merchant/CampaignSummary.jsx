// ============================================================================
// 💚 Core4.AI – CampaignSummary (Backend + MIT + AI Narrative)
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function CampaignSummary() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const campaignId = new URLSearchParams(window.location.search).get("id");


  // ============================================================================
  // LOAD CAMPAIGN FROM BACKEND
  // ============================================================================
  useEffect(() => {
    if (!campaignId) return;

    async function loadCampaign() {
      try {
        const res = await fetch(`/api/merchant/campaigns/${campaignId}`);
        if (!res.ok) throw new Error("Failed to load campaign");
        const data = await res.json();
        setCampaign(data);
      } catch (err) {
        console.error("❌ Failed to load campaign:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCampaign();
  }, [campaignId]);

  if (!campaignId)
    return <Msg text="❗ لا يوجد معرف حملة في الرابط." />;

  if (loading)
    return <Msg text="⏳ جاري تحميل بيانات الحملة…" />;

  if (!campaign)
    return <Msg text="❗ لم يتم العثور على الحملة." />;

  // ============================================================================
  // DERIVED DATA (MIT STORY)
  // ============================================================================
  const product = campaign.product || {};
  const mit = campaign.mit_pricing || {};

  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        ملخص الحملة – Core4.AI
      </h1>

      {/* ================= PRODUCT ================= */}
      <Box>
        <h2 className="section-title">📦 بيانات المنتج</h2>
        <p><strong>الاسم:</strong> {product.name}</p>
        <p className="text-sm text-gray-600 mt-1">
          الفئة: {product.category}
        </p>
      </Box>

      {/* ================= MIT PRICING ================= */}
      <Box>
        <h2 className="section-title">💰 قصة التسعير (MIT)</h2>

        <p className="mt-2">
          السعر الأساسي:
          <strong> {product.price} ريال</strong>
        </p>

        <p className="mt-1">
          أقرب سعر منافس:
          <strong> {product.competitor_price} ريال</strong>
        </p>

        {mit.recommended_price && (
          <>
            <p className="mt-3 text-blue-700 font-bold text-xl">
              🚀 السعر الذكي المقترح:
              <span className="ml-1">{mit.recommended_price} ريال</span>
            </p>

            <p className="text-sm text-gray-600 mt-2">
              نطاق القرار السعري: {mit.market_floor} – {mit.market_ceiling}
            </p>

            <p className="text-green-700 font-semibold mt-2">
              رفع التحويل المتوقع: {mit.conversion_lift}
            </p>
          </>
        )}

        <p className="text-gray-600 text-sm mt-4 leading-relaxed">
          يعتمد هذا السعر على مقارنة مباشرة مع أسعار المنافسين، وتحليل حساسية
          الطلب، وتوقعات التحويل عبر المؤثرين والقبائل.
        </p>
      </Box>

      {/* ================= CLUSTERS ================= */}
      <Box>
        <h2 className="section-title">🎯 استراتيجية الشرائح (Clusters)</h2>

        {(campaign.strategy?.sequence || []).map((label, i) => (
          <div key={i} className="mt-4 border p-4 rounded-xl bg-gray-50">
            <h3 className="font-bold text-lg">{label}</h3>
            {i === 0 && (
              <p className="mt-2 text-blue-700 font-bold">
                ⭐ الشريحة الأساسية لإطلاق الحملة
              </p>
            )}
          </div>
        ))}

        <p className="text-gray-600 text-sm mt-4">
          يتم ترتيب الشرائح تلقائيًا حسب العائد المتوقع لضمان أفضل نقطة دخول
          للسوق.
        </p>
      </Box>

      {/* ================= INFLUENCER ================= */}
      <Box>
        <h2 className="section-title">👑 المؤثر المستخدم</h2>

        <p className="font-bold text-lg mt-2">
          {campaign.influencer}
        </p>

        <p className="text-gray-700 text-sm">
          النجاح المتوقع: {campaign.ai_success_score}%
        </p>
      </Box>

      {/* ================= FINAL NOTE ================= */}
      <div className="text-center mt-10">
        <p className="text-xl font-bold text-green-700">
          🚀 الحملة جاهزة للإطلاق بناءً على أعلى شريحة ربحية.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// UI Helpers
// ============================================================================
const Box = ({ children }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
    {children}
  </div>
);

const Msg = ({ text }) => (
  <div className="text-center mt-20 text-gray-600 text-lg">
    {text}
  </div>
);

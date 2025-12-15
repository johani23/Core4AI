// ============================================================================
// 💚 Core4.AI – CampaignCenter (FINAL BACKEND VERSION)
// - Reads campaigns from SQL backend
// - No localStorage
// - Clean status handling
// - Production ready
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function CampaignCenter() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // Load campaigns from backend
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch("/api/merchant/campaigns");
        if (!res.ok) throw new Error("Failed to load campaigns");

        const data = await res.json();
        setCampaigns(data);
      } catch (e) {
        console.error("❌ Failed to load campaigns:", e);
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  const active = campaigns.filter((c) => c.status === "نشطة");
  const completed = campaigns.filter((c) => c.status !== "نشطة");

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="text-center mt-24 text-gray-500">
        ⏳ جاري تحميل الحملات...
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          الحملات التسويقية
        </h1>

        <button
          onClick={() => (window.location.href = "/merchant/products")}
          className="btn-green px-6 py-3"
        >
          ➕ إنشاء حملة جديدة
        </button>
      </div>

      {/* ACTIVE CAMPAIGNS */}
      <CampaignSection title="الحملات النشطة" campaigns={active} />

      {/* COMPLETED CAMPAIGNS */}
      <CampaignSection title="الحملات المكتملة" campaigns={completed} />
    </div>
  );
}

// ============================================================================
// Campaign Section
// ============================================================================

function CampaignSection({ title, campaigns }) {
  return (
    <section className="mb-14">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-sm">لا توجد حملات.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// Campaign Card
// ============================================================================

function CampaignCard({ campaign }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <h3 className="font-bold text-lg text-gray-900">
        المنتج #{campaign.product_id}
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        الفئة المستهدفة: <b>{campaign.audience}</b>
      </p>

      <p className="text-sm text-gray-600">
        المؤثر: {campaign.influencer || "غير محدد"}
      </p>

      <p className="text-sm text-purple-700 font-bold mt-3">
        السعر المقترح: {campaign.recommended_price} ريال
      </p>

      <p className="text-xs text-gray-500 mt-1">
        مؤشر النجاح (AI): {campaign.ai_success_score}%
      </p>

      <div className="flex justify-between items-center mt-5">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-bold ${
            campaign.status === "نشطة"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {campaign.status}
        </span>

        <button
          onClick={() =>
            (window.location.href = `/merchant/campaign-summary?id=${campaign.id}`)
          }
          className="text-blue-600 font-bold hover:underline"
        >
          عرض التفاصيل →
        </button>
      </div>
    </div>
  );
}

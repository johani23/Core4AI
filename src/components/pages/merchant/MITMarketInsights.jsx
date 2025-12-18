// ============================================================================
// 💚 Core4.AI – MITMarketInsights (FINAL UX + DECISION ENGINE)
// Decision-Oriented • Merchant-Ready • Zero Risk
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { apiFetch } from "@/lib/api";

export default function MITMarketInsights() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // LOAD DATA
  // ============================================================================
  useEffect(() => {
    async function load() {
      try {
        const p = await apiFetch(`/api/merchant/products/${id}`);
        const m = await apiFetch(`/api/merchant/products/${id}/mit`);

        setProduct(p);
        setMit(m);
      } catch {
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // ============================================================================
  // STATES
  // ============================================================================
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500" dir="rtl">
        ⏳ جاري تحليل السوق…
      </div>
    );
  }

  if (!product || !mit || mit.status !== "ready") {
    return (
      <div className="p-12 text-center text-gray-500" dir="rtl">
        ❌ لا يمكن عرض تحليل السوق لهذا المنتج
      </div>
    );
  }

  const smart = Number(mit.smart_price);
  const floor = Number(mit.market_floor);
  const ceiling = Number(mit.market_ceiling);

  // ============================================================================
  // DECISION ENGINE (SIMPLE + SAFE)
  // ============================================================================
  let decision = "optimal";
  let badge = "🟢 تسعير ممتاز";
  let explanation =
    "السعر المقترح داخل النطاق المثالي للسوق. يمكنك الإطلاق بثقة.";
  let action =
    "ننصح بالانتقال إلى صفحة التسعير لمراجعة السعر أو إطلاق حملة.";

  if (smart < floor) {
    decision = "under";
    badge = "🟡 السعر أقل من القيمة";
    explanation =
      "السعر أقل من متوسط السوق. قد تخسر هامش ربح محتمل.";
    action = "ننصح برفع السعر أو مراجعة استراتيجية التسعير.";
  }

  if (smart > ceiling) {
    decision = "over";
    badge = "🔴 السعر مرتفع";
    explanation =
      "السعر أعلى من تحمّل السوق الحالي. قد يؤثر على الطلب.";
    action = "ننصح بخفض السعر أو تحسين القيمة قبل الإطلاق.";
  }

  // ============================================================================
  // UI
  // ============================================================================
  return (
    <div className="max-w-4xl mx-auto mt-10" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-6 text-center">
        تحليل السوق (MIT)
      </h1>

      {/* DECISION BADGE */}
      <div
        className={`text-center text-lg font-bold mb-6 ${
          decision === "optimal"
            ? "text-green-700"
            : decision === "under"
            ? "text-yellow-700"
            : "text-red-700"
        }`}
      >
        {badge}
      </div>

      {/* PRICE BOX */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between border-b pb-3 mb-3">
          <span>السعر الذكي</span>
          <span className="font-bold">{smart} ريال</span>
        </div>

        <div className="flex justify-between">
          <span>نطاق السوق المقبول</span>
          <span className="font-bold">
            {floor} – {ceiling} ريال
          </span>
        </div>
      </div>

      {/* EXPLANATION */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 text-gray-700">
        <p className="mb-2 font-semibold">ماذا يعني هذا؟</p>
        <p>{explanation}</p>
      </div>

      {/* ACTION */}
      <div className="bg-blue-50 rounded-xl p-6 mb-10 text-blue-800">
        <p className="mb-2 font-semibold">التوصية التالية</p>
        <p>{action}</p>
      </div>

      {/* CTA */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(`/merchant/pricing/${id}`)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          الانتقال إلى التسعير
        </button>

        <button
          onClick={() => navigate("/merchant/products")}
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          العودة إلى المنتجات
        </button>
      </div>
    </div>
  );
}

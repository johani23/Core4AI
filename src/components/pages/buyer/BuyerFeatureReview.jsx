// ============================================================================
// ⭐ Core4.AI – BuyerFeatureReview (FINAL API EDITION v3)
// Rates the promoted feature after delivery — Real data + Clean UI
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BuyerFeatureReview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [stars, setStars] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const labels = ["سيئ", "ضعيف", "مقبول", "جيد", "ممتاز"];

  // ---------------------------------------------------------------------------
  // Load order to extract promoted feature
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");

        const data = await res.json();

        const normalized = {
          id: data.id,
          productName: data.product_name,
          promotedFeature: data.promoted_feature || null,
          status: data.status,
        };

        setOrder(normalized);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // ---------------------------------------------------------------------------
  // Submit review to backend
  // ---------------------------------------------------------------------------
  async function submitReview() {
    if (stars === 0 || matchScore === 0) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        order_id: id,
        stars,
        match_score: matchScore,
        comment,
      };

      const res = await fetch("/api/reviews/feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit feature review");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال التقييم.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Success UI
  // ---------------------------------------------------------------------------
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0F12] text-white p-8 flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-3xl font-bold text-yellow-300 mb-4">تم إرسال تقييمك بنجاح ⭐</h1>

        <p className="text-gray-300 mb-8">
          شكراً لمساعدتنا في تحسين جودة تجارب المستخدمين.
        </p>

        <button
          onClick={() => navigate("/buyer/orders")}
          className="px-10 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold text-white"
        >
          عرض الطلبات
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Loading / Error states
  // ---------------------------------------------------------------------------
  if (loading)
    return <div className="p-8 text-white">... جاري تحميل بيانات الطلب</div>;

  if (notFound || !order)
    return (
      <div className="p-8 text-red-400 text-center">
        ⚠️ لم يتم العثور على الطلب
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      <h1 className="text-3xl font-bold text-yellow-300 mb-6">
        ⭐ تقييم الميزة المروّجة
      </h1>

      <p className="text-gray-300 mb-4">
        المنتج: <span className="text-yellow-200">{order.productName}</span>
      </p>

      {order.promotedFeature ? (
        <p className="text-purple-300 mb-8">
          الميزة التي تم الترويج لها: <strong>{order.promotedFeature}</strong>
        </p>
      ) : (
        <p className="text-gray-400 mb-8">لا توجد ميزة مروّجة لهذا الطلب.</p>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">


        {/* STAR RATING */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">تقييمك العام للمنتج:</h3>
          <div className="flex flex-row-reverse justify-end gap-2 text-3xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setStars(n)}
                className={`cursor-pointer transition ${
                  n <= stars ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          {stars > 0 && (
            <p className="text-sm text-yellow-300 mt-2">{labels[stars - 1]}</p>
          )}
        </div>

        {/* FEATURE MATCH */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            هل كانت الميزة مطابقة لما تم وصفه؟ 🎯
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setMatchScore(n)}
                className={`px-4 py-2 rounded-xl border text-sm transition ${
                  matchScore === n
                    ? "bg-yellow-400 text-black border-yellow-300"
                    : "bg-white/5 text-gray-300 border-white/20 hover:bg-white/10"
                }`}
              >
                {n}/5
              </button>
            ))}
          </div>
        </div>

        {/* COMMENT */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">هل لديك ملاحظات إضافية؟</h3>
          <textarea
            className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none"
            placeholder="اكتب رأيك بكل صراحة..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={submitReview}
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {submitting ? "جاري الإرسال..." : "✔ إرسال التقييم"}
        </button>
      </div>
    </div>
  );
}

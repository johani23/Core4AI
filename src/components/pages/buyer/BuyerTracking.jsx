// ============================================================================
// 🚚 Core4.AI – BuyerTracking FINAL API EDITION (v3)
// Amazon/Noon Style Timeline • Fetches real order from backend
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BuyerTracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ---------------------------------------------------------------------------
  // Load order from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");

        const data = await res.json();

        const normalized = {
          id: data.id,
          name: data.product_name,
          timeline: data.tracking || [],     // array of steps
          currentStatus: data.status || "",  // current step
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
  // UI: Loading state
  // ---------------------------------------------------------------------------
  if (loading)
    return (
      <div className="p-8 text-white text-center">... جاري تحميل بيانات التتبع</div>
    );

  // ---------------------------------------------------------------------------
  // UI: Not found
  // ---------------------------------------------------------------------------
  if (notFound || !order)
    return (
      <div className="min-h-screen bg-[#0A0F12] text-red-400 text-center p-8">
        ⚠️ لم يتم العثور على هذا الطلب
        <div className="mt-4">
          <button
            onClick={() => navigate("/buyer/orders")}
            className="bg-purple-600 px-5 py-2 rounded-xl text-white"
          >
            عرض جميع الطلبات
          </button>
        </div>
      </div>
    );

  // ---------------------------------------------------------------------------
  // Determine current progress index
  // ---------------------------------------------------------------------------
  const statusIndex = order.timeline.findIndex(
    (s) => s.status === order.currentStatus
  );

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-300 hover:text-white mb-6"
      >
        ← رجوع
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        تتبع الشحنة 🚚
      </h1>

      {/* ORDER SUMMARY */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold">{order.name}</h2>

        <p className="text-gray-300 text-sm mt-1">
          رقم الطلب: #{order.id}
        </p>

        {statusIndex >= 0 && (
          <p className="text-emerald-400 font-semibold mt-2">
            الحالة الحالية: {order.timeline[statusIndex]?.label}
          </p>
        )}
      </div>

      {/* TIMELINE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {order.timeline.length === 0 && (
          <p className="text-gray-400 text-sm">لا يوجد تتبع متاح حتى الآن.</p>
        )}

        {order.timeline.map((step, i) => {
          const active = i <= statusIndex;

          return (
            <div key={i} className="flex items-start gap-4 mb-6">

              {/* Dot */}
              <div
                className={`w-5 h-5 rounded-full border ${
                  active
                    ? "bg-purple-500 border-purple-500"
                    : "border-gray-500"
                }`}
              ></div>

              {/* Label */}
              <div>
                <p
                  className={`font-bold text-sm ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>

                {step.date && (
                  <p className="text-gray-500 text-xs mt-1">{step.date}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

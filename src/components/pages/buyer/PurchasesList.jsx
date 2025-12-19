// ============================================================================
// 📦 Core4.AI – OrderDetails v10 (FINAL API EDITION)
// Loads real order from backend + safe fallbacks + clean UI
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PurchasesStatusBadge from "./PurchasesStatusBadge";
import { sendEvent } from "@/analytics/eventBus";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ✅ Backend base (REQUIRED)
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  // ---------------------------------------------------------------------------
  // Load order from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");

        const data = await res.json();

        const normalized = {
          id: data.id,
          name: data.product_name,
          img:
            data.image_url ||
            "https://via.placeholder.com/600x400?text=Product",
          seller: data.seller || "Core4 Marketplace",
          price: data.total_price,
          status: data.status || "Pending",
          placedOn: data.created_at?.substring(0, 10),
          deliveredOn: data.delivered_at?.substring(0, 10) || null,
          tracking: data.tracking || [],
          promotedFeature: data.promoted_feature || null,
        };

        setOrder(normalized);

        // Analytics (safe)
        sendEvent("ORDER_VIEWED", {
          order_id: normalized.id,
          product_name: normalized.name,
          status: normalized.status,
        });
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, API_BASE]);

  // ---------------------------------------------------------------------------
  // Loading / Error states
  // ---------------------------------------------------------------------------
  if (loading)
    return (
      <div className="p-8 text-white text-center">
        ... جاري تحميل تفاصيل الطلب
      </div>
    );

  if (notFound || !order)
    return (
      <div className="p-8 text-center text-red-400">
        ⚠️ الطلب غير موجود
        <div className="mt-4">
          <button
            onClick={() => navigate("/buyer/orders")}
            className="px-5 py-2 bg-purple-600 rounded-xl text-white"
          >
            عرض جميع الطلبات
          </button>
        </div>
      </div>
    );

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">
      {/* BACK BUTTON */}
      <button
        className="text-gray-300 hover:text-white mb-6"
        onClick={() => navigate(-1)}
      >
        ← رجوع
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        تفاصيل الطلب 📦
      </h1>

      {/* ORDER CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 mb-10">
        <img
          src={order.img}
          alt={order.name}
          className="w-32 h-32 object-cover rounded-xl border border-white/10"
        />

        <div className="flex-1">
          <h2 className="text-xl font-bold">{order.name}</h2>

          <div className="mt-1">
            <PurchasesStatusBadge status={order.status} />
          </div>

          <p className="text-gray-400 text-sm mt-2">
            البائع: <span className="text-gray-200">{order.seller}</span>
          </p>

          <p className="text-emerald-400 text-sm font-semibold mt-1">
            السعر: {order.price} SAR
          </p>

          <p className="text-gray-400 text-sm mt-1">
            رقم الطلب: #{order.id}
          </p>

          <p className="text-gray-400 text-xs mt-1">
            تاريخ الطلب: {order.placedOn}
          </p>
        </div>
      </div>

      {/* TRACKING */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
        <h3 className="text-lg font-bold text-purple-300 mb-4">
          حالة الطلب
        </h3>

        {order.tracking.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لا يوجد تتبع متاح حالياً.
          </p>
        ) : (
          <ul className="space-y-4 text-gray-300 text-sm">
            {order.tracking.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="text-purple-300 text-lg">•</div>
                <div>
                  <p className="font-semibold">{t.step}</p>
                  {t.date && (
                    <p className="text-gray-500 text-xs mt-1">{t.date}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/buyer/activity")}
          className="px-5 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold"
        >
          ✍️ اكتب تقييم
        </button>

        <button
          onClick={() => navigate(`/buyer/tracking/${order.id}`)}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          🚚 تتبع الشحنة
        </button>

        <button
          onClick={() => navigate("/buyer/claims")}
          className="px-5 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold"
        >
          🛡 فتح مطالبة
        </button>

        <button
          onClick={() => navigate(`/buyer/checkout/${order.id}`)}
          className="px-5 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold"
        >
          🔁 إعادة الطلب
        </button>
      </div>
    </div>
  );
}

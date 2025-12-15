// ============================================================================
// 📦 Core4.AI – PurchasesList v7 (FINAL API EDITION)
// Loads real orders • Clean RTL UI • Investor-Ready
// ============================================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PurchasesStatusBadge from "./PurchasesStatusBadge";
import { sendEvent } from "@/analytics/eventBus";

export default function PurchasesList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // Load real orders from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders?buyer_id=1");
        const data = await res.json();

        const normalized = data.map((o) => ({
          id: o.id,
          name: o.product_name,
          status: o.status || "Pending",
          date: o.created_at?.substring(0, 10) || "—",
          img:
            o.image_url ||
            "https://via.placeholder.com/300x200?text=Product",
        }));

        setOrders(normalized);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-2">مشترياتي 📦</h1>
      <p className="text-gray-300 mb-8">
        جميع طلباتك السابقة تظهر هنا. اضغط على أي طلب لعرض التفاصيل الكاملة.
      </p>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400 text-center mt-10">
          ... جاري تحميل الطلبات
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && orders.length === 0 && (
        <p className="text-gray-500 text-sm text-center mt-10">
          لا توجد طلبات حتى الآن — جرّب التصفح في صفحة الاقتراحات 🔮
        </p>
      )}

      {/* ORDER LIST */}
      <div className="space-y-5">
        {orders.map((item) => (
          <Link
            key={item.id}
            to={`/buyer/order/${item.id}`}
            onClick={() =>
              sendEvent("ORDER_LIST_ITEM_CLICKED", {
                order_id: item.id,
                product_name: item.name,
                status: item.status,
              })
            }
            className="
              flex gap-4 items-center
              bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-white/20
              transition cursor-pointer
              rounded-2xl p-4
            "
          >
            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 rounded-xl object-cover border border-white/10"
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {item.name}
              </h3>

              <div className="mt-1">
                <PurchasesStatusBadge status={item.status} />
              </div>

              <p className="text-gray-400 text-sm mt-1">
                تاريخ الطلب: {item.date}
              </p>
            </div>

            {/* ARROW (RTL) */}
            <div className="text-gray-500 text-xl">←</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

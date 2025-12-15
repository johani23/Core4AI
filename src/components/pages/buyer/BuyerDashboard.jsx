// ============================================================================
// 💚 Core4.AI – BuyerDashboard (API v7 FINAL PRO EDITION)
// Fully data-driven: orders, wishlist, recent viewed, persona, XP.
// Matching BuyerFeed • BuyerHome • BuyerActivity • RTL
// ============================================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";
import { useBuyer } from "@/context/BuyerContext";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerDashboard() {
  const { persona } = useAudience();
  const { wishlist, recentViewed } = useBuyer();
  const { xp } = useCoreSync();

  const username = persona?.name ?? "مستخدم";
  const tribe = persona?.tribe ?? "غير محددة";

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ---------------------------------------------------------------------------
  // LOAD ORDERS FROM BACKEND
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders?buyer_id=1");
        const data = await res.json();
        setOrders(data.slice(0, 3)); // show small preview
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">
          لوحة التحكم 🛒
        </h1>
        <p className="text-gray-300 text-lg">
          مرحبًا يا {username}! إليك ملخص نشاطك داخل Core4.AI.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* XP LEVEL */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <h3 className="text-gray-400 text-sm mb-2">نقاط الخبرة (XP)</h3>
          <p className="text-4xl font-bold text-green-400">{xp}</p>
          <p className="text-gray-500 text-sm mt-2">
            يزداد كلما تفاعلت مع المنصة 💪
          </p>
        </div>

        {/* TRIBE */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <h3 className="text-gray-400 text-sm mb-2">قبيلتك</h3>
          <p className="text-3xl font-bold text-purple-300">{tribe}</p>
          <p className="text-gray-500 text-sm mt-2">
            نخصص تجربتك بناءً على القبيلة 🔮
          </p>
        </div>

        {/* FAVORITES COUNT */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <h3 className="text-gray-400 text-sm mb-2">المفضلة ❤️</h3>
          <p className="text-3xl font-bold text-pink-400">{wishlist.length}</p>
          <p className="text-gray-500 text-sm mt-2">
            عدد المنتجات التي أعجبتك داخل المنصة
          </p>
        </div>

      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

        <Link
          to="/buyer/feed"
          className="bg-purple-600 hover:bg-purple-500 p-6 rounded-2xl text-center font-bold"
        >
          🔮 الاقتراحات الذكية
        </Link>

        <Link
          to="/buyer/orders"
          className="bg-blue-600 hover:bg-blue-500 p-6 rounded-2xl text-center font-bold"
        >
          📦 مشترياتي
        </Link>

        <Link
          to="/buyer/wishlist"
          className="bg-pink-600 hover:bg-pink-500 p-6 rounded-2xl text-center font-bold"
        >
          ❤️ المفضلة
        </Link>

        <Link
          to="/buyer/claims"
          className="bg-red-600 hover:bg-red-500 p-6 rounded-2xl text-center font-bold"
        >
          🛡 مركز الحماية
        </Link>

      </div>

      {/* LAST ORDERS */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">آخر الطلبات 📦</h2>

        {loadingOrders ? (
          <p className="text-gray-400 text-sm">... جاري تحميل الطلبات</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لا يوجد طلبات حتى الآن — قم بأول عملية شراء!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orders.map((order) => (
              <Link
                to={`/buyer/order/${order.id}`}
                key={order.id}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition"
              >
                <p className="font-bold text-purple-300 mb-1">
                  طلب رقم #{order.id}
                </p>
                <p className="text-gray-300 text-sm">{order.product_name}</p>
                <p className="text-emerald-300 text-xs mt-1">
                  السعر: {order.total_price} SAR
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* RECENT VIEWED PRODUCTS */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">شاهدتها مؤخرًا 🔍</h2>

        {recentViewed.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لم تشاهد أي منتجات بعد — جرّب التصفح في صفحة الاقتراحات 🔮
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentViewed.slice(0, 3).map((p) => (
              <Link
                to={`/buyer/product/${p.id}`}
                key={p.id}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition"
              >
                <div className="h-32 w-full bg-white/10 rounded-xl mb-3 overflow-hidden">
                  <img
                    src={p.img || p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="font-bold">{p.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  السعر: <span className="text-emerald-300">SAR {p.price}</span>
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="text-center mt-16">
        <Link
          to="/buyer/feed"
          className="
            bg-gradient-to-r from-purple-600 to-pink-500
            px-10 py-4 rounded-2xl
            text-xl font-bold
            hover:opacity-90 transition-all
          "
        >
          ابدأ التصفح الآن 🔮
        </Link>

        <p className="text-gray-400 text-sm mt-3">
          كلما زاد تفاعلك — حصلت على توصيات أدق وميزات أفضل ✨
        </p>
      </div>

    </div>
  );
}

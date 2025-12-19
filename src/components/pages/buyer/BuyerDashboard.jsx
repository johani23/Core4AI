// ============================================================================
// 💚 Core4.AI – BuyerDashboard (FINAL SIGNED VERSION)
// Segment-first • UX complete • Signal-safe • No layout hacks
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

  // Backend base
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  // ---------------------------------------------------------------------------
  // Load last orders
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/orders?buyer_id=1`);
        const data = await res.json();
        setOrders(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    }
    load();
  }, [API_BASE]);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">
          لوحة تحكم المشتري
        </h1>
        <p className="text-gray-300 text-lg">
          مرحبًا يا {username} — هذا ملخص نشاطك داخل Core4.AI.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">نقاط الخبرة (XP)</h3>
          <p className="text-4xl font-bold text-green-400">{xp}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">قبيلتك</h3>
          <p className="text-3xl font-bold text-purple-300">{tribe}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">المفضلة</h3>
          <p className="text-3xl font-bold text-pink-400">
            {wishlist.length}
          </p>
        </div>
      </div>

      {/* QUICK LINKS — COMPLETE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-14">

        <Link
          to="/buyer/feed"
          className="bg-purple-600 hover:bg-purple-500 p-5 rounded-2xl text-center font-bold"
        >
          🔮 الاقتراحات
        </Link>

        <Link
          to="/buyer/orders"
          className="bg-blue-600 hover:bg-blue-500 p-5 rounded-2xl text-center font-bold"
        >
          📦 طلباتي
        </Link>

        <Link
          to="/buyer/wishlist"
          className="bg-pink-600 hover:bg-pink-500 p-5 rounded-2xl text-center font-bold"
        >
          ❤️ المفضلة
        </Link>

        <Link
          to="/buyer/activity"
          className="bg-emerald-600 hover:bg-emerald-500 p-5 rounded-2xl text-center font-bold"
        >
          📊 نشاطي
        </Link>

        <Link
          to="/buyer/rnd"
          className="bg-indigo-600 hover:bg-indigo-500 p-5 rounded-2xl text-center font-bold"
        >
          🧪 نوايا السوق
        </Link>

        <Link
          to="/buyer/claims"
          className="bg-red-600 hover:bg-red-500 p-5 rounded-2xl text-center font-bold"
        >
          🛡 المطالبات
        </Link>
      </div>

      {/* LAST ORDERS */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">
          آخر الطلبات
        </h2>

        {loadingOrders ? (
          <p className="text-gray-400 text-sm">جاري التحميل…</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لا يوجد طلبات حتى الآن.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/buyer/order/${order.id}`}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition"
              >
                <p className="font-bold text-purple-300">
                  طلب #{order.id}
                </p>
                <p className="text-gray-300 text-sm">
                  {order.product_name}
                </p>
                <p className="text-emerald-300 text-xs mt-1">
                  {order.total_price} SAR
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* RECENT VIEWED */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-purple-300 mb-4">
          شاهدتها مؤخرًا
        </h2>

        {recentViewed.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لم تشاهد أي منتجات بعد.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentViewed.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/buyer/product/${p.id}`}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition"
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
                  SAR {p.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

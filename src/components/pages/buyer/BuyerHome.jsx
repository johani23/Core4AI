// ============================================================================
// 💚 Core4.AI – BuyerHome (v6 FINAL API-READY EDITION)
// Clean • Real Data • Investor-Level • No Static Blocks
// ============================================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";
import { useCoreSync } from "@/context/CoreSyncContext";
import { useBuyer } from "@/context/BuyerContext";

export default function BuyerHome() {
  const { persona } = useAudience();
  const { xp } = useCoreSync();
  const { recentViewed } = useBuyer();

  const username = persona?.name ?? "مستخدم";
  const tribe = persona?.tribe ?? "غير محددة";

  const [recentOrders, setRecentOrders] = useState([]);
  const [quickRecos, setQuickRecos] = useState([]);

  // ✅ Backend base
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  // ---------------------------------------------------------------------------
  // Load latest orders
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch(`${API_BASE}/api/orders?buyer_id=1`);
        const data = await res.json();
        setRecentOrders(data.slice(0, 3));
      } catch (err) {
        console.error("BuyerHome: failed to load orders", err);
      }
    }
    loadOrders();
  }, [API_BASE]);

  // ---------------------------------------------------------------------------
  // Load quick recommendations
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadRecos() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        setQuickRecos(data.slice(0, 3));
      } catch (err) {
        console.error("BuyerHome: failed to load recommendations", err);
      }
    }
    loadRecos();
  }, [API_BASE]);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-purple-400">
          لوحة المشتري
        </h1>
        <p className="text-gray-300 text-lg">
          مرحبًا يا {username}! هذه نظرة عامة على نشاطك.
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm mb-2">نقاط الخبرة (XP)</h2>
          <p className="text-4xl font-bold text-green-400">{xp}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm mb-2">قبيلتك</h2>
          <p className="text-3xl font-bold text-purple-300">{tribe}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm mb-2">مستواك</h2>
          <p className="text-3xl font-bold text-amber-300">
            {xp < 100 ? "Bronze" : xp < 300 ? "Silver" : "Gold"}
          </p>
        </div>
      </div>

      {/* MAIN ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <Link to="/buyer/feed" className="bg-purple-600 p-5 rounded-2xl text-center font-bold">
          الاقتراحات الذكية
        </Link>

        <Link to="/buyer/orders" className="bg-blue-600 p-5 rounded-2xl text-center font-bold">
          مشترياتي
        </Link>

        <Link to="/buyer/activity" className="bg-green-600 p-5 rounded-2xl text-center font-bold">
          نشاطي
        </Link>

        <Link to="/buyer/claims" className="bg-red-600 p-5 rounded-2xl text-center font-bold">
          مركز الحماية
        </Link>
      </div>

      {/* RECENT VIEWED */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">شوهد مؤخرًا</h2>

        {recentViewed.length === 0 ? (
          <p className="text-gray-400 text-sm">لا يوجد عناصر بعد.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentViewed.slice(0, 4).map((item) => (
              <Link
                to={`/buyer/product/${item.id}`}
                key={item.id}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl"
              >
                <div className="h-28 w-full overflow-hidden rounded-xl mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-emerald-400 text-xs">SAR {item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* QUICK RECOMMENDATIONS */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">
          اقتراحات سريعة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickRecos.map((p) => (
            <Link
              to={`/buyer/product/${p.id}`}
              key={p.id}
              className="bg-white/5 border border-white/10 p-4 rounded-2xl"
            >
              <div className="h-32 w-full overflow-hidden rounded-xl mb-3">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-bold">{p.name}</p>
              <p className="text-xs text-gray-400">SAR {p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

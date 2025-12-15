// ============================================================================
// 📊 Core4.AI – BuyerActivity (v4 FINAL API EDITION)
// Shows: Recent Viewed • Wishlist • Orders • General Activity
// ============================================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBuyer } from "@/context/BuyerContext";

export default function BuyerActivity() {
  const { recentViewed, wishlist } = useBuyer();
  const [orders, setOrders] = useState([]);

  // Load last orders from backend
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders?buyer_id=1");
        const data = await res.json();
        setOrders(data.slice(0, 5)); // show last 5
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-2">نشاطي 📊</h1>
      <p className="text-gray-300 mb-10">
        سجل تفاعلاتك داخل Core4.AI — التصفح، الطلبات، والمفضلة.
      </p>

      {/* ---------------------------------------- */}
      {/* 🔮 RECENT VIEWED */}
      {/* ---------------------------------------- */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">شوهد مؤخرًا 👀</h2>

        {recentViewed.length === 0 ? (
          <p className="text-gray-400 text-sm">لم تشاهد أي منتجات بعد.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentViewed.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to={`/buyer/product/${p.id}`}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition"
              >
                <div className="h-28 w-full overflow-hidden rounded-xl mb-3">
                  <img
                    src={p.img || p.image_url}
                    className="w-full h-full object-cover"
                    alt={p.name}
                  />
                </div>

                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-emerald-400 text-xs">SAR {p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------- */}
      {/* ❤️ WISHLIST ACTIVITY */}
      {/* ---------------------------------------- */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">المفضلة ❤️</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-400 text-sm">لا يوجد منتجات مضافة بعد.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to={`/buyer/product/${p.id}`}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition"
              >
                <div className="h-28 w-full overflow-hidden rounded-xl mb-3">
                  <img
                    src={p.img || p.image_url}
                    className="w-full h-full object-cover"
                    alt={p.name}
                  />
                </div>

                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-emerald-400 text-xs">SAR {p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------- */}
      {/* 📦 ORDER HISTORY */}
      {/* ---------------------------------------- */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-purple-300 mb-4">طلباتك الأخيرة 📦</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-sm">
            لا يوجد طلبات بعد — قم بأول عملية شراء الآن!
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm"
              >
                <p className="font-bold text-purple-300">طلب #{order.id}</p>
                <p className="text-gray-300 text-sm">{order.product_name}</p>
                <p className="text-emerald-400 text-sm">
                  SAR {order.total_price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------- */}
      {/* 📈 GENERAL USER ACTIVITY (STATIC UX TEXTS) */}
      {/* ---------------------------------------- */}
      <div className="mb-20">
        <h2 className="text-xl font-bold text-purple-300 mb-4">نشاط عام 🔥</h2>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <ul className="space-y-3 text-gray-300 text-sm">

            <li>🛍️ استكشفت منتجات داخل صفحة الاقتراحات الذكية</li>
            <li>❤️ أضفت منتجات إلى المفضلة</li>
            <li>🔄 تفاعلت مع عدة منتجات داخل المنصة</li>
            <li>🧾 أتممت {orders.length} طلبات حتى الآن</li>

          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/buyer/feed"
          className="
            bg-gradient-to-r from-purple-600 to-pink-500
            px-10 py-4 rounded-2xl
            text-xl font-bold
            hover:opacity-90 transition
          "
        >
          استكشف المنتجات 🔮
        </Link>

        <p className="text-gray-400 text-sm mt-3">
          نشاطك يشكّل تجربة الشراء المخصصة لك ✨
        </p>
      </div>
    </div>
  );
}

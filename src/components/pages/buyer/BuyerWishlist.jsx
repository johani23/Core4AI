// ============================================================================
// ❤️ Core4.AI – BuyerWishlist CLEAN v4 (API FINAL EDITION)
// Supports backend images + correct navigation + safe fallbacks
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";
import { useBuyer } from "@/context/BuyerContext";

export default function BuyerWishlist() {
  const { wishlist, removeFromWishlist } = useBuyer();

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-2">المفضلة ❤️</h1>
      <p className="text-gray-300 mb-10">
        هنا تجد المنتجات التي أحببتها سابقًا.
      </p>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4 opacity-60">❤️</div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">
            لم تُضف أي منتج إلى المفضلة بعد
          </h2>

          <p className="text-gray-400 mb-6">
            تصفّح المنتجات وابدأ بإضافة ما يعجبك إلى قائمتك الخاصة.
          </p>

          <Link
            to="/buyer/feed"
            className="
              bg-gradient-to-r from-purple-600 to-pink-500
              px-8 py-3 rounded-xl text-lg font-bold
              hover:opacity-90 transition
            "
          >
            استكشف الاقتراحات 🔮
          </Link>
        </div>
      )}

      {/* WISHLIST GRID */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {wishlist.map((p) => {
            const image = p.img || p.image_url || "https://via.placeholder.com/300";

            return (
              <div
                key={p.id}
                className="
                  bg-white/5 border border-white/10 p-5 rounded-2xl
                  hover:bg-white/10 transition cursor-pointer
                  backdrop-blur-sm
                "
              >
                {/* IMAGE */}
                <div className="h-40 w-full rounded-xl overflow-hidden border border-white/10 mb-4">
                  <img
                    src={image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NAME */}
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>

                {/* PRICE */}
                {p.price && (
                  <p className="text-emerald-300 font-semibold text-sm mb-3">
                    SAR {p.price}
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex items-center justify-between mt-4">

                  {/* VIEW PRODUCT DETAILS */}
                  <Link
                    to={`/buyer/product/${p.id}`}
                    className="
                      text-purple-300 hover:text-purple-200 text-sm
                      font-semibold
                    "
                  >
                    عرض التفاصيل →
                  </Link>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="
                      text-red-400 hover:text-red-300 text-sm
                      font-semibold
                    "
                  >
                    إزالة ✖
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

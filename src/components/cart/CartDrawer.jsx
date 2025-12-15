// ============================================================================
// 🛒 Core4.AI – CartDrawer PRO (v5 API + Checkout Edition)
// Sliding drawer • Clean UI • Fully connected to BuyerCheckout
// ============================================================================

import React from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, increaseQty, decreaseQty, total } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end"
      dir="rtl"
    >
      {/* Drawer */}
      <div className="w-[350px] bg-[#11161A]/90 border-l border-white/10 p-5 h-full overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-purple-300">سلتك 🛒</h2>
          <button className="text-gray-300 text-3xl" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">السلة فارغة.</p>
        ) : (
          <>
            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
              >
                {/* Image */}
                <img
                  src={item.img || item.image_url}
                  className="w-full h-28 object-cover rounded-xl border border-white/10 mb-3"
                  alt={item.name}
                />

                <h3 className="font-bold text-white">{item.name}</h3>

                {/* Price */}
                <p className="text-emerald-400 font-semibold mt-1">
                  SAR {item.price}
                </p>

                {/* Stock Warning */}
                {item.stock === 0 && (
                  <p className="text-red-400 text-xs mt-1">❌ نفد من المخزون</p>
                )}

                {/* Quantity Controller */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span className="font-bold">{item.qty}</span>

                  <button
                    className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  className="text-red-400 text-sm mt-3 underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  إزالة المنتج
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="mt-5 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-lg font-bold text-white">
                المجموع:{" "}
                <span className="text-green-400">{total} SAR</span>
              </p>
            </div>

            {/* Checkout */}
            <button
              className="
                w-full bg-purple-600 hover:bg-purple-500 mt-5 py-3 rounded-xl
                font-bold text-white transition active:scale-95
              "
              onClick={() => {
                if (items.length > 0) {
                  // Always checkout with the FIRST product for now (MVP)
                  const product = items[0];
                  navigate(`/buyer/checkout/${product.id}`, {
                    state: { product },
                  });
                  onClose();
                }
              }}
            >
              🧾 إنهاء الطلب
            </button>
          </>
        )}

      </div>
    </div>
  );
}

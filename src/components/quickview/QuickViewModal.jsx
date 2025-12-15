// ============================================================================
// 🔮 Core4.AI – QuickViewModal (v3 FINAL)
// Beautiful product preview with Add to Cart
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal() {
  const { visible, product, closeQuickView } = useQuickView();
  const { addToCart } = useCart();

  if (!visible || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" dir="rtl">

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="
          bg-[#11161A]/80 
          border border-white/10 
          rounded-2xl p-6 
          w-[92%] max-w-lg 
          shadow-xl
          relative
        "
      >
        {/* Close */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 left-4 text-2xl text-gray-300 hover:text-white"
        >
          ×
        </button>

        {/* Image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl border border-white/10 mb-4"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold text-white mb-3">{product.name}</h2>

        {/* Price */}
        <p className="text-green-400 font-semibold text-lg mb-2">
          {product.price ?? (product.price + " SAR")}
        </p>

        {/* Shipping */}
        {product.shipping && (
          <p className="text-xs text-emerald-300 mb-3">🚚 شحن مجاني</p>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => {
            addToCart(product);
            closeQuickView();
          }}
          className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-bold"
        >
          أضف إلى السلة 🛒
        </button>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 🟣 Floating Cart Button PRO — With Badge + Smooth Animation
// ============================================================================

import React from "react";
import { useCart } from "@/context/CartContext";

export default function FloatingCartButton({ onClick }) {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        bg-gradient-to-r from-purple-500 to-pink-500
        w-14 h-14 rounded-full shadow-2xl
        flex items-center justify-center text-white text-2xl
        hover:scale-110 active:scale-95 transition
        z-40 relative
      "
    >
      🛒

      {/* Badge */}
      {count > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            bg-red-500 text-white
            w-6 h-6 rounded-full
            flex items-center justify-center
            text-xs font-bold shadow-lg
          "
        >
          {count}
        </span>
      )}
    </button>
  );
}

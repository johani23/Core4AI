// ============================================================================
// 🛒 Core4.AI – CartContext PRO (v5 FINAL PRODUCTION EDITION)
// Supports: add/remove/update, totals, localStorage, clearCart
// ============================================================================

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // ---------------------------------------------------------------------------
  // 🧠 Load cart from localStorage on startup
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("core4_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved cart:", err);
      }
    }
  }, []);

  // ---------------------------------------------------------------------------
  // 💾 Persist cart to localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("core4_cart", JSON.stringify(items));
  }, [items]);

  // ---------------------------------------------------------------------------
  // ➕ Add product to cart
  // ---------------------------------------------------------------------------
  const addToCart = (product) => {
    // Optional: Prevent adding out-of-stock items
    if (product.stock === 0) {
      alert("المنتج غير متوفر حالياً");
      return;
    }

    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ---------------------------------------------------------------------------
  // ❌ Remove product entirely
  // ---------------------------------------------------------------------------
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // ---------------------------------------------------------------------------
  // ➖ Decrease quantity
  // ---------------------------------------------------------------------------
  const decreaseQty = (id) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  // ---------------------------------------------------------------------------
  // ➕ Increase quantity
  // ---------------------------------------------------------------------------
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // ---------------------------------------------------------------------------
  // 🧹 Clear cart after order complete
  // ---------------------------------------------------------------------------
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("core4_cart");
  };

  // ---------------------------------------------------------------------------
  // 💰 Total price
  // ---------------------------------------------------------------------------
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;


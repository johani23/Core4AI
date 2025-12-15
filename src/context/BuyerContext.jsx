// ============================================================================
// 🧠 Core4.AI – BuyerContext PRO (v3 FINAL)
// Unified state for buyer persona, preferences, recent items, wishlist, settings
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const BuyerContext = createContext();
export const useBuyer = () => useContext(BuyerContext);

export function BuyerProvider({ children }) {
  // 🔹 بيانات شخصية
  const [buyerName, setBuyerName] = useState("User");
  const [buyerTribe, setBuyerTribe] = useState("Techy");
  const [buyerMood, setBuyerMood] = useState("مرتاح");

  // 🔹 تفضيلات BuyerFeed
  const [feedPreferences, setFeedPreferences] = useState({
    sort: "smart",
    filter: "all",
    priceRange: [0, 2000],
  });

  // 🔹 Wishlist
  const [wishlist, setWishlist] = useState([]);

  // 🔹 العناصر المُشاهدة سابقًا
  const [recentViewed, setRecentViewed] = useState([]);

  // 🔹 إضافة عنصر للـ Wishlist
  const toggleWishlist = (item) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === item.id)
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item]
    );
  };

  // 🔹 إضافة لآخر المشاهدات
  const addRecent = (item) => {
    setRecentViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== item.id);
      return [item, ...filtered].slice(0, 10);
    });
  };

  return (
    <BuyerContext.Provider
      value={{
        buyerName,
        setBuyerName,
        buyerTribe,
        setBuyerTribe,
        buyerMood,
        setBuyerMood,

        feedPreferences,
        setFeedPreferences,

        wishlist,
        toggleWishlist,

        recentViewed,
        addRecent,
      }}
    >
      {children}
    </BuyerContext.Provider>
  );
}

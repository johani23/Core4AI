// ============================================================================
// 🔮 Core4.AI – QuickViewContext (v3 FINAL)
// Controls showing/hiding the QuickView modal + selected product
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const QuickViewContext = createContext();
export const useQuickView = () => useContext(QuickViewContext);

export function QuickViewProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);

  // فتح
  const openQuickView = (item) => {
    setProduct(item);
    setVisible(true);
  };

  // إغلاق
  const closeQuickView = () => {
    setVisible(false);
    setTimeout(() => setProduct(null), 300);
  };

  return (
    <QuickViewContext.Provider
      value={{
        visible,
        product,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

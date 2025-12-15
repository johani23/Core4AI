// ============================================================================
// 🎖 Core4.AI – PurchasesStatusBadge (FINAL PRO EDITION v3)
// Supports all backend statuses + Arabic labels + Unified UI
// ============================================================================

import React from "react";

export default function PurchasesStatusBadge({ status = "" }) {
  // Normalize status (to match backend wording)
  const normalized = status.toLowerCase();

  // Arabic labels
  const labels = {
    delivered: "تم التوصيل",
    "in transit": "في الطريق",
    preparing: "جاري التجهيز",
    shipped: "تم الشحن",
    "out for delivery": "خرج للتسليم",
    pending: "قيد المراجعة",
    cancelled: "أُلغي",
  };

  // Badge styles
  const styles = {
    delivered: "bg-green-600/20 text-green-300 border border-green-600/40",
    "in transit": "bg-blue-600/20 text-blue-300 border-blue-600/40",
    shipped: "bg-blue-600/20 text-blue-300 border-blue-600/40",
    preparing: "bg-yellow-600/20 text-yellow-300 border border-yellow-600/40",
    pending: "bg-gray-600/20 text-gray-300 border border-gray-600/40",
    "out for delivery":
      "bg-purple-600/20 text-purple-300 border border-purple-600/40",
    cancelled: "bg-red-600/20 text-red-300 border border-red-600/40",
  };

  const css = styles[normalized] || "bg-gray-600/20 text-gray-300";
  const label = labels[normalized] || status || "—";

  return (
    <span className={`px-3 py-1 text-xs rounded-xl font-semibold ${css}`}>
      {label}
    </span>
  );
}

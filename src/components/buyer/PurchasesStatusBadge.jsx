// ============================================================================
// 💚 Core4.AI – PurchasesStatusBadge.jsx (Final Clean Version)
// ============================================================================

import React from "react";

export default function PurchasesStatusBadge({ status }) {
  const tone =
    status === "Delivered"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
      : status === "In Transit"
      ? "bg-blue-500/15 text-blue-300 border-blue-500/40"
      : status === "Preparing"
      ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
      : "bg-slate-700/40 text-slate-300 border-slate-500/30";

  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-medium tracking-wide ${tone}`}
    >
      {status}
    </span>
  );
}

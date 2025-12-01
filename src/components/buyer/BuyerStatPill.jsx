// ============================================================================
// 💚 Core4.AI – BuyerStatPill.jsx (Polished v2 – Final Clean Version)
// ============================================================================

import React from "react";

export default function BuyerStatPill({ label, value, tone = "neutral" }) {
  const toneClasses =
    tone === "positive"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : tone === "negative"
      ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
      : "border-slate-700 bg-slate-900/70 text-slate-200";

  return (
    <div
      className={`inline-flex flex-col rounded-2xl border px-4 py-3 min-w-[140px] shadow-sm ${toneClasses}`}
    >
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="text-base md:text-lg font-bold mt-1 text-slate-100">
        {value}
      </span>
    </div>
  );
}

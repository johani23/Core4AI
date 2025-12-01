// ============================================================================
// 💚 Core4.AI – BuyerSectionCard.jsx (Polished v2 – Final Clean Version)
// ============================================================================

import React from "react";

export default function BuyerSectionCard({
  title,
  description,
  icon,
  badge,
  actionLabel,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group text-left w-full rounded-2xl border border-slate-800 
        bg-slate-900/70 hover:bg-slate-900 transition-all 
        p-5 flex flex-col gap-4 shadow-sm hover:shadow-md
      "
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">

        {/* Icon + Title */}
        <div className="flex items-start gap-4">

          {icon && (
            <div className="
              w-12 h-12 rounded-2xl bg-emerald-500/10 
              flex items-center justify-center text-2xl text-emerald-300
            ">
              {icon}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-slate-50 tracking-tight">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>

        </div>

        {/* Badge */}
        {badge && (
          <span
            className="
              inline-flex items-center rounded-full 
              bg-slate-800 px-3 py-1 text-[11px] md:text-xs 
              text-emerald-300 border border-emerald-500/40
            "
          >
            {badge}
          </span>
        )}

      </div>

      {/* Action Label */}
      {actionLabel && (
        <div className="text-emerald-300 text-sm font-medium mt-1 flex items-center gap-1">
          {actionLabel}
          <span className="transition-transform group-hover:translate-x-1 text-base">
            →
          </span>
        </div>
      )}
    </button>
  );
}

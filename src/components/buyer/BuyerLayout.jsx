// ============================================================================
// 💚 Core4.AI – BuyerLayout.jsx (Polished v2 – Final Clean Version)
// ============================================================================

import React from "react";

export default function BuyerLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">

      {/* Header */}
      <header className="border-b border-slate-800 bg-gradient-to-r 
                         from-emerald-500/10 via-cyan-400/5 to-emerald-500/10 
                         py-6 px-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-300">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}

        </div>
      </header>

      {/* Page Body */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}

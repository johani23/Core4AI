
import React from "react";

export default function ReferralCard({ code, clicks, conversions }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-50">Referral Code</h3>
        <p className="mt-1 font-mono text-xs md:text-sm text-emerald-300">{code}</p>
      </div>
      <div className="flex items-center gap-4 text-xs md:text-sm text-slate-300">
        <span>👀 {clicks} clicks</span>
        <span>✅ {conversions} joins</span>
      </div>
    </div>
  );
}

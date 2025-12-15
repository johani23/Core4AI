// ============================================================================
// 💡 InfluenceWallet.jsx — المحفظة (C4T – طاقة القبيلة – الأرباح – السحب)
// ============================================================================

import React, { useState } from "react";

export default function InfluenceWallet() {
  const [wallet] = useState({
    c4t: 340,
    tribeTokens: 58,
    commissions: 1120,
    pending: 260,
  });

  const withdraw = () => {
    alert("تم إرسال طلب سحب الأرباح بنجاح ✓");
  };

  return (
    <div className="p-6 space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">محفظة التأثير</h1>

      {/* C4T Tokens */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-sm">رصيد C4T</div>
        <div className="text-3xl font-bold text-green-300">{wallet.c4t}</div>
      </div>

      {/* Tribe Tokens */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-sm">طاقة القبيلة</div>
        <div className="text-3xl font-bold text-yellow-300">
          {wallet.tribeTokens}
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-sm">أرباح مستلمة</div>
        <div className="text-3xl font-bold text-blue-300">
          {wallet.commissions} ريال
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-sm">أرباح قيد المعالجة</div>
        <div className="text-3xl font-bold text-purple-300">
          {wallet.pending} ريال
        </div>
      </div>

      {/* Withdraw Button */}
      <button
        onClick={withdraw}
        className="w-full bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold py-3 rounded-xl"
      >
        سحب الأرباح
      </button>
    </div>
  );
}

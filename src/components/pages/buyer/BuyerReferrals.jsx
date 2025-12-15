// ============================================================================
// 🧑‍🤝‍🧑 Core4.AI – BuyerReferrals PRO v4 (FINAL)
// Referral Engine + XP Boost + Clean UI + Empty State
// ============================================================================

import React from "react";
import CorePanel from "@/components/ui/CorePanel";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerReferrals() {
  const { wsData } = useCoreSync();

  // Live referral data (fallback mock)
  const referral = wsData?.buyer_referral || {
    code: "A1B2C3",
    earnings: 37.50,
    invited: [
      { name: "Ali", purchases: 2, xp_gain: 50, reward_sar: 12.5 },
      { name: "Sara", purchases: 1, xp_gain: 20, reward_sar: 5.0 },
    ],
  };

  const hasInvites = referral.invited?.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-3">برنامج الإحالات 🤝</h1>
      <p className="text-gray-300 mb-10">
        ادعُ أصدقاءك — احصل على XP وخصومات نقدية عند قيامهم بالشراء.
      </p>

      {/* REFERRAL CODE */}
      <CorePanel className="max-w-xl mx-auto text-center space-y-3">
        <p className="text-gray-300 text-sm">رمز إحالتك</p>

        <p className="text-4xl font-bold text-emerald-400 tracking-widest">
          {referral.code}
        </p>

        <button
          className="px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition"
          onClick={() => navigator.clipboard.writeText(referral.code)}
        >
          نسخ الرمز 📋
        </button>

        <p className="text-gray-400 text-xs mt-2">
          شارك هذا الرمز مع الأصدقاء — أي عملية شراء منهم تكسبك XP + Rewards 💰
        </p>
      </CorePanel>

      {/* EARNINGS SUMMARY */}
      <CorePanel className="max-w-xl mx-auto text-center mt-8 py-6">
        <p className="text-gray-400 text-sm">مجموع الأرباح</p>

        <p className="text-4xl font-bold text-amber-300 mt-1">
          {referral.earnings.toFixed(2)} SAR
        </p>

        <p className="text-xs text-gray-400 mt-2">
          الأرباح تشمل: المكافآت + عمولات الشراء + XP Boost
        </p>
      </CorePanel>

      {/* EMPTY STATE */}
      {!hasInvites && (
        <CorePanel className="max-w-xl mx-auto mt-10 text-center py-10">
          <p className="text-5xl mb-3">🫂</p>
          <p className="text-gray-300 text-lg font-bold mb-2">
            لا يوجد مستخدمون مدعوون بعد
          </p>

          <p className="text-gray-400 text-sm mb-6">
            ابدأ رحلتك — شارك الرمز مع 3 أصدقاء واحصل فورًا على Boost XP ⚡
          </p>

          <button
            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500"
            onClick={() => navigator.clipboard.writeText(referral.code)}
          >
            نسخ رمز الإحالة الآن
          </button>
        </CorePanel>
      )}

      {/* INVITED USERS LIST */}
      {hasInvites && (
        <div className="max-w-xl mx-auto mt-10">
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            المستخدمون المدعوون
          </h2>

          <CorePanel className="space-y-4">
            {referral.invited.map((u, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="text-lg font-bold text-emerald-400">{u.name}</p>

                <p className="text-gray-300 text-sm mt-1">
                  عدد المشتريات: <span className="text-white">{u.purchases}</span>
                </p>

                <p className="text-purple-300 text-sm mt-1">
                  XP المكتسبة: {u.xp_gain}
                </p>

                <p className="text-amber-300 text-sm mt-1">
                  مكافأة نقدية: {u.reward_sar.toFixed(2)} SAR
                </p>
              </div>
            ))}
          </CorePanel>
        </div>
      )}

    </div>
  );
}

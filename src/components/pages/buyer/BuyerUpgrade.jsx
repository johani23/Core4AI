// ============================================================================
// 🟣 Core4.AI – BuyerUpgrade PRO v4 (FINAL CLEAN + FIXED CONTEXT)
// XP Progression System • Correct persona source • PRO UI
// ============================================================================

import React from "react";
import CorePanel from "@/components/ui/CorePanel";
import { useCoreSync } from "@/context/CoreSyncContext";
import { useAudience } from "@/context/AudienceContext";

export default function BuyerUpgrade() {
  const { xp } = useCoreSync();
  const { persona } = useAudience();

  const username = persona?.name ?? "المستخدم";

  // LEVEL SYSTEM
  const levels = [
    {
      id: "Bronze",
      min: 0,
      max: 99,
      color: "text-amber-400",
      perks: ["+2% نقاط إضافية", "أولوية منخفضة للدعم"],
    },
    {
      id: "Silver",
      min: 100,
      max: 299,
      color: "text-gray-200",
      perks: ["+5% نقاط إضافية", "دعم أسرع", "خصومات موسمية"],
    },
    {
      id: "Gold",
      min: 300,
      max: 799,
      color: "text-yellow-300",
      perks: ["+10% نقاط إضافية", "شحن أسرع", "خصومات خاصة"],
    },
    {
      id: "Diamond",
      min: 800,
      max: 99999,
      color: "text-blue-300",
      perks: ["+15% نقاط إضافية", "أولوية مطلقة", "دعوات حصرية", "مكافآت نقدية"],
    },
  ];

  const currentLevel =
    levels.find((lvl) => xp >= lvl.min && xp <= lvl.max) || levels[levels.length - 1];

  const nextLevel =
    levels[Math.min(levels.indexOf(currentLevel) + 1, levels.length - 1)];

  const progress =
    ((xp - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-2">
        مستويات Core4 🏆
      </h1>

      <p className="text-gray-300 mb-10">
        مرحبًا يا {username}! هذه رحلتك داخل نظام XP الذكي.
      </p>

      {/* CURRENT LEVEL PANEL */}
      <CorePanel className="max-w-2xl mx-auto mb-10">
        <h2 className={`text-3xl font-bold mb-2 ${currentLevel.color}`}>
          {currentLevel.id} Level
        </h2>

        {/* XP BAR */}
        <div className="w-full bg-white/10 rounded-full h-4 mt-4 mb-2 overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-purple-600 to-pink-500 transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        <p className="text-gray-400 text-sm">
          XP: {xp} / {currentLevel.max}
        </p>

        {/* NEXT LEVEL MESSAGE */}
        {currentLevel.id !== "Diamond" ? (
          <p className="text-gray-300 text-sm mt-3">
            متبقّي لديك{" "}
            <span className="text-emerald-400 font-bold">
              {Math.max(currentLevel.max - xp, 0)} XP
            </span>{" "}
            للوصول إلى مستوى{" "}
            <span className="text-purple-300 font-bold">{nextLevel.id}</span>
            🎯
          </p>
        ) : (
          <p className="text-blue-300 mt-3">
            لقد وصلت لأعلى مستوى! أنت جزء من نخبة Core4 🌟
          </p>
        )}
      </CorePanel>

      {/* LEVEL PERKS */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-purple-300 mb-3">
          مزايا المستوى الحالي
        </h2>

        <CorePanel>
          <ul className="space-y-2">
            {currentLevel.perks.map((perk, i) => (
              <li key={i} className="text-gray-200">
                • {perk}
              </li>
            ))}
          </ul>
        </CorePanel>
      </div>

      {/* CTA: UPGRADE FASTER */}
      {currentLevel.id !== "Diamond" && (
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <CorePanel className="py-6">
            <h3 className="text-lg font-bold text-purple-300 mb-3">
              تريد الترقية بشكل أسرع؟ ⚡
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              كل عملية شراء تمنحك XP إضافية — ويمكنك مضاعفتها عبر الإحالات.
            </p>

            <a
              href="/buyer/referrals"
              className="
                px-8 py-3 rounded-2xl
                bg-gradient-to-r from-purple-600 to-pink-500
                hover:opacity-90 transition font-bold text-white
              "
            >
              فعّل مضاعفة XP الآن 🚀
            </a>
          </CorePanel>
        </div>
      )}
    </div>
  );
}

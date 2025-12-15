// ============================================================================
// 💚 Core4.AI – Tribe Upgrades Screen (Clan Development System)
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeUpgrades() {
  const { upgrades, buyUpgrade, treasury, role } = useTribe();

  const items = [
    { key: "xpBoostAll", name: "رفع XP عام +10%", icon: "⚡" },
    { key: "xpBoostChallenges", name: "رفع XP التحديات +20%", icon: "🔥" },
    { key: "unlockTheme", name: "فتح Theme القبيلة", icon: "🎨" },
    { key: "extraWeeklyChallenge", name: "فتح تحدٍ أسبوعي إضافي", icon: "📅" },
    { key: "coinBoost", name: "زيادة Coin Rewards +15%", icon: "💰" },
    { key: "tribeLevel", name: "رفع Level القبيلة", icon: "🏆" },
  ];

  return (
    <div className="p-10 text-white space-y-8" dir="rtl">

      <h1 className="text-3xl font-bold text-purple-300">💎 تطوير القبيلة</h1>

      <p className="text-gray-300">
        خزنة القبيلة الحالية: <span className="text-green-400">{treasury} Coin</span>
      </p>

      {role !== "Leader" && role !== "Officer" && (
        <p className="text-red-400 text-lg">
          ❌ فقط قائد القبيلة والضباط يمكنهم شراء ترقيات.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => {
          const u = upgrades[item.key];
          return (
            <div
              key={item.key}
              className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl"
            >
              <h2 className="text-xl font-bold mb-2">
                {item.icon} {item.name}
              </h2>

              <p className="text-gray-300 mb-2">
                المستوى الحالي: <span className="text-purple-300">{u.level}</span>
              </p>

              <p className="text-gray-300 mb-4">
                التكلفة: <span className="text-yellow-300">{u.cost}</span> Coin
              </p>

              {(role === "Leader" || role === "Officer") && (
                <button
                  onClick={() => buyUpgrade(item.key)}
                  className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg"
                >
                  ترقية
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – TribeShop FINAL FUNCTIONAL EDITION (2025)
// ----------------------------------------------------------------------------
// - Uses real TribeContext variables
// - Coins → deduct correctly
// - XP boost → triggers full XP engine (Economy + WarPoints + Events)
// - WP boost
// - Contribution auto-increase
// - No aesthetics, pure functional logic
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeShop() {
  const { coins, setCoins, addXP, addWarPoints, contribution, setContribution } = useTribe();

  // SHOP ITEMS (simple functional MVP)
  const items = [
    {
      id: 1,
      name: "XP Boost +20",
      cost: 10,
      action: () => addXP(20),
    },
    {
      id: 2,
      name: "Influence Boost +50 (XP)",
      cost: 25,
      action: () => addXP(50),
    },
    {
      id: 3,
      name: "War Boost +10 WP",
      cost: 15,
      action: () => addWarPoints(10),
    },
  ];

  function buy(item) {
    if (coins < item.cost) {
      alert("❌ لا يوجد رصيد كافٍ لإتمام الشراء");
      return;
    }

    // Deduct coins
    setCoins(coins - item.cost);

    // Apply effect
    item.action();

    // Increase contribution automatically
    setContribution(contribution + item.cost);

    alert("✔ تمت عملية الشراء بنجاح");
  }

  return (
    <div className="text-white p-10 space-y-10" dir="rtl">

      <h1 className="text-3xl mb-6 font-bold text-purple-300">🛒 متجر القبيلة</h1>

      <p className="text-gray-300 mb-4">
        رصيدك الحالي: <span className="text-yellow-300">{coins}</span> Coin
      </p>

      <p className="text-gray-300 mb-10">
        مساهمتك: <span className="text-blue-400">{contribution}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl"
          >
            <h2 className="text-xl font-bold text-purple-200">{item.name}</h2>

            <p className="text-gray-400 my-3">
              التكلفة: <span className="text-yellow-400">{item.cost}</span> Coin
            </p>

            <button
              onClick={() => buy(item)}
              className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
            >
              شراء
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

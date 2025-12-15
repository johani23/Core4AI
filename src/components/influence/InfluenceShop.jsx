// ============================================================================
// 💡 InfluenceShop.jsx — متجر التأثير (بوستات متعددة)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function InfluenceShop() {
  const {
    influence,
    activeBoosts,
    addTokens,
    activateXPBoost,
    activateAudienceBoost,
    activateReachBoost,
    activateTribeBoost,
  } = useInfluence();

  const buy = (price, callback) => {
    if (influence.tokens < price) {
      alert("الرصيد غير كافٍ.");
      return;
    }

    addTokens(-price);
    callback();
    alert("تم تفعيل البوست بنجاح 🔥");
  };

  return (
    <div className="p-6 space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">متجر التأثير</h1>

      {/* XP BOOSTER */}
      <BoosterCard
        title="XP BOOSTER ×2"
        desc="مضاعفة نقاط XP لمدة 24 ساعة"
        price={40}
        active={!!activeBoosts.xp2x.active}
        onBuy={() => buy(40, activateXPBoost)}
      />

      {/* Audience Booster */}
      <BoosterCard
        title="Audience Expansion"
        desc="زيادة +500 وصول مباشر"
        price={60}
        active={!!activeBoosts.audience.active}
        onBuy={() => buy(60, activateAudienceBoost)}
      />

      {/* Reach Booster */}
      <BoosterCard
        title="Reach Booster"
        desc="زيادة +20% في الوصول لمدة 12 ساعة"
        price={30}
        active={!!activeBoosts.reach.active}
        onBuy={() => buy(30, activateReachBoost)}
      />

      {/* Tribe Booster */}
      <BoosterCard
        title="Tribe Energy Boost"
        desc="رفع طاقة القبيلة +15 لمدة 48 ساعة"
        price={30}
        active={!!activeBoosts.tribe.active}
        onBuy={() => buy(30, activateTribeBoost)}
      />
    </div>
  );
}

function BoosterCard({ title, desc, price, active, onBuy }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          <div className="text-gray-400 text-xs mt-1">{desc}</div>
          <div className="text-purple-300 text-sm mt-2">السعر: {price} C4T</div>

          {active && (
            <div className="text-green-300 font-bold mt-1">🔥 نشط الآن</div>
          )}
        </div>

        <button
          disabled={active}
          onClick={onBuy}
          className={`px-4 py-2 rounded-lg text-white text-sm transition font-bold ${
            active ? "bg-green-800" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {active ? "نشط ✓" : "شراء"}
        </button>
      </div>
    </div>
  );
}

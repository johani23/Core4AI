// ============================================================================
// 💡 BoostBadge.jsx — شارات البوستات النشطة (متعددة)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function BoostBadge() {
  const { activeBoosts } = useInfluence();

  // قائمة البوستات النشطة
  const activeList = [];

  if (activeBoosts.xp2x.active)
    activeList.push({
      label: "XP BOOSTER ×2",
      expiresAt: activeBoosts.xp2x.expiresAt,
      color: "text-yellow-300",
      icon: "⚡",
    });

  if (activeBoosts.audience.active)
    activeList.push({
      label: "Audience Expansion +500",
      expiresAt: activeBoosts.audience.expiresAt,
      color: "text-blue-300",
      icon: "📣",
    });

  if (activeBoosts.reach.active)
    activeList.push({
      label: "Reach Booster +20%",
      expiresAt: activeBoosts.reach.expiresAt,
      color: "text-purple-300",
      icon: "📈",
    });

  if (activeBoosts.tribe.active)
    activeList.push({
      label: "Tribe Energy +15",
      expiresAt: activeBoosts.tribe.expiresAt,
      color: "text-green-300",
      icon: "🔥",
    });

  // إذا ما فيه أي بوستات نشطة → لا نعرض شيء
  if (activeList.length === 0) return null;

  return (
    <div className="space-y-3 mt-4" dir="rtl">
      {activeList.map((boost, i) => (
        <BoostItem boost={boost} key={i} />
      ))}
    </div>
  );
}

// ============================================================================
// عنصر البوست الواحد مع عداد تنازلي
// ============================================================================

function BoostItem({ boost }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!boost.expiresAt) return;

    const updateTime = () => {
      const diff = boost.expiresAt - Date.now();

      if (diff <= 0) {
        setRemaining("انتهى البوست");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setRemaining(`${h} ساعة و ${m} دقيقة`);
    };

    updateTime();
    const t = setInterval(updateTime, 60000);
    return () => clearInterval(t);
  }, [boost.expiresAt]);

  return (
    <div className="flex justify-between items-center bg-purple-800/40 border border-purple-700 p-3 rounded-xl">
      <div className="flex items-center gap-2">
        <span className={`text-xl ${boost.color}`}>{boost.icon}</span>
        <span className="text-white font-semibold">{boost.label}</span>
      </div>

      <span className="text-sm text-yellow-200">{remaining}</span>
    </div>
  );
}

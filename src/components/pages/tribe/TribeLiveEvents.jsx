// ============================================================================
// 💚 Core4.AI – Tribe Live Event Center (H3 MVP)
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeLiveEvent() {
  const { liveEvent, eventProgress, selectedTribe } = useTribe();

  if (!liveEvent.active) {
    return (
      <div className="text-center text-white text-xl mt-20" dir="rtl">
        لا يوجد حدث حي حالياً 🔕
      </div>
    );
  }

  const timeLeft = liveEvent.endsAt - Date.now();
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="p-10 text-white space-y-10" dir="rtl">

      <h1 className="text-4xl font-bold text-purple-300 mb-4">
        {liveEvent.name}
      </h1>

      <p className="text-gray-300 text-lg">{liveEvent.description}</p>

      <div className="text-yellow-300 text-xl font-bold mt-4">
        ⏳ الوقت المتبقي: {hours} ساعة و {mins} دقيقة
      </div>

      <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-xl space-y-4">

        <h2 className="text-xl font-bold text-purple-300">
          📈 تقدّم قبيلة {selectedTribe.name}
        </h2>

        <p>XP المكتسبة: {eventProgress.xp}</p>
        <p>WP المكتسبة: {eventProgress.wp}</p>

        <div className="mt-4">
          <p className="text-green-300 mb-1">مكافأة XP: +{liveEvent.xpBonus * 100}%</p>
          <p className="text-pink-300 mb-1">مكافأة WP: +{liveEvent.wpBonus * 100}%</p>
        </div>

        <div className="bg-purple-700/30 p-4 rounded-xl text-center mt-6">
          🎁 نهاية الحدث: جوائز خاصة لأعلى 3 قبائل!
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 💚 Core4.AI – Challenge Feed (Final Version 2025)
// ----------------------------------------------------------------------------
// Displays:
//  - All active tribe challenges
//  - XP, type, creator, participation
//  - "شارك الآن" button (UGC / Awareness / Advocacy / Conversion)
// ----------------------------------------------------------------------------

import React, { useState } from "react";
import { useChallenges } from "@/context/TribeChallengeContext";
import { useTribe } from "@/context/TribeContext";

export default function ChallengeFeed() {
  const { challenges, completeChallenge } = useChallenges();
  const { addXP, selectedTribe } = useTribe();

  const [participating, setParticipating] = useState(null);

  if (!selectedTribe)
    return <p className="text-gray-400 mt-10">❗ اختر القبيلة أولاً.</p>;

  const activeChallenges = challenges.filter((c) => c.active);
  const completed = challenges.filter((c) => c.completed);

  function handleParticipate(ch) {
    addXP(ch.xp);
    setParticipating(ch.id);

    setTimeout(() => {
      setParticipating(null);
      alert(`🎉 أحسنت! حصلت على ${ch.xp} XP`);
    }, 800);
  }

  return (
    <div className="max-w-4xl mx-auto mt-10" dir="rtl">

      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        🔥 تحديات القبيلة – {selectedTribe.name}
      </h1>

      {/* ACTIVE CHALLENGES */}
      <div className="space-y-6">
        {activeChallenges.map((ch) => (
          <div
            key={ch.id}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-xl font-bold text-white flex justify-between">
              {ch.title}
              <span className="text-purple-300 text-sm">
                XP +{ch.xp}
              </span>
            </h2>

            <p className="text-gray-300 text-sm mt-2">{ch.description}</p>

            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-blue-300">
                النوع: {translateType(ch.type)}
              </span>

              <span className="text-gray-400">
                مبدع الأسبوع: {ch.creator?.name || "AI"}
              </span>
            </div>

            <button
              onClick={() => handleParticipate(ch)}
              disabled={participating === ch.id}
              className={`mt-5 px-6 py-2 rounded-lg text-white font-bold ${
                participating === ch.id
                  ? "bg-gray-500"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {participating === ch.id ? "جاري..." : "شارك الآن"}
            </button>
          </div>
        ))}
      </div>

      {/* COMPLETED CHALLENGES */}
      {completed.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-300 mb-3">
            ✔ التحديات المكتملة
          </h2>

          <div className="space-y-4">
            {completed.map((ch) => (
              <div
                key={ch.id}
                className="bg-white/5 border border-white/10 p-4 rounded-xl text-gray-400 text-sm"
              >
                {ch.title} – (تم الانتهاء)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function translateType(t) {
  return {
    awareness: "📣 وعي",
    ugc: "📸 محتوى UGC",
    advocacy: "💬 توصية",
    conversion: "💰 تحويلات"
  }[t];
}

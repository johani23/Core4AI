// ============================================================================
// 💡 TribeLeaderboard.jsx — Phase 4 (Influence ↔ Tribe Integration)
// ============================================================================

import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";
import PulseValue from "@/components/influence/PulseValue";

export default function TribeLeaderboard() {
  const { influence } = useInfluence();

  // بيانات القبائل — الآن تشمل قبيلة المستخدم + قبائل أخرى
  const tribes = [
    {
      id: 0,
      name: "قبيلتك",
      strength: influence.tribeStrength,
      members: influence.tribeMembers,
      power: influence.tribePower,
      rank: influence.tribeRank,
      mood: influence.tribeMood,
    },
    {
      id: 1,
      name: "TechWave",
      strength: 210,
      members: 180,
      power: 95,
      rank: 5,
      mood: "نشيطة 🔥",
    },
    {
      id: 2,
      name: "TrendMakers",
      strength: 180,
      members: 140,
      power: 75,
      rank: 9,
      mood: "متحفّزة",
    },
    {
      id: 3,
      name: "StyleHub",
      strength: 240,
      members: 220,
      power: 110,
      rank: 3,
      mood: "قوية جدًا ⚡",
    },
    {
      id: 4,
      name: "EcoTribe",
      strength: 150,
      members: 90,
      power: 60,
      rank: 12,
      mood: "هادئة",
    },
  ];

  // إعادة ترتيب القبائل حسب strength
  const sorted = tribes.sort((a, b) => b.strength - a.strength);

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">ترتيب القبائل</h1>

      {sorted.map((tribe, index) => (
        <div
          key={tribe.id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex justify-between items-center"
        >
          {/* ترتيب القبيلة */}
          <div className="text-purple-300 font-extrabold text-xl w-10">
            #{index + 1}
          </div>

          {/* اسم القبيلة */}
          <div>
            <div className="text-white font-semibold text-lg">
              {tribe.name}
            </div>
            <div className="text-gray-400 text-xs">{tribe.mood}</div>
          </div>

          {/* القوة */}
          <PulseValue value={tribe.strength}>
            <div className="text-green-300 font-bold text-lg">
              {tribe.strength}
            </div>
          </PulseValue>

          {/* أفراد القبيلة */}
          <div className="text-gray-400 text-sm ml-6">
            👥 {tribe.members}
          </div>
        </div>
      ))}
    </div>
  );
}

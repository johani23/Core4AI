import React from 'react';
import { useInfluenceMissions } from "@/context/InfluenceMissionsContext";

const ACTIONS = [
  { name: "حفظ منتج", xp: 10 },
  { name: "مشاركة", xp: 20 },
  { name: "مشاهدة عميقة", xp: 5 },
  { name: "اكتشاف مبكر", xp: 12 },
  { name: "إتمام ستيك", xp: 15 }
];

export default function InfluenceActionsList() {
  const { applyAction } = useInfluenceMissions();

  return (
    <div className="space-y-4">
      {ACTIONS.map((a, index) => (
        <button
          key={index}
          onClick={() => applyAction(a)}
          className="w-full text-right bg-white/5 backdrop-blur-lg p-4 rounded-xl 
          border border-white/10 hover:bg-white/10 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="text-gray-200 text-sm">{a.name}</div>
            <div className="text-green-300 text-sm font-bold">+{a.xp} XP</div>
          </div>
        </button>
      ))}
    </div>
  );
}









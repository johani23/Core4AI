import React from "react";
import { useInfluenceMissions } from "@/context/InfluenceMissionsContext";

export default function InfluenceDailyMissions() {
  const { missions, completed } = useInfluenceMissions();

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-purple-300 mb-4">المهام اليومية</h2>

      <div className="space-y-3">
        {missions.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-xl border backdrop-blur-md ${
              completed.includes(m.id)
                ? "bg-green-500/20 border-green-400/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex justify-between text-sm">
              <span>{m.title}</span>
              <span className="text-green-300 font-bold">+{m.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}









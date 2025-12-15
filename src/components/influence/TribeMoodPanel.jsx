import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function TribeMoodPanel() {
  const { influence, suggestPostingTime } = useInfluence();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-6" dir="rtl">
      <h2 className="text-lg font-bold text-purple-300 mb-2">
        حالة القبيلة اليوم ⚡
      </h2>

      <div className="text-white font-semibold text-xl mb-3">
        {influence.tribeMood}
      </div>

      <div className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg border border-white/10">
        {suggestPostingTime()}
      </div>
    </div>
  );
}

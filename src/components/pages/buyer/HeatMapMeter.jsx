import React from "react";

export default function HeatmapMeter({ score }) {
  const pct = Math.min((score / 150) * 100, 100);

  return (
    <div className="mt-4">
      <div className="text-xs text-gray-400 mb-1">مؤشر النشاط العاطفي</div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-purple-500 rounded-full"
          style={{ width: `${pct}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{score} pts</div>
    </div>
  );
}

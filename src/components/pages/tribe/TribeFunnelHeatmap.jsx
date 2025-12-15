// ============================================================================
// 💚 Core4.AI – Funnel Heatmap (Final Working Version)
// ============================================================================

import React from "react";
import { useAttribution } from "@/context/AttributionContext";

export default function TribeFunnelHeatmap() {
  const { getRevenueByStage } = useAttribution();

  const stages = [
    { key: "awareness", label: "Awareness – الوعي" },
    { key: "consideration", label: "Consideration – التفكير" },
    { key: "conversion", label: "Conversion – اتخاذ القرار" },
    { key: "advocacy", label: "Advocacy – الترويج" },
  ];

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        🔥 خريطة Funnel (Heatmap)
      </h2>

      {stages.map((s) => {
        const revenue = getRevenueByStage(s.key);
        const strength = Math.min(5, Math.ceil(revenue / 2000));

        return (
          <div
            key={s.key}
            className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <p className="font-bold text-lg mb-1">{s.label}</p>

            <p className="text-gray-300 text-sm">
              💰 الإيرادات المتأتية من هذه المرحلة:{" "}
              <b>{revenue.toLocaleString("ar-EG")} ريال</b>
            </p>

            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-md ${
                    i <= strength ? "bg-green-400" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

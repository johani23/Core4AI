import React, { useEffect, useState } from "react";
import { getLiveAISummary } from "@services/api";

export default function MomentumForecast() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getLiveAISummary();
        setForecast(res);
      } catch (err) {
        console.warn("âš ï¸ Forecast load failed:", err);
      }
    }
    load();
  }, []);

  if (!forecast)
    return (
      <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-md text-center text-gray-400">
        Loading momentum forecast...
      </div>
    );

  const message =
    forecast.avg_cohesion > 80
      ? "Strong alignment â€” teams emotionally synchronized."
      : forecast.avg_cohesion > 60
      ? "Momentum steady â€” collaboration balanced."
      : "Low emotional drive â€” potential fatigue phase.";

  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-yellow-400 mb-2">
        ðŸ”® Momentum Forecast
      </h2>
      <p className="text-gray-300 text-sm mb-4">{message}</p>
      <div className="space-y-2 text-sm text-gray-400">
        <p>Predicted Growth: <span className="text-yellow-400">{forecast.predicted_growth}</span></p>
        <p>Avg Cohesion: <span className="text-yellow-400">{forecast.avg_cohesion}%</span></p>
        <p>Comment: <span className="text-yellow-400">{forecast.ai_comment}</span></p>
      </div>
    </div>
  );
}

import React from "react";
import MarketSentimentFusion from "@components/archive/MarketSentimentFusion";
import TribeEconomyMonitor from "@components/archive/TribeEconomyMonitor";
import TribeEconomyForecast from "@components/archive/TribeEconomyForecast";
import CouncilInsightAI from "@components/archive/CouncilInsightAI";

export default function CouncilDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold text-purple-400">
        ðŸ› Council Fusion Dashboard
      </h1>

      <MarketSentimentFusion />
      <CouncilInsightAI />
      <TribeEconomyMonitor />
      <TribeEconomyForecast />
    </div>
  );
}

// ============================================================================
// ðŸ’š CampaignAutoPilot.jsx (Phase 26 â€“ One-Click Auto Pilot Export)
// ============================================================================

import React, { useState } from "react";

export default function CampaignAutoPilot({
  product,
  productIQ,
  merchantIntel,
  readiness,
  qualityScore,
  successProbability,
  budgetData,
  funnelData,
  roiData,
  cpaData,
  audienceFitData,
  personaData,
  toneData,
  channelMixData
}) {
  const [exportData, setExportData] = useState(null);

  const generate = async () => {
    const res = await fetch("/api/campaign/autopilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product,
        productIQ,
        merchantIntel,
        readiness,
        quality_score: qualityScore,
        success_probability: successProbability,
        budget: budgetData,
        funnel: funnelData,
        roi: roiData,
        cpa: cpaData,
        audience_fit: audienceFitData,
        persona: personaData,
        tone: toneData,
        channel_mix: channelMixData
      })
    });

    const d = await res.json();
    setExportData(d.export);
  };

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ¤– Campaign Auto-Pilot (One-Click Export)
      </h2>

      <button
        onClick={generate}
        className="w-full bg-green-700 text-white py-3 rounded-lg mb-4"
      >
        ðŸš€ Generate Auto-Pilot Export
      </button>

      {exportData && (
        <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(exportData, null, 2)}
        </pre>
      )}
    </div>
  );
}

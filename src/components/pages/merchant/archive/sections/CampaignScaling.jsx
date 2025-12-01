// ============================================================================
// ðŸ’š CampaignScaling.jsx (Phase 20 â€“ Scaling Recommendation)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignScaling({
  roiData,
  successProbability,
  qualityScore,
  readiness
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/scaling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roi: roiData?.roi,
        probability: successProbability,
        quality_score: qualityScore,
        readiness: readiness
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (
      roiData &&
      successProbability !== null &&
      qualityScore !== null &&
      readiness !== null
    ) {
      load();
    }
  }, [roiData, successProbability, qualityScore, readiness]);

  if (!data)
    return (
      <div className="p-6 border bg-white rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Scaling Score</p>
      </div>
    );

  return (
    <div className="p-6 border bg-white rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“Š Scaling Recommendation
      </h2>

      <p className="text-lg font-bold text-gray-800 mb-2">
        Score: {data.scaling_score}%
      </p>

      <div className="p-4 bg-green-50 border rounded-lg text-center">
        <p className="text-green-800 font-bold text-lg">
          {data.recommendation}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ðŸ’š CampaignChannelMix.jsx (Phase 24 â€“ Channel Mix Allocation)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignChannelMix({
  qualityScore,
  readiness,
  successProbability,
  audienceFit
}) {
  const [mix, setMix] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quality_score: qualityScore,
        readiness: readiness,
        probability: successProbability,
        audience_fit: audienceFit
      })
    });

    const data = await res.json();
    setMix(data);
  };

  useEffect(() => {
    if (
      qualityScore !== null &&
      readiness !== null &&
      successProbability !== null &&
      audienceFit !== null
    ) load();
  }, [qualityScore, readiness, successProbability, audienceFit]);

  if (!mix)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Channel Mix</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“¡ Channel Mix Recommendation
      </h2>

      <ul className="space-y-2 text-gray-800">
        <li><strong>TikTok:</strong> {mix.tiktok}%</li>
        <li><strong>Instagram:</strong> {mix.instagram}%</li>
        <li><strong>Snapchat:</strong> {mix.snapchat}%</li>
        <li><strong>Google:</strong> {mix.google}%</li>
        <li><strong>Creators:</strong> {mix.creators}%</li>
      </ul>

      <div className="mt-4 p-4 bg-green-50 border rounded text-center text-gray-600">
        Distribution adds up to {mix.total}% (normalized to 100)
      </div>
    </div>
  );
}

// ============================================================
// ðŸ’Ž Core4.AI â€“ CreatorLevel.jsx (MVP-99 â€œAI Mastery Dashboardâ€)
// ------------------------------------------------------------
// âœ… ÙŠØ­Ù„Ù„ Ù…Ø¯Ø®Ù„Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… (clarity / creativity / engagement)
// âœ… ÙŠØ³ØªØ¯Ø¹ÙŠ /creator/analyze Ùˆ /tribe/auto-assign
// ============================================================

import React, { useState } from "react";

export default function CreatorLevel() {
  const [clarity, setClarity] = useState(0.5);
  const [creativity, setCreativity] = useState(0.5);
  const [engagement, setEngagement] = useState(0.5);
  const [result, setResult] = useState(null);
  const [tribeMatch, setTribeMatch] = useState(null);

  const analyze = async () => {
    const payload = {
      creator_id: "demo_user",
      clarity_score: clarity,
      creativity_score: creativity,
      engagement_rate: engagement,
    };
    const res = await fetch("http://127.0.0.1:8000/creator/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setResult(data);

    const assign = await fetch("http://127.0.0.1:8000/tribe/auto-assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creator_id: data.creator_id,
        mastery_score: data.mastery_score,
      }),
    });
    setTribeMatch(await assign.json());
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-fuchsia-400 mb-4">
        ðŸ§  AI Mastery Engine
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-400">Clarity</label>
          <input type="range" min="0" max="1" step="0.05"
                 value={clarity} onChange={(e)=>setClarity(+e.target.value)}
                 className="w-full accent-fuchsia-400"/>
        </div>
        <div>
          <label className="text-xs text-gray-400">Creativity</label>
          <input type="range" min="0" max="1" step="0.05"
                 value={creativity} onChange={(e)=>setCreativity(+e.target.value)}
                 className="w-full accent-fuchsia-400"/>
        </div>
        <div>
          <label className="text-xs text-gray-400">Engagement</label>
          <input type="range" min="0" max="1" step="0.05"
                 value={engagement} onChange={(e)=>setEngagement(+e.target.value)}
                 className="w-full accent-fuchsia-400"/>
        </div>
      </div>

      <button
        onClick={analyze}
        className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-md font-semibold text-sm"
      >
        Analyze My Level
      </button>

      {result && (
        <div className="mt-4 bg-gray-900 border border-fuchsia-700/40 p-4 rounded-xl">
          <p className="text-fuchsia-300 font-semibold">
            Score: {result.mastery_score.toFixed(1)}
          </p>
          <p className="text-gray-300">Level: {result.level}</p>
        </div>
      )}

      {tribeMatch && (
        <div className="mt-3 bg-gray-900 border border-blue-700/40 p-4 rounded-xl text-sm">
          <p className="text-blue-300 font-semibold">
            Suggested Tribe: {tribeMatch.assigned_tribe}
          </p>
          <p className="text-gray-400">
            Tribe Avg: {tribeMatch.tribe_avg} â€¢ Your Score: {tribeMatch.mastery_score.toFixed(1)}
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-6">
        Beta Core v9.9 â€¢ AI Mastery Integration
      </div>
    </div>
  );
}

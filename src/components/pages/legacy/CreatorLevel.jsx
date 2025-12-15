// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreatorLevel.jsx (MVP-99 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œAI Mastery DashboardÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â®ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦ (clarity / creativity / engagement)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â  /creator/analyze Ãƒâ„¢Ã‹â€  /tribe/auto-assign
// ============================================================


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
        ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  AI Mastery Engine
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
            Tribe Avg: {tribeMatch.tribe_avg} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Your Score: {tribeMatch.mastery_score.toFixed(1)}
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-6">
        Beta Core v9.9 ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ AI Mastery Integration
      </div>
    </div>
  );
}



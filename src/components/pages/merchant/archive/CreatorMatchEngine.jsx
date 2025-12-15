// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreatorMatchEngine.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSaudi Performer Match EngineÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ AI-powered creator matching for merchants
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Scores creators: Tribe Fit, Content Quality, Influence Weight
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Predicts Conversion Probability
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Recommends audience micro-contributors
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Uses Saudi digital behavior patterns
// ============================================================================

import {
  FiUserCheck,
  FiZap,
  FiUsers,
  FiSearch,
  FiStar,
  FiTrendingUp,
  FiTarget,
  FiFilter,
} from "react-icons/fi";

export default function CreatorMatchEngine() {
  const [productName, setProductName] = useState("");
  const [tribe, setTribe] = useState("");
  const [results, setResults] = useState(null);

  const TRIBES = ["Techy", "Fashionists", "EventGoers", "Adventurers"];

  const CREATOR_POOL = [
    {
      id: "cr_001",
      name: "Aseel Tech",
      tribe: "Techy",
      followers: 240000,
      quality: 0.88,
      consistency: 0.91,
      saudi_factor: 0.95,
    },
    {
      id: "cr_002",
      name: "Lama Styles",
      tribe: "Fashionists",
      followers: 310000,
      quality: 0.93,
      consistency: 0.87,
      saudi_factor: 0.98,
    },
    {
      id: "cr_003",
      name: "Fahad Adventures",
      tribe: "Adventurers",
      followers: 160000,
      quality: 0.81,
      consistency: 0.78,
      saudi_factor: 0.92,
    },
    {
      id: "cr_004",
      name: "Riyadh Events",
      tribe: "EventGoers",
      followers: 400000,
      quality: 0.76,
      consistency: 0.89,
      saudi_factor: 0.94,
    },
  ];

  const AUDIENCE_POOL = [
    "Micro-Influencer (5k Followers)",
    "Active Commenter (Snapchat)",
    "Repeat Buyer (Tech Tribe)",
    "Hyper-Engaged Female Audience 18ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“25",
    "Outdoor Community Micro-Leader",
  ];

  const matchCreators = () => {
    if (!productName || !tribe) return;

    const matched = CREATOR_POOL.map((c) => {
      const tribeFit = c.tribe === tribe ? 1 : 0.4;

      const influenceWeight =
        (c.followers / 300000) * 0.5 +
        c.quality * 0.25 +
        c.consistency * 0.15 +
        c.saudi_factor * 0.10;

      const conversionPrediction = Math.round(
        (tribeFit * influenceWeight * 100) / 1.25
      );

      return {
        ...c,
        tribeFit,
        influenceWeight: Number(influenceWeight.toFixed(2)),
        conversion: Math.min(95, conversionPrediction),
      };
    }).sort((a, b) => b.conversion - a.conversion);

    setResults({
      productName,
      tribe,
      creators: matched,
      audienceBoosters: AUDIENCE_POOL.slice(0, 3),
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiUserCheck /> E10 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Creator Matchmaking Engine
      </h1>

      <p className="text-gray-300">
        ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â©ÃƒËœÃ…â€™ Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  + ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾
        ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â± ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦.
      </p>

      {/* INPUTS */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <input
          placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <select
          value={tribe}
          onChange={(e) => setTribe(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="">ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©</option>
          {TRIBES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <button
          onClick={matchCreators}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          <FiSearch /> ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã‹â€  Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â·ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â©
        </button>
      </div>

      {/* RESULTS */}
      {results && (
        <div className="space-y-10">
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-3">
              <FiTarget /> ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {results.creators.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          </div>

          {/* Audience Boosters */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-3">
              <FiUsers /> ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒËœÃ‚Â± Audience Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
            </h2>

            <ul className="list-disc ml-6 text-gray-300 mt-4 space-y-3">
              {results.audienceBoosters.map((a, idx) => (
                <li key={idx} className="text-lg">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function CreatorCard({ creator }) {
  return (
    <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <FiUserCheck /> {creator.name}
      </h3>

      <p className="text-gray-400 text-sm mt-1">Tribe: {creator.tribe}</p>

      <div className="mt-4 space-y-3 text-gray-300">
        <p className="flex items-center gap-2">
          <FiStar /> Quality: {Math.round(creator.quality * 100)}%
        </p>
        <p className="flex items-center gap-2">
          <FiFilter /> Consistency: {Math.round(creator.consistency * 100)}%
        </p>
        <p className="flex items-center gap-2">
          <FiTrendingUp /> Influence Weight: {creator.influenceWeight}
        </p>
        <p className="flex items-center gap-2 text-[#4cff9b] font-bold">
          <FiZap /> Conversion Prediction: {creator.conversion}%
        </p>
      </div>
    </div>
  );
}



// ======================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ InfluencerMatching.jsx (v1.0 E4 Saudi Intelligence)
// ----------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Product ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Tribe ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Audience ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ AI Matching
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Scores: Influence, Engagement, Quality, Conversion Fit
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ AI selects Top Picks for merchant
// ======================================================================

import {
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiStar,
  FiZap,
  FiFilter,
} from "react-icons/fi";

export default function InfluencerMatching() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);

  const CATEGORIES = [
    "electronics",
    "fashion",
    "events",
    "outdoor",
    "beauty",
    "food",
  ];

  const TRIBE_MAP = {
    electronics: "Techy",
    fashion: "Fashionists",
    events: "EventGoers",
    outdoor: "Adventurers",
    beauty: "Fashionists",
    food: "EventGoers",
  };

  const MOCK_CREATORS = [
    {
      name: "Faisal Tech",
      tribe: "Techy",
      followers: 182000,
      engagement: 4.7,
      quality: 91,
    },
    {
      name: "Sara Digital",
      tribe: "Fashionists",
      followers: 97000,
      engagement: 5.1,
      quality: 88,
    },
    {
      name: "Noura Events",
      tribe: "EventGoers",
      followers: 122000,
      engagement: 3.9,
      quality: 84,
    },
    {
      name: "Talal Adventurer",
      tribe: "Adventurers",
      followers: 58000,
      engagement: 6.2,
      quality: 87,
    },
  ];

  function computeFitScore(creator, tribe) {
    let base = creator.quality;

    if (creator.tribe === tribe) base += 8;
    if (creator.engagement > 5.0) base += 6;
    if (creator.followers > 100000) base += 4;

    return Math.min(100, Math.round(base));
  }

  async function generateMatches() {
    if (!productName || !category) return;

    setLoading(true);

    const tribe = TRIBE_MAP[category] || "EventGoers";

    setTimeout(() => {
      const enrichedCreators = MOCK_CREATORS.map((c) => ({
        ...c,
        fit: computeFitScore(c, tribe),
      })).sort((a, b) => b.fit - a.fit);

      setMatches({
        tribe,
        creators: enrichedCreators,
      });

      setLoading(false);
    }, 700);
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
          <FiUsers /> ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â 
        </h1>
        <p className="text-gray-300">
          ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ Core4.AI Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬Ãƒâ„¢Ã†â€™ ÃƒËœÃ‚Â­ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±.
        </p>
      </div>

      {/* PRODUCT INPUT */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <h2 className="text-xl text-white font-bold flex items-center gap-2">
          <FiFilter className="text-[#4cff9b]" /> Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
        </h2>

        <input
          placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ (Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾: Samsung S24 Ultra)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="px-4 py-3 rounded-lg bg-[#002015] border border-[#145536] text-white w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg bg-[#002015] border border-[#145536] text-white w-full"
        >
          <option value="" disabled>
            ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¦ÃƒËœÃ‚Â©
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={generateMatches}
          className="w-full py-3 rounded-lg font-extrabold bg-[#4cff9b] text-black flex items-center justify-center gap-2"
        >
          <FiZap /> ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â 
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-300 text-lg py-10 animate-pulse">
          ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
        </div>
      )}

      {/* RESULTS */}
      {matches && (
        <div className="space-y-10">

          {/* TRIBE MATCH */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTarget /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
            </h3>
            <p className="text-3xl font-extrabold text-white mt-2">
              {matches.tribe}
            </p>
          </div>

          {/* CREATOR RESULTS */}
          <div className="space-y-6">
            <h3 className="text-2xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTrendingUp /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â 
            </h3>

            {matches.creators.map((c, idx) => (
              <div
                key={idx}
                className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-white">{c.name}</p>
                    <p className="text-gray-400 text-sm">
                      Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: {c.tribe}
                    </p>
                    <p className="text-gray-400 text-sm">
                      ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â : {c.followers.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Engagement: {c.engagement}%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[#4cff9b] text-xl font-extrabold flex items-center gap-1 justify-end">
                      <FiStar /> {c.fit}%
                    </p>
                    <p className="text-gray-400 text-sm">Conversion Fit</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}



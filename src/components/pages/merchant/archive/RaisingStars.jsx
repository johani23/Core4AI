// ======================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ RisingStars.jsx (v1.0 E5 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œAudience to Influencer EngineÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Detect Rising Stars inside the Audience
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Analyze engagement, tribe fit, product interest
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ AI Ranking: Conversion Potential + Growth Potential
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Merchant receives list of future influencers to seed
// ======================================================================

import {
  FiUserPlus,
  FiTrendingUp,
  FiZap,
  FiUsers,
  FiAward,
} from "react-icons/fi";

export default function RisingStars() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(null);

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

  // Mock audience profiles
  const AUDIENCE_POOL = [
    {
      name: "Reem A.",
      tribe: "Fashionists",
      posts: 12,
      avgLikes: 37,
      avgComments: 6,
      interest: ["fashion", "beauty", "bags"],
    },
    {
      name: "Omar Tech",
      tribe: "Techy",
      posts: 9,
      avgLikes: 21,
      avgComments: 4,
      interest: ["electronics", "phones", "reviews"],
    },
    {
      name: "Hamad Explorer",
      tribe: "Adventurers",
      posts: 7,
      avgLikes: 29,
      avgComments: 3,
      interest: ["travel", "camping", "gear"],
    },
    {
      name: "Dina Social",
      tribe: "EventGoers",
      posts: 14,
      avgLikes: 45,
      avgComments: 9,
      interest: ["events", "outfits", "restaurants"],
    },
  ];

  function computeRisingScore(p, tribe) {
    let score = 40;

    if (p.tribe === tribe) score += 20;
    if (p.avgLikes > 30) score += 15;
    if (p.avgComments > 5) score += 10;
    if (p.posts > 10) score += 10;
    if (p.interest.includes(category)) score += 10;

    return Math.min(100, Math.round(score));
  }

  function generateStars() {
    if (!category) return;

    setLoading(true);

    const tribe = TRIBE_MAP[category] || "EventGoers";

    setTimeout(() => {
      const enriched = AUDIENCE_POOL.map((p) => ({
        ...p,
        rising: computeRisingScore(p, tribe),
      })).sort((a, b) => b.rising - a.rising);

      setStars({
        tribe,
        list: enriched,
      });

      setLoading(false);
    }, 700);
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
          <FiUserPlus /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂµÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±
        </h1>
        <p className="text-gray-300">
          Core4.AI Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â­ÃƒËœÃ‚Â« ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â± ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â£ÃƒËœÃ‚Â´ÃƒËœÃ‚Â®ÃƒËœÃ‚Â§ÃƒËœÃ‚Âµ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â£Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂµÃƒËœÃ‚Â¨ÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬Ãƒâ„¢Ã†â€™.
        </p>
      </div>

      {/* Input */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-4">
        <h2 className="text-xl text-white font-bold flex items-center gap-2">
          ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¦ÃƒËœÃ‚Â©
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="" disabled>
            ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¦ÃƒËœÃ‚Â©
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={generateStars}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold 
                     flex items-center justify-center gap-2 rounded-lg"
        >
          <FiZap /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã†â€™ÃƒËœÃ‚ÂªÃƒËœÃ‚Â´ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂµÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â 
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-300 animate-pulse py-10">
          ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
        </p>
      )}

      {/* Results */}
      {stars && (
        <div className="space-y-10">
          
          {/* Tribe */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiUsers /> Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹
            </h3>
            <p className="text-3xl font-extrabold text-white mt-2">
              {stars.tribe}
            </p>
          </div>

          {/* Audience Rising Stars */}
          <div className="space-y-6">
            <h3 className="text-2xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTrendingUp /> ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ 4 Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚ÂµÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â 
            </h3>

            {stars.list.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  
                  {/* Left */}
                  <div>
                    <p className="text-lg font-bold text-white">{p.name}</p>
                    <p className="text-gray-400 text-sm">Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: {p.tribe}</p>
                    <p className="text-gray-400 text-sm">
                      Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨: {p.avgLikes}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª: {p.avgComments}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <p className="text-[#4cff9b] text-xl font-extrabold flex items-center gap-1 justify-end">
                      <FiAward /> {p.rising}%
                    </p>
                    <p className="text-gray-400 text-sm">Rising Potential</p>
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



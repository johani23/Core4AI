// ======================================================================
// ðŸ’š Core4.AI â€“ RisingStars.jsx (v1.0 E5 â€œAudience to Influencer Engineâ€)
// ----------------------------------------------------------------------
// â€¢ Detect Rising Stars inside the Audience
// â€¢ Analyze engagement, tribe fit, product interest
// â€¢ AI Ranking: Conversion Potential + Growth Potential
// â€¢ Merchant receives list of future influencers to seed
// ======================================================================

import React, { useState } from "react";
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
          <FiUserPlus /> Ø§Ù„Ù…Ø¤Ø«Ø±ÙˆÙ† Ø§Ù„ØµØ§Ø¹Ø¯ÙˆÙ† Ù…Ù† Ø§Ù„Ø¬Ù…Ù‡ÙˆØ±
        </h1>
        <p className="text-gray-300">
          Core4.AI ÙŠØ¨Ø­Ø« Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ø¹Ù† Ø£Ø´Ø®Ø§Øµ Ù‚Ø§Ø¯Ø±ÙŠÙ† Ø£Ù† ÙŠØµØ¨Ø­ÙˆØ§ Ù…Ø¤Ø«Ø±ÙŠÙ† Ù„Ù…Ù†ØªØ¬Ùƒ.
        </p>
      </div>

      {/* Input */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-4">
        <h2 className="text-xl text-white font-bold flex items-center gap-2">
          Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="" disabled>
            Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©
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
          <FiZap /> Ø§ÙƒØªØ´Ø§Ù Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„ØµØ§Ø¹Ø¯ÙŠÙ†
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-300 animate-pulse py-10">
          ØªØ­Ù„ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¬Ù…Ù‡ÙˆØ±â€¦
        </p>
      )}

      {/* Results */}
      {stars && (
        <div className="space-y-10">
          
          {/* Tribe */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiUsers /> Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ø§Ù„Ù…ØªÙˆÙ‚Ø¹
            </h3>
            <p className="text-3xl font-extrabold text-white mt-2">
              {stars.tribe}
            </p>
          </div>

          {/* Audience Rising Stars */}
          <div className="space-y-6">
            <h3 className="text-2xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTrendingUp /> Ø£ÙØ¶Ù„ 4 Ù…Ø¤Ø«Ø±ÙŠÙ† ØµØ§Ø¹Ø¯ÙŠÙ†
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
                    <p className="text-gray-400 text-sm">Ù‚Ø¨ÙŠÙ„Ø©: {p.tribe}</p>
                    <p className="text-gray-400 text-sm">
                      Ù…ØªÙˆØ³Ø· Ø§Ù„Ø¥Ø¹Ø¬Ø§Ø¨: {p.avgLikes}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Ù…ØªÙˆØ³Ø· Ø§Ù„ØªØ¹Ù„ÙŠÙ‚Ø§Øª: {p.avgComments}
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

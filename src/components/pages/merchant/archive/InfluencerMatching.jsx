// ======================================================================
// ðŸ’š Core4.AI â€“ InfluencerMatching.jsx (v1.0 E4 Saudi Intelligence)
// ----------------------------------------------------------------------
// â€¢ Product â†’ Tribe â†’ Audience â†’ AI Matching
// â€¢ Scores: Influence, Engagement, Quality, Conversion Fit
// â€¢ AI selects Top Picks for merchant
// ======================================================================

import React, { useState } from "react";
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
          <FiUsers /> Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ø°ÙƒÙŠ
        </h1>
        <p className="text-gray-300">
          Ø°ÙƒØ§Ø¡ Core4.AI ÙŠÙ‚ØªØ±Ø­ Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ù†ØªØ¬Ùƒ Ø­Ø³Ø¨ Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© ÙˆØ§Ù„Ø¬Ù…Ù‡ÙˆØ±.
        </p>
      </div>

      {/* PRODUCT INPUT */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <h2 className="text-xl text-white font-bold flex items-center gap-2">
          <FiFilter className="text-[#4cff9b]" /> Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬
        </h2>

        <input
          placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬ (Ù…Ø«Ø§Ù„: Samsung S24 Ultra)"
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
            Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©
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
          <FiZap /> ØªØ­Ù„ÙŠÙ„ ÙˆØ§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-300 text-lg py-10 animate-pulse">
          Ø¬Ø§Ø±ÙŠ ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†â€¦
        </div>
      )}

      {/* RESULTS */}
      {matches && (
        <div className="space-y-10">

          {/* TRIBE MATCH */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTarget /> Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø£Ù†Ø³Ø¨ Ù„Ù„Ù…Ù†ØªØ¬
            </h3>
            <p className="text-3xl font-extrabold text-white mt-2">
              {matches.tribe}
            </p>
          </div>

          {/* CREATOR RESULTS */}
          <div className="space-y-6">
            <h3 className="text-2xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiTrendingUp /> Ø§Ù„Ù…Ø¤Ø«Ø±ÙˆÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙˆÙ†
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
                      Ù‚Ø¨ÙŠÙ„Ø©: {c.tribe}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Ø§Ù„Ù…ØªØ§Ø¨Ø¹ÙˆÙ†: {c.followers.toLocaleString()}
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

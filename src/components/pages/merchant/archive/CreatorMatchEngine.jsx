// ============================================================================
// ðŸ’š Core4.AI â€“ CreatorMatchEngine.jsx (v1.0 â€œSaudi Performer Match Engineâ€)
// ----------------------------------------------------------------------------
// â€¢ AI-powered creator matching for merchants
// â€¢ Scores creators: Tribe Fit, Content Quality, Influence Weight
// â€¢ Predicts Conversion Probability
// â€¢ Recommends audience micro-contributors
// â€¢ Uses Saudi digital behavior patterns
// ============================================================================

import React, { useState } from "react";
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
    "Hyper-Engaged Female Audience 18â€“25",
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
        <FiUserCheck /> E10 â€” Creator Matchmaking Engine
      </h1>

      <p className="text-gray-300">
        Ø§Ø®ØªØ± Ø§Ù„Ù…Ù†ØªØ¬ ÙˆØ§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø©ØŒ ÙˆØ¯Ø¹ Ø§Ù„Ù†Ø¸Ø§Ù… ÙŠØ­Ø¯Ø¯ Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† + Ø£ÙØ¶Ù„
        Ø¬Ù…Ù‡ÙˆØ± Ø¯Ø§Ø¹Ù….
      </p>

      {/* INPUTS */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <input
          placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <select
          value={tribe}
          onChange={(e) => setTribe(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="">Ø§Ø®ØªØ± Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø©</option>
          {TRIBES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <button
          onClick={matchCreators}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          <FiSearch /> ØªØ­Ù„ÙŠÙ„ Ùˆ Ù…Ø·Ø§Ø¨Ù‚Ø©
        </button>
      </div>

      {/* RESULTS */}
      {results && (
        <div className="space-y-10">
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-3">
              <FiTarget /> Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬
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
              <FiUsers /> Ø£ÙØ¶Ù„ Ø¹Ù†Ø§ØµØ± Audience Ù„Ø¯Ø¹Ù… Ø§Ù„Ø­Ù…Ù„Ø©
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

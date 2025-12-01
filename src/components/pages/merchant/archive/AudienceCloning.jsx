// ============================================================================
// ðŸ’š Core4.AI â€“ AudienceCloning.jsx (v1.0 â€œSaudi Lookalike Engineâ€)
// ----------------------------------------------------------------------------
// â€¢ Generates buyer seeds + lookalikes (1% | 2% | 5% | 10%)
// â€¢ Behavioral segmentation engine (Saudi Market Version)
// â€¢ Interest stacking for Meta + TikTok
// â€¢ Exportable audience profiles (JSON / CSV)
// â€¢ Designed for merchants to scale ads intelligently
// ============================================================================

import React, { useState } from "react";
import {
  FiUsers,
  FiTarget,
  FiDownload,
  FiLayers,
  FiActivity,
  FiSearch,
  FiZap,
  FiFileText,
} from "react-icons/fi";

export default function AudienceCloning() {
  const [productName, setProductName] = useState("");
  const [tribe, setTribe] = useState("");
  const [seedSize, setSeedSize] = useState(500);
  const [results, setResults] = useState(null);

  const TRIBES = ["Techy", "Fashionists", "EventGoers", "Adventurers"];

  const buildAudience = () => {
    if (!productName || !tribe) return;

    const interestLayers = {
      Techy: [
        "AI",
        "Smartphones",
        "Coding",
        "Tech Youtubers",
        "Electronics stores",
      ],
      Fashionists: [
        "Makeup",
        "Luxury brands",
        "Influencers (Saudi)",
        "Lifestyle bloggers",
        "Fashion magazines",
      ],
      EventGoers: [
        "Restaurants",
        "Events in Riyadh",
        "Concerts",
        "Food festivals",
        "Snapchat Public Places",
      ],
      Adventurers: [
        "Camping",
        "Outdoors",
        "Hiking",
        "Travel",
        "Adventure vloggers",
      ],
    };

    const behavior = {
      Techy: [
        "Purchases electronics often",
        "Follows tech creators",
        "Engages with product review videos",
      ],
      Fashionists: [
        "High engagement with beauty/fashion ads",
        "Adds to cart late at night",
        "Influence-driven behavior",
      ],
      EventGoers: [
        "Weekend activity spenders",
        "High food delivery frequency",
        "Checks Snap Maps 'Hot Spots'",
      ],
      Adventurers: [
        "Outdoor purchase patterns",
        "Follows travel influencers",
        "Loves gear reviews",
      ],
    };

    const lookalikes = {
      "1%": seedSize * 50,
      "2%": seedSize * 100,
      "5%": seedSize * 250,
      "10%": seedSize * 500,
    };

    setResults({
      tribe,
      productName,
      seedSize,
      interests: interestLayers[tribe],
      behavior: behavior[tribe],
      lookalikes,
    });
  };

  const exportCSV = () => {
    const csv =
      "audience, size\n" +
      Object.entries(results.lookalikes)
        .map(([k, v]) => `${k},${v}`)
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audience_lookalikes.csv";
    a.click();
  };

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiUsers /> E9 â€” Audience Cloning Engine
      </h1>
      <p className="text-gray-300">
        Ø¨Ù†Ø§Ø¡ Ø¬Ù…Ø§Ù‡ÙŠØ± Ø´Ø¨ÙŠÙ‡Ø© (Lookalike Audiences) Ø¨Ø¬ÙˆØ¯Ø© Ø¹Ø§Ù„ÙŠØ© Ù„Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠ.
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

        <input
          type="number"
          value={seedSize}
          onChange={(e) => setSeedSize(Number(e.target.value))}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
          placeholder="Seed audience size"
        />

        <button
          onClick={buildAudience}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          <FiTarget /> ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ø¬Ù…Ù‡ÙˆØ±
        </button>
      </div>

      {/* RESULTS */}
      {results && (
        <div className="space-y-10">

          <Section
            title="Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©"
            icon={<FiLayers />}
            content={results.tribe}
          />

          <SectionList
            title="Ø§Ù‡ØªÙ…Ø§Ù…Ø§Øª Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± (Interest Layers)"
            icon={<FiSearch />}
            items={results.interests}
          />

          <SectionList
            title="Ø§Ù„Ø³Ù„ÙˆÙƒÙŠØ§Øª Ø§Ù„Ø´Ø±Ø§Ø¦ÙŠØ© (Behavioral Signals)"
            icon={<FiActivity />}
            items={results.behavior}
          />

          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiZap /> Lookalike Sizes (Saudi Market)
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
              {Object.entries(results.lookalikes).map(([k, v]) => (
                <li key={k}>
                  {k} Audience â†’ <span className="text-white font-bold">{v} users</span>
                </li>
              ))}
            </ul>

            <button
              onClick={exportCSV}
              className="mt-5 bg-[#4cff9b] text-black px-4 py-2 rounded-md font-bold flex items-center gap-2"
            >
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, content }) {
  return (
    <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
      <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      <p className="text-white text-2xl font-bold mt-3">{content}</p>
    </div>
  );
}

function SectionList({ title, icon, items }) {
  return (
    <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
      <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

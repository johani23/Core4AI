// ======================================================================
// ðŸ’š Core4.AI â€“ MerchantCampaigns.jsx (Saudi AI Campaign Builder v1.0)
// ----------------------------------------------------------------------
// â€¢ Merchant selects objective (New Product / Reinforce / Awareness)
// â€¢ AI generates strategy, audience, tribe match, creator picks
// â€¢ Saudi green branding for merchant suite
// ======================================================================

import React, { useState } from "react";
import { 
  FiAperture, 
  FiTarget, 
  FiUsers, 
  FiTrendingUp, 
  FiBarChart2,
  FiZap,
  FiEdit3
} from "react-icons/fi";

export default function MerchantCampaigns() {
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const CAMPAIGN_TYPES = {
    new: "Ø¥Ø·Ù„Ø§Ù‚ Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯",
    reinforce: "ØªØ¹Ø²ÙŠØ² Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª",
    awareness: "Ø±ÙØ¹ Ø§Ù„ÙˆØ¹ÙŠ Ø¨Ø§Ù„Ø¹Ù„Ø§Ù…Ø©"
  };

  async function generatePlan() {
    if (!objective) return;

    setLoading(true);

    // Temporary simulated backend response
    setTimeout(() => {
      setPlan({
        objective: CAMPAIGN_TYPES[objective],
        tribe: "Techy",
        audience: [
          "Ø·Ù„Ø§Ø¨ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª",
          "Ù…Ø­Ø¨ÙŠ Ø§Ù„ØªÙ‚Ù†ÙŠØ©",
          "Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† Ø§Ù„Ù…Ù‡ØªÙ…ÙŠÙ† Ø¨Ø§Ù„Ù‡ÙˆØ§ØªÙ ÙˆØ§Ù„ÙƒØ§Ù…ÙŠØ±Ø§Øª"
        ],
        creators: [
          { name: "Faisal Tech", followers: "182K", score: 92 },
          { name: "Sara Digital", followers: "97K", score: 88 },
        ],
        message:
          "ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø¢Ø®Ø± Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª Ø§Ù„ØªÙ‚Ù†ÙŠØ© â€” Ø£Ø¯Ø§Ø¡ Ø£Ø³Ø±Ø¹ØŒ ØªØµÙ…ÙŠÙ… Ø£Ù‚ÙˆÙ‰ØŒ ÙˆØ¬ÙˆØ¯Ø© Ù„Ø§ ØªÙÙ‚Ø§Ø±Ù†.",
        strategy:
          "Ø§Ù„ØªØ±ÙƒÙŠØ² Ø¹Ù„Ù‰ Ø§Ù„ÙÙŠØ¯ÙŠÙˆ Ø§Ù„Ù‚ØµÙŠØ± Ø®Ù„Ø§Ù„ 48 Ø³Ø§Ø¹Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ØŒ Ø«Ù… Ø­Ù…Ù„Ø§Øª ØªØ¹Ø²ÙŠØ² Ø¹Ø¨Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†.",
        kpis: [
          "CTR Ø£Ø¹Ù„Ù‰ Ù…Ù† 3.2%",
          "Ù†Ù…Ùˆ Ø§Ù„ÙˆØ¹ÙŠ Ø¨Ù†Ø³Ø¨Ø© 18%",
          "Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ø²ÙŠØ§Ø±Ø§Øª Ø¥Ù„Ù‰ ØµÙØ­Ø© Ø§Ù„Ù…Ù†ØªØ¬",
        ],
        schedule: [
          "Ø§Ù„ÙŠÙˆÙ… 1â€“2: ÙÙŠØ¯ÙŠÙˆ Ø¥Ø·Ù„Ø§Ù‚ + Ù‡Ø§Ø´ØªØ§Ù‚",
          "Ø§Ù„ÙŠÙˆÙ… 3â€“4: Ù…Ø­ØªÙˆÙ‰ Ù…Ø¤Ø«Ø±ÙŠÙ†",
          "Ø§Ù„ÙŠÙˆÙ… 5: Reels/TikTok Boost",
          "Ø§Ù„ÙŠÙˆÙ… 6â€“7: Ù…Ø±Ø§Ø¬Ø¹Ø§Øª + Call-to-Action"
        ]
      });

      setLoading(false);
    }, 900);
  }

  return (
    <div className="space-y-10">

      {/* ======================== Header ======================== */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#4cff9b]">
          ØµØ§Ù†Ø¹ Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©
        </h1>
        <p className="text-gray-300">Ø°ÙƒØ§Ø¡ ØªØ³ÙˆÙŠÙ‚ÙŠ Ù…Ø¨Ù†ÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„ ÙˆØ§Ù„ØªØ£Ø«ÙŠØ±</p>
      </div>

      {/* ======================== Campaign Selector ======================== */}
      <div className="bg-[#01341c] border border-[#1b6647] rounded-xl p-6">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <FiAperture className="text-[#4cff9b]" /> Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ø­Ù…Ù„Ø©
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {Object.entries(CAMPAIGN_TYPES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setObjective(key)}
              className={`p-4 rounded-xl text-sm font-bold border transition
              ${
                objective === key
                  ? "bg-[#4cff9b] text-black border-[#4cff9b]"
                  : "bg-[#002015] text-white border-[#145536] hover:border-[#4cff9b]"
              }`}
            >
              {label}
            </button>
          ))}

        </div>

        <button
          onClick={generatePlan}
          disabled={loading || !objective}
          className="mt-6 w-full bg-[#4cff9b] text-black font-extrabold py-3 rounded-lg text-lg disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <FiZap /> ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø°ÙƒÙŠØ©
        </button>
      </div>

      {/* ======================== Loading ======================== */}
      {loading && (
        <div className="text-center text-gray-300 py-10 text-lg animate-pulse">
          Ø¬Ø§Ø±ÙŠ ØªØ¬Ù‡ÙŠØ² Ø§Ù„Ø®Ø·Ø©â€¦
        </div>
      )}

      {/* ======================== Generated Campaign ======================== */}
      {plan && (
        <div className="space-y-8">

          {/* Objective */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] mb-1">
              Ù†ÙˆØ¹ Ø§Ù„Ø­Ù…Ù„Ø©
            </h3>
            <p className="text-white">{plan.objective}</p>
          </div>

          {/* Tribe */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiTarget /> Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø£Ù†Ø³Ø¨
            </h3>
            <p className="text-3xl font-extrabold text-white mt-3">{plan.tribe}</p>
            <p className="text-gray-400 text-sm mt-1">
              Ø£ÙØ¶Ù„ Ù‚Ø¨ÙŠÙ„Ø© Ù…Ù† Ø­ÙŠØ« Ø§Ù„ØªÙØ§Ø¹Ù„ ÙˆØ§Ù„ØªØ­ÙˆÙŠÙ„.
            </p>
          </div>

          {/* Audience */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiUsers /> Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù
            </h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              {plan.audience.map((a, idx) => (
                <li key={idx}>â€¢ {a}</li>
              ))}
            </ul>
          </div>

          {/* Creators */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiTrendingUp /> Ø§Ù„Ù…Ø¤Ø«Ø±ÙˆÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙˆÙ†
            </h3>
            <div className="mt-4 space-y-4">
              {plan.creators.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#01341c] border border-[#1b6647] rounded-lg"
                >
                  <p className="text-white font-bold">{c.name}</p>
                  <p className="text-gray-300 text-sm">
                    Ù…ØªØ§Ø¨Ø¹ÙˆÙ†: {c.followers} â€” Score: {c.score}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiEdit3 /> Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©
            </h3>
            <p className="mt-3 text-white">{plan.message}</p>
          </div>

          {/* Strategy */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiBarChart2 /> Ø§Ù„Ø¥Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©
            </h3>
            <p className="mt-3 text-gray-300">{plan.strategy}</p>
          </div>

          {/* KPIs */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b]">KPIs Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ©</h3>
            <ul className="mt-3 text-gray-300 space-y-2">
              {plan.kpis.map((k, idx) => (
                <li key={idx}>â€¢ {k}</li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#4cff9b]">Ø§Ù„Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø²Ù…Ù†ÙŠ Ù„Ù„Ø­Ù…Ù„Ø©</h3>
            <ul className="mt-3 text-gray-300 space-y-2">
              {plan.schedule.map((s, idx) => (
                <li key={idx}>â€¢ {s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

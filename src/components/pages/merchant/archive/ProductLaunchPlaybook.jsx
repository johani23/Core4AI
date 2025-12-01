// ============================================================================
// ðŸ’š Core4.AI â€“ ProductLaunchPlaybook.jsx (v1.5 â€œSaudi Launch Engineâ€)
// ----------------------------------------------------------------------------
// â€¢ 72-hour launch plan (Pre â†’ Launch â†’ Post)
// â€¢ Influencer + Tribe + Creative scripting
// â€¢ Saudi market copywriting + tactical suggestions
// â€¢ Fully integrated with the Tribe economy
// ============================================================================

import React, { useState } from "react";
import {
  FiFlag,
  FiTarget,
  FiZap,
  FiUsers,
  FiVideo,
  FiPenTool,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";

export default function ProductLaunchPlaybook() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const CATEGORIES = [
    "electronics",
    "fashion",
    "beauty",
    "food",
    "events",
    "outdoor",
    "home",
  ];

  const TRIBE_MAP = {
    electronics: "Techy",
    fashion: "Fashionists",
    beauty: "Fashionists",
    food: "EventGoers",
    events: "EventGoers",
    outdoor: "Adventurers",
    home: "Fashionists",
    default: "EventGoers",
  };

  const generate = () => {
    if (!productName || !category) return;

    setLoading(true);

    setTimeout(() => {
      const tribe = TRIBE_MAP[category] || "EventGoers";

      setPlan({
        productName,
        category,
        tribe,
        pre_launch: [
          "Ù†Ø´Ø± ØªÙ„Ù…ÙŠØ­Ø§Øª Ø¨Ø³ÙŠØ·Ø© Ø¹Ù† Ø§Ù„Ù…Ù†ØªØ¬ Ù„Ù…Ø¯Ø© 24 Ø³Ø§Ø¹Ø© Ù„Ø±ÙØ¹ Ø§Ù„ÙØ¶ÙˆÙ„.",
          "Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù…Ù†ØªØ¬ Ù„Ù€ 2 Ù…Ù† Ø§Ù„Ù…ÙŠÙƒØ±Ùˆ-Ù…Ø¤Ø«Ø±ÙŠÙ† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.",
          "Ø¹Ø±Ø¶ Ù„Ù‚Ø·Ø© Ø¬Ø²Ø¦ÙŠØ© Ù„Ù„Ù…Ù†ØªØ¬ Ù…Ø¹ Ø³Ø¤Ø§Ù„ Ù„Ù„Ø¬Ù…Ù‡ÙˆØ±: 'ÙˆØ´ ØªØªÙˆÙ‚Ø¹ÙˆÙ†ØŸ'",
        ],
        launch_day: [
          "Ù†Ø´Ø± ÙÙŠØ¯ÙŠÙˆ Ø±Ø¦ÙŠØ³ÙŠ 6 Ø«ÙˆØ§Ù†ÙŠ: Ù…Ø´ÙƒÙ„Ø© â†’ Ø­Ù„ Ø³Ø±ÙŠØ¹.",
          "ØªÙØ¹ÙŠÙ„ Ø­Ù…Ù„Ø© Ø¥Ø¹Ù„Ø§Ù†ÙŠØ© Meta Ù„Ù…Ø¯Ø© 24 Ø³Ø§Ø¹Ø© (Reach + Traffic).",
          "Ø¥Ø·Ù„Ø§Ù‚ Boost Ø¯Ø§Ø®Ù„ Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø© Ù„ØªØ­Ø±ÙŠÙƒ Ø§Ù„Ø³Ù„Ø³Ù„Ø©.",
        ],
        post_launch: [
          "Ù†Ø´Ø± Ù…Ø­ØªÙˆÙ‰ UGC Ø­Ù‚ÙŠÙ‚ÙŠ Ù…Ù† Ù…Ø³ØªØ®Ø¯Ù… Ø³Ø¹ÙˆØ¯ÙŠ.",
          "Flash Sale Ù„Ù…Ø¯Ø© 6 Ø³Ø§Ø¹Ø§Øª Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†ØªØ¬.",
          "Retargeting Ù„Ù…Ù† Ø´Ø§Ù‡Ø¯ ÙÙŠØ¯ÙŠÙˆ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ Ù„Ù…Ø¯Ø© 3 Ø£ÙŠØ§Ù….",
        ],
        influencers: [
          { name: "Sara Micro", followers: "18K", tier: "Micro" },
          { name: "Omar Tech", followers: "42K", tier: "Mid" },
          { name: "Nour Lifestyle", followers: "9K", tier: "Rising Star" },
        ],
        script: `
ðŸŽ¬ Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ ÙÙŠØ¯ÙŠÙˆ Ø¥Ø·Ù„Ø§Ù‚ (${productName}) â€“ Ù†Ø³Ø®Ø© Ø³Ø¹ÙˆØ¯ÙŠØ© Ø³Ø±ÙŠØ¹Ø©
1ï¸âƒ£ (0â€“1 Ø«Ø§Ù†ÙŠØ©)
Ø²Ø§ÙˆÙŠØ© Ù‚Ø±ÙŠØ¨Ø© + Ø­Ø±ÙƒØ© Ø³Ø±ÙŠØ¹Ø©  
Overlay: "Ø¹Ù…Ø±Ùƒ ÙˆØ§Ø¬Ù‡Øª Ù‡Ø°ÙŠ Ø§Ù„Ù…Ø´ÙƒÙ„Ø©ØŸ"

2ï¸âƒ£ (1â€“2 Ø«Ø§Ù†ÙŠØ©)
Ù…Ø´Ù‡Ø¯ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© (Ù„Ù‚Ø·Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ù‹Ø§)

3ï¸âƒ£ (2â€“4 Ø«ÙˆØ§Ù†Ù)
Zoom Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†ØªØ¬ + Ø¥Ø¸Ù‡Ø§Ø± ÙØ§Ø¦Ø¯ØªÙŠÙ† ÙÙ‚Ø·

4ï¸âƒ£ (4â€“6 Ø«ÙˆØ§Ù†Ù)
Before/After Ø£Ùˆ ØªØ¬Ø±Ø¨Ø© Ø´Ø®Øµ Ø³Ø¹ÙˆØ¯ÙŠ

5ï¸âƒ£ Ø§Ù„Ø®ØªØ§Ù…
"Ø§Ø·Ù„Ø¨Ù‡ Ø§Ù„Ø¢Ù†â€¦ Ø§Ù„ØªÙˆØµÙŠÙ„ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø© ðŸŒŸ"
        `,
        copywriting: {
          hook: "ØªØ®ÙŠÙ„ Ù…Ù†ØªØ¬ Ø¨Ø³ÙŠØ·â€¦ ÙˆÙŠØºÙŠØ± ÙŠÙˆÙ…ÙƒØŸ ðŸ˜ðŸ”¥",
          caption: `
ðŸ”¥ Ø¥Ø·Ù„Ø§Ù‚ Ø¬Ø¯ÙŠØ¯ ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© ðŸ”¥
${productName}

âœ” Ø¬ÙˆØ¯Ø© Ø¹Ø§Ù„ÙŠØ©  
âœ” Ø³Ø¹Ø± Ù…Ù†Ø§Ø³Ø¨  
âœ” ØªÙˆØµÙŠÙ„ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø©  

Ø§Ø¶ØºØ· ÙˆØ§Ø·Ù„Ø¨ Ø§Ù„Ø¢Ù† Ù‚Ø¨Ù„ Ø§Ù†ØªÙ‡Ø§Ø¡ Ø§Ù„Ø¹Ø±Ø¶!  
#Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© #Ù…ØªØ¬Ø±_Ø§Ù„ÙƒØªØ±ÙˆÙ†ÙŠ #Ø¹Ø±ÙˆØ¶
          `,
        },
      });

      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
          <FiZap /> Product Launch Engine â€” Saudi Edition (E7)
        </h1>
        <p className="text-gray-300">
          Ø®Ø·Ø© Ø¥Ø·Ù„Ø§Ù‚ ÙƒØ§Ù…Ù„Ø© Ù„Ù„Ù…Ù†ØªØ¬ Ø®Ù„Ø§Ù„ 72 Ø³Ø§Ø¹Ø© â€” Ø¬Ø§Ù‡Ø²Ø© ÙÙˆØ±Ø§Ù‹ Ù„Ù„ØªÙ†ÙÙŠØ°.
        </p>
      </div>

      {/* INPUT FORM */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <input
          placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="" disabled>Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={generate}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold flex items-center justify-center gap-2 rounded-lg"
        >
          <FiTarget /> ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-300 animate-pulse py-10">
          Ø¬Ø§Ø±ÙŠ ØªØ¬Ù‡ÙŠØ² Ø§Ù„Ø®Ø·Ø©â€¦
        </p>
      )}

      {/* RESULT */}
      {plan && (
        <div className="space-y-10">

          {/* Tribe Selection */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiFlag /> Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø£Ù†Ø³Ø¨ Ù„Ù„Ø¥Ø·Ù„Ø§Ù‚
            </h2>
            <p className="text-3xl font-extrabold text-white mt-2">{plan.tribe}</p>
          </div>

          {/* 72 HOUR LAUNCH PHASES */}
          <Section title="Pre-Launch (Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚)" icon={<FiClock />} bullets={plan.pre_launch} />
          <Section title="Launch Day (ÙŠÙˆÙ… Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚)" icon={<FiTrendingUp />} bullets={plan.launch_day} />
          <Section title="Post-Launch (Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚)" icon={<FiFlag />} bullets={plan.post_launch} />

          {/* Influencers */}
          <div className="space-y-4">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiUsers /> Ø§Ù„Ù…Ø¤Ø«Ø±ÙˆÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙˆÙ†
            </h2>
            {plan.influencers.map((inf, idx) => (
              <div
                key={idx}
                className="bg-[#01341c] border border-[#1b6647] p-5 rounded-xl flex justify-between"
              >
                <div>
                  <p className="text-white font-bold">{inf.name}</p>
                  <p className="text-gray-400 text-sm">Ø§Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ†: {inf.followers}</p>
                </div>
                <span className="text-[#4cff9b] font-bold">{inf.tier}</span>
              </div>
            ))}
          </div>

          {/* Video Script */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiVideo /> Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ Ø§Ù„ÙÙŠØ¯ÙŠÙˆ
            </h2>
            <pre className="whitespace-pre-wrap text-gray-300 mt-3">{plan.script}</pre>
          </div>

          {/* Copywriting */}
          <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl space-y-4">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiPenTool /> ÙƒØªØ§Ø¨Ø© Ø§Ù„Ù…Ø­ØªÙˆÙ‰ (Copywriting)
            </h2>

            <p className="text-white font-bold">Hook:</p>
            <p className="text-gray-300">{plan.copywriting.hook}</p>

            <p className="text-white font-bold mt-3">Caption:</p>
            <pre className="whitespace-pre-wrap text-gray-300">{plan.copywriting.caption}</pre>
          </div>

        </div>
      )}

    </div>
  );
}

function Section({ title, icon, bullets }) {
  return (
    <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
      <h3 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h3>
      <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

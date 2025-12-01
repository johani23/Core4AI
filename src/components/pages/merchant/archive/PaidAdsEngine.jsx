// ============================================================================
// ðŸ’š Core4.AI â€“ PaidAdsEngine.jsx (v1.0 â€œSaudi Paid Ads Launcherâ€)
// ----------------------------------------------------------------------------
// â€¢ Meta + TikTok ads generator for Saudi market
// â€¢ AI targeting, budget allocation, creatives & variations
// â€¢ Tribe-based recommendation (Techy / Adventurers / Fashionists / EventGoers)
// â€¢ Produces 8 campaign assets instantly
// â€¢ Saudi cultural tone + GCC audience patterns
// ============================================================================

import React, { useState } from "react";
import {
  FiZap,
  FiTarget,
  FiPieChart,
  FiFilm,
  FiGlobe,
  FiEdit3,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

export default function PaidAdsEngine() {
  const [productName, setProductName] = useState("");
  const [budget, setBudget] = useState("");
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
    if (!productName || !category || !budget) return;

    setLoading(true);

    setTimeout(() => {
      const tribe = TRIBE_MAP[category] || "EventGoers";

      const targeting = {
        Techy: [
          "ØªÙ‚Ù†ÙŠØ©",
          "Ù‡ÙˆØ§ØªÙ",
          "Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ",
          "ØªØ·Ø¨ÙŠÙ‚Ø§Øª",
          "Ù…ØªØ§Ø¨Ø¹ÙŠÙ† Ù‚Ù†ÙˆØ§Øª ØªÙ‚Ù†ÙŠØ©",
        ],
        Fashionists: ["Ù…ÙˆØ¶Ø©", "Ø³ØªØ§ÙŠÙ„", "Ø­Ù‚Ø§Ø¦Ø¨", "Ù…Ø§Ø±ÙƒØ§Øª", "Lifestyle"],
        EventGoers: ["ÙØ¹Ø§Ù„ÙŠØ§Øª", "Ø§Ù„Ø­ÙÙ„Ø§Øª", "Ù…Ø·Ø§Ø¹Ù…", "Weekend outings"],
        Adventurers: ["ÙƒØ§Ù…Ø¨ÙŠÙ†Øº", "Ø±Ø­Ù„Ø§Øª", "ØªØ³Ù„Ù‚", "Outdoor lifestyle"],
      };

      const best_hours = [
        "7 PM â€“ 11 PM", 
        "1 PM â€“ 3 PM (TikTok)", 
        "Ø¨Ø¹Ø¯ ØµÙ„Ø§Ø© Ø§Ù„Ø¹Ø´Ø§Ø¡", 
        "Ø§Ù„Ø¬Ù…Ø¹Ø© Ù…Ø³Ø§Ø¡Ù‹"
      ];

      const ad_copy_base = `
ðŸ”¥ Ø¬Ø¯ÙŠØ¯ Ø§Ù„Ø¢Ù† ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© â€” ${productName}

âœ” Ø¬ÙˆØ¯Ø© Ø¹Ø§Ù„ÙŠØ©  
âœ” Ø³Ø¹Ø± Ù…Ù†Ø§ÙØ³  
âœ” Ø§Ù„ØªÙˆØµÙŠÙ„ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø©  

Ø§Ø·Ù„Ø¨Ù‡ Ø§Ù„Ø¢Ù† Ù‚Ø¨Ù„ Ø§Ù†ØªÙ‡Ø§Ø¡ Ø§Ù„Ø¹Ø±Ø¶!
#Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© #Ø¹Ø±ÙˆØ¶ #Ù…ØªØ¬Ø±_Ø§Ù„ÙƒØªØ±ÙˆÙ†ÙŠ
      `;

      setPlan({
        tribe,
        targeting_list: targeting[tribe],
        best_hours,
        campaign_structure: {
          awareness: budget * 0.25,
          traffic: budget * 0.35,
          conversion: budget * 0.40,
        },
        meta_creatives: [
          {
            type: "6s Hook Video",
            script: `
(0â€“1s) Ù„Ù‚Ø·Ø© Ù…Ø´ÙƒÙ„Ø© + ÙƒÙ„Ù…Ø©: "ØªØ¹Ø±Ù Ø§Ù„Ø´Ø¹ÙˆØ±ØŸ"
(1â€“2s) Ø§Ù„Ù…Ù†ØªØ¬ ÙŠØ¸Ù‡Ø± Ø¨Ø´ÙƒÙ„ Ø³Ø±ÙŠØ¹
(2â€“4s) ÙØ§Ø¦Ø¯ØªÙŠÙ† ÙˆØ§Ø¶Ø­ØªÙŠÙ†
(4â€“6s) Before/After + Call to action
            `,
          },
          {
            type: "Static Photo",
            copy: "Ù…Ù†ØªØ¬ Ø¨Ø³ÙŠØ·â€¦ ÙŠØºÙŠØ± ÙŠÙˆÙ…Ùƒ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„! Ø§Ø·Ù„Ø¨Ù‡ Ø§Ù„Ø¢Ù† ðŸ˜ðŸ”¥",
          },
        ],
        tiktok_creatives: [
          {
            type: "UGC Real Saudi",
            script: `
ðŸŽ¥ (Creator POV)
"Ø£Ù‚Ø³Ù… Ø¨Ø§Ù„Ù„Ù‡ Ù„ÙŠ Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ† Ø£Ø³ØªØ®Ø¯Ù… ${productName}â€¦ ÙˆØµØ¯Ù‚ÙˆÙ†ÙŠ ÙØ±Ù‚!"

(Ù„Ù‚Ø·Ø§Øª Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø³Ø±ÙŠØ¹Ø©)
(CTA Ù‚ÙˆÙŠ ÙÙŠ Ø§Ù„Ù†Ù‡Ø§ÙŠØ©)
            `,
          },
          {
            type: "Talking Head",
            copy: "ØµØ¯Ù‚ Ø£Ùˆ Ù„Ø§ ØªØµØ¯Ù‚â€¦ Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬ Ø£Ø¨Ø¯Ø§Ù‹ Ù…Ùˆ Ø¹Ø§Ø¯ÙŠ! ðŸ‘€ðŸ”¥",
          },
        ],
        copy_variations: [
          "Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯ ÙˆØµØ§Ø± Ø­Ø¯ÙŠØ« Ø§Ù„Ù†Ø§Ø³â€¦ Ø¬Ø±Ù‘Ø¨Ù‡ Ø¨Ù†ÙØ³Ùƒ!",
          "Ù„Ø§ ØªÙÙˆØª Ø§Ù„ÙØ±ØµØ©! Ø¹Ø±Ø¶ Ù…Ø­Ø¯ÙˆØ¯ âš¡ðŸ”¥",
          "ØªÙˆØµÙŠÙ„ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©!",
        ],
      });

      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiZap /> Paid Ads Engine â€” Saudi Edition (E8)
      </h1>
      <p className="text-gray-300">
        ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ù…ØªÙƒØ§Ù…Ù„Ø© (Meta + TikTok) Ø®Ù„Ø§Ù„ Ø«ÙˆØ§Ù†Ù â€” Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„ØªÙ†ÙÙŠØ° ÙÙˆØ±Ø§Ù‹.
      </p>

      {/* FORM */}
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
          <option value="">Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          placeholder="Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø±ÙŠØ© (Ø¨Ø§Ù„Ø±ÙŠØ§Ù„)"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <button
          onClick={generate}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          <FiTarget /> ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-300 animate-pulse py-10">
          Ø¬Ø§Ø±ÙŠ ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øªâ€¦
        </p>
      )}

      {/* RESULT */}
      {plan && (
        <div className="space-y-10">

          {/* Tribe */}
          <Section title="Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© Ø§Ù„Ø£Ù†Ø³Ø¨" icon={<FiUsers />} content={plan.tribe} />

          {/* Targeting */}
          <SectionList
            title="Ø§Ù„Ø§Ø³ØªÙ‡Ø¯Ø§Ù (Saudi Targeting)"
            icon={<FiGlobe />}
            items={plan.targeting_list}
          />

          {/* Hours */}
          <SectionList
            title="Ø£ÙØ¶Ù„ Ø£ÙˆÙ‚Ø§Øª Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†"
            icon={<FiClock />}
            items={plan.best_hours}
          />

          {/* Budget */}
          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiPieChart /> ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
              <li>Awareness: {plan.campaign_structure.awareness} Ø±ÙŠØ§Ù„</li>
              <li>Traffic: {plan.campaign_structure.traffic} Ø±ÙŠØ§Ù„</li>
              <li>Conversion: {plan.campaign_structure.conversion} Ø±ÙŠØ§Ù„</li>
            </ul>
          </div>

          {/* Meta Creatives */}
          <SectionCreative
            title="Meta Ads Creatives"
            icon={<FiFilm />}
            data={plan.meta_creatives}
          />

          {/* TikTok Creatives */}
          <SectionCreative
            title="TikTok Ads Creatives"
            icon={<FiTrendingUp />}
            data={plan.tiktok_creatives}
          />

          {/* Copy Variations */}
          <SectionList
            title="Ù†Ø³Ø® Ø¥Ø¹Ù„Ø§Ù†ÙŠØ© (Copy Variants)"
            icon={<FiEdit3 />}
            items={plan.copy_variations}
          />

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
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function SectionCreative({ title, icon, data }) {
  return (
    <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl space-y-5">
      <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      {data.map((block, i) => (
        <div key={i} className="bg-[#01341c] border border-[#1b6647] p-5 rounded-lg">
          <p className="text-[#4cff9b] font-bold">{block.type}</p>
          <pre className="whitespace-pre-wrap text-gray-300 mt-2">
            {block.script || block.copy}
          </pre>
        </div>
      ))}
    </div>
  );
}

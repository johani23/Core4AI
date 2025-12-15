// ============================================================================
// Ã°Å¸â€™Å¡ Core4.AI Ã¢â‚¬â€œ AudienceInsightsPanel.jsx (PRO Edition)
// ============================================================================

import { useAudience } from "@/context/AudienceContext";

export default function AudienceInsightsPanel() {
  const { persona } = useAudience();

  const demoTopCategories = ["Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â©", "Ã˜Â£Ã˜Â¬Ã™â€¡Ã˜Â²Ã˜Â©", "Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â¨ Ã™â€¦Ã™Ë†Ã˜Â³Ã™â€¦ Ã˜Â§Ã™â€žÃ˜Â±Ã™Å Ã˜Â§Ã˜Â¶"];
  const demoNextBestActions = [
    "Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â¨Ã˜Â§Ã™Æ’Ã˜Â¬ Ã˜Â¹Ã™â€¦Ã™â€ž Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ™Æ’Ã™Ë†Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ™â€šÃ˜Â±Ã™Å Ã˜Â¨ Ã™â€¦Ã™â€ Ã™Æ’",
    "Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¬ Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯ Ã™Å Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã˜Â¬Ã™â€žÃ˜Â³Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â²",
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl" dir="rtl">
      <div className="text-sm font-semibold text-indigo-300 mb-3">
        Ã™Æ’Ã™Å Ã™Â Core4 Ã™Å Ã™â€šÃ˜Â±Ã˜Â£ Ã˜Â¥Ã˜Â´Ã˜Â§Ã˜Â±Ã˜Â§Ã˜ÂªÃ™Æ’Ã˜Å¸
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€žÃ˜Â¢Ã™â€ :</div>
        <div className="flex flex-wrap gap-2">
          {demoTopCategories.map((c) => (
            <span
              key={c}
              className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-200 text-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Next Best Offers:</div>
        <ul className="list-disc pr-4 text-xs text-gray-300 space-y-1">
          {demoNextBestActions.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-[11px] text-gray-500">
        Ã˜Â­Ã˜Â³Ã˜Â§Ã˜Â¨Ã™Æ’ Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â§Ã™â€žÃ™Å  Ã™â€¦Ã˜ÂµÃ™â€ Ã™Â Ã™Æ’Ã™â‚¬{" "}
        <span className="text-gray-300 font-semibold">
          {persona?.level}
        </span>.
      </div>
    </div>
  );
}



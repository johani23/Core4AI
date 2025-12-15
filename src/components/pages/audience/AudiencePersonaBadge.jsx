// ============================================================================
// Ã°Å¸â€™Å¡ Core4.AI Ã¢â‚¬â€œ AudiencePersonaBadge v2 (Influence Edition)
// ============================================================================

import { useAudience } from "@/context/AudienceContext";

export default function AudiencePersonaBadge() {
  const { persona, influence } = useAudience();

  if (!persona) return null;

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl mb-6">

      <div className="flex items-center justify-between" dir="rtl">

        {/* LEFT */}
        <div>
          <div className="text-sm text-gray-400">Ã™â€¡Ã™Ë†Ã™Å Ã˜ÂªÃ™Æ’ Ã™ÂÃ™Å  Core4</div>

          <div className="text-xl font-bold text-green-400 mt-1">
            {persona.name || "Ã™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦ Core4"}
          </div>

          <div className="text-sm text-gray-300 mt-1">
            {influence?.tier || persona.level}
          </div>

          <div className="mt-2 text-xs text-gray-400">
            Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â²Ã˜Â§Ã˜Â¬ Ã˜Â§Ã™â€žÃ˜Â¢Ã™â€ :
            <span className="text-gray-200 mr-1">{persona.mood}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full
          bg-green-600/20 border border-green-600/40 text-green-300 text-xs font-semibold">
            Ã°Å¸Â§Â¿ {persona.tribe}
          </div>

          {/* Influence Score */}
          <div className="mt-3 text-xs text-gray-400">
            Influence Score:
            <span className="relative inline-flex ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/40 opacity-75"></span>
              <span className="relative text-green-300 font-semibold">
                {influence?.influence_score ?? 0}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* TAGS */}
      {persona.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" dir="rtl">
          {persona.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}



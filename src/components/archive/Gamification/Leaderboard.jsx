// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Leaderboard.jsx (v1 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œInfluence Ranking BoardÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays ranked list of top creators & tribes
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Integrates XP + Level + ROI impact
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Live updates from CoreSyncContext
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function Leaderboard() {
  const { creators = [], tribes = [], xp = 0, level = {} } = useCoreSync();

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Compute influence score for each creator
  const rankedCreators = useMemo(() => {
    return creators
      .map((c) => {
        const influenceScore =
          (c.power_index || 0) * (c.cr || 1) * (c.revenue || 100) / 1000;
        return {
          ...c,
          influenceScore: Math.round(influenceScore * 10) / 10,
        };
      })
      .sort((a, b) => b.influenceScore - a.influenceScore)
      .slice(0, 10);
  }, [creators]);

  // ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Highlight current user's rank (mock logic)
  const myRank = useMemo(() => {
    const position = rankedCreators.findIndex((r) => r.name === "You");
    return position >= 0 ? position + 1 : null;
  }, [rankedCreators]);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‹â€  Tribe color palette
  const tribeColors = {
    "Fashion Tribe": "#FF6FB5",
    "Tech Tribe": "#38BDF8",
    "Event Tribe": "#FBBF24",
    "Travel Tribe": "#A3E635",
    "Gaming Tribe": "#C084FC",
  };

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Influence Leaderboard
        </h2>
        <div className="text-sm text-gray-400">
          Your XP: <span className="text-white font-semibold">{xp}</span>{" "}
          ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Level:{" "}
          <span style={{ color: level.color || "#b87333" }}>
            {level.title || "Bronze"}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-700">
        <AnimatePresence>
          {rankedCreators.map((creator, idx) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between py-2 px-1 hover:bg-gray-800/40 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold w-6 text-center ${
                    idx === 0
                      ? "text-yellow-400"
                      : idx === 1
                      ? "text-gray-300"
                      : idx === 2
                      ? "text-orange-400"
                      : "text-gray-500"
                  }`}
                >
                  {idx + 1}
                </span>
                <img
                  src={creator.avatar || "https://via.placeholder.com/40"}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {creator.name}
                    {creator.name === "You" && (
                      <span className="ml-1 text-xs text-green-400">(You)</span>
                    )}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: tribeColors[creator.tribe] || "#9CA3AF",
                    }}
                  >
                    {creator.tribe}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-300">
                ÃƒÂ¢Ã…Â¡Ã‚Â¡ {creator.influenceScore.toFixed(1)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      <div className="mt-5 text-center text-xs text-gray-500 italic">
        {myRank ? (
          <>You are currently ranked <span className="text-green-400 font-semibold">#{myRank}</span> in your tribe.</>
        ) : (
          <>Join or launch more campaigns to climb the leaderboard!</>
        )}
      </div>
    </div>
  );
}



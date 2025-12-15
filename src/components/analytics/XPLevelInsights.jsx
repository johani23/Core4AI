// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ XPLevelInsights.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œBadge LadderÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows user XP progress & next level milestones
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Simple level logic for Bronze ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Silver ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Gold ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Platinum
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";

export default function XPLevelInsights() {
  const { xp = 0, level = {} } = useCoreSync();

  const { nextTitle, progressPct, nextXP } = useMemo(() => {
    if (xp < 500) return { nextTitle: "Silver", progressPct: (xp / 500) * 100, nextXP: 500 };
    if (xp < 1500) return { nextTitle: "Gold", progressPct: ((xp - 500) / 1000) * 100, nextXP: 1500 };
    if (xp < 3000) return { nextTitle: "Platinum", progressPct: ((xp - 1500) / 1500) * 100, nextXP: 3000 };
    return { nextTitle: "Maxed Out", progressPct: 100, nextXP: 3000 };
  }, [xp]);

  return (
    <div className="bg-[#0b0b15]/70 border border-gray-800 rounded-xl p-6 text-center">
      <h3 className="text-purple-400 font-bold mb-3">ÃƒÂ¢Ã‚Â­Ã‚Â XP & Level Progress</h3>
      <div className="text-gray-400 mb-2">Current Level: <b>{level?.title || "Bronze"}</b></div>
      <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        ></div>
      </div>
      <div className="text-gray-400">
        {xp} XP / {nextXP} XP ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Next Level: <span className="text-purple-400 font-semibold">{nextTitle}</span>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        {["Bronze", "Silver", "Gold", "Platinum"].map((t) => (
          <span
            key={t}
            className={`px-3 py-1 rounded-full border text-xs ${
              level?.title === t ? "border-purple-500 text-purple-300" : "border-gray-700 text-gray-500"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}



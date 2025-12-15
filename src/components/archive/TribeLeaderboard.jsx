// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TribeLeaderboard.jsx (v167 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œDynamic Tribe LeaderboardÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time tribe ranking by tokenValue + dopamine + influence
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Animated color cues for rise/fall
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-updates from CoreSyncContext
// ============================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function TribeLeaderboard() {
  const { tribes } = useCoreSync();
  const [ranked, setRanked] = useState([]);
  const prevRef = useRef({});

  useEffect(() => {
    const updated = [...tribes]
      .map((t) => ({
        name: t.name,
        tokenValue: t.tokenValue ?? 1,
        dopamine: (t.dopamine ?? 0.5) * 100,
        influence: (t.influence ?? 0.5) * 100,
      }))
      .sort((a, b) => b.tokenValue - a.tokenValue);
    setRanked(updated);
  }, [tribes]);

  // detect rise/fall for animation color
  const getColor = (tribe) => {
    const prev = prevRef.current[tribe.name];
    prevRef.current[tribe.name] = tribe.tokenValue;
    if (!prev) return "text-gray-300";
    if (tribe.tokenValue > prev) return "text-green-400";
    if (tribe.tokenValue < prev) return "text-red-400";
    return "text-gray-300";
  };

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6">
      <h3 className="text-pink-400 font-semibold mb-3">
        ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Dynamic Tribe Leaderboard
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Sorted by token value (auto-refreshes live)
      </p>

      <table className="w-full text-sm text-gray-300">
        <thead className="border-b border-gray-700 text-gray-400 uppercase">
          <tr>
            <th className="py-1 text-left">Rank</th>
            <th className="py-1 text-left">Tribe</th>
            <th className="py-1 text-center">Token Value</th>
            <th className="py-1 text-center">Dopamine</th>
            <th className="py-1 text-center">Influence</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((t, idx) => (
            <motion.tr
              key={t.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="border-b border-gray-800"
            >
              <td className="py-2 text-gray-500">{idx + 1}</td>
              <td className="py-2 font-semibold text-purple-300">{t.name}</td>
              <td className={`py-2 text-center font-semibold ${getColor(t)}`}>
                {t.tokenValue.toFixed(3)}
              </td>
              <td className="py-2 text-center text-blue-400">
                {t.dopamine.toFixed(1)}%
              </td>
              <td className="py-2 text-center text-yellow-400">
                {t.influence.toFixed(1)}%
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



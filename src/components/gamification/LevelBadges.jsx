// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ LevelBadges.jsx (v1.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œDynamic Tier UIÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays current Level + XP progress bar + badge animation
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-syncs with local XP data from GamificationEngine
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Tier colors & icons update live with Level progression
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Can be embedded in Navbar or Profile panels
// ============================================================

import { motion } from "framer-motion";

const tierConfig = [
  { min: 0, max: 999, name: "Bronze", icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â°", color: "#b87333" },
  { min: 1000, max: 2999, name: "Silver", icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‹â€ ", color: "#c0c0c0" },
  { min: 3000, max: 6999, name: "Gold", icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â¡", color: "#ffd700" },
  { min: 7000, max: 14999, name: "Platinum", icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â ", color: "#e5e4e2" },
  { min: 15000, max: Infinity, name: "Diamond", icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½", color: "#b9f2ff" },
];

export default function LevelBadges({ compact = false }) {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [tier, setTier] = useState(tierConfig[0]);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Fetch saved XP and Level from LocalStorage
  useEffect(() => {
    const storedXP = Number(localStorage.getItem("xp")) || 0;
    const storedLevel = Number(localStorage.getItem("level")) || 1;
    setXP(storedXP);
    setLevel(storedLevel);
    updateTier(storedXP);
  }, []);

  const updateTier = (xpValue) => {
    const found = tierConfig.find((t) => xpValue >= t.min && xpValue <= t.max);
    setTier(found || tierConfig[0]);
    const range = found.max - found.min;
    const pct = Math.min(((xpValue - found.min) / range) * 100, 100);
    setProgress(pct);
  };

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â« Compact mode for Navbar
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-300">
        <span>{tier.icon}</span>
        <span className="text-[11px] font-semibold" style={{ color: tier.color }}>
          {tier.name} ({level})
        </span>
        <motion.div
          className="h-1.5 bg-gray-800 rounded-full w-20 overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>
    );
  }

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â± Full Badge view for Profile / Gamification tab
  return (
    <div className="bg-[#0b0b15]/80 border border-gray-800 rounded-2xl p-5 shadow-md text-gray-300 mt-6 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
          {tier.icon} {tier.name} Tier
        </h3>
        <span className="text-xs text-gray-400">
          Level {level} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {xp} XP
        </span>
      </div>

      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          key={xp}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
        <span>
          Progress to next tier:{" "}
          <span style={{ color: tier.color }} className="font-semibold">
            {progress.toFixed(0)}%
          </span>
        </span>
        <motion.span
          className="font-semibold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ color: tier.color }}
        >
          {tier.icon}
        </motion.span>
      </div>
    </div>
  );
}



// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ GamificationEngine.jsx (v2.4 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSafe Context + Rank FeedbackÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Prevents undefined stats/council crash
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds fallback values for all dynamic props
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Keeps XP persistence, level-up animation, tier icons
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds live rank color feedback + gentle pulse on milestones
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCoreSync } from "@context/CoreSyncContext";

export default function GamificationEngine() {
  const { campaigns = [], council = {}, stats = {} } = useCoreSync();

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Safe fallbacks
  const totalInfluence = stats?.totalInfluence ?? 0;
  const dindex = council?.dindex ?? 50;

  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem("level")) || 1);
  const [nextLevelXP, setNextLevelXP] = useState(500);
  const [badge, setBadge] = useState(null);
  const [icon, setIcon] = useState("ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â°");

  const lastCampaignId = useRef(null);
  const lastDindexMilestone = useRef(0);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Level progression
  const calculateLevel = (xpValue) => {
    const lvl = Math.floor(Math.pow(xpValue / 500, 0.8)) + 1;
    const next = Math.floor(Math.pow(lvl, 1.25) * 500);
    return { lvl, next };
  };

  const getTierIcon = (lvl) => {
    if (lvl >= 15) return "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½";
    if (lvl >= 10) return "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â ";
    if (lvl >= 7) return "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â¡";
    if (lvl >= 4) return "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‹â€ ";
    return "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â°";
  };

  // ÃƒÂ¢Ã…Â¡Ã‚Â¡ Grant XP dynamically
  const grantXP = (amount, reason = "Activity") => {
    setXp((prev) => {
      const newXP = prev + amount;
      const { lvl, next } = calculateLevel(newXP);

      if (lvl > level) {
        setLevel(lvl);
        setBadge(`ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â° Level ${lvl} Unlocked!`);
        setIcon(getTierIcon(lvl));
        toast.success(`ÃƒÂ¢Ã…â€œÃ‚Â¨ Level Up! You reached Level ${lvl}`, { duration: 4000 });
      }

      setNextLevelXP(next);
      localStorage.setItem("xp", newXP);
      localStorage.setItem("level", lvl);
      return newXP;
    });

    console.log(`+${amount} XP for ${reason}`);
  };

  // ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Reward XP when new campaign launches
  useEffect(() => {
    if (campaigns.length > 0) {
      const latest = campaigns[0];
      if (latest?.campaign_id && latest.campaign_id !== lastCampaignId.current) {
        lastCampaignId.current = latest.campaign_id;
        const gain = Math.round((latest?.budget ?? 500) / 12 + Math.random() * 80);
        grantXP(gain, "Campaign Launch");
      }
    }
  }, [campaigns]);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¥ Influence Milestone
  useEffect(() => {
    if (totalInfluence > 0 && totalInfluence % 200 === 0) {
      grantXP(200, "Influence Milestone");
    }
  }, [totalInfluence]);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  D-Index adaptive synergy (every +10 above 70)
  useEffect(() => {
    const currentMilestone = Math.floor((dindex - 70) / 10);
    if (currentMilestone > lastDindexMilestone.current) {
      lastDindexMilestone.current = currentMilestone;
      grantXP(100, "Network Growth Bonus");
    }
  }, [dindex]);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‹â€  XP progress bar
  const progress = Math.min((xp / nextLevelXP) * 100, 100);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ Rank color feedback
  const rankColor =
    level >= 15
      ? "text-cyan-400"
      : level >= 10
      ? "text-indigo-400"
      : level >= 7
      ? "text-yellow-400"
      : level >= 4
      ? "text-gray-200"
      : "text-gray-400";

  return (
    <div className="bg-[#0b0b15]/80 border border-gray-800 rounded-2xl p-6 shadow-md text-gray-300 mt-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-bold flex items-center gap-2 ${rankColor}`}>
          {icon} Creator XP Progress
        </h3>
        <span className="text-xs text-gray-500">
          Level {level} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {xp}/{nextLevelXP} XP
        </span>
      </div>

      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          key={xp}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence>
        {badge && (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-green-400 text-sm font-semibold"
          >
            {badge}
          </motion.div>
        )}
      </AnimatePresence>

      {!badge && (
        <p className="mt-3 text-xs text-gray-400">
          Keep launching campaigns, boosting influence, and syncing your tribe power.
        </p>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Network Influence: <span className="text-purple-400">{totalInfluence}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ D-Index:{" "}
        <span className="text-pink-400">{dindex}</span>
      </div>
    </div>
  );
}



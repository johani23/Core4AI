// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ConversionLeaderboard.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œPowerBoardÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows top tribes & creators ranked by Conversion Power
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Merchants can identify high-ROI targets for campaigns
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Animated ranking bars with Framer Motion
// ============================================================

import { motion } from "framer-motion";

const tribeData = [
  {
    name: "Fashion Tribe",
    cr: 5.4,
    weight: 1.8,
    revenue: 12430,
    index: 92,
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Tech Tribe",
    cr: 4.9,
    weight: 2.2,
    revenue: 10870,
    index: 88,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Event Tribe",
    cr: 4.3,
    weight: 1.6,
    revenue: 8400,
    index: 83,
    color: "from-yellow-500 to-orange-500",
  },
];

const creatorData = [
  {
    name: "@MinaVibes",
    tribe: "Fashion Tribe",
    cr: 6.2,
    revenue: 3240,
    index: 95,
  },
  {
    name: "@AliTech",
    tribe: "Tech Tribe",
    cr: 5.8,
    revenue: 2990,
    index: 93,
  },
  {
    name: "@LaylaLens",
    tribe: "Creator Tribe",
    cr: 4.9,
    revenue: 2670,
    index: 90,
  },
];

export default function ConversionLeaderboard() {
  return (
    <div className="space-y-10">
      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-400">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¹ Conversion Power Index
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Discover who drives real value ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â merchants can target top tribes and creators
          with the highest conversion impact.
        </p>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â€šÂ¬ Tribe Leaderboard */}
      <div>
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¢ÃƒÂ¯Ã‚Â¸Ã‚Â Tribe Rankings
        </h2>
        <div className="space-y-3">
          {tribeData.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/60 border border-gray-800 p-4 rounded-xl hover:border-purple-500 transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{i + 1 === 1 ? "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â¡" : i + 1 === 2 ? "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‹â€ " : "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â°"}</span>
                  <div>
                    <h3 className="font-bold text-white">{t.name}</h3>
                    <p className="text-xs text-gray-400">
                      CR {t.cr}% ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Token Weight {t.weight}x ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {t.revenue.toLocaleString()} C4T
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-purple-400">
                    Power {t.index}
                  </div>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${t.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${t.index}%` }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ Creator Leaderboard */}
      <div>
        <h2 className="text-xl font-semibold text-pink-400 mb-4">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â» Top Creators
        </h2>
        <div className="space-y-3">
          {creatorData.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/60 border border-gray-800 p-4 rounded-xl hover:border-pink-500 transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-gray-400">
                      {c.tribe} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {c.cr}% CR ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {c.revenue.toLocaleString()} C4T
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-pink-400">
                    Power {c.index}
                  </div>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${c.index}%` }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Merchant CTA */}
      <div className="text-center mt-10">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Launch Campaign with Top Tribe
        </button>
      </div>
    </div>
  );
}



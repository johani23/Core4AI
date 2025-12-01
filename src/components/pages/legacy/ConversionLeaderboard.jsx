// ============================================================
// ðŸ’Ž Core4.AI â€“ ConversionLeaderboard.jsx (v1.0 â€œPowerBoardâ€)
// ------------------------------------------------------------
// âœ… Shows top tribes & creators ranked by Conversion Power
// âœ… Merchants can identify high-ROI targets for campaigns
// âœ… Animated ranking bars with Framer Motion
// ============================================================

import React from "react";
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
      {/* ðŸ† Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-400">
          ðŸ’¹ Conversion Power Index
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Discover who drives real value â€” merchants can target top tribes and creators
          with the highest conversion impact.
        </p>
      </div>

      {/* ðŸŒ€ Tribe Leaderboard */}
      <div>
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          ðŸ•ï¸ Tribe Rankings
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
                  <span className="text-xl">{i + 1 === 1 ? "ðŸ¥‡" : i + 1 === 2 ? "ðŸ¥ˆ" : "ðŸ¥‰"}</span>
                  <div>
                    <h3 className="font-bold text-white">{t.name}</h3>
                    <p className="text-xs text-gray-400">
                      CR {t.cr}% â€¢ Token Weight {t.weight}x â€¢ {t.revenue.toLocaleString()} C4T
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

      {/* ðŸ‘‘ Creator Leaderboard */}
      <div>
        <h2 className="text-xl font-semibold text-pink-400 mb-4">
          ðŸ‘©â€ðŸ’» Top Creators
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
                      {c.tribe} â€¢ {c.cr}% CR â€¢ {c.revenue.toLocaleString()} C4T
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

      {/* ðŸŽ¯ Merchant CTA */}
      <div className="text-center mt-10">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all">
          ðŸŽ¯ Launch Campaign with Top Tribe
        </button>
      </div>
    </div>
  );
}

// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ WalletRewards.jsx (v2.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œFinance + Pulse UnifiedÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays token wallet, merchant holdings, and D-Index Pulse
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds subtle growth animations and motivation copy
// ============================================================

import { motion } from "framer-motion";

export default function WalletRewards() {
  const balance = 1000.0;
  const dindex = 72.5;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-yellow-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Wallet & Rewards
        </h1>
        <p className="text-gray-400 text-sm">
          Track your C4T balance, merchant equity, and ecosystem performance.
        </p>
      </div>

      {/* Balance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#111827] border border-gray-700 rounded-xl p-6 shadow-md"
      >
        <h2 className="text-green-400 text-4xl font-extrabold mb-2">
          {balance.toFixed(2)} C4T
        </h2>
        <p className="text-gray-400 text-sm">Conversion Rate (avg): ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â</p>
      </motion.div>

      {/* Active Holdings */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md"
      >
        <h2 className="text-lg font-bold text-pink-400 mb-2">
          Active Merchant Holdings
        </h2>
        <p className="text-gray-400 text-sm">
          No merchant tokens yet. Collaborate through <span className="text-purple-400">Grow</span> to earn equity tokens.
        </p>
      </motion.div>

      {/* Reinforcement Loop */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 shadow-md"
      >
        <h2 className="text-lg font-bold text-cyan-400 mb-2">
          Reinforcement Loop
        </h2>
        <p className="text-gray-400 text-sm mb-2">
          Higher conversions strengthen tribe reputation and increase future
          commission bands. Your tokens represent real equity in merchants you
          helped grow.
        </p>
        <p className="text-xs text-cyan-300 italic">
          Every transaction increases your C4T level ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â keep it up!
        </p>
      </motion.div>

      {/* Network Pulse Integration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#111827] border border-gray-700 rounded-xl p-5 text-center"
      >
        <h3 className="text-blue-400 font-bold text-lg mb-2">
          ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Network Vitality (D-Index)
        </h3>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl font-extrabold text-green-400"
        >
          {dindex.toFixed(1)}
        </motion.div>
        <p className="text-xs text-gray-400 mt-1">
          Reflects ecosystem engagement and dopamine flow.
        </p>
      </motion.div>
    </div>
  );
}



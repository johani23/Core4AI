// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ BetaDashboard (MVP-60 Unified Overview)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Integrates Bridge Data (v53.5 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ v60)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays Tribes, Creators, Arena stats, and Global Metrics
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Ready for Closed Beta showcase (Sanabel Studio)
// ============================================================

import { motion } from "framer-motion";
import useBridgeData from "@/hooks/useBridgeData";

export default function BetaDashboard() {
  const { tribes, creators, arena, globalStats, loading, error } = useBridgeData();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        Fetching live data from Core4.AI bridge...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Error loading data: {error}
      </div>
    );

  return (
    <div className="p-8 bg-gradient-to-b from-black via-gray-950 to-black text-white min-h-screen">
      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Closed Beta Overview
      </motion.h1>

      {/* ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Global Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Stat label="Creators" value={globalStats.total_creators} />
        <Stat label="Wallets" value={globalStats.total_wallets} />
        <Stat label="Arena Matches" value={arena.matches} />
        <Stat label="Avg VIS" value={globalStats.avg_vis} />
      </section>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Tribe Mood Board */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Tribe Mood</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tribes.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 hover:shadow-lg hover:shadow-pink-500/10 transition"
            >
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-pink-400 text-lg font-bold mt-1">{t.mood_index}%</p>
              <div className="h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-pink-500"
                  style={{ width: `${t.mood_index}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Featured Creators */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Featured Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {creators.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-700/10 border border-gray-800 backdrop-blur-md hover:shadow-lg hover:shadow-indigo-500/10 transition"
            >
              <h3 className="text-xl font-semibold text-white">{c.name}</h3>
              <p className="text-gray-400">{c.tribe}</p>
              <p className="mt-2 text-pink-400 font-bold">
                VIS {c.vis} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ${c.price}
              </p>
              <p className="text-yellow-400 text-sm mt-1">{c.followers} followers</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  AI Arena Stats */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3">ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ AI Arena Overview</h2>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-gray-700">
          <p className="text-lg mb-2">
            Total Matches:{" "}
            <span className="text-green-400 font-semibold">{arena.matches}</span>
          </p>
          <p className="text-lg">
            Avg Confidence:{" "}
            <span className="text-yellow-400 font-semibold">
              {arena.avg_confidence ?? "--"}
            </span>
          </p>
        </div>
      </section>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¾ Footer */}
      <p className="text-center text-gray-500 text-sm mt-8">
        Core4.AI Ãƒâ€šÃ‚Â© 2025 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Beta Intelligence Dashboard v60 Integration
      </p>
    </div>
  );
}

// ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Reusable Stat Card
function Stat({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-xl bg-gray-800/60 text-center shadow border border-gray-700"
    >
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value ?? "--"}</p>
    </motion.div>
  );
}



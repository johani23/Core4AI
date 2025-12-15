// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Dashboard v200 (TURBO EDITION)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã…Â¡Ã‚Â¡ Unified Platform Dashboard for All User Roles
// ÃƒÂ¢Ã…Â¡Ã‚Â¡ WS Status ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Influence Metrics ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Merchant Stats ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Quick Actions
// ÃƒÂ¢Ã…Â¡Ã‚Â¡ Fully compatible with App.jsx v22 + New Page Structure
// ============================================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function Dashboard() {
  const { backendStatus, latency, council } = useCoreSync();

  const wsColor =
    backendStatus === "online"
      ? "bg-green-500"
      : backendStatus === "offline"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-10 space-y-10">
      
      {/* ------------------------------------------------------------
         ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Âµ TOP SECTION ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â LIVE SYSTEM STATUS
      ------------------------------------------------------------ */}
      <div className="flex justify-between items-center bg-[#11161b] p-6 rounded-xl border border-gray-800 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-green-500">
            Core4.AI Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Unified overview of creators, merchants, tribes, analytics, and AI signals.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className={`w-4 h-4 rounded-full ${wsColor} animate-pulse`} />
          <span className="text-gray-300">
            WS: {backendStatus.toUpperCase()} | Ping:{" "}
            {latency ?? "--"}ms
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------
         ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¶ INFLUENCE INTELLIGENCE PANEL
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#11161b] rounded-xl border border-gray-800 p-6 shadow hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold text-purple-400 mb-4">
          Influence Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Influence Index (D-Index)</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {council?.dindex?.toFixed(2) ?? 72.4}%
            </p>
          </div>

          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Top Tribe Momentum</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              Fashion+ 12.8%
            </p>
          </div>

          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Top Creator Growth</p>
            <p className="text-3xl font-bold text-red-400 mt-2">
              @LinaFitness
            </p>
          </div>

        </div>
      </motion.div>

      {/* ------------------------------------------------------------
         ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â© MERCHANT INTELLIGENCE PANEL
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#11161b] rounded-xl border border-gray-800 p-6 shadow hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Merchant Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Optimized Products</p>
            <p className="text-3xl font-bold text-green-300 mt-2">8</p>
          </div>

          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Active Campaigns</p>
            <p className="text-3xl font-bold text-orange-300 mt-2">3</p>
          </div>

          <div className="p-5 bg-[#0d1116] rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Weekly Revenue</p>
            <p className="text-3xl font-bold text-yellow-300 mt-2">$4,980</p>
          </div>
        
        </div>
      </motion.div>

      {/* ------------------------------------------------------------
         ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¦ QUICK ACCESS CENTER (Role-Aware Navigation)
      ------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <button
          onClick={() => (window.location.href = "/merchant/dashboard")}
          className="p-6 bg-[#11161b] rounded-xl border border-gray-800 hover:border-green-600 hover:shadow-xl transition text-left"
        >
          <p className="text-green-500 text-2xl mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢</p>
          <p className="font-semibold text-gray-200">Merchant Suite</p>
          <p className="text-gray-400 text-sm">Pricing, creative and campaigns</p>
        </button>

        <button
          onClick={() => (window.location.href = "/creator-market")}
          className="p-6 bg-[#11161b] rounded-xl border border-gray-800 hover:border-purple-600 hover:shadow-xl transition text-left"
        >
          <p className="text-purple-400 text-2xl mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤</p>
          <p className="font-semibold text-gray-200">Creator Suite</p>
          <p className="text-gray-400 text-sm">Promote products & earn</p>
        </button>

        <button
          onClick={() => (window.location.href = "/audience")}
          className="p-6 bg-[#11161b] rounded-xl border border-gray-800 hover:border-blue-600 hover:shadow-xl transition text-left"
        >
          <p className="text-blue-400 text-2xl mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§</p>
          <p className="font-semibold text-gray-200">Buyer Layer</p>
          <p className="text-gray-400 text-sm">Discover products & creators</p>
        </button>

        <button
          onClick={() => (window.location.href = "/tribe-exchange")}
          className="p-6 bg-[#11161b] rounded-xl border border-gray-800 hover:border-yellow-500 hover:shadow-xl transition text-left"
        >
          <p className="text-yellow-400 text-2xl mb-2">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­</p>
          <p className="font-semibold text-gray-200">Tribe Leader Suite</p>
          <p className="text-gray-400 text-sm">Manage tribes & cohorts</p>
        </button>

      </div>

    </div>
  );
}



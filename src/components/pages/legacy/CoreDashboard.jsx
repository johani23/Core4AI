// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CoreDashboard (MVP-60 Integrated Hybrid Layer)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Combines: Live Stream Dashboard + Beta Analytics Overview
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Two-tab UI: "Live Stream" & "Analytics Overview"
// ============================================================

import { motion } from "framer-motion";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Existing Dashboards
import Dashboard from "@pages/Dashboard";         // MVP-47 (your current)
import BetaDashboard from "@pages/BetaDashboard"; // MVP-60 (bridge overview)

export default function CoreDashboard() {
  const [tab, setTab] = useState("live");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800/40 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI Intelligence Hub
        </h1>

        {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â€šÂ¬ Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="Live Stream"
            active={tab === "live"}
            onClick={() => setTab("live")}
            emoji="ÃƒÂ¢Ã…Â¡Ã‚Â¡"
          />
          <TabButton
            label="Analytics Overview"
            active={tab === "analytics"}
            onClick={() => setTab("analytics")}
            emoji="ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â "
          />
        </div>
      </header>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ Smooth tab transition */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-4"
      >
        {tab === "live" ? <Dashboard /> : <BetaDashboard />}
      </motion.div>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¾ Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800/30">
        Core4.AI Ãƒâ€šÃ‚Â© 2025 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Unified Neural & Analytical Dashboard
      </footer>
    </div>
  );
}

// ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â Tab Button component
function TabButton({ label, active, onClick, emoji }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/60"
      }`}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </button>
  );
}



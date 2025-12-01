// ============================================================
// ðŸ’Ž Core4.AI â€“ CoreDashboard (MVP-60 Integrated Hybrid Layer)
// ------------------------------------------------------------
// âœ… Combines: Live Stream Dashboard + Beta Analytics Overview
// âœ… Two-tab UI: "Live Stream" & "Analytics Overview"
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";

// ðŸ§© Existing Dashboards
import Dashboard from "@pages/Dashboard";         // MVP-47 (your current)
import BetaDashboard from "@pages/BetaDashboard"; // MVP-60 (bridge overview)

export default function CoreDashboard() {
  const [tab, setTab] = useState("live");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* ðŸ§­ Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800/40 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ðŸ’Ž Core4.AI Intelligence Hub
        </h1>

        {/* ðŸ”€ Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="Live Stream"
            active={tab === "live"}
            onClick={() => setTab("live")}
            emoji="âš¡"
          />
          <TabButton
            label="Analytics Overview"
            active={tab === "analytics"}
            onClick={() => setTab("analytics")}
            emoji="ðŸ“Š"
          />
        </div>
      </header>

      {/* ðŸ”„ Smooth tab transition */}
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

      {/* ðŸ§¾ Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800/30">
        Core4.AI Â© 2025 â€“ Unified Neural & Analytical Dashboard
      </footer>
    </div>
  );
}

// ðŸŽšï¸ Tab Button component
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

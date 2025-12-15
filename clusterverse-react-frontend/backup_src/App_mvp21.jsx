// ============================================================
// ðŸ’Ž Core4.AI MVP-21.5 Frontend Router
// Dashboard + Token Market + Navbar Integration
// ============================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// âœ… Core Components
import Navbar from "@components/Navbar";

// âœ… Pages
import Dashboard from "@pages/Dashboard";
import Market from "@pages/Market";   // â¬…ï¸ new page for trading

export default function App_mvp21() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* ðŸ” Global Navigation + Live Token Widget */}
        <Navbar />

        {/* ðŸŽ¬ Smooth Page Transitions */}
        <AnimatePresence mode="wait">
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Market Page (Token Trading Simulation) */}
            <Route path="/market" element={<Market />} />

            {/* Optional Fallback for Future Tabs */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen text-gray-400">
                  ðŸš§ Page under construction (MVP-21.5)
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

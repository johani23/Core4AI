// ============================================================
// 💎 Core4.AI – App.jsx (MVP-27.9 Final Edition)
// Tribe Persistence • Market Pulse • Mood-Reactive NewsTicker
// ============================================================

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// 🧩 Layout Components
import Navbar from "@components/Navbar";
import GlobalPulseTopBar from "@components/GlobalPulseTopBar";
import NewsTicker from "@components/NewsTicker";

// 🧭 Core Pages
import Dashboard from "@pages/Dashboard";
import Feed from "@pages/Feed";
import Leaderboard from "@pages/Leaderboard";
import Spotlight from "@pages/Spotlight";
import Wallet from "@pages/Wallet";
import Groups from "@pages/Groups";
import Challenges from "@pages/Challenges";
import ClusterBoard from "@pages/ClusterBoard";
import Profile from "@pages/Profile";
import Market from "@pages/Market";
import Rewards from "@pages/Rewards";
import ChooseTribe from "@pages/ChooseTribe";
import TribeMarket from "@pages/TribeMarket";
import TribeDashboard from "@pages/TribeDashboard";

// 💹 MVP-27 Additions
import MarketPulse from "@pages/MarketPulse";
import TribeLeaderboard from "@pages/TribeLeaderboard";

import { getUserTribe } from "@services/api";

/* ------------------------------------------------------------
 * ⚙️ Animated Route Wrapper
 * ------------------------------------------------------------ */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="p-4 md:p-6 min-h-[calc(100vh-120px)]"
      >
        <Routes location={location} key={location.pathname}>
          {/* 🏕️ Tribe System */}
          <Route path="/tribe-market" element={<TribeMarket />} />
          <Route path="/tribe/:tribeName" element={<TribeDashboard />} />
          <Route path="/choose-tribe" element={<ChooseTribe />} />

          {/* 🧭 Core Pages */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/spotlight" element={<Spotlight />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/clusterboard" element={<ClusterBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/market" element={<Market />} />

          {/* 💹 Market Pulse + Tribe Leaderboard */}
          <Route path="/market/pulse" element={<MarketPulse />} />
          <Route path="/tribes/leaderboard" element={<TribeLeaderboard />} />

          {/* 🚧 Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------
 * 👤 Session Wrapper – Tribe Persistence
 * ------------------------------------------------------------ */
function SessionWrapper() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userTribe, setUserTribe] = useState(null);

  useEffect(() => {
    async function checkTribe() {
      try {
        const res = await getUserTribe(1);
        const tribe = res?.tribe?.name || "none";
        setUserTribe(tribe);
        localStorage.setItem("user_tribe", tribe);
        if (tribe === "none") navigate("/choose-tribe", { replace: true });
      } catch {
        navigate("/choose-tribe", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    checkTribe();
  }, [navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 text-lg animate-pulse">
        Initializing your Core4.AI world…
      </div>
    );

  if (userTribe === "none") return <ChooseTribe />;

  return (
    <>
      <Navbar />
      <NewsTicker />
      <GlobalPulseTopBar />
      <AnimatedRoutes />
    </>
  );
}

/* ------------------------------------------------------------
 * 🚀 Main App Entry
 * ------------------------------------------------------------ */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        <SessionWrapper />
      </div>
    </Router>
  );
}

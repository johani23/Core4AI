import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Layout
import Navbar from "@components/Navbar";
import GlobalPulseTopBar from "@components/GlobalPulseTopBar";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Contexts
import { CoreSyncProvider } from "@context/CoreSyncContext";
import { CreatorProvider } from "@context/CreatorContext";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Core Pages
import Dashboard from "@pages/Dashboard";
import Feed from "@pages/Feed";
import Leaderboard from "@pages/Leaderboard";
import Groups from "@pages/Groups";
import Challenges from "@pages/Challenges";
import Rewards from "@pages/Rewards";
import Spotlight from "@pages/Spotlight";
import Wallet from "@pages/Wallet";
import Market from "@pages/Market";
import Tribes from "@pages/Tribes";
import AIArena from "@pages/AIArena";
import Council from "@pages/Council";
import Memory from "@pages/Memory";
import SimulationHub from "@pages/SimulationHub";

// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â  Creator / Public
import CreatorProfile from "@pages/CreatorProfile";
import PublicDashboard from "@pages/PublicDashboard";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã¢â‚¬ËœÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â« Mentor Modules
import MentorLeagueBoard from "@pages/MentorLeagueBoard";
import MentorPodium from "@pages/MentorPodium";

// ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â° Celebration
import LevelUpToast from "@components/LevelUpToast";

// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª QA Tools
import FeedTester from "@pages/FeedTester";
import FeedUploader from "@pages/FeedUploader";

// ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Unified Ecosystem Views
import EcosystemDashboard from "@pages/EcosystemDashboard";
import EcosystemLiveWall from "@pages/EcosystemLiveWall";

// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Inner Routing Shell
// ------------------------------------------------------------
const AppContent = () => {
  const location = useLocation();

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">
      <Navbar />
      <GlobalPulseTopBar />

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-4 md:p-6"
        >
          <Routes>
            {/* Core */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/spotlight" element={<Spotlight />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/market" element={<Market />} />

            {/* Advanced Modules */}
            <Route path="/tribes" element={<Tribes />} />
            <Route path="/aiarena" element={<AIArena />} />
            <Route path="/council" element={<Council />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/simulation" element={<SimulationHub />} />

            {/* Unified Ecosystem */}
            <Route path="/ecosystem" element={<EcosystemDashboard />} />
            <Route path="/livewall" element={<EcosystemLiveWall />} />

            {/* Mentor Analytics */}
            <Route path="/mentorboard" element={<MentorLeagueBoard />} />
            <Route path="/podium" element={<MentorPodium />} />

            {/* Creator / Public */}
            <Route path="/creator/:name" element={<CreatorProfile />} />
            <Route path="/public-dashboard" element={<PublicDashboard />} />

            {/* QA / Testing Tools */}
            <Route path="/feed-tester" element={<FeedTester />} />
            <Route path="/feed-uploader" element={<FeedUploader />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <LevelUpToast />
    </div>
  );
};

// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Final Wrapped Export (CreatorProvider + CoreSyncProvider)
// ------------------------------------------------------------
export default function App() {
  return (
    <Router basename="/">
      <CreatorProvider>
        <CoreSyncProvider>
          <AppContent />
        </CoreSyncProvider>
      </CreatorProvider>
    </Router>
  );
}


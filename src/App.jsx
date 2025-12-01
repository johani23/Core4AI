import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Contexts
import { CoreSyncProvider } from "@context/CoreSyncContext";
import { CreatorProvider } from "@context/CreatorContext";
import { InfluenceProvider } from "@context/InfluenceContext";
import { AudienceProvider } from "@context/AudienceContext";

// Main Pages
import Home from "@pages/Home";
import GrowAndEarn from "@pages/GrowAndEarn";
import WalletRewards from "@pages/WalletRewards";
import NetworkPulse from "@pages/NetworkPulse";
import SocialFeed from "@pages/SocialFeed";
import PowerBoard from "@pages/PowerBoard";
import OnboardingTour from "@pages/OnboardingTour";
import ChooseSegment from "@pages/ChooseSegment";

// Role-Based Homes
import CreatorHome from "@pages/creator/CreatorHome";
import BuyerHome from "@/components/pages/buyer/BuyerHome";
import MerchantHome from "@pages/merchant/MerchantHome";

// Buyer Layer — Purchases
import BuyerDashboard from "@/components/pages/buyer/BuyerDashboard";
import BuyerActivity from "@/components/pages/buyer/BuyerActivity";
import BuyerReferrals from "@/components/pages/buyer/BuyerReferrals";
import BuyerClaims from "@/components/pages/buyer/BuyerClaims";
import BuyerRND from "@/components/pages/buyer/BuyerRND";
import BuyerUpgrade from "@/components/pages/buyer/BuyerUpgrade";
import PurchasesList from "@/components/pages/buyer/PurchasesList";
import OrderDetails from "@/components/pages/buyer/OrderDetails";

// Audience Layer
import AudienceHome from "@/components/pages/buyer/AudienceHome";

// Merchant Layer
import AddProductWizard from "@pages/merchant/AddProductWizard";
import CampaignWizard from "@pages/merchant/CampaignWizard";
import InfluencerSelection from "@pages/merchant/InfluencerSelection";
import EarningsCenterArabic from "@pages/merchant/EarningsCenterArabic";
import PricingResult from "@pages/merchant/PricingResult";
import CampaignSummary from "@pages/merchant/CampaignSummary";
import MerchantAnalytics from "@pages/merchant/MerchantAnalytics";

// Onboarding
import Onboarding from "@components/onboarding/Onboarding";

// Hayatik Pages
import HayatikHome from "@components/hayatik/HayatikHome";
import HayatikInterests from "@components/hayatik/HayatikInterests";
import HayatikShoppingPicks from "@components/hayatik/HayatikShoppingPicks";
import HayatikSettings from "@components/hayatik/HayatikSettings";

// Shared UI
import CoreMentorPanel from "@components/CoreMentorPanel";
import FloatingCreateButton from "@components/FloatingCreateButton";

// ============================================================================
// Navigation Tabs
// ============================================================================

const tabs = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/hayatik", label: "حياتك", icon: "💚" },
  { path: "/grow", label: "Grow", icon: "🚀" },
  { path: "/buyer/home", label: "Purchases", icon: "🛒", roles: ["buyer"] },
  { path: "/audience", label: "Audience", icon: "🎧", roles: ["buyer"] },
  { path: "/merchant", label: "Offers", icon: "🏪" },
  { path: "/feed", label: "Feed", icon: "🎥" },
  { path: "/powerboard", label: "PowerBoard", icon: "💹" },
  { path: "/wallet", label: "Wallet", icon: "💰" },
  { path: "/pulse", label: "Pulse", icon: "🌐" },
  { path: "/role", label: "Role", icon: "🎭" },
];

// ============================================================================
// D-Pulse Indicator
// ============================================================================

function DPulse() {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="flex items-center gap-1 text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded-full border border-purple-700 shadow-sm"
    >
      <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
      D-Index 72.5
    </motion.div>
  );
}

// ============================================================================
// AppContent
// ============================================================================

function AppContent() {
  const location = useLocation();
  const { role } = useCoreSync();

  const filteredTabs = tabs.filter(
    (t) => !t.roles || t.roles.includes(role)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-3 border-b border-gray-800 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="text-xl font-extrabold text-purple-400 tracking-wide">
          Core4.AI
        </div>

        <div className="hidden md:flex gap-6">
          {filteredTabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm font-semibold transition-all ${
                  isActive
                    ? "text-purple-400 border-b-2 border-purple-400 pb-1"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              {t.icon}
              {t.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <DPulse />
          <button
            onClick={() => (window.location.href = "/tour")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 transition-all"
          >
            🔮 Guide Me
          </button>
        </div>
      </nav>

      {/* ROUTES */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <Routes>
              {/* ROLE-BASED HOME */}
              <Route
                path="/"
                element={
                  role === "creator" ? (
                    <CreatorHome />
                  ) : role === "buyer" ? (
                    <BuyerHome />
                  ) : role === "merchant" ? (
                    <MerchantHome />
                  ) : (
                    <ChooseSegment />
                  )
                }
              />
              {/* Other routes for Buyer, Merchant, and Creator */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-600 py-3 border-t border-gray-800">
        © {new Date().getFullYear()} Core4.AI — Empowering the Influence Economy
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/">
      <CreatorProvider>
        <CoreSyncProvider>
          <AppContent />
          <CoreMentorPanel />
          <FloatingCreateButton />

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "0.9rem",
              },
            }}
          />
        </CoreSyncProvider>
      </CreatorProvider>
    </Router>
  );
}

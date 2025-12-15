import { Routes, Route, Navigate } from "react-router-dom";

import InfluenceTabs from "@/components/influence/InfluenceTabs";

import InfluenceHome from "@/components/influence/InfluenceHome";
import InfluenceAnalytics from "@/components/influence/InfluenceAnalytics";
import InfluenceDeals from "@/components/influence/InfluenceDeals";
import InfluenceMissions from "@/components/influence/InfluenceMissions";
import InfluenceShop from "@/components/influence/InfluenceShop";
import InfluenceWallet from "@/components/influence/InfluenceWallet";
import InfluenceLeaderboard from "@/components/influence/InfluenceLeaderboard";

export default function InfluenceRouter() {
  return (
    <div className="text-white" dir="rtl">
      <InfluenceTabs />

      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<InfluenceHome />} />
        <Route path="analytics" element={<InfluenceAnalytics />} />
        <Route path="deals" element={<InfluenceDeals />} />
        <Route path="missions" element={<InfluenceMissions />} />
        <Route path="shop" element={<InfluenceShop />} />
        <Route path="wallet" element={<InfluenceWallet />} />
        <Route path="leaderboard" element={<InfluenceLeaderboard />} />
      </Routes>
    </div>
  );
}

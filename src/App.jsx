// ============================================================================
// 💎 Core4.AI – App.jsx (MASTER ROUTER v2025 — Noor + Sama Edition)
// Production-Ready — Clean — Organized — Full Merchant Suite Routes
// ============================================================================

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import CoreLayout from "@/components/layout/CoreLayout.jsx";
import MerchantLayout from "@/components/pages/merchant/MerchantLayout.jsx";

// GENERAL
import ChooseSegment from "@/components/pages/ChooseSegment";
import SocialFeed from "@/components/pages/SocialFeed";
import GrowAndEarn from "@/components/pages/GrowAndEarn";
import WalletRewards from "@/components/pages/WalletRewards";
import NetworkPulse from "@/components/pages/NetworkPulse";
import PowerBoard from "@/components/pages/PowerBoard";

// BUYER
import BuyerFeed from "@/components/pages/buyer/BuyerFeed";
import BuyerWishlist from "@/components/pages/buyer/BuyerWishlist";
import BuyerClaims from "@/components/pages/buyer/BuyerClaims";
import BuyerTracking from "@/components/pages/buyer/BuyerTracking";
import BuyerReferrals from "@/components/pages/buyer/BuyerReferrals";
import BuyerUpgrade from "@/components/pages/buyer/BuyerUpgrade";
import BuyerFeatureReview from "@/components/pages/buyer/BuyerFeatureReview";
import BuyerRND from "@/components/pages/buyer/BuyerRND";
import BuyerDashboard from "@/components/pages/buyer/BuyerDashboard";
import BuyerActivity from "@/components/pages/buyer/BuyerActivity";
import PurchasesList from "@/components/pages/buyer/PurchasesList";
import OrderDetails from "@/components/pages/buyer/OrderDetails";
import BuyerProduct from "@/components/pages/buyer/BuyerProduct";
import BuyerCheckout from "@/components/pages/buyer/BuyerCheckout";
import BuyerSuccess from "@/components/pages/buyer/BuyerSuccess";




// CREATOR
import CreatorHome from "@/components/pages/creator/CreatorHome";
import CreatorFeed from "@/components/pages/creator/CreatorFeed";
import CreatorAnalytics from "@/components/pages/creator/CreatorAnalytics";

// TRIBE
import TribeHome from "@/components/pages/tribe/TribeHome";
import TribeDashboard from "@/components/pages/tribe/TribeDashboard";

// MERCHANT — FULL PAGES ONLY (No Panels)
import MerchantDashboard from "@/components/pages/merchant/MerchantDashboard";
import ProductCenter from "@/components/pages/merchant/ProductCenter";
import AddProductWizard from "@/components/pages/merchant/AddProductWizard";
import PricingCenter from "@/components/pages/merchant/PricingCenter";
import PricingRedirect from "@/components/pages/merchant/PricingRedirect";
import CreativeCenter from "@/components/pages/merchant/CreativeCenter";
import CampaignCenter from "@/components/pages/merchant/CampaignCenter";
import CampaignBuilder from "@/components/pages/merchant/CampaignBuilder";
import CampaignSummary from "@/components/pages/merchant/CampaignSummary";
import InfluencerSelection from "@/components/pages/merchant/InfluencerSelection";
import OfferCenter from "@/components/pages/merchant/OfferCenter";
import EarningsCenter from "@/components/pages/merchant/EarningsCenter";
import AnalyticsCenter from "@/components/pages/merchant/AnalyticsCenter";
import MITMarketInsights from "@/components/pages/merchant/MITMarketInsights";
import DemandSignals from "@/components/pages/merchant/DemandSignals";


export default function App() {
  return (
    <Routes>

      {/* GENERAL */}
      <Route
        path="/"
        element={
          <CoreLayout>
            <ChooseSegment />
          </CoreLayout>
        }
      />

      <Route path="/feed" element={<CoreLayout><SocialFeed /></CoreLayout>} />
      <Route path="/grow" element={<CoreLayout><GrowAndEarn /></CoreLayout>} />
      <Route path="/wallet" element={<CoreLayout><WalletRewards /></CoreLayout>} />
      <Route path="/pulse" element={<CoreLayout><NetworkPulse /></CoreLayout>} />
      <Route path="/powerboard" element={<CoreLayout><PowerBoard /></CoreLayout>} />

            {/* BUYER */}
	<Route path="/buyer/feed" element={<CoreLayout><BuyerFeed /></CoreLayout>} />
	<Route path="/buyer/dashboard" element={<CoreLayout><BuyerDashboard /></CoreLayout>} />
	<Route path="/buyer/activity" element={<CoreLayout><BuyerActivity /></CoreLayout>} />
	<Route path="/buyer/orders" element={<CoreLayout><PurchasesList /></CoreLayout>} />
	<Route path="/buyer/order/:id" element={<CoreLayout><OrderDetails /></CoreLayout>} />
	<Route path="/buyer/product/:id" element={<CoreLayout><BuyerProduct /></CoreLayout>} />
	<Route path="/buyer/checkout/:id" element={<CoreLayout><BuyerCheckout /></CoreLayout>} />
	<Route path="/buyer/success" element={<CoreLayout><BuyerSuccess /></CoreLayout>} />

{/* 🔒 FINAL MISSING BUYER ROUTES */}
	<Route path="/buyer/wishlist" element={<CoreLayout><BuyerWishlist /></CoreLayout>} />
	<Route path="/buyer/claims" element={<CoreLayout><BuyerClaims /></CoreLayout>} />
	<Route path="/buyer/tracking/:id" element={<CoreLayout><BuyerTracking /></CoreLayout>} />
	<Route path="/buyer/referrals" element={<CoreLayout><BuyerReferrals /></CoreLayout>} />
	<Route path="/buyer/upgrade" element={<CoreLayout><BuyerUpgrade /></CoreLayout>} />
	<Route path="/buyer/feature-review/:id" element={<CoreLayout><BuyerFeatureReview /></CoreLayout>} />
<Route path="/buyer/rnd" element={<CoreLayout><BuyerRND /></CoreLayout>} />

      {/* CREATOR */}
      <Route path="/creator" element={<CoreLayout><CreatorHome /></CoreLayout>} />
      <Route path="/creator/feed" element={<CoreLayout><CreatorFeed /></CoreLayout>} />
      <Route path="/creator/analytics" element={<CoreLayout><CreatorAnalytics /></CoreLayout>} />

      {/* TRIBE */}
      <Route path="/tribe" element={<CoreLayout><TribeHome /></CoreLayout>} />
      <Route path="/tribe/dashboard" element={<CoreLayout><TribeDashboard /></CoreLayout>} />

      {/* MERCHANT — FULL SUITE */}
      <Route path="/merchant/*" element={<MerchantLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<MerchantDashboard />} />
        <Route path="products" element={<ProductCenter />} />
        <Route path="add-product" element={<AddProductWizard />} />

        <Route path="pricing" element={<PricingRedirect />} />
        <Route path="pricing/:productId" element={<PricingCenter />} />

        <Route path="creative" element={<CreativeCenter />} />

        <Route path="campaigns" element={<CampaignCenter />} />
        <Route path="campaign" element={<CampaignBuilder />} />
        <Route path="campaign-summary" element={<CampaignSummary />} />

        <Route path="influencers" element={<InfluencerSelection />} />

        <Route path="offers" element={<OfferCenter />} />

        <Route path="earnings" element={<EarningsCenter />} />

        <Route path="analytics" element={<AnalyticsCenter />} />

        <Route path="market-insights/:id" element={<MITMarketInsights />} />
        <Route path="demand-signals" element={<DemandSignals />} />

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

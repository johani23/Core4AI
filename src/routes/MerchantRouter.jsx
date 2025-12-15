// ============================================================================
// 💚 Core4.AI – MerchantRouter (Shopify Light Layout)
// FINAL — React Router v6 SAFE
// - Clean pricing flow (Redirect → Product)
// - Clean MIT flow (Index Redirect → Product)
// ============================================================================

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import MerchantLayout from "@/components/pages/merchant/MerchantLayout";

// Core Pages
import MerchantDashboard from "@/components/pages/merchant/MerchantDashboard";
import ProductCenter from "@/components/pages/merchant/ProductCenter";
import AddProductWizard from "@/components/pages/merchant/AddProductWizard";

// Pricing
import PricingCenter from "@/components/pages/merchant/PricingCenter";
import PricingRedirect from "@/components/pages/merchant/PricingRedirect";

// MIT
import MITMarketInsights from "@/components/pages/merchant/MITMarketInsights";
import MarketInsightsRedirect from "@/components/pages/merchant/MarketInsightsRedirect";

// Other Merchant Tools
import CreativeCenter from "@/components/pages/merchant/CreativeCenter";
import CampaignCenter from "@/components/pages/merchant/CampaignCenter";
import CampaignBuilder from "@/components/pages/merchant/CampaignBuilder";
import CampaignSummary from "@/components/pages/merchant/CampaignSummary";
import InfluencerSelection from "@/components/pages/merchant/InfluencerSelection";
import EarningsCenter from "@/components/pages/merchant/EarningsCenter";
import OfferCenter from "@/components/pages/merchant/OfferCenter";
import AnalyticsCenter from "@/components/pages/merchant/AnalyticsCenter";

export default function MerchantRouter() {
  return (
    <MerchantLayout>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="dashboard" />} />

        {/* Core */}
        <Route path="dashboard" element={<MerchantDashboard />} />
        <Route path="products" element={<ProductCenter />} />
        <Route path="add-product" element={<AddProductWizard />} />

        {/* Pricing (SAFE FLOW) */}
        <Route path="pricing" element={<PricingRedirect />} />
        <Route path="pricing/:productId" element={<PricingCenter />} />

        {/* MIT Market Insights (FIXED — WITH OUTLET) */}
        <Route path="market-insights" element={<Outlet />}>
          <Route index element={<MarketInsightsRedirect />} />
          <Route path=":id" element={<MITMarketInsights />} />
        </Route>

        {/* Other Merchant Tools */}
        <Route path="creative" element={<CreativeCenter />} />
        <Route path="campaigns" element={<CampaignCenter />} />
        <Route path="campaign" element={<CampaignBuilder />} />
        <Route path="campaign-summary" element={<CampaignSummary />} />
        <Route path="influencers" element={<InfluencerSelection />} />
        <Route path="earnings" element={<EarningsCenter />} />
        <Route path="offers" element={<OfferCenter />} />
        <Route path="analytics" element={<AnalyticsCenter />} />

      </Routes>
    </MerchantLayout>
  );
}

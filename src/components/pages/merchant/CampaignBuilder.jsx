// ============================================================================
// ðŸ’š CampaignBuilder.jsx (v11.0 â€“ FINAL WITH MIT PRICING ENGINE INTEGRATION)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ===== IMPORTS =====
import ProductIQSection from "./sections/ProductIQSection";
import MerchantPricingDashboard from "./sections/MerchantPricingDashboard";
import CompetitorHeatmap from "./sections/CompetitorHeatmap";
import CreativeStudioSection from "./sections/CreativeStudioSection";
import UnifiedPricing from "@/components/pricing/UnifiedPricing";


import PricingPanel from "@/components/pricing/PricingPanel";

import MerchantReadiness from "./sections/MerchantReadiness";
import MerchantNarrative from "./sections/MerchantNarrative";
import CampaignQualityScore from "./sections/CampaignQualityScore";
import CampaignSuccessProbability from "./sections/CampaignSuccessProbability";
import CampaignBudgetOptimizer from "./sections/CampaignBudgetOptimizer";
import CampaignFunnelProjection from "./sections/CampaignFunnelProjection";

export default function CampaignBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);

  // sections data
  const [iq, setIQ] = useState(null);
  const [merchantIntel, setMerchantIntel] = useState(null);
  const [creative, setCreative] = useState(null);
  const [dynamicDiscount, setDynamicDiscount] = useState(0);

  // ========================================================================
  // FIX: Read product from state â†’ session â†’ query â†’ fallback
  // ========================================================================
  useEffect(() => {
    let p = null;

    if (location.state?.product) p = location.state.product;

    if (!p) {
      const saved = sessionStorage.getItem("selected_product");
      if (saved) {
        try {
          p = JSON.parse(saved);
        } catch {}
      }
    }

    if (!p) {
      const params = new URLSearchParams(location.search);
      const raw = params.get("product");
      if (raw) {
        try {
          p = JSON.parse(raw);
        } catch {}
      }
    }

    if (!p) {
      const params = new URLSearchParams(location.search);
      const pid = params.get("product_id");
      if (pid) p = { product_id: pid, name: "Ù…Ù†ØªØ¬", price: 0, features: [] };
    }

    if (p) {
      setProduct(p);
      sessionStorage.setItem("selected_product", JSON.stringify(p));
      return;
    }

    navigate("/merchant/products/list");
  }, [location, navigate]);

  // ========================================================================
  // UI Loading guard
  // ========================================================================
  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        â³ Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬â€¦
      </div>
    );
  }

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  // ========================================================================
  // UI
  // ========================================================================
  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* HEADER */}
      <div className="border rounded-xl p-5 mb-6 bg-white shadow-sm">
        <h1 className="text-2xl font-extrabold text-green-700">ðŸ“¦ {product.name}</h1>
        <p className="text-gray-500 mt-1">Ù…Ù†ØµØ© Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø­Ù…Ù„Ø© Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©</p>
      </div>

      {/* ===== IQ SECTION ===== */}
      <ProductIQSection product={product} onLoaded={setIQ} />

      {/* WAIT FOR IQ */}
      {iq && (
      <>
       <UnifiedPricing productId={product.product_id} />

     <PricingPanel
      product={product}
      onDiscount={setDynamicDiscount}
      />


          {/* ===== PRICING (LEGACY INTEL + OUTPUTS) ===== */}
          <MerchantPricingDashboard
            product={product}
            productIQ={iq}
            appliedDiscount={dynamicDiscount}
            onLoaded={setMerchantIntel}
          />

          {/* ===== HEATMAP ===== */}
          <CompetitorHeatmap product={product} productIQ={iq} />

          {/* ===== CREATIVE (ENABLED) ===== */}
          <CreativeStudioSection
            product={product}
            onLoaded={setCreative}
          />

          {/* ===== READINESS ===== */}
          <MerchantReadiness
            product={product}
            productIQ={iq}
            merchantIntel={merchantIntel}
          />

          {/* ===== NARRATIVE ===== */}
          <MerchantNarrative product={product} />

          {/* ===== QUALITY ===== */}
          <CampaignQualityScore
            productIQ={iq}
            merchantIntel={merchantIntel}
          />

          {/* ===== SUCCESS PROB ===== */}
          <CampaignSuccessProbability
            productIQ={iq}
            merchantIntel={merchantIntel}
          />

          {/* ===== BUDGET OPTIMIZER ===== */}
          <CampaignBudgetOptimizer
            productIQ={iq}
            merchantIntel={merchantIntel}
            appliedDiscount={dynamicDiscount}
          />

          {/* ===== FUNNEL ===== */}
          <CampaignFunnelProjection
            productIQ={iq}
            merchantIntel={merchantIntel}
            appliedDiscount={dynamicDiscount}
          />

        </>
      )}

    </div>
  );
}

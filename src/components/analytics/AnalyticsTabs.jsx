// ============================================================================
// ðŸ’š AnalyticsTabs.jsx â€” v22 ML Edition (Clean + Unified)
// ============================================================================

import React, { useState, useEffect } from "react";
import PricingIntelligence from "../merchant/PricingIntelligence";
import { useSearchParams } from "react-router-dom";

export default function AnalyticsTabs() {
  const [search] = useSearchParams();
  const productId = search.get("product") || null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Pricing Analytics (ML v22)
      </h1>

      {!productId ? (
        <p className="text-gray-400 text-lg">
          Select a product to view ML Pricing Intelligence.
        </p>
      ) : (
        <PricingIntelligence productId={productId} />
      )}
    </div>
  );
}

// ============================================================================
// ðŸ’š Core4.AI â€“ PricingCenter.jsx (v13 â€œMIT Pricing Suiteâ€)
// ----------------------------------------------------------------------------
// Includes:
// â€¢ Product Picker
// â€¢ Pricing Overview
// â€¢ Pricing Breakdown
// â€¢ Elasticity Panel
// â€¢ Demand Curve
// â€¢ EVC Calculator
// â€¢ Recommended Price Box
// ============================================================================

import React, { useEffect, useState } from "react";

import PricingOverview from "@/components/pricing/PricingOverview";
import PricingBreakdown from "@/components/pricing/PricingBreakdown";
import ElasticityPanel from "@/components/pricing/ElasticityPanel";
import EVCCalculator from "@/components/pricing/EVCCalculator";
import DemandCurve from "@/components/pricing/DemandCurve";
import RecommendedPriceBox from "@/components/pricing/RecommendedPriceBox";

export default function PricingCenter() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // ------------------------------------------------------------
  // Demo product list â€” replace with backend later
  // ------------------------------------------------------------
  useEffect(() => {
    const list = [
      { id: 1, name: "Wireless Earbuds", price: 129 },
      { id: 2, name: "Smart Watch X", price: 299 },
      { id: 3, name: "Premium Backpack", price: 52 },
    ];
    setProducts(list);
    setSelected(list[0]);
  }, []);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Pricing Intelligence</h1>
        <p className="text-gray-500 mt-1">
          MIT pricing suite powered by elasticity, EVC, demand modeling, and value metrics.
        </p>
      </div>

      {/* PRODUCT PICKER */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Select a Product</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelected(product)}
              className={`px-4 py-2 rounded-lg border ${
                selected?.id === product.id
                  ? "bg-green-600 text-white border-green-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <>
          {/* OVERVIEW + BREAKDOWN */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <PricingOverview product={selected} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <PricingBreakdown product={selected} />
            </div>
          </div>

          {/* ELASTICITY + DEMAND CURVE */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <ElasticityPanel product={selected} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <DemandCurve product={selected} />
            </div>
          </div>

          {/* EVC CALCULATOR */}
          <div className="bg-white p-6 rounded-xl shadow">
            <EVCCalculator product={selected} />
          </div>

          {/* FINAL RECOMMENDED PRICE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <RecommendedPriceBox product={selected} />
          </div>
        </>
      )}
    </div>
  );
}

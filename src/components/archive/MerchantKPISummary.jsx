// ============================================================
// ðŸ’Ž Core4.AI â€“ MerchantKPISummary.jsx (v1.0 â€œStub Componentâ€)
// ------------------------------------------------------------
// âœ… Prevents import errors in MerchantIntelligenceHub
// âœ… Displays top merchant KPIs placeholder
// ============================================================

import React from "react";

export default function MerchantKPISummary() {
  return (
    <div className="bg-[#1f2937] border border-gray-700 rounded-xl p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-300 mb-2">
        Merchant KPI Summary
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-400">
        <div>
          <div className="text-xl font-bold text-green-400">82%</div>
          <div>Avg Conversion</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-400">$12,480</div>
          <div>Total Sales</div>
        </div>
        <div>
          <div className="text-xl font-bold text-purple-400">Fashionists</div>
          <div>Top Tribe</div>
        </div>
      </div>
    </div>
  );
}

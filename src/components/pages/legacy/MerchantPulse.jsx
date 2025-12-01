// ============================================================
// ðŸ’Ž Core4.AI â€“ MerchantPulse.jsx
// ------------------------------------------------------------
// âœ… Live merchant transactions feed
// ============================================================

import React, { useState, useEffect } from "react";
import { useCoreSync } from "@context/CoreSyncContext";

export default function MerchantPulse() {
  const { merchantFeed = [] } = useCoreSync();

  return (
    <div className="p-6 bg-gray-50 rounded-2xl">
      <h2 className="text-lg font-semibold mb-3">ðŸ›ï¸ Merchant Transactions</h2>
      <div className="space-y-2 max-h-64 overflow-auto">
        {merchantFeed.map((tx, i) => (
          <div key={i} className="border-b pb-1 text-sm">
            <b>{tx.merchant}</b> â†’ {tx.tribe} â€¢ 
            <span className="text-emerald-600">
              {tx.sale} SAR (+{tx.commission.toFixed(1)} comm.)
            </span>
            <br />
            <span className="opacity-70">Campaign: {tx.campaign}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

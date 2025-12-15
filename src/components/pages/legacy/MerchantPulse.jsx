// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantPulse.jsx
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Live merchant transactions feed
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";

export default function MerchantPulse() {
  const { merchantFeed = [] } = useCoreSync();

  return (
    <div className="p-6 bg-gray-50 rounded-2xl">
      <h2 className="text-lg font-semibold mb-3">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â Merchant Transactions</h2>
      <div className="space-y-2 max-h-64 overflow-auto">
        {merchantFeed.map((tx, i) => (
          <div key={i} className="border-b pb-1 text-sm">
            <b>{tx.merchant}</b> ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ {tx.tribe} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ 
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



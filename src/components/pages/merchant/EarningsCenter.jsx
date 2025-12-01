// ============================================================================
// ðŸ’š Core4.AI â€“ EarningsCenter.jsx (v4 â€œCommission Engineâ€)
// ----------------------------------------------------------------------------
// Displays merchant revenue, influencer payouts, weekly earnings chart,
// and commission structure.
// ============================================================================

import React, { useState, useEffect } from "react";
import { BanknotesIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function EarningsCenter() {
  const [earnings, setEarnings] = useState([]);
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    // Mock data
    setEarnings([
      { id: 1, week: "Week 1", amount: 1250 },
      { id: 2, week: "Week 2", amount: 1480 },
      { id: 3, week: "Week 3", amount: 1620 },
      { id: 4, week: "Week 4", amount: 1980 },
    ]);

    setCommissions([
      { influencer: "LinaFit", payout: 420 },
      { influencer: "TechGuru", payout: 310 },
      { influencer: "MashaelBeauty", payout: 190 },
    ]);
  }, []);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Earnings Center</h1>
        <p className="text-gray-500 mt-1">
          Track weekly revenue and influencer commission payouts.
        </p>
      </div>

      {/* REVENUE BLOCK */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BanknotesIcon className="w-6 h-6 text-green-600" />
          Weekly Revenue Snapshot
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {earnings.map((e) => (
            <div
              key={e.id}
              className="bg-gray-50 p-4 rounded-lg border text-center space-y-2"
            >
              <p className="text-xs text-gray-500">{e.week}</p>
              <p className="text-xl font-bold text-green-700">${e.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMMISSIONS BLOCK */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <UserGroupIcon className="w-6 h-6 text-purple-600" />
          Influencer Payouts
        </h2>

        <div className="space-y-2">
          {commissions.map((c, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center"
            >
              <p className="text-gray-700 font-semibold">{c.influencer}</p>
              <p className="text-green-600 font-bold">${c.payout}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

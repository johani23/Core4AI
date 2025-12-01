// ============================================================================
// ðŸ’š CampaignBreakEven.jsx (Phase 19 â€“ Break-Even Calculator)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignBreakEven({ product, budget }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/breakeven", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_price: product.price,
        budget: budget
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && budget !== null) load();
  }, [product, budget]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Break-Even</p>
      </div>
    );

  if (data.break_even_units === null)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-500">âš ï¸ Cannot calculate break-even.</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ“‰ Break-Even Point
      </h2>

      <div className="space-y-4 text-gray-800">

        <p>
          <strong>Units Needed:</strong> {data.break_even_units} ÙˆØ­Ø¯Ø©
        </p>

        <div className="p-4 bg-green-50 border rounded text-center">
          <p className="text-gray-600 text-sm">
            Number of units needed to recover the budget.
          </p>
        </div>

      </div>

    </div>
  );
}

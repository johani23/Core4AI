import React, { useState, useEffect } from "react";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function PromoterCommissionPanel() {
  const { wsData } = useCoreSync();
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    if (!wsData) return;

    if (wsData.type === "commission_event") {
      setEarnings(wsData.total_promoter_earnings);
    }
  }, [wsData]);

  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white">
      <h2 className="text-2xl font-bold">ðŸ’° Your Earnings</h2>
      <p className="text-green-300 text-4xl mt-2">
        {earnings.toFixed(2)} SAR
      </p>
    </div>
  );
}

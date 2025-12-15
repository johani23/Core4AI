import React, { useEffect, useState } from "react";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function SubTribeCommission() {
  const { wsData } = useCoreSync();
  const [subtribe, setSubtribe] = useState(0);

  useEffect(() => {
    if (!wsData) return;

    if (wsData.type === "subtribe_commission_update") {
      setSubtribe(wsData.amount);
    }
  }, [wsData]);

  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white">
      <h2 className="text-xl font-bold">ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Sub-Tribe Earnings</h2>
      <p className="text-purple-300 text-3xl mt-2">
        {subtribe.toFixed(2)} SAR
      </p>
    </div>
  );
}


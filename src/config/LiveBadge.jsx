// ============================================================
// Ã°Å¸â€™Å¡ Core4.AI Ã¢â‚¬â€œ LiveBadge.jsx (v2 Ã¢â‚¬Å“Role-Aware BadgesÃ¢â‚¬Â)
// ------------------------------------------------------------
// 100% FIXED: Component exports correctly
// Compatible with AppTabs.jsx
// ============================================================

import React from "react";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function LiveBadge({ type }) {
  const { dindex, campaigns, xp } = useCoreSync();

  // Ã°Å¸â€œÅ’ D-Index Badge
  if (type === "dindex") {
    const color =
      dindex >= 70 ? "bg-green-500" : dindex >= 50 ? "bg-yellow-500" : "bg-red-500";

    return (
      <span className={`ml-1 px-1.5 py-[1px] rounded-full text-[10px] font-bold ${color} text-black`}>
        {Math.round(dindex)}
      </span>
    );
  }

  // Ã°Å¸â€œÅ’ Campaign Count Badge (Merchant / Promoter)
  if (type === "campaigns") {
    const count = campaigns?.length ?? 0;
    return (
      <span className="ml-1 bg-purple-500 text-black text-[10px] px-1.5 py-[1px] rounded-full font-bold">
        {count}
      </span>
    );
  }

  // Ã°Å¸â€œÅ’ XP Badge (Creators / Buyers)
  if (type === "xp") {
    return (
      <span className="ml-1 bg-amber-400 text-black text-[10px] px-1.5 py-[1px] rounded-full font-bold">
        {xp ?? 0}
      </span>
    );
  }

  return null;
}


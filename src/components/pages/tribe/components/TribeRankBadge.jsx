// ============================================================================
// 💚 Core4.AI – TribeRankBadge.jsx (MVP v1)
// ----------------------------------------------------------------------------
// Beautiful rank badge for Tribe Layer
// Connected directly to TribeContext
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeRankBadge() {
  const { rank } = useTribe();

  const styles = {
    Wanderer: "bg-gray-700 text-gray-200 border-gray-500",
    Pathfinder: "bg-blue-700 text-blue-100 border-blue-500",
    Scout: "bg-green-700 text-green-100 border-green-500",
    Leader: "bg-purple-700 text-purple-100 border-purple-500",
    Council: "bg-yellow-600 text-black border-yellow-400",
  };

  const badgeStyle = styles[rank] || styles.Wanderer;

  return (
    <div
      className={`inline-block px-4 py-2 rounded-xl border font-bold text-sm ${badgeStyle}`}
      dir="rtl"
    >
      {rank}
    </div>
  );
}

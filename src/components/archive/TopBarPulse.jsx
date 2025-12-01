// ============================================================
// ðŸ’Ž Core4.AI â€“ TopBarPulse.jsx (v142 â€œGlobal Heartbeat Componentâ€)
// ------------------------------------------------------------
// âœ… Shows global WS status, ping latency, and D-index
// âœ… Uses CoreSyncContext v140
// âœ… Reusable across all pages
// ============================================================

import React from "react";
import { useCoreSync } from "@context/CoreSyncContext";

export default function TopBarPulse() {
  const { backendStatus, latency, council } = useCoreSync();

  const color =
    backendStatus === "online"
      ? "bg-green-500"
      : backendStatus === "offline"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div className="flex justify-between items-center w-full px-6 py-2 border-b border-gray-800 bg-gray-950/60 backdrop-blur-md">
      <h1 className="text-sm font-semibold text-purple-400 tracking-wide">
        âš¡ Core4.AI Live System Monitor
      </h1>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className={`w-3 h-3 rounded-full ${color} animate-pulse`} />
        <span>
          WS: {backendStatus.toUpperCase()} â€¢ Ping {latency ?? "--"} â€¢ D-Index{" "}
          <span className="text-pink-400 font-semibold">
            {council.dindex?.toFixed(2)}%
          </span>
        </span>
      </div>
    </div>
  );
}

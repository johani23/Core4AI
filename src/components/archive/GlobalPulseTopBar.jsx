// ============================================================
// ðŸ’Ž Core4.AI â€“ GlobalPulseTopBar.jsx (v4.5 â€œLive Status Badgeâ€)
// ------------------------------------------------------------
// âœ… Displays D-Index + WS connection status
// âœ… Syncs color with backendStatus from CoreSyncContext
// ============================================================

import React from "react";
import { useCoreSync } from "@context/CoreSyncContext";
import { Wifi, WifiOff } from "lucide-react";

export default function GlobalPulseTopBar() {
  const { council = {}, backendStatus, latency } = useCoreSync();
  const isOnline = backendStatus === "online";

  return (
    <div className="flex items-center gap-3 bg-[#0b0b15]/80 px-4 py-2 rounded-xl border border-gray-800 text-sm font-medium text-white select-none">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">D-Index</span>
        <span className="text-yellow-400 font-bold">
          {council?.dindex?.toFixed?.(1) ?? "â€”"}
        </span>
      </div>

      {/* ðŸŸ¢ Live WS indicator */}
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${
          isOnline
            ? "bg-green-600/30 border-green-500/40 text-green-300"
            : "bg-red-600/30 border-red-500/40 text-red-300"
        }`}
      >
        {isOnline ? (
          <Wifi size={14} className="opacity-80" />
        ) : (
          <WifiOff size={14} className="opacity-80" />
        )}
        <span className="text-xs">{isOnline ? "ONLINE" : "OFFLINE"}</span>
      </div>

      {/* Optional latency display */}
      <div className="text-[11px] text-gray-500 italic">
        {latency !== "--" ? `Latency ${latency}` : ""}
      </div>
    </div>
  );
}

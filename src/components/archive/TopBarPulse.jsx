// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TopBarPulse.jsx (v142 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œGlobal Heartbeat ComponentÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows global WS status, ping latency, and D-index
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Uses CoreSyncContext v140
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Reusable across all pages
// ============================================================

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
        ÃƒÂ¢Ã…Â¡Ã‚Â¡ Core4.AI Live System Monitor
      </h1>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className={`w-3 h-3 rounded-full ${color} animate-pulse`} />
        <span>
          WS: {backendStatus.toUpperCase()} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Ping {latency ?? "--"} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ D-Index{" "}
          <span className="text-pink-400 font-semibold">
            {council.dindex?.toFixed(2)}%
          </span>
        </span>
      </div>
    </div>
  );
}



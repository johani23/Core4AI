// ============================================================================
// 💚 Core4.AI – Attribution Engine (Stable Edition)
// ----------------------------------------------------------------------------
// Provides:
//  - logs
//  - addLog()
//  - getRevenueByMember()
//  - getRevenueByStage()  ← NEW (required by FunnelHeatmap)
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const AttributionContext = createContext();
export const useAttribution = () => useContext(AttributionContext);

export function AttributionProvider({ children }) {
  const [logs, setLogs] = useState([
    // SAMPLE FORMAT:
    // { memberId: 1, amount: 120, funnelStage: "conversion" }
  ]);

  function addLog(entry) {
    setLogs(prev => [...prev, entry]);
  }

  function getRevenueByMember(memberId) {
    return logs
      .filter(l => l.memberId === memberId)
      .reduce((sum, l) => sum + (l.amount || 0), 0);
  }

  function getRevenueByStage(stage) {
    return logs
      .filter(l => l.funnelStage === stage)
      .reduce((sum, l) => sum + (l.amount || 0), 0);
  }

  return (
    <AttributionContext.Provider
      value={{
        logs,
        addLog,
        getRevenueByMember,
        getRevenueByStage,   // ⭐ required for FunnelHeatmap
      }}
    >
      {children}
    </AttributionContext.Provider>
  );
}

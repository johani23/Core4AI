// ============================================================
// 💎 Core4.AI – useBridgeData (v60 Integration Adapter)
// ------------------------------------------------------------
// ✅ Fetches unified bridge data from backend (/api/bridge)
// ✅ Provides auto-refresh every 10s + loading state
// ✅ Outputs ready-to-use values for Tribes, Creators, Arena, Global Stats
// ============================================================

import { useEffect, useState, useRef } from "react";

export default function useBridgeData(refreshInterval = 10000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // 🔁 Fetch Bridge Data
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/bridge");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("[Core4.AI Bridge] Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // 🚀 Auto-fetch on mount + periodic refresh
  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalRef.current);
  }, [refreshInterval]);

  // 🧩 Extract useful subsets
  const tribes = data?.tribes || [];
  const creators = data?.creators || [];
  const arena = data?.arena || {};
  const globalStats = data?.global || {};

  return {
    data,
    tribes,
    creators,
    arena,
    globalStats,
    loading,
    error,
    refresh: fetchData,
  };
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUnifiedStats } from "../data/dataSync";

const UnifiedContext = createContext();

export function UnifiedProvider({ children }) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function loadStats() {
      const res = await getUnifiedStats();
      setStats(res.data);
    }
    loadStats();
  }, []);

  return (
    <UnifiedContext.Provider value={{ stats }}>
      {children}
    </UnifiedContext.Provider>
  );
}

export const useUnified = () => useContext(UnifiedContext);

export default UnifiedProvider;



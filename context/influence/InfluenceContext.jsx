import React, { createContext, useContext, useEffect, useState } from "react";
import { getInfluenceMock } from "@/services/mockInfluenceApi";

const InfluenceContext = createContext();

export function InfluenceProvider({ children }) {
  const [influence, setInfluence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getInfluenceMock();
      setInfluence(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <InfluenceContext.Provider value={{ influence, loading }}>
      {children}
    </InfluenceContext.Provider>
  );
}

export function useInfluence() {
  return useContext(InfluenceContext);
}

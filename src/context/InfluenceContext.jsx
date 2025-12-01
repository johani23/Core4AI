import React, { createContext, useContext, useState, useEffect } from "react";

const InfluenceContext = createContext();

export function InfluenceProvider({ children }) {
  const [influence, setInfluence] = useState(null);
  const [loading, setLoading] = useState(true);

  // fallback demo data (until backend is alive)
  const fallback = {
    tier: "Rising Micro-Influencer",
    score: 72,
    xp: 120,
    xp_to_next: 300,
    reputation: 88,
    cluster: 3
  };

  useEffect(() => {
    async function loadInfluence() {
      try {
        const res = await fetch("/api/influence/buyer_001/profile");
        if (!res.ok) throw new Error("backend down");

        const data = await res.json();
        setInfluence(data);
      } catch {
        setInfluence(fallback);
      }
      setLoading(false);
    }

    loadInfluence();
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

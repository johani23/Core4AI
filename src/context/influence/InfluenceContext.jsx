import { createContext, useContext, useState, useEffect } from "react";

const InfluenceContext = createContext();

export function InfluenceProvider({ children }) {
  const [influence, setInfluence] = useState({
    tier: "Rising Micro-Influencer",
    score: 72,
    xp: 120,
    xp_to_next: 380,
    reputation: 14,
    cluster: 2
  });

  const [loading, setLoading] = useState(false);

  return (
    <InfluenceContext.Provider value={{ influence, loading }}>
      {children}
    </InfluenceContext.Provider>
  );
}

export function useInfluence() {
  return useContext(InfluenceContext);
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBuyerPersona, fetchAudienceFeed } from "@/api/audienceApi";

const AudienceContext = createContext();

export function AudienceProvider({ children }) {
  const buyerId = "buyer_001";

  const [persona, setPersona] = useState(null);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAudience() {
    setLoading(true);
    const p = await fetchBuyerPersona(buyerId);
    const f = await fetchAudienceFeed(buyerId);
    setPersona(p);
    setFeed(f);
    setLoading(false);
  }

  useEffect(() => {
    loadAudience();
  }, []);

  const trackEvent = (event, payload = {}) => {
    console.log("?? Audience Event:", event, payload);
  };

  return (
    <AudienceContext.Provider value={{ persona, feed, loading, trackEvent }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}

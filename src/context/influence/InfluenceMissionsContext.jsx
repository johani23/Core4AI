import React, { createContext, useContext, useState, useEffect } from "react";

const InfluenceMissionsContext = createContext();

export function InfluenceMissionsProvider({ children }) {
  const [missions, setMissions] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setMissions([
      { id: 1, title: "Watch 1 Feed Item", xp: 10 },
      { id: 2, title: "Click 3 Suggested Offers", xp: 20 },
      { id: 3, title: "Visit Audience Page", xp: 5 }
    ]);
  }, []);

  return (
    <InfluenceMissionsContext.Provider
      value={{ missions, completed, complete: (id) => setCompleted([...completed, id]) }}
    >
      {children}
    </InfluenceMissionsContext.Provider>
  );
}

export function useInfluenceMissions() {
  return useContext(InfluenceMissionsContext);
}

import React, { createContext, useContext, useState, useEffect } from "react";

const MissionsContext = createContext();

export function MissionsProvider({ children }) {
  const [missions, setMissions] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setMissions([
      { id: 1, title: "???? ? ??????", xp: 20 },
      { id: 2, title: "???? ? ???????", xp: 15 },
      { id: 3, title: "???? ???? ??? ?????", xp: 30 }
    ]);
  }, []);

  const completeMission = (id) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  return (
    <MissionsContext.Provider value={{ missions, completed, completeMission }}>
      {children}
    </MissionsContext.Provider>
  );
}

export function useInfluenceMissions() {
  return useContext(MissionsContext);
}

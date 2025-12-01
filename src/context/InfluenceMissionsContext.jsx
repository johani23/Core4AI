  import React, { createContext, useState, useContext } from 'react';

  const InfluenceMissionsContext = createContext();

  export function InfluenceMissionsProvider({ children }) {
    const [missions, setMissions] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [level, setLevel] = useState(1);

    const completeMission = (id) => {
      if (!completed.includes(id)) {
        setCompleted([...completed, id]);
      }
    };

    return (
      <InfluenceMissionsContext.Provider value={{ missions, completeMission, level }}>
        {children}
      </InfluenceMissionsContext.Provider>
    );
  }

  export function useInfluenceMissions() {
    return useContext(InfluenceMissionsContext);
  }

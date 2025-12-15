import { createContext, useContext, useState } from "react";
import { useInfluence } from "./InfluenceScoreContext";



const InfluenceMissionsContext = createContext();
export const useInfluenceMissions = () => useContext(InfluenceMissionsContext);

export function InfluenceMissionsProvider({ children }) {
  const { gainXP, addReputation } = useInfluence();

  const [missions] = useState([
    { id: 1, title: "انشر محتوى جديد", xp: 20, rep: 2 },
    { id: 2, title: "شارك رابط عرض", xp: 15, rep: 1 },
    { id: 3, title: "فعّل متجر التأثير", xp: 30, rep: 3 },
    { id: 4, title: "ارفع معدل التحويل", xp: 25, rep: 2 },
  ]);

  const [completed, setCompleted] = useState([]);

  const completeMission = (id) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;

    gainXP(mission.xp);
    addReputation(mission.rep);

    setCompleted((prev) => [...prev, id]);
  };

  return (
    <InfluenceMissionsContext.Provider
      value={{
        missions,
        completed,
        completeMission,
      }}
    >
      {children}
    </InfluenceMissionsContext.Provider>
  );
}

export default InfluenceMissionsProvider;


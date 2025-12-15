// ============================================================================
// 💚 Core4.AI — Creator XP & Rank Context
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const CreatorXPContext = createContext();
export const useCreatorXP = () => useContext(CreatorXPContext);

// Rank tiers
const tiers = [
  { name: "Bronze", min: 1, max: 9 },
  { name: "Silver", min: 10, max: 19 },
  { name: "Gold", min: 20, max: 29 },
  { name: "Platinum", min: 30, max: 39 },
  { name: "Diamond", min: 40, max: 50 },
];

export function CreatorXPProvider({ children }) {
  const [xp, setXP] = useState(40);           // 0–100
  const [level, setLevel] = useState(12);     // Level starts at 1

  const addXP = (amount) => {
    let newXP = xp + amount;
    let newLevel = level;

    // Level Up logic
    while (newXP >= 100) {
      newXP -= 100;
      newLevel++;
    }

    setXP(newXP);
    setLevel(newLevel);
  };

  const getRank = () => {
    const tier = tiers.find((t) => level >= t.min && level <= t.max);
    return tier ? tier.name : "Bronze";
  };

  return (
    <CreatorXPContext.Provider
      value={{ xp, level, addXP, rank: getRank() }}
    >
      {children}
    </CreatorXPContext.Provider>
  );
}

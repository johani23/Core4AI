// src/context/ProfileContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserXP, getUserBadges } from "../services/api";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const xpData = await getUserXP(1); // userId=1 (Ù…Ø¤Ù‚Øª)
      setXp(xpData.xp);
      setLevel(xpData.level);

      const badgeData = await getUserBadges(1);
      setBadges(badgeData);
    }
    fetchData();
  }, []);

  const addXP = (amount) => {
    setXp((prev) => {
      const newXP = prev + amount;
      setLevel(Math.floor(newXP / 100) + 1); // ÙƒÙ„ 100 Ù†Ù‚Ø·Ø© â†’ Level Up
      return newXP;
    });
  };

  return (
    <ProfileContext.Provider value={{ xp, level, badges, addXP }}>
      {children}
    </ProfileContext.Provider>
  );
};

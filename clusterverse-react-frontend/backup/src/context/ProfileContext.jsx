import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile, getUserBadges, getPosts } from "@services/api"; // âœ… fixed alias

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [posts, setPosts] = useState(0);
  const [votes, setVotes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [rank, setRank] = useState("Top 30%");

  const userId = 1; // MVP static user

  // XP thresholds
  const xpThresholds = { 1: 0, 2: 100, 3: 250, 4: 500, 5: 1000 };

  // Fetch from mock API
  const fetchUserData = async () => {
    try {
      const profile = await getUserProfile(userId);
      const badgeData = await getUserBadges(userId);
      const userPosts = await getPosts();

      const xpValue = profile?.xp || 0;
      setXP(xpValue);

      // Calculate Level
      const newLevel =
        Object.keys(xpThresholds)
          .reverse()
          .find((lvl) => xpValue >= xpThresholds[lvl]) || 1;
      setLevel(Number(newLevel));

      // Posts & Votes
      setPosts(userPosts?.length || 0);
      setVotes(userPosts?.reduce((acc, p) => acc + (p.votes || 0), 0));

      // Badges
      setBadges(Array.isArray(badgeData) ? badgeData : []);

      // Streak mock
      setStreak(Math.min(userPosts?.length || 0, 7));

      // Rank mock
      if (userPosts?.length > 10) setRank("Top 10%");
      else if (userPosts?.length > 5) setRank("Top 20%");
      else setRank("Top 30%");
    } catch (err) {
      console.error("âŒ Failed to fetch profile data", err);
    }
  };

  // Gain XP when completing challenges
  const gainXP = (amount) => {
    setXP((prevXP) => {
      const newXP = prevXP + amount;

      // Update Level
      const newLevel =
        Object.keys(xpThresholds)
          .reverse()
          .find((lvl) => newXP >= xpThresholds[lvl]) || 1;
      setLevel(Number(newLevel));

      return newXP;
    });
  };

  // Add new badge
  const addBadge = (badge) => {
    setBadges((prev) => {
      if (prev.includes(badge)) return prev; // no duplicates
      return [...prev, badge];
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        xp,
        level,
        badges,
        posts,
        votes,
        streak,
        rank,
        refresh: fetchUserData,
        gainXP,
        addBadge,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

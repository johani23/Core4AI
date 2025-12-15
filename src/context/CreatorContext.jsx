// ============================================================================
// 💜 Core4.AI – CreatorContext FINAL PRO v2 (2025)
// ============================================================================
import React, { createContext, useContext, useEffect, useState } from "react";

const CreatorContext = createContext();
export const useCreator = () => useContext(CreatorContext);

const CREATOR_RANKS = [
  { name: "Newcomer", xp: 0 },
  { name: "Rising Star", xp: 150 },
  { name: "Influencer", xp: 400 },
  { name: "Creator Pro", xp: 800 },
  { name: "Elite", xp: 1500 },
];

const DEFAULT_MISSIONS = [
  { id: 1, title: "انشر منشورًا جديدًا", reward: 15 },
  { id: 2, title: "أضف صورة أو فيديو", reward: 10 },
  { id: 3, title: "تفاعل مع 5 منشورات", reward: 8 },
];

export function CreatorProvider({ children }) {
  const [creatorXP, setCreatorXP] = useState(0);
  const [creatorRank, setCreatorRank] = useState("Newcomer");
  const [creatorPosts, setCreatorPosts] = useState([]);
  const [missions, setMissions] = useState(DEFAULT_MISSIONS);

  useEffect(() => {
    const savedXP = localStorage.getItem("creator_xp");
    const savedRank = localStorage.getItem("creator_rank");
    const savedPosts = localStorage.getItem("creator_posts");
    const savedMissions = localStorage.getItem("creator_missions");

    if (savedXP) setCreatorXP(Number(savedXP));
    if (savedRank) setCreatorRank(savedRank);
    if (savedPosts) setCreatorPosts(JSON.parse(savedPosts));
    if (savedMissions) setMissions(JSON.parse(savedMissions));
  }, []);

  useEffect(() => localStorage.setItem("creator_xp", creatorXP), [creatorXP]);
  useEffect(() => localStorage.setItem("creator_rank", creatorRank), [creatorRank]);
  useEffect(() => localStorage.setItem("creator_posts", JSON.stringify(creatorPosts)), [creatorPosts]);
  useEffect(() => localStorage.setItem("creator_missions", JSON.stringify(missions)), [missions]);

  const updateRank = (xp) => {
    let newRank = "Newcomer";
    for (let r of CREATOR_RANKS) if (xp >= r.xp) newRank = r.name;
    setCreatorRank(newRank);
  };

  const addCreatorXP = (amount) => {
    const newXP = creatorXP + amount;
    setCreatorXP(newXP);
    updateRank(newXP);
  };

  const addCreatorPost = (post) => {
    setCreatorPosts((prev) => [post, ...prev]);
  };

  return (
    <CreatorContext.Provider
      value={{
        creatorXP,
        creatorRank,
        creatorPosts,
        missions,
        addCreatorXP,
        addCreatorPost,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}

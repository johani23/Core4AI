// ============================================================================
// 💚 Core4.AI – TribeContext (PRO EDITION – Fully Compatible with ALL Tribe Modules)
// ----------------------------------------------------------------------------
// Includes:
// - Lifecycle Engine + computeLifecycleFromXP()
// - Full Upgrades Engine (xpBoostAll, xpBoostChallenges, coinBoost, tribeLevel)
// - War Points + Talent Score
// - Challenge Engine
// - Tribe Economy (coins, treasury, contribution)
// - Safe defaults for all TribeDashboard, ProductAffinity, Ranking, etc.
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";

const TribeContext = createContext();
export const useTribe = () => useContext(TribeContext);

export function TribeProvider({ children }) {
  // ---------------------------------------------------------------------------
  // BASIC TRIBE INFO
  // ---------------------------------------------------------------------------
  const [tribes] = useState([
    { id: 1, name: "Techy", icon: "💻", members: 124 },
    { id: 2, name: "Adventurers", icon: "🔥", members: 98 },
    { id: 3, name: "Fashionists", icon: "💄", members: 145 },
  ]);

  const [selectedTribe, setSelectedTribe] = useState(
    JSON.parse(localStorage.getItem("tribe_selected")) || null
  );

  const [members, setMembers] = useState(
    JSON.parse(localStorage.getItem("tribe_members") || "[]")
  );

  // ---------------------------------------------------------------------------
  // XP + RANK
  // ---------------------------------------------------------------------------
  const [xp, setXP] = useState(Number(localStorage.getItem("tribe_user_xp") || 0));
  const [rank, setRank] = useState(localStorage.getItem("tribe_rank") || "Beginner");

  // ---------------------------------------------------------------------------
  // LIFECYCLE ENGINE
  // ---------------------------------------------------------------------------
  const [lifecycleStage, setLifecycleStage] = useState("spot");
  const [lifecycleProgress, setLifecycleProgress] = useState(0);

  function computeLifecycleFromXP(xpValue) {
    let stage = "spot";

    if (xpValue > 1000) stage = "motivate";
    else if (xpValue > 600) stage = "recruit";
    else if (xpValue > 300) stage = "develop";
    else if (xpValue > 100) stage = "assess";

    const progress = Math.min(100, xpValue / 2);
    return { stage, progress };
  }

  function updateLifecycle(newXP) {
    const { stage, progress } = computeLifecycleFromXP(newXP);
    setLifecycleStage(stage);
    setLifecycleProgress(progress);
  }

  // ---------------------------------------------------------------------------
  // HONOR MEMBER ENGINE
  // ---------------------------------------------------------------------------
  const [honorMember, setHonorMember] = useState(
    JSON.parse(localStorage.getItem("tribe_honor_member") || "null")
  );

  function evaluateHonorMember() {
    if (!members.length) return;

    const scoreList = members.map((m) => ({
      member: m,
      score: (m.xp || 0) + (m.advocacy || 0) * 40 + (m.talentScore || 50) * 0.4,
    }));

    const sorted = scoreList.sort((a, b) => b.score - a.score);
    const top = sorted[0].member;

    if (!honorMember || top.id !== honorMember.id) {
      setHonorMember(top);
      localStorage.setItem("tribe_honor_member", JSON.stringify(top));
    }
  }

  useEffect(() => {
    evaluateHonorMember();
  }, [members]);

  // ---------------------------------------------------------------------------
  // WAR POINTS + TALENT SCORE
  // ---------------------------------------------------------------------------
  const [warPoints, setWarPoints] = useState(
    Number(localStorage.getItem("tribe_war_points") || 0)
  );

  const [talentScore, setTalentScore] = useState(
    Number(localStorage.getItem("tribe_talent_score") || 50)
  );

  useEffect(() => {
    const newScore = Math.round(xp * 0.3 + warPoints * 0.2 + 50);
    setTalentScore(newScore);
    localStorage.setItem("tribe_talent_score", newScore);
  }, [xp, warPoints]);

  // ---------------------------------------------------------------------------
  // ⭐ NEW: FULL UPGRADE ENGINE FOR DASHBOARD COMPATIBILITY
  // ---------------------------------------------------------------------------
  const [upgrades, setUpgrades] = useState({
    xpBoostAll: { level: 0, effect: 0.05 },
    xpBoostChallenges: { level: 0, effect: 0.1 },
    coinBoost: { level: 0, effect: 0.05 },
    tribeLevel: { level: 1 },
  });

  // ---------------------------------------------------------------------------
  // CHALLENGE ENGINE
  // ---------------------------------------------------------------------------
  const [completedChallenges, setCompletedChallenges] = useState(
    JSON.parse(localStorage.getItem("tribe_completed_challenges") || "[]")
  );

  function completeChallenge(id) {
    if (completedChallenges.includes(id)) return;

    const updated = [...completedChallenges, id];
    setCompletedChallenges(updated);
    localStorage.setItem("tribe_completed_challenges", JSON.stringify(updated));
  }

  // ---------------------------------------------------------------------------
  // TRIBE ECONOMY
  // ---------------------------------------------------------------------------
  const [coins, setCoins] = useState(Number(localStorage.getItem("tribe_coins") || 0));
  const [treasury, setTreasury] = useState(Number(localStorage.getItem("tribe_treasury") || 0));
  const [contribution, setContribution] = useState(
    Number(localStorage.getItem("tribe_contribution") || 0)
  );

  // ---------------------------------------------------------------------------
  // JOIN TRIBE
  // ---------------------------------------------------------------------------
  function joinTribe(t) {
    setSelectedTribe(t);
    localStorage.setItem("tribe_selected", JSON.stringify(t));

    const user = {
      id: Date.now(),
      name: "أنت",
      xp,
      talentScore,
      advocacy: 0,
    };

    const updatedMembers = [...members, user];
    setMembers(updatedMembers);
    localStorage.setItem("tribe_members", JSON.stringify(updatedMembers));
  }

  // ---------------------------------------------------------------------------
  // XP ENGINE
  // ---------------------------------------------------------------------------
  function addXP(amount) {
    const newXP = xp + amount;
    setXP(newXP);
    localStorage.setItem("tribe_user_xp", newXP);

    if (newXP > 200 && rank !== "Pro") setRank("Pro");
    if (newXP > 600 && rank !== "Elite") setRank("Elite");

    localStorage.setItem("tribe_rank", rank);

    updateLifecycle(newXP);
  }

  // ---------------------------------------------------------------------------
  // PROVIDER EXPORT
  // ---------------------------------------------------------------------------
  return (
    <TribeContext.Provider
      value={{
        tribes,
        selectedTribe,
        joinTribe,

        xp,
        rank,
        addXP,

        members,
        lifecycleStage,
        lifecycleProgress,
        computeLifecycleFromXP,
        talentScore,

        honorMember,
        evaluateHonorMember,

        warPoints,
        setWarPoints,

        upgrades,
        completeChallenge,
        completedChallenges,

        coins,
        treasury,
        contribution,
        setCoins,
        setTreasury,
        setContribution,
      }}
    >
      {children}
    </TribeContext.Provider>
  );
}

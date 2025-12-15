// ============================================================================
// 💚 Core4.AI – Tribe Challenge Engine (Unified Stable Edition)
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTribe } from "@/context/TribeContext";

const TribeChallengeContext = createContext();

// MAIN hook used by TribeDashboard
export const useTribeChallenges = () => useContext(TribeChallengeContext);

// Alias hook used by TribeChallengeCreator.jsx (to avoid breaking older code)
export const useChallenges = () => useContext(TribeChallengeContext);

export function TribeChallengeProvider({ children }) {
  const { members, honorMember } = useTribe();

  const [challenges, setChallenges] = useState(
    JSON.parse(localStorage.getItem("tribe_challenges") || "[]")
  );

  const [weeklyCreator, setWeeklyCreator] = useState(
    JSON.parse(localStorage.getItem("weekly_challenge_creator") || "null")
  );

  // Pick weekly creator
  function pickWeeklyCreator() {
    if (!members.length) return;

    const scores = members.map((m) => ({
      member: m,
      score:
        (m.xp || 0) * 0.5 +
        (m.advocacy || 0) * 40 +
        (m.talentScore || 50) * 0.3,
    }));

    const sorted = scores.sort((a, b) => b.score - a.score);
    const selected = sorted[0].member;

    setWeeklyCreator(selected);
    localStorage.setItem("weekly_challenge_creator", JSON.stringify(selected));
  }

  useEffect(() => {
    if (!weeklyCreator) pickWeeklyCreator();
  }, [members]);

  // AI evaluate
  function aiEvaluateChallenge(input) {
    let xp = 20;

    if (input.challengeType === "awareness") xp = 25;
    if (input.challengeType === "ugc") xp = 35;
    if (input.challengeType === "advocacy") xp = 45;
    if (input.challengeType === "conversion") xp = 60;

    const bannedWords = ["سيء", "عنصري", "خطر"];
    const safe = !bannedWords.some((b) => input.description.includes(b));

    return {
      xpValue: xp,
      approved: safe,
      finalMessage: safe
        ? "تم اعتماد التحدي 🎉"
        : "تم رفض التحدي لاحتوائه على كلمات غير مناسبة ⚠️",
    };
  }

  // Create challenge
  function createChallenge(input) {
    const evaluation = aiEvaluateChallenge(input);

    if (!evaluation.approved) {
      return { success: false, msg: evaluation.finalMessage };
    }

    const challenge = {
      id: Date.now(),
      title: input.title,
      description: input.description,
      type: input.challengeType,
      xp: evaluation.xpValue,
      creator: weeklyCreator,
      active: true,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...challenges, challenge];
    setChallenges(updated);
    localStorage.setItem("tribe_challenges", JSON.stringify(updated));

    return { success: true, msg: evaluation.finalMessage };
  }

  // Complete
  function completeChallenge(id) {
    const updated = challenges.map((c) =>
      c.id === id ? { ...c, active: false, completed: true } : c
    );

    setChallenges(updated);
    localStorage.setItem("tribe_challenges", JSON.stringify(updated));
  }

  return (
    <TribeChallengeContext.Provider
      value={{
        challenges,
        weeklyCreator,
        createChallenge,
        completeChallenge,
        pickWeeklyCreator,
      }}
    >
      {children}
    </TribeChallengeContext.Provider>
  );
}

export default TribeChallengeProvider;


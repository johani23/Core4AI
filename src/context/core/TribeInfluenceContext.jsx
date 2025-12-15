// ============================================================================
// 💚 Core4.AI – Tribe Influence Engine (Stable Edition)
// ----------------------------------------------------------------------------
// Provides:
// - getTopAmbassadors(product, count)
// - influenceScore per member
// ============================================================================

import React, { createContext, useContext } from "react";
import { useTribe } from "@/context/TribeContext";

const TribeInfluenceContext = createContext();
export const useTribeInfluence = () => useContext(TribeInfluenceContext);

export function TribeInfluenceProvider({ children }) {
  const { members } = useTribe();

  function computeInfluenceScore(member, product) {
    if (!member) return 0;

    const xp = member.xp || 0;
    const talent = member.talentScore || 50;
    const advocacy = member.advocacy || 0;

    return Math.round(
      xp * 0.3 +
      talent * 0.4 +
      advocacy * 50
    );
  }

  function getTopAmbassadors(product, count = 3) {
    return members
      .map((m) => ({
        ...m,
        influenceScore: computeInfluenceScore(m, product),
      }))
      .sort((a, b) => b.influenceScore - a.influenceScore)
      .slice(0, count);
  }

  return (
    <TribeInfluenceContext.Provider
      value={{
        getTopAmbassadors,
        computeInfluenceScore,
      }}
    >
      {children}
    </TribeInfluenceContext.Provider>
  );
}

export default TribeInfluenceProvider;


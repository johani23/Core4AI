// ============================================================================
// 💚 Core4.AI – Revenue Ranking Engine (SAFE EDITION)
// ----------------------------------------------------------------------------
// FIXES:
// - Prevent crash when useTribe() is undefined
// - Prevent destructure errors
// - Adds fallback computeLifecycleFromXP
// ============================================================================

import React, { createContext, useContext } from "react";
import { useTribe } from "@/context/TribeContext";
import { useTribeFunnel } from "@/context/TribeFunnelContext";
import { useAttribution } from "@/context/AttributionContext";

const RevenueRankingContext = createContext();
export const useRevenueRanking = () => useContext(RevenueRankingContext);

export function RevenueRankingProvider({ children }) {
  // ---------------------------------------------------------------------------
  // SAFE ACCESS TO TRIBE CONTEXT
  // ---------------------------------------------------------------------------
  let tribe = {};

  try {
    tribe = useTribe() || {};
  } catch {
    tribe = {};
  }

  const {
    members = [],
    computeLifecycleFromXP = (xp) => ({ stage: "spot" }), // fallback
  } = tribe;

  // ---------------------------------------------------------------------------
  // SAFE FUNNEL + ATTRIBUTION CONTEXT
  // ---------------------------------------------------------------------------
  let funnel = {};
  try {
    funnel = useTribeFunnel() || {};
  } catch {
    funnel = {};
  }

  const { evaluateFunnelStage = () => ({}) } = funnel;

  let attribution = {};
  try {
    attribution = useAttribution() || {};
  } catch {
    attribution = {};
  }

  const {
    logs = [],
    getRevenueByMember = () => 0,
  } = attribution;

  // ---------------------------------------------------------------------------
  // SCORING ENGINE
  // ---------------------------------------------------------------------------
  function computeInfluencePower(member, product) {
    if (!member) return 0;

    const xp = member.xp || 0;
    const talent = member.talentScore || member.talent || 50;
    const revenue = getRevenueByMember(member.id);

    const funnel = evaluateFunnelStage(member, product);
    const stage = funnel?.funnelStage;

    const lifecycle = computeLifecycleFromXP(xp)?.stage || "spot";
    const stageWeight = {
      spot: 0.6,
      assess: 0.8,
      develop: 0.9,
      recruit: 1.0,
      motivate: 1.1,
    };

    const conversionCount = logs.filter(
      (l) => l.memberId === member.id && l.funnelStage === "conversion"
    ).length;

    const advocacyCount = logs.filter(
      (l) => l.memberId === member.id && l.funnelStage === "advocacy"
    ).length;

    return Math.round(
      revenue * 0.5 +
        conversionCount * 120 +
        advocacyCount * 60 +
        talent * 0.1 +
        (stageWeight[lifecycle] || 0.6) * 100
    );
  }

  // ---------------------------------------------------------------------------
  // RANKING ENGINE
  // ---------------------------------------------------------------------------
  function rankMembers(product) {
    return members
      .map((m) => ({
        ...m,
        influenceScore: computeInfluencePower(m, product),
      }))
      .sort((a, b) => b.influenceScore - a.influenceScore);
  }

  // ---------------------------------------------------------------------------
  // PROVIDER
  // ---------------------------------------------------------------------------
  return (
    <RevenueRankingContext.Provider
      value={{ rankMembers, computeInfluencePower }}
    >
      {children}
    </RevenueRankingContext.Provider>
  );
}

export default RevenueRankingProvider;


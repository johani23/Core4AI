// ============================================================================
// 💚 Core4.AI – Reward Distribution Context (Creators + Leaders + Ambassadors)
// ============================================================================

import React, { createContext, useContext } from "react";
import { useAttribution } from "@/context/AttributionContext";
import { useTribe } from "@/context/TribeContext";
import { useTribeInfluence } from "@/context/TribeInfluenceContext";

const RewardDistributionContext = createContext();
export const useRewardEngine = () => useContext(RewardDistributionContext);

export function RewardDistributionProvider({ children }) {
  const { logs } = useAttribution();
  const { members, selectedTribe } = useTribe();
  const { getTopAmbassadors } = useTribeInfluence();

  // CREATOR REWARD
  function computeCreatorReward(creatorId) {
    const revenue = logs
      .filter((l) => l.creatorId === creatorId)
      .reduce((sum, l) => sum + l.amount, 0);

    const awareness = Math.min(100, revenue / 30);

    return Math.round(revenue * 0.05 + awareness * 3);
  }

  // TRIBE LEADER REWARD
  function computeLeaderReward(leaderId) {
    const revenue = logs
      .filter((l) => l.memberId === leaderId)
      .reduce((s, l) => s + l.amount, 0);

    const conversionCount = logs.filter(
      (l) => l.memberId === leaderId && l.funnelStage === "conversion"
    ).length;

    return Math.round(revenue * 0.08 + conversionCount * 50);
  }

  // AMBASSADOR REWARDS
  function computeAmbassadorRewards(product) {
    const ambassadors = getTopAmbassadors(product, 3);

    return ambassadors.map((a) => ({
      id: a.id,
      name: a.name,
      reward: Math.round(a.influenceScore * 1.2 + (a.conversions || 0) * 15),
    }));
  }

  function distributeRewards({ creatorId, leaderId, product }) {
    return {
      creatorReward: computeCreatorReward(creatorId),
      leaderReward: computeLeaderReward(leaderId),
      ambassadorRewards: computeAmbassadorRewards(product),
      tribeTreasury: Math.round(product.price * 0.12),
    };
  }

  return (
    <RewardDistributionContext.Provider
      value={{ distributeRewards }}
    >
      {children}
    </RewardDistributionContext.Provider>
  );
}

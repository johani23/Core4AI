// ============================================================================
// 💚 Core4.AI – Tribe Product Affinity Engine (v1)
// - Calculates which tribe member is best suited to promote each product
// - Used by Tribe Product Board + Influence Briefing
// ============================================================================

import { useTribe } from "@/context/TribeContext";

export function useProductAffinity() {
  const { members, computeLifecycleFromXP, talentScore } = useTribe();

  // Compute affinity for a single member
  function computeAffinity(member, product, cluster) {
    if (!member || !product || !cluster) return 0;

    const { stage } = computeLifecycleFromXP(member.xp || 0);

    let score = 0;

    // 1) Talent score direct influence
    score += (member.talent || 50) * 0.4;

    // 2) Lifecycle stage matching
    const lifecycleWeights = {
      spot: 20,
      assess: 40,
      develop: 60,
      recruit: 80,
      motivate: 100,
    };
    score += lifecycleWeights[stage] * 0.3;

    // 3) Product category match
    if (product.category?.toLowerCase() === member.interestCategory)
      score += 20;

    // 4) Strongest feature relevance
    const strongest = product.features?.length
      ? product.features.reduce((a, b) =>
          a.strength > b.strength ? a : b
        )
      : null;

    if (strongest && member.skills?.includes(strongest.name))
      score += 20;

    // 5) Matching top cluster
    score += cluster.expectedRevenue / 1000;

    return Math.round(score);
  }

  // Compute affinity for all members for a given product
  function computeAll(product, cluster) {
    return members
      .map((m) => ({
        ...m,
        affinity: computeAffinity(m, product, cluster),
      }))
      .sort((a, b) => b.affinity - a.affinity);
  }

  return {
    computeAffinity,
    computeAll,
  };
}

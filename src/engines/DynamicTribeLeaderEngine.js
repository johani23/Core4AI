// ============================================================================
// 💚 Core4.AI – Dynamic Tribe Leader Selection Engine
// ----------------------------------------------------------------------------
// Picks next leader automatically based on revenue + influence + advocacy.
// ============================================================================

export function selectNewLeader(members, revenueLogs, funnelEvaluator) {
  
  const scores = members.map((m) => {
    const revenue = revenueLogs
      .filter((l) => l.memberId === m.id)
      .reduce((s, l) => s + l.amount, 0);

    const funnel = funnelEvaluator(m);

    const conversionInfluence =
      revenueLogs.filter((l) => l.memberId === m.id && l.funnelStage === "conversion").length * 50;

    const advocacyInfluence =
      revenueLogs.filter((l) => l.memberId === m.id && l.funnelStage === "advocacy").length * 30;

    const score =
      revenue * 0.5 +
      conversionInfluence +
      advocacyInfluence +
      (m.talentScore || 50) * 1.2 +
      (m.xp || 0) * 0.2;

    return { member: m, score };
  });

  const sorted = scores.sort((a, b) => b.score - a.score);

  return sorted[0]?.member || null;
}

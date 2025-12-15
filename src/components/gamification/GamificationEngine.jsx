export default function GamificationEngine() {
  return {
    calculateXP: () => 0,
    boostScore: () => 0,
    computeLevel: () => ({
      title: "Bronze",
      progress: 0,
    }),
  };
}


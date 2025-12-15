export function calculateDataMaturity(cognitive = {}) {
  if (cognitive.decisionStyle === "analyzing") return 4;
  return 2;
}

export function calculateInnovationMaturity(innovation = {}) {
  if (innovation.creativityLevel === "high") return 5;
  if (innovation.creativityLevel === "medium") return 3;
  return 1;
}

export function calculateTribeMatch(identity = {}, cognitive = {}, innovation = {}) {
  if (innovation.creativityLevel === "high") return "Innovators";
  if (cognitive.thinkingMode === "big_picture") return "Visionaries";
  if (identity.emotionalSignature === "analytical") return "Analysts";
  return "Explorers";
}


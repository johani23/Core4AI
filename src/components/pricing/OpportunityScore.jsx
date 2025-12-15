// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ OpportunityScore.js (v1.0 BETA)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Computes Opportunity Score (0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“100)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Based on MIT Pricing Engine principles
// ============================================================================

export function calculateOpportunityScore({
  elasticity,
  optimalPrice,
  merchantPrice,
  suggestedPrice,
  revenueAtOptimal,
  revenueAtCurrent,
}) {
  let score = 0;

  // 1) Elasticity Impact (40%)
  const e = Math.min(Math.max(Math.abs(elasticity), 0), 3); // normalize 0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“3
  const elasticityScore = (1 - Math.min(e / 3, 1)) * 40;
  score += elasticityScore;

  // 2) Price Distance Impact (25%)
  const distance = Math.abs(merchantPrice - optimalPrice);
  const idealRange = optimalPrice * 0.1; // 10% deviation allowed
  const distanceScore = Math.max(0, 25 - (distance / idealRange) * 25);
  score += distanceScore;

  // 3) Revenue Potential (25%)
  const revenueRatio = Math.min(revenueAtCurrent / revenueAtOptimal, 1);
  const revenueScore = revenueRatio * 25;
  score += revenueScore;

  // 4) AI Confidence (10%)
  const aiDistance = Math.abs(suggestedPrice - optimalPrice);
  const aiScore = Math.max(0, 10 - (aiDistance / idealRange) * 10);
  score += aiScore;

  // Clamp between 0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“100
  return Math.round(Math.min(Math.max(score, 0), 100));
}


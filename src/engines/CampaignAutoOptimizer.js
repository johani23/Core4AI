// ============================================================================
// 💚 Core4.AI – Campaign Auto Optimization Engine (MIT + Tribe Intelligence)
// ----------------------------------------------------------------------------
// Suggests:
// - Best influencer for next round
// - Best target cluster
// - Recommended price adjustment
// - Content strategy update
// - ROI expectation
// ============================================================================

export function autoOptimizeCampaign({ 
  product, 
  clusters, 
  ambassadors, 
  previousRevenue, 
  conversionEvents 
}) {
  if (!product || !clusters) return null;

  const topCluster = clusters[0];

  const bestAmbassador = ambassadors?.[0];

  const priceAdjustment =
    previousRevenue > 8000 ? "Keep price" :
    previousRevenue > 4000 ? "Increase slightly" :
    "Offer discount";

  const nextContent =
    conversionEvents > 4
      ? "Short direct CTAs + Offer mention"
      : "Benefit-driven lifestyle content";

  const roiEstimate =
    (topCluster.expectedRevenue || 0) +
    (conversionEvents || 0) * (product.price || 100);

  return {
    nextAmbassador: bestAmbassador?.name,
    targetCluster: topCluster.label,
    priceAdjustment,
    nextContent,
    expectedROI: Math.round(roiEstimate),
  };
}

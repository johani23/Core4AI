// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ SmartPricingDashboardPanel.jsx (v4 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Embedded MIT Pricing Panel)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Lightweight version of SmartPricingDashboard
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Designed specifically for CampaignBuilder integration
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Shows MIT Final Price, Range, Confidence, Elasticity & Discount
// ============================================================================

import RecommendedPriceBox from "@/components/analytics/RecommendedPriceBox";
import PricingBreakdown from "@/components/analytics/PricingBreakdown";
import ElasticityPanel from "@/components/analytics/ElasticityPanel";

export default function SmartPricingDashboardPanel({ productId }) {
  const [loading, setLoading] = useState(true);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    if (productId) loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/pricing/recommend/${productId}`);
      const json = await res.json();
      setPricing(json);
    } catch (err) {
      console.error("Failed to load pricing data:", err);
    }

    setLoading(false);
  };

  if (!productId)
    return (
      <div className="text-gray-400 text-center">
        Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¯.
      </div>
    );

  if (loading)
    return (
      <div className="text-gray-400 text-center py-6">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading Pricing EngineÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
      </div>
    );

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow mb-8">
      <h2 className="text-xl font-bold text-green-400 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ MIT Smart Pricing Panel
      </h2>

      {/* Recommended Price */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-green-300">Recommended Price</h3>
        <p className="text-3xl font-bold text-yellow-300">
          {pricing?.recommended_price} SAR
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Optimal: {pricing?.range_min} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ {pricing?.range_max} SAR
        </p>
        <p className="text-xs text-purple-300 mt-2">
          Confidence: {pricing?.confidence}%
        </p>
      </div>

      {/* Breakdown */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Value Breakdown</h3>
        <PricingBreakdown productId={productId} />
      </div>

      {/* Elasticity */}
      <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Elasticity</h3>
        <ElasticityPanel productId={productId} />
      </div>

      {/* Summary Note */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mt-3">
        <h3 className="font-semibold text-green-300 mb-2">MIT Summary</h3>
        <p className="text-gray-300 text-sm">
          Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒËœÃ…â€™ ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã†â€™ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ…â€™ 
          Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±ÃƒËœÃ…â€™ Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡.
        </p>
      </div>
    </div>
  );
}



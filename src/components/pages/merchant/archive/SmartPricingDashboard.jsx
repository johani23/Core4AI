// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ SmartPricingDashboard.jsx (v4 FINAL ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Full MIT Engine Page)
// ============================================================================

import PricingOverview from "@/components/analytics/PricingOverview";
import PricingBreakdown from "@/components/analytics/PricingBreakdown";
import ElasticityPanel from "@/components/analytics/ElasticityPanel";
import EVCCalculator from "@/components/analytics/EVCCalculator";
import DemandCurve from "@/components/analytics/DemandCurve";
import RecommendedPriceBox from "@/components/analytics/RecommendedPriceBox";
import CommissionSharingEngine from "@/components/pages/merchant/commission/CommissionSharingEngine";

export default function SmartPricingDashboard() {
  const merchantId = "merchant_001";
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetch(`/api/analytics/products/${merchantId}`);
    const json = await res.json();
    if (Array.isArray(json)) setProducts(json);
  };

  const activeProduct = products.length > 0 ? products[0] : null;
  const activeProductId = activeProduct?.product_id;

  const tabs = [
    { key: "overview", label: "MIT Overview" },
    { key: "breakdown", label: "Breakdown" },
    { key: "elasticity", label: "Elasticity" },
    { key: "evc", label: "EVC" },
    { key: "demand", label: "Demand Curve" },
    { key: "recommend", label: "Recommendation" },
    { key: "commission", label: "Commission" },
  ];

  const renderPanel = () => {
    if (!activeProductId) return null;

    switch (activeTab) {
      case "overview": return <PricingOverview productId={activeProductId} />;
      case "breakdown": return <PricingBreakdown productId={activeProductId} />;
      case "elasticity": return <ElasticityPanel productId={activeProductId} />;
      case "evc": return <EVCCalculator productId={activeProductId} />;
      case "demand": return <DemandCurve productId={activeProductId} />;
      case "recommend": return <RecommendedPriceBox productId={activeProductId} />;
      case "commission": return <CommissionSharingEngine productId={activeProductId} />;
      default: return null;
    }
  };

  if (!activeProductId)
    return (
      <div className="text-center mt-14 text-gray-500">
        Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-green-400 mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Smart Pricing Dashboard (MIT Engine)
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === t.key
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-gray-900 p-5 rounded-xl shadow border border-gray-700">
        {renderPanel()}
      </div>
    </div>
  );
}



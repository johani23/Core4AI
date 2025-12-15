// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignBuilder.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â v22 CLEAN & FIXED
// ============================================================================

import { useParams } from "react-router-dom";

// FIXED PATH ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â use correct relative import
import ProductIQSection from "../sections/ProductIQSection";

import CampaignQualityScore from "../sections/CampaignQualityScore";
import CampaignAudienceFit from "../sections/CampaignAudienceFit";
import CampaignScaling from "../sections/CampaignScaling";
import CampaignRiskFlags from "../sections/CampaignRiskFlags";
import CampaignBudgetOptimizer from "../sections/CampaignBudgetOptimizer";
import CampaignROIPredictor from "../sections/CampaignROIPredictor";
import CampaignCPAForecast from "../sections/CampaignCPAForecast";
import CampaignBreakEven from "../sections/CampaignBreakEven";
import CampaignAutoDraft from "../sections/CampaignAutoDraft";
import CampaignSummarySection from "../sections/CampaignSummarySection";

export default function CampaignBuilder() {
  const { productName } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="text-gray-300 text-center p-10">Loading campaignÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 space-y-10">

      <h1 className="text-4xl font-bold text-green-400">
        Campaign Builder ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â {productName}
      </h1>

      {/* Product IQ Section */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <ProductIQSection productName={productName} />
      </div>

      {/* Audience Fit */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignAudienceFit />
      </div>

      {/* Quality Score */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignQualityScore />
      </div>

      {/* Scaling */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignScaling />
      </div>

      {/* Risk Flags */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignRiskFlags />
      </div>

      {/* Budget Optimizer */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignBudgetOptimizer />
      </div>

      {/* ROI Prediction */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignROIPredictor />
      </div>

      {/* CPA Forecast */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignCPAForecast />
      </div>

      {/* Break Even */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignBreakEven />
      </div>

      {/* Auto Draft */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignAutoDraft productName={productName} />
      </div>

      {/* Campaign Summary */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <CampaignSummarySection />
      </div>
    </div>
  );
}



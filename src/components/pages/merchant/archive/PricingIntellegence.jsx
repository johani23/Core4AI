import React, { useState, Suspense, lazy } from "react";

// Lazy Panels
const OverviewPanel = lazy(() => import("./pricing/OverviewPanel"));
const BreakdownPanel = lazy(() => import("./pricing/BreakdownPanel"));
const ElasticityPanel = lazy(() => import("./ElasticityPanel"));
const EVCPanel = lazy(() => import("./pricing/EVCPanel"));
const DemandCurvePanel = lazy(() => import("./pricing/DemandCurvePanel"));
const RecommendationPanel = lazy(() =>
  import("./pricing/RecommendationPanel")
);
const CommissionSharingPanel = lazy(() =>
  import("./pricing/CommissionSharingPanel")
);

export default function PricingIntelligence({ productId }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "breakdown", label: "Breakdown" },
    { id: "elasticity", label: "Elasticity" },
    { id: "evc", label: "EVC" },
    { id: "demand", label: "Demand Curve" },
    { id: "recommendation", label: "Recommendation" },
    { id: "commission", label: "Commission" },
  ];

  const renderPanel = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel productId={productId} />;
      case "breakdown":
        return <BreakdownPanel productId={productId} />;
      case "elasticity":
        return <ElasticityPanel productId={productId} />;
      case "evc":
        return <EVCPanel productId={productId} />;
      case "demand":
        return <DemandCurvePanel productId={productId} />;
      case "recommendation":
        return <RecommendationPanel productId={productId} />;
      case "commission":
        return <CommissionSharingPanel productId={productId} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white rounded-2xl p-8 flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-green-400">Pricing Intelligence v22</h1>
          <p className="text-gray-400 mt-2">
            Powered by Hybrid ML Engine v22 (Elasticity + EVC + Curve Fit)
          </p>
        </div>

        {/* MINI SUMMARY */}
        <div className="bg-gray-800 px-6 py-4 rounded-xl border border-gray-700">
          <p className="text-gray-300 text-sm">Model Status</p>
          <p className="text-green-400 font-bold text-lg">ACTIVE ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ML Engine v22</p>
        </div>
      </div>

      <div className="flex gap-8">

        {/* SIDE NAVIGATION */}
        <div className="w-64 bg-gray-800 p-4 rounded-2xl border border-gray-700 flex flex-col gap-2">

          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* EXPLAIN BUTTON */}
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("explainTab", {
                  detail: { tab: activeTab },
                })
              )
            }
            className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-xl font-bold"
          >
            ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ Explain This Tab
          </button>

        </div>

        {/* PANEL CONTENT */}
        <div className="flex-1 bg-gray-800 p-6 rounded-2xl border border-gray-700 min-h-[600px]">
          <Suspense
            fallback={
              <div className="text-center text-gray-300 p-10">
                ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading analysis...
              </div>
            }
          >
            {renderPanel()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}


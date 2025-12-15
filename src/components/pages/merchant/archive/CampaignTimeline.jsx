// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignTimeline.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Interactive timeline for campaign launch
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Auto-highlights key steps
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean UI inspired by TikTok Ads Manager
// ============================================================================


export default function CampaignTimeline() {
  const items = [
    {
      phase: "Market Analysis",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ",
      actions: [
        "AI Marketing Plan Generated",
        "Target Tribes Identified",
        "Audience Segments Suggested",
      ],
    },
    {
      phase: "Product Intelligence",
      icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ",
      actions: [
        "Competitors Analyzed",
        "AI Suggested Price Calculated",
        "Recommended Commission Rate",
        "Conversion Probability Estimated",
      ],
    },
    {
      phase: "Creative Production",
      icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬",
      actions: [
        "Storyboard Generated",
        "Ad Variations Created",
        "Audio & Hashtags Selected",
        "Emotional Triggers Identified",
      ],
    },
    {
      phase: "Campaign Setup",
      icon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
      actions: [
        "Budget Allocation Suggested",
        "Influencer Matching Done",
        "Timeline Configured",
      ],
    },
    {
      phase: "Final Review",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â",
      actions: [
        "Predicted Performance Calculated",
        "Optimization Checklist",
        "Creative Improvements Loaded",
      ],
    },
  ];

  return (
    <div className="bg-white border shadow-lg rounded-xl p-8 mb-10">
      <h2 className="text-2xl font-extrabold text-[#006C35] mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â Campaign Timeline
      </h2>

      <div className="space-y-6">
        {items.map((block, i) => (
          <div key={i} className="border-l-4 border-[#006C35] pl-4 ml-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{block.icon}</span>
              <h3 className="text-xl font-bold text-gray-800">{block.phase}</h3>
            </div>

            <ul className="text-gray-700 space-y-1 ml-1">
              {block.actions.map((act, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                >
                  <span className="text-green-600 font-bold">ÃƒÂ¢Ã…â€œÃ¢â‚¬Â</span>
                  {act}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}



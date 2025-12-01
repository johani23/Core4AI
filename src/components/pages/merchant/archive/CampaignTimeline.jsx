// ============================================================================
// ðŸ’š Core4.AI â€“ CampaignTimeline.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// â€¢ Interactive timeline for campaign launch
// â€¢ Auto-highlights key steps
// â€¢ Clean UI inspired by TikTok Ads Manager
// ============================================================================

import React from "react";

export default function CampaignTimeline() {
  const items = [
    {
      phase: "Market Analysis",
      icon: "ðŸ“Š",
      actions: [
        "AI Marketing Plan Generated",
        "Target Tribes Identified",
        "Audience Segments Suggested",
      ],
    },
    {
      phase: "Product Intelligence",
      icon: "ðŸ§ ",
      actions: [
        "Competitors Analyzed",
        "AI Suggested Price Calculated",
        "Recommended Commission Rate",
        "Conversion Probability Estimated",
      ],
    },
    {
      phase: "Creative Production",
      icon: "ðŸŽ¬",
      actions: [
        "Storyboard Generated",
        "Ad Variations Created",
        "Audio & Hashtags Selected",
        "Emotional Triggers Identified",
      ],
    },
    {
      phase: "Campaign Setup",
      icon: "âš™ï¸",
      actions: [
        "Budget Allocation Suggested",
        "Influencer Matching Done",
        "Timeline Configured",
      ],
    },
    {
      phase: "Final Review",
      icon: "ðŸ“",
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
        ðŸ—‚ï¸ Campaign Timeline
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
                  <span className="text-green-600 font-bold">âœ”</span>
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

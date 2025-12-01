// ============================================================================
// ðŸ’š Core4.AI â€“ CreativeCenter.jsx (v7 Final)
// ----------------------------------------------------------------------------
// AI Creative Suite for merchants:
// â€¢ AI Headline Generator
// â€¢ Angles & Hooks
// â€¢ Storyboard Blocks
// â€¢ Creative Variations
// ============================================================================

import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function CreativeCenter() {
  const [productName, setProductName] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    if (!productName.trim()) return;

    setLoading(true);
    setIdeas([]);

    // Mock AI output â€” replace with backend call later
    setTimeout(() => {
      setIdeas([
        {
          idea: `â€œTop Reason to Love ${productName}â€`,
          hook: "Unlock the hidden advantage people often overlook!",
          angle: "Emotional Transformation",
          hashtag: "#Core4AI #SmartShopping #AIAds",
        },
        {
          idea: `â€œWhy ${productName} is Going Viral in Saudi Arabia ðŸ‡¸ðŸ‡¦â€`,
          hook: "Hint: Itâ€™s not what you think!",
          angle: "Social Proof + Trend Hijacking",
          hashtag: "#SaudiTrends #AIForCreators",
        },
        {
          idea: `â€œOne feature in ${productName} that beats all competitorsâ€`,
          hook: "A side-by-side breakdown with hard numbers",
          angle: "Rational Comparison",
          hashtag: "#TechReview #DeepDive",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Creative Studio</h1>
        <p className="text-gray-500 mt-1">
          Auto-generate storyboards, hooks, and campaign ideas using AI.
        </p>
      </div>

      {/* Input Block */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Generate Ideas</h2>

        <input
          type="text"
          placeholder="Enter product nameâ€¦"
          className="w-full p-3 rounded-lg border bg-gray-50"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <button
          onClick={generateIdeas}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <SparklesIcon className="w-5 h-5" />
          {loading ? "Generating..." : "Generate Creative Ideas"}
        </button>
      </div>

      {/* AI Output */}
      <div className="space-y-6">
        {ideas.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow space-y-2"
          >
            <p className="text-lg font-semibold text-gray-900">{item.idea}</p>

            <div className="text-gray-700">
              <span className="font-bold">Hook:</span> {item.hook}
            </div>

            <div className="text-gray-700">
              <span className="font-bold">Angle:</span> {item.angle}
            </div>

            <div className="text-gray-500 text-sm">
              <span className="font-bold">Hashtags:</span> {item.hashtag}
            </div>
          </motion.div>
        ))}

        {!loading && ideas.length === 0 && (
          <p className="text-gray-400 text-center">
            Start by typing a product name aboveâ€¦
          </p>
        )}
      </div>
    </div>
  );
}

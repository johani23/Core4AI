// ============================================================================
// ðŸ’š Core4.AI â€“ CampaignCenter.jsx (v5 â€œAI Campaign Builderâ€)
// ----------------------------------------------------------------------------
// â€¢ Build campaigns using AI hooks, targeting blocks, and creative ideas
// â€¢ Fully modular and connected to Merchant Hub v3
// â€¢ Replace mock AI with backend later
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MegaphoneIcon,
  SparklesIcon,
  UsersIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

export default function CampaignCenter() {
  const [product, setProduct] = useState("");
  const [ideas, setIdeas] = useState([]);

  const generate = () => {
    if (!product.trim()) return;

    setIdeas([]);

    setTimeout(() => {
      setIdeas([
        {
          hook: `â€œWhy ${product} is trending this weekâ€¦â€`,
          angle: "Saudi Trend Pulse",
          audience: "Men 18â€“34 â€¢ High engagement â€¢ TikTok/IG",
        },
        {
          hook: `â€œOne feature in ${product} creators LOVEâ€¦â€`,
          angle: "Creator Advantage",
          audience: "Content Creators â€¢ Early adopters",
        },
        {
          hook: `â€œHow ${product} saves you time everydayâ€`,
          angle: "Utility Transformation",
          audience: "Gen-Z â€¢ University Students",
        },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Campaign Builder
        </h1>
        <p className="text-gray-500 mt-1">
          Generate AI-powered campaign ideas and launch strategies.
        </p>
      </div>

      {/* INPUT */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MegaphoneIcon className="w-6 h-6 text-green-600" />
          Generate Campaign Blueprint
        </h2>

        <input
          type="text"
          placeholder="Enter product nameâ€¦"
          className="w-full p-3 rounded-lg border bg-gray-50"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <button
          onClick={generate}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <SparklesIcon className="w-5 h-5" />
          Generate Blueprint
        </button>
      </div>

      {/* RESULTS */}
      <div className="space-y-6">
        {ideas.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow p-6 space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-900">{item.hook}</h3>

            <div className="text-gray-700">
              <strong>Angle:</strong> {item.angle}
            </div>

            <div className="text-gray-700 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-500" />
              <span>
                <strong>Target Audience:</strong> {item.audience}
              </span>
            </div>

            <div className="text-gray-500 text-sm pt-2 border-t">
              <CursorArrowRaysIcon className="w-4 h-4 inline-block mr-1" />
              Ready for export to TikTok Ads / Meta Ads.
            </div>
          </motion.div>
        ))}

        {!ideas.length && (
          <p className="text-gray-400 text-center">Start by entering a product nameâ€¦</p>
        )}
      </div>
    </div>
  );
}

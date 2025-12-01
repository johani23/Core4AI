// ======================================================================
// ðŸ’š InfluencerSelection.jsx â€” Saudi Premium
// ======================================================================

import React, { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { dummyInfluencers } from "@/data/dummyInfluencers";
import { motion } from "framer-motion";

export default function InfluencerSelection() {
  const [selected, setSelected] = useState([]);

  const toggle = (inf) => {
    let updated = [...selected];

    if (updated.find((i) => i.id === inf.id)) {
      updated = updated.filter((i) => i.id !== inf.id);
    } else {
      updated.push(inf);
    }

    setSelected(updated);
    localStorage.setItem("core4ai_selected_influencers", JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper">

      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-purple-600 mb-6">
        Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙŠÙ†
      </h1>

      <p className="text-gray-600 mb-8">
        Ø§Ø®ØªØ± Ø§Ù„Ù…Ø¤Ø«Ø± Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ Ù„Ù…Ù†ØªØ¬Ùƒ. (Ø¨ÙŠØ§Ù†Ø§Øª ØªØ¬Ø±ÙŠØ¨ÙŠØ©)
      </p>

      {dummyInfluencers.map((inf) => (
        <motion.div
          key={inf.id}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="core-card mb-4 flex items-center justify-between"
        >
          <div>
            <p className="font-bold text-lg text-gray-800">{inf.name}</p>
            <p className="text-sm text-gray-600">{inf.followers} Ù…ØªØ§Ø¨Ø¹</p>
            <p className="text-xs text-gray-500">{inf.category}</p>
          </div>

          <div className="text-right">
            <p className="text-green-700 font-bold text-lg">{inf.price} Ø±ÙŠØ§Ù„</p>

            <button
              className={`mt-2 px-4 py-2 rounded-xl font-bold text-white ${
                selected.find((i) => i.id === inf.id)
                  ? "bg-red-500"
                  : "bg-green-600"
              }`}
              onClick={() => toggle(inf)}
            >
              {selected.find((i) => i.id === inf.id) ? "Ø¥Ø²Ø§Ù„Ø©" : "Ø¥Ø¶Ø§ÙØ©"}
            </button>
          </div>
        </motion.div>
      ))}

      <button
        className="btn-green w-full mt-8"
        onClick={() => (window.location.href = "/merchant/campaign-summary")}
      >
        Ø§Ù„ØªØ§Ù„ÙŠ
      </button>
    </div>
  );
}

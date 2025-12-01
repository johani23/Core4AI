// ============================================================
// ðŸ’Ž Core4.AI â€“ MerchantTour.jsx  
// v2.2 â€œBeta Merchant Journey â€“ Value, ROI, Intelligenceâ€
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MerchantTour() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: "ðŸ§²",
      title: "Discover High-Impact Creators",
      text: "Creators are ranked using Core4.AI's D-Index â€” ensuring real influence, not inflated metrics.",
    },
    {
      icon: "ðŸŽ¯",
      title: "Launch Precision Campaigns",
      text: "Target tribes where trust is already established â€” reduce risk and increase ROI.",
    },
    {
      icon: "ðŸ’Ž",
      title: "Pay Only for Real Value",
      text: "Merchants pay for cognitive/behavioral signals, not random impressions.",
    },
    {
      icon: "ðŸ“Š",
      title: "Track Live Merchant ROI",
      text: "Monitor campaign value, impact, and tribal traction directly in the Merchant Hub.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-8 py-14 flex flex-col items-center">

      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Merchant Tour
      </motion.h1>

      <div className="w-full max-w-3xl space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-yellow-500 transition"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl">{s.icon}</span>
              <h2 className="text-xl font-semibold">{s.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => navigate("/home")}
        className="mt-10 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-yellow-500/40 transition"
        whileHover={{ scale: 1.05 }}
      >
        Enter Merchant Hub
      </motion.button>
    </div>
  );
}

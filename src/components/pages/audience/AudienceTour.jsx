// ============================================================
// ðŸ’Ž Core4.AI â€“ AudienceTour.jsx  
// v2.3 â€œBeta Optimized â€“ Value-First Experienceâ€
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AudienceTour() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: "ðŸ‘ï¸",
      title: "See High-Value Content",
      text: "Discover posts ranked by real cognitive and emotional impact â€” not vanity metrics.",
    },
    {
      icon: "ðŸ§­",
      title: "Follow Smart Tribes",
      text: "Each tribe is a mastery domain. Following tribes tailors your entire experience.",
    },
    {
      icon: "âš¡",
      title: "Influence the Ecosystem",
      text: "Your votes and engagement boost meaningful creators and push down low-value noise.",
    },
    {
      icon: "ðŸš€",
      title: "Upgrade Anytime",
      text: "Switch into Creator Mode whenever you're ready â€” your audience history builds credibility.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-8 py-14 flex flex-col items-center">

      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Audience Tour
      </motion.h1>

      <div className="w-full max-w-3xl space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-purple-500 transition"
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
        className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-pink-500/40 transition"
        whileHover={{ scale: 1.05 }}
      >
        Enter Platform
      </motion.button>
    </div>
  );
}

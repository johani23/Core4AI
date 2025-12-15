// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreatorTour.jsx  
// v2.3 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œBeta Creator Journey ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Clean, Clear, High-ConversionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
// ============================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CreatorTour() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª",
      title: "10-Post Calibration",
      text: "Your first 10 posts train the AI to understand your unique cognitive signature.",
    },
    {
      icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬",
      title: "Join Your Mastery Tribe",
      text: "Creators are matched with tribes based on content strength, clarity, and domain value.",
    },
    {
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ",
      title: "Boost Your Influence",
      text: "Your posts generate D-Index scores that power your visibility and credibility.",
    },
    {
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°",
      title: "Earn High-Value Tokens",
      text: "Creators with high mastery earn premium tokens used by merchants for paid collabs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-8 py-14 flex flex-col items-center">

      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Creator Tour
      </motion.h1>

      <div className="w-full max-w-3xl space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-purple-400 transition"
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
        className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-400/40 transition"
        whileHover={{ scale: 1.05 }}
      >
        Enter Creator Mode
      </motion.button>
    </div>
  );
}



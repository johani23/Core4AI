// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TourMenu.jsx
// v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUnified Tour Menu (Audience / Creator / Merchant)ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean Apple-style cards
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Works with App.jsx v7.6
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Each card routes to the correct Tour
// ============================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TourMenu() {
  const navigate = useNavigate();

  const tours = [
    {
      title: "Audience Tour",
      subtitle: "Explore content, join tribes, and influence rankings.",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
      route: "/tour/audience",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Creator Tour",
      subtitle: "Learn how to build mastery and earn high-value tokens.",
      icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬",
      route: "/tour/creator",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Merchant Tour",
      subtitle: "Run smart campaigns and work with high-impact creators.",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
      route: "/tour/merchant",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-8 py-16 flex flex-col items-center">

      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Your Core4.AI Tour
      </motion.h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">

        {tours.map((t, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(t.route)}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.04 }}
            className={`cursor-pointer bg-gray-900/60 border border-gray-800 rounded-2xl p-8 
                        shadow-lg hover:shadow-xl hover:border-purple-400 transition flex flex-col`}
          >
            
            <div className={`text-5xl mb-4 bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
              {t.icon}
            </div>

            <h2 className="text-2xl font-bold mb-2">{t.title}</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {t.subtitle}
            </p>

            <button
              className={`mt-auto px-5 py-2 rounded-full text-sm font-semibold 
                          bg-gradient-to-r ${t.gradient} shadow-md`}
            >
              Start {t.title}
            </button>
          </motion.div>
        ))}

      </div>

      {/* Skip CTA */}
      <motion.button
        onClick={() => navigate("/home")}
        whileHover={{ scale: 1.05 }}
        className="mt-12 text-gray-300 hover:text-white transition underline"
      >
        Skip ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Enter Platform
      </motion.button>

    </div>
  );
}



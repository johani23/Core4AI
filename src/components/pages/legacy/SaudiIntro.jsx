// ============================================================
// ðŸ’šðŸ‡¸ðŸ‡¦ Core4.AI â€“ SaudiIntro.jsx (v1.0 â€œSaudi Launch Screenâ€)
// ------------------------------------------------------------
// â€¢ Shows Saudi flag + geolocation
// â€¢ Lightweight, fast, TikTok-style welcome
// â€¢ Auto continues to TourMenu
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SaudiIntro() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setCountry(data.country_name || "your region"))
      .catch(() => setCountry("your region"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-6">

      {/* Saudi Flag */}
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-32 mb-6 drop-shadow-xl"
      />

      {/* Welcome Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-3xl font-bold text-green-400"
      >
        Ø£Ù‡Ù„Ø§Ù‹ ÙˆØ³Ù‡Ù„Ø§Ù‹ Ø¨Ùƒ ðŸ‘‹
      </motion.h1>

      {/* User Location */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-300 mt-3"
      >
        Ù† detected that you're visiting from:  
        <span className="text-green-300 font-semibold"> {country}</span>
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={() => navigate("/tour")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 bg-green-600 text-white px-8 py-3 rounded-full 
                   text-lg font-semibold shadow-lg hover:bg-green-500 transition"
      >
        Ø§Ø¨Ø¯Ø£ ØªØ¬Ø±Ø¨ØªÙŠ
      </motion.button>

    </div>
  );
}

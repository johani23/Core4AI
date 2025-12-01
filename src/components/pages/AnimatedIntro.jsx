// ============================================================
// âš¡ Core4.AI â€“ AnimatedIntro.jsx (v1.0 â€œTikTok High-Impact Introâ€)
// ------------------------------------------------------------
// â€¢ Neon animation
// â€¢ Floating particles
// â€¢ Auto-continue in 3.5 seconds
// ============================================================

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AnimatedIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/saudi"), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Floating particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#2b005b_0%,_transparent_60%)] opacity-40 animate-pulse"></div>

      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text
                   bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide z-10"
      >
        Core4.AI
      </motion.h1>

      {/* Light streak */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 300, opacity: 0.9 }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
        className="absolute top-1/2 w-40 h-1 bg-pink-500 blur-md"
      />
    </div>
  );
}

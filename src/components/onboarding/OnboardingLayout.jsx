import React from "react";
import { motion } from "framer-motion";

export default function OnboardingLayout({ children }) {
  return (
    <div
      className="min-h-screen w-full text-white flex justify-center items-start px-6 py-12"
      style={{
        background: "linear-gradient(135deg, #050505, #0a0014, #120026)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-[#0d0d16]/60 backdrop-blur-xl border border-purple-500/40 shadow-[0_0_25px_rgba(186,0,255,0.3)] rounded-3xl p-10"
        style={{ direction: "rtl" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

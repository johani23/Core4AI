import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ step }) {
  const pct = {
    1: "25%",
    2: "50%",
    3: "75%",
    4: "100%",
  }[step];

  return (
    <div className="w-full mb-10">
      <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: pct }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_12px_rgba(255,0,200,0.7)]"
        />
      </div>

      <p className="text-gray-400 text-sm mt-2 text-right">
        الخطوة {step} من ٤
      </p>
    </div>
  );
}

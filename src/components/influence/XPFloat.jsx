import { motion } from "framer-motion";
import React from "react";

export default function XPFloat({ amount }) {
  return (
    <motion.div
      className="absolute right-6 top-6 text-yellow-300 font-bold text-lg"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: -40 }}
      transition={{ duration: 1.2 }}
      style={{ pointerEvents: "none" }}
    >
      +{amount} XP
    </motion.div>
  );
}

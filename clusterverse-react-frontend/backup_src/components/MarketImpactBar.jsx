import React from "react";
import { motion } from "framer-motion";

export default function MarketImpactBar({ impact = 0 }) {
  const positive = impact > 0;
  const color = positive ? "bg-green-500" : "bg-red-500";
  const width = Math.min(Math.abs(impact) * 1000, 100); // scale visual length

  return (
    <div className="flex items-center space-x-2 mt-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.8 }}
        className={`h-2 rounded-full ${color}`}
      />
      <span className={`text-xs ${positive ? "text-green-600" : "text-red-600"}`}>
        {positive ? "+" : "-"}{(impact * 100).toFixed(2)}%
      </span>
    </div>
  );
}

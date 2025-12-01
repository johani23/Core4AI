// ============================================================================
// 💚 Core4.AI – InfluenceRing (Sama Motion Edition)
// ============================================================================

import React from "react";
import { motion } from "framer-motion";

export default function InfluenceRing({ score, max = 200 }) {
  const pct = Math.min(score / max, 1);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * pct;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Back circle */}
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      {/* Animated ring */}
      <svg className="absolute w-full h-full rotate-[-90deg]">
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#9b5cff" />
            <stop offset="100%" stopColor="#4cffb0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center number */}
      <div className="absolute text-center">
        <div className="text-white text-2xl font-bold">{score}</div>
        <div className="text-gray-400 text-xs mt-1">Influence</div>
      </div>
    </div>
  );
}

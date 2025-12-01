import React from "react";
import { motion } from "framer-motion";

export default function PowerRing({ dindex, earnings, activity }) {
  const size = 170;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // D-Index controls the stroke progress
  const progress = Math.min(dindex / 100, 1) * circumference;

  // Earnings controls ring color
  const ringColor =
    earnings > 200
      ? "#4ade80" // green
      : earnings > 50
      ? "#facc15" // yellow
      : "#f472b6"; // pink

  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <motion.svg
        width={size}
        height={size}
        animate={{
          scale: activity ? [1, 1.06, 1] : 1,
        }}
        transition={{
          duration: activity ? 0.9 : 0,
          repeat: activity ? Infinity : 0,
        }}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333"
          strokeWidth="12"
          fill="transparent"
        />

        {/* Animated foreground ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          animate={{
            strokeDashoffset: circumference - progress,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Text inside ring */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill={ringColor}
          fontSize="28"
          fontWeight="bold"
        >
          {dindex}
        </text>
      </motion.svg>
    </div>
  );
}

// ============================================================================
// 🎮 TribeLifecycleProgress.jsx 
// Fortnite / Duolingo Gamified Lifecycle Progress (Spot → Assess → Develop → Recruit → Motivate)
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Flame, Zap, Award, Rocket } from "lucide-react";

// Stage Definitions
const stages = [
  {
    key: "spot",
    label: "Spot",
    color: "from-blue-500 to-blue-700",
    icon: <Zap size={26} />,
  },
  {
    key: "assess",
    label: "Assess",
    color: "from-purple-500 to-purple-700",
    icon: <CheckCircle size={26} />,
  },
  {
    key: "develop",
    label: "Develop",
    color: "from-green-500 to-green-700",
    icon: <Flame size={26} />,
  },
  {
    key: "recruit",
    label: "Recruit",
    color: "from-orange-500 to-orange-700",
    icon: <Rocket size={26} />,
  },
  {
    key: "motivate",
    label: "Motivate",
    color: "from-red-500 to-pink-600",
    icon: <Award size={26} />,
  },
];

export default function TribeLifecycleProgress({ currentStage, progress }) {
  // progress = 0–100 (percentage through current stage)

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
        🚀 Tribe Member Journey
      </h2>

      <div className="flex items-center justify-between gap-3">
        {stages.map((stage, index) => {
          const isActive = stage.key === currentStage;
          const isCompleted =
            stages.findIndex((s) => s.key === currentStage) > index;

          return (
            <div
              key={stage.key}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Stage Bubble */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isCompleted ? 0.9 : isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.35 }}
                className={`
                  w-14 h-14 flex items-center justify-center rounded-full shadow-xl 
                  bg-gradient-to-br ${stage.color}
                  border-4 ${
                    isCompleted
                      ? "border-yellow-300"
                      : isActive
                      ? "border-white"
                      : "border-gray-300"
                  }
                  text-white font-bold
                `}
              >
                {stage.icon}
              </motion.div>

              {/* Label */}
              <div className="mt-2 text-sm font-semibold text-gray-800">
                {stage.label}
              </div>

              {/* Progress bar under active stage */}
              {isActive && (
                <div className="w-full mt-2">
                  <div className="h-2 bg-gray-300 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${stage.color}`}
                    ></motion.div>
                  </div>

                  <div className="text-xs text-gray-600 mt-1 text-center">
                    {progress}% to next stage
                  </div>
                </div>
              )}

              {/* Completed checkmark */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full p-1 text-xs font-bold shadow-md"
                >
                  ✓
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

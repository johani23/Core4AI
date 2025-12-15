// ============================================================================
// 💚 Core4.AI – TribeChallenges.jsx (Pro Version – MVP v1)
// ----------------------------------------------------------------------------
// Displays all tribe challenges with completion actions
// Fully integrated with TribeContext
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeChallenges() {
  const { challenges, completeChallenge } = useTribe();

  return (
    <div className="space-y-4" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-300">تحديات القبيلة 🎯</h2>

      {challenges.map((c) => (
        <div
          key={c.id}
          className={`p-5 rounded-xl border transition ${
            c.completed
              ? "bg-green-900/20 border-green-600"
              : "bg-white/5 border-white/10 hover:border-purple-500 hover:bg-white/10"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Challenge text */}
            <div>
              <p className="text-lg font-semibold">{c.title}</p>
              <p className="text-sm text-gray-400">{c.reward} XP</p>
            </div>

            {/* Button / Completed badge */}
            {c.completed ? (
              <span className="text-green-400 font-bold text-lg">✓ مكتمل</span>
            ) : (
              <button
                onClick={() => completeChallenge(c.id)}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition font-semibold"
              >
                إكمال
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 💡 Core4.AI – StepSummary.jsx (Clean UTF-8, Final v5)
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useOnboardingStore } from "../../state/onboardingStore";

import {
  calculateDataMaturity,
  calculateInnovationMaturity,
  calculateTribeMatch,
} from "../utils/calculateScores";

export default function StepSummary() {
  const navigate = useNavigate();

  const {
    identity,
    cognitive,
    innovation,
    setDataMaturity,
    setInnovationMaturity,
    setTribeMatch,
  } = useOnboardingStore();

  const dm = calculateDataMaturity(cognitive);
  const im = calculateInnovationMaturity(innovation);
  const tribe = calculateTribeMatch(identity, cognitive, innovation);

  setDataMaturity(dm);
  setInnovationMaturity(im);
  setTribeMatch(tribe);

  return (
    <div style={{ direction: "rtl" }}>
      <ProgressBar step={4} />

      <h2 className="text-3xl font-bold mb-6 text-purple-300">
        خلاص! هذي هويتك داخل Core4.AI ✨
      </h2>

      <div className="bg-[#121225] border border-purple-500/30 p-6 rounded-xl mb-8 text-white space-y-3">
        <p>📊 مستوى الوعي الرقمي: {dm}</p>
        <p>💡 مستوى الإبداع: {im}</p>
        <p>🤝 القبيلة المناسبة لك: {tribe}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white"
      >
        دخول Core4.AI →
      </button>
    </div>
  );
}

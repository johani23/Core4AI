// ============================================================================
// 💡 Core4.AI – Onboarding.jsx (Stable v10, UTF-8 Clean)
// ============================================================================

import { Routes, Route, Navigate } from "react-router-dom";

import StepIdentity from "./StepIdentity";
import StepCognitive from "./StepCognitive";
import StepInnovation from "./StepInnovation";
import StepSummary from "./StepSummary";

export default function Onboarding() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="identity" replace />} />

      {/* Steps */}
      <Route path="identity" element={<StepIdentity />} />
      <Route path="cognitive" element={<StepCognitive />} />
      <Route path="innovation" element={<StepInnovation />} />
      <Route path="summary" element={<StepSummary />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="identity" replace />} />
    </Routes>
  );
}

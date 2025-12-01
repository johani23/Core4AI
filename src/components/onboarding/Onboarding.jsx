import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import StepIdentity from "./StepIdentity";
import StepCognitive from "./StepCognitive";
import StepInnovation from "./StepInnovation";
import StepSummary from "./StepSummary";   // ? ??? ????
import OnboardingLayout from "./OnboardingLayout";

export default function Onboarding() {
  return (
    <OnboardingLayout>
      <Routes>

        {/* default redirect */}
        <Route path="/" element={<Navigate to="identity" replace />} />

        {/* steps */}
        <Route path="identity" element={<StepIdentity />} />
        <Route path="cognitive" element={<StepCognitive />} />
        <Route path="innovation" element={<StepInnovation />} />
        <Route path="summary" element={<StepSummary />} />  {/* ? ??? ???? ?? ????? ???? */}

        {/* fallback */}
        <Route path="*" element={<Navigate to="identity" replace />} />

      </Routes>
    </OnboardingLayout>
  );
}

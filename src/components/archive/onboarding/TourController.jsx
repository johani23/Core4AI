// ============================================================
// ðŸ’Ž Core4.AI â€“ TourController.jsx (v1.0 â€œBeta Users Engineâ€)
// ------------------------------------------------------------
// ðŸ§  Central hub for ALL tours:
//    - Creator Tour
//    - Merchant Tour
//    - Audience Tour
//    - Dynamic D-Index / Merchant ROI tooltips
// ------------------------------------------------------------
// ðŸš€ Handles:
//    - Auto-run per userRole
//    - LocalStorage tracking
//    - Safe re-triggering from /tour page
// ============================================================

import React, { useEffect } from "react";
import CreatorTour from "./tours/CreatorTour";
import MerchantTour from "./tours/MerchantTour";
import AudienceTour from "./tours/AudienceTour";
import DynamicPulseTour from "./tours/DynamicPulseTour";

export default function TourController({ userRole, manualStart }) {
  const LS_KEY = "core4ai_tours";

  // ------------------------------------------------------------
  // Load saved state
  // ------------------------------------------------------------
  const tourState = JSON.parse(localStorage.getItem(LS_KEY) || "{}");

  const saveState = (data) =>
    localStorage.setItem(LS_KEY, JSON.stringify({ ...tourState, ...data }));

  // ------------------------------------------------------------
  // Auto-run logic by role
  // ------------------------------------------------------------
  useEffect(() => {
    if (manualStart === true) return; // tour page start only

    if (userRole === "creator" && !tourState.creatorDone) {
      saveState({ creatorDone: true });
      window.dispatchEvent(new Event("start_creator_tour"));
    }

    if (userRole === "merchant" && !tourState.merchantDone) {
      saveState({ merchantDone: true });
      window.dispatchEvent(new Event("start_merchant_tour"));
    }

    if (userRole === "buyer" && !tourState.audienceDone) {
      saveState({ audienceDone: true });
      window.dispatchEvent(new Event("start_audience_tour"));
    }
  }, [userRole]);

  // ------------------------------------------------------------
  // Dynamic Tooltip Events
  // ------------------------------------------------------------
  useEffect(() => {
    window.dispatchEvent(new Event("start_dynamic_tour"));
  }, []);

  // ------------------------------------------------------------
  // Render all tours, each listens to its own event
  // ------------------------------------------------------------
  return (
    <>
      <CreatorTour />
      <MerchantTour />
      <AudienceTour />
      <DynamicPulseTour />
    </>
  );
}

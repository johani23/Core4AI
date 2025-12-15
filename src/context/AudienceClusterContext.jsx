// ============================================================================
// 💚 Core4.AI – AudienceClusterContext.jsx
// Hybrid ML Engine (Pseudo K-Means for Market Segmentation)
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const AudienceClusterContext = createContext();
export const useAudienceCluster = () => useContext(AudienceClusterContext);

export default function AudienceClusterProvider({ children }) {
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem("core4ai_audience_responses") || "null")
  );

  const [clusters, setClusters] = useState(
    JSON.parse(localStorage.getItem("core4ai_clusters") || "null")
  );

  // ---------------------------------------------------------------------------
  // 1) Save user inputs (Audience-related survey)
  // ---------------------------------------------------------------------------
  function saveAudienceResponses(data) {
    setResponses(data);
    localStorage.setItem("core4ai_audience_responses", JSON.stringify(data));
  }

  // ---------------------------------------------------------------------------
  // 2) Hybrid ML Clustering Engine (3 Clusters)
  // ---------------------------------------------------------------------------
  function generateClusters() {
    if (!responses) return null;

    const {
      price_sensitivity, // 1–10
      feature_interest,  // 1–10
      urgency_score,     // 1–10
      budget_range,      // Number (e.g., 80–200)
    } = responses;

    // Normalize to 0–1
    const P = price_sensitivity / 10;
    const F = feature_interest / 10;
    const U = urgency_score / 10;

    // ========================================================================
    // CLUSTER 1 — HIGH VALUE BUYERS
    // ========================================================================
    const clusterHigh = {
      id: "high_value",
      type: "high",
      label: "الكتلة ذات القيمة العالية",
      meaning:
        "هذه الشريحة لديها قدرة شرائية قوية واهتمام مباشر بالمنتج، وتمثل أعلى عائد متوقع للحملة.",
      price: Math.round(budget_range * 0.85),
      size: "35%",
      sensitivity: P,
      featureAlignment: F,
      urgency: U,
      expectedSales: Math.round((F + U) * 300),
    };

    clusterHigh.expectedRevenue =
      clusterHigh.price * clusterHigh.expectedSales;

    clusterHigh.roi = Math.round(
      (clusterHigh.expectedRevenue / 10000) * 100
    );

    // ========================================================================
    // CLUSTER 2 — MID VALUE BUYERS
    // ========================================================================
    const clusterMid = {
      id: "mid_value",
      type: "mid",
      label: "الكتلة المتوسطة",
      meaning:
        "هذه الشريحة لديها اهتمام جيد بالمنتج، ولكن تحتاج قيمة واضحة وسعر مناسب لاتخاذ قرار الشراء.",
      price: Math.round(budget_range * 0.65),
      size: "45%",
      sensitivity: P * 0.8,
      featureAlignment: F * 0.7,
      urgency: U * 0.6,
      expectedSales: Math.round((F * 0.8 + U * 0.6) * 220),
    };

    clusterMid.expectedRevenue =
      clusterMid.price * clusterMid.expectedSales;

    clusterMid.roi = Math.round(
      (clusterMid.expectedRevenue / 10000) * 100
    );

    // ========================================================================
    // CLUSTER 3 — PRICE SENSITIVE BUYERS
    // ========================================================================
    const clusterLow = {
      id: "price_sensitive",
      type: "low",
      label: "الكتلة الحساسة للسعر",
      meaning:
        "هذه الشريحة مهتمة بالمنتج ولكن السعر يشكل عائقاً أساسياً، وتستجيب عادة للخصومات البسيطة.",
      price: Math.round(budget_range * 0.45),
      size: "20%",
      sensitivity: P * 1.2,
      featureAlignment: F * 0.9,
      urgency: U * 0.4,
      expectedSales: Math.round((F * 0.9) * 160),
    };

    clusterLow.expectedRevenue =
      clusterLow.price * clusterLow.expectedSales;

    clusterLow.roi = Math.round(
      (clusterLow.expectedRevenue / 10000) * 100
    );

    // ========================================================================
    // FINAL CLUSTERS (sorted by ROI)
    // ========================================================================
    const result = [clusterHigh, clusterMid, clusterLow].sort(
      (a, b) => b.roi - a.roi
    );

    localStorage.setItem("core4ai_clusters", JSON.stringify(result));
    setClusters(result);

    return result;
  }

  // ---------------------------------------------------------------------------
  // 3) Clear clusters (reset)
  // ---------------------------------------------------------------------------
  function clearClusters() {
    localStorage.removeItem("core4ai_clusters");
    setClusters(null);
  }

  return (
    <AudienceClusterContext.Provider
      value={{
        responses,
        clusters,
        saveAudienceResponses,
        generateClusters,
        clearClusters,
      }}
    >
      {children}
    </AudienceClusterContext.Provider>
  );
}

// ============================================================================
// 💚 Core4.AI – AudienceContext v3 (5-Cluster ML + 6-Input Intelligence)
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const AudienceContext = createContext();
export const useAudience = () => useContext(AudienceContext);

export default function AudienceProvider({ children }) {
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem("core4ai_audience_responses") || "null")
  );

  const [clusters, setClusters] = useState(
    JSON.parse(localStorage.getItem("core4ai_clusters") || "null")
  );

  // AUTO-MOCK (for MVP Testing)
  React.useEffect(() => {
    if (!responses) {
      const mock = {
        price_sensitivity: 6,
        feature_interest: 8,
        urgency_score: 7,
        budget_range: 180,
        awareness_score: 5,
        trust_score: 6,
      };
      saveAudienceResponses(mock);
    }
  }, []);

  function saveAudienceResponses(data) {
    setResponses(data);
    localStorage.setItem("core4ai_audience_responses", JSON.stringify(data));
  }

  // ========================================================================
  // GENERATE 5 ML-STYLE CLUSTERS
  // ========================================================================
  function generateClusters() {
    if (!responses) return null;

    const {
      price_sensitivity,
      feature_interest,
      urgency_score,
      budget_range,
      awareness_score,
      trust_score,
    } = responses;

    const P = price_sensitivity / 10;
    const F = feature_interest / 10;
    const U = urgency_score / 10;
    const A = awareness_score / 10;
    const T = trust_score / 10;

    // Helper: Purchase Likelihood
    const L = (F * 0.35 + U * 0.25 + A * 0.2 + T * 0.2) * (1 - P);

    function buildCluster({ id, label, meaning, priceFactor, volFactor }) {
      const price = Math.round(budget_range * priceFactor);
      const expectedVolume = Math.round(volFactor * L * 100);
      const expectedRevenue = price * expectedVolume;
      return {
        id,
        label,
        meaning,
        price,
        expectedVolume,
        expectedRevenue,
        roi: expectedRevenue,
        likelihood: Math.round(L * 100),
      };
    }

    // 1) HIGH ROI
    const c1 = buildCluster({
      id: "c_high",
      label: "شريحة العائد العالي",
      meaning: "أعلى احتمالية شراء — يعرفون المنتج ويثقون به.",
      priceFactor: 0.90,
      volFactor: 5.0,
    });

    // 2) VALUE SEEKERS
    const c2 = buildCluster({
      id: "c_value",
      label: "شريحة الباحثين عن قيمة",
      meaning: "يرون المنتج ذو قيمة عالية — يحتاجون إثبات واضح للميزات.",
      priceFactor: 0.75,
      volFactor: 4.2,
    });

    // 3) BALANCED
    const c3 = buildCluster({
      id: "c_balanced",
      label: "شريحة المشترين المتوازنين",
      meaning: "شريحة محايدة — تحتاج محتوى توضيحي وتجارب واقعية.",
      priceFactor: 0.60,
      volFactor: 3.3,
    });

    // 4) DEAL HUNTERS
    const c4 = buildCluster({
      id: "c_deal",
      label: "شريحة الباحثين عن عروض",
      meaning: "مهتمون ولكن السعر يؤثر — يستجيبون للخصومات بشكل كبير.",
      priceFactor: 0.50,
      volFactor: 3.0,
    });

    // 5) AWARENESS / LOW INTENT
    const c5 = buildCluster({
      id: "c_low",
      label: "شريحة الوعي المنخفض",
      meaning: "لا يعرفون المنتج جيداً أو لا يثقون — محتوى Awareness مطلوب.",
      priceFactor: 0.40,
      volFactor: 2.0,
    });

    const result = [c1, c2, c3, c4, c5].sort(
      (a, b) => b.expectedRevenue - a.expectedRevenue
    );

    localStorage.setItem("core4ai_clusters", JSON.stringify(result));
    setClusters(result);

    return result;
  }

  function clearClusters() {
    localStorage.removeItem("core4ai_clusters");
    setClusters(null);
  }

  return (
    <AudienceContext.Provider
      value={{
        responses,
        clusters,
        saveAudienceResponses,
        generateClusters,
        clearClusters,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
}

import React, { createContext, useContext } from "react";
import { useTribe } from "@/context/TribeContext";
import { useAudience } from "@/context/AudienceContext";

const TribeFunnelContext = createContext();
export const useTribeFunnel = () => useContext(TribeFunnelContext);

export function TribeFunnelProvider({ children }) {
  const { members = [], computeLifecycleFromXP = () => ({ stage: "spot" }) } = useTribe() || {};
  const { clusters = [] } = useAudience() || {};

  function evaluateFunnelStage(member, product) {
    if (!member) {
      return {
        member: null,
        funnelStage: "awareness",
        description: "",
        suggestedContent: "",
        cta: "",
        recommendedCluster: null,
      };
    }

    const xp = member.xp || 0;
    const { stage } = computeLifecycleFromXP(xp);

    let funnelStage = "awareness";
    let description = "";
    let content = "";
    let cta = "";
    let recommendedCluster = null;

    if (clusters.length > 0) {
      recommendedCluster = [...clusters].sort(
        (a, b) => (b.expectedRevenue || 0) - (a.expectedRevenue || 0)
      )[0];
    }

    switch (stage) {
      case "spot":
        funnelStage = "awareness";
        description = "محتوى انتشار سريع.";
        content = "Reels + Hook قوي";
        cta = "شاهد →";
        break;

      case "assess":
      case "develop":
        funnelStage = "consideration";
        description = "توجيه نحو الفهم.";
        content = "Mini review + POV";
        cta = "اعرف أكثر →";
        break;

      case "recruit":
        funnelStage = "conversion";
        description = "تشجيع الشراء.";
        content = "Offer mention + Review";
        cta = "اطلب الآن!";
        break;

      case "motivate":
        funnelStage = "advocacy";
        description = "تحويله لمؤيد.";
        content = "Testimonial";
        cta = "شارك رأيك!";
        break;
    }

    return {
      member,
      funnelStage,
      description,
      suggestedContent: content,
      cta,
      recommendedCluster,
    };
  }

  function evaluateAllMembers(product) {
    return members.map((m) => evaluateFunnelStage(m, product));
  }

  return (
    <TribeFunnelContext.Provider
      value={{
        evaluateFunnelStage,
        evaluateAllMembers,
      }}
    >
      {children}
    </TribeFunnelContext.Provider>
  );
}

export default TribeFunnelProvider;

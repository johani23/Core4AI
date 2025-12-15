// ============================================================================
// Core4.AI – BuyerRND (FINAL)
// للمشتري: عبّر عن رغبتك وتصورك عن السعر
// ============================================================================

import React, { useState } from "react";
import CorePanel from "@/components/ui/CorePanel";
import { useNavigate } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";

export default function BuyerRND() {
  const navigate = useNavigate();
  const { persona } = useAudience();

  const [featureIntent, setFeatureIntent] = useState({
    freeText: "",
    displayTech: "",
    size: "",
    useCase: "",
    event: "",
  });

  const [answers, setAnswers] = useState({
    importance: 0,
    uniqueness: 0,
    satisfaction: 0,
    bargainPrice: "",
    expensivePrice: "",
    perceivedMarketPrice: "",
  });

  const num = (v) => Number(v || 0);

  async function submit() {
    // 1) رأي المشتري (بحث تسعيري)
    await fetch("/api/rnd/value-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature_intent: featureIntent,
        importance: answers.importance,
        uniqueness: answers.uniqueness,
        satisfaction: answers.satisfaction,
        recommended_price: num(answers.bargainPrice),
        perceived_market_price: num(answers.perceivedMarketPrice),
        max_price: num(answers.expensivePrice),
        buyer_cluster: persona?.cluster ?? "عام",
      }),
    });

    // 2) إشارة طلب للسوق (للتاجر)
    await fetch("/api/market-intentions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature_text: featureIntent.freeText,
        normalized_features: featureIntent,
        target_price: num(answers.bargainPrice),
        max_price: num(answers.expensivePrice),
        time_horizon: featureIntent.event,
        buyer_cluster: persona?.cluster ?? "عام",
      }),
    });

    navigate("/buyer/dashboard");
  }

  return (
    <div className="min-h-screen p-8 bg-[#0A0F12] text-white" dir="rtl">
      <h1 className="text-3xl font-bold mb-2">قل لنا ماذا تريد</h1>
      <p className="text-gray-300 mb-8">
        اكتب رغبتك بصراحة، نحن لا نبيعك الآن، بل نفهم السوق.
      </p>

      <CorePanel className="mb-6">
        <textarea
          placeholder="مثال: تلفزيون كبير للمباريات"
          className="w-full p-3 bg-white/10 rounded"
          onChange={(e) =>
            setFeatureIntent({ ...featureIntent, freeText: e.target.value })
          }
        />
      </CorePanel>

      <CorePanel className="mb-6">
        <p className="mb-2 font-bold">برأيك، كم سعره الآن في السوق؟</p>
        <input
          type="number"
          className="w-full p-2 bg-white/10 rounded"
          onChange={(e) =>
            setAnswers({ ...answers, perceivedMarketPrice: e.target.value })
          }
        />
      </CorePanel>

      <CorePanel className="mb-6">
        <p className="mb-2 font-bold">كم سعر مناسب لك؟</p>
        <input
          type="number"
          className="w-full p-2 bg-white/10 rounded"
          onChange={(e) =>
            setAnswers({ ...answers, bargainPrice: e.target.value })
          }
        />
      </CorePanel>

      <CorePanel className="mb-6">
        <p className="mb-2 font-bold">أقصى سعر ممكن تقبله؟</p>
        <input
          type="number"
          className="w-full p-2 bg-white/10 rounded"
          onChange={(e) =>
            setAnswers({ ...answers, expensivePrice: e.target.value })
          }
        />
      </CorePanel>

      <button
        onClick={submit}
        className="w-full bg-purple-600 py-3 rounded font-bold"
      >
        إرسال الرغبة
      </button>
    </div>
  );
}

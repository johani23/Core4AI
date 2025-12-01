// ============================================================================
// 💚 Core4 حياتك – HayatikHome.jsx (v3 — Tribe Integration)
// ============================================================================

import React, { useState, useEffect } from "react";

// Components
import HayatikSuggestions from "./HayatikSuggestions";
import HayatikFlow from "./HayatikFlow";
import HayatikAutoMode from "./HayatikAutoMode";
import TribeBlock from "./TribeBlock";

export default function HayatikHome() {
  const [snapshot, setSnapshot] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [flow, setFlow] = useState(null);
  const [tribes, setTribes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHayatik();
  }, []);

  const loadHayatik = async () => {
    try {
      // Snapshot demo
      const snap = {
        mood: "مرتاح",
        needs: ["قهوة", "تنظيم اليوم", "عرض مناسب"],
        today: ["اقتراحات جديدة لك", "منتجات على حسب حياتك"],
      };

      // Smart Suggestions demo
      const sug = {
        products: [
          "منظف أرضيات ممتاز",
          "قهوة كولومبية محمصة",
          "سماعات يومية خفيفة",
        ],
        creators: ["ريم ستايل", "فهد لايف", "سارة فلو"],
        merchants: ["دانوب", "كارفور", "خدمات تنظيف"],
        lifestyle: ["روتين صباحي أسرع", "Checklist للحياة اليومية"],
      };

      // Flow demo
      const flowDemo = [
        {
          time: "الصباح",
          title: "تنظيم يومك",
          details: "اقتراحات بسيطة تساعدك تبدأ يومك بشكل أسهل.",
        },
        {
          time: "الظهر",
          title: "احتياج بسيط",
          details: "قهوة أو بريك سريع يناسب مزاجك.",
        },
        {
          time: "المساء",
          title: "راحة وهدوء",
          details: "عناصر تساعدك تنهي يومك براحة.",
        },
      ];

      // Tribe Info Demo
      const tribeInfo = {
        primary: "Adventurers",
        secondary: "Techy",

        primaryColor: "#FF6B35",
        secondaryColor: "#1E90FF",

        primaryPersonality: "تحب التغيير والتجارب وروح المغامرة.",
        secondaryPersonality: "شخص عملي يحب الذكاء والتقنيات الحديثة.",

        primaryInfluencers: ["ريناد المغامرة", "فهد ترافل"],
        secondaryInfluencers: ["تركي التقني", "سارة Digital"],
      };

      setSnapshot(snap);
      setSuggestions(sug);
      setFlow(flowDemo);
      setTribes(tribeInfo);

    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] px-6 py-8">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        Core4 <span className="text-[#4CAF9B]">حياتك</span>
      </h1>

      {/* Snapshot Card */}
      <div className="bg-[#F7F8F9] rounded-2xl shadow-sm p-6 mb-10">
        {loading ? (
          <p className="text-gray-400">...يتم التحميل</p>
        ) : (
          <>
            <h2 className="text-xl font-medium mb-3 text-[#333]">
              ملخص يومك
            </h2>

            <div className="mb-4">
              <span className="font-semibold text-[#4CAF9B]">المزاج:</span>{" "}
              {snapshot.mood}
            </div>

            <div className="mb-4">
              <span className="font-semibold text-[#4CAF9B]">
                احتياجات بسيطة:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {snapshot.needs.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-[#4CAF9B]">
                اليوم يعجبك:
              </span>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {snapshot.today.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Smart Suggestions */}
      <HayatikSuggestions data={suggestions} />

      {/* Tribe Identity Section */}
      <TribeBlock tribes={tribes} />

      {/* Daily Flow */}
      <HayatikFlow flow={flow} />

      {/* Auto Mode */}
      <HayatikAutoMode
        onActivate={() => console.log("Hayatik Auto Mode Activated")}
      />

    </div>
  );
}

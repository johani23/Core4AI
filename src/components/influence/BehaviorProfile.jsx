import React from "react";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function BehaviorProfile() {
  const { classifyInfluencer } = useInfluence();
  const profile = classifyInfluencer();

  const messages = {
    "The Builder — البنّاء": [
      "أنت مؤثر تعتمد على العمل المستمر — المحافظون مثلك يحققون أعلى النتائج على المدى الطويل.",
      "استمر في المهام اليومية، وفعّل XP Booster للحصول على قفزة كبيرة."
    ],

    "The Explorer — المستكشف": [
      "أنت تحب التجربة… وهذا واضح في معدل نموك.",
      "جرب نوع محتوى جديد الآن — خوارزميات Core4 تحب التنوع."
    ],

    "The Commander — القائد القبلي": [
      "قبيلتك تشكل جزءًا كبيرًا من قوتك.",
      "حان الوقت لرفع TribeMood عبر مشاركة محفّزة."
    ],

    "The Creator — صانع المحتوى": [
      "أقوى شيء عندك هو جودة المحتوى.",
      "كرّر أفضل فيديو عندك بأسلوب مطوّر."
    ],

    "The Momentum Rider — راكب الزخم": [
      "أنت تعرف تستغل اللحظة… أداءك ممتاز!",
      "حافظ على الزخم وفعّل Reach Booster."
    ]
  };

  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl mt-6" dir="rtl">
      <h2 className="text-lg font-bold text-purple-300 mb-3">شخصية تأثيرك 🎭</h2>
      <div className="text-white font-semibold mb-3">{profile.type}</div>

      <ul className="space-y-2 text-sm text-gray-300">
        {messages[profile.type].map((m, i) => (
          <li key={i} className="bg-white/5 p-3 rounded-lg border border-white/10">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

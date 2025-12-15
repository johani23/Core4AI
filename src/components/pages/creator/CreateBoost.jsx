// ============================================================================
// 💚 Core4.AI — CreateBoost PRO (v4 FINAL)
// AI-Powered Boost Engine — Designed by Sama, Engineered by Noor
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Users,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function CreateBoost() {
  const [boostLevel, setBoostLevel] = useState(null);
  const [estimatedReach, setEstimatedReach] = useState(null);
  const [cost, setCost] = useState(null);
  const [summary, setSummary] = useState(null);

  const levels = [
    {
      id: "basic",
      label: "Boost خفيف",
      reach: "4K – 8K",
      cost: 19,
      color: "bg-blue-500",
      desc: "مناسب لرفع الظهور الأساسي.",
    },
    {
      id: "plus",
      label: "Boost Plus",
      reach: "10K – 25K",
      cost: 45,
      color: "bg-purple-600",
      desc: "أفضل توازن بين التكلفة والمدى.",
    },
    {
      id: "pro",
      label: "Boost Pro",
      reach: "30K – 80K",
      cost: 99,
      color: "bg-pink-600",
      desc: "أقصى مدى وصول + دفع قوي للانتشار.",
    },
  ];

  const handleSelect = (lvl) => {
    setBoostLevel(lvl.id);
    setEstimatedReach(lvl.reach);
    setCost(lvl.cost);
    setSummary({
      message: `سيتم تعزيز منشورك ليصل إلى ${lvl.reach} مستخدم.`,
      tribeFit: "Techy Tribe — 92%",
      bestTime: "6:00 PM – 8:00 PM",
      tips: [
        "استخدم ريلز قصيرة لزيادة فاعلية التعزيز.",
        "أضف هاشتاق Tribes المناسب لتحسين النتائج.",
        "استغل الساعات الذهبية للنشر.",
      ],
    });
  };

  const BoostCard = ({ lvl }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => handleSelect(lvl)}
      className={`cursor-pointer rounded-2xl p-6 text-white shadow-md ${lvl.color} 
                 border-2 ${
                   boostLevel === lvl.id ? "border-yellow-300" : "border-transparent"
                 }`}
    >
      <h3 className="text-xl font-bold mb-2">{lvl.label}</h3>
      <p className="text-sm opacity-90 mb-3">{lvl.desc}</p>

      <div className="text-lg flex items-center gap-2">
        <Users size={20} /> مدى الوصول: {lvl.reach}
      </div>

      <div className="mt-2 text-sm flex items-center gap-2">
        <BarChart3 size={18} /> التكلفة: {lvl.cost} SAR
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold flex items-center gap-3 text-gray-900">
          ⚡ تعزيز منشور
        </h1>
        <p className="text-gray-500 mt-2">
          اختر مستوى التعزيز وشغّل ذكاء Core4.AI للحصول على أفضل انتشار.
        </p>
      </div>

      {/* BOOST PLAN SELECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {levels.map((lvl) => (
          <BoostCard key={lvl.id} lvl={lvl} />
        ))}
      </div>

      {/* AI SUMMARY BOX */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-700">
            <Sparkles size={28} /> توصيات Core4.AI الذكية
          </h2>

          <p className="text-gray-700 text-lg mb-4">{summary.message}</p>

          <ul className="text-gray-700 space-y-2 mb-6">
            <li>🎯 أفضل قبيلة مستهدفة: {summary.tribeFit}</li>
            <li>⏰ أفضل وقت للنشر: {summary.bestTime}</li>
          </ul>

          <h3 className="font-bold text-gray-900 mb-2">اقتراحات إضافية:</h3>

          <ul className="list-disc pr-6 text-gray-700">
            {summary.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          {/* CONFIRM BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 bg-purple-600 hover:bg-purple-700 w-full py-3 text-white 
                       font-bold rounded-xl text-lg shadow-md"
            onClick={() => alert(`تم تفعيل Boost! 🚀\nReach: ${estimatedReach}`)}
          >
            <CheckCircle2 size={22} className="inline-block ml-2" />
            تأكيد التعزيز
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

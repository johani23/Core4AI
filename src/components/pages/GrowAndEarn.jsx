// ============================================================================
// 💚 Core4.AI — GrowAndEarn PRO (v5 FINAL)
// Advanced NLP Fingerprint Builder for Tribe Alignment
// Designed by Sama — Engineered by Noor
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { CheckCircle, Award, Sparkles } from "lucide-react";

// MOCK AI ENGINE (replace with backend later)
function analyzeSample(text) {
  const tribes = ["Techy", "Fashionists", "EventGoers"];
  const mock = {
    tribe: tribes[Math.floor(Math.random() * tribes.length)],
    energy: Math.floor(Math.random() * 100),
    clarity: Math.floor(Math.random() * 100),
    creativity: Math.floor(Math.random() * 100),
    keywords: text.split(" ").slice(0, 5),
  };
  return mock;
}

export default function GrowAndEarn() {
  const [text, setText] = useState("");
  const [samples, setSamples] = useState([]);
  const SAMPLE_LIMIT = 10;

  // Final score calculations
  const progress = (samples.length / SAMPLE_LIMIT) * 100;
  const isCompleted = samples.length === SAMPLE_LIMIT;

  // Collect sample
  const addSample = () => {
    if (!text.trim()) return;
    if (samples.length >= SAMPLE_LIMIT) {
      toast.error("اكتمل الحد — 10 عينات فقط.");
      return;
    }

    const ai = analyzeSample(text);

    setSamples([
      ...samples,
      {
        text,
        ...ai,
      },
    ]);
    setText("");

    toast.success("تم تحليل العينة!");
  };

  // AI Persona Summary
  const persona = isCompleted
    ? {
        tribe:
          samples.sort(
            (a, b) =>
              samples.filter((x) => x.tribe === b.tribe).length -
              samples.filter((x) => x.tribe === a.tribe).length
          )[0].tribe,
        avgEnergy: Math.floor(
          samples.reduce((t, s) => t + s.energy, 0) / samples.length
        ),
        avgClarity: Math.floor(
          samples.reduce((t, s) => t + s.clarity, 0) / samples.length
        ),
        avgCreativity: Math.floor(
          samples.reduce((t, s) => t + s.creativity, 0) / samples.length
        ),
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-20" dir="rtl">
      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-[#006C35] mb-3">
        بصمتك الذكية — Grow PRO 🌱
      </h1>
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        حلّل طريقة تعبيرك ونبرة أفكارك…  
        ثم احصل على <span className="text-[#006C35] font-semibold">شهادة التوافق القَبَلي</span> الخاصة بك.
      </p>

      {/* INPUT BOX */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="اكتب فكرة قصيرة أو جملة تعبّر عنك…"
          className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={addSample}
          className="bg-[#006C35] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
        >
          <FiSend size={18} />
          إضافة
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-5">
        <div className="flex justify-between text-sm text-gray-700">
          <span>التقدم</span>
          <span>
            {samples.length} / {SAMPLE_LIMIT}
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-xl mt-2">
          <div
            className="h-3 bg-[#00A345] rounded-xl transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* BADGES */}
      <div className="flex gap-3 mt-4">
        {samples.length >= 1 && (
          <Badge text="بدأت الرحلة" icon={<CheckCircle size={16} />} />
        )}
        {samples.length >= 5 && (
          <Badge text="نصف الطريق" icon={<Sparkles size={16} />} />
        )}
        {isCompleted && (
          <Badge text="مستعد للشهادة" icon={<Award size={16} />} />
        )}
      </div>

      {/* SAMPLE GRID */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {samples.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {s.text.slice(0, 80)}…
            </p>

            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <b>القبيلة المتوقعة:</b> {s.tribe}
              </p>
              <p>
                <b>طاقة السرد:</b> {s.energy}%
              </p>
              <p>
                <b>الوضوح:</b> {s.clarity}%
              </p>
              <p>
                <b>الإبداع:</b> {s.creativity}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI SUMMARY — TRIBE CERTIFICATE */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-[#006C35] mb-3">
            🔥 شهادة التوافق القَبَلي
          </h2>

          <p className="text-gray-700 text-lg mb-4">
            بعد تحليل جميع العينات…  
            نجد أن أقرب قبيلة لأسلوبك هي:
          </p>

          <p className="text-4xl font-extrabold text-center text-[#006C35] mb-6">
            {persona.tribe}
          </p>

          <div className="grid grid-cols-3 gap-6 text-center">
            <ScoreCard label="طاقة السرد" value={persona.avgEnergy} />
            <ScoreCard label="الوضوح" value={persona.avgClarity} />
            <ScoreCard label="الإبداع" value={persona.avgCreativity} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

function Badge({ text, icon }) {
  return (
    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
      {icon}
      {text}
    </div>
  );
}

function ScoreCard({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold text-[#006C35] mt-2">{value}%</p>
    </div>
  );
}

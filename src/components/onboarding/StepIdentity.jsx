import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../state/onboardingStore";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

export default function StepIdentity() {
  const navigate = useNavigate();
  const { identity, updateIdentity } = useOnboardingStore();

  return (
    <div>
      <ProgressBar step={1} />

      {/* HEADER */}
      <motion.h2
        className="text-3xl font-bold mb-4 text-purple-300 text-right"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        خلّنا نعرّف هويتك أكثر ✨
      </motion.h2>

      <motion.p
        className="text-gray-300 mb-10 leading-relaxed text-right text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        نبي نفهم أكثر وش يمثّل لك النجاح، وش الأشياء اللي تحرّكك،
        وكيف تشوف نفسك داخل Core4.AI. هالمعلومات تساعد النظام يضبط لك تجربة
        حياة، نمو، وتأثير متناسقة معك تمامًا.
      </motion.p>

      {/* Core Values */}
      <FieldLabel text="وش القيمة اللي تمثّل أكثر شيء لك؟" />
      <SelectField
        value={identity.values}
        onChange={(v) => updateIdentity({ values: v })}
        options={[
          ["growth", "أحب أتطور دائمًا"],
          ["stability", "أحب الاستقرار"],
          ["impact", "أبي أترك بصمة"],
          ["creativity", "أحب الإبداع"],
          ["leadership", "قيادي بطبعي"],
          ["freedom", "أعشق الحرية"],
          ["connection", "العلاقات أهم شيء"],
        ]}
      />

      {/* Life Purpose */}
      <FieldLabel text="هدفك في الحياة وش هو؟" />
      <SelectField
        value={identity.purpose}
        onChange={(v) => updateIdentity({ purpose: v })}
        options={[
          ["discover_myself", "أكتشف نفسي أكثر"],
          ["build_career", "أبني مستقبل مهني"],
          ["financial_growth", "أزيد دخلي"],
          ["influence", "أصير مؤثر"],
          ["learn_new_skills", "أتعلم مهارات جديدة"],
          ["start_business", "أبدأ مشروع"],
        ]}
      />

      {/* Emotional Signature */}
      <FieldLabel text="الغالب عليك أغلب الوقت؟" />
      <SelectField
        value={identity.emotionalSignature}
        onChange={(v) => updateIdentity({ emotionalSignature: v })}
        options={[
          ["calm", "رايق وهادئ"],
          ["passionate", "اندفاعي"],
          ["analytical", "تحليلي"],
          ["sensitive", "حساس"],
          ["confident", "واثق"],
        ]}
      />

      <MainButton
        onClick={() => navigate("/onboarding/cognitive")}
        text="التالي"
      />
    </div>
  );
}

function FieldLabel({ text }) {
  return <p className="text-gray-200 mb-2 text-right font-semibold">{text}</p>;
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-6 p-3 rounded-xl bg-[#111122] border border-purple-500/30 text-white focus:ring-2 ring-purple-500 transition"
    >
      <option value="">اختر...</option>
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function MainButton({ text, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-lg shadow-[0_0_12px_rgba(255,0,200,0.4)] hover:opacity-90 transition"
    >
      {text} →
    </motion.button>
  );
}

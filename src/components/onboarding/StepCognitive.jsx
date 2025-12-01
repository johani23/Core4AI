import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../state/onboardingStore";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

export default function StepCognitive() {
  const navigate = useNavigate();
  const { cognitive, updateCognitive } = useOnboardingStore();

  return (
    <div>
      <ProgressBar step={2} />

      <motion.h2 className="text-3xl font-bold mb-4 text-purple-300 text-right">
        طريقة تفكيرك وش لونها؟ 🔮
      </motion.h2>

      <motion.p className="text-gray-300 mb-10 leading-relaxed text-right text-lg">
        كل واحد له ستايل تفكير يميّزه…  
        ودنا نعرف وش اللي يشبهك عشان نقدر نعرّف شخصيتك بدقة داخل القبيلة.
      </motion.p>

      <FieldLabel text="أسلوب اتخاذ القرار عندك؟" />
      <SelectField
        value={cognitive.decisionStyle}
        onChange={(v) => updateCognitive({ decisionStyle: v })}
        options={[
          ["fast_intuitive", "سريع وحدسي"],
          ["slow_analytical", "هادئ وتحليلي"],
          ["balanced", "حسب الموقف"],
        ]}
      />

      <FieldLabel text="نمط تفكيرك العام؟" />
      <SelectField
        value={cognitive.thinkingMode}
        onChange={(v) => updateCognitive({ thinkingMode: v })}
        options={[
          ["big_picture", "أشوف الصورة الكبيرة"],
          ["detailed", "أركز بالتفاصيل"],
          ["pattern_seeker", "ألقط الأنماط بسرعة"],
          ["logic_based", "تفكيري منطقي أكثر"],
        ]}
      />

      <FieldLabel text="كيف تستقبل المعلومات عادة؟" />
      <SelectField
        value={cognitive.inputStyle}
        onChange={(v) => updateCognitive({ inputStyle: v })}
        options={[
          ["visual", "بصري (صور/فيديو)"],
          ["verbal", "شفهي/شرح"],
          ["experiential", "أجرب بنفسي"],
        ]}
      />

      <MainButton text="التالي" onClick={() => navigate("/onboarding/innovation")} />
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
      <option value="">اختر…</option>
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
    <motion.button whileTap={{ scale: 0.96 }} onClick={onClick} className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-lg">
      {text} →
    </motion.button>
  );
}

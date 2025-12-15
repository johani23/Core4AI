// ============================================================================
// 💡 Core4.AI – StepInnovation.jsx (Clean UTF-8, Final)
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../state/onboardingStore";
import ProgressBar from "./ProgressBar";

export default function StepInnovation() {
  const navigate = useNavigate();
  const { innovation, updateInnovation } = useOnboardingStore();

  return (
    <div style={{ direction: "rtl" }}>
      <ProgressBar step={3} />

      <h2 className="text-3xl font-bold mb-6 text-purple-300">
        طريقة إبداعك وش لونها؟ ✨
      </h2>

      {/* Creativity Level */}
      <Label text="مستوى الإبداع عندك" />
      <Select
        value={innovation.creativityLevel}
        onChange={(v) => updateInnovation({ creativityLevel: v })}
        options={[
          ["low", "أقلد الأشياء اللي تعجبني"],
          ["medium", "أطور الموجود وأضيف عليه"],
          ["high", "أبتكر أفكار جديدة من الصفر"],
        ]}
      />

      {/* Problem Solving */}
      <Label text="كيف تتعامل مع المشاكل عادة؟" />
      <Select
        value={innovation.problemSolvingStyle}
        onChange={(v) => updateInnovation({ problemSolvingStyle: v })}
        options={[
          ["fix", "أصلّح الغلط مباشرة"],
          ["analyze", "أحلل التفاصيل قبل التحرك"],
          ["invent", "أخترع حل جديد من الأساس"],
        ]}
      />

      {/* Idea Style */}
      <Label text="كيف تطلع أفكارك غالبًا؟" />
      <Select
        value={innovation.ideaStyle}
        onChange={(v) => updateInnovation({ ideaStyle: v })}
        options={[
          ["structured", "بطريقة مرتبة ومنظّمة"],
          ["random", "تجيني أفكار فجأة بدون ترتيب"],
          ["inspired", "أستلهم من الأشياء حولي"],
        ]}
      />

      {/* Boldness */}
      <Label text="جرأتك في تجربة أفكار جديدة؟" />
      <Select
        value={innovation.boldness}
        onChange={(v) => updateInnovation({ boldness: v })}
        options={[
          ["low", "أتردد غالبًا"],
          ["medium", "أجرب بحذر"],
          ["high", "أجرب بدون خوف"],
        ]}
      />

      <button
        onClick={() => navigate("/onboarding/summary")}
        className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white"
      >
        التالي →
      </button>
    </div>
  );
}

function Label({ text }) {
  return <p className="text-gray-200 mb-2 font-semibold">{text}</p>;
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-6 p-3 bg-[#111122] border border-purple-500/40 text-white rounded-xl"
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

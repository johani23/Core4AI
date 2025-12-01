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

      <p className="text-gray-300 mb-8 leading-relaxed">
        نبي نعرف كيف تطلع أفكارك وكيف تتعامل مع المشاكل…
        عشان نحدد موقعك على خريطة الإبداع داخل Core4.AI.
      </p>

      <Label text="مستوى الإبداع عندك؟" />
      <Select
        value={innovation.creativityLevel}
        onChange={(v) => updateInnovation({ creativityLevel: v })}
        options={[
          ["low", "أقلّد الأشياء اللي تعجبني"],
          ["medium", "أطوّر الموجود"],
          ["high", "أبتكر أفكار جديدة"],
        ]}
      />

      <Label text="كيف تتعامل مع المشاكل؟" />
      <Select
        value={innovation.problemSolvingStyle}
        onChange={(v) => updateInnovation({ problemSolvingStyle: v })}
        options={[
          ["fixing", "أصلّح الغلط"],
          ["analyzing", "أحلل التفاصيل"],
          ["inventing", "أفكر بحل جديد"],
        ]}
      />

      <Label text="كيف تطلع أفكارك؟" />
      <Select
        value={innovation.ideaStyle}
        onChange={(v) => updateInnovation({ ideaStyle: v })}
        options={[
          ["structured", "بطريقة مرتبة"],
          ["random", "تصير فجأة"],
          ["inspired", "إذا شفت شيء يلهمني"],
        ]}
      />

      <Label text="جرأتك في تجربة أفكار جديدة؟" />
      <Select
        value={innovation.boldness}
        onChange={(v) => updateInnovation({ boldness: v })}
        options={[
          ["low", "أتردد"],
          ["medium", "أجرب بحذر"],
          ["high", "أجرب بدون خوف"],
        ]}
      />

      <button
        onClick={() => {
          // EASY MODE: allow if at least ONE answer is selected
          const hasAnyAnswer =
            innovation.creativityLevel ||
            innovation.problemSolvingStyle ||
            innovation.ideaStyle ||
            innovation.boldness;

          if (!hasAnyAnswer) {
            alert("على الأقل اختر إجابة واحدة للاستمرار 🌟");
            return;
          }

          // SAFE DEFAULTS
          updateInnovation({
            creativityLevel: innovation.creativityLevel || "low",
            problemSolvingStyle: innovation.problemSolvingStyle || "fixing",
            ideaStyle: innovation.ideaStyle || "structured",
            boldness: innovation.boldness || "low",
          });

          navigate("/onboarding/summary");
        }}
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
      <option value="">اختر…</option>
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

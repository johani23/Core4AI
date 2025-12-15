// ============================================================================
// 💜 Core4.AI – CreatorSettings FINAL PRO v4 (2025)
// Unified With CreatorLayout + Dark Theme + Clean Creator UI
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Sparkles,
  Globe,
  Lock,
  Users,
  Settings,
} from "lucide-react";

import CreatorLayout from "./CreatorLayout";

export default function CreatorSettings() {
  const [persona, setPersona] = useState("tech");
  const [visibility, setVisibility] = useState("public");
  const [saving, setSaving] = useState(false);

  const personaOptions = [
    { value: "tech", label: "محتوى تقني", icon: <Sparkles className="text-purple-400" /> },
    { value: "fashion", label: "أزياء وجمال", icon: <Sparkles className="text-pink-400" /> },
    { value: "events", label: "فعاليات وترفيه", icon: <Sparkles className="text-blue-400" /> },
    { value: "gaming", label: "Gaming", icon: <Sparkles className="text-green-400" /> },
  ];

  const visibilityOptions = [
    { value: "public", label: "عام", icon: <Globe className="text-blue-400" /> },
    { value: "followers", label: "للمتابعين فقط", icon: <Users className="text-purple-400" /> },
    { value: "private", label: "خاص", icon: <Lock className="text-red-400" /> },
  ];

  const saveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("✅ تم حفظ الإعدادات بنجاح!");
    }, 800);
  };

  return (
    <CreatorLayout>
      <div className="min-h-screen p-10 text-white space-y-12" dir="rtl">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Settings size={32} className="text-purple-300" />
          <h1 className="text-3xl font-bold text-purple-300">إعدادات صانع المحتوى</h1>
        </div>

        {/* MAIN BOX */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-xl backdrop-blur-xl space-y-12">

          {/* SECTION — Identity */}
          <SectionTitle icon={<User className="text-purple-300" />} title="هوية صانع المحتوى" />

          <Field label="اسمك المعروض">
            <input
              type="text"
              placeholder="مثال: Ahmed Creates"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
            />
          </Field>

          <Field label="نبذة مختصرة (Bio)">
            <textarea
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white min-h-[100px] focus:outline-none"
              placeholder="صف نفسك ونوعية المحتوى الذي تقدمه…"
            />
          </Field>

          {/* SECTION — AI Persona */}
          <SectionTitle icon={<Sparkles className="text-yellow-300" />} title="نمط الذكاء الاصطناعي (AI Persona)" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {personaOptions.map((p) => (
              <motion.button
                key={p.value}
                whileHover={{ scale: 1.03 }}
                onClick={() => setPersona(p.value)}
                className={`p-5 rounded-2xl border flex items-center justify-between transition ${
                  persona === p.value
                    ? "border-purple-400 bg-purple-900/20"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div>
                  <p className="font-bold text-lg">{p.label}</p>
                  <p className="text-gray-400 text-sm">تأثير مباشر على صياغة المحتوى</p>
                </div>
                {p.icon}
              </motion.button>
            ))}
          </div>

          {/* SECTION — Privacy */}
          <SectionTitle icon={<Shield className="text-green-300" />} title="الخصوصية والتحكم بالظهور" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visibilityOptions.map((v) => (
              <motion.button
                key={v.value}
                whileHover={{ scale: 1.03 }}
                onClick={() => setVisibility(v.value)}
                className={`p-5 rounded-2xl border flex items-center justify-between transition ${
                  visibility === v.value
                    ? "border-blue-400 bg-blue-900/20"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div>
                  <p className="font-bold">{v.label}</p>
                  <p className="text-gray-400 text-xs">من يستطيع رؤية محتواك؟</p>
                </div>
                {v.icon}
              </motion.button>
            ))}
          </div>

          {/* SAVE */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={saveChanges}
            disabled={saving}
            className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-bold text-lg shadow-md"
          >
            {saving ? "جارٍ الحفظ…" : "💾 حفظ التغييرات"}
          </motion.button>

        </div>

      </div>
    </CreatorLayout>
  );
}

/* COMPONENTS --------------------------------------------------------------- */

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h2 className="text-xl font-bold text-purple-200">{title}</h2>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-purple-200">{label}</p>
      {children}
    </div>
  );
}

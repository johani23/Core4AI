// ============================================================================
// 💚 Core4.AI – Tribe Challenge Creator UI (Human + AI Director)
// ============================================================================

import React, { useState } from "react";
import { useChallenges } from "@/context/TribeChallengeContext";
import { useTribe } from "@/context/TribeContext";

export default function TribeChallengeCreator() {
  const { weeklyCreator, createChallenge } = useChallenges();
  const { xp } = useTribe();

  const [form, setForm] = useState({
    title: "",
    description: "",
    challengeType: "awareness"
  });

  function submit() {
    const result = createChallenge(form);
    alert(result.msg);
  }

  if (!weeklyCreator)
    return <p className="text-gray-400 mt-10">⏳ جاري اختيار مبدع التحديات…</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/10 p-6 rounded-2xl border border-white/20">

      <h2 className="text-2xl font-bold text-purple-300 mb-2">
        🧩 مبدع التحديات لهذا الأسبوع: {weeklyCreator.name}
      </h2>

      <p className="text-gray-400 mb-6">
        يمكنك ابتكار تحديات ممتعة — وCore4.AI سيتكفل بالباقي!
      </p>

      <label className="block mb-2 font-semibold">عنوان التحدي</label>
      <input
        className="w-full p-3 rounded-lg bg-white/20 mb-4"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <label className="block mb-2 font-semibold">وصف مبسط</label>
      <textarea
        className="w-full p-3 rounded-lg bg-white/20 mb-4"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <label className="block mb-2 font-semibold">نوع التحدي</label>
      <select
        className="w-full p-3 rounded-lg bg-white/20 mb-6"
        value={form.challengeType}
        onChange={(e) => setForm({ ...form, challengeType: e.target.value })}
      >
        <option value="awareness">🎥 Awareness</option>
        <option value="ugc">📸 UGC</option>
        <option value="advocacy">💬 Advocacy</option>
        <option value="conversion">💰 Conversion</option>
      </select>

      <button
        onClick={submit}
        className="btn-green w-full py-3 text-lg font-bold"
      >
        ➕ إطلاق التحدي
      </button>
    </div>
  );
}

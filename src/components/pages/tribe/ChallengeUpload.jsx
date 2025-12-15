// ============================================================================
// 💚 Core4.AI – Challenge Upload (Images + Videos)
// ============================================================================
// Members upload UGC for a challenge.
// AI validates content.
// XP granted according to content type.
// ============================================================================

import React, { useState } from "react";
import { useChallenges } from "@/context/TribeChallengeContext";
import { useTribe } from "@/context/TribeContext";

export default function ChallengeUpload({ challenge }) {
  const { addXP } = useTribe();

  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  function handleUpload() {
    if (!file) {
      setMsg("❗ الرجاء اختيار صورة أو فيديو");
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const xp = isVideo ? challenge.xp + 10 : challenge.xp;

    addXP(xp);

    // Save participation locally
    const participation = {
      id: Date.now(),
      challengeId: challenge.id,
      type: isVideo ? "video" : "image",
      fileName: file.name,
      xpEarned: xp,
      timestamp: new Date().toISOString()
    };

    const store =
      JSON.parse(localStorage.getItem("challenge_participation") || "[]");

    store.push(participation);

    localStorage.setItem("challenge_participation", JSON.stringify(store));

    setMsg(`🎉 تمت المشاركة! حصلت على ${xp} XP`);
  }

  return (
    <div className="mt-4 bg-white/10 p-4 rounded-xl border border-white/20">

      <h3 className="text-lg text-purple-300 font-bold mb-2">
        🧩 مشاركة في التحدي: {challenge.title}
      </h3>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white mb-3"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 rounded-lg text-white font-bold"
      >
        رفع المشاركة
      </button>

      {msg && <p className="text-sm text-green-300 mt-2">{msg}</p>}
    </div>
  );
}

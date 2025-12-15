// ============================================================================
// 💚 Core4.AI – TribeInvite (Invitation Landing Page)
// ----------------------------------------------------------------------------
// Reads invite code → Extracts tribe → Allows joining
// Works fully without backend for now
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTribe } from "@/context/TribeContext";
import { motion } from "framer-motion";

export default function TribeInvite() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { tribes, joinTribe } = useTribe();

  const [invitedTribe, setInvitedTribe] = useState(null);

  // Decode tribe name from invite code
  // Example code: techy-82jf1k  → tribe: Techy
  useEffect(() => {
    if (!code) return;

    const tribeName = code.split("-")[0]; // before first dash
    const found = tribes.find(
      (t) => t.name.toLowerCase() === tribeName.toLowerCase()
    );

    setInvitedTribe(found || null);
  }, [code, tribes]);

  if (!invitedTribe) {
    return (
      <div className="text-center p-10 text-white" dir="rtl">
        <h1 className="text-3xl font-bold text-red-400">رابط الدعوة غير صالح ❌</h1>
        <p className="text-gray-400 mt-4">تأكد من صحة الرابط أو اطلب رابط جديد.</p>
      </div>
    );
  }

  function acceptInvite() {
    joinTribe(invitedTribe);
    navigate("/tribe");
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white p-10"
      dir="rtl"
      style={{
        background:
          "linear-gradient(to bottom right, #1a1a1a, #121212, #0d0d0d)",
      }}
    >
      <motion.div
        className="bg-white/10 border border-white/20 p-10 rounded-3xl shadow-xl backdrop-blur-xl max-w-xl w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-7xl mb-4">{invitedTribe.icon}</div>

        <h1 className="text-4xl font-bold text-purple-300">
          دعوة للانضمام إلى قبيلة {invitedTribe.name}
        </h1>

        <p className="text-gray-300 mt-4">
          لقد تمت دعوتك لدخول عالم  
          <span className="text-purple-200 font-bold"> {invitedTribe.name} </span>
          — هل أنت مستعد؟
        </p>

        <button
          onClick={acceptInvite}
          className="mt-6 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-lg font-bold"
        >
          انضم الآن 🔥
        </button>
      </motion.div>
    </div>
  );
}

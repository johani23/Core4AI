// ============================================================================
// 💚 Core4.AI – AudienceTribeInvite.jsx (Arabic Clean Edition)
// ============================================================================

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";

export default function AudienceTribeInvite() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const tribeInvite = state?.tribeInvite || null;

  // إذا ما فيه دعوة جاية من WebSocket أو من الصفحة السابقة
  if (!tribeInvite) {
    return (
      <div className="min-h-screen bg-[#0A0F12] text-white p-8" style={{ direction: "rtl" }}>
        <CoreHeader
          title="لا توجد دعوة"
          subtitle="ارجع إلى لوحة الجمهور"
          icon="⚠️"
        />

        <CorePanel className="text-center mt-6">
          <CoreButton
            label="العودة للوحة التحكم"
            onClick={() => navigate("/audience/dashboard")}
          />
        </CorePanel>
      </div>
    );
  }

  const { tribe_name, brand, message } = tribeInvite;

  const joinTribe = async () => {
    await fetch("/api/audience/join-tribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tribe: tribe_name,
        brand,
      }),
    });

    navigate("/audience/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <CoreHeader
        title="🎉 تمت دعوتك!"
        subtitle="قبيلة اختارتك بناءً على نشاطك وتأثيرك."
        icon="🌟"
      />

      {/* INVITE PANEL */}
      <CorePanel className="max-w-3xl mx-auto space-y-5 text-center">

        <h2 className="text-3xl font-bold text-[#4FBF77]">{tribe_name}</h2>

        <p className="text-gray-300 text-lg">
          تمت دعوتك للانضمام إلى قبيلة{" "}
          <span className="text-[#CBA65C] font-semibold">{tribe_name}</span>.
        </p>

        {message && (
          <p className="text-gray-400 text-sm max-w-xl mx-auto italic">
            "{message}"
          </p>
        )}

        <div className="flex justify-center mt-6 gap-6">

          {/* ACCEPT */}
          <CoreButton label="انضم للقبيلة" onClick={joinTribe} />

          {/* DECLINE */}
          <CoreButton
            label="لاحقًا"
            variant="secondary"
            onClick={() => navigate("/audience/dashboard")}
          />
        </div>

      </CorePanel>
    </div>
  );
}

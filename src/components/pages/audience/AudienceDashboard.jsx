// ============================================================================
// 💚 Core4.AI – AudienceDashboard.jsx (Arabic Clean Edition)
// ============================================================================

import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function AudienceDashboard() {
  const navigate = useNavigate();
  const { wsData } = useCoreSync();

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10" style={{ direction: "rtl" }}>

      {/* Header */}
      <CoreHeader
        title="تجربة الجمهور"
        subtitle="جرّب منتجات، اكتب مراجعات، اكسب نقاط XP، واستلم دعوات القبائل."
        icon="🎧"
      />

      {/* MAIN ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* XP PANEL */}
        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">نقاط XP</p>
          <p className="text-5xl font-extrabold text-[#4FBF77] mt-2">
            {wsData?.xp_total || 0}
          </p>
        </CorePanel>

        {/* TRY PRODUCT */}
        <CorePanel className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-[#CBA65C] mb-3">
            جرّب منتج
          </h3>
          <CoreButton
            label="ابدأ"
            onClick={() => navigate("/audience/try")}
          />
        </CorePanel>

        {/* WALLET */}
        <CorePanel className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-[#CBA65C] mb-3">
            محفظة المكافآت
          </h3>
          <CoreButton
            label="عرض المحفظة"
            onClick={() => navigate("/audience/wallet")}
            variant="secondary"
          />
        </CorePanel>
      </div>

      {/* TRIBE INVITE */}
      {wsData?.type === "tribe_invite" && (
        <CorePanel
          className="border border-[#4FBF77] text-center cursor-pointer hover:bg-[#11161A] transition-all"
          onClick={() =>
            navigate("/audience/tribe-invite", { state: { tribeInvite: wsData } })
          }
        >
          <h3 className="text-xl text-[#4FBF77] font-bold mb-1">🎉 دعوة قبيلة!</h3>
          <p className="text-gray-400">
            تم اختيارك للانضمام إلى قبيلة{" "}
            <strong>{wsData.tribe_name}</strong>.
            اضغط لعرض التفاصيل.
          </p>
        </CorePanel>
      )}

    </div>
  );
}

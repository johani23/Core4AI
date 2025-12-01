// ============================================================================
// ðŸ‘¥ Core4.AI â€“ AudienceDashboard.jsx (Saudi-Tech A3 Edition)
// ============================================================================
// - Unified Saudi dark theme
// - CorePanel + CoreHeader for clean layout
// - XP, Wallet, TryProduct panels styled
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function AudienceDashboard() {
  const navigate = useNavigate();
  const { wsData } = useCoreSync();

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* Header */}
      <CoreHeader
        title="Audience Experience"
        subtitle="Try products, submit reviews, earn XP and receive tribe invites."
        icon="ðŸŽ§"
      />

      {/* MAIN ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* XP PANEL */}
        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">XP Points</p>
          <p className="text-5xl font-extrabold text-[#4FBF77] mt-2">
            {wsData?.xp_total || 0}
          </p>
        </CorePanel>

        {/* TRY PRODUCT */}
        <CorePanel className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-[#CBA65C] mb-3">
            Try a Product
          </h3>
          <CoreButton
            label="Start"
            onClick={() => navigate("/audience/try")}
          />
        </CorePanel>

        {/* WALLET */}
        <CorePanel className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-[#CBA65C] mb-3">
            Rewards Wallet
          </h3>
          <CoreButton
            label="View Wallet"
            onClick={() => navigate("/audience/wallet")}
            variant="secondary"
          />
        </CorePanel>
      </div>

      {/* TRIBE INVITE */}
      {wsData?.type === "tribe_invite" && (
        <CorePanel className="border border-[#4FBF77] text-center cursor-pointer hover:bg-[#11161A] transition-all"
          onClick={() =>
            navigate("/audience/tribe-invite", { state: { tribeInvite: wsData } })
          }
        >
          <h3 className="text-xl text-[#4FBF77] font-bold mb-1">ðŸŒŸ Tribe Invite!</h3>
          <p className="text-gray-400">
            You are invited to join <strong>{wsData.tribe_name}</strong>.
            Click to view details.
          </p>
        </CorePanel>
      )}

    </div>
  );
}

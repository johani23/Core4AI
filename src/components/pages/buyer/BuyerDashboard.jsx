// ============================================================================
// ðŸ’š Core4.AI â€“ BuyerDashboard.jsx (v7 Final â€“ Connected to CoreSync v169)
// ============================================================================
// â€¢ XP comes directly from CoreSyncContext
// â€¢ Purchases = campaigns.length (simple local logic for MVP)
// â€¢ Clean Saudi-tech layout
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { xp, campaigns } = useCoreSync();

  const totalPurchases = campaigns?.length ?? 0;
  const cashback = 0; // For now â€“ to be activated in future versions.

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* HEADER */}
      <CoreHeader
        title="Buyer Dashboard"
        subtitle="Track your XP, cashback and activity."
        icon="ðŸ›’"
      />

      {/* SUMMARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <CorePanel>
          <p className="text-gray-400">Total Purchases</p>
          <p className="text-4xl font-bold text-[#CBA65C] mt-2">{totalPurchases}</p>
        </CorePanel>

        <CorePanel>
          <p className="text-gray-400">Cashback Earned</p>
          <p className="text-4xl font-bold text-[#4FBF77] mt-2">{cashback} SAR</p>
        </CorePanel>

        <CorePanel>
          <p className="text-gray-400">Total XP</p>
          <p className="text-4xl font-bold text-[#4FBF77] mt-2">{xp}</p>
        </CorePanel>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

        <CorePanel className="flex justify-center">
          <CoreButton
            label="View Activity"
            onClick={() => navigate("/buyer/activity")}
          />
        </CorePanel>

        <CorePanel className="flex justify-center">
          <CoreButton
            label="Referral Program"
            onClick={() => navigate("/buyer/referrals")}
          />
        </CorePanel>

        <CorePanel className="flex justify-center">
          <CoreButton
            label="Upgrade Benefits"
            onClick={() => navigate("/buyer/upgrade")}
          />
        </CorePanel>

      </div>

    </div>
  );
}

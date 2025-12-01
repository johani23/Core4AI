// ============================================================================
// ðŸŽ BuyerReferrals.jsx â€“ Saudi-Tech A3 Edition
// ----------------------------------------------------------------------------
// - Referral system page with unified A3 branding
// - Shows referral code, earnings, referred users
// - Saudi dark theme + green glow + gold accents
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerReferrals() {
  const { wsData } = useCoreSync();

  const referral = wsData?.buyer_referral || {
    code: "A1B2C3",
    earnings: 0,
    invited: [],
  };

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* HEADER */}
      <CoreHeader
        title="Referral Program"
        subtitle="Invite friends, earn cashback and XP from their purchases."
        icon="ðŸŽ"
      />

      {/* REFERRAL CODE PANEL */}
      <CorePanel className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-lg text-[#CBA65C] font-semibold">
          Your Referral Code
        </p>

        <p className="text-4xl font-extrabold text-[#4FBF77] tracking-widest">
          {referral.code}
        </p>

        <CoreButton
          label="Copy Code"
          onClick={() => navigator.clipboard.writeText(referral.code)}
        />
      </CorePanel>

      {/* EARNINGS PANEL */}
      <CorePanel className="max-w-3xl mx-auto text-center">
        <p className="text-gray-400 text-sm">Total Referral Earnings</p>
        <p className="text-4xl font-extrabold text-[#CBA65C] mt-2">
          {referral.earnings} SAR
        </p>
      </CorePanel>

      {/* INVITED USERS */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-[#CBA65C] mb-3">
          ðŸ‘¥ Referred Users
        </h2>

        <CorePanel className="space-y-3 max-h-96 overflow-y-auto">
          {referral.invited.length === 0 ? (
            <p className="text-gray-500">No referred users yet.</p>
          ) : (
            referral.invited.map((u, i) => (
              <div key={i} className="bg-[#11161A] p-4 rounded-xl">
                <p className="text-[#4FBF77] font-bold">{u.name}</p>
                <p className="text-gray-400 text-sm">Purchases: {u.purchases}</p>
                <p className="text-[#CBA65C] text-sm">XP gained: {u.xp_gain}</p>
              </div>
            ))
          )}
        </CorePanel>
      </div>

    </div>
  );
}

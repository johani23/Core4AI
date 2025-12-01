// ============================================================================
// â¬†ï¸ BuyerUpgrade.jsx â€“ Saudi-Tech A3 Edition
// ----------------------------------------------------------------------------
// - Shows buyer tier / rank / benefits
// - Uses CorePanel + CoreHeader + CoreButton
// - Saudi dark theme + green glow + gold accents
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerUpgrade() {
  const { wsData } = useCoreSync();

  const tier = wsData?.buyer_tier || {
    level: "Bronze",
    xp_required: 500,
    xp_current: 120,
    benefits: [
      "5% Cashback",
      "Priority review processing",
      "Early tribe invite access",
    ],
  };

  const percentage = Math.min(
    (tier.xp_current / tier.xp_required) * 100,
    100
  ).toFixed(0);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* HEADER */}
      <CoreHeader
        title="Upgrade Benefits"
        subtitle="Unlock new perks, cashback boosts and influence rewards."
        icon="â¬†ï¸"
      />

      {/* TIER PANEL */}
      <CorePanel className="max-w-3xl mx-auto space-y-5">

        <h2 className="text-3xl font-extrabold text-[#CBA65C] text-center">
          {tier.level} Tier
        </h2>

        <p className="text-center text-gray-400">
          Progress toward next level
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full h-4 bg-[#11161A] rounded-xl overflow-hidden border border-[#1F8C4D]/30">
          <div
            className="h-full bg-gradient-to-r from-[#1F8C4D] to-[#4FBF77]"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-center text-gray-300 text-sm">
          {tier.xp_current} / {tier.xp_required} XP  
          <span className="text-[#4FBF77] ml-2">
            ({percentage}%)
          </span>
        </p>
      </CorePanel>

      {/* BENEFITS */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-[#CBA65C]">ðŸŽ Tier Benefits</h3>

        <CorePanel className="space-y-3">
          {tier.benefits.map((b, i) => (
            <div
              key={i}
              className="p-4 bg-[#11161A] rounded-xl text-gray-300 border border-[#1F8C4D]/20"
            >
              {b}
            </div>
          ))}
        </CorePanel>
      </div>

      {/* UPGRADE ACTION */}
      <div className="max-w-3xl mx-auto text-center mt-6">
        <CoreButton
          label="Unlock Premium Tier"
          onClick={() => alert("Premium Tier Coming Soon")}
        />
      </div>

    </div>
  );
}

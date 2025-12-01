// ============================================================================
// ðŸŒŸ Core4.AI â€“ AudienceTribeInvite.jsx (Saudi-Tech A3 Edition)
// ----------------------------------------------------------------------------
// - Full redesign with premium Saudi dark identity
// - Green glow + gold accent
// - Smooth invite experience
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

  if (!tribeInvite) {
    return (
      <div className="min-h-screen bg-[#0A0F12] text-white p-8">
        <CoreHeader
          title="No Invite Found"
          subtitle="Return to your audience dashboard."
          icon="âš ï¸"
        />
        <CorePanel className="text-center">
          <CoreButton label="Back to Dashboard" onClick={() => navigate("/audience")} />
        </CorePanel>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* HEADER */}
      <CoreHeader
        title="You've Been Invited!"
        subtitle="A tribe has selected you based on your activity and influence."
        icon="ðŸŒŸ"
      />

      {/* PANEL */}
      <CorePanel className="max-w-3xl mx-auto space-y-5 text-center">

        <h2 className="text-3xl font-bold text-[#4FBF77]">
          {tribeInvite.tribe_name}
        </h2>

        <p className="text-gray-300 text-lg">
          You have been invited to join the <span className="text-[#CBA65C] font-semibold">
            {tribeInvite.tribe_name}
          </span>{" "}
          tribe.
        </p>

        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Tribe members collaborate, share insights, influence product perception,
          and grow their XP together. Invitation is based on your activity,
          reviews, and engagement.
        </p>

        <div className="flex justify-center mt-6 gap-6">

          {/* ACCEPT */}
          <CoreButton
            label="Join Tribe"
            onClick={async () => {
              await fetch("/api/audience/join-tribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tribe: tribeInvite.tribe_name,
                  brand: tribeInvite.brand
                }),
              });
              navigate("/audience");
            }}
          />

          {/* DECLINE */}
          <CoreButton
            label="Maybe Later"
            variant="secondary"
            onClick={() => navigate("/audience")}
          />

        </div>

      </CorePanel>

    </div>
  );
}
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AudienceTribeInvite() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { tribeInvite } = state;
  const { tribe_name, brand, message } = tribeInvite;

  const joinTribe = async () => {
    await fetch("/api/audience/join-tribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tribe: tribe_name, brand }),
    });

    navigate("/audience");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-purple-300">ðŸŒŸ Tribe Invitation</h1>

      <div className="bg-gray-900 p-6 rounded-xl text-white">
        <p className="text-2xl font-bold">{tribe_name}</p>
        <p className="text-gray-300">Brand: {brand}</p>
        <p className="text-gray-400">{message}</p>
      </div>

      <button
        onClick={joinTribe}
        className="bg-green-600 hover:bg-green-700 p-4 rounded-xl text-white w-full text-lg"
      >
        Join Tribe
      </button>

      <button
        onClick={() => navigate("/audience")}
        className="bg-gray-700 hover:bg-gray-800 p-4 rounded-xl text-gray-200 w-full text-lg"
      >
        Maybe Later
      </button>
    </div>
  );
}

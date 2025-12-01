// ============================================================================
// ðŸ’š Core4.AI â€“ BuyerActivity.jsx (v6 Final â€“ Connected to CoreSync v169)
// ============================================================================
// â€¢ Uses campaigns[] from CoreSyncContext
// â€¢ Displays buyerâ€™s submitted reviews + XP earned
// â€¢ Saudi-Tech A3 styling with CorePanel + CoreHeader
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function BuyerActivity() {
  const { campaigns } = useCoreSync();

  const activities = campaigns || [];

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      <CoreHeader
        title="My Activity"
        subtitle="Your reviews, XP gains, cashback events and all interactions."
        icon="ðŸ“˜"
      />

      <div className="space-y-6 max-w-3xl mx-auto">
        {activities.length === 0 ? (
          <CorePanel>
            <p className="text-gray-400 text-center">No activity yet.</p>
          </CorePanel>
        ) : (
          activities.map((act, i) => (
            <CorePanel key={i} className="space-y-3">

              {/* Title */}
              <p className="text-lg font-bold text-[#4FBF77]">
                {act.type === "BUYER_REVIEW_SUBMITTED"
                  ? "Review Submitted"
                  : act.type}
              </p>

              {/* Product */}
              {act.product && (
                <p>
                  <strong className="text-[#CBA65C]">Product:</strong>{" "}
                  {act.product}
                </p>
              )}

              {/* Review Text */}
              {act.text && (
                <p className="text-gray-300 whitespace-pre-line">
                  {act.text}
                </p>
              )}

              {/* XP */}
              {act.xp && (
                <p className="text-[#4FBF77]">
                  <strong>XP Earned:</strong> {act.xp}
                </p>
              )}

              {/* Timestamp */}
              {act.timestamp && (
                <p className="text-xs text-gray-500">
                  {new Date(act.timestamp).toLocaleString()}
                </p>
              )}
            </CorePanel>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ðŸ” ReviewVerificationPanel.jsx â€” Saudi-Tech A3 Edition
// ----------------------------------------------------------------------------
// - A3 styled panel for verifying review authenticity
// - Uses CorePanel + CoreHeader + CoreButton
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function ReviewVerificationPanel() {
  const { wsData } = useCoreSync();
  const reviews = wsData?.pending_reviews || [];

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      <CoreHeader
        title="Review Verification"
        subtitle="Approve, reject or escalate reviews to merchant."
        icon="ðŸ”"
      />

      <div className="space-y-6 max-w-3xl">

        {reviews.length === 0 ? (
          <CorePanel>No pending reviews.</CorePanel>
        ) : (
          reviews.map((r, i) => (
            <CorePanel key={i} className="space-y-3">

              <p><strong>User:</strong> {r.user}</p>
              <p><strong>Product:</strong> {r.product}</p>
              <p><strong>Text:</strong> {r.text}</p>
              <p><strong>Sentiment:</strong> {r.sentiment}/100</p>
              <p>
                <strong>Authenticity Score:</strong>{" "}
                <span className="text-[#4FBF77]">{r.authenticity_score}%</span>
              </p>

              <div className="flex gap-3 mt-4">
                <CoreButton label="Approve" onClick={() => alert("approve")} />
                <CoreButton label="Reject" variant="danger" onClick={() => alert("reject")} />
                <CoreButton label="Merchant Check" variant="secondary" onClick={() => alert("merchant")} />
              </div>

            </CorePanel>
          ))
        )}

      </div>
    </div>
  );
}
